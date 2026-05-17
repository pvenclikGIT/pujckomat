// ═══ Půjčkomat v3 — Data + i18n + SEO Structured Data ═══

const L = {
  cs: {
    meta: {
      title: 'Půjčkomat — Srovnání půjček online 2026 | Nejlepší úvěry v ČR a SR',
      desc: 'Srovnejte půjčky od 10+ bank a nebankovních poskytovatelů. Okamžité výsledky, transparentní RPSN, index férovosti a AI doporučení. Zdarma a nezávazně.',
      keywords: 'srovnání půjček, kalkulačka půjček, nejlepší půjčka, RPSN, úvěr online, srovnávač úvěrů, půjčka 2026, spotřebitelský úvěr',
    },
    nav: { home: 'Domů', compare: 'Srovnat', how: 'Jak to funguje', faq: 'Dotazy' },
    hero: {
      badge: 'Srovnávač půjček 2026',
      h1: 'Srovnejte půjčky.\nUšetřete tisíce!',
      sub: 'Pohněte sliderem — nabídky se aktualizují okamžitě. Žádné kroky, žádné čekání, žádné skryté poplatky.',
    },
    trust: {
      title: 'Proč nám věřit',
      items: [
        { icon: 'shield', t: 'Pod dohledem ČNB', d: 'Registrovaný zprostředkovatel dle zákona o spotřebitelském úvěru.' },
        { icon: 'lock', t: 'Šifrované spojení', d: 'Veškerá komunikace probíhá přes zabezpečené SSL/TLS připojení.' },
        { icon: 'eye', t: '100% transparentní', d: 'Metodiku hodnocení zveřejňujeme. Provize neovlivňují pořadí.' },
        { icon: 'star', t: '4.8/5 hodnocení', d: 'Průměrné hodnocení od 2 400+ uživatelů na nezávislých portálech.' },
      ],
    },
    calc: {
      amount: 'Chci si půjčit',
      period: 'Doba splácení',
      mo: 'měs', yr: 'r',
      purpose: 'Účel',
      purposes: ['Na cokoliv', 'Auto', 'Bydlení', 'Rekonstrukce', 'Konsolidace'],
      provider: 'Poskytovatel',
      providers: ['Všichni', 'Banky', 'Nebankovní'],
      monthlyFrom: 'Splátka od',
      totalCost: 'Celkem zaplatíte',
    },
    res: {
      title: 'nabídek pro vás',
      sorts: ['Nejnižší RPSN', 'Nejnižší splátka', 'Nejrychlejší', 'Nejvyšší skóre'],
      monthly: 'Splátka', rate: 'Úrok', rpsn: 'RPSN', approval: 'Schválení', score: 'Skóre',
      detail: 'Detail', apply: 'Požádat', aiBest: 'Nejlepší volba',
      noFees: 'Bez poplatků', earlyFree: 'Předčasné splacení zdarma', onlineApp: 'Online schválení', min: 'min',
      overpay: 'Přeplatíte', amort: 'Průběh splácení',
    },
    det: {
      back: 'Zpět', overview: 'Přehled', conditions: 'Podmínky',
      repTitle: 'Reprezentativní příklad',
      repText: 'Výše úvěru {amount}, doba splácení {period} měs., úrok {rate} % p.a., RPSN {rpsn} %, splátka {monthly}, celkem {total}.',
      pros: 'Výhody', cons: 'Nevýhody',
      applyBtn: 'Požádat o půjčku', applySub: 'Online za 5 minut',
      minAmt: 'Min. částka', maxAmt: 'Max. částka', minTerm: 'Min. doba', maxTerm: 'Max. doba',
      fees: 'Poplatky', early: 'Předčasné splacení', free: 'Zdarma', withFee: 'S poplatkem', none: 'Žádné',
    },
    app: {
      title: 'Žádost o půjčku', name: 'Jméno a příjmení', email: 'E-mail', phone: 'Telefon',
      income: 'Čistý měsíční příjem', expenses: 'Měsíční výdaje',
      consent: 'Souhlasím se zpracováním osobních údajů',
      submit: 'Odeslat žádost', sent: 'Žádost odeslána!', sentSub: 'Ozveme se do 5 minut.',
    },
    how: {
      title: 'Jak to funguje',
      steps: [
        { icon: 'bolt', t: 'Nastavte parametry', d: 'Posuňte slider — výsledky se aktualizují okamžitě. Žádné kroky.' },
        { icon: 'chart', t: 'Porovnejte nabídky', d: 'Vidíte RPSN, splátku i skóre férovosti na první pohled.' },
        { icon: 'sparkle', t: 'AI vám poradí', d: 'Nejlepší nabídka je automaticky označena a vysvětlena.' },
        { icon: 'rocket', t: 'Požádejte online', d: 'Přesměrujeme vás na web poskytovatele. Schválení za 5 min.' },
      ],
    },
    faq: {
      title: 'Časté dotazy',
      items: [
        { q: 'Je srovnání zdarma?', a: 'Ano. Financujeme se z provizí, které neovlivňují pořadí výsledků.' },
        { q: 'Co je RPSN a proč je důležité?', a: 'RPSN (roční procentní sazba nákladů) zahrnuje úrok i všechny poplatky. Je to nejspolehlivější ukazatel skutečné ceny půjčky.' },
        { q: 'Jak počítáte skóre férovosti?', a: 'Hodnotíme transparentnost podmínek, výši poplatků, možnost předčasného splacení a spokojenost klientů. Škála 1–10, metodiku zveřejňujeme.' },
        { q: 'Ovlivňuje srovnání můj úvěrový registr?', a: 'Ne. Srovnání je orientační a nenahlíží do registrů. Teprve žádost u poskytovatele může vést k nahlédnutí.' },
        { q: 'Mohu žádat i ze Slovenska?', a: 'Ano. Podporujeme české i slovenské poskytovatele, v CZK i EUR.' },
      ],
    },
    footer: {
      tag: 'Nejrychlejší srovnání půjček v ČR a na Slovensku. Pod dohledem ČNB.',
      cols: [
        { t: 'Půjčky', links: [
          {label:'Spotřebitelské půjčky', view:'cat:consumer'},
          {label:'Bankovní půjčky', view:'cat:bank'},
          {label:'Nebankovní půjčky', view:'cat:nonbank'},
          {label:'P2P půjčky', view:'cat:p2p'},
          {label:'Konsolidace půjček', view:'cat:consolidation'},
        ]},
        { t: 'Hypotéky', links: [
          {label:'Hypotéky', view:'cat:mortgage'},
          {label:'Americké hypotéky', view:'cat:american'},
          {label:'Refinancování', view:'cat:refinance'},
          {label:'Kalkulačka hypoték', view:'calcpage'},
        ]},
        { t: 'Nástroje', links: [
          {label:'Kalkulačka splátek', view:'calcpage'},
          {label:'Index férovosti', view:'fairness'},
          {label:'AI poradce', view:'aipage'},
          {label:'Slovník pojmů', view:'glossary'},
        ]},
        { t: 'Informace', links: [
          {label:'Blog', view:'blog'},
          {label:'Profily společností', view:'providers'},
          {label:'O nás', view:'about'},
          {label:'Kontakt', view:'contact'},
          {label:'Metodika hodnocení', view:'fairness'},
        ]},
      ],
      copy: '© 2026 Půjčkomat s.r.o. · IČO: 12345678 · Registrovaný u ČNB',
    },
    langLabel: 'SK',
    breadcrumbs: { home: 'Domů', compare: 'Srovnání půjček', detail: 'Detail půjčky', apply: 'Žádost' },
    stickyBar: { text: 'Srovnejte půjčky zdarma', btn: 'Srovnat' },
  },
  sk: {
    meta: {
      title: 'Půjčkomat — Porovnanie pôžičiek online 2026 | Najlepšie úvery v SR a ČR',
      desc: 'Porovnajte pôžičky od 10+ bánk a nebankových poskytovateľov. Okamžité výsledky, transparentná RPSN, index férovosti a AI odporúčania. Zadarmo.',
      keywords: 'porovnanie pôžičiek, kalkulačka pôžičiek, najlepšia pôžička, RPSN, úver online, porovnávač úverov, pôžička 2026',
    },
    nav: { home: 'Domov', compare: 'Porovnať', how: 'Ako to funguje', faq: 'Otázky' },
    hero: {
      badge: 'Porovnávač pôžičiek 2026',
      h1: 'Porovnajte pôžičky.\nUšetrite tisíce!',
      sub: 'Posuňte slider — ponuky sa aktualizujú okamžite. Žiadne kroky, žiadne čakanie, žiadne skryté poplatky.',
    },
    trust: {
      title: 'Prečo nám veriť',
      items: [
        { icon: 'shield', t: 'Pod dohľadom NBS', d: 'Registrovaný sprostredkovateľ podľa zákona o spotrebiteľskom úvere.' },
        { icon: 'lock', t: 'Šifrované spojenie', d: 'Všetka komunikácia prebieha cez zabezpečené SSL/TLS pripojenie.' },
        { icon: 'eye', t: '100% transparentné', d: 'Metodiku hodnotenia zverejňujeme. Provízie neovplyvňujú poradie.' },
        { icon: 'star', t: '4.8/5 hodnotenie', d: 'Priemerné hodnotenie od 2 400+ používateľov na nezávislých portáloch.' },
      ],
    },
    calc: {
      amount: 'Chcem si požičať', period: 'Doba splácania', mo: 'mes', yr: 'r',
      purpose: 'Účel', purposes: ['Na čokoľvek', 'Auto', 'Bývanie', 'Rekonštrukcia', 'Konsolidácia'],
      provider: 'Poskytovateľ', providers: ['Všetci', 'Banky', 'Nebankové'],
      monthlyFrom: 'Splátka od', totalCost: 'Celkovo zaplatíte',
    },
    res: {
      title: 'ponúk pre vás',
      sorts: ['Najnižšia RPSN', 'Najnižšia splátka', 'Najrýchlejšie', 'Najvyššie skóre'],
      monthly: 'Splátka', rate: 'Úrok', rpsn: 'RPSN', approval: 'Schválenie', score: 'Skóre',
      detail: 'Detail', apply: 'Požiadať', aiBest: 'Najlepšia voľba',
      noFees: 'Bez poplatkov', earlyFree: 'Predčasné splatenie zadarmo', onlineApp: 'Online schválenie', min: 'min',
      overpay: 'Preplatíte', amort: 'Priebeh splácania',
    },
    det: {
      back: 'Späť', overview: 'Prehľad', conditions: 'Podmienky',
      repTitle: 'Reprezentatívny príklad',
      repText: 'Výška úveru {amount}, doba splácania {period} mes., úrok {rate} % p.a., RPSN {rpsn} %, splátka {monthly}, celkom {total}.',
      pros: 'Výhody', cons: 'Nevýhody',
      applyBtn: 'Požiadať o pôžičku', applySub: 'Online za 5 minút',
      minAmt: 'Min. suma', maxAmt: 'Max. suma', minTerm: 'Min. doba', maxTerm: 'Max. doba',
      fees: 'Poplatky', early: 'Predčasné splatenie', free: 'Zadarmo', withFee: 'S poplatkom', none: 'Žiadne',
    },
    app: {
      title: 'Žiadosť o pôžičku', name: 'Meno a priezvisko', email: 'E-mail', phone: 'Telefón',
      income: 'Čistý mesačný príjem', expenses: 'Mesačné výdavky',
      consent: 'Súhlasím so spracovaním osobných údajov',
      submit: 'Odoslať žiadosť', sent: 'Žiadosť odoslaná!', sentSub: 'Ozveme sa do 5 minút.',
    },
    how: {
      title: 'Ako to funguje',
      steps: [
        { icon: 'bolt', t: 'Nastavte parametre', d: 'Posuňte slider — ponuky sa aktualizujú okamžite. Žiadne kroky.' },
        { icon: 'chart', t: 'Porovnajte ponuky', d: 'Vidíte RPSN, splátku aj skóre férovosti na prvý pohľad.' },
        { icon: 'sparkle', t: 'AI vám poradí', d: 'Najlepšia ponuka je automaticky označená a vysvetlená.' },
        { icon: 'rocket', t: 'Požiadajte online', d: 'Presmerujeme vás na web poskytovateľa. Schválenie za 5 min.' },
      ],
    },
    faq: {
      title: 'Časté otázky',
      items: [
        { q: 'Je porovnanie zadarmo?', a: 'Áno. Financujeme sa z provízií, ktoré neovplyvňujú poradie výsledkov.' },
        { q: 'Čo je RPSN a prečo je dôležité?', a: 'RPSN (ročná percentuálna sadzba nákladov) zahŕňa úrok aj všetky poplatky. Najspoľahlivejší ukazovateľ ceny pôžičky.' },
        { q: 'Ako počítate skóre férovosti?', a: 'Hodnotíme transparentnosť, poplatky, predčasné splatenie a spokojnosť klientov. Škála 1–10.' },
        { q: 'Ovplyvňuje porovnanie môj úverový register?', a: 'Nie. Porovnanie je orientačné a nenahliadá do registrov.' },
        { q: 'Môžem žiadať aj z Česka?', a: 'Áno. Podporujeme CZ aj SK poskytovateľov, v CZK aj EUR.' },
      ],
    },
    footer: {
      tag: 'Najrýchlejšie porovnanie pôžičiek v SR a ČR. Pod dohľadom NBS.',
      cols: [
        { t: 'Pôžičky', links: [
          {label:'Spotrebiteľské pôžičky', view:'cat:consumer'},
          {label:'Bankové pôžičky', view:'cat:bank'},
          {label:'Nebankové pôžičky', view:'cat:nonbank'},
          {label:'P2P pôžičky', view:'cat:p2p'},
          {label:'Konsolidácia', view:'cat:consolidation'},
        ]},
        { t: 'Hypotéky', links: [
          {label:'Hypotéky', view:'cat:mortgage'},
          {label:'Americké hypotéky', view:'cat:american'},
          {label:'Refinancovanie', view:'cat:refinance'},
          {label:'Kalkulačka hypoték', view:'calcpage'},
        ]},
        { t: 'Nástroje', links: [
          {label:'Kalkulačka splátok', view:'calcpage'},
          {label:'Index férovosti', view:'fairness'},
          {label:'AI poradca', view:'aipage'},
          {label:'Slovník pojmov', view:'glossary'},
        ]},
        { t: 'Informácie', links: [
          {label:'Blog', view:'blog'},
          {label:'Profily spoločností', view:'providers'},
          {label:'O nás', view:'about'},
          {label:'Kontakt', view:'contact'},
          {label:'Metodika', view:'fairness'},
        ]},
      ],
      copy: '© 2026 Půjčkomat s.r.o. · IČO: 12345678 · Registrovaný u NBS',
    },
    langLabel: 'CZ',
    breadcrumbs: { home: 'Domov', compare: 'Porovnanie pôžičiek', detail: 'Detail pôžičky', apply: 'Žiadosť' },
    stickyBar: { text: 'Porovnajte pôžičky zadarmo', btn: 'Porovnať' },
  },
};

