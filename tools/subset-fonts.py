#!/usr/bin/env python3
"""
Podskup fontova za Postani trener.

Fontsource isporucuje po dvije datoteke za obitelj (latin + latin-ext), a
latin-ext nosi i vijetnamski i cijeli Latin Extended Additional koji ovoj
stranici ne trebaju. Ovdje se svaka datoteka reze na raspon koji nam treba,
a podjela latin / latin-ext OSTAJE (svaka datoteka i dalje pokriva svoj
unicode-range iz CSS-a).

Zadrzano je namjerno vise nego sto je danas na stranici — klijent jos salje
biografije, titule i price, pa se nijedno slovo ne smije izgubiti:
  ASCII, Latin-1 Supplement, cijeli Latin Extended-A (tu su c c z s d),
  rumunjski s/t s zarezom, tipografska interpunkcija, eurosimbol, strelice.

Izvor: fonts-src/   ->   izlaz: static/fonts/
Pokretanje: python3 tools/subset-fonts.py
"""
import pathlib, sys
from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC = ROOT / 'fonts-src'
OUT = ROOT / 'static' / 'fonts'

UNICODES = (
    "U+0020-007E,"
    "U+00A0-00FF,"
    "U+0100-017F,"
    "U+0192,U+01A0-01A1,U+01AF-01B0,"
    "U+0218-021B,"
    "U+02BB-02BC,U+02C6,U+02DA,U+02DC,"
    "U+0300-0304,U+0308,U+030A,U+030C,U+0327,U+0328,U+0329,"
    "U+2000-206F,"
    "U+20AC,"
    "U+2122,U+2190-2193,U+2212,U+2215,U+2022,U+2026,"
    "U+FEFF,U+FFFD"
)

# Uz podskup znakova, varijabilnim se fontovima suzava i raspon osi na ono sto
# CSS stvarno koristi (tezine 380-800, sirine 100-112%). Masteri izvan tog
# raspona su cista tezina datoteke. @font-face deskriptori u v3.css MORAJU
# odgovarati ovim rasponima.
FILES = [
    ('archivo-latin-wdth-normal.woff2', {'wght': (350, 850), 'wdth': (100, 115)}),
    ('archivo-latin-ext-wdth-normal.woff2', {'wght': (350, 850), 'wdth': (100, 115)}),
    ('inter-latin-wght-normal.woff2', {'wght': (350, 700)}),
    ('inter-latin-ext-wght-normal.woff2', {'wght': (350, 700)}),
    ('instrument-serif-latin-400-italic.woff2', None),
    ('instrument-serif-latin-ext-400-italic.woff2', None),
]

if not SRC.exists():
    sys.exit('nedostaje fonts-src')

wanted = subset.parse_unicodes(UNICODES)
before = after = 0
for name, limits in FILES:
    src = SRC / name
    if not src.exists():
        sys.exit('nedostaje ' + str(src))
    b = src.stat().st_size
    font = TTFont(str(src))
    opts = subset.Options()
    opts.flavor = 'woff2'
    opts.layout_features = ['*']
    opts.name_IDs = ['*']
    opts.notdef_outline = True
    opts.recalc_bounds = True
    opts.drop_tables = []
    opts.desubroutinize = False
    sub = subset.Subsetter(options=opts)
    sub.populate(unicodes=wanted)
    sub.subset(font)
    # Redoslijed je vazan: instancer poslije subseta. Obrnuto puca na gvar.
    if limits and 'fvar' in font:
        font = instancer.instantiateVariableFont(font, limits, updateFontNames=False, inplace=True)
    dest = OUT / name
    font.flavor = 'woff2'
    font.save(str(dest))
    n_glyphs = len(font.getGlyphOrder())
    font.close()
    a = dest.stat().st_size
    before += b; after += a
    print(f'{name:44s} {b/1024:7.1f} kB -> {a/1024:6.1f} kB  ({n_glyphs} glifova)')
print(f'{"UKUPNO":44s} {before/1024:7.1f} kB -> {after/1024:6.1f} kB')
