/* ============================================================================
   PREDAVAČI — jedini izvor istine za oba jezika i sve stranice.
   ----------------------------------------------------------------------------
   PRAVILO: ništa se ne izmišlja. Klijent je poslao SAMO imena. Titule, opisi,
   biografije i fotografije stižu naknadno ("SVE SLIKE I FULL BIO ŠALJEM USKORO").
   Dok je polje null, sučelje ga jednostavno ne prikazuje — nigdje se ne ispisuje
   [TITULA] ni [BIOGRAFIJA].

   KAKO DODATI PREDAVAČA (bez ijedne izmjene u dizajnu):
     dodaj objekt u niz. `order` određuje redoslijed. Mreža je testirana na
     4, 8, 12 i 16 profila.

   POLJA
     slug        obavezno · URL sidro: /predavaci#slug
     name        obavezno · piše se točno, s dijakriticima
     initials    obavezno · monogram dok nema fotografije
     featured    true samo za glavnog mentora (Frane) — dobiva vlastitu sekciju
     title       {hr,en} ili null · npr. 'Nutricionist'
     oneLine     {hr,en} ili null · jedna rečenica, klijentov format
     bio         {hr,en} (niz odlomaka) ili null · puni CV
     specialties {hr,en} (niz) ili null
     credentials {hr,en} (niz) ili null
     modules     (niz slugova iz curriculum.mjs) ili null
     image       { src, alt:{hr,en}, w, h, focus } ili null
     links       { instagram, web, linkedin } — samo potvrđeni URL-ovi
   ========================================================================== */

export const trainers = [
  {
    slug: 'frane-jercic',
    name: 'Frane Jerčić',
    initials: 'FJ',
    featured: true,
    order: 1,
    title: { hr: 'Osnivač i voditelj edukacije', en: 'Founder and lead mentor' },
    /* Prvo lice, doslovno iz klijentove ploče ("rad s više od 1000 klijenata").
       Ništa se ne preračunava ni ne pripisuje. */
    oneLine: {
      hr: 'Coaching posao gradio sam kroz praksu, pogreške i rad s više od 1000 klijenata.',
      en: 'I built my coaching business through practice, mistakes and work with more than 1,000 clients.',
    },
    /* Prvi odlomak je klijentov vlastiti tekst iz FAQ-a ("Zašto ova edukacija
       postoji?"), pisan u prvom licu. Ništa dodano. */
    bio: {
      hr: [
        'Zato što sam i sam bio trener koji je tražio odgovore. Godinama sam gradio coaching posao kroz praksu, pogreške, testiranja i rad s više od 1000 klijenata.',
        'Cilj ove edukacije je prenijeti taj blueprint novoj generaciji trenera i pomoći im da do rezultata dođu brže nego što sam ja došao.',
      ],
      en: [
        'Because I was a trainer looking for answers myself. For years I built my coaching business through practice, mistakes, testing and work with more than 1,000 clients.',
        'The goal of this education is to hand that blueprint to a new generation of trainers and help them get to results faster than I did.',
      ],
    },
    specialties: null,
    credentials: null,
    modules: null,
    image: null,
    links: { instagram: 'https://www.instagram.com/postani_trener/', web: null, linkedin: null },
  },

  /* ---- Suradnici. Klijent je poslao isključivo imena. ---- */
  { slug: 'marino-basic', name: 'Marino Bašić', initials: 'MB', order: 2 },
  { slug: 'sebastijan-orlic', name: 'Sebastijan Orlić', initials: 'SO', order: 3 },
  { slug: 'marin-mandaric', name: 'Marin Mandarić', initials: 'MM', order: 4 },
  { slug: 'tomislav-biscan', name: 'Tomislav Bišćan', initials: 'TB', order: 5 },
  { slug: 'andjela-djindjic', name: 'Anđela Đinđić', initials: 'AĐ', order: 6 },
  { slug: 'jovan-cvetojevic', name: 'Jovan Cvetojević', initials: 'JC', order: 7 },
  { slug: 'nikolina-skof-erdelja', name: 'Nikolina Škof Erdelja', initials: 'NŠ', order: 8 },
  { slug: 'gabrijel-simicic', name: 'Gabrijel Šimičić', initials: 'GŠ', order: 9 },
  { slug: 'damir-lastre', name: 'Damir Laštre', initials: 'DL', order: 10 },
  { slug: 'domagoj-pavic', name: 'Domagoj Pavić', initials: 'DP', order: 11 },
].map((t) => ({
  featured: false,
  title: null,
  oneLine: null,
  bio: null,
  specialties: null,
  credentials: null,
  modules: null,
  image: null,
  links: {},
  ...t,
})).sort((a, b) => a.order - b.order);

export const mentor = trainers.find((t) => t.featured) || trainers[0];
export const contributors = trainers.filter((t) => !t.featured);

/* Je li roster potpun? Kad svi suradnici dobiju titulu i jednu rečenicu,
   uljudna napomena "profili se objavljuju kako materijali stižu" nestaje sama. */
export const rosterComplete = contributors.every((t) => t.title && t.oneLine);