// ═══ Providers (same as v2) ═══
const P = [
  { id:'airbank', name:'Air Bank', type:'bank', color:'#0ea5e9', initial:'AB', rateFrom:3.9, rateTo:10.9, rpsnFrom:4.2, rpsnTo:11.5, minAmt:10000, maxAmt:1000000, minMo:6, maxMo:120, approval:10, fairness:9.2, noFees:true, earlyFree:true, online:true,
    fees:{ setup:'Zdarma', maintenance:'Zdarma', earlyRepay:'Zdarma' },
    pros:['Bez poplatku za zrizeni i vedeni','Online za 10 min','Predcasne splaceni zdarma'], cons:['Vyzaduje ucet u Air Bank','Omezena sit pobocek'] },
  { id:'csob', name:'CSOB', type:'bank', color:'#1d4ed8', initial:'CS', rateFrom:4.5, rateTo:12.9, rpsnFrom:4.9, rpsnTo:13.8, minAmt:20000, maxAmt:800000, minMo:12, maxMo:96, approval:15, fairness:8.5, noFees:true, earlyFree:true, online:true,
    fees:{ setup:'Zdarma', maintenance:'Zdarma', earlyRepay:'Zdarma' },
    pros:['Siroka sit pobocek','Pojisteni schopnosti splacet','Flexibilni splatky'], cons:['Vyssi urok pro nove klienty','Delsi schvalovani'] },
  { id:'moneta', name:'MONETA', type:'bank', color:'#059669', initial:'MO', rateFrom:4.9, rateTo:14.9, rpsnFrom:5.3, rpsnTo:16.2, minAmt:20000, maxAmt:800000, minMo:12, maxMo:96, approval:5, fairness:7.8, noFees:false, earlyFree:true, online:true,
    fees:{ setup:'Zdarma', maintenance:'59 Kc/mes', earlyRepay:'Zdarma' },
    pros:['Schvaleni za 5 minut','Smart Banka zdarma','Konsolidace pujcek'], cons:['Poplatek za vedeni 59 Kc/mes','Vyssi RPSN nez prumer'] },
  { id:'kb', name:'Komercni banka', type:'bank', color:'#dc2626', initial:'KB', rateFrom:4.3, rateTo:11.9, rpsnFrom:4.7, rpsnTo:12.8, minAmt:30000, maxAmt:1200000, minMo:12, maxMo:120, approval:30, fairness:8.8, noFees:true, earlyFree:true, online:true,
    fees:{ setup:'Zdarma', maintenance:'Zdarma', earlyRepay:'Zdarma' },
    pros:['Limit az 1,2 mil Kc','Osobni banker','Flexibilni splatky'], cons:['Pomalejsi schvalovani','Vyzaduje ucet u KB'] },
  { id:'trinity', name:'Trinity Bank', type:'bank', color:'#0f172a', initial:'TB', rateFrom:3.99, rateTo:7.9, rpsnFrom:3.99, rpsnTo:8.2, minAmt:50000, maxAmt:2500000, minMo:12, maxMo:96, approval:20, fairness:9.5, noFees:true, earlyFree:true, online:true,
    fees:{ setup:'2 % z vyse pujcky', maintenance:'Zdarma', earlyRepay:'Zdarma' },
    pros:['Nejnizsi urok na trhu (od 3,99 %)','Vedeni zdarma','Predcasne splaceni zdarma'], cons:['Poplatek za zrizeni 2 %','Min. castka 50 tis. Kc','Pouze online'] },
  { id:'zonky', name:'Zonky', type:'p2p', color:'#f97316', initial:'ZO', rateFrom:3.49, rateTo:15.9, rpsnFrom:4.1, rpsnTo:19.5, minAmt:20000, maxAmt:1000000, minMo:6, maxMo:84, approval:60, fairness:8.0, noFees:true, earlyFree:true, online:true,
    fees:{ setup:'Zdarma', maintenance:'Zdarma', earlyRepay:'Zdarma' },
    pros:['P2P model \u2014 ferove podminky','Od 3,49 % pro dobre klienty','Zadne poplatky'], cons:['Delsi schvalovani (investori)','Sazba zavisi na ratingu'] },
  { id:'cofidis', name:'Cofidis', type:'nonbank', color:'#eab308', initial:'CF', rateFrom:6.9, rateTo:21.9, rpsnFrom:7.5, rpsnTo:24.8, minAmt:5000, maxAmt:500000, minMo:6, maxMo:72, approval:5, fairness:6.5, noFees:false, earlyFree:false, online:true,
    fees:{ setup:'Zdarma', maintenance:'99 Kc/mes', earlyRepay:'1 % z predcasne splacene castky' },
    pros:['Pujcka jiz od 5 000 Kc','Schvaleni za 5 min','I bez dolozeni prijmu'], cons:['Vyssi RPSN','Poplatek za predcasne splaceni','Drahe pojisteni'] },
  { id:'homecredit', name:'Home Credit', type:'nonbank', color:'#e11d48', initial:'HC', rateFrom:7.9, rateTo:25.9, rpsnFrom:8.9, rpsnTo:29.8, minAmt:5000, maxAmt:300000, minMo:3, maxMo:60, approval:3, fairness:5.8, noFees:false, earlyFree:false, online:true,
    fees:{ setup:'Zdarma', maintenance:'49 Kc/mes', earlyRepay:'0,5 % z predcasne splacene castky' },
    pros:['Nejrychlejsi schvaleni (3 min)','Pujcka od 5 000 Kc','Siroka pobockova sit'], cons:['Vysoke RPSN','Poplatky za vedeni','Nizky index ferovosti'] },
  { id:'csas', name:'Ceska sporitelna', type:'bank', color:'#2563eb', initial:'CS', rateFrom:4.1, rateTo:11.5, rpsnFrom:4.5, rpsnTo:12.3, minAmt:20000, maxAmt:1000000, minMo:12, maxMo:96, approval:15, fairness:8.9, noFees:true, earlyFree:true, online:true,
    fees:{ setup:'Zdarma', maintenance:'Zdarma', earlyRepay:'Zdarma' },
    pros:['Nejvetsi banka v CR','George aplikace','Flexibilni splatky'], cons:['Urok zavisi na bonite','Vyzaduje ucet u CS'] },
  { id:'tatra', name:'Tatra banka', type:'bank', color:'#312e81', initial:'TT', rateFrom:4.9, rateTo:12.9, rpsnFrom:5.2, rpsnTo:13.8, minAmt:500, maxAmt:40000, minMo:6, maxMo:96, approval:10, fairness:8.7, noFees:true, earlyFree:true, online:true, isSK:true,
    fees:{ setup:'Zadarmo', maintenance:'Zadarmo', earlyRepay:'Zadarmo' },
    pros:['Najvacsia banka na Slovensku','Moderna mobilna appka','Flexibilne splatky'], cons:['Urok zavisi od bonity','Vyzaduje ucet v Tatra banke'] },
];

