import asyncio, re
from motor.motor_asyncio import AsyncIOMotorClient
import demjson3

with open("/app/frontend/src/data/defaults.js") as f:
    src = f.read()
body = re.search(r"export const DEFAULT_CONTENT = (\{.*\});\s*$", src, re.S).group(1)
payload = demjson3.decode(body)

doc = dict(payload)
doc["_id"] = "site_content"

async def main():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client["test_database"]
    existing = await db.site_content.find_one({"_id": "site_content"})
    if existing:
        print("ALREADY SEEDED, skipping")
    else:
        await db.site_content.insert_one(doc)
        print("SEEDED OK")
    count = await db.site_content.count_documents({})
    print("site_content count:", count)
    client.close()

asyncio.run(main())
