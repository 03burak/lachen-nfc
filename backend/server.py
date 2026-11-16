from fastapi import FastAPI, APIRouter, HTTPException, Request, Response, UploadFile, File, Query, Header
from fastapi.responses import Response as RawResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import re
import ipaddress
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
import copy
from datetime import datetime, timezone, timedelta
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
import httpx
import bcrypt
import jwt
import asyncio
import requests

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection (bağımsız sunucuda MONGO_URL ve DB_NAME .env'den gelir)
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")  # Ignore MongoDB's _id field

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)

    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()

    _ = await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)

    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])

    return status_checks


# ==================== AUTH ====================

JWT_ALGORITHM = "HS256"

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

def verify_password(plain: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False

def create_access_token(user_id: str, email: str) -> str:
    now = datetime.now(timezone.utc)
    payload = {"sub": user_id, "email": email, "exp": now + timedelta(hours=24), "iat": now, "type": "access"}
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {"sub": user_id, "exp": datetime.now(timezone.utc) + timedelta(days=7), "type": "refresh"}
    return jwt.encode(payload, os.environ["JWT_SECRET"], algorithm=JWT_ALGORITHM)

async def get_current_admin(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, os.environ["JWT_SECRET"], algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"_id": payload["sub"]})
        if not user or user.get("role") != "admin":
            raise HTTPException(status_code=401, detail="Not authorized")
        # Şifre değişiminden sonra eski token'ları geçersiz kıl
        pwd_changed = user.get("password_changed_at")
        if pwd_changed:
            if isinstance(pwd_changed, str):
                pwd_changed = datetime.fromisoformat(pwd_changed)
            if pwd_changed.tzinfo is None:
                pwd_changed = pwd_changed.replace(tzinfo=timezone.utc)
            if payload.get("iat", 0) < pwd_changed.timestamp():
                raise HTTPException(status_code=401, detail="Session expired, please log in again")
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

class LoginBody(BaseModel):
    email: str
    password: str

@api_router.post("/auth/login")
async def login(body: LoginBody, request: Request, response: Response):
    email = body.email.lower().strip()
    ip = request.client.host if request.client else "unknown"
    identifier = f"{ip}:{email}"
    attempts = await db.login_attempts.find_one({"identifier": identifier})
    if attempts and attempts.get("count", 0) >= 5:
        locked_until = attempts.get("locked_until")
        if locked_until and datetime.now(timezone.utc) < locked_until.replace(tzinfo=timezone.utc):
            raise HTTPException(status_code=429, detail="Too many attempts. Try again in 15 minutes.")

    user = await db.users.find_one({"email": email})
    if not user or not verify_password(body.password, user["password_hash"]):
        await db.login_attempts.update_one(
            {"identifier": identifier},
            {"$inc": {"count": 1}, "$set": {"locked_until": datetime.now(timezone.utc) + timedelta(minutes=15)}},
            upsert=True,
        )
        raise HTTPException(status_code=401, detail="Invalid email or password")

    await db.login_attempts.delete_one({"identifier": identifier})
    access = create_access_token(user["_id"], email)
    refresh = create_refresh_token(user["_id"])
    response.set_cookie(key="access_token", value=access, httponly=True, secure=True, samesite="none", max_age=86400, path="/")
    response.set_cookie(key="refresh_token", value=refresh, httponly=True, secure=True, samesite="none", max_age=604800, path="/")
    return {"email": email, "role": user.get("role", "admin")}

@api_router.get("/auth/me")
async def auth_me(request: Request):
    user = await get_current_admin(request)
    return {"email": user["email"], "role": user.get("role", "admin")}

@api_router.post("/auth/logout")
async def logout(response: Response):
    response.delete_cookie("access_token", path="/")
    response.delete_cookie("refresh_token", path="/")
    return {"status": "ok"}


class ChangePasswordBody(BaseModel):
    current_password: str
    new_password: str = Field(min_length=8, max_length=200)