function calcMo(amt, mo, rate) {
  const r = rate / 100 / 12;
  if (r === 0) return amt / mo;
  return amt * (r * Math.pow(1+r, mo)) / (Math.pow(1+r, mo) - 1);
}
function fmt(val, eur) { return eur ? val.toLocaleString('sk-SK') + ' \u20ac' : val.toLocaleString('cs-CZ') + ' K\u010d'; }
function getOff(amt, mo, purp, filt, isEUR) {
  return P.filter(p => {
    if (filt === 1 && p.type !== 'bank') return false;
    if (filt === 2 && p.type === 'bank') return false;
    if (isEUR && !p.isSK) return false;
    if (!isEUR && p.isSK) return false;
    if (amt < p.minAmt || amt > p.maxAmt) return false;
    if (mo < p.minMo || mo > p.maxMo) return false;
    return true;
  }).map(p => {
    const af = Math.max(0, 1 - (amt - p.minAmt) / (p.maxAmt - p.minAmt)) * 0.3;
    const pf = (mo / p.maxMo) * 0.2;
    const pd = purp === 0 ? 0 : -0.3;
    const rate = Math.max(p.rateFrom, p.rateFrom + (p.rateTo - p.rateFrom) * (af + pf) + pd);
    const rpsn = rate + (p.rpsnFrom - p.rateFrom) + (p.noFees ? 0 : 0.5);
    const monthly = calcMo(amt, mo, rate);
    return { ...p, rate: Math.round(rate*100)/100, rpsn: Math.round(rpsn*100)/100,
             monthly: Math.round(monthly), total: Math.round(monthly * mo), amount: amt, months: mo };
  }).sort((a, b) => a.rpsn - b.rpsn);
}

