# Verzija s postani-trener.vercel.app

Ovo je točna kopija stranice koja je objavljena na
https://postani-trener.vercel.app — iste datoteke, bajt za bajt.

Obična statična stranica: HTML, CSS i JS, bez builda i bez ovisnosti.
Otvori `index.html` u pregledniku ili je objavi kakva jest.

| Što | Gdje |
|---|---|
| hrvatske stranice | `index.html`, `predavaci.html`, `kurikulum.html`, `price.html` |
| engleske stranice | `en/` |
| dizajn | `css/style.css` |
| animacije i ponašanje | `js/main.js` (GSAP, ScrollTrigger, SplitText, Lenis u `js/vendor/`) |
| slike predavača | `img/pred/` |

## Objava na Vercelu

Vercel → Add New → Project → Import ovaj repozitorij → **Root Directory** postavi na
`verzija-postani-trener.vercel.app` → Framework Preset: Other → Deploy.

## Prije lansiranja

Canonical, Open Graph, `robots.txt` i `sitemap.xml` pokazuju na privremenu adresu
`postani-trener-demo.example`. Zamijeni je pravom domenom u svim `.html` datotekama
te u `robots.txt` i `sitemap.xml`.

Novija verzija stranice (V3) nalazi se u korijenu ovog repozitorija.