@api_router.post("/auth/change-password")
async def change_password(body: ChangePasswordBody, request: Request, response: Response):
    user = await get_current_admin(request)
    full = await db.users.find_one({"_id": user["_id"]})
    if not full or not verify_password(body.current_password, full["password_hash"]):
        raise HTTPException(status_code=400, detail="Mevcut şifre hatalı")
    await db.users.update_one({"_id": user["_id"]}, {"$set": {"password_hash": hash_password(body.new_password), "must_change_password": False, "password_changed_at": datetime.now(timezone.utc)}})
    return {"status": "ok"}


class ForgotPasswordBody(BaseModel):
    email: str

@api_router.post("/auth/forgot-password")
async def forgot_password(body: ForgotPasswordBody):
    email = body.email.lower().strip()
    user = await db.users.find_one({"email": email})
    if user and user.get("role") == "admin":
        import secrets
        token = secrets.token_urlsafe(32)
        await db.password_reset_tokens.update_many({"email": email, "used": False}, {"$set": {"used": True}})
        await db.password_reset_tokens.insert_one({
            "token": token,
            "email": email,
            "used": False,
            "expires_at": datetime.now(timezone.utc) + timedelta(hours=1),
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        base = (os.environ.get("FRONTEND_URL") or "").rstrip("/") or ""
        link = f"{base}/admin/reset-password?token={token}"
        html = (
            '<table role="presentation" width="100%"><tr><td style="padding:24px;font-family:Arial,sans-serif;color:#111111">'
            '<h2 style="margin:0 0 16px;font-size:18px">Lachen & Co. — Şifre Sıfırlama</h2>'
            '<p style="margin:4px 0">Yönetim paneli şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın:</p>'
            f'<p style="margin:16px 0"><a href="{escape(link)}" style="background:#050505;color:#ffffff;padding:12px 24px;border-radius:999px;text-decoration:none;display:inline-block">Şifremi Sıfırla</a></p>'
            f'<p style="margin:4px 0;font-size:12px;color:#888888">Bağlantı 1 saat geçerlidir ve tek kullanımlıktır. Bu isteği siz yapmadıysanız bu e-postayı yok sayabilirsiniz.</p>'
            f'<p style="margin:4px 0;font-size:12px;color:#888888;word-break:break-all">{escape(link)}</p>'
            '</td></tr></table>'
        )
        await send_email(to=email, subject="Lachen & Co. — Şifre Sıfırlama Bağlantısı", html=html)
    return {"status": "ok"}


class ResetPasswordBody(BaseModel):
    token: str
    new_password: str = Field(min_length=8, max_length=200)

@api_router.post("/auth/reset-password")
async def reset_password(body: ResetPasswordBody):
    rec = await db.password_reset_tokens.find_one({"token": body.token, "used": False})
    if not rec:
        raise HTTPException(status_code=400, detail="Geçersiz veya kullanılmış bağlantı")
    expires = rec["expires_at"]
    if isinstance(expires, str):
        expires = datetime.fromisoformat(expires)
    if expires.tzinfo is None:
        expires = expires.replace(tzinfo=timezone.utc)
    if datetime.now(timezone.utc) > expires:
        raise HTTPException(status_code=400, detail="Bağlantının süresi dolmuş")
    await db.users.update_one({"email": rec["email"]}, {"$set": {"password_hash": hash_password(body.new_password), "must_change_password": False, "password_changed_at": datetime.now(timezone.utc)}})
    await db.password_reset_tokens.update_one({"token": body.token}, {"$set": {"used": True}})
    return {"status": "ok"}

# ==================== CONTENT ====================

@api_router.get("/content")
async def get_content():
    doc = await db.site_content.find_one({"_id": "site_content"})
    if not doc:
        raise HTTPException(status_code=404, detail="Content not initialized")
    doc.pop("_id", None)
    return doc

@api_router.put("/admin/content")
async def update_content(request: Request):
    user = await get_current_admin(request)
    new_data = await request.json()
    new_data = {k: v for k, v in new_data.items() if k != "_id"}
    old = await db.site_content.find_one({"_id": "site_content"}, {"_id": 0})
    if old:
        await db.content_revisions.insert_one({
            "rev_id": str(uuid.uuid4()),
            "saved_at": datetime.now(timezone.utc).isoformat(),
            "saved_by": user["email"],
            "data": old,
        })
        revs = await db.content_revisions.find({}, {"_id": 1}).sort("saved_at", -1).to_list(1000)
        if len(revs) > 20:
            excess = [r["_id"] for r in revs[20:]]
            await db.content_revisions.delete_many({"_id": {"$in": excess}})
    await db.site_content.replace_one({"_id": "site_content"}, {**new_data, "_id": "site_content"}, upsert=True)
    return {"status": "ok"}

@api_router.get("/admin/revisions")
async def list_revisions(request: Request):
    await get_current_admin(request)
    revs = await db.content_revisions.find({}, {"_id": 0, "data": 0}).sort("saved_at", -1).to_list(20)
    return {"revisions": revs}

@api_router.post("/admin/restore/{rev_id}")
async def restore_revision(rev_id: str, request: Request):
    user = await get_current_admin(request)
    rev = await db.content_revisions.find_one({"rev_id": rev_id})
    if not rev:
        raise HTTPException(status_code=404, detail="Revision not found")
    old = await db.site_content.find_one({"_id": "site_content"}, {"_id": 0})
    if old:
        await db.content_revisions.insert_one({
            "rev_id": str(uuid.uuid4()),
            "saved_at": datetime.now(timezone.utc).isoformat(),
            "saved_by": user["email"],
            "data": old,
        })
    data = copy.deepcopy(rev["data"])
    data["_id"] = "site_content"
    await db.site_content.replace_one({"_id": "site_content"}, data, upsert=True)
    return {"status": "ok"}

# ==================== OBJECT STORAGE ====================
# Provider: "emergent" (default, platform), "local" (own server disk), "s3" (S3-compatible)
STORAGE_PROVIDER = (os.environ.get("STORAGE_PROVIDER") or "emergent").lower()
LOCAL_UPLOAD_DIR = os.environ.get("LOCAL_UPLOAD_DIR", str(ROOT_DIR / "uploads"))
APP_NAME = "lachenco"
_storage_key = None
_s3_client = None

def init_storage(force: bool = False):
    global _storage_key
    if STORAGE_PROVIDER == "local":
        os.makedirs(LOCAL_UPLOAD_DIR, exist_ok=True)
        return "local"
    if STORAGE_PROVIDER == "s3":
        import boto3
        global _s3_client
        if _s3_client is None or force:
            _s3_client = boto3.client(
                "s3",
                endpoint_url=os.environ.get("S3_ENDPOINT_URL") or None,
                aws_access_key_id=os.environ.get("S3_ACCESS_KEY"),
                aws_secret_access_key=os.environ.get("S3_SECRET_KEY"),
                region_name=os.environ.get("S3_REGION", "us-east-1"),
            )
        return "s3"
    if _storage_key and not force:
        return _storage_key
    storage_base = (os.environ.get("INTEGRATION_PROXY_URL") or "").strip() or "https://integrations.emergentagent.com"
    resp = requests.post(f"{storage_base.rstrip('/')}/objstore/api/v1/storage/init",
                         json={"emergent_key": os.environ.get("EMERGENT_LLM_KEY")}, timeout=30)
    resp.raise_for_status()
    _storage_key = resp.json()["storage_key"]
    return _storage_key

def put_object(path: str, data: bytes, content_type: str) -> dict:
    if STORAGE_PROVIDER == "local":
        init_storage()
        full = os.path.join(LOCAL_UPLOAD_DIR, path)
        os.makedirs(os.path.dirname(full), exist_ok=True)
        with open(full, "wb") as f:
            f.write(data)
        return {"path": path, "size": len(data)}
    if STORAGE_PROVIDER == "s3":
        init_storage()
        _s3_client.put_object(Bucket=os.environ["S3_BUCKET"], Key=path, Body=data, ContentType=content_type)
        return {"path": path, "size": len(data)}
    key = init_storage()
    storage_base = (os.environ.get("INTEGRATION_PROXY_URL") or "").strip() or "https://integrations.emergentagent.com"
    resp = requests.put(
        f"{storage_base.rstrip('/')}/objstore/api/v1/storage/objects/{path}",
        headers={"X-Storage-Key": key, "Content-Type": content_type},
        data=data, timeout=120,
    )
    resp.raise_for_status()
    return resp.json()

def get_object(path: str):
    if STORAGE_PROVIDER == "local":
        full = os.path.join(LOCAL_UPLOAD_DIR, path)
        with open(full, "rb") as f:
            return f.read(), "application/octet-stream"
    if STORAGE_PROVIDER == "s3":
        init_storage()
        obj = _s3_client.get_object(Bucket=os.environ["S3_BUCKET"], Key=path)
        return obj["Body"].read(), obj.get("ContentType", "application/octet-stream")
    key = init_storage()
    storage_base = (os.environ.get("INTEGRATION_PROXY_URL") or "").strip() or "https://integrations.emergentagent.com"
    resp = requests.get(f"{storage_base.rstrip('/')}/objstore/api/v1/storage/objects/{path}",
                        headers={"X-Storage-Key": key}, timeout=60)
    resp.raise_for_status()
    return resp.content, resp.headers.get("Content-Type", "application/octet-stream")

ALLOWED_MIME = {"image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"}

@api_router.post("/admin/upload")
async def admin_upload(request: Request, file: UploadFile = File(...)):
    user = await get_current_admin(request)
    if file.content_type not in ALLOWED_MIME:
        raise HTTPException(status_code=400, detail="Only image files are allowed")
    data = await file.read()
    if len(data) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File too large (max 10MB)")
    ext = file.filename.split(".")[-1].lower() if "." in file.filename else "bin"
    path = f"{APP_NAME}/uploads/{uuid.uuid4()}.{ext}"
    result = await asyncio.to_thread(put_object, path, data, file.content_type)
    await db.files.insert_one({
        "id": str(uuid.uuid4()),
        "storage_path": result["path"],
        "original_filename": file.filename,
        "content_type": file.content_type,
        "size": result["size"],
        "is_deleted": False,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "uploaded_by": user["email"],
    })
    return {"url": f"/api/files/{result['path']}", "path": result["path"]}

@api_router.get("/files/{path:path}")
async def download_file(path: str):
    record = await db.files.find_one({"storage_path": path, "is_deleted": False})
    if not record:
        raise HTTPException(status_code=404, detail="File not found")
    data, content_type = await asyncio.to_thread(get_object, path)
    return RawResponse(content=data, media_type=record.get("content_type", content_type))


# ==================== CONTACT (existing) ====================

# Email provider: "emergent" (default, platform Resend proxy) or "smtp" (own server)
EMAIL_PROVIDER = (os.environ.get("EMAIL_PROVIDER") or "emergent").lower()
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ.get("EMERGENT_EMAIL_KEY", "")
EMAIL_FROM_NAME = os.environ.get("EMAIL_FROM_NAME", "Lachen & Co.")
EMAIL_FROM_ADDRESS = os.environ.get("EMAIL_FROM_ADDRESS", os.environ.get("CONTACT_EMAIL", ""))
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
CONTACT_EMAIL = os.environ["CONTACT_EMAIL"]

email_logger = logging.getLogger("email")

def _send_email_smtp(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    import smtplib
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText
    host = os.environ.get("SMTP_HOST")
    if not host:
        email_logger.error("SMTP_HOST not configured")
        raise HTTPException(status_code=503, detail="Email is temporarily unavailable")
    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"{EMAIL_FROM_NAME} <{EMAIL_FROM_ADDRESS}>"
    msg["To"] = to
    if reply_to or EMAIL_REPLY_TO:
        msg["Reply-To"] = reply_to or EMAIL_REPLY_TO
    msg.attach(MIMEText(html, "html", "utf-8"))
    port = int(os.environ.get("SMTP_PORT", "587"))
    try:
        with smtplib.SMTP(host, port, timeout=30) as server:
            if port == 587:
                server.starttls()
            if os.environ.get("SMTP_USER"):
                server.login(os.environ["SMTP_USER"], os.environ.get("SMTP_PASSWORD", ""))
            server.sendmail(EMAIL_FROM_ADDRESS, [to], msg.as_string())
        return "smtp"
    except Exception as e:
        email_logger.error(f"SMTP send error: {e}")
        raise HTTPException(status_code=502, detail="Failed to send email")

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)

def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)

def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)

