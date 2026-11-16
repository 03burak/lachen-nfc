import asyncio
from motor.motor_asyncio import AsyncIOMotorClient

EN_MAP = {
    "Masadan Sipariş": "Table Ordering",
    "Masadan Ödeme": "Pay at the Table",
    "Masada Ödeme": "Pay at the Table",
    "Hesap Bölüşme": "Bill Splitting",
    "Hesabı Bölüşme": "Bill Splitting",
    "Mutfak Ekranı (KDS)": "Kitchen Display (KDS)",
    "Google Yorum": "Google Reviews",
    "Sessiz Masa & Özel Not": "Quiet Table & Special Notes",
    "Akıllı Garson Çağrı": "Smart Waiter Call",
    "Garson Çağrı": "Waiter Call",
    "Satış Verisi": "Sales Data",
    "Satış verisi": "Sales Data",
    "Dijital Bahşiş": "Digital Tipping",
    "Çoklu Dil (TR / EN)": "Multi-Language (TR / EN)",
    "Google Yorum Kalkanı": "Google Review Shield",
    "Çapraz Satış": "Cross-Selling",
    "Özel Tasarım (Arayüz Düzenleyici)": "Custom Design (UI Editor)",
    "Ortalama Masa Doluluk Süresi": "Average Table Occupancy Time",
    "Kural Tabanlı AI": "Rule-Based AI",
    "Self-Service (Bip)": "Self-Service (Beep)",
}

async def main():
    client = AsyncIOMotorClient("mongodb://localhost:27017")
    db = client["test_database"]
    doc = await db.site_content.find_one({"_id": "site_content"})
    for p in doc["packages"]["items"]:
        tr = [f.strip() for f in p["features"]["tr"]]
        p["features"]["tr"] = tr
        p["features"]["en"] = [EN_MAP.get(f.strip(), f.strip()) for f in tr]
    # gold paket adını EN'de düzelt (kullanıcı TR'de Self Servis yapmış)
    for p in doc["packages"]["items"]:
        if p["key"] == "gold":
            p["name"]["en"] = "Self-Service"
    await db.site_content.replace_one({"_id": "site_content"}, doc)
    print("translations fixed")
    for p in doc["packages"]["items"]:
        print(p["key"], len(p["features"]["tr"]), "TR /", len(p["features"]["en"]), "EN")
        for a, b in zip(p["features"]["tr"], p["features"]["en"]):
            print("   ", a, "->", b)
    client.close()

asyncio.run(main())
