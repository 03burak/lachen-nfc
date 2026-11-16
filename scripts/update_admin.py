import asyncio, os
import bcrypt
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
load_dotenv("/app/backend/.env")

NEW_EMAIL = "lachen.co@outlook.com"
NEW_PASSWORD = "LachenEB.2026!"

async def main():
    client = AsyncIOMotorClient(os.environ["MONGO_URL"])
    db = client[os.environ["DB_NAME"]]
    existing_new = await db.users.find_one({"email": NEW_EMAIL})
    hashed = bcrypt.hashpw(NEW_PASSWORD.encode(), bcrypt.gensalt()).decode()
    if existing_new:
        await db.users.update_one({"email": NEW_EMAIL}, {"$set": {"password_hash": hashed, "role": "admin", "must_change_password": True}})
        print("updated existing new admin")
    else:
        import uuid
        await db.users.insert_one({
            "_id": str(uuid.uuid4()),
            "email": NEW_EMAIL,
            "password_hash": hashed,
            "role": "admin",
            "must_change_password": True,
            "created_at": __import__("datetime").datetime.now(__import__("datetime").timezone.utc).isoformat(),
        })
        print("created new admin")
    # Eski admin'i kaldır (isteğe bağlı temizlik) — yeni admin doğrulandıktan sonra
    old = await db.users.find_one({"email": "admin@lachen.co"})
    if old:
        print("old admin still exists (admin@lachen.co) — kept for safety, can be removed later")
    users = await db.users.find({"role": "admin"}, {"_id": 0, "password_hash": 0}).to_list(10)
    print("admins:", users)
    client.close()

asyncio.run(main())
