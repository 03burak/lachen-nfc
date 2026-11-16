# Lachenko Backend — Bağımsız Sunucuya Taşıma Kılavuzu

Bu kılavuz, backend'i Emergent dışında kendi sunucunuzda (VPS, Railway, Render vb.) çalıştırmak için gereken adımları içerir.

## 1. Mimari

| Bileşen | Teknoloji | Taşınabilirlik |
|---|---|---|
| Backend API | FastAPI + Uvicorn | ✅ Tamamen taşınabilir |
| Veritabanı | MongoDB (Motor) | ✅ Yerel kurulum veya MongoDB Atlas |
| Kimlik Doğrulama | JWT (PyJWT) + bcrypt | ✅ Platformdan bağımsız |
| E-posta | Emergent Resend proxy **veya** standart SMTP | ⚠️ Değişken: `EMAIL_PROVIDER` |
| Görsel Depolama | Emergent Object Storage **veya** yerel disk **veya** S3 | ⚠️ Değişken: `STORAGE_PROVIDER` |
| Görsel üretim (tek seferlik) | emergentintegrations LLM | ❌ Yalnızca platformda (canlı sitede gerekmez) |

## 2. Gereksinimler

- Python 3.11+
- MongoDB 6+ (yerel) veya MongoDB Atlas hesabı
- Node.js 18+ (frontend build için)
- (Opsiyonel) SMTP hesabı veya S3 uyumlu depolama

## 3. Kurulum

```bash
# 1) Kodu kopyalayın
git clone <repo> && cd lachenko-project/backend

# 2) Ortamı hazırlayın
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt

# 3) .env oluşturun
cp .env.example .env
# .env içindeki değerleri düzenleyin (aşağıya bakın)

# 4) MongoDB'yi başlatın (yerel) veya Atlas bağlantısını .env'e yazın

# 5) Veritabanını geri yükleyin (yedekten)
mongorestore --uri="<MONGO_URL>" --db=<DB_NAME> ../mongodb-dump/test_database

# 6) Backend'i çalıştırın
uvicorn server:app --host 0.0.0.0 --port 8001
```

Frontend (ayrı):
```bash
cd ../frontend
cp .env.example .env   # REACT_APP_BACKEND_URL=https://api.siteniz.com
yarn install && yarn build
# build/ klasörünü Nginx ile sunun; /api isteklerini backend'e proxy'leyin
```

## 4. Environment Variables (tam liste)

Bkz. `.env.example`. Özet:

| Değişken | Zorunlu | Açıklama |
|---|---|---|
| MONGO_URL | ✅ | MongoDB bağlantı adresi |
| DB_NAME | ✅ | Veritabanı adı |
| FRONTEND_URL | ✅ | Sitenin canlı adresi (sıfırlama linki için) |
| CORS_ORIGINS | ✅ | İzinli domainler (virgülle ayrılmış, `*` kullanılamaz) |
| JWT_SECRET | ✅ | Rastgele 64 hex (`secrets.token_hex(32)`) |
| ADMIN_EMAIL / ADMIN_PASSWORD | ✅ | İlk admin (yalnızca yoksa oluşur, şifre asla ezilmez) |
| EMAIL_PROVIDER | ✅ | `emergent` veya `smtp` |
| EMERGENT_EMAIL_KEY | platformda | Emergent e-posta anahtarı |
| SMTP_HOST/PORT/USER/PASSWORD | smtp ise | Kendi e-posta sunucunuz |
| EMAIL_FROM_NAME/ADDRESS, EMAIL_REPLY_TO, CONTACT_EMAIL | ✅ | Gönderen ve alıcı |
| STORAGE_PROVIDER | ✅ | `emergent`, `local` veya `s3` |
| LOCAL_UPLOAD_DIR | local ise | Disk klasörü |
| S3_BUCKET/REGION/ENDPOINT_URL/ACCESS_KEY/SECRET_KEY | s3 ise | S3 yapılandırması |

## 5. Emergent Bağımlılıkları — Durum

**Kaldırılabilir / değiştirilebilir (bu çalışmada hazırlandı):**
- E-posta → `EMAIL_PROVIDER=smtp` ile standart SMTP
- Görsel depolama → `STORAGE_PROVIDER=local` (disk) veya `s3` (S3 uyumlu)

**Platformda kalan (isteğe bağlı):**
- `EMAIL_PROVIDER=emergent` + `EMERGENT_EMAIL_KEY` (varsayılan, kredi gerektirir)
- `STORAGE_PROVIDER=emergent` + `EMERGENT_LLM_KEY` (varsayılan)
- emergentintegrations kütüphanesi yalnızca tek seferlik görsel üretimi için kullanıldı; canlı sitede gerekmez

## 6. Yönetici Hesabı

- Tek yetkili admin: `lachen.co@outlook.com` (veritabanında zaten var, silinmez)
- `ADMIN_EMAIL`/`ADMIN_PASSWORD` yalnızca o e-posta veritabanında **yoksa** hesap oluşturur; mevcut şifre asla ezilmez
- Eski `admin@lachen.co` hesabı kaldırılmıştır; başka admin yoktur

## 7. Oturum ve Şifre Güvenliği

- Şifreler bcrypt ile hash'lenir (asla açık metin değil)
- JWT: httpOnly cookie, 24 saat access + 7 gün refresh
- Şifre değiştirildiğinde `password_changed_at` güncellenir → **eski token'lar otomatik geçersiz olur**
- Brute force: 5 yanlış denemede 15 dk kilit
- Şifre sıfırlama: tek kullanımlık, 1 saat geçerli token, e-posta ile

## 8. Yedekleme

```bash
# Veritabanı
mongodump --uri="<MONGO_URL>" --db=<DB_NAME> --out=./yedek-$(date +%F)

# Görseller (local provider)
tar -czf uploads-yedek-$(date +%F).tar.gz $LOCAL_UPLOAD_DIR

# Görseller (S3)
aws s3 sync s3://$S3_BUCKET ./yedek-uploads
```

## 9. Kontrol Listesi (yeni sunucuda)

- [ ] `.env` dolduruldu (gerçek şifreler GitHub'da DEĞİL)
- [ ] MongoDB çalışıyor ve veri geri yüklendi
- [ ] `GET /api/` → `{"message":"Hello World"}`
- [ ] `POST /api/auth/login` (lachen.co@outlook.com) → 200 + cookie
- [ ] `GET /api/content` → site içeriği
- [ ] E-posta: SMTP ise test mesajı gönderildi
- [ ] Depolama: admin panelinden görsel yükleme çalışıyor
- [ ] CORS: frontend domaini izinli listede