class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []
    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []
    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)
    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []

def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan(); scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} ≠ real link host {real!r} (G3)")

async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    if EMAIL_PROVIDER == "smtp":
        return await asyncio.to_thread(_send_email_smtp, to=to, subject=subject, html=html, reply_to=reply_to)
    payload = {"to": [to], "subject": subject, "html": html,
               "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        try:
            code = e.response.json().get("code", "")
        except ValueError:
            code = ""
        if code in ("insufficient_credits", "integration_disabled", "daily_limit_reached"):
            email_logger.warning(f"Email paused: {code} ({e.response.status_code}): {e.response.json().get('message', '')}")
            raise HTTPException(status_code=503, detail="Email is temporarily unavailable")
        email_logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except HTTPException:
        raise
    except Exception as e:
        email_logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


class ContactMessage(BaseModel):
    first_name: str = Field(min_length=1, max_length=100)
    last_name: str = Field(min_length=1, max_length=100)
    phone: str = Field(min_length=1, max_length=30)
    email: str = Field(min_length=3, max_length=200)
    message: str | None = Field(default=None, max_length=2000)

@api_router.post("/contact")
async def send_contact_message(msg: ContactMessage):
    subject = "Lachen & Co. — Yeni İletişim Formu Mesajı"
    message_row = ""
    if msg.message:
        message_row = (
            '<p style="margin:12px 0 4px"><strong>Mesaj:</strong></p>'
            f'<p style="margin:4px 0;white-space:pre-wrap">{escape(msg.message)}</p>'
        )
    html = (
        '<table role="presentation" width="100%"><tr><td style="padding:24px;'
        'font-family:Arial,sans-serif;color:#111111">'
        '<h2 style="margin:0 0 16px;font-size:18px">Yeni İletişim Formu Mesajı</h2>'
        f'<p style="margin:4px 0"><strong>Ad:</strong> {escape(msg.first_name)}</p>'
        f'<p style="margin:4px 0"><strong>Soyad:</strong> {escape(msg.last_name)}</p>'
        f'<p style="margin:4px 0"><strong>Telefon:</strong> {escape(msg.phone)}</p>'
        f'<p style="margin:4px 0"><strong>E-posta:</strong> {escape(msg.email)}</p>'
        + message_row +
        f'<p style="margin-top:20px;font-size:12px;color:#888888">Bu mesaj {escape(EMAIL_FROM_NAME)} '
        'web sitesindeki iletişim formundan gönderilmiştir. Yanıtlamak için yukarıdaki ziyaretçi '
        'e-posta adresini kullanın.</p>'
        '</td></tr></table>'
    )
    await send_email(to=CONTACT_EMAIL, subject=subject, html=html)
    return {"status": "ok"}

# Include the router in the main app
app.include_router(api_router)

# CORS: CORS_ORIGINS .env'de virgülle ayrılmış gerçek domainler (örn. https://siteniz.com,https://www.siteniz.com)
# allow_credentials=True ile wildcard "*" kullanılamaz; boş bırakılırsa FRONTEND_URL kullanılır
_cors = os.environ.get('CORS_ORIGINS', '').strip() or os.environ.get('FRONTEND_URL', 'http://localhost:3000')
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[o.strip() for o in _cors.split(',') if o.strip()],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


async def seed_admin():
    # Yalnızca belirtilen admin yoksa oluştur; mevcut admin'in şifresini asla ezme
    email = os.environ.get("ADMIN_EMAIL", "admin@example.com").lower()
    existing = await db.users.find_one({"email": email})
    if existing is None:
        await db.users.insert_one({
            "_id": str(uuid.uuid4()),
            "email": email,
            "password_hash": hash_password(os.environ.get("ADMIN_PASSWORD", "admin123")),
            "role": "admin",
            "must_change_password": True,
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info(f"Admin seeded: {email}")

@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.login_attempts.create_index("identifier")
    await db.password_reset_tokens.create_index("expires_at", expireAfterSeconds=0)
    await seed_admin()
    try:
        init_storage()
        logger.info(f"Storage initialized (provider={STORAGE_PROVIDER})")
    except Exception as e:
        logger.error(f"Storage init failed: {e}")

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
