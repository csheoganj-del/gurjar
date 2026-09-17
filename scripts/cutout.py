from pathlib import Path

import numpy as np
from PIL import Image

SESSION = Path(
    r"C:\Users\MASTER PC\.grok\sessions"
    r"\C%3A%5CUsers%5CMASTER%20PC%5CDownloads%5Cman%20singh%20gurjar"
    r"\01a0af3c-2e1f-7ee3-9e96-9908069c86b2\images"
)
OUT = Path(r"C:\Users\MASTER PC\Downloads\man singh gurjar\gurjar\public\objects\cutouts")

SOURCES = {
    "watch": SESSION / "27.jpg",
    "rose": SESSION / "22.jpg",
    "pen": SESSION / "24.jpg",
    "folio": SESSION / "25.jpg",
    "laptop": SESSION / "23.jpg",
    "tech": SESSION / "26.jpg",
    "book": SESSION / "28.jpg",
    "table-app": SESSION / "21.jpg",
}


def chroma_to_png(src: Path, dest: Path) -> None:
    image = Image.open(src).convert("RGBA")
    width, height = image.size
    image = image.crop((0, 0, width, int(height * 0.96)))
    pixels = np.array(image).astype(np.float32)
    red, green, blue = pixels[:, :, 0], pixels[:, :, 1], pixels[:, :, 2]
    dominance = green - np.maximum(red, blue)
    chroma = (green > 90) & (dominance > 28)
    t = np.clip((dominance - 18) / 55.0, 0.0, 1.0)
    alpha = np.where(chroma, 1.0 - t, 1.0)
    alpha = np.where((green > 170) & (dominance > 40), 0.0, alpha)
    spill = np.clip(dominance / 180.0, 0.0, 1.0)
    pixels[:, :, 1] = np.clip(green - spill * 70.0, 0, 255)
    pixels[:, :, 3] = np.clip(alpha * 255.0, 0, 255)
    keyed = Image.fromarray(pixels.astype(np.uint8), "RGBA")
    bbox = keyed.getbbox()
    if bbox:
        pad = 18
        left, top, right, bottom = bbox
        keyed = keyed.crop(
            (
                max(0, left - pad),
                max(0, top - pad),
                min(keyed.width, right + pad),
                min(keyed.height, bottom + pad),
            )
        )
    dest.parent.mkdir(parents=True, exist_ok=True)
    keyed.save(dest, "PNG")
    print(f"wrote {dest.name} {keyed.size}")


def main() -> None:
    for name, path in SOURCES.items():
        chroma_to_png(path, OUT / f"{name}.png")


if __name__ == "__main__":
    main()
