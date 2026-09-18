# Postani trener · V3 — potrebni materijali

Generirano iz `content/` pri buildu. Ne uređuj ručno — dodaj podatke u
`content/trainers.mjs` i `content/site.mjs`, pa pokreni `node build.mjs`.

## 1. Fotografije

Sve fotografije idu u `static/img/`. Format: **AVIF ili WebP** (uz JPG fallback nije
potreban — svi ciljani preglednici podržavaju WebP). Bez rastezanja, bez lošeg reza
lica; ako lice nije centrirano, postavi `focus` u podatkovnoj datoteci.

| Slot | Stranica / sekcija | Motiv | Desktop | Mobitel | Omjer | Min. rezolucija |
|---|---|---|---|---|---|---|
| `hero-mentor` | Naslovnica → Mentor | Portret Frane Jerčića, tamno gym/uredničko okruženje, pogled u objektiv | 1600 × 2000 | 800 × 1000 | 4:5 | 1600 px šireg ruba |
| `video-poster` | Naslovnica → Prodajni video | Kadar iz prodajnog videa ili portret u kadru 16:9 | 1920 × 1080 | 960 × 540 | 16:9 | 1600 px |
| `trainer-frane-jercic` | Predavači → Frane Jerčić | Portret, ista rasvjeta i pozadina za cijeli tim | 1600 × 2000 | 800 × 1000 | 4:5 | 1200 px |
| `trainer-marino-basic` | Predavači → Marino Bašić | Portret, ista rasvjeta i pozadina za cijeli tim | 1600 × 2000 | 800 × 1000 | 4:5 | 1200 px |
| `trainer-sebastijan-orlic` | Predavači → Sebastijan Orlić | Portret, ista rasvjeta i pozadina za cijeli tim | 1600 × 2000 | 800 × 1000 | 4:5 | 1200 px |
| `trainer-marin-mandaric` | Predavači → Marin Mandarić | Portret, ista rasvjeta i pozadina za cijeli tim | 1600 × 2000 | 800 × 1000 | 4:5 | 1200 px |
| `trainer-tomislav-biscan` | Predavači → Tomislav Bišćan | Portret, ista rasvjeta i pozadina za cijeli tim | 1600 × 2000 | 800 × 1000 | 4:5 | 1200 px |
| `trainer-andjela-djindjic` | Predavači → Anđela Đinđić | Portret, ista rasvjeta i pozadina za cijeli tim | 1600 × 2000 | 800 × 1000 | 4:5 | 1200 px |
| `trainer-jovan-cvetojevic` | Predavači → Jovan Cvetojević | Portret, ista rasvjeta i pozadina za cijeli tim | 1600 × 2000 | 800 × 1000 | 4:5 | 1200 px |
| `trainer-nikolina-skof-erdelja` | Predavači → Nikolina Škof Erdelja | Portret, ista rasvjeta i pozadina za cijeli tim | 1600 × 2000 | 800 × 1000 | 4:5 | 1200 px |
| `trainer-gabrijel-simicic` | Predavači → Gabrijel Šimičić | Portret, ista rasvjeta i pozadina za cijeli tim | 1600 × 2000 | 800 × 1000 | 4:5 | 1200 px |
| `trainer-damir-lastre` | Predavači → Damir Laštre | Portret, ista rasvjeta i pozadina za cijeli tim | 1600 × 2000 | 800 × 1000 | 4:5 | 1200 px |
| `trainer-domagoj-pavic` | Predavači → Domagoj Pavić | Portret, ista rasvjeta i pozadina za cijeli tim | 1600 × 2000 | 800 × 1000 | 4:5 | 1200 px |
| `og` | Društvene mreže (HR) | Wordmark + naslov, tamna ploha | 1200 × 630 | — | 1.91:1 | 1200 px |
| `og-en` | Društvene mreže (EN) | Isto, engleski naslov | 1200 × 630 | — | 1.91:1 | 1200 px |

### Kako uključiti sliku predavača

U `content/trainers.mjs`, na objektu tog predavača:

```js
image: {
  src: 'img/trainer-marino-basic.webp',
  alt: { hr: 'Marino Bašić', en: 'Marino Bašić' },
  w: 1600, h: 2000,
}
```

**Mreža ima dva načina i sama bira.** Dok NIJEDAN predavač nema fotografiju, roster
se renderira tipografski (monogram + ime), kao odjavna špica — a ne kao zid od
dvanaest praznih portretnih okvira. Čim prvi `image` postoji, ista mreža prelazi u
foto-način i predavači bez slike dobivaju monogram u portretnom okviru.

Nikad se ne koristi tuđa ili stock fotografija uz ime stvarne osobe.

## 2. Tekstualni sadržaj koji još nedostaje

| Što | Gdje se upisuje | Status |
|---|---|---|
| Stripe / checkout URL | `content/site.mjs` → `checkout.url` | **nedostaje** — svi CTA-ovi privremeno vode na Instagram |
| YouTube ID prodajnog videa | `content/site.mjs` → `video.youtubeId` | **nedostaje** — sekcija prikazuje rezervirano stanje |
| Titule i jedna rečenica po predavaču | `content/trainers.mjs` → `title`, `oneLine` | **nedostaje** za 10 od 10 suradnika |
| Pune biografije predavača | `content/trainers.mjs` → `bio` | 1/11 zaprimljeno |
| Nazivi i trajanja lekcija | `content/curriculum.mjs` → `areas[].lessons` | **nedostaje** — prikazana su samo područja i teme |
| Priče polaznika | nova datoteka `content/stories.mjs` | **nedostaje** — stranica `/price` prikazuje pošteno rezervirano stanje |
| Video i pisane recenzije | nova datoteka `content/stories.mjs` | **nedostaje** |
| Godina za rok popusta „15.9." | `content/site.mjs` → `price.deadlineHr` | nepoznata — zato NEMA odbrojavanja |
| Facebook grupa, kontakt e-mail | `content/site.mjs` → `social` | **nedostaje** — link se ne renderira dok je `null` |

## 3. Na dan lansiranja

1. `content/site.mjs` → `checkout.url = 'https://…'` (jedna linija, svih 8 stranica).
2. `content/site.mjs` → `noindex: false`.
3. `node build.mjs` i deploy.
