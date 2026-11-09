import asyncio, re
import demjson3
from motor.motor_asyncio import AsyncIOMotorClient

with open("/app/frontend/src/data/defaults.js") as f:
    src = f.read()
body = re.search(r"export const DEFAULT_CONTENT = (\{.*\});\s*$", src, re.S).group(1)
defaults = demjson3.decode(body)

async def main():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client["test_database"]
    doc = await db.site_content.find_one({"_id": "site_content"})
    changed = False
    if "references" not in doc:
        doc["references"] = defaults["references"]
        changed = True
        print("references added")
    if "linkedinHref" not in doc.get("footer", {}):
        doc["footer"]["linkedinHref"] = defaults["footer"]["linkedinHref"]
        changed = True
        print("linkedinHref added")
    if changed:
        await db.site_content.replace_one({"_id": "site_content"}, doc)
        print("UPDATED")
    else:
        print("ALREADY UP TO DATE")
    client.close()

asyncio.run(main())