// Generate JSON-LD for FAQ
function faqJsonLd(lang) {
  const items = L[lang].faq.items;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(i => ({
      "@type": "Question",
      "name": i.q,
      "acceptedAnswer": { "@type": "Answer", "text": i.a }
    }))
  });
}

// Generate JSON-LD for Organization
function orgJsonLd() {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Pujckomat",
    "url": "https://www.pujckomat.cz",
    "logo": "https://www.pujckomat.cz/logo.svg",
    "description": "Nezavisly srovnavac pujcek pro CR a Slovensko",
    "address": { "@type": "PostalAddress", "addressLocality": "Praha", "addressCountry": "CZ" },
    "sameAs": []
  });
}

// Generate JSON-LD for BreadcrumbList
function breadcrumbJsonLd(items) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, i) => ({
      "@type": "ListItem",
      "position": i + 1,
      "name": item.name,
      "item": item.url
    }))
  });
}

// ═══ SEO Category Landing Pages ═══
const CATEGORIES = {
  consumer: {
    cs: {
      title: 'Spotrebitelske pujcky 2026 — Srovnani a kalkulacka',
      metaDesc: 'Srovnejte spotrebitelske pujcky od 10+ bank. Urok od 3,9 % p.a., schvaleni online za 5 minut. RPSN, poplatky, index ferovosti.',
      h1: 'Spotrebitelske pujcky',
      sub: 'Pujcka na cokoliv — dovolena, elektronika, nabytek. Bez ucelu, bez rucitele.',
      seoTitle: 'Co je spotrebitelska pujcka?',
      seoText: 'Spotrebitelsky uver je nejbeznejsi typ pujcky pro fyzicke osoby. Na rozdil od uceloveho uveru nemusite dokladovat, na co penize pouzijete. Banky i nebankovni poskytovatele nabizeji castky od 5 000 Kc do 2 500 000 Kc s dobou splaceni 6 az 120 mesicu. Klicovym ukazatelem je RPSN — rocni procentni sazba nakladu, ktera zahrnuje urok i vsechny poplatky. V roce 2026 se uroky u nejlepsich poskytovatelu pohybuji od 3,9 % p.a.',
      filter: () => true, // all providers
      keywords: 'spotrebitelska pujcka, pujcka online, pujcka bez ucelu, rychla pujcka',
    },
    sk: { title:'Spotrebitelske pozicky 2026', metaDesc:'Porovnajte spotrebitelske pozicky.', h1:'Spotrebitelske pozicky', sub:'Pozicka na cokoliv.', seoTitle:'Co je spotrebitelska pozicka?', seoText:'Spotrebitelsky uver je najbeznejsi typ pozicky.', filter:()=>true, keywords:'spotrebitelska pozicka' },
  },
  bank: {
    cs: {
      title: 'Bankovni pujcky 2026 — Srovnani bank v CR',
      metaDesc: 'Srovnejte bankovni pujcky od CSOB, KB, Ceske sporitelny, Air Bank a dalsich. Nizke uroky od 3,9 %, bez poplatku.',
      h1: 'Bankovni pujcky',
      sub: 'Pujcky od licencovanych bank pod dohledem CNB. Nejnizsi uroky, nejvyssi duveryhodnost.',
      seoTitle: 'Proc zvolit bankovni pujcku?',
      seoText: 'Bankovni pujcky nabizeji nejnizsi urokove sazby na trhu diky nizsimu riziku pro vernitele. Banky podlehaji prisnemu dohledu CNB, maji povinnost transparentne informovat o vsech podminkach a nabizeji moznost predcasneho splaceni. V roce 2026 vetsina bank umoznuje plne online sjednani pres BankID bez navstevy pobocky. Nevyhodou muze byt prisnejsi posuzovani bonity — banky casteni odmitaji klienty s negativnimi zaznamy v registrech.',
      filter: (p) => p.type === 'bank',
      keywords: 'bankovni pujcka, pujcka od banky, uver banka, CSOB pujcka, KB pujcka',
    },
    sk: { title:'Bankove pozicky 2026', metaDesc:'Porovnajte bankove pozicky.', h1:'Bankove pozicky', sub:'Pozicky od licencovanych bank.', seoTitle:'Preco si zvolit bankovu pozicku?', seoText:'Bankove pozicky ponukaju najnizsie urokove sadzby.', filter:(p)=>p.type==='bank', keywords:'bankova pozicka' },
  },
  nonbank: {
    cs: {
      title: 'Nebankovni pujcky 2026 — Srovnani poskytovatelu',
      metaDesc: 'Srovnejte nebankovni pujcky od Cofidis, Home Credit a dalsich. Rychle schvaleni, i bez dolozeni prijmu.',
      h1: 'Nebankovni pujcky',
      sub: 'Rychle schvaleni, mirnejsi podminky. Pozor na vyssi RPSN.',
      seoTitle: 'Kdy zvolit nebankovni pujcku?',
      seoText: 'Nebankovni poskytovatele nabizeji rychlejsi schvalovani a mirnejsi podminky pro klienty, ktere banky odmitly. Schvaleni probiha casto do 5 minut, castky od 5 000 Kc. Nevyhodou jsou vyssi urokove sazby (RPSN 8-30 %) a mozne poplatky za vedeni ci predcasne splaceni. Vzdy srovnavejte podle RPSN, ne podle reklamniho uroku. V roce 2026 musi byt i nebankovni poskytovatele registrovani u CNB.',
      filter: (p) => p.type === 'nonbank',
      keywords: 'nebankovni pujcka, rychla pujcka, pujcka bez dolozeni prijmu, Cofidis, Home Credit',
    },
    sk: { title:'Nebankove pozicky 2026', metaDesc:'Porovnajte nebankove pozicky.', h1:'Nebankove pozicky', sub:'Rychle schvalenie, miernejsie podmienky.', seoTitle:'Kedy si zvolit nebankovu pozicku?', seoText:'Nebankovi poskytovatelia ponukaju rychlejsie schvalovanie.', filter:(p)=>p.type==='nonbank', keywords:'nebankova pozicka' },
  },
  p2p: {
    cs: {
      title: 'P2P pujcky 2026 — Pujcky mezi lidmi',
      metaDesc: 'P2P pujcky — ferovy model, kde si pujcujete primo od investoru. Zonky a dalsi. Urok od 3,49 %.',
      h1: 'P2P pujcky',
      sub: 'Pujcky primo od lidi — bez banky jako prostrednika. Ferove podminky.',
      seoTitle: 'Jak funguji P2P pujcky?',
      seoText: 'P2P (peer-to-peer) pujcky funguji na principu primo propojeni zadatelu s investory pres online platformu. Nejznamejsi ceskou P2P platformou je Zonky (skupina Air Bank). Vyhoda je ferovost — urokova sazba odpovida vasemu skutecnemu riziku. Schvalovani trva dele (investori musi pujcku financovat), ale uroky mohou byt nizsi nez u bank. Zadne skryte poplatky, predcasne splaceni zdarma.',
      filter: (p) => p.type === 'p2p',
      keywords: 'P2P pujcka, Zonky, pujcka mezi lidmi, peer to peer',
    },
    sk: { title:'P2P pozicky 2026', metaDesc:'P2P pozicky medzi ludmi.', h1:'P2P pozicky', sub:'Pozicky priamo od ludi.', seoTitle:'Ako funguju P2P pozicky?', seoText:'P2P pozicky funguju na principe priameho prepojenia.', filter:(p)=>p.type==='p2p', keywords:'P2P pozicka, Zonky' },
  },
  consolidation: {
    cs: {
      title: 'Konsolidace pujcek 2026 — Slouceni dluhu',
      metaDesc: 'Slucte vice pujcek do jedne s nizsi splatkou. Srovnani konsolidacnich uveru od bank.',
      h1: 'Konsolidace pujcek',
      sub: 'Slucte vice pujcek do jedne — nizsi splatka, jednodussi sprava.',
      seoTitle: 'Co je konsolidace pujcek?',
      seoText: 'Konsolidace je slouceni vice existujicich pujcek do jednoho uveru s jednou mesicni splatkou. Cil je snizit celkove mesicni zatizeni (typicky o 15-25 %), zjednodusit spravu financi a ziskat lepsi urokovou sazbu. Konsolidaci nabizeji jak banky, tak nebankovni poskytovatele. Podminkou je dostatecna bonita a pravidelny prijem. V roce 2026 lze konsolidaci sjednat plne online.',
      filter: () => true,
      keywords: 'konsolidace pujcek, slouceni dluhu, refinancovani, jedna splatka',
    },
    sk: { title:'Konsolidacia poziciek 2026', metaDesc:'Zlucte viac poziciek do jednej.', h1:'Konsolidacia poziciek', sub:'Zlucte pozicky do jednej splatky.', seoTitle:'Co je konsolidacia?', seoText:'Konsolidacia je zlucenie viacerych poziciek do jedneho uveru.', filter:()=>true, keywords:'konsolidacia poziciek' },
  },
  mortgage: {
    cs: {
      title: 'Hypoteky 2026 — Srovnani hypotecnich uveru',
      metaDesc: 'Srovnejte hypoteky od ceskych bank. Urok od 3,99 %, kalkulacka splatek, poradenstvi.',
      h1: 'Hypoteky',
      sub: 'Financovani bydleni s nejnizsimi uroky. Srovnejte nabidky bank.',
      seoTitle: 'Jak vybrat spravnou hypoteku?',
      seoText: 'Hypotecni uver je dlouhodoby uver zajisteny nemovitosti, urceny pro financovani bydleni. V roce 2026 se urokove sazby pohybuji od 3,99 % p.a. pri fixaci na 5 let. Klicove je porovnat nejen urok, ale i celkove naklady (RPSN), podminky predcasneho splaceni a flexibilitu splatek. Doporucujeme fixaci dle vaseho financniho planu — kratsi fixace = nizsi urok, ale vyssi riziko rust sazeb.',
      filter: () => true,
      keywords: 'hypoteka, hypotecni uver, uver na bydleni, srovnani hypotek',
    },
    sk: { title:'Hypoteky 2026', metaDesc:'Porovnajte hypoteky od bank.', h1:'Hypoteky', sub:'Financovanie byvania s najnizsimi urokmi.', seoTitle:'Ako vybrat spravnu hypoteku?', seoText:'Hypotecny uver je dlhodoby uver zajisteny nehnutelnostou.', filter:()=>true, keywords:'hypoteka, hypotecny uver' },
  },
  american: {
    cs: {
      title: 'Americke hypoteky 2026 — Neucetova hypoteka',
      metaDesc: 'Americka hypoteka — uver zajisteny nemovitosti na cokoliv. Srovnani nabidek.',
      h1: 'Americke hypoteky',
      sub: 'Hypoteka na cokoliv — penize pouzijete dle svych potreb.',
      seoTitle: 'Co je americka hypoteka?',
      seoText: 'Americka hypoteka je neucetovy uver zajisteny nemovitosti. Na rozdil od klasicke hypoteky nemusite dokladovat, na co penize pouzijete. Hodí se na rekonstrukce, konsolidaci dluhu ci podnikani. Urokova sazba je vyssi nez u klasicke hypoteky (typicky 5-8 % p.a.), ale castka muze byt az 70 % hodnoty nemovitosti.',
      filter: () => true,
      keywords: 'americka hypoteka, neucetova hypoteka, uver na nemovitost',
    },
    sk: { title:'Americke hypoteky 2026', metaDesc:'Americka hypoteka na cokoliv.', h1:'Americke hypoteky', sub:'Hypoteka na cokoliv.', seoTitle:'Co je americka hypoteka?', seoText:'Americka hypoteka je neucelovy uver zajisteny nehnutelnostou.', filter:()=>true, keywords:'americka hypoteka' },
  },
  refinance: {
    cs: {
      title: 'Refinancovani pujcek a hypotek 2026',
      metaDesc: 'Refinancujte svou pujcku ci hypoteku za lepsi podminek. Srovnani nabidek.',
      h1: 'Refinancovani',
      sub: 'Prenesete pujcku k jinemu poskytovateli s lepsim urokem.',
      seoTitle: 'Kdy se vyplati refinancovani?',
      seoText: 'Refinancovani znamena preneseni stavajiciho uveru k jinemu poskytovateli, ktery nabizi vyhodnejsi podminky. Vyplati se, kdyz rozdil v RPSN je alespon 1-2 procentni body a zbyvajici doba splaceni je dostatecne dlouha. Pozor na poplatky za predcasne splaceni u puvodniho poskytovatele.',
      filter: () => true,
      keywords: 'refinancovani pujcky, refinancovani hypoteky, lepsi urok',
    },
    sk: { title:'Refinancovanie poziciek 2026', metaDesc:'Refinancujte svoju pozicku.', h1:'Refinancovanie', sub:'Preneste pozicku k lepsim podmienkam.', seoTitle:'Kedy sa oplati refinancovanie?', seoText:'Refinancovanie znamena prenesenie ucel k inemu poskytovatelovi.', filter:()=>true, keywords:'refinancovanie pozicky' },
  },
};

