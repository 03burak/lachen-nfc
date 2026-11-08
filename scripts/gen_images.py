import asyncio, os, base64
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent

load_dotenv("/app/backend/.env")
API_KEY = os.getenv("EMERGENT_LLM_KEY")
MODEL = "gemini-3.1-flash-image-preview"
OUT = "/app/frontend/public/images"

async def gen_edit(session, ref_path, prompt, out_path):
    with open(ref_path, "rb") as f:
        ref_b64 = base64.b64encode(f.read()).decode("utf-8")
    chat = LlmChat(api_key=API_KEY, session_id=session, system_message="You are a professional product photographer.")
    chat.with_model("gemini", MODEL).with_params(modalities=["image", "text"])
    msg = UserMessage(text=prompt, file_contents=[ImageContent(ref_b64)])
    try:
        text, images = await chat.send_message_multimodal_response(msg)
        if images:
            data = base64.b64decode(images[0]["data"])
            with open(out_path, "wb") as f:
                f.write(data)
            print(f"OK {out_path} {len(data)} bytes")
        else:
            print(f"FAIL no image {out_path}: {text[:120] if text else 'empty'}")
    except Exception as e:
        print(f"ERROR {out_path}: {str(e)[:200]}")

async def gen_text(session, prompt, out_path):
    chat = LlmChat(api_key=API_KEY, session_id=session, system_message="You are a professional photographer.")
    chat.with_model("gemini", MODEL).with_params(modalities=["image", "text"])
    try:
        text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
        if images:
            data = base64.b64decode(images[0]["data"])
            with open(out_path, "wb") as f:
                f.write(data)
            print(f"OK {out_path} {len(data)} bytes")
        else:
            print(f"FAIL no image {out_path}: {text[:120] if text else 'empty'}")
    except Exception as e:
        print(f"ERROR {out_path}: {str(e)[:200]}")

PLEX_PROMPT = ("Place this exact black acrylic restaurant table stand on an elegant wooden table in a stylish, "
    "modern cafe restaurant with warm ambient lighting, softly blurred background. Photorealistic professional "
    "product photography, natural perspective, realistic shadows and reflections. CRITICAL: keep the product "
    "exactly as in the photo — same black plexiglass design, same shape and proportions, same white 'LACHEN.CO' "
    "logo, same Turkish text 'Sipariş, ödeme için NFC, QR okutun', same QR code, same white NFC circle icon. "
    "Do not redesign, alter, blur, or distort any part of the printed product. Landscape orientation.")

async def main():
    await gen_edit("plexi-a", "/app/frontend/public/images/plexi-1.webp", PLEX_PROMPT, f"{OUT}/plexi-scene.png")
    await gen_edit("plexi-b", "/app/frontend/public/images/plexi-2.webp",
        "Rotate this photo of the black acrylic restaurant table stand upright so the stand and its text are straight and horizontal, then place it on an elegant wooden table in a stylish modern cafe restaurant, warm ambient lighting, blurred background. Photorealistic professional product photography. Keep the product exactly as is — same black design, 'LACHEN.CO' logo, Turkish text, QR code, white NFC circle. Landscape orientation.",
        f"{OUT}/plexi-scene-b.png")
    await gen_text("nfctech-a",
        "Professional dark editorial photo: a hand holding a smartphone over a small black acrylic NFC table stand on a wooden table in a modern upscale restaurant at night, warm candlelight bokeh, moody cinematic lighting, premium minimal atmosphere, landscape orientation.",
        f"{OUT}/nfc-tech.png")
    await gen_text("nfctech-b",
        "Dark editorial close-up photo of a sleek smartphone screen displaying a minimal elegant restaurant menu app with white typography on dark UI, resting on a cafe table with soft warm out-of-focus lights in the background, premium cinematic mood, landscape orientation.",
        f"{OUT}/nfc-tech-b.png")

asyncio.run(main())
print("DONE")
