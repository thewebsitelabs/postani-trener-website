# Postani trener — V3

Statična stranica za edukaciju **Postani trener** (Frane Jerčić).
Osam stranica: hrvatski (`/`, `/predavaci`, `/kurikulum`, `/price`) i engleski
(`/en`, `/en/instructors`, `/en/curriculum`, `/en/stories`).

Bez frameworka, bez ovisnosti u runtimeu, bez animacijskih biblioteka.
Generator je jedna Node skripta koja iz `/content` ispisuje HTML u `/dist`.

## Pokretanje

```bash
node build.mjs        # generira /dist
node serve.mjs        # lokalni posluzitelj na :4489 (radi cleanUrls kao Vercel)
```

## Gdje se sto mijenja

| Trebam promijeniti | Datoteka |
|---|---|
| checkout / Stripe link, cijenu, rok popusta, brojke, video, mreze, NOINDEX | `content/site.mjs` |
| predavace (ime, titula, biografija, fotografija, poredak) | `content/trainers.mjs` |
| podrucja i lekcije kurikuluma | `content/curriculum.mjs` |
| prigovore i cesta pitanja | `content/faq.mjs` |
| sav ostali tekst, hrvatski i engleski | `content/copy.mjs` |
| dizajn | `static/css/v3.css` |
| ponasanje (izbornik, harmonike, video, otkrivanje, brojaci) | `static/js/app.js` |

Nijedna od tih vrijednosti nije prepisana ni u jednu komponentu. `ASSETS_REQUIRED.md`
se generira pri svakom buildu i uvijek pokazuje sto jos nedostaje.

## Pravila koja se ne krse

1. **Nista se ne izmislja.** Ni titula, ni recenzija, ni brojka, ni fotografija
   stvarne osobe. Polje koje je `null` se jednostavno ne prikazuje — nigdje ne pise
   `[TITULA]` ni `[BIOGRAFIJA]`.
2. **Bez JS-a je stranica potpuna.** Brojke stoje na pravim vrijednostima u HTML-u,
   harmonike su otvorene, svi linkovi rade. JS samo dodaje ponasanje.
3. **`href="#"` nikad ne ide u produkciju.** Svi CTA-ovi prolaze kroz jednu konstantu.
4. **Nikad automatsko rastavljanje rijeci.** `hyphens:manual` posvuda — klijent je
   uocio `EDUKACI-JU` na prethodnoj verziji.
5. **Nema odbrojavanja.** Klijent nije dao godinu za rok „15.9.".

## Fontovi

`static/fonts/` su **podskupljene** datoteke. Izvornici su u `fonts-src/`.
Nakon zamjene izvornika pokreni:

```bash
python3 tools/subset-fonts.py     # 336 kB -> 174 kB
```

Skripta uz znakove suzava i raspone osi varijabilnih fontova. Rasponi u
`@font-face` deskriptorima u `static/css/v3.css` moraju odgovarati skripti.

## Deploy (Vercel, besplatni plan)

Potreban je samo Node.js 18+ — nema `npm install`, nema ovisnosti.

**Preko GitHuba (preporuceno):** na vercel.com → Add New → Project → Import ovaj repozitorij.
Postavke se citaju same iz `vercel.json` u korijenu (build `node build.mjs`, izlaz `dist`) —
samo klikni Deploy.

Svaki `git push` na `main` automatski objavljuje novu verziju.

**Preko CLI-ja:**

```bash
node build.mjs
cd dist && vercel --prod
```

Prije lansiranja: u `content/site.mjs` postavi `noindex: false` (stranica je trenutno
skrivena od Googlea) i upisi pravi checkout link.
