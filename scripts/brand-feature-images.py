from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageEnhance

ROOT = Path(r"C:\Users\Google 11\Documents\ChatGPT\Automobile")
GENERATED = Path(r"C:\Users\Google 11\.codex\generated_images\019ffece-300b-7442-a92d-f6c7215579e0")
OUT = ROOT / "public" / "features"
OUT.mkdir(parents=True, exist_ok=True)

items = [
    ("exec-5ea28d45-5853-4b14-8015-32e5b210ebf0.png", "jeep-wrangler-36-oil-capacity.webp", "JEEP WRANGLER 3.6", "OIL CAPACITY"),
    ("exec-643b15ca-80cb-4a3d-a234-88291baf933d.png", "nissan-altima-lug-nut-torque.webp", "NISSAN ALTIMA", "LUG NUT TORQUE"),
    ("exec-7664145b-38b1-4822-83f9-0ba18f11187a.png", "nissan-rogue-lug-nut-torque.webp", "NISSAN ROGUE", "LUG NUT TORQUE"),
    ("exec-d4605874-9b16-4eb1-9549-345c06869599.png", "subaru-outback-lug-nut-torque.webp", "SUBARU OUTBACK", "LUG NUT TORQUE"),
    ("exec-57d343d6-3814-49dd-bb20-5756561c73e4.png", "subaru-forester-lug-nut-torque.webp", "SUBARU FORESTER", "LUG NUT TORQUE"),
    ("exec-491f5fd7-dcbe-44c6-b048-c355e161e764.png", "subaru-ej20-firing-order.webp", "SUBARU EJ20", "FIRING ORDER"),
    ("exec-c1063d27-7695-4b32-aaa7-75733cbd7940.png", "ford-46-firing-order.webp", "FORD 4.6 MODULAR", "FIRING ORDER"),
    ("exec-f7f88731-33c8-4fec-b0bb-f8037a5df4a7.png", "ford-54-triton-firing-order.webp", "FORD 5.4 TRITON", "FIRING ORDER"),
    ("exec-730d3bad-4ca1-44e0-af96-5eb26f15081c.png", "ford-54-triton-spark-plug-gap.webp", "FORD 5.4 TRITON", "SPARK PLUG GAP"),
    ("exec-e392008f-cd2d-471f-97f8-e4c01bdb23ba.png", "chevy-ls1-firing-order.webp", "CHEVY LS1", "FIRING ORDER"),
    ("exec-6d102508-a328-47ac-99c1-4cd42d5c7c15.png", "chevy-454-firing-order.webp", "CHEVY 454", "FIRING ORDER"),
    ("exec-837d44f0-e249-4409-b604-2be336c93629.png", "chevy-454-head-bolt-torque.webp", "CHEVY 454", "HEAD BOLT TORQUE"),
    ("exec-ca2f8e75-6706-4ec7-a540-c4e4986db88a.png", "chevy-305-firing-order.webp", "CHEVY 305", "FIRING ORDER"),
    ("exec-65d8605d-acc6-4552-8b22-b6195757d98e.png", "chevy-36-timing-chain.webp", "CHEVY 3.6", "TIMING CHAIN GUIDE"),
    ("exec-26c9be9e-8d87-4b1d-b46c-3fbfe3e775b5.png", "ford-27-ecoboost-oil-capacity.webp", "FORD 2.7 ECOBOOST", "OIL CAPACITY"),
    ("exec-140d391b-8577-410c-b884-7b9b0701593c.png", "toyota-corolla-lug-nut-torque.webp", "TOYOTA COROLLA", "LUG NUT TORQUE"),
    ("exec-fc4a40d5-6e6d-4fbb-8238-56f1199ddcef.png", "toyota-highlander-lug-nut-torque.webp", "TOYOTA HIGHLANDER", "LUG NUT TORQUE"),
]

bold = r"C:\Windows\Fonts\arialbd.ttf"
regular = r"C:\Windows\Fonts\arial.ttf"
mono = r"C:\Windows\Fonts\consolab.ttf"
brand_font = ImageFont.truetype(bold, 38)
subbrand_font = ImageFont.truetype(mono, 16)
title_font = ImageFont.truetype(bold, 66)
topic_font = ImageFont.truetype(bold, 78)
domain_font = ImageFont.truetype(mono, 23)
small_font = ImageFont.truetype(regular, 18)

for src_name, dst_name, vehicle, topic in items:
    src = GENERATED / src_name
    if not src.exists():
        raise FileNotFoundError(src)
    im = Image.open(src).convert("RGB")
    target_ratio = 3 / 2
    ratio = im.width / im.height
    if ratio > target_ratio:
        new_w = int(im.height * target_ratio)
        left = (im.width - new_w) // 2
        im = im.crop((left, 0, left + new_w, im.height))
    elif ratio < target_ratio:
        new_h = int(im.width / target_ratio)
        top = (im.height - new_h) // 2
        im = im.crop((0, top, im.width, top + new_h))
    im = im.resize((1536, 1024), Image.Resampling.LANCZOS)
    im = ImageEnhance.Contrast(im).enhance(1.06)

    overlay = Image.new("RGBA", im.size, (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for x in range(1050):
        alpha = int(224 * (1 - x / 1050) ** 1.55)
        od.line((x, 0, x, 1024), fill=(3, 10, 15, alpha))
    od.rectangle((0, 0, 1536, 10), fill=(255, 105, 0, 255))
    od.rectangle((0, 925, 1536, 1024), fill=(4, 11, 16, 235))
    im = Image.alpha_composite(im.convert("RGBA"), overlay)
    d = ImageDraw.Draw(im)

    cx, cy, r = 98, 102, 52
    hex_pts = [(cx, cy-r), (cx+45, cy-26), (cx+45, cy+26), (cx, cy+r), (cx-45, cy+26), (cx-45, cy-26)]
    d.polygon(hex_pts, fill=(255, 105, 0, 255))
    inner = [(cx, cy-r+12), (cx+34, cy-20), (cx+34, cy+20), (cx, cy+r-12), (cx-34, cy+20), (cx-34, cy-20)]
    d.polygon(inner, fill=(5, 14, 20, 255))
    d.text((cx, cy+1), "TS", font=ImageFont.truetype(bold, 30), fill=(255,255,255), anchor="mm")
    d.text((170, 68), "TORQUE", font=brand_font, fill=(245,248,249))
    torque_w = d.textlength("TORQUE", font=brand_font)
    d.text((170 + torque_w, 68), "SHEET", font=brand_font, fill=(255,105,0))
    d.text((172, 113), "MECHANICAL REFERENCE", font=subbrand_font, fill=(126,168,193))

    d.rectangle((70, 270, 78, 585), fill=(255,105,0))
    d.text((110, 286), vehicle, font=title_font, fill=(238,244,247))
    d.text((110, 372), topic, font=topic_font, fill=(255,132,40))
    d.text((112, 480), "VERIFIED SPECS  •  PROCEDURES  •  DIAGRAMS", font=small_font, fill=(160,184,196))

    d.text((70, 969), "TORQUESHEET.COM", font=domain_font, fill=(255,132,40), anchor="lm")
    d.text((1465, 969), "DOWNLOADABLE TECHNICAL REFERENCE", font=small_font, fill=(152,169,178), anchor="rm")
    im.convert("RGB").save(OUT / dst_name, "WEBP", quality=88, method=6)

print(f"Branded {len(items)} feature images in {OUT}")
