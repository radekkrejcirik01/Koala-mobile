"""Frames raw Android emulator captures into Google Play screenshots.

Usage: python compose_android.py <raw_dir> <out_dir>
Writes phone screenshots (1080x1920), the feature graphic (1024x500)
and _overview.png.
"""
import os
import sys

from PIL import Image, ImageDraw, ImageFilter, ImageFont

from slides import SLIDES

RAW, OUT = sys.argv[1], sys.argv[2]
W, H = 1080, 1920
BG, INK, MUTED = '#fbefd7', '#050210', '#8a7d68'
FONT = '/System/Library/Fonts/SFNSRounded.ttf'
SCREEN_W, BEZEL, RADIUS = 760, 16, 70
ROOM = os.path.join(os.path.dirname(__file__),
                    '../../src/assets/illustrations/room.jpg')


def font(size, weight):
    f = ImageFont.truetype(FONT, size)
    f.set_variation_by_name(weight)
    return f


TITLE, SUB = font(80, 'Bold'), font(36, 'Medium')
PHONE = os.path.join(OUT, 'phone (1080x1920)')
os.makedirs(PHONE, exist_ok=True)

frames = []
for name, title, sub in SLIDES:
    shot = Image.open(os.path.join(RAW, f'{name}.png')).convert('RGB')
    # Hide the system "no screen lock" icon next to the clock
    ImageDraw.Draw(shot).rectangle((170, 30, 255, 115),
                                   fill=shot.getpixel((300, 72)))

    canvas = Image.new('RGB', (W, H), BG)
    sh = round(shot.height * SCREEN_W / shot.width)
    shot = shot.resize((SCREEN_W, sh), Image.LANCZOS)
    pw, ph = SCREEN_W + BEZEL * 2, sh + BEZEL * 2
    # Play caps the aspect ratio at 2:1, so the phone runs off the bottom
    x, y = (W - pw) // 2, 470

    shadow = Image.new('L', (W, H), 0)
    ImageDraw.Draw(shadow).rounded_rectangle(
        (x + 8, y + 30, x + pw - 8, y + ph + 30), RADIUS + BEZEL, fill=45)
    shadow = shadow.filter(ImageFilter.GaussianBlur(40))
    canvas.paste(Image.new('RGB', (W, H), '#1d1830'), (0, 0), shadow)

    d = ImageDraw.Draw(canvas)
    d.rounded_rectangle((x - 3, y - 3, x + pw + 3, y + ph + 3),
                        RADIUS + BEZEL + 3, fill='#e6d7b8')
    d.rounded_rectangle((x, y, x + pw, y + ph), RADIUS + BEZEL, fill='#111015')
    mask = Image.new('L', shot.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle(
        (0, 0, SCREEN_W - 1, sh - 1), RADIUS, fill=255)
    canvas.paste(shot, (x + BEZEL, y + BEZEL), mask)

    # Punch-hole camera
    cx, cy, r = W // 2, y + BEZEL + 26, 13
    d.ellipse((cx - r, cy - r, cx + r, cy + r), fill='#000000')

    d.multiline_text((W / 2, 150), title, font=TITLE, fill=INK, anchor='ma',
                     align='center', spacing=16)
    d.text((W / 2, 360), sub, font=SUB, fill=MUTED, anchor='ma')

    canvas.save(os.path.join(PHONE, f'{name}.png'))
    frames.append(canvas)

# Feature graphic
FW, FH = 1024, 500
graphic = Image.new('RGB', (FW, FH), BG)
room = Image.open(ROOM).convert('RGB')
rw = 500
room = room.resize((rw, round(room.height * rw / room.width)), Image.LANCZOS)
graphic.paste(room, (FW - rw - 16, (FH - room.height) // 2))
d = ImageDraw.Draw(graphic)
d.text((60, 150), 'Koala', font=font(104, 'Bold'), fill=INK)
d.multiline_text((64, 285), 'Share how you feel\nwith your closest\nfriends',
                 font=font(34, 'Medium'), fill=MUTED, spacing=10)
graphic.save(os.path.join(OUT, 'feature_graphic (1024x500).png'))

overview = Image.new('RGB', (370 * len(frames) + 10, 920), '#e9e9ee')
for i, frame in enumerate(frames):
    overview.paste(frame.resize((360, 640)), (10 + i * 370, 10))
overview.paste(graphic.resize((512, 250)), (10, 660))
overview.save(os.path.join(OUT, '_overview.png'))
