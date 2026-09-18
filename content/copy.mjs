/* ============================================================================
   COPY — hrvatski je original, engleski je prijevod istog sadržaja.
   ----------------------------------------------------------------------------
   Hrvatski tekst dolazi s klijentove ploče. Gdje je prerađen, prerađena je
   PREZENTACIJA (interpunkcija, prijelomi, ponavljanja), nikad tvrdnja.
   Nijedna brojka, ime, recenzija ni obećanje nisu dodani.

   `<em>` u naslovima označava naglašeni dio — dizajn ga renderira u akcentu.
   ` ` (tvrdi razmak) drži kratke riječi uz sljedeću i sprječava sirotice.
   ========================================================================== */

export const copy = {
  /* ====================================================================== */
  hr: {
    lang: 'hr',
    dir: 'ltr',
    langName: 'Hrvatski',
    otherLangLabel: 'EN',
    otherLangAria: 'Switch to English',

    nav: [
      { label: 'Edukacija', href: '#edukacija' },
      { label: 'Predavači', page: 'predavaci' },
      { label: 'Kurikulum', page: 'kurikulum' },
      { label: 'Priče', page: 'price' },
    ],
    skipToContent: 'Preskoči na sadržaj',
    menuOpen: 'Otvori izbornik',
    menuClose: 'Zatvori izbornik',

    ctaPrimary: 'Kreni odmah',
    ctaPrimaryNote: 'Doživotan pristup · svi budući moduli uključeni',
    ctaProgram: 'Pogledaj program',
    ctaCurriculum: 'Pogledaj detaljan kurikulum',
    ctaExperts: 'Upoznaj sve predavače',
    ctaStories: 'Pogledaj priče polaznika',
    ctaCheckoutFallbackNote: 'Naplata se otvara uskoro. Do tada te gumb vodi na Instagram profil, gdje se možeš javiti izravno.',

    /* --- 02 HERO --- */
    hero: {
      eyebrow: 'Online edukacija za trenere',
      h1: 'Želiš izgraditi online coaching s velikim brojem zadovoljnih klijenata, <em>a ne znaš odakle krenuti?</em>',
      lead: 'Najkompletnija edukacija za trenere koji žele izgraditi online coaching s velikim brojem zadovoljnih klijenata, razviti stvarnu stručnost i postati prepoznatljivo ime u industriji.',
      ticks: ['Doživotan pristup i svi budući upgradeovi', 'Zajednica i podrška', 'Vlastitim tempom, 24/7'],
      kicker: 'Ne učiš samo kako doći do klijenata. Učiš kako postati trener zbog kojeg klijenti ostaju, ostvaruju rezultate i dovode nove ljude.',
    },

    /* --- 03 PRODAJNI VIDEO --- */
    video: {
      eyebrow: 'Prodajni video',
      h2: 'Pogledaj prije nego odlučiš',
      lead: 'Cijela priča o edukaciji, bez skraćivanja.',
      play: 'Pokreni video',
      reservedTitle: 'Video stiže uskoro',
      reservedBody: 'Ovdje ide snimka u kojoj Frane prolazi kroz cijelu edukaciju — što je unutra, za koga je i kako izgleda rad nakon nje. Mjesto je pripremljeno i čeka snimku.',
    },

    /* --- 04 BROJKE --- */
    stats: {
      eyebrow: 'Edukacija u brojkama',
      note: 'Brojke koje stoje iza edukacije.',
    },

    /* --- 05 ŠTO ĆEŠ ZAPRAVO DOBITI --- */
    outcome: {
      eyebrow: 'Ishod',
      h2: 'Što ćeš <em>zapravo</em> dobiti?',
      lead: 'Ne dobivaš još jednu edukaciju. Dobivaš blueprint kako postati online trener kojeg ljudi žele platiti, preporučiti i ostati s njim godinama.',
      items: [
        { t: 'Više klijenata', d: 'Naučit ćeš kako izgraditi sustav koji ti kontinuirano dovodi nove upite i nove klijente.' },
        { t: 'Zadovoljnije klijente', d: 'Naučit ćeš trening, nutricionizam, psihologiju i coaching na razini koja omogućuje da tvoji klijenti ostvaruju vrhunske rezultate i ostaju s tobom dugoročno.' },
        { t: 'Jači osobni brend', d: 'Izgradit ćeš reputaciju stručnjaka kojem ljudi vjeruju i kojeg preporučuju dalje.' },
        { t: 'Više sigurnosti i stabilnosti', d: 'Umjesto stalne borbe za nove klijente, gradiš coaching posao koji ima sustav i smjer.' },
        { t: 'Znanje koje ostaje zauvijek', d: 'Ne dobivaš samo informacije nego sustav razmišljanja, alate i procese koje možeš koristiti tijekom cijele karijere.' },
        { t: 'Prednost koju većina trenera nema', d: 'Na jednom mjestu dobivaš znanje iz područja marketinga, prodaje, coachinga, treninga, nutricionizma, psihologije i poslovanja.' },
      ],
    },

    /* --- 06 MENTOR --- */
    mentor: {
      eyebrow: 'Mentor',
      h2: 'Čovjek koji je edukaciju složio',
      role: 'Osnivač edukacije',
      lead: 'Edukaciju vodi i sastavlja Frane Jerčić. On je odabrao predavače, složio redoslijed područja i odredio što ulazi, a što ne.',
      cta: 'Upoznaj predavače',
    },

    /* --- 07 PRIČE / RECENZIJE --- */
    proof: {
      eyebrow: 'Polaznici',
      h2: 'Priče polaznika',
      lead: 'Video i pisane recenzije polaznika. Mjesta su pripremljena i čekaju stvarni sadržaj — ovdje ne stoji nijedna izmišljena recenzija.',
      reservedTitle: 'Priče se pišu',
      reservedBody: 'Frane trenutno zapisuje priče polaznika koji su krenuli od nule i došli do punog rasporeda. Objavljujemo ih čim budu gotove — s imenom, brojkama i snimkom, ili nikako.',
    },

    /* --- 08 ZA KOGA JEST / NIJE --- */
    fit: {
      eyebrow: 'Kvalifikacija',
      h2: 'Za koga je, a za koga <em>nije</em>',
      forTitle: 'Ovo je za tebe ako',
      againstTitle: 'Ovo nije za tebe ako',
      forItems: [
        'Želiš pokrenuti online coaching, ali ne znaš odakle krenuti.',
        'Već radiš individualno u dvorani i želiš dio svog poslovanja prebaciti online.',
        'Želiš više klijenata, ali ne želiš koristiti agresivne prodajne metode.',
        'Želiš postati trener kojeg ljudi doživljavaju kao stručnjaka.',
        'Želiš ostvarivati bolje rezultate sa svojim klijentima.',
        'Želiš izgraditi reputaciju koja dugoročno donosi preporuke i nove klijente.',
        'Spreman si učiti, primjenjivati naučeno i raditi na sebi.',
      ],
      againstItems: [
        'Tražiš brzu zaradu bez rada i učenja.',
        'Nisi spreman primijeniti ono što naučiš.',
        'Ne zanima te individualni coaching i rad s klijentima.',
        'Tražiš prečac bez ulaganja vremena u razvoj svojih vještina.',
        'Očekuješ da će edukacija napraviti posao umjesto tebe.',
      ],
      close: 'Najbolje rezultate ostvaruju treneri koji odluče prestati nagađati, počnu učiti od ljudi koji su već prošli taj put i dosljedno primjenjuju ono što nauče.',
    },

    /* --- 09 ŠTO JE UKLJUČENO --- */
    included: {
      eyebrow: 'Uključeno',
      h2: 'Što dobivaš kupnjom',
      lead: 'Jedna kupnja, cijeli sustav. Bez pretplate i bez naknadnih paketa.',
      items: [
        { t: 'Sedam područja edukacije', d: 'Od dolaska do prvih klijenata do specijaliziranog rada s trudnicama, djecom i sportašima.' },
        { t: 'Doživotan pristup', d: 'Jednom kupljeno ostaje tvoje. Nema pretplate ni isteka.' },
        { t: 'Sve buduće nadogradnje', d: 'Nova predavanja i novi moduli dodaju se unutar postojećeg sustava, bez dodatne nadoplate.' },
        { t: 'Privatna zajednica', d: 'Pristup zatvorenoj Facebook grupi isključivo za polaznike, za pitanja i razmjenu iskustava.' },
        { t: 'Vlastitim tempom', d: 'Sva predavanja su unaprijed snimljena i dostupna 24 sata dnevno.' },
        { t: 'Znanje cijelog tima', d: 'Nutricionizam, psihologija, poslovanje, knjigovodstvo i trening — od ljudi koji to rade svaki dan.' },
      ],
    },

    /* --- 10 KURIKULUM --- */
    curriculum: {
      eyebrow: 'Kurikulum',
      h2: 'Što te čeka <em>unutar edukacije</em>',
      lead: 'Edukacija je podijeljena u sedam ključnih područja koja zajedno grade uspješnog online coacha.',
      goalLabel: 'Cilj',
      topicsLabel: 'Teme',
      lessonsPending: 'Popis pojedinačnih lekcija objavljujemo čim ga finaliziramo.',
    },

    /* --- 11 EKSPERTNA MREŽA --- */
    experts: {
      eyebrow: 'Predavači',
      h2: 'Ne učiš od jednog predavača, <em>nego od tima stručnjaka</em>',
      claim: 'Ova edukacija nije nastala iz jedne perspektive.',
      claimSub: 'Nisi ograničen na iskustvo jednog predavača.',
      body: [
        'Većina edukacija za trenere fokusira se na samo jedan dio priče, iz perspektive jedne osobe. Neke te uče treningu. Neke nutricionizmu. Neke marketingu i društvenim mrežama.',
        'Problem je što uspješan online coaching ne nastaje iz jednog područja. Nastaje kada spojiš stručnost, rezultate, komunikaciju, coaching, marketing, prodaju i sustav rada u jednu cjelinu.',
        'Okupili smo stručnjake iz područja nutricionizma, poslovanja, psihologije, rada sa ženama za vrijeme i nakon trudnoće, knjigovodstva i rada s djecom kako bi na jednom mjestu dobio znanje koje je trenerima najčešće raspršeno kroz desetke različitih edukacija.',
      ],
      disciplinesLabel: 'Područja koja tim pokriva',
      rosterNote: 'Titule, područja i pune biografije objavljujemo redom kako materijali stižu od predavača.',
      cardCta: 'Otvori profil',
    },

    /* --- 12 SA SUSTAVOM / BEZ SUSTAVA --- */
    gap: {
      eyebrow: 'Razlika',
      h2: 'Što te dijeli od online coachinga koji <em>želiš izgraditi</em>?',
      lead: 'Najčešće je to nedostatak jasnog sustava, pravog znanja i smjera kojim trebaš ići.',
      withTitle: 'Trener sa sustavom',
      withoutTitle: 'Trener bez sustava',
      withItems: [
        'Zna odakle dolazi sljedeći klijent.',
        'Ima proces onboardinga koji se ne mijenja svaki put.',
        'Klijenti ostaju jer vide napredak.',
        'Preporuke dolaze same, bez agresivne prodaje.',
        'Zna što ne zna i koga pitati.',
      ],
      withoutItems: [
        'Svaki mjesec kreće ispočetka.',
        'Svakom klijentu improvizira drukčije.',
        'Klijenti odlaze nakon nekoliko mjeseci.',
        'Novi upiti ovise o sreći i algoritmu.',
        'Uči metodom pokušaja i pogreške, godinama.',
      ],
      close: 'Godinama možeš pokušavati sam povezati marketing, prodaju, coaching, trening, nutricionizam i poslovanje. Ili možeš učiti od ljudi koji su taj put već prošli.',
    },

    /* --- 13 PRIGOVORI --- */
    objections: {
      eyebrow: 'Prije nego kreneš',
      h2: 'Ono što treneri <em>najčešće pitaju</em>',
    },

    /* --- 14 INVESTICIJA --- */
    invest: {
      eyebrow: 'Investicija',
      h2: 'Jedna investicija, <em>doživotan pristup</em>',
      regularLabel: 'Redovna cijena',
      currentLabel: 'Trenutna cijena',
      /* {deadline} vec zavrsava tockom ("15.9.") - zato ovdje NEMA jos jedne. */
      deadlineLine: 'Popust vrijedi do {deadline} Nakon toga cijena raste na {regular} {currency}.',
      body: 'Ne kupuješ samo edukaciju. Kupuješ blueprint koji ti može pomoći da izgradiš online coaching s velikim brojem zadovoljnih klijenata, postaneš trener kojeg ljudi žele platiti, preporučiti i ostati s njim godinama.',
      includes: ['Doživotan pristup', 'Sve buduće nadogradnje', 'Privatna zajednica polaznika', 'Bez pretplate'],
    },

    /* --- 15 FAQ --- */
    faqSection: {
      eyebrow: 'Pitanja',
      h2: 'Često postavljena pitanja',
    },

    /* --- 16 FINALE --- */
    finale: {
      h2: 'Godinu dana od danas <em>i dalje će proći.</em>',
      body: [
        'Pitanje je samo gdje ćeš tada biti. Možeš biti na istom mjestu, još uvijek skupljati informacije, gledati što drugi rade i pitati se kada će krenuti ozbiljniji rezultati.',
        'Ili možeš imati izgrađen coaching, zadovoljne klijente, vlastite rezultate i sustav koji radi za tebe.',
      ],
      close: 'Odluka je na tebi.',
    },

    /* --- 17 FOOTER --- */
    footer: {
      line: 'Edukacija za online trenere, na hrvatskom. Vodi je Frane Jerčić.',
      navHeading: 'Stranice',
      channelsHeading: 'Kanali',
      instagram: 'Instagram — @postani_trener',
      youtube: 'YouTube — @franejercic',
      rights: 'Sva prava pridržana.',
    },

    /* --- STRANICA: PREDAVAČI --- */
    predavaci: {
      title: 'Predavači — Postani trener',
      description: 'Stručnjaci koji stoje iza edukacije Postani trener: trening, nutricionizam, psihologija, poslovanje, rad s trudnicama, djecom i sportašima.',
      eyebrow: 'Predavači',
      h1: 'Najveći stručnjaci <em>u svojim poljima</em>',
      lead: '13 stručnjaka, jedna edukacija. Sve što ti treba za razvoj vrhunskog online coachinga.',
      body: [
        'Okupili smo tim iz različitih područja koja čine ozbiljan online coaching — od treninga, nutricionizma i psihologije do rada sa ženama, djecom, sportašima, poslovanja, marketinga, mreža, knjigovodstva i drugih područja s kojima se trener susreće tijekom svoje karijere.',
      ],
      emphasis: 'Umjesto da godinama tražiš odgovore kroz desetke različitih edukacija i izvora, ovdje dobivaš znanje ljudi koji su svoje područje izgradili kroz stvaran rad i iskustvo.',
      clickHint: 'Klikni na bilo kojeg predavača i upoznaj njegovu stručnost, iskustvo i područje koje pokriva unutar edukacije.',
      mentorEyebrow: 'Glavni mentor',
      rosterEyebrow: 'Tim predavača',
      rosterH2: 'Stručnjaci koji stoje iza edukacije',
      bioToggleOpen: 'Otvori puni profil',
      bioToggleClose: 'Zatvori profil',
      bioPending: 'Puni profil, titula i fotografija objavljuju se čim stignu od predavača.',
      closingEyebrow: 'Sljedeći korak',
      closingH2: 'Sve što ti treba <em>za sljedeću razinu</em>',
      closingBody: 'Sada imaš priliku znanje vrhunskih stručnjaka pretvoriti u vlastitu stručnost, bolje rezultate i coaching koji tvoji klijenti žele nastaviti i preporučiti drugima.',
      specialtiesLabel: 'Područja',
      credentialsLabel: 'Kvalifikacije',
      modulesLabel: 'Predaje u područjima',
    },

    /* --- STRANICA: KURIKULUM --- */
    kurikulum: {
      title: 'Kurikulum — Postani trener',
      description: 'Sedam područja edukacije Postani trener: izgradnja online coaching posla, coaching, trening, nutricionizam, psihologija, specijalizirana područja i doživotne nadogradnje.',
      eyebrow: 'Kurikulum',
      h1: 'Cijeli program, <em>područje po područje</em>',
      lead: 'Više od 70 sati sadržaja kroz više od 20 modula, podijeljenih u sedam područja. Svako područje otvori i pogledaj što je unutra.',
      indexLabel: 'Sadržaj',
      expandAll: 'Otvori sve',
      collapseAll: 'Zatvori sve',
      lessonsHeading: 'Lekcije',
      lessonsPendingTitle: 'Popis lekcija',
      lessonsPendingBody: 'Pojedinačni nazivi lekcija i njihova trajanja objavljuju se čim budu finalizirani. Teme svakog područja navedene su iznad.',
      closingH2: 'Spreman za prvo područje?',
    },

    /* --- STRANICA: PRIČE --- */
    price: {
      title: 'Priče polaznika — Postani trener',
      description: 'Priče trenera koji su prošli edukaciju Postani trener. Objavljujemo ih čim budu gotove, s imenom i stvarnim brojkama.',
      eyebrow: 'Priče polaznika',
      h1: 'Treneri koji su <em>krenuli od nule</em>',
      lead: 'Iza edukacije stoji više od 360 educiranih trenera. Njihove priče zapisujemo jednu po jednu.',
      reservedTitle: 'Stranica se puni',
      reservedBody: [
        'Frane trenutno zapisuje priče polaznika koji su od nule došli do punog rasporeda online klijenata. Svaka priča dobit će ime, situaciju prije, situaciju danas i, gdje postoji, snimku.',
        'Do tada ovdje ne stoji nijedna izmišljena recenzija, nijedno izmišljeno ime i nijedna izmišljena brojka. Kad priče budu gotove, bit će ovdje.',
      ],
      meanwhile: 'U međuvremenu',
      meanwhileBody: 'Pogledaj što edukacija sadrži i tko je predaje.',
    },

    /* --- Zajedničko --- */
    breadcrumbHome: 'Početna',
    backToTop: 'Na vrh',
  },

  /* ====================================================================== */
  en: {
    lang: 'en',
    dir: 'ltr',
    langName: 'English',
    otherLangLabel: 'HR',
    otherLangAria: 'Prebaci na hrvatski',

    nav: [
      { label: 'Education', href: '#edukacija' },
      { label: 'Lecturers', page: 'predavaci' },
      { label: 'Curriculum', page: 'kurikulum' },
      { label: 'Stories', page: 'price' },
    ],
    skipToContent: 'Skip to content',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',

    ctaPrimary: 'Start now',
    ctaPrimaryNote: 'Lifetime access · all future modules included',
    ctaProgram: 'See the programme',
    ctaCurriculum: 'See the full curriculum',
    ctaExperts: 'Meet every lecturer',
    ctaStories: 'Read the students’ stories',
    ctaCheckoutFallbackNote: 'Checkout opens shortly. Until then the button takes you to the Instagram profile, where you can get in touch directly.',

    /* The one thing an English page must never imply. */
    languageNotice: 'The education is taught in Croatian. Every lecture, worksheet and community channel is in Croatian — this page exists so you can read what is inside before you decide.',

    hero: {
      eyebrow: 'Online education for trainers',
      h1: 'You want to build online coaching with a large number of satisfied clients, <em>but you don’t know where to start?</em>',
      lead: 'The most complete education for trainers who want to build online coaching with a large number of satisfied clients, develop real expertise and become a recognised name in the industry.',
      ticks: ['Lifetime access and every future upgrade', 'Community and support', 'At your own pace, 24/7'],
      kicker: 'You don’t only learn how to reach clients. You learn how to become the trainer clients stay with, get results with, and bring new people to.',
    },

    video: {
      eyebrow: 'Sales video',
      h2: 'Watch before you decide',
      lead: 'The whole story of the education, uncut.',
      play: 'Play the video',
      reservedTitle: 'The video is coming',
      reservedBody: 'This is where Frane walks through the entire education — what is inside, who it is for, and what the work looks like afterwards. The slot is built and waiting for the recording.',
    },

    stats: {
      eyebrow: 'The education in numbers',
      note: 'The numbers behind the education.',
    },

    outcome: {
      eyebrow: 'Outcome',
      h2: 'What do you <em>actually</em> get?',
      lead: 'You are not getting one more course. You are getting a blueprint for becoming an online trainer people want to pay, recommend, and stay with for years.',
      items: [
        { t: 'More clients', d: 'You learn to build a system that keeps bringing you new enquiries and new clients.' },
        { t: 'More satisfied clients', d: 'You learn training, nutrition, psychology and coaching at a level that lets your clients get excellent results and stay with you long term.' },
        { t: 'A stronger personal brand', d: 'You build the reputation of an expert people trust and pass on.' },
        { t: 'More security and stability', d: 'Instead of constantly fighting for new clients, you build a coaching business with a system and a direction.' },
        { t: 'Knowledge that stays for good', d: 'Not just information, but a way of thinking, plus tools and processes you can use across an entire career.' },
        { t: 'An edge most trainers don’t have', d: 'Marketing, sales, coaching, training, nutrition, psychology and business knowledge, all in one place.' },
      ],
    },

    mentor: {
      eyebrow: 'Mentor',
      h2: 'The person who assembled the education',
      role: 'Founder of the education',
      lead: 'The education is led and assembled by Frane Jerčić. He chose the lecturers, set the order of the areas and decided what goes in and what stays out.',
      cta: 'Meet the lecturers',
    },

    proof: {
      eyebrow: 'Students',
      h2: 'Students’ stories',
      lead: 'Video and written reviews from students. The slots are built and waiting for real content — there is not one invented review here.',
      reservedTitle: 'The stories are being written',
      reservedBody: 'Frane is currently writing up the stories of students who went from zero to a full schedule. We publish them the moment they are finished — with a name, real numbers and a recording, or not at all.',
    },

    fit: {
      eyebrow: 'Qualification',
      h2: 'Who it is for, and who it <em>is not</em>',
      forTitle: 'This is for you if',
      againstTitle: 'This is not for you if',
      forItems: [
        'You want to start online coaching but don’t know where to begin.',
        'You already train people one-to-one in a gym and want to move part of that online.',
        'You want more clients, but not through aggressive sales tactics.',
        'You want to be the trainer people see as an expert.',
        'You want to get better results with your clients.',
        'You want a reputation that brings referrals and new clients for years.',
        'You are ready to learn, apply what you learn, and work on yourself.',
      ],
      againstItems: [
        'You are looking for quick money without work or study.',
        'You are not ready to apply what you learn.',
        'One-to-one coaching and client work don’t interest you.',
        'You are looking for a shortcut that costs you no time.',
        'You expect the education to do the work for you.',
      ],
      close: 'The best results go to trainers who stop guessing, start learning from people who have already walked the road, and apply what they learn consistently.',
    },

    included: {
      eyebrow: 'Included',
      h2: 'What buying gets you',
      lead: 'One purchase, the whole system. No subscription and no upsell packages.',
      items: [
        { t: 'Seven areas of education', d: 'From reaching your first clients to specialised work with pregnancy, children and athletes.' },
        { t: 'Lifetime access', d: 'Bought once, yours for good. No subscription, no expiry.' },
        { t: 'Every future upgrade', d: 'New lectures and new modules are added inside the existing system at no extra cost.' },
        { t: 'A private community', d: 'Access to a closed Facebook group for students only, for questions and shared experience.' },
        { t: 'At your own pace', d: 'Every lecture is pre-recorded and available 24 hours a day.' },
        { t: 'The whole team’s knowledge', d: 'Nutrition, psychology, business, bookkeeping and training — from people who do it every day.' },
      ],
    },

    curriculum: {
      eyebrow: 'Curriculum',
      h2: 'What is waiting <em>inside the education</em>',
      lead: 'The education is divided into seven key areas that together build a successful online coach.',
      goalLabel: 'Goal',
      topicsLabel: 'Topics',
      lessonsPending: 'The individual lesson list is published as soon as it is finalised.',
    },

    experts: {
      eyebrow: 'Lecturers',
      h2: 'You don’t learn from one lecturer, <em>you learn from a team of experts</em>',
      claim: 'This education did not come from a single perspective.',
      claimSub: 'You are not limited to one lecturer’s experience.',
      body: [
        'Most education for trainers covers one part of the story, from one person’s point of view. Some teach you training. Some nutrition. Some marketing and social media.',
        'The problem is that successful online coaching does not come out of one field. It appears when expertise, results, communication, coaching, marketing, sales and a working system come together as one whole.',
        'We brought together experts in nutrition, business, psychology, working with women during and after pregnancy, bookkeeping and working with children, so that knowledge normally scattered across dozens of separate courses sits in one place.',
      ],
      disciplinesLabel: 'What the team covers',
      rosterNote: 'Titles, fields and full biographies are published as the material arrives from each lecturer.',
      cardCta: 'Open profile',
    },

    gap: {
      eyebrow: 'The difference',
      h2: 'What stands between you and the online coaching you <em>want to build</em>?',
      lead: 'Most often it is the lack of a clear system, of real knowledge, and of a direction to move in.',
      withTitle: 'A trainer with a system',
      withoutTitle: 'A trainer without one',
      withItems: [
        'Knows where the next client comes from.',
        'Has an onboarding process that doesn’t change every time.',
        'Clients stay because they can see progress.',
        'Referrals arrive on their own, without hard selling.',
        'Knows what they don’t know, and who to ask.',
      ],
      withoutItems: [
        'Starts from scratch every month.',
        'Improvises differently for every client.',
        'Clients leave after a few months.',
        'New enquiries depend on luck and the algorithm.',
        'Learns by trial and error, for years.',
      ],
      close: 'You can spend years trying to connect marketing, sales, coaching, training, nutrition and business on your own. Or you can learn from people who have already walked that road.',
    },

    objections: {
      eyebrow: 'Before you start',
      h2: 'What trainers <em>ask most often</em>',
    },

    invest: {
      eyebrow: 'Investment',
      h2: 'One investment, <em>lifetime access</em>',
      regularLabel: 'Regular price',
      currentLabel: 'Current price',
      deadlineLine: 'The discount is valid until {deadline}. After that the price returns to {regular} {currency}.',
      body: 'You are not only buying an education. You are buying a blueprint that can help you build online coaching with a large number of satisfied clients, and become the trainer people want to pay, recommend and stay with for years.',
      includes: ['Lifetime access', 'Every future upgrade', 'Private student community', 'No subscription'],
    },

    faqSection: {
      eyebrow: 'Questions',
      h2: 'Frequently asked questions',
    },

    finale: {
      h2: 'A year from today <em>will pass anyway.</em>',
      body: [
        'The only question is where you will be when it does. You can be in the same place, still collecting information, still watching what everyone else is doing and wondering when the serious results start.',
        'Or you can have a coaching business built, satisfied clients, results of your own, and a system that works for you.',
      ],
      close: 'The decision is yours.',
    },

    footer: {
      line: 'Education for online trainers, taught in Croatian. Led by Frane Jerčić.',
      navHeading: 'Pages',
      channelsHeading: 'Channels',
      instagram: 'Instagram — @postani_trener',
      youtube: 'YouTube — @franejercic',
      rights: 'All rights reserved.',
    },

    predavaci: {
      title: 'Lecturers — Postani trener',
      description: 'The experts behind the Postani trener education: training, nutrition, psychology, business, and work with pregnancy, children and athletes.',
      eyebrow: 'Lecturers',
      h1: 'The biggest experts <em>in their fields</em>',
      lead: '13 experts, one education. Everything you need to build high-level online coaching.',
      body: [
        'We brought together a team from the different fields that make up serious online coaching — from training, nutrition and psychology to work with women, children and athletes, business, marketing, social media, bookkeeping and the other areas a trainer meets across a career.',
      ],
      emphasis: 'Instead of spending years hunting for answers across dozens of separate courses and sources, here you get the knowledge of people who built their field through real work and real experience.',
      clickHint: 'Open any lecturer to see their expertise, their experience and the area they cover inside the education.',
      mentorEyebrow: 'Lead mentor',
      rosterEyebrow: 'The teaching team',
      rosterH2: 'The experts behind the education',
      bioToggleOpen: 'Open full profile',
      bioToggleClose: 'Close profile',
      bioPending: 'The full profile, title and photograph are published as soon as they arrive from the lecturer.',
      closingEyebrow: 'Next step',
      closingH2: 'Everything you need <em>for the next level</em>',
      closingBody: 'Now you have the chance to turn the knowledge of top experts into expertise of your own, better results, and coaching your clients want to continue and recommend to others.',
      specialtiesLabel: 'Fields',
      credentialsLabel: 'Qualifications',
      modulesLabel: 'Teaches in',
    },

    kurikulum: {
      title: 'Curriculum — Postani trener',
      description: 'The seven areas of the Postani trener education: building an online coaching business, coaching, training, nutrition, psychology, specialised areas and lifetime updates.',
      eyebrow: 'Curriculum',
      h1: 'The whole programme, <em>area by area</em>',
      lead: 'More than 70 hours of content across more than 20 modules, divided into seven areas. Open any area to see what is inside.',
      indexLabel: 'Contents',
      expandAll: 'Open all',
      collapseAll: 'Close all',
      lessonsHeading: 'Lessons',
      lessonsPendingTitle: 'Lesson list',
      lessonsPendingBody: 'Individual lesson titles and their durations are published as soon as they are finalised. The topics of each area are listed above.',
      closingH2: 'Ready for the first area?',
    },

    price: {
      title: 'Students’ stories — Postani trener',
      description: 'Stories of trainers who went through the Postani trener education. Published as they are finished, with names and real numbers.',
      eyebrow: 'Students’ stories',
      h1: 'Trainers who <em>started from zero</em>',
      lead: 'More than 360 educated trainers stand behind this education. We are writing their stories up one at a time.',
      reservedTitle: 'This page is filling up',
      reservedBody: [
        'Frane is currently writing up the stories of students who went from zero to a full schedule of online clients. Each story will carry a name, the situation before, the situation today and, where one exists, a recording.',
        'Until then there is not one invented review here, not one invented name and not one invented number. When the stories are ready, they will be here.',
      ],
      meanwhile: 'In the meantime',
      meanwhileBody: 'See what the education contains and who teaches it.',
    },

    breadcrumbHome: 'Home',
    backToTop: 'Back to top',
  },
};
