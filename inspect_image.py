from PIL import Image
import numpy as np

img = Image.open("/tmp/file_attachments/2026-07-18 12_27_37-Camp Candor MMORPG_IT.png").convert("RGB")
w, h = img.size
print(f"Image size: {w}x{h}")

# Sample colors vertically down the middle
samples = []
for y in range(0, h, 10):
    r, g, b = img.getpixel((w//2, y))
    samples.append((y, (r,g,b)))

print("Vertical color profile down the center:")
for y, color in samples:
    print(f"y={y}: RGB={color}")
