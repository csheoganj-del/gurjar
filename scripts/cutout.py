from collections import deque
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


def dilate(mask: np.ndarray, steps: int) -> np.ndarray:
    out = mask.copy()
    for _ in range(steps):
        pad = np.pad(out, 1, constant_values=False)
        out = (
            out
            | pad[:-2, 1:-1]
            | pad[2:, 1:-1]
            | pad[1:-1, :-2]
            | pad[1:-1, 2:]
            | pad[:-2, :-2]
            | pad[:-2, 2:]
            | pad[2:, :-2]
            | pad[2:, 2:]
        )
    return out


def chroma_to_png(src: Path, dest: Path) -> None:
    image = Image.open(src).convert("RGBA")
    width, height = image.size
    image = image.crop((0, 0, width, int(height * 0.97)))
    pixels = np.array(image).astype(np.float32)
    red, green, blue = pixels[:, :, 0], pixels[:, :, 1], pixels[:, :, 2]
    dominance = green - np.maximum(red, blue)
    chroma = (green > 70) & (dominance > 18)
    h, w = chroma.shape
    visited = np.zeros((h, w), dtype=bool)
    queue = deque()
    for x in range(w):
        for y in (0, h - 1):
            if chroma[y, x]:
                visited[y, x] = True
                queue.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if chroma[y, x] and not visited[y, x]:
                visited[y, x] = True
                queue.append((y, x))
    while queue:
        y, x = queue.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and chroma[ny, nx]:
                visited[ny, nx] = True
                queue.append((ny, nx))
    screen = dilate(visited, 3) | ((green > 130) & (dominance > 28))
    alpha = np.where(screen, 0.0, 1.0)
    # kill leftover green-tinted glass / fringe
    leftover = (~screen) & (green > red + 12) & (green > blue + 12) & (green > 60)
    alpha = np.where(leftover, 0.0, alpha)
    spill = np.clip((green - np.maximum(red, blue)) / 80.0, 0.0, 1.0)
    pixels[:, :, 1] = np.clip(green - spill * 90.0, 0, 255)
    pixels[:, :, 3] = np.clip(alpha * 255.0, 0, 255)
    keyed = Image.fromarray(pixels.astype(np.uint8), "RGBA")
    bbox = keyed.getbbox()
    if bbox:
        pad = 6
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
    vis = np.array(keyed)[:, :, 3] > 20
    g = np.array(keyed)[:, :, 1].astype(float)
    r = np.array(keyed)[:, :, 0].astype(float)
    b = np.array(keyed)[:, :, 2].astype(float)
    green_left = vis & (g > r + 15) & (g > b + 15) & (g > 80)
    print(f"wrote {dest.name} {keyed.size} leftover-green {round(100 * green_left.mean(), 2)}%")


def main() -> None:
    for name, path in SOURCES.items():
        chroma_to_png(path, OUT / f"{name}.png")


if __name__ == "__main__":
    main()
