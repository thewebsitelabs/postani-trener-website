/* ============================================================================
   PRIGOVORI + ČESTA PITANJA
   ----------------------------------------------------------------------------
   Svaki hrvatski odgovor je klijentov tekst (ploča, SEKCIJA 11), doslovno ili
   uz minimalnu interpunkcijsku korekciju. Ništa nije izmišljeno i ništa se ne
   ponavlja između dvije sekcije — prigovori su prigovori, pitanja su pitanja.
   Engleski je prijevod istog sadržaja, ne novi tekst.
   ========================================================================== */

/* Sekcija „Ono što treneri najčešće pitaju prije nego krenu" — pet stvarnih
   prepreka. Odgovori 1, 2 i 5 su klijentovi doslovno; 3 i 4 su sastavljeni
   isključivo od činjenica koje je klijent naveo drugdje na ploči. */
export const objections = [
  {
    q: { hr: 'Nemam velik broj pratitelja.', en: 'I don’t have a big following.' },
    a: {
      hr: 'Velik broj pratitelja nije preduvjet za uspješan online coaching. Puno je važnije znati privući prave ljude, izgraditi povjerenje i ostvarivati rezultate s klijentima.',
      en: 'A big following is not a precondition for successful online coaching. Knowing how to attract the right people, build trust and get results with clients matters far more.',
    },
  },
  {
    q: { hr: 'Ne želim se klaunirati na mrežama.', en: 'I don’t want to clown around on social media.' },
    a: {
      hr: 'Cilj nije da postaneš influencer. Cilj je da izgradiš reputaciju stručnjaka kojem ljudi vjeruju. Unutar edukacije učim te kako stvarati sadržaj koji privlači klijente bez klauniranja i lažnog prikazivanja života.',
      en: 'The goal is not to turn you into an influencer. The goal is a reputation as an expert people trust. Inside the education I teach you how to make content that attracts clients without clowning around or faking a life.',
    },
  },
  {
    q: { hr: 'Nemam vremena uz rad u dvorani.', en: 'I don’t have time alongside my gym work.' },
    a: {
      hr: 'Sva predavanja su unaprijed snimljena i dostupna 24 sata dnevno. Gledaš ih kada tebi odgovara i napreduješ vlastitim tempom, a pristup je doživotan — ništa ne istječe ako ovaj mjesec nemaš vremena.',
      en: 'Every lecture is pre-recorded and available 24 hours a day. You watch when it suits you and move at your own pace, and access is lifetime — nothing expires if this month is a busy one.',
    },
  },
  {
    q: { hr: 'Mogu naučiti sam s interneta.', en: 'I can learn this myself online.' },
    a: {
      hr: 'Možeš. Godinama možeš pokušavati sam povezati marketing, prodaju, coaching, trening, nutricionizam i poslovanje. Ili možeš učiti od ljudi koji su taj put već prošli i skratiti godine pokušaja i pogrešaka.',
      en: 'You can. You can spend years trying to connect marketing, sales, coaching, training, nutrition and business on your own. Or you can learn from people who have already walked that road and cut years of trial and error.',
    },
  },
  {
    q: { hr: 'Već imam klijente.', en: 'I already have clients.' },
    a: {
      hr: 'Odlično. Tada edukaciju možeš iskoristiti za podizanje stručnosti, unapređenje sustava rada, povećanje broja klijenata i razvoj osobnog brenda.',
      en: 'Good. Then you can use the education to raise your expertise, sharpen your systems, grow your client count and build your personal brand.',
    },
  },
];

/* FAQ — deset pitanja. Namjerno bez onih na koja je odgovoreno gore ili
   u sekciji „za koga jest / za koga nije". */
