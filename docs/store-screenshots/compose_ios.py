"""Frames raw iOS simulator captures into App Store screenshots.

Usage: python compose_ios.py <raw_dir> <out_dir>
Writes 6.9" (1320x2868) and 6.3" (1206x2622) sets plus _overview.png.
"""
import os
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

from slides import SLIDES

RAW, OUT = sys.argv[1], sys.argv[2]
W, H = 1320, 2868
BG, INK, MUTED = '#fbefd7', '#050210', '#8a7d68'
FONT = '/System/Library/Fonts/SFNSRounded.ttf'
SCREEN_W, BEZEL, RADIUS = 930, 20, 128


def font(size, weight):
    f = ImageFont.truetype(FONT, size)
    f.set_variation_by_name(weight)
    return f


TITLE, SUB = font(98, 'Bold'), font(44, 'Medium')
LARGE = os.path.join(OUT, '6.9-inch (1320x2868)')
SMALL = os.path.join(OUT, '6.3-inch (1206x2622)')
os.makedirs(LARGE, exist_ok=True)
os.makedirs(SMALL, exist_ok=True)

frames = []
for name, title, sub in SLIDES:
    canvas = Image.new('RGB', (W, H), BG)

    shot = Image.open(os.path.join(RAW, f'{name}.png')).convert('RGB')
    sh = round(shot.height * SCREEN_W / shot.width)
    shot = shot.resize((SCREEN_W, sh), Image.LANCZOS)
    pw, ph = SCREEN_W + BEZEL * 2, sh + BEZEL * 2
    x, y = (W - pw) // 2, 640

    shadow = Image.new('L', (W, H), 0)
    ImageDraw.Draw(shadow).rounded_rectangle(
        (x + 10, y + 40, x + pw - 10, y + ph + 40), RADIUS + BEZEL, fill=45)
    shadow = shadow.filter(ImageFilter.GaussianBlur(50))
    canvas.paste(Image.new('RGB', (W, H), '#1d1830'), (0, 0), shadow)

    d = ImageDraw.Draw(canvas)
    d.rounded_rectangle((x - 4, y - 4, x + pw + 4, y + ph + 4),
                        RADIUS + BEZEL + 4, fill='#e6d7b8')
    d.rounded_rectangle((x, y, x + pw, y + ph), RADIUS + BEZEL, fill='#111015')
    mask = Image.new('L', shot.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, SCREEN_W - 1, sh - 1), RADIUS, fill=255)
    canvas.paste(shot, (x + BEZEL, y + BEZEL), mask)

    # Dynamic Island, simulator captures don't include it
    iw, ih = 262, 76
    top = y + BEZEL + 28
    d.rounded_rectangle((W // 2 - iw // 2, top, W // 2 + iw // 2, top + ih),
                        ih // 2, fill='#000000')

    lines = title.split('\n')
    for i, line in enumerate(lines):
        width = d.textlength(line, font=TITLE)
        d.text(((W - width) / 2, 190 + i * 118), line, font=TITLE, fill=INK)
    d.text((W / 2, 216 + len(lines) * 118), sub, font=SUB, fill=MUTED,
           anchor='ma')

    canvas.save(os.path.join(LARGE, f'{name}.png'))
    canvas.resize((1206, 2622), Image.LANCZOS).save(
        os.path.join(SMALL, f'{name}.png'))
    frames.append(canvas)

overview = Image.new('RGB', (340 * len(frames) + 10, 737), '#e9e9ee')
for i, frame in enumerate(frames):
    overview.paste(frame.resize((330, 717)), (10 + i * 340, 10))
overview.save(os.path.join(OUT, '_overview.png'))
