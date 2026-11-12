import asyncio, re
import demjson3
from motor.motor_asyncio import AsyncIOMotorClient

with open("/app/frontend/src/data/defaults.js") as f:
    src = f.read()
body = re.search(r"export const DEFAULT_CONTENT = (\{.*\});\s*$", src, re.S).group(1)
defaults = demjson3.decode(body)

NEW_KEYS = ["design", "menu", "seo", "sections", "pages", "ads"]

async def main():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client["test_database"]
    doc = await db.site_content.find_one({"_id": "site_content"})
    changed = []
    for key in NEW_KEYS:
        if key not in doc:
            doc[key] = defaults[key]
            changed.append(key)
    if changed:
        await db.site_content.replace_one({"_id": "site_content"}, doc)
        print("ADDED:", ", ".join(changed))
    else:
        print("UP TO DATE")
    client.close()

asyncio.run(main())
