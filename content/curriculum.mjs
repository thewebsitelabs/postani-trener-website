/* ============================================================================
   KURIKULUM — sedam područja, doslovno iz klijentove ploče (SEKCIJA 8).
   ----------------------------------------------------------------------------
   Klijent NIJE poslao nazive pojedinačnih lekcija ni njihov broj/trajanje.
   Zato `lessons` stoji prazan: struktura postoji, sadržaj se dodaje bez
   ijedne izmjene u dizajnu.

   KAKO DODATI LEKCIJE:
     lessons: [
       { hr:'Naziv lekcije', en:'Lesson title', minutes: 24, trainer:'slug-predavaca' },
     ]
   Kad niz nije prazan, stranica sama prikaže popis, trajanje i predavača.
   ========================================================================== */

export const areas = [
  {
    slug: 'izgradnja-online-coaching-posla',
    number: '01',
    title: { hr: 'Izgradnja online coaching posla', en: 'Building an online coaching business' },
    goal: {
      hr: 'Izgraditi stabilan sustav za dolazak do novih klijenata.',
      en: 'Build a stable system for bringing in new clients.',
    },
    topics: {
      hr: ['dolazak do prvih 50 online klijenata', 'osobni brend', 'Instagram', 'Facebook', 'sadržaj', 'prodaja', 'kreiranje sadržaja', 'pozicioniranje'],
      en: ['reaching your first 50 online clients', 'personal brand', 'Instagram', 'Facebook', 'content', 'sales', 'content creation', 'positioning'],
    },
    lessons: [],
  },
  {
    slug: 'coaching-i-rad-s-klijentima',
    number: '02',
    title: { hr: 'Coaching i rad s klijentima', en: 'Coaching and working with clients' },
    goal: {
      hr: 'Stvoriti klijente koji ostaju, napreduju i preporučuju te dalje.',
      en: 'Create clients who stay, progress and recommend you onward.',
    },
    topics: {
      hr: ['onboarding', 'komunikacija', 'zadržavanje klijenata', 'coaching proces', 'korisničko iskustvo'],
      en: ['onboarding', 'communication', 'client retention', 'the coaching process', 'client experience'],
    },
    lessons: [],
  },
  {
    slug: 'trening-i-performance',
    number: '03',
    title: { hr: 'Trening i performance', en: 'Training and performance' },
    goal: {
      hr: 'Postati bolji trener i ostvarivati bolje rezultate.',
      en: 'Become a better trainer and deliver better results.',
    },
    topics: {
      hr: ['hipertrofija', 'snaga', 'sportska priprema', 'programiranje treninga', 'napredne metode rada'],
      en: ['hypertrophy', 'strength', 'athletic preparation', 'programme design', 'advanced methods'],
    },
    lessons: [],
  },
  {
    slug: 'nutricionizam',
    number: '04',
    title: { hr: 'Nutricionizam', en: 'Nutrition' },
    goal: {
      hr: 'Sigurnije i kvalitetnije voditi prehranu svojih klijenata.',
      en: 'Guide your clients’ nutrition with more confidence and more quality.',
    },
    topics: {
      hr: ['osnove', 'napredni nutricionizam', 'praktična primjena', 'rad s različitim tipovima klijenata'],
      en: ['fundamentals', 'advanced nutrition', 'practical application', 'working with different client types'],
    },
    lessons: [],
  },
  {
    slug: 'psihologija-i-rad-s-ljudima',
    number: '05',
    title: { hr: 'Psihologija i rad s ljudima', en: 'Psychology and working with people' },
    goal: {
      hr: 'Razumjeti ljude, ne samo trening.',
      en: 'Understand people, not just training.',
    },
    topics: {
      hr: ['ponašanje klijenata', 'adherencija', 'poremećaji prehrane', 'komunikacija', 'međuljudski odnosi'],
      en: ['client behaviour', 'adherence', 'eating disorders', 'communication', 'interpersonal dynamics'],
    },
    lessons: [],
  },
  {
    slug: 'specijalizirana-podrucja',
    number: '06',
    title: { hr: 'Specijalizirana područja', en: 'Specialised areas' },
    goal: {
      hr: 'Proširiti znanje iz područja s kojima ćeš se susretati tijekom karijere.',
      en: 'Widen your knowledge into the areas you will meet across a career.',
    },
    topics: {
      hr: ['trudnice', 'postpartum', 'rad s djecom', 'rad sa sportašima', 'dvoransko poslovanje', 'knjigovodstvo i financije'],
      en: ['pregnancy', 'postpartum', 'working with children', 'working with athletes', 'running a gym', 'bookkeeping and finance'],
    },
    lessons: [],
  },
  {
    slug: 'dozivotne-nadogradnje',
    number: '07',
    title: { hr: 'Doživotne nadogradnje', en: 'Lifetime updates' },
    goal: {
      hr: 'Edukacija koja raste dok je prolaziš.',
      en: 'An education that keeps growing while you work through it.',
    },
    body: {
      hr: 'Ova edukacija nije statičan proizvod. Nova predavanja, novi moduli i nova znanja kontinuirano se dodaju unutar postojećeg sustava bez dodatne nadoplate.',
      en: 'This is not a static product. New lectures, new modules and new knowledge are added continuously inside the existing system, at no extra cost.',
    },
    topics: null,
    lessons: [],
  },
];

/* Sve discipline koje edukacija pokriva — klijentov popis iz SEKCIJE 6,
   kolektivno, bez pripisivanja pojedinom predavaču. */
export const disciplines = {
  hr: [
    'Online coaching i poslovanje', 'Marketing i društvene mreže', 'Prodaja i pozicioniranje',
    'Trening i programiranje', 'Sportske performanse', 'Nutricionizam', 'Psihologija prehrane',
    'Coaching i rad s ljudima', 'Trudnice i postpartum', 'Rad s djecom',
    'Financije i poslovanje', 'Sustavi i organizacija',
  ],
  en: [
    'Online coaching and business', 'Marketing and social media', 'Sales and positioning',
    'Training and programming', 'Athletic performance', 'Nutrition', 'The psychology of eating',
    'Coaching and working with people', 'Pregnancy and postpartum', 'Working with children',
    'Finance and business', 'Systems and organisation',
  ],
};

export const lessonsSupplied = areas.some((a) => a.lessons && a.lessons.length);