// ═══ Provider Profiles (SEO) ═══
const PROFILES = {
  airbank: {
    fullName: 'Air Bank a.s.', founded: 2011, hq: 'Praha', license: 'CNB', group: 'PPF Group',
    desc: 'Air Bank je ceska banka zalozena v roce 2011 jako soucast PPF Group. Zameruje se na jednoduchost, transparentnost a nulove poplatky. Jako jedna z prvnich bank v CR nabidla ucet zcela bez poplatku a stala se prureznikemm digitaliho bankovnictvi. Pujcky Air Bank se vyznacuji online sjednanim za 10 minut, nulovymi poplatky za zrizeni i vedeni a moznosti predcasneho splaceni zdarma.',
    features: ['100% online sjednani','Bez poplatku za cokoliv','Predcasne splaceni zdarma','Mobilni aplikace My Air','BankID overeni'],
    products: ['Pujcka na cokoliv','Sporici ucet','Bezny ucet','Kreditni karta'],
    rating: 94, clients: '800 000+', branches: '37 pobocek',
  },
  csob: {
    fullName: 'Ceskoslovenska obchodni banka, a.s.', founded: 1964, hq: 'Praha', license: 'CNB', group: 'KBC Group',
    desc: 'CSOB je jedna z nejstarsich a nejvetsich bank v Ceske republice. Patri do belgicke skupiny KBC a nabizi kompletni portfolio financnich sluzeb. Pujcky CSOB se vyznacuji sirokou siti pobocek, moznosti pojisteni schopnosti splacet a flexibilnimi splatkami.',
    features: ['Siroka sit pobocek','Pojisteni splaceni','Flexibilni splatky','George aplikace','BankID'],
    products: ['Pujcka na cokoliv','Hypoteka','Sporeni','Podnikatelske uvery'],
    rating: 85, clients: '4 000 000+', branches: '230 pobocek',
  },
  moneta: {
    fullName: 'MONETA Money Bank, a.s.', founded: 1998, hq: 'Praha', license: 'CNB', group: 'MONETA Group',
    desc: 'MONETA Money Bank je univerzalni banka s durazem na retailove bankovnictvi a male a stredni podniky. Nabizi schvaleni pujcky za 5 minut a moderni Smart Banku. RPSN je vyssi nez u konkurence, ale rychlost schvaleni je jednou z nejlepsich na trhu.',
    features: ['Schvaleni za 5 minut','Smart Banka zdarma','Konsolidace pujcek','Mobilni aplikace','Siroky sit pobocek'],
    products: ['Pujcka','Konsolidace','Hypoteka','Podnikatelske uvery'],
    rating: 78, clients: '1 000 000+', branches: '150 pobocek',
  },
  kb: {
    fullName: 'Komercni banka, a.s.', founded: 1990, hq: 'Praha', license: 'CNB', group: 'Societe Generale',
    desc: 'Komercni banka je jednou z nejvetsich bank v CR, soucasti francouzske skupiny Societe Generale. Nabizi nejvyssi limit pujcky az 1,2 mil Kc a osobniho bankere pro vyssi castky. Sjednani je plne online pres aplikaci KB+.',
    features: ['Limit az 1,2 mil Kc','Osobni banker','KB+ aplikace','Nulove poplatky','Flexibilni splatky'],
    products: ['Pujcka','Hypoteka','Sporeni','Podnikatelske uvery','Kreditni karty'],
    rating: 88, clients: '1 600 000+', branches: '200 pobocek',
  },
  trinity: {
    fullName: 'TRINITY BANK a.s.', founded: 1996, hq: 'Praha', license: 'CNB', group: 'Nezavisla',
    desc: 'Trinity Bank je mala specializovana banka s nejnizsimi uroky na ceskem trhu (od 3,99 % p.a.). Zameruje se na online klientelu a nabizi nulove poplatky za vedeni i predcasne splaceni. Jedinou nevyhodou je poplatek za zrizeni 2 % a vyssi minimalni castka 50 000 Kc.',
    features: ['Nejnizsi urok od 3,99 %','Vedeni zdarma','Predcasne splaceni zdarma','Pouze online','Limit az 2,5 mil Kc'],
    products: ['Pujcka na cokoliv','Terminovany vklad','Sporici ucet'],
    rating: 95, clients: '100 000+', branches: 'Pouze online',
  },
  zonky: {
    fullName: 'Zonky s.r.o.', founded: 2015, hq: 'Praha', license: 'CNB', group: 'Air Bank / PPF',
    desc: 'Zonky je ceska P2P platforma kde si pujcujete primo od lidi, ne od banky. Urokova sazba odpovida vasemu individualnimu riziku — 50 % klientu ziskava RPSN pod 6 %. Sjednani je 100 % online, zadne poplatky za zrizeni, vedeni ani predcasne splaceni.',
    features: ['P2P model','Individualni sazba','Zadne poplatky','100% online','Soucist skupiny Air Bank'],
    products: ['Pujcka na cokoliv','Investice do pujcek'],
    rating: 80, clients: '200 000+', branches: 'Pouze online',
  },
  cofidis: {
    fullName: 'Cofidis s.r.o.', founded: 1982, hq: 'Praha (FR)', license: 'CNB', group: 'Credit Mutuel',
    desc: 'Cofidis je nebankovni poskytovatel patryci do francouzske skupiny Credit Mutuel. Nabizi pujcky jiz od 5 000 Kc se schvalenim za 5 minut, i bez dolozeni prijmu pro male castky. RPSN je vyssi nez u bank, ale dostupnost je sirsi.',
    features: ['Pujcka od 5 000 Kc','Schvaleni za 5 min','I bez dolozeni prijmu','Mezinarodni skupina','Online sjednani'],
    products: ['Pujcka na cokoliv','Revolvingovy uver'],
    rating: 65, clients: '500 000+', branches: 'Pouze online',
  },
  homecredit: {
    fullName: 'Home Credit a.s.', founded: 1997, hq: 'Praha', license: 'CNB', group: 'PPF Group',
    desc: 'Home Credit je nejvetsi nebankovni poskytovatel spotrebitelskych uveru v CR. Nabizi nejrychlejsi schvaleni na trhu (3 minuty) a pujcky jiz od 5 000 Kc. Nevyhodou je vyssi RPSN a poplatky za vedeni.',
    features: ['Nejrychlejsi schvaleni (3 min)','Pujcka od 5 000 Kc','Siroka sit pobocek','Splatkovy nakup','Mobilni app'],
    products: ['Pujcka','Splatkovy prodej','Kreditni karta'],
    rating: 58, clients: '2 000 000+', branches: '600+ partnerskych mist',
  },
  csas: {
    fullName: 'Ceska sporitelna, a.s.', founded: 1825, hq: 'Praha', license: 'CNB', group: 'Erste Group',
    desc: 'Ceska sporitelna je nejvetsi banka v CR s nejdelsim tradici (zalozena 1825). Patri do rakouske skupiny Erste. Nabizi Pujcku s bonusem az 12 odpustenych splatek, moderni aplikaci George a plne online sjednani.',
    features: ['Nejvetsi banka v CR','George aplikace','Bonus az 12 splatek','Garance vraceni 30 dni','Pojisteni volitelne'],
    products: ['Pujcka','Hypoteka','Sporeni','Investice','Podnikatelske uvery'],
    rating: 89, clients: '4 500 000+', branches: '450 pobocek',
  },
  tatra: {
    fullName: 'Tatra banka, a.s.', founded: 1990, hq: 'Bratislava', license: 'NBS', group: 'Raiffeisen',
    desc: 'Tatra banka je najvacsia banka na Slovensku, soucasti skupiny Raiffeisen. Nabizi moderni digitalnu platformu a flexibilne pozicky s nulovymi poplatkami.',
    features: ['Najvacsia banka na SK','Moderna appka','Flexibilne splatky','Nulove poplatky','Raiffeisen skupina'],
    products: ['Pozicka','Hypoteka','Sporenie','Podnikatelske uvery'],
    rating: 87, clients: '800 000+', branches: '120 pobociek',
  },
};

Object.assign(window, { L, P, calcMo, fmt, getOff, faqJsonLd, orgJsonLd, breadcrumbJsonLd, CATEGORIES, PROFILES });