export const faq = [
  {
    q: { hr: 'Je li ovo za početnike ili za trenere koji već rade?', en: 'Is this for beginners or for working trainers?' },
    a: {
      hr: 'Oboje. Edukacija je napravljena tako da možeš krenuti od nule, ali i značajno unaprijediti svoje znanje ako već radiš kao trener. Ako si početnik, dobit ćeš jasan sustav i smjer. Ako već imaš klijente, naučit ćeš kako unaprijediti stručnost, rezultate klijenata, pozicioniranje i izgraditi ozbiljniji coaching posao.',
      en: 'Both. It is built so you can start from zero, and equally so you can raise your level significantly if you already work as a trainer. A beginner gets a clear system and a direction. If you already have clients, you learn how to sharpen your expertise, your clients’ results, your positioning and build a more serious coaching business.',
    },
  },
  {
    q: { hr: 'Koliko dugo imam pristup?', en: 'How long do I have access?' },
    a: {
      hr: 'Pristup edukaciji je doživotan. Jednom kada kupiš edukaciju, zadržavaš pristup svim postojećim i budućim nadogradnjama bez dodatnih troškova.',
      en: 'Access is lifetime. Once you buy, you keep access to everything that exists now and everything added later, at no extra cost.',
    },
  },
  {
    q: { hr: 'Koliko sadržaja dobivam?', en: 'How much content do I get?' },
    a: {
      hr: 'Trenutno više od 70 sati video sadržaja raspoređenih kroz više od 20 modula. Sadržaj se kontinuirano nadograđuje novim lekcijama i materijalima.',
      en: 'Currently more than 70 hours of video across more than 20 modules. New lessons and materials are added continuously.',
    },
  },
  {
    q: { hr: 'Mogu li edukaciju prolaziti svojim tempom?', en: 'Can I go through it at my own pace?' },
    a: {
      hr: 'Da. Sva predavanja su unaprijed snimljena i dostupna 24 sata dnevno. Gledaš ih kada tebi odgovara i napreduješ vlastitim tempom.',
      en: 'Yes. Every lecture is pre-recorded and available 24 hours a day. You watch when it suits you and progress at your own pace.',
    },
  },
  {
    q: { hr: 'Dobivam li podršku nakon kupnje?', en: 'Do I get support after buying?' },
    a: {
      hr: 'Da. Kupnjom dobivaš pristup privatnoj Facebook grupi namijenjenoj isključivo polaznicima edukacije. Tamo možeš postavljati pitanja, razmjenjivati iskustva i dobiti dodatne smjernice tijekom svog razvoja.',
      en: 'Yes. Buying gives you access to a private Facebook group for students of the education only. You can ask questions there, share experience and get further guidance as you develop.',
    },
  },
  {
    q: { hr: 'Hoću li naučiti kako doći do online klijenata?', en: 'Will I learn how to get online clients?' },
    a: {
      hr: 'Da. To je jedan od ključnih dijelova edukacije. Naučit ćeš kako izgraditi sustav koji kontinuirano privlači nove upite i pretvara pratitelje u klijente.',
      en: 'Yes. It is one of the core parts of the education. You learn to build a system that continuously attracts new enquiries and turns followers into clients.',
    },
  },
  {
    q: { hr: 'Hoću li naučiti kako ostvarivati bolje rezultate s klijentima?', en: 'Will I learn to get better results with clients?' },
    a: {
      hr: 'Da. Zato edukacija uključuje stručnjake iz različitih područja. Cilj nije samo imati više klijenata, nego imati zadovoljne klijente koji ostvaruju rezultate i ostaju s tobom dugoročno.',
      en: 'Yes. That is exactly why the education brings in experts from different fields. The goal is not simply more clients, but satisfied clients who get results and stay with you long term.',
    },
  },
  {
    q: { hr: 'Je li edukacija samo za online trenere?', en: 'Is this only for online trainers?' },
    a: {
      hr: 'Primarno da. Međutim, velik dio znanja možeš primijeniti i ako radiš individualne ili poluindividualne treninge uživo.',
      en: 'Primarily yes. That said, a large part of the knowledge applies just as well to one-to-one and small-group training in person.',
    },
  },
  {
    q: { hr: 'Koliko brzo mogu očekivati rezultate?', en: 'How quickly can I expect results?' },
    a: {
      hr: 'To ovisi o tvojoj razini angažmana i primjene. Neki polaznici prve rezultate vide vrlo brzo, dok drugima treba više vremena. Ono što dobivaš je blueprint koji ti može značajno skratiti put do rezultata i pomoći da izbjegneš godine pokušaja i pogrešaka.',
      en: 'It depends on how much you engage and how much you apply. Some students see first results very quickly, others need longer. What you get is a blueprint that can shorten the road considerably and help you avoid years of trial and error.',
    },
  },
  {
    q: { hr: 'Zašto ova edukacija postoji?', en: 'Why does this education exist?' },
    a: {
      hr: 'Zato što sam i sam bio trener koji je tražio odgovore. Godinama sam gradio coaching posao kroz praksu, pogreške, testiranja i rad s više od 1000 klijenata. Cilj ove edukacije je prenijeti taj blueprint novoj generaciji trenera i pomoći im da do rezultata dođu brže nego što sam ja došao.',
      en: 'Because I was a trainer looking for answers myself. For years I built a coaching business through practice, mistakes, testing and work with more than 1,000 clients. The goal of this education is to hand that blueprint to a new generation of trainers and help them reach results faster than I did.',
    },
  },
];
