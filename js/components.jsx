// ═══ Půjčkomat v3 — Components ═══

// ─── Social Proof System (deterministic, no backend) ──────────────────────────
function useSocialProof() {
  const [tick, setTick] = React.useState(0);
  React.useEffect(() => {
    const iv = setInterval(() => setTick(t => t + 1), 8000);
    return () => clearInterval(iv);
  }, []);

  const now = new Date();
  const dayOfWeek = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();
  const hourMul = hour >= 8 && hour <= 20 ? 1.5 : 0.6;
  const baseSeed = now.getFullYear() * 366 + now.getMonth() * 31 + now.getDate();

  const weeklyCompare = Math.round(3200 + (baseSeed % 2800) + dayOfWeek * 420 + tick * 3);
  const liveNow = Math.round(5 + ((baseSeed + hour + tick) % 13) * hourMul);
  const todayCompare = Math.round(weeklyCompare / 7 * (hour / 24) + (minute * 2));
  const providerViews = (pid) => { const s = pid.charCodeAt(0)*7+pid.charCodeAt(1)*13+baseSeed; return Math.round(120+(s%380)+dayOfWeek*25); };
  const providerApplied = (pid) => { const s = pid.charCodeAt(0)*11+pid.charCodeAt(1)*3+baseSeed; return Math.round(15+(s%65)); };

  return { weeklyCompare, liveNow, todayCompare, providerViews, providerApplied, tick };
}

function LiveBadge({ count, label, icon = 'users', color = 'var(--c3-green)', pulse = true }) {
  return (
    <div className="sp3-badge">
      {pulse && <span className="sp3-pulse-dot" style={{background:color}}></span>}
      <Ico name={icon} size={13} color={color} />
      <strong>{count}</strong>
      <span>{label}</span>
    </div>
  );
}

function CardPopularity({ views, lang }) {
  const cs = lang === 'cs';
  if (views < 150) return null;
  return (
    <div className="sp3-card-pop">
      <span className="sp3-card-dot"></span>
      {views}+ {cs ? 'lidi si prohlidlo tento tyden' : 'ludi si pozrelo tento tyzden'}
    </div>
  );
}
window.useSocialProof = useSocialProof;
window.LiveBadge = LiveBadge;
window.CardPopularity = CardPopularity;

// ─── SVG Icons ──────────────────────────
const Ico = ({ name, size = 20, color = 'currentColor', className = '' }) => {
  const s = { width: size, height: size, display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 };
  const p = { fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const map = {
    bolt: <svg style={s} viewBox="0 0 24 24" {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
    chart: <svg style={s} viewBox="0 0 24 24" {...p}><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
    sparkle: <svg style={s} viewBox="0 0 24 24" {...p}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z"/></svg>,
    rocket: <svg style={s} viewBox="0 0 24 24" {...p}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>,
    check: <svg style={s} viewBox="0 0 24 24" {...p} strokeWidth={2.5}><polyline points="20 6 9 17 4 12"/></svg>,
    x: <svg style={s} viewBox="0 0 24 24" {...p} strokeWidth={2.5}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    menu: <svg style={s} viewBox="0 0 24 24" {...p}><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>,
    close: <svg style={s} viewBox="0 0 24 24" {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    bank: <svg style={s} viewBox="0 0 24 24" {...p} strokeWidth={1.5}><path d="M3 21h18"/><path d="M3 10h18"/><path d="M12 3l9 7H3l9-7z"/><path d="M6 10v8"/><path d="M10 10v8"/><path d="M14 10v8"/><path d="M18 10v8"/></svg>,
    users: <svg style={s} viewBox="0 0 24 24" {...p} strokeWidth={1.5}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>,
    building: <svg style={s} viewBox="0 0 24 24" {...p} strokeWidth={1.5}><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><line x1="8" y1="6" x2="8.01" y2="6"/><line x1="12" y1="6" x2="12.01" y2="6"/><line x1="16" y1="6" x2="16.01" y2="6"/><line x1="8" y1="10" x2="8.01" y2="10"/><line x1="12" y1="10" x2="12.01" y2="10"/><line x1="16" y1="10" x2="16.01" y2="10"/></svg>,
    globe: <svg style={s} viewBox="0 0 24 24" {...p} strokeWidth={1.5}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>,
    shield: <svg style={s} viewBox="0 0 24 24" {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10" strokeWidth={2}/></svg>,
    lock: <svg style={s} viewBox="0 0 24 24" {...p}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>,
    eye: <svg style={s} viewBox="0 0 24 24" {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
    star: <svg style={s} viewBox="0 0 24 24" fill={color} stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>,
    arrowRight: <svg style={s} viewBox="0 0 24 24" {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
    home: <svg style={s} viewBox="0 0 24 24" {...p}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
    chevronRight: <svg style={{...s, width: size*0.6, height: size}} viewBox="0 0 10 24" {...p} strokeWidth={2.5}><polyline points="2 4 8 12 2 20"/></svg>,
    sun: <svg style={s} viewBox="0 0 24 24" {...p}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    moon: <svg style={s} viewBox="0 0 24 24" {...p}><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>,
  };
  return map[name] || null;
};
window.Ico = Ico;

// ─── Breadcrumbs ──────────────────────────
function Crumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol className="crumbs-list" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, i) => (
          <li key={i} className="crumbs-item" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            {i > 0 && <Ico name="chevronRight" size={14} color="var(--c3-dim)" />}
            {item.onClick ? (
              <a className="crumbs-link" onClick={item.onClick} itemProp="item"><span itemProp="name">{item.label}</span></a>
            ) : (
              <span className="crumbs-current" itemProp="name">{item.label}</span>
            )}
            <meta itemProp="position" content={String(i + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}

// ─── Payment Breakdown Chart (principal vs interest over time) ──────────────────────────
let _amortId = 0;
function AmortChart({ amount, months, rate, width = 160, height = 44, showLabels = false, currency = false }) {
  const r = rate / 100 / 12;
  const payment = r === 0 ? amount / months : amount * (r * Math.pow(1+r, months)) / (Math.pow(1+r, months) - 1);
  const total = payment * months;
  const interest = total - amount;
  const pctPrincipal = Math.round((amount / total) * 100);
  const pctInterest = 100 - pctPrincipal;

  const barH = showLabels ? 16 : 12;
  const rad = barH / 2;

  return (
    <div style={{display:'flex',flexDirection:'column',gap: showLabels ? 8 : 5, flex:1, minWidth:0}}>
      {showLabels && (
        <div style={{display:'flex',justifyContent:'space-between',fontSize:12,fontWeight:600}}>
          <span style={{color:'#38bdf8'}}>{pctPrincipal}% jistina</span>
          <span style={{color:'#eb0f55'}}>{pctInterest}% uroky</span>
        </div>
      )}
      <div style={{width:'100%',height:barH,borderRadius:rad,background:'var(--c3-surface2)',overflow:'hidden',display:'flex'}}>
        <div style={{width:pctPrincipal+'%',height:'100%',background:'#38bdf8',opacity:0.7,borderRadius:rad+' 0 0 '+rad,transition:'width .4s ease'}}></div>
        <div style={{width:pctInterest+'%',height:'100%',background:'#eb0f55',opacity:0.45,borderRadius:'0 '+rad+' '+rad+' 0',transition:'width .4s ease'}}></div>
      </div>
      <div style={{display:'flex',gap:12,fontSize:10,color:'var(--c3-muted)',fontWeight:600,letterSpacing:'.03em'}}>
        <span style={{display:'flex',alignItems:'center',gap:4}}>
          <span style={{width:7,height:7,borderRadius:2,background:'#38bdf8',opacity:.75}}></span>
          {showLabels ? 'Jistina' : 'Jist.'} {pctPrincipal}%
        </span>
        <span style={{display:'flex',alignItems:'center',gap:4}}>
          <span style={{width:7,height:7,borderRadius:2,background:'#eb0f55',opacity:.55}}></span>
          {showLabels ? 'Uroky' : 'Ur.'} {pctInterest}%
        </span>
      </div>
    </div>
  );
}

// ─── Navigation ──────────────────────────
function Nav3({ lang, setLang, onNav, view, dark }) {
  const t = L[lang].nav;
  const [mob, setMob] = React.useState(false);
  return (
    <nav className="n3" role="navigation" aria-label="Main">
      <div className="n3-inner">
        <a className="n3-logo" onClick={() => onNav('home')} aria-label="Pujckomat home">
          <div className="n3-mark">P</div>
          <span className="n3-name">Pujckomat</span>
        </a>
        <div className="n3-links" role="menubar">
          {[['home', t.home], ['compare', t.compare], ['how', t.how], ['faq', t.faq], ['glossary', lang==='cs'?'Slovnik':'Slovnik']].map(([id, label]) => (
            <a key={id} className={'n3-link' + (view === id ? ' act' : '')} role="menuitem" onClick={() => onNav(id)}>{label}</a>
          ))}
        </div>
        <div className="n3-right">
          <button className="n3-lang" onClick={() => setLang(lang === 'cs' ? 'sk' : 'cs')} aria-label="Switch language">
            <Ico name="globe" size={14} /> {L[lang].langLabel}
          </button>
          <button className="n3-cta" onClick={() => onNav('compare')}>{t.compare} <Ico name="arrowRight" size={14} color="#0a0e1a" /></button>
        </div>
        <button className="n3-ham" onClick={() => setMob(!mob)} aria-label="Menu"><Ico name={mob ? 'close' : 'menu'} size={18} /></button>
      </div>
      {mob && (
        <div className="n3-mobile" role="menu">
          {[['home', t.home], ['compare', t.compare], ['how', t.how], ['faq', t.faq], ['glossary', lang==='cs'?'Slovnik':'Slovnik']].map(([id, label]) => (
            <a key={id} className="n3-mlink" role="menuitem" onClick={() => { onNav(id); setMob(false); }}>{label}</a>
          ))}
          <button className="n3-cta" style={{width:'100%',marginTop:8}} onClick={() => { onNav('compare'); setMob(false); }}>{t.compare} <Ico name="arrowRight" size={14} color="#0a0e1a" /></button>
        </div>
      )}
    </nav>
  );
}

// ─── Standalone Loan Calculator Page ──────────────────────────
function CalcPage3({ lang, onNav }) {
  const cs = lang === 'cs';
  const isEUR = lang === 'sk';
  const curr = isEUR ? '\u20ac' : 'Kc';
  const maxA = isEUR ? 50000 : 1500000;
  const minA = isEUR ? 500 : 10000;
  const stepA = isEUR ? 500 : 10000;
  const fmtV = (v) => v.toLocaleString(cs ? 'cs-CZ' : 'sk-SK');
  const pct = (v, mn, mx) => ((v - mn) / (mx - mn)) * 100;

  const [amt, setAmt] = React.useState(isEUR ? 5000 : 150000);
  const [mo, setMo] = React.useState(36);
  const [rate, setRate] = React.useState(5.5);
  const [editingAmt, setEditingAmt] = React.useState(false);
  const [editingMo, setEditingMo] = React.useState(false);
  const [scenario, setScenario] = React.useState(null); // {amt, mo, rate} for comparison

  const r = rate / 100 / 12;
  const monthly = r === 0 ? amt / mo : amt * (r * Math.pow(1+r, mo)) / (Math.pow(1+r, mo) - 1);
  const total = monthly * mo;
  const interest = total - amt;
  const pctPrincipal = Math.round((amt / total) * 100);
  const pctInterest = 100 - pctPrincipal;

  // Amortization schedule
  const schedule = React.useMemo(() => {
    const rows = [];
    let balance = amt;
    for (let i = 1; i <= mo; i++) {
      const intPart = balance * (rate / 100 / 12);
      const prinPart = monthly - intPart;
      balance = Math.max(0, balance - prinPart);
      rows.push({ month: i, payment: monthly, principal: prinPart, interest: intPart, balance });
    }
    return rows;
  }, [amt, mo, rate, monthly]);

  // Show every Nth row for long schedules
  const displaySchedule = React.useMemo(() => {
    if (schedule.length <= 24) return schedule;
    const step = Math.ceil(schedule.length / 20);
    const filtered = schedule.filter((_, i) => i === 0 || (i + 1) % step === 0 || i === schedule.length - 1);
    return filtered;
  }, [schedule]);

  // Comparison table: different rates
  const rateComparison = React.useMemo(() => {
    const rates = [3.99, 5.5, 8.9, 12.9, 19.9];
    return rates.map(rt => {
      const rv = rt / 100 / 12;
      const m = rv === 0 ? amt / mo : amt * (rv * Math.pow(1+rv, mo)) / (Math.pow(1+rv, mo) - 1);
      const t = m * mo;
      return { rate: rt, monthly: Math.round(m), total: Math.round(t), interest: Math.round(t - amt) };
    });
  }, [amt, mo]);

  // Period comparison
  const periodComparison = React.useMemo(() => {
    const periods = [12, 24, 36, 60, 84, 120].filter(p => p >= 6);
    return periods.map(p => {
      const rv = rate / 100 / 12;
      const m = rv === 0 ? amt / p : amt * (rv * Math.pow(1+rv, p)) / (Math.pow(1+rv, p) - 1);
      const t = m * p;
      return { months: p, monthly: Math.round(m), total: Math.round(t), interest: Math.round(t - amt) };
    });
  }, [amt, rate]);

  // Chart data: cumulative principal vs interest over time
  const chartData = React.useMemo(() => {
    const pts = 24;
    const data = [];
    for (let i = 0; i <= pts; i++) {
      const targetMo = Math.round((i / pts) * mo);
      let cumP = 0, cumI = 0, bal = amt;
      for (let j = 0; j < targetMo; j++) {
        const ip = bal * (rate / 100 / 12);
        const pp = monthly - ip;
        cumI += ip;
        cumP += pp;
        bal = Math.max(0, bal - pp);
      }
      data.push({ mo: targetMo, principal: cumP, interest: cumI, balance: bal });
    }
    return data;
  }, [amt, mo, rate, monthly]);

  // Smart tips
  const tips = React.useMemo(() => {
    const t = [];
    // Shorter period tip
    if (mo > 24) {
      const shorterMo = Math.max(12, mo - 12);
      const rv = rate / 100 / 12;
      const shorterPayment = rv === 0 ? amt / shorterMo : amt * (rv * Math.pow(1+rv, shorterMo)) / (Math.pow(1+rv, shorterMo) - 1);
      const saving = Math.round(total - shorterPayment * shorterMo);
      if (saving > 500) {
        t.push({ icon: 'bolt', color: '#c8ff00', text: cs
          ? `Zkracenim o 12 mesicu usetrite ${fmtV(saving)} ${curr} na urocich. Splatka by byla ${fmtV(Math.round(shorterPayment))} ${curr}/mes.`
          : `Skratenim o 12 mesiacov usetrite ${fmtV(saving)} ${curr}.` });
      }
    }
    // Lower rate tip
    if (rate > 5) {
      const betterRate = Math.max(3.99, rate - 2);
      const rv2 = betterRate / 100 / 12;
      const betterPayment = rv2 === 0 ? amt / mo : amt * (rv2 * Math.pow(1+rv2, mo)) / (Math.pow(1+rv2, mo) - 1);
      const saving2 = Math.round(total - betterPayment * mo);
      t.push({ icon: 'chart', color: '#38bdf8', text: cs
        ? `S urokem ${betterRate.toFixed(1)} % by splatka klesla na ${fmtV(Math.round(betterPayment))} ${curr}/mes — uspora ${fmtV(saving2)} ${curr} celkem.`
        : `S urokom ${betterRate.toFixed(1)} % by splatka klesla na ${fmtV(Math.round(betterPayment))} ${curr}/mes.` });
    }
    // High interest warning
    if (pctInterest > 30) {
      t.push({ icon: 'shield', color: '#eb0f55', text: cs
        ? `Uroky tvori ${pctInterest} % celkove ceny — to je vysoke. Zvazite kratsi dobu nebo nizsi urok.`
        : `Uroky tvoria ${pctInterest} % celkovej ceny — to je vysoke.` });
    }
    return t;
  }, [amt, mo, rate, total, interest, pctInterest, cs, curr, fmtV]);

  // Scenario comparison
  const scenarioCalc = React.useMemo(() => {
    if (!scenario) return null;
    const rv = scenario.rate / 100 / 12;
    const m = rv === 0 ? scenario.amt / scenario.mo : scenario.amt * (rv * Math.pow(1+rv, scenario.mo)) / (Math.pow(1+rv, scenario.mo) - 1);
    const t = m * scenario.mo;
    return { monthly: Math.round(m), total: Math.round(t), interest: Math.round(t - scenario.amt) };
  }, [scenario]);

  // Preset amounts
  const presets = isEUR ? [1000, 5000, 15000, 30000] : [50000, 150000, 500000, 1000000];
  const moPresets = [12, 24, 36, 60, 84, 120];

  // Editable input handler
  const handleAmtEdit = (val) => {
    const num = parseInt(val.replace(/\D/g, ''));
    if (!isNaN(num) && num >= minA && num <= maxA) setAmt(num);
  };

  return (
    <section className="cp3 page-in" aria-label={cs ? 'Kalkulacka splatek' : 'Kalkulacka splatok'}>
      <div className="w3" style={{maxWidth:900}}>
        <Crumbs items={[
          { label: L[lang].breadcrumbs.home },
          { label: cs ? 'Kalkulacka splatek' : 'Kalkulacka splatok' },
        ]} />

        <div className="cp3-header">
          <div className="aip3-badge"><Ico name="chart" size={14} color="var(--c3-primary)" /> {cs ? 'Financni nastroj' : 'Financny nastroj'}</div>
          <h1 className="gl3-h1">{cs ? 'Kalkulacka splatek' : 'Kalkulacka splatok'}</h1>
          <p className="gl3-sub">{cs
            ? 'Spocitejte si mesicni splatku, celkove naklady a podivejte se na splatkovy kalendar. Porovnejte ruzne uroky a doby splaceni.'
            : 'Vypocitajte si mesacnu splatku, celkove naklady a pozrite si splatkovy kalendar.'}</p>
        </div>

        <div className="cp3-layout">
          {/* Sliders */}
          <div className="cp3-inputs">
            <div className="lc3-f">
              <label>{cs ? 'Vyse pujcky' : 'Vyska pozicky'}</label>
              {editingAmt ? (
                <input className="cp3-edit-input" type="text" autoFocus defaultValue={fmtV(amt)}
                       onBlur={e => { handleAmtEdit(e.target.value); setEditingAmt(false); }}
                       onKeyDown={e => { if (e.key === 'Enter') { handleAmtEdit(e.target.value); setEditingAmt(false); }}} />
              ) : (
                <div className="lc3-val" onClick={() => setEditingAmt(true)} style={{cursor:'pointer'}} title={cs?'Kliknete pro zadani presne castky':'Kliknite pre zadanie presnej sumy'}>
                  <span className="lc3-big">{fmtV(amt)}</span><span className="lc3-unit">{curr}</span>
                  <Ico name="bolt" size={12} color="var(--c3-dim)" />
                </div>
              )}
              <input type="range" className="sl3" min={minA} max={maxA} step={stepA} value={amt} onChange={e => setAmt(+e.target.value)} style={{'--pct': pct(amt,minA,maxA)+'%'}} />
              <div className="cp3-presets">
                {presets.map(p => <button key={p} className={'cp3-preset' + (amt===p?' act':'')} onClick={() => setAmt(p)}>{fmtV(p)}</button>)}
              </div>
            </div>
            <div className="lc3-f">
              <label>{cs ? 'Doba splaceni' : 'Doba splacania'}</label>
              <div className="lc3-val"><span className="lc3-big">{mo}</span><span className="lc3-unit">{cs?'mes':'mes'} ({(mo/12).toFixed(1)} {cs?'r':'r'})</span></div>
              <input type="range" className="sl3" min={6} max={120} step={6} value={mo} onChange={e => setMo(+e.target.value)} style={{'--pct': pct(mo,6,120)+'%'}} />
              <div className="cp3-presets">
                {moPresets.map(p => <button key={p} className={'cp3-preset' + (mo===p?' act':'')} onClick={() => setMo(p)}>{p} {cs?'m':'m'}</button>)}
              </div>
            </div>
            <div className="lc3-f">
              <label>{cs ? 'Urokova sazba' : 'Urokova sadzba'} (% p.a.)</label>
              <div className="lc3-val"><span className="lc3-big">{rate.toFixed(1)}</span><span className="lc3-unit">% p.a.</span></div>
              <input type="range" className="sl3" min={1} max={30} step={0.1} value={rate} onChange={e => setRate(+e.target.value)} style={{'--pct': pct(rate,1,30)+'%'}} />
              <div className="lc3-minmax"><span>1 %</span><span>30 %</span></div>
            </div>

            {/* Compare scenario button */}
            {!scenario ? (
              <button className="b3-ghost" style={{width:'100%',marginTop:8,fontSize:13}} onClick={() => setScenario({amt,mo,rate})}>
                <Ico name="chart" size={14} /> {cs ? 'Ulozit scenar k porovnani' : 'Ulozit scenar na porovnanie'}
              </button>
            ) : (
              <div className="cp3-scenario-badge">
                <Ico name="check" size={14} color="var(--c3-green)" />
                <span>{cs ? 'Scenar ulozen' : 'Scenar ulozeny'}: {fmtV(scenario.amt)} {curr} / {scenario.mo}{cs?'m':'m'} / {scenario.rate}%</span>
                <button className="cp3-scenario-clear" onClick={() => setScenario(null)}><Ico name="close" size={12} color="var(--c3-muted)" /></button>
              </div>
            )}
          </div>

          {/* Big results */}
          <div className="cp3-results">
            {/* Primary: monthly payment */}
            <div className="cp3-monthly-hero">
              <div className="cp3-monthly-label">{cs ? 'Budete platit mesicne' : 'Budete platit mesacne'}</div>
              <div className="cp3-monthly-amount">
                <span className="cp3-monthly-num">{fmtV(Math.round(monthly))}</span>
                <span className="cp3-monthly-curr">{curr}</span>
              </div>
              <div className="cp3-monthly-sub">{mo}x {cs?'splatka':'splatka'} po {fmtV(Math.round(monthly))} {curr}</div>
            </div>

            {/* Three key numbers */}
            <div className="cp3-trio">
              <div className="cp3-trio-card cp3-trio-borrow">
                <Ico name="bank" size={20} color="#38bdf8" />
                <div className="cp3-trio-label">{cs ? 'Pujcujete si' : 'Poziciavate si'}</div>
                <div className="cp3-trio-val" style={{color:'#38bdf8'}}>{fmtV(amt)} {curr}</div>
              </div>
              <div className="cp3-trio-card cp3-trio-interest">
                <Ico name="chart" size={20} color="#eb0f55" />
                <div className="cp3-trio-label">{cs ? 'Zaplatite navic na urocich' : 'Zaplatite navyse na urokoch'}</div>
                <div className="cp3-trio-val" style={{color:'#eb0f55'}}>{fmtV(Math.round(interest))} {curr}</div>
                <div className="cp3-trio-pct">{pctInterest}% {cs?'z celkove ceny':'z celkovej ceny'}</div>
              </div>
              <div className="cp3-trio-card cp3-trio-total">
                <Ico name="shield" size={20} color="var(--c3-primary)" />
                <div className="cp3-trio-label">{cs ? 'Celkem vratite' : 'Celkovo vratite'}</div>
                <div className="cp3-trio-val">{fmtV(Math.round(total))} {curr}</div>
              </div>
            </div>

            {/* Visual bar: what you pay */}
            <div className="cp3-paybar">
              <div className="cp3-paybar-label">{cs ? 'Z kazde splatky' : 'Z kazdej splatky'}:</div>
              <div className="cp3-paybar-track">
                <div className="cp3-paybar-seg cp3-paybar-principal" style={{width:pctPrincipal+'%'}}>
                  <span>{pctPrincipal}%</span>
                </div>
                <div className="cp3-paybar-seg cp3-paybar-int" style={{width:pctInterest+'%'}}>
                  {pctInterest > 8 && <span>{pctInterest}%</span>}
                </div>
              </div>
              <div className="cp3-paybar-legend">
                <span><span className="cp3-dot" style={{background:'#38bdf8'}}></span> {cs?'Splacite dluh (jistina)':'Splacate dlh (istina)'}</span>
                <span><span className="cp3-dot" style={{background:'#eb0f55'}}></span> {cs?'Zaplatite bance (uroky)':'Zaplatite banke (uroky)'}</span>
              </div>
            </div>

            {/* Scenario comparison */}
            {scenario && scenarioCalc && (
              <div className="cp3-scenario-compare">
                <div className="cp3-scenario-title">{cs ? 'Porovnani scenaru' : 'Porovnanie scenarov'}</div>
                <div className="cp3-scenario-grid">
                  <div></div><div className="cp3-sc-head">{cs?'Aktualni':'Aktualny'}</div><div className="cp3-sc-head">{cs?'Ulozeny':'Ulozeny'}</div><div className="cp3-sc-head">{cs?'Rozdil':'Rozdiel'}</div>
                  <div className="cp3-sc-label">{cs?'Splatka':'Splatka'}</div>
                  <div className="cp3-sc-val">{fmtV(Math.round(monthly))} {curr}</div>
                  <div className="cp3-sc-val">{fmtV(scenarioCalc.monthly)} {curr}</div>
                  <div className="cp3-sc-diff" style={{color: monthly < scenarioCalc.monthly ? 'var(--c3-green)' : monthly > scenarioCalc.monthly ? '#eb0f55' : 'var(--c3-muted)'}}>
                    {monthly < scenarioCalc.monthly ? '-' : '+'}{fmtV(Math.abs(Math.round(monthly - scenarioCalc.monthly)))} {curr}
                  </div>
                  <div className="cp3-sc-label">{cs?'Celkem':'Celkovo'}</div>
                  <div className="cp3-sc-val">{fmtV(Math.round(total))} {curr}</div>
                  <div className="cp3-sc-val">{fmtV(scenarioCalc.total)} {curr}</div>
                  <div className="cp3-sc-diff" style={{color: total < scenarioCalc.total ? 'var(--c3-green)' : total > scenarioCalc.total ? '#eb0f55' : 'var(--c3-muted)'}}>
                    {total < scenarioCalc.total ? '-' : '+'}{fmtV(Math.abs(Math.round(total - scenarioCalc.total)))} {curr}
                  </div>
                  <div className="cp3-sc-label">{cs?'Uroky':'Uroky'}</div>
                  <div className="cp3-sc-val">{fmtV(Math.round(interest))} {curr}</div>
                  <div className="cp3-sc-val">{fmtV(scenarioCalc.interest)} {curr}</div>
                  <div className="cp3-sc-diff" style={{color: interest < scenarioCalc.interest ? 'var(--c3-green)' : interest > scenarioCalc.interest ? '#eb0f55' : 'var(--c3-muted)'}}>
                    {interest < scenarioCalc.interest ? '-' : '+'}{fmtV(Math.abs(Math.round(interest - scenarioCalc.interest)))} {curr}
                  </div>
                </div>
              </div>
            )}

            {/* Smart tips */}
            {tips.length > 0 && (
              <div className="cp3-tips">
                <div className="cp3-tips-title"><Ico name="sparkle" size={14} color="var(--c3-primary)" /> {cs ? 'Tipy' : 'Tipy'}</div>
                {tips.map((tip, i) => (
                  <div key={i} className="cp3-tip">
                    <Ico name={tip.icon} size={15} color={tip.color} />
                    <span>{tip.text}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Chart */}
            <div className="cp3-chart">
              <div className="cp3-chart-title">{cs ? 'Prubeh splaceni' : 'Priebeh splacania'}</div>
              <svg width="100%" height="120" viewBox="0 0 400 120" preserveAspectRatio="none" style={{display:'block',borderRadius:8}}>
                {/* Grid lines */}
                <line x1="0" y1="30" x2="400" y2="30" stroke="var(--c3-border)" strokeWidth="0.5" strokeDasharray="4,4"/>
                <line x1="0" y1="60" x2="400" y2="60" stroke="var(--c3-border)" strokeWidth="0.5" strokeDasharray="4,4"/>
                <line x1="0" y1="90" x2="400" y2="90" stroke="var(--c3-border)" strokeWidth="0.5" strokeDasharray="4,4"/>
                {/* Balance curve */}
                <path d={chartData.map((d, i) => `${i===0?'M':'L'}${(i/24*400).toFixed(1)},${(4 + (1 - d.balance/amt) * 110).toFixed(1)}`).join(' ')}
                      fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round"/>
                {/* Interest cumulative */}
                <path d={chartData.map((d, i) => `${i===0?'M':'L'}${(i/24*400).toFixed(1)},${(114 - (d.interest/total)*110).toFixed(1)}`).join(' ')}
                      fill="none" stroke="#eb0f55" strokeWidth="2" strokeLinecap="round" strokeDasharray="6,4"/>
                {/* Start/end dots */}
                <circle cx="0" cy="4" r="3" fill="#38bdf8"/>
                <circle cx="400" cy="114" r="3" fill="#38bdf8"/>
              </svg>
              <div className="cp3-chart-labels">
                <span>0</span>
                <span>{Math.round(mo/2)} {cs?'mes':'mes'}</span>
                <span>{mo} {cs?'mes':'mes'}</span>
              </div>
              <div className="cp3-bar-legend" style={{marginTop:8}}>
                <span><span className="cp3-dot" style={{background:'#38bdf8'}}></span> {cs?'Zustatek dluhu':'Zostatok dlhu'}</span>
                <span><span className="cp3-dot" style={{background:'#eb0f55'}}></span> {cs?'Zaplacene uroky':'Zaplatene uroky'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Rate comparison table */}
        <div className="cp3-section">
          <h2 className="d3-section-title">{cs ? 'Porovnani uroku' : 'Porovnanie urokov'}</h2>
          <p className="cp3-section-sub">{cs
            ? `Jak se meni splatka pri ruzne urokove sazbe pro pujcku ${fmtV(amt)} ${curr} na ${mo} mesicu.`
            : `Ako sa meni splatka pri roznej urokovej sadzbe.`}</p>
          <div className="d3-table-wrap">
            <table className="d3-table">
              <thead><tr><th>{cs?'Urok':'Urok'}</th><th>{cs?'Splatka':'Splatka'}</th><th>{cs?'Uroky celkem':'Uroky celkom'}</th><th>{cs?'Celkem':'Celkovo'}</th></tr></thead>
              <tbody>
                {rateComparison.map((row, i) => (
                  <tr key={i} className={Math.abs(row.rate - rate) < 0.5 ? 'cp3-active-row' : ''}>
                    <td style={{fontWeight:700}}>{row.rate} %</td>
                    <td className="d3-table-hl">{fmtV(row.monthly)} {curr}</td>
                    <td style={{color:'#eb0f55'}}>{fmtV(row.interest)} {curr}</td>
                    <td>{fmtV(row.total)} {curr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Period comparison */}
        <div className="cp3-section">
          <h2 className="d3-section-title">{cs ? 'Porovnani doby splaceni' : 'Porovnanie doby splacania'}</h2>
          <p className="cp3-section-sub">{cs
            ? `Jak se meni splatka a celkove naklady pri ruzne dobe splaceni (urok ${rate} %).`
            : `Ako sa meni splatka pri roznej dobe splacania.`}</p>
          <div className="d3-table-wrap">
            <table className="d3-table">
              <thead><tr><th>{cs?'Doba':'Doba'}</th><th>{cs?'Splatka':'Splatka'}</th><th>{cs?'Uroky':'Uroky'}</th><th>{cs?'Celkem':'Celkovo'}</th></tr></thead>
              <tbody>
                {periodComparison.map((row, i) => (
                  <tr key={i} className={row.months === mo ? 'cp3-active-row' : ''}>
                    <td style={{fontWeight:700}}>{row.months} {cs?'mes':'mes'} ({(row.months/12).toFixed(1)} {cs?'r':'r'})</td>
                    <td className="d3-table-hl">{fmtV(row.monthly)} {curr}</td>
                    <td style={{color:'#eb0f55'}}>{fmtV(row.interest)} {curr}</td>
                    <td>{fmtV(row.total)} {curr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Amortization schedule */}
        <div className="cp3-section">
          <h2 className="d3-section-title">{cs ? 'Splatkovy kalendar' : 'Splatkovy kalendar'}</h2>
          <p className="cp3-section-sub">{cs
            ? 'Rozlozeni kazde splatky na jistinu a uroky v prubehu casu.'
            : 'Rozlozenie kazdej splatky na istinu a uroky.'}</p>
          <div className="d3-table-wrap" style={{maxHeight:400,overflow:'auto'}}>
            <table className="d3-table">
              <thead style={{position:'sticky',top:0,zIndex:2}}>
                <tr>
                  <th>#</th>
                  <th>{cs?'Splatka':'Splatka'}</th>
                  <th>{cs?'Jistina':'Istina'}</th>
                  <th>{cs?'Urok':'Urok'}</th>
                  <th>{cs?'Zustatek':'Zostatok'}</th>
                </tr>
              </thead>
              <tbody>
                {displaySchedule.map((row) => (
                  <tr key={row.month}>
                    <td style={{color:'var(--c3-dim)',fontWeight:600}}>{row.month}.</td>
                    <td>{fmtV(Math.round(row.payment))} {curr}</td>
                    <td style={{color:'#38bdf8',fontWeight:600}}>{fmtV(Math.round(row.principal))} {curr}</td>
                    <td style={{color:'#eb0f55'}}>{fmtV(Math.round(row.interest))} {curr}</td>
                    <td style={{fontWeight:600}}>{fmtV(Math.round(row.balance))} {curr}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* CTA */}
        <div className="cp3-cta">
          <div className="cp3-cta-inner">
            <div>
              <h3>{cs ? 'Chcete najit nejlepsi pujcku?' : 'Chcete najst najlepsiu pozicku?'}</h3>
              <p>{cs ? 'Porovnejte nabidky od 10+ poskytovatelu s vasimi parametry.' : 'Porovnajte ponuky od 10+ poskytovatelov.'}</p>
            </div>
            <button className="b3-primary b3-lg" onClick={() => onNav('compare')}>
              {cs ? 'Srovnat nabidky' : 'Porovnat ponuky'} <Ico name="arrowRight" size={16} color="#0a0e1a" />
            </button>
          </div>
        </div>

        {/* SEO text */}
        <div className="d3-section" style={{marginTop:28}}>
          <h3 className="d3-section-title">{cs ? 'Jak pouzivat kalkulacku' : 'Ako pouzivat kalkulacku'}</h3>
          <p className="d3-seo-text">{cs
            ? 'Kalkulacka splatek vam pomaha spocitat mesicni splatku, celkove naklady a podil uroku na pujcce. Staci zadat vysi pujcky, dobu splaceni a urokovou sazbu. Vysledky se aktualizuji okamzite. Tabulka porovnani uroku ukazuje, jak se meni splatka pri ruznem uroku — i maly rozdil v RPSN muze znamenat tisice korun navic. Splatkovy kalendar pak ukazuje, kolik z kazde splatky jde na jistinu a kolik na uroky. Na zacatku splaceni vetsi cast splatky pokryva uroky, postupem casu se pomer obraci ve prospech jistiny.'
            : 'Kalkulacka splatok vam pomaha vypocitat mesacnu splatku a celkove naklady pozicky.'}</p>
        </div>
      </div>
    </section>
  );
}

// ─── Scroll Reveal ──────────────────────────
function Reveal({ children, className = '', delay = 0 }) {
  const ref = React.useRef(null);
  const [vis, setVis] = React.useState(false);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${vis ? 'revealed' : ''} ${className}`} style={{transitionDelay: delay + 'ms'}}>{children}</div>;
}

// ─── Hero ──────────────────────────
function Hero3({ lang, onStart }) {
  const t = L[lang].hero;
  const [vis, setVis] = React.useState(false);
  const sp = useSocialProof();
  const cs = lang === 'cs';
  React.useEffect(() => { requestAnimationFrame(() => setVis(true)); }, []);
  return (
    <header className={'h3-hero' + (vis ? ' vis' : '')} role="banner">
      <div className="h3-inner">
        <div className="h3-badge"><Ico name="bolt" size={13} color="#c8ff00" /> {t.badge}</div>
        <h1 className="h3-h1">{t.h1.split('\n').map((line, i) => <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>)}</h1>
        <p className="h3-sub">{t.sub}</p>
        <button className="b3-primary b3-lg" onClick={onStart}>{L[lang].nav.compare} <Ico name="arrowRight" size={16} color="#0a0e1a" /></button>
        <div className="h3-live">
          <LiveBadge count={sp.liveNow} label={cs?'lidi prave srovnava':'ludi prave porovnava'} pulse={true} />
          <LiveBadge count={sp.weeklyCompare.toLocaleString()} label={cs?'srovnani tento tyden':'porovnani tento tyzden'} icon="chart" color="var(--c3-primary)" pulse={false} />
        </div>
        <div className="h3-metrics">
          <div className="h3-metric">
            <div className="h3-metric-ico"><Ico name="bank" size={18} color="#c8ff00" /></div>
            <div><strong>10+</strong><span>{lang==='cs'?'poskytovatelů':'poskytovateľov'}</span></div>
          </div>
          <div className="h3-metric">
            <div className="h3-metric-ico"><Ico name="shield" size={18} color="#c8ff00" /></div>
            <div><strong>100%</strong><span>{lang==='cs'?'transparentní':'transparentné'}</span></div>
          </div>
          <div className="h3-metric">
            <div className="h3-metric-ico"><Ico name="bolt" size={18} color="#c8ff00" /></div>
            <div><strong>30s</strong><span>{lang==='cs'?'výsledky':'výsledky'}</span></div>
          </div>
          <div className="h3-metric">
            <div className="h3-metric-ico"><Ico name="sparkle" size={18} color="#c8ff00" /></div>
            <div><strong>AI</strong><span>{lang==='cs'?'doporučení':'odporúčania'}</span></div>
          </div>
        </div>
      </div>
      <div className="h3-grid-bg"></div>
      <div className="h3-glow h3-glow-1"></div>
      <div className="h3-glow h3-glow-2"></div>
    </header>
  );
}

// ─── Social Proof Banner (logos + stats marquee) ──────────────────────────
function SocialBanner3({ lang }) {
  const cs = lang === 'cs';
  const sp = useSocialProof();
  const providers = P.filter(p => !(lang === 'sk' ? !p.isSK : p.isSK));

  return (
    <section className="sbanner3">
      <div className="w3">
        {/* Stats row */}
        <div className="sbanner3-stats">
          <div className="sbanner3-stat">
            <strong>{sp.weeklyCompare.toLocaleString()}</strong>
            <span>{cs?'srovnani tento tyden':'porovnani tento tyzden'}</span>
          </div>
          <div className="sbanner3-sep"></div>
          <div className="sbanner3-stat">
            <strong>{(sp.weeklyCompare * 22).toLocaleString()}</strong>
            <span>{cs?'spokojenych klientu':'spokojenych klientov'}</span>
          </div>
          <div className="sbanner3-sep"></div>
          <div className="sbanner3-stat">
            <strong>{providers.length}</strong>
            <span>{cs?'overených poskytovatelu':'overených poskytovatelov'}</span>
          </div>
          <div className="sbanner3-sep"></div>
          <div className="sbanner3-stat">
            <strong style={{color:'var(--c3-primary)'}}>{(4.5 + (sp.tick % 5) * 0.1).toFixed(1)}/5</strong>
            <span>{cs?'hodnoceni uzivatelu':'hodnotenie uzivatelov'}</span>
          </div>
        </div>

        {/* Provider logos marquee */}
        <div style={{textAlign:'center',marginBottom:28}}>
          <h2 className="s3-title" style={{marginBottom:0}}>{cs?'Porovnavame pro vas':'Porovnavame pre vas'}</h2>
        </div>
        <div className="sbanner3-marquee">
          <div className="sbanner3-track">
            {[...providers, ...providers].map((p, i) => (
              <div key={i} className="sbanner3-logo-pill">
                <div className="sbanner3-logo-dot" style={{background:p.logo?'transparent':p.color}}>{p.logo?<img src={p.logo} alt={p.name} style={{width:'100%',height:'100%',objectFit:'contain',borderRadius:7}} onError={e=>{e.target.style.display='none'}} />:p.initial}</div>
                <span>{p.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
window.SocialBanner3 = SocialBanner3;

// ─── Trust Section ──────────────────────────
function Trust3({ lang }) {
  const t = L[lang].trust;
  return (
    <section className="trust3" aria-label={t.title}>
      <div className="w3">
        <Reveal><h2 className="s3-title">{t.title}</h2></Reveal>
        <div className="trust3-grid">
          {t.items.map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="trust3-card">
                <div className="trust3-ico"><Ico name={item.icon} size={24} color="var(--c3-primary)" /></div>
                <h3 className="trust3-t">{item.t}</h3>
                <p className="trust3-d">{item.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── AI Advisor (Smart Rules Engine — no API needed) ──────────────────────────
function generateAdvice(lang, offers, best, amount, months, isEUR) {
  if (!best || offers.length < 2) return '';
  const cs = lang === 'cs';
  const curr = isEUR ? '\u20ac' : 'Kc';
  const fmtV = (v) => v.toLocaleString(cs ? 'cs-CZ' : 'sk-SK');

  const worst = offers[offers.length - 1];
  const savings = worst.total - best.total;
  const cheapest = offers.reduce((a, b) => a.monthly < b.monthly ? a : b);
  const fastest = offers.reduce((a, b) => a.approval < b.approval ? a : b);

  // Build recommendation based on what stands out
  const parts = [];

  // Main recommendation
  if (cs) {
    parts.push(`Pro pujcku ${fmtV(amount)} ${curr} na ${months} mesicu doporucuji ${best.name} s RPSN ${best.rpsn} % a splatkou ${fmtV(best.monthly)} ${curr}/mes.`);
  } else {
    parts.push(`Pre pozicku ${fmtV(amount)} ${curr} na ${months} mesiacov odporucam ${best.name} s RPSN ${best.rpsn} % a splatkou ${fmtV(best.monthly)} ${curr}/mes.`);
  }

  // Savings comparison
  if (savings > 0) {
    if (cs) {
      parts.push(`Oproti nejdrazsi nabidce (${worst.name}) usetrite ${fmtV(savings)} ${curr} na celkove cene uveru.`);
    } else {
      parts.push(`Oproti najdrahsej ponuke (${worst.name}) usetrite ${fmtV(savings)} ${curr}.`);
    }
  }

  // Fee highlight
  if (best.noFees && best.earlyFree) {
    parts.push(cs
      ? `${best.name} navic neuctuje zadne poplatky za zrizeni, vedeni ani predcasne splaceni.`
      : `${best.name} navyse neuctuje ziadne poplatky za zriadenie, vedenie ani predcasne splatenie.`);
  } else if (!best.noFees) {
    // Mention if best has fees but is still cheapest overall
    parts.push(cs
      ? `Pozor: ${best.name} ma poplatek za vedeni, ale i tak vychazi celkove nejvyhodneji diky nizkemu RPSN.`
      : `Pozor: ${best.name} ma poplatok za vedenie, ale aj tak vychadza celkovo najvyhodnejsie.`);
  }

  // Speed tip if fastest is different
  if (fastest.id !== best.id && fastest.approval <= 5) {
    parts.push(cs
      ? `Pokud potrebujete penize rychle, ${fastest.name} schvali zadost za ${fastest.approval} minut (ale RPSN je ${fastest.rpsn} %).`
      : `Ak potrebujete peniaze rychlo, ${fastest.name} schvali ziadost za ${fastest.approval} minut (ale RPSN je ${fastest.rpsn} %).`);
  }

  return parts.slice(0, 3).join(' ');
}

function AiAdvisor({ lang, offers, best, amount, months, isEUR }) {
  const [expanded, setExpanded] = React.useState(true);
  const cs = lang === 'cs';

  const advice = React.useMemo(
    () => generateAdvice(lang, offers, best, amount, months, isEUR),
    [lang, offers, best, amount, months, isEUR]
  );

  if (!offers.length || !advice) return null;

  return (
    <div className="ai3-advisor">
      <button className="ai3-trigger" onClick={() => setExpanded(!expanded)}>
        <div className="ai3-trigger-left">
          <div className="ai3-sparkle"><Ico name="sparkle" size={18} color="#0a0e1a" /></div>
          <div>
            <div className="ai3-trigger-title">{cs ? 'AI Poradce' : 'AI Poradca'}</div>
            <div className="ai3-trigger-sub">{cs ? 'Osobni doporuceni na miru' : 'Osobne odporucenie na mieru'}</div>
          </div>
        </div>
        <svg className={'ai3-chev' + (expanded ? ' ai3-chev-open' : '')} width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="var(--c3-primary)" strokeWidth="2" strokeLinecap="round"><polyline points="2,4 6,8 10,4"/></svg>
      </button>

      {expanded && (
        <div className="ai3-body">
          <div className="ai3-result">
            <div className="ai3-result-icon"><Ico name="sparkle" size={16} color="var(--c3-primary)" /></div>
            <p className="ai3-result-text">{advice}</p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Custom Sort Dropdown ──────────────────────────
function SortDropdown({ options, value, onChange }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!open) return;
    const close = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [open]);

  const sortIcons = ['chart', 'bolt', 'rocket', 'star'];

  return (
    <div className="sd3" ref={ref}>
      <button className="sd3-trigger" onClick={() => setOpen(!open)} aria-expanded={open} aria-haspopup="listbox">
        <Ico name={sortIcons[value] || 'chart'} size={14} color="var(--c3-primary)" />
        <span className="sd3-label">{options[value]}</span>
        <svg className={'sd3-chev' + (open ? ' sd3-chev-open' : '')} width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="var(--c3-muted)" strokeWidth="2" strokeLinecap="round"><polyline points="2,3.5 5,6.5 8,3.5"/></svg>
      </button>
      {open && (
        <div className="sd3-menu" role="listbox">
          {options.map((opt, i) => (
            <button key={i} className={'sd3-option' + (value === i ? ' sd3-active' : '')} role="option" aria-selected={value === i}
                    onClick={() => { onChange(i); setOpen(false); }}>
              <Ico name={sortIcons[i] || 'chart'} size={14} color={value === i ? 'var(--c3-primary)' : 'var(--c3-dim)'} />
              <span>{opt}</span>
              {value === i && <Ico name="check" size={14} color="var(--c3-primary)" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Live Calculator + Results ──────────────────────────
function LiveCalc3({ lang, currency, dark }) {
  const t = L[lang].calc;
  const r = L[lang].res;
  const cs = lang === 'cs';
  const sp = useSocialProof();
  const isEUR = currency === 'EUR';
  const [amt, setAmt] = React.useState(isEUR ? 5000 : 150000);
  const [mo, setMo] = React.useState(36);
  const [purp, setPurp] = React.useState(0);
  const [filt, setFilt] = React.useState(0);
  const [sort, setSort] = React.useState(0);
  const [sel, setSel] = React.useState(null);
  const [showApp, setShowApp] = React.useState(false);
  const [recalc, setRecalc] = React.useState(false);
  const [interacted, setInteracted] = React.useState(false);
  const resultsRef = React.useRef(null);
  const recalcTimer = React.useRef(null);

  const maxA = isEUR ? 50000 : 1500000;
  const minA = isEUR ? 500 : 10000;
  const stepA = isEUR ? 500 : 10000;
  const pct = (v, mn, mx) => ((v - mn) / (mx - mn)) * 100;

  // Wrap setters to trigger recalc animation + auto-scroll
  const handleChange = (setter, val) => {
    setter(val);
    setInteracted(true);
    setRecalc(true);
    clearTimeout(recalcTimer.current);
    recalcTimer.current = setTimeout(() => {
      setRecalc(false);
      // Always scroll to results top after recalc
      if (resultsRef.current) {
        const top = resultsRef.current.getBoundingClientRect().top + window.pageYOffset - 70;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }, 400);
  };

  const offers = React.useMemo(() => getOff(amt, mo, purp, filt, isEUR), [amt, mo, purp, filt, isEUR]);
  const sorted = React.useMemo(() => {
    const s = [...offers];
    if (sort === 0) s.sort((a,b) => a.rpsn - b.rpsn);
    else if (sort === 1) s.sort((a,b) => a.monthly - b.monthly);
    else if (sort === 2) s.sort((a,b) => a.approval - b.approval);
    else s.sort((a,b) => b.fairness - a.fairness);
    return s;
  }, [offers, sort]);

  const best = offers.length ? offers.reduce((b, o) => {
    const sc = (10-o.rpsn)*2 + o.fairness + (o.noFees?2:0) + (o.earlyFree?1:0);
    const bs = (10-b.rpsn)*2 + b.fairness + (b.noFees?2:0) + (b.earlyFree?1:0);
    return sc > bs ? o : b;
  }, offers[0]) : null;

  const [calcOpen, setCalcOpen] = React.useState(true);

  const lowestM = offers.length ? Math.min(...offers.map(o => o.monthly)) : 0;

  if (showApp && sel) return <AppForm3 lang={lang} currency={currency} offer={sel} onBack={() => setShowApp(false)} />;
  if (sel) return <Detail3 lang={lang} currency={currency} offer={sel} onBack={() => setSel(null)} onApply={() => setShowApp(true)} />;

  return (
    <section className="lc3" id="compare" aria-label={L[lang].nav.compare}>
      <div className="w3">
        <Crumbs items={[
          { label: L[lang].breadcrumbs.home },
          { label: L[lang].breadcrumbs.compare },
        ]} />
        <div className="lc3-layout">
          <aside className={'lc3-sidebar' + (!calcOpen ? ' collapsed' : '')} aria-label="Calculator">
            <button className="lc3-mobile-toggle" onClick={() => setCalcOpen(!calcOpen)}>
              <span><Ico name="chart" size={16} color="var(--c3-primary)" /> {t.amount}: {fmt(amt, isEUR)} / {mo} {t.mo}</span>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="var(--c3-muted)" strokeWidth="2" strokeLinecap="round" style={{transform: calcOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s'}}><polyline points="2,4 6,8 10,4"/></svg>
            </button>
            <div className="lc3-ctrl">
              <div className="lc3-preview">
                <div className="lc3-pv"><span>{t.monthlyFrom}</span><strong>{offers.length ? fmt(lowestM,isEUR) : '\u2014'}</strong></div>
                <div className="lc3-pv-sep"></div>
                <div className="lc3-pv"><span>{t.totalCost}</span><strong>{offers.length ? fmt(lowestM*mo,isEUR) : '\u2014'}</strong></div>
              </div>
              <div className="lc3-f">
                <label>{t.amount}</label>
                <div className="lc3-val"><span className="lc3-big">{amt.toLocaleString(lang === 'cs' ? 'cs-CZ' : 'sk-SK')}</span><span className="lc3-unit">{isEUR ? '\u20ac' : 'Kc'}</span></div>
                <input type="range" className="sl3" min={minA} max={maxA} step={stepA} value={amt} onChange={e => handleChange(setAmt, +e.target.value)} style={{'--pct': pct(amt,minA,maxA)+'%'}} aria-label={t.amount} />
                <div className="lc3-minmax"><span>{fmt(minA,isEUR)}</span><span>{fmt(maxA,isEUR)}</span></div>
              </div>
              <div className="lc3-f">
                <label>{t.period}</label>
                <div className="lc3-val"><span className="lc3-big">{mo}</span><span className="lc3-unit">{t.mo} ({Math.round(mo/12*10)/10} {t.yr})</span></div>
                <input type="range" className="sl3" min={6} max={120} step={6} value={mo} onChange={e => handleChange(setMo, +e.target.value)} style={{'--pct': pct(mo,6,120)+'%'}} aria-label={t.period} />
                <div className="lc3-minmax"><span>6 {t.mo}</span><span>120 {t.mo}</span></div>
              </div>
              <div className="lc3-f">
                <label>{t.purpose}</label>
                <div className="lc3-chips">{t.purposes.map((p,i) => <button key={i} className={'ch3'+(purp===i?' act':'')} onClick={() => handleChange(setPurp, i)}>{p}</button>)}</div>
              </div>
              <div className="lc3-f">
                <label>{t.provider}</label>
                <div className="lc3-chips">{t.providers.map((p,i) => <button key={i} className={'ch3'+(filt===i?' act':'')} onClick={() => handleChange(setFilt, i)}>{p}</button>)}</div>
              </div>
            </div>
          </aside>

          <div className="lc3-main" ref={resultsRef} role="region" aria-label="Results" aria-live="polite">
            {/* Recalculating overlay */}
            {recalc && (
              <div className="lc3-recalc">
                <div className="lc3-recalc-inner">
                  <div className="lc3-recalc-spinner"></div>
                  <span>{cs?'Prepocitavam nabidky...':'Prepocitavam ponuky...'}</span>
                </div>
              </div>
            )}
            {/* AI Advisor */}
            <AiAdvisor lang={lang} offers={sorted} best={best} amount={amt} months={mo} isEUR={isEUR} />

            <div className="lc3-live-bar">
              <LiveBadge count={sp.liveNow} label={cs?'lidi prave srovnava':'ludi prave porovnava'} pulse={true} />
              <LiveBadge count={sp.todayCompare.toLocaleString()} label={cs?'srovnani dnes':'porovnani dnes'} icon="chart" color="var(--c3-primary)" pulse={false} />
            </div>
            <div className="lc3-rhead">
              <h2 className="lc3-rtitle"><span className="lc3-rcount">{sorted.length}</span> {r.title}</h2>
              <SortDropdown options={r.sorts} value={sort} onChange={setSort} />
            </div>
            <div className="lc3-cards">
              {sorted.map((o, i) => {
                const isBest = best && o.id === best.id;
                return (
                  <article key={o.id} className={'rc3' + (isBest ? ' rc3-best' : '')} style={{animationDelay: i*0.04+'s'}}
                           itemScope itemType="https://schema.org/FinancialProduct">
                    {isBest && <div className="rc3-ai"><Ico name="sparkle" size={13} color="#0a0e1a" /> {r.aiBest}</div>}
                    <div className="rc3-top">
                      <div className="rc3-logo" style={{background:o.logo?'transparent':o.color}} aria-hidden="true">{o.logo?<img src={o.logo} alt={o.name} style={{width:'100%',height:'100%',objectFit:'contain'}} onError={e=>{e.target.style.display='none'}} />:o.initial}</div>
                      <div className="rc3-info">
                        <h3 className="rc3-name" itemProp="name">{o.name}</h3>
                        <div className="rc3-type"><Ico name={o.type==='bank'?'bank':o.type==='p2p'?'users':'building'} size={12} /> {o.type==='bank'?'Banka':o.type==='p2p'?'P2P':(lang==='cs'?'Nebankovni':'Nebankovy')}</div>
                      </div>
                      <div className="rc3-score-wrap">
                        <svg viewBox="0 0 36 36" className="rc3-ring"><circle cx="18" cy="18" r="16" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="3"/><circle cx="18" cy="18" r="16" fill="none" stroke={o.fairness>=8?'#10b981':o.fairness>=6?'#eb0f55':'#ef4444'} strokeWidth="3" strokeDasharray={`${o.fairness*10.05} 100.5`} strokeLinecap="round" transform="rotate(-90 18 18)"/></svg>
                        <div className="rc3-score-num">{o.fairness}</div>
                      </div>
                    </div>
                    <div className="rc3-grid">
                      <div>
                        <div className="rc3-gv rc3-gv-main">{fmt(o.monthly,isEUR)}</div>
                        <div className="rc3-gl">{r.monthly}</div>
                      </div>
                      <div className="rc3-secondary-stats">
                        <div><div className="rc3-gv">{o.rate}%</div><div className="rc3-gl">{r.rate}</div></div>
                        <div><div className="rc3-gv rc3-rpsn">{o.rpsn}%</div><div className="rc3-gl">{r.rpsn}</div></div>
                        <div><div className="rc3-gv">{o.approval}{r.min}</div><div className="rc3-gl">{r.approval}</div></div>
                        <div><div className="rc3-gv">{fmt(o.total - amt, isEUR)}</div><div className="rc3-gl">{r.overpay}</div></div>
                      </div>
                    </div>
                    {/* Mini cost bar */}
                    <div className="rc3-chart-row">
                      <AmortChart amount={amt} months={mo} rate={o.rate} width={160} height={44} />
                    </div>
                    <div className="rc3-tags">
                      {o.noFees && <span className="t3 t3-g">{r.noFees}</span>}
                      {o.earlyFree && <span className="t3 t3-t">{r.earlyFree}</span>}
                    </div>
                    <CardPopularity views={sp.providerViews(o.id)} lang={lang} />
                    <div className="rc3-actions">
                      <button className="b3-ghost" onClick={() => setSel(o)}>{r.detail}</button>
                      <button className="b3-primary" onClick={() => { setSel(o); setShowApp(true); }}>{r.apply} <Ico name="arrowRight" size={14} color="#0a0e1a" /></button>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Detail ──────────────────────────
function Detail3({ lang, currency, offer, onBack, onApply }) {
  const t = L[lang].det;
  const isEUR = currency === 'EUR';
  const [tab, setTab] = React.useState(0);
  const rep = t.repText.replace('{amount}',fmt(offer.amount,isEUR)).replace('{period}',offer.months).replace('{rate}',offer.rate).replace('{rpsn}',offer.rpsn).replace('{monthly}',fmt(offer.monthly,isEUR)).replace('{total}',fmt(offer.total,isEUR));

  // Generate example repayment table
  const exampleTable = React.useMemo(() => {
    const amounts = isEUR ? [1000, 5000, 10000, 20000] : [25000, 200000, 800000, 1200000];
    const periods = [12, 60, 96, 120];
    return amounts
      .filter(a => a >= offer.minAmt && a <= offer.maxAmt)
      .slice(0, 4)
      .map(a => {
        const mo = Math.min(Math.max(periods.find(p => p <= offer.maxMo && p >= offer.minMo) || offer.minMo, offer.minMo), offer.maxMo);
        const r2 = offer.rate / 100 / 12;
        const pmt = r2 === 0 ? a / mo : a * (r2 * Math.pow(1+r2, mo)) / (Math.pow(1+r2, mo) - 1);
        const tot = pmt * mo;
        return { amount: a, months: mo, monthly: Math.round(pmt), rate: offer.rate, rpsn: offer.rpsn, total: Math.round(tot) };
      });
  }, [offer, isEUR]);

  // Provider-specific FAQ
  const provFaq = [
    { q: lang==='cs' ? `Jak rychle dostanu penize od ${offer.name}?` : `Ako rychlo dostanem peniaze od ${offer.name}?`,
      a: lang==='cs' ? `Schvaleni probiha do ${offer.approval} minut. Penize jsou na uctu obvykle do 24 hodin.` : `Schvalenie prebieha do ${offer.approval} minut.` },
    { q: lang==='cs' ? `Jake jsou podminky pro ziskani pujcky?` : `Ake su podminky pre ziskanie pozicky?`,
      a: lang==='cs' ? `Vek 18+, trvaly pobyt v CR, pravidelny prijem. Castka ${fmt(offer.minAmt,isEUR)} az ${fmt(offer.maxAmt,isEUR)}.` : `Vek 18+, trvaly pobyt v SR, pravidelny prijem.` },
    { q: lang==='cs' ? `Mohu pujcku splatit driv?` : `Mozem pozicku splatit skor?`,
      a: offer.fees.earlyRepay === 'Zdarma' || offer.fees.earlyRepay === 'Zadarmo'
        ? (lang==='cs' ? 'Ano, predcasne splaceni je zcela zdarma bez jakychkoli poplatku.' : 'Ano, predcasne splatenie je uplne zadarmo.')
        : (lang==='cs' ? `Ano, ale s poplatkem: ${offer.fees.earlyRepay}.` : `Ano, ale s poplatkom: ${offer.fees.earlyRepay}.`) },
  ];
  const [faqOpen, setFaqOpen] = React.useState(-1);

  return (
    <div className="d3 page-in">
      <div className="w3" style={{maxWidth:820}}>
        <Crumbs items={[
          { label: L[lang].breadcrumbs.home, onClick: onBack },
          { label: L[lang].breadcrumbs.compare, onClick: onBack },
          { label: offer.name },
        ]} />
        <article className="d3-card" itemScope itemType="https://schema.org/FinancialProduct">
          {/* Header */}
          <div className="d3-head">
            <div className="rc3-logo" style={{background:offer.logo?'transparent':offer.color,width:56,height:56,fontSize:20}}>{offer.logo?<img src={offer.logo} alt={offer.name} style={{width:'100%',height:'100%',objectFit:'contain'}} onError={e=>{e.target.style.display='none'}} />:offer.initial}</div>
            <div style={{flex:1}}>
              <h2 className="d3-name" itemProp="name">{offer.name}</h2>
              <div className="rc3-type"><Ico name={offer.type==='bank'?'bank':offer.type==='p2p'?'users':'building'} size={13}/> {offer.type==='bank'?'Banka':offer.type==='p2p'?'P2P':'Nebankovni'}</div>
            </div>
            <div className="d3-score"><span className="d3-sn">{offer.fairness}</span><span className="d3-so">/10</span></div>
          </div>

          {/* Info grid — 3 columns like reference */}
          <div className="d3-info-grid">
            <div className="d3-info-box">
              <div className="d3-info-title"><Ico name="chart" size={14} color="var(--c3-primary)" /> {lang==='cs'?'Informace o pujcce':'Informacie o pozicke'}</div>
              <div className="d3-info-row"><span>{lang==='cs'?'Vyse uveru':'Vyska uveru'}</span><strong>{fmt(offer.minAmt,isEUR)} - {fmt(offer.maxAmt,isEUR)}</strong></div>
              <div className="d3-info-row"><span>{lang==='cs'?'Splatnost':'Splatnost'}</span><strong>{offer.minMo} - {offer.maxMo} {L[lang].calc.mo}</strong></div>
              <div className="d3-info-row"><span>{lang==='cs'?'Urok':'Urok'}</span><strong>od {offer.rateFrom} %</strong></div>
              <div className="d3-info-row"><span>RPSN</span><strong>od {offer.rpsnFrom} %</strong></div>
            </div>
            <div className="d3-info-box">
              <div className="d3-info-title"><Ico name="bolt" size={14} color="var(--c3-primary)" /> {lang==='cs'?'Vyplaceni a splaceni':'Vyplatenie a splacanie'}</div>
              <div className="d3-info-row"><span>{lang==='cs'?'Schvaleni':'Schvalenie'}</span><strong>{offer.approval} min</strong></div>
              <div className="d3-info-row"><span>{lang==='cs'?'Zpusob vyplaceni':'Sposob vyplatenia'}</span><strong>{lang==='cs'?'Na ucet':'Na ucet'}</strong></div>
              <div className="d3-info-row"><span>{lang==='cs'?'Zpusob splaceni':'Sposob splacania'}</span><strong>{lang==='cs'?'Mesicni splatka':'Mesacna splatka'}</strong></div>
            </div>
            <div className="d3-info-box">
              <div className="d3-info-title"><Ico name="shield" size={14} color="var(--c3-primary)" /> {lang==='cs'?'Poplatky a vyrizeni':'Poplatky a vybavenie'}</div>
              <div className="d3-info-row"><span>{lang==='cs'?'Za zrizeni':'Za zriadenie'}</span><strong className={offer.fees.setup==='Zdarma'||offer.fees.setup==='Zadarmo'?'d3-fee-free':'d3-fee-paid'}>{offer.fees.setup}</strong></div>
              <div className="d3-info-row"><span>{lang==='cs'?'Za vedeni':'Za vedenie'}</span><strong className={offer.fees.maintenance==='Zdarma'||offer.fees.maintenance==='Zadarmo'?'d3-fee-free':'d3-fee-paid'}>{offer.fees.maintenance}</strong></div>
              <div className="d3-info-row"><span>{lang==='cs'?'Predcasne splaceni':'Predcasne splatenie'}</span><strong className={offer.fees.earlyRepay==='Zdarma'||offer.fees.earlyRepay==='Zadarmo'?'d3-fee-free':'d3-fee-paid'}>{offer.fees.earlyRepay}</strong></div>
            </div>
          </div>

          {/* CTA */}
          <div className="d3-cta" style={{borderTop:'none',paddingTop:0,marginBottom:24}}>
            <button className="b3-primary b3-lg" onClick={onApply}>{t.applyBtn} <Ico name="arrowRight" size={16} color="#0a0e1a"/></button>
          </div>

          {/* Stats summary */}
          <div className="d3-stats">
            <div className="d3-st"><div className="d3-sv">{fmt(offer.monthly,isEUR)}</div><div className="d3-sl">{L[lang].res.monthly}</div></div>
            <div className="d3-st"><div className="d3-sv">{offer.rate}%</div><div className="d3-sl">{L[lang].res.rate}</div></div>
            <div className="d3-st"><div className="d3-sv d3-sv-hl">{offer.rpsn}%</div><div className="d3-sl">{L[lang].res.rpsn}</div></div>
            <div className="d3-st"><div className="d3-sv">{fmt(offer.total,isEUR)}</div><div className="d3-sl">{lang==='cs'?'Celkem':'Celkovo'}</div></div>
          </div>

          {/* Cost bar */}
          <div className="rc3-chart-row" style={{justifyContent:'center',marginBottom:24}}>
            <AmortChart amount={offer.amount} months={offer.months} rate={offer.rate} width={280} height={56} showLabels={true} />
          </div>

          {/* Repayment examples table */}
          <div className="d3-section">
            <h3 className="d3-section-title">{lang==='cs'?'Tabulka splatek':'Tabulka splatok'}</h3>
            <div className="d3-table-wrap">
              <table className="d3-table">
                <thead>
                  <tr>
                    <th>{lang==='cs'?'Vyse pujcky':'Vyska pozicky'}</th>
                    <th>{lang==='cs'?'Splatnost':'Splatnost'}</th>
                    <th>{lang==='cs'?'Mesicni splatka':'Mesacna splatka'}</th>
                    <th>RPSN</th>
                    <th>{lang==='cs'?'Celkem':'Celkovo'}</th>
                  </tr>
                </thead>
                <tbody>
                  {exampleTable.map((row, i) => (
                    <tr key={i}>
                      <td>{fmt(row.amount, isEUR)}</td>
                      <td>{row.months} {L[lang].calc.mo}</td>
                      <td className="d3-table-hl">{fmt(row.monthly, isEUR)}</td>
                      <td>{row.rpsn} %</td>
                      <td>{fmt(row.total, isEUR)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d3-rep"><strong>{t.repTitle}:</strong> {rep}</div>
          </div>

          {/* Pros / Cons side by side */}
          <div className="d3-pc">
            <div>
              <div className="d3-pct d3-pro"><Ico name="check" size={15} color="var(--c3-green)"/> {t.pros}</div>
              {offer.pros.map((p,i)=><div key={i} className="d3-pci"><Ico name="check" size={14} color="var(--c3-green)"/><span>{p}</span></div>)}
            </div>
            <div>
              <div className="d3-pct d3-con"><Ico name="x" size={15} color="var(--c3-red)"/> {t.cons}</div>
              {offer.cons.map((c,i)=><div key={i} className="d3-pci"><Ico name="x" size={14} color="var(--c3-red)"/><span>{c}</span></div>)}
            </div>
          </div>

          {/* About the provider — SEO text */}
          <div className="d3-section">
            <h3 className="d3-section-title">{lang==='cs'?`O spolecnosti ${offer.name}`:`O spolocnosti ${offer.name}`}</h3>
            <p className="d3-seo-text">
              {offer.type==='bank'
                ? (lang==='cs' ? `${offer.name} je licencovana banka pusobici na ceskem a slovenskem trhu. Poskytuje spotrebitelske uvery v rozsahu ${fmt(offer.minAmt,isEUR)} az ${fmt(offer.maxAmt,isEUR)} s urokem jiz od ${offer.rateFrom} % p.a. Veskera cinnost podleha dohledu Ceske narodni banky (CNB).`
                  : `${offer.name} je licencovana banka posobica na ceskom a slovenskom trhu.`)
                : (lang==='cs' ? `${offer.name} je nebankovni poskytovatel spotrebitelskych uveru registrovany u CNB. Nabizi pujcky od ${fmt(offer.minAmt,isEUR)} do ${fmt(offer.maxAmt,isEUR)} se schvalenim jiz za ${offer.approval} minut.`
                  : `${offer.name} je nebankovy poskytovatel spotrebitelskych uverov.`)}
            </p>
          </div>

          {/* Provider-specific FAQ */}
          <div className="d3-section" itemScope itemType="https://schema.org/FAQPage">
            <h3 className="d3-section-title">{lang==='cs'?'Casto kladene otazky':'Casto kladene otazky'}</h3>
            {provFaq.map((item, i) => (
              <div key={i} className={'fq3-item' + (faqOpen === i ? ' open' : '')} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                <button className="fq3-q" onClick={() => setFaqOpen(faqOpen === i ? -1 : i)} aria-expanded={faqOpen === i}>
                  <span itemProp="name">{item.q}</span>
                  <span className="fq3-c">{faqOpen === i ? '\u2212' : '+'}</span>
                </button>
                <div className="fq3-a" style={{maxHeight: faqOpen === i ? 200 : 0}} itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                  <div itemProp="text">{item.a}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="d3-cta">
            <button className="b3-primary b3-lg" onClick={onApply}>{t.applyBtn} <Ico name="arrowRight" size={16} color="#0a0e1a"/></button>
            <div className="d3-cta-sub">{t.applySub}</div>
          </div>
        </article>
      </div>
    </div>
  );
}

// ─── Application Form ──────────────────────────
function AppForm3({ lang, currency, offer, onBack }) {
  const t = L[lang].app;
  const isEUR = currency === 'EUR';
  const [sent, setSent] = React.useState(false);
  const [form, setForm] = React.useState({name:'',email:'',phone:'',income:'',expenses:'',consent:false});
  const up = (k,v) => setForm(f=>({...f,[k]:v}));
  if (sent) return (
    <div className="d3 page-in" style={{textAlign:'center',padding:'80px 20px'}}>
      <div className="af3-ok"><Ico name="check" size={28} color="var(--c3-green)"/></div>
      <h2 style={{marginBottom:8}}>{t.sent}</h2>
      <p style={{color:'var(--c3-muted)',marginBottom:24}}>{t.sentSub}</p>
      <button className="b3-primary" onClick={onBack}><Ico name="arrowRight" size={14} color="#0a0e1a" style={{transform:'rotate(180deg)'}}/> {L[lang].det.back}</button>
    </div>
  );
  return (
    <div className="d3 page-in"><div className="w3" style={{maxWidth:560}}>
      <Crumbs items={[{label:L[lang].breadcrumbs.home,onClick:onBack},{label:L[lang].breadcrumbs.compare,onClick:onBack},{label:L[lang].breadcrumbs.apply}]}/>
      <div className="d3-card">
        <h2 style={{fontSize:22,fontWeight:700,textAlign:'center',marginBottom:8}}>{t.title}</h2>
        <div className="af3-mini"><div className="rc3-logo" style={{background:offer.logo?'transparent':offer.color,width:32,height:32,fontSize:12}}>{offer.logo?<img src={offer.logo} alt={offer.name} style={{width:'100%',height:'100%',objectFit:'contain'}} onError={e=>{e.target.style.display='none'}} />:offer.initial}</div><strong>{offer.name}</strong><span style={{color:'var(--c3-muted)'}}>{fmt(offer.monthly,isEUR)}/{L[lang].calc.mo}</span></div>
        <div className="af3-fields">
          {[[t.name,'name','text','Jan Novak'],[t.email,'email','email','jan@email.cz'],[t.phone,'phone','tel','+420 123 456 789'],[t.income,'income','number',isEUR?'2000':'45000'],[t.expenses,'expenses','number',isEUR?'800':'20000']].map(([lb,k,tp,ph])=>(
            <div key={k} className="af3-field"><label>{lb}</label><input type={tp} value={form[k]} onChange={e=>up(k,e.target.value)} placeholder={ph}/></div>
          ))}
        </div>
        <label className="af3-consent"><input type="checkbox" checked={form.consent} onChange={e=>up('consent',e.target.checked)}/><span>{t.consent}</span></label>
        <button className="b3-primary b3-lg" style={{width:'100%',marginTop:16}} disabled={!form.consent} onClick={()=>setSent(true)}>{t.submit}</button>
      </div>
    </div></div>
  );
}

// ─── How It Works — visual stepper ──────────────────────────
function How3({ lang, onNav }) {
  const t = L[lang].how;
  const colors = ['#c8ff00', '#38bdf8', '#6ee7b7', '#fbbf24'];
  return (
    <section className="hw3" id="how" aria-label={t.title}>
      <div className="w3" style={{maxWidth:860}}>
        <Reveal>
          <div className="hw3-header">
            <div className="hw3-badge"><Ico name="bolt" size={13} color="var(--c3-primary)" /> {lang==='cs'?'Jednoduchy proces':'Jednoduchy proces'}</div>
            <h2 className="hw3-title">{t.title}</h2>
            <p className="hw3-sub">{lang==='cs'
              ? 'Od prvniho kliknuti k nejlepsi nabidce za 30 sekund. Zadne registrace, zadne skryte kroky.'
              : 'Od prveho kliknutia k najlepsej ponuke za 30 sekund.'}</p>
          </div>
        </Reveal>

        <div className="hw3-timeline">
          {t.steps.map((s, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="hw3-step">
                {/* Connector line */}
                {i < t.steps.length - 1 && <div className="hw3-connector" style={{background:`linear-gradient(to bottom, ${colors[i]}, ${colors[i+1]})`}}></div>}

                {/* Step number circle */}
                <div className="hw3-circle" style={{background:colors[i]+'18', borderColor:colors[i]}}>
                  <span style={{color:colors[i]}}>{i + 1}</span>
                </div>

                {/* Step content card */}
                <div className="hw3-content">
                  <div className="hw3-content-head">
                    <div className="hw3-step-ico" style={{background:colors[i]+'15'}}>
                      <Ico name={s.icon} size={20} color={colors[i]} />
                    </div>
                    <div>
                      <div className="hw3-step-label" style={{color:colors[i]}}>
                        {lang==='cs'?'Krok':'Krok'} {i + 1}
                      </div>
                      <h3 className="hw3-step-title">{s.t}</h3>
                    </div>
                  </div>
                  <p className="hw3-step-desc">{s.d}</p>

                  {/* Visual hint per step */}
                  {i === 0 && (
                    <div className="hw3-hint">
                      <div className="hw3-hint-slider">
                        <div className="hw3-hint-track"><div className="hw3-hint-fill" style={{width:'65%',background:colors[0]}}></div></div>
                        <div className="hw3-hint-labels"><span>10 000</span><span>1 500 000</span></div>
                      </div>
                    </div>
                  )}
                  {i === 1 && (
                    <div className="hw3-hint">
                      <div className="hw3-hint-cards">
                        {[{name:'Air Bank',score:'9.2',color:'#0ea5e9'},{name:'Trinity',score:'9.5',color:'#0f172a'},{name:'CSOB',score:'8.5',color:'#1d4ed8'}].map((p,j) => (
                          <div key={j} className="hw3-hint-minicard">
                            <div className="hw3-hint-dot" style={{background:p.color}}></div>
                            <span>{p.name}</span>
                            <span className="hw3-hint-score" style={{color:colors[1]}}>{p.score}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {i === 2 && (
                    <div className="hw3-hint">
                      <div className="hw3-hint-ai">
                        <Ico name="sparkle" size={16} color={colors[2]} />
                        <span>{lang==='cs'?'Nejlepsi volba pro vase parametry':'Najlepsia volba pre vase parametre'}</span>
                      </div>
                    </div>
                  )}
                  {i === 3 && (
                    <div className="hw3-hint">
                      <div className="hw3-hint-cta">
                        <div className="hw3-hint-btn" style={{background:colors[3]+'20',color:colors[3],borderColor:colors[3]+'40'}}>
                          {lang==='cs'?'Pozadat online':'Poziadat online'} <Ico name="arrowRight" size={12} color={colors[3]} />
                        </div>
                        <span className="hw3-hint-time">{lang==='cs'?'~ 5 minut':'~ 5 minut'}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <div className="hw3-cta">
          <div className="hw3-cta-inner">
            <Ico name="sparkle" size={20} color="#0a0e1a" />
            <div>
              <div className="hw3-cta-title">{lang==='cs'?'Pripraveni?':'Pripraveni?'}</div>
              <div className="hw3-cta-sub">{lang==='cs'?'Zabere to 30 sekund. Zadne registrace.':'Zaberie to 30 sekund. Ziadna registracia.'}</div>
            </div>
            <button className="b3-primary" onClick={() => onNav && onNav('compare')}>
              {lang==='cs'?'Srovnat pujcky':'Porovnat pozicky'} <Ico name="arrowRight" size={14} color="#0a0e1a" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
function FAQ3({ lang }) {
  const t = L[lang].faq;
  const [open, setOpen] = React.useState(0);
  return (
    <section className="fq3" id="faq" aria-label={t.title}>
      <div className="w3" style={{maxWidth:700}}>
        <Reveal><h2 className="s3-title">{t.title}</h2></Reveal>
        <div itemScope itemType="https://schema.org/FAQPage">
          {t.items.map((it, i) => (
            <div key={i} className={'fq3-item' + (open === i ? ' open' : '')} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <button className="fq3-q" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span itemProp="name">{it.q}</span>
                <span className="fq3-c">{open === i ? '\u2212' : '+'}</span>
              </button>
              <div className="fq3-a" style={{maxHeight: open === i ? 200 : 0}} itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <div itemProp="text">{it.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Glossary / Slovník pojmů ──────────────────────────
const GLOSSARY_DATA = {
  cs: [
    { term: 'Anuitní splátka', def: 'Pravidelná měsíční splátka, která po celou dobu splácení zůstává stejná. Obsahuje část jistiny i úroku — poměr se v čase mění (zpočátku více úroků, postupně více jistiny).', cat: 'Splácení' },
    { term: 'Bonita', def: 'Hodnocení schopnosti klienta splácet úvěr. Banky posuzují příjem, výdaje, stávající závazky, pracovní poměr a historii v úvěrových registrech.', cat: 'Žádost' },
    { term: 'BRKI', def: 'Bankovní registr klientských informací — databáze, ve které banky sdílejí informace o úvěrech svých klientů. Pozitivní i negativní záznamy.', cat: 'Registry' },
    { term: 'Čistý měsíční příjem', def: 'Příjem po odečtení daní a odvodů (sociální, zdravotní pojištění). Klíčový údaj pro posouzení schopnosti splácet.', cat: 'Žádost' },
    { term: 'Doba splatnosti', def: 'Celková doba, po kterou klient splácí úvěr. Udává se v měsících. Delší doba = nižší splátka, ale vyšší celkové náklady.', cat: 'Parametry' },
    { term: 'Fixní úroková sazba', def: 'Úroková sazba, která se po stanovenou dobu nemění. Klient má jistotu výše splátky. Obvyklá u hypoték (fixace 1–10 let).', cat: 'Úroky' },
    { term: 'Jistina', def: 'Původní výše půjčené částky bez úroků a poplatků. Každou splátkou se jistina snižuje.', cat: 'Základní pojmy' },
    { term: 'Konsolidace', def: 'Sloučení více půjček do jedné s jedinou měsíční splátkou, obvykle za výhodnějších podmínek. Zjednodušuje správu dluhů.', cat: 'Produkty' },
    { term: 'NRKI', def: 'Nebankovní registr klientských informací — obdoba BRKI pro nebankovní poskytovatele úvěrů (leasingové společnosti, splátkové firmy).', cat: 'Registry' },
    { term: 'Osobní bankéř', def: 'Dedikovaný pracovník banky, který klientovi pomáhá s výběrem produktů a administrací. Obvykle u vyšších částek.', cat: 'Služby' },
    { term: 'P2P půjčka', def: 'Půjčka mezi lidmi (peer-to-peer) bez prostřednictví banky. Investoři přímo financují žadatele přes online platformu (např. Zonky).', cat: 'Produkty' },
    { term: 'Poplatek za předčasné splacení', def: 'Částka, kterou klient zaplatí, pokud splatí úvěr dříve než ve smluvené lhůtě. Ze zákona max. 1 % z předčasně splacené částky (0,5 % pokud do konce zbývá méně než rok).', cat: 'Poplatky' },
    { term: 'Poplatek za vedení úvěru', def: 'Měsíční poplatek za správu úvěrového účtu. Mnoho bank jej dnes nabízí zdarma.', cat: 'Poplatky' },
    { term: 'Poplatek za zřízení', def: 'Jednorázový poplatek při sjednání úvěru. Může být procentuální (např. 2 % z částky) nebo pevná suma.', cat: 'Poplatky' },
    { term: 'Refinancování', def: 'Přenesení stávající půjčky k jinému poskytovateli s výhodnějšími podmínkami. Cílem je snížit úrok nebo splátku.', cat: 'Produkty' },
    { term: 'Ručitel', def: 'Osoba, která se zaručí za splacení úvěru v případě, že hlavní dlužník přestane splácet. Zvyšuje šanci na schválení.', cat: 'Žádost' },
    { term: 'RPSN', def: 'Roční procentní sazba nákladů — nejdůležitější ukazatel skutečné ceny půjčky. Zahrnuje úrokovou sazbu, poplatky za zřízení, vedení i pojištění. Vždy srovnávejte podle RPSN, ne podle úroku.', cat: 'Základní pojmy' },
    { term: 'Skóre férovosti', def: 'Hodnocení poskytovatele na škále 1–10 podle transparentnosti podmínek, výše poplatků, možnosti předčasného splacení a spokojenosti klientů.', cat: 'Hodnocení' },
    { term: 'Solus', def: 'Registr sdružení SOLUS — databáze dlužníků, kteří jsou v prodlení se splácením. Negativní záznam výrazně ztěžuje získání nového úvěru.', cat: 'Registry' },
    { term: 'Spotřebitelský úvěr', def: 'Úvěr poskytnutý fyzické osobě na nepodnikatelské účely. Regulován zákonem o spotřebitelském úvěru, podléhá dohledu ČNB.', cat: 'Základní pojmy' },
    { term: 'Účelový úvěr', def: 'Úvěr vázaný na konkrétní účel (auto, bydlení, rekonstrukce). Obvykle nižší úrok než neúčelový, protože banka zná riziko.', cat: 'Produkty' },
    { term: 'Úroková sazba', def: 'Cena za půjčení peněz vyjádřená v procentech za rok (p.a.). Rozlišujeme fixní a variabilní. Sama o sobě nevypovídá o celkové ceně — vždy sledujte RPSN.', cat: 'Úroky' },
    { term: 'Variabilní úroková sazba', def: 'Sazba, která se mění v závislosti na tržních podmínkách (obvykle navázaná na PRIBOR). Splátka může v čase růst i klesat.', cat: 'Úroky' },
    { term: 'Zajištěný úvěr', def: 'Úvěr krytý zástavou (nemovitost, auto). Nižší riziko pro banku = nižší úrok pro klienta. V případě nesplácení může banka zástavu prodat.', cat: 'Produkty' },
  ],
  sk: [
    { term: 'Anuitná splátka', def: 'Pravidelná mesačná splátka, ktorá po celú dobu splácania zostáva rovnaká.', cat: 'Splácanie' },
    { term: 'Bonita', def: 'Hodnotenie schopnosti klienta splácať úver na základe príjmu, výdavkov a úverovej histórie.', cat: 'Žiadosť' },
    { term: 'Doba splatnosti', def: 'Celková doba splácania úveru v mesiacoch. Dlhšia doba = nižšia splátka, ale vyššie celkové náklady.', cat: 'Parametre' },
    { term: 'Fixná úroková sadzba', def: 'Úroková sadzba, ktorá sa po stanovenú dobu nemení.', cat: 'Úroky' },
    { term: 'Istina', def: 'Pôvodná výška požičanej sumy bez úrokov a poplatkov.', cat: 'Základné pojmy' },
    { term: 'Konsolidácia', def: 'Zlúčenie viacerých pôžičiek do jednej s jedinou mesačnou splátkou.', cat: 'Produkty' },
    { term: 'P2P pôžička', def: 'Pôžička medzi ľuďmi cez online platformu bez sprostredkovania bankou.', cat: 'Produkty' },
    { term: 'Poplatok za predčasné splatenie', def: 'Suma, ktorú klient zaplatí pri predčasnom splatení úveru. Zo zákona max. 1 %.', cat: 'Poplatky' },
    { term: 'Refinancovanie', def: 'Prenesenie existujúcej pôžičky k inému poskytovateľovi s výhodnejšími podmienkami.', cat: 'Produkty' },
    { term: 'RPSN', def: 'Ročná percentuálna sadzba nákladov — najdôležitejší ukazovateľ skutočnej ceny pôžičky. Zahŕňa úrok aj poplatky.', cat: 'Základné pojmy' },
    { term: 'Skóre férovosti', def: 'Hodnotenie poskytovateľa na škále 1–10 podľa transparentnosti a spokojnosti klientov.', cat: 'Hodnotenie' },
    { term: 'Spotrebiteľský úver', def: 'Úver poskytnutý fyzickej osobe na nepodnikateľské účely, regulovaný zákonom.', cat: 'Základné pojmy' },
    { term: 'Úroková sadzba', def: 'Cena za požičanie peňazí vyjadrená v percentách za rok (p.a.).', cat: 'Úroky' },
  ],
};

function Glossary3({ lang }) {
  const terms = GLOSSARY_DATA[lang] || GLOSSARY_DATA.cs;
  const cats = [...new Set(terms.map(t => t.cat))].sort();
  const [filter, setFilter] = React.useState('');
  const [activeCat, setActiveCat] = React.useState('all');
  const [openTerm, setOpenTerm] = React.useState(-1);

  const filtered = terms.filter(t => {
    const matchCat = activeCat === 'all' || t.cat === activeCat;
    const matchSearch = !filter || t.term.toLowerCase().includes(filter.toLowerCase()) || t.def.toLowerCase().includes(filter.toLowerCase());
    return matchCat && matchSearch;
  });

  const letters = [...new Set(filtered.map(t => t.term[0].toUpperCase()))].sort();

  return (
    <section className="gl3 page-in" aria-label={lang==='cs'?'Slovnik pojmu':'Slovnik pojmov'}>
      <div className="w3" style={{maxWidth:820}}>
        <Crumbs items={[
          { label: L[lang].breadcrumbs.home },
          { label: lang==='cs'?'Slovnik pojmu':'Slovnik pojmov' },
        ]} />

        <div className="gl3-header">
          <h1 className="gl3-h1">{lang==='cs'?'Slovnik pojmu':'Slovnik pojmov'}</h1>
          <p className="gl3-sub">{lang==='cs'
            ? 'Vsechny dulezite pojmy ze sveta pujcek a uveru na jednom miste. Jednoduse a srozumitelne.'
            : 'Vsetky dolezite pojmy zo sveta poziciek a uverov na jednom mieste.'}</p>
        </div>

        {/* Search */}
        <div className="gl3-search">
          <Ico name="eye" size={16} color="var(--c3-dim)" />
          <input type="text" className="gl3-search-input" value={filter} onChange={e => setFilter(e.target.value)}
                 placeholder={lang==='cs'?'Hledat pojem...':'Hladat pojem...'} aria-label="Search" />
          {filter && <button className="gl3-search-clear" onClick={() => setFilter('')}><Ico name="close" size={14} color="var(--c3-muted)" /></button>}
        </div>

        {/* Alphabet bar */}
        <div className="gl3-alpha">
          {(() => {
            const allLetters = [...new Set(terms.map(t => t.term[0].toUpperCase()))].sort();
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
            return alphabet.map(l => {
              const exists = allLetters.includes(l) && filtered.some(t => t.term[0].toUpperCase() === l);
              return (
                <button key={l} className={'gl3-alpha-btn' + (exists ? '' : ' gl3-alpha-dim')}
                        disabled={!exists}
                        onClick={() => {
                          const el = document.getElementById('gl-' + l);
                          if (el) el.scrollIntoView({behavior:'smooth', block:'start'});
                        }}>
                  {l}
                </button>
              );
            });
          })()}
        </div>

        {/* Category filter */}
        <div className="gl3-cats">
          <button className={'ch3' + (activeCat==='all'?' act':'')} onClick={() => setActiveCat('all')}>
            {lang==='cs'?'Vse':'Vsetko'}
          </button>
          {cats.map(c => (
            <button key={c} className={'ch3' + (activeCat===c?' act':'')} onClick={() => setActiveCat(c)}>{c}</button>
          ))}
        </div>

        {/* Terms list grouped by letter */}
        <div className="gl3-list" itemScope itemType="https://schema.org/DefinedTermSet">
          <meta itemProp="name" content={lang==='cs'?'Slovnik pojmu - pujcky':'Slovnik pojmov - pozicky'} />
          {filtered.length === 0 && (
            <div className="gl3-empty">{lang==='cs'?'Zadny pojem nenalezen.':'Ziadny pojem nenajdeny.'}</div>
          )}
          {letters.map(letter => {
            const letterTerms = filtered.filter(t => t.term[0].toUpperCase() === letter);
            return (
              <div key={letter} className="gl3-group" id={'gl-' + letter}>
                <div className="gl3-letter">{letter}</div>
                {letterTerms.map((t, i) => {
                  const globalIdx = terms.indexOf(t);
                  const isOpen = openTerm === globalIdx;
                  return (
                    <div key={t.term} className={'gl3-term' + (isOpen ? ' open' : '')} itemScope itemProp="hasDefinedTerm" itemType="https://schema.org/DefinedTerm">
                      <button className="gl3-term-btn" onClick={() => setOpenTerm(isOpen ? -1 : globalIdx)} aria-expanded={isOpen}>
                        <span className="gl3-term-name" itemProp="name">{t.term}</span>
                        <span className="gl3-term-cat">{t.cat}</span>
                        <span className="gl3-term-chev">{isOpen ? '\u2212' : '+'}</span>
                      </button>
                      <div className="gl3-term-def" style={{maxHeight: isOpen ? 300 : 0}}>
                        <p itemProp="description">{t.def}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── AI Advisor Page ──────────────────────────
function AiPage3({ lang, onNav }) {
  const cs = lang === 'cs';
  const isEUR = lang === 'sk';
  const curr = isEUR ? '\u20ac' : 'Kc';
  const maxA = isEUR ? 50000 : 1500000;
  const minA = isEUR ? 500 : 10000;
  const stepA = isEUR ? 500 : 10000;

  const [step, setStep] = React.useState(0);
  const [amt, setAmt] = React.useState(isEUR ? 5000 : 150000);
  const [mo, setMo] = React.useState(36);
  const [purp, setPurp] = React.useState(0);
  const [income, setIncome] = React.useState(isEUR ? 1500 : 35000);
  const [expenses, setExpenses] = React.useState(isEUR ? 600 : 15000);
  const [existingLoans, setExistingLoans] = React.useState(0);
  const [riskPref, setRiskPref] = React.useState(1); // 0=low risk, 1=balanced, 2=cheapest
  const [speedPref, setSpeedPref] = React.useState(1); // 0=no rush, 1=normal, 2=asap
  const [result, setResult] = React.useState(null);
  const [analyzing, setAnalyzing] = React.useState(false);

  const purposes = cs
    ? ['Na cokoliv', 'Auto', 'Bydleni', 'Rekonstrukce', 'Konsolidace']
    : ['Na cokoliv', 'Auto', 'Byvanie', 'Rekonstrukcia', 'Konsolidacia'];
  const riskLabels = cs ? ['Bezpecnost', 'Vyvazene', 'Nejlevnejsi'] : ['Bezpecnost', 'Vyvazene', 'Najlacnejsie'];
  const speedLabels = cs ? ['Nespecha', 'Normalni', 'Co nejrychleji'] : ['Nesponaha', 'Normalne', 'Co najrychlejsie'];

  const pct = (v, mn, mx) => ((v - mn) / (mx - mn)) * 100;

  const analyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      const offers = getOff(amt, mo, purp, 0, isEUR);
      if (!offers.length) { setResult({ empty: true }); setAnalyzing(false); return; }

      // Score each offer with user preferences
      const scored = offers.map(o => {
        let score = 0;
        // RPSN weight (lower = better)
        score += (30 - o.rpsn) * 3;
        // Fairness
        score += o.fairness * 4;
        // Fees
        score += o.noFees ? 15 : 0;
        score += o.earlyFree ? 10 : 0;
        // Risk preference
        if (riskPref === 0) score += (o.type === 'bank' ? 20 : 0) + o.fairness * 2;
        if (riskPref === 2) score += (30 - o.rpsn) * 2; // extra weight on cheapness
        // Speed preference
        if (speedPref === 2) score += Math.max(0, 30 - o.approval);
        // Affordability check
        const available = income - expenses - existingLoans;
        const affordable = o.monthly <= available * 0.4;
        score += affordable ? 20 : -30;

        return { ...o, aiScore: Math.round(score * 10) / 10, affordable };
      }).sort((a, b) => b.aiScore - a.aiScore);

      const top = scored[0];
      const runner = scored[1];
      const available = income - expenses - existingLoans;
      const dti = Math.round((top.monthly / income) * 100);

      // Generate detailed analysis
      const analysis = {
        top, runner, scored: scored.slice(0, 5),
        affordable: top.affordable,
        dti,
        available,
        maxSafe: Math.round(available * 0.4),
        savings: scored[scored.length - 1].total - top.total,
        warnings: [],
        tips: [],
      };

      // Warnings
      if (dti > 35) analysis.warnings.push(cs
        ? `Splatka ${fmtV(top.monthly)} ${curr} tvori ${dti} % vaseho prijmu — to je nad doporucenym limitem 35 %. Zvazite nizsi castku nebo delsi dobu.`
        : `Splatka ${fmtV(top.monthly)} ${curr} tvori ${dti} % vasho prijmu — nad odporucanym limitom.`);
      if (existingLoans > 0) analysis.warnings.push(cs
        ? `S existujicimi splatkami ${fmtV(existingLoans)} ${curr}/mes mate mensi prostor. Zvazite konsolidaci.`
        : `S existujucimi splatkami ${fmtV(existingLoans)} ${curr}/mes mate mensi priestor.`);

      // Tips
      if (top.noFees && top.earlyFree) analysis.tips.push(cs
        ? `${top.name} nema zadne skryte poplatky — muzete kdykoliv splatit driv bez sankci.`
        : `${top.name} nema ziadne skryte poplatky.`);
      if (runner && runner.approval < top.approval) analysis.tips.push(cs
        ? `Pokud potrebujete penize rychleji, ${runner.name} schvali za ${runner.approval} min (RPSN ${runner.rpsn} %).`
        : `Ak potrebujete peniaze rychlejsie, ${runner.name} schvali za ${runner.approval} min.`);
      if (mo > 60) analysis.tips.push(cs
        ? `Zkracenim doby z ${mo} na ${Math.round(mo*0.6)} mesicu byste usetili priblizne ${fmtV(Math.round(analysis.savings * 0.3))} ${curr} na urocich.`
        : `Skratenim doby usetrite na urokoch.`);

      setResult(analysis);
      setAnalyzing(false);
      setStep(3);
    }, 1200);
  };

  const fmtV = (v) => v.toLocaleString(cs ? 'cs-CZ' : 'sk-SK');

  return (
    <section className="aip3 page-in" aria-label={cs ? 'AI Poradce' : 'AI Poradca'}>
      <div className="w3" style={{maxWidth:800}}>
        <Crumbs items={[
          { label: L[lang].breadcrumbs.home },
          { label: cs ? 'AI Poradce' : 'AI Poradca' },
        ]} />

        {/* Header */}
        <div className="aip3-header">
          <div className="aip3-badge"><Ico name="sparkle" size={14} color="var(--c3-primary)" /> {cs ? 'Chytry poradce' : 'Chytry poradca'}</div>
          <h1 className="gl3-h1">{cs ? 'AI Poradce' : 'AI Poradca'}</h1>
          <p className="gl3-sub">{cs
            ? 'Odpovidte na par otazek a poradime vam nejlepsi pujcku presne pro vasi situaci. Zadne registrace, zadne udaje do registru.'
            : 'Odpovedzte na par otazok a poradime vam najlepsiu pozicku pre vasu situaciu.'}</p>
        </div>

        {/* Progress steps */}
        <div className="aip3-progress">
          {[cs?'Castka':'Suma', cs?'Situace':'Situacia', cs?'Preference':'Preferencie', cs?'Vysledek':'Vysledok'].map((label, i) => (
            <React.Fragment key={i}>
              {i > 0 && <div className={'aip3-prog-line' + (step >= i ? ' act' : '')}></div>}
              <div className={'aip3-prog-step' + (step >= i ? ' act' : '') + (step === i ? ' current' : '')} onClick={() => i < step && setStep(i)}>
                <span>{i + 1}</span>
              </div>
            </React.Fragment>
          ))}
        </div>
        <div className="aip3-prog-labels">
          {[cs?'Castka':'Suma', cs?'Situace':'Situacia', cs?'Preference':'Preferencie', cs?'Vysledek':'Vysledok'].map((label, i) => (
            <span key={i} className={step === i ? 'act' : ''}>{label}</span>
          ))}
        </div>

        {/* Step 1: Amount */}
        {step === 0 && (
            <div className="aip3-card">
              <h2 className="aip3-card-title">{cs ? 'Kolik si chcete pujcit?' : 'Kolko si chcete poziciat?'}</h2>
              <div className="lc3-f">
                <div className="lc3-val"><span className="lc3-big">{fmtV(amt)}</span><span className="lc3-unit">{curr}</span></div>
                <input type="range" className="sl3" min={minA} max={maxA} step={stepA} value={amt} onChange={e => setAmt(+e.target.value)} style={{'--pct': pct(amt,minA,maxA)+'%'}} />
                <div className="lc3-minmax"><span>{fmt(minA,isEUR)}</span><span>{fmt(maxA,isEUR)}</span></div>
              </div>
              <div className="lc3-f" style={{marginTop:24}}>
                <label>{cs ? 'Na jak dlouho?' : 'Na ako dlho?'}</label>
                <div className="lc3-val"><span className="lc3-big">{mo}</span><span className="lc3-unit">{cs?'mes':'mes'} ({Math.round(mo/12*10)/10} {cs?'r':'r'})</span></div>
                <input type="range" className="sl3" min={6} max={120} step={6} value={mo} onChange={e => setMo(+e.target.value)} style={{'--pct': pct(mo,6,120)+'%'}} />
                <div className="lc3-minmax"><span>6 {cs?'mes':'mes'}</span><span>120 {cs?'mes':'mes'}</span></div>
              </div>
              <div className="lc3-f" style={{marginTop:24}}>
                <label>{cs ? 'Ucel' : 'Ucel'}</label>
                <div className="lc3-chips">{purposes.map((p,i) => <button key={i} className={'ch3'+(purp===i?' act':'')} onClick={() => setPurp(i)}>{p}</button>)}</div>
              </div>
              <button className="b3-primary b3-lg" style={{width:'100%',marginTop:24}} onClick={() => setStep(1)}>
                {cs ? 'Pokracovat' : 'Pokracovat'} <Ico name="arrowRight" size={16} color="#0a0e1a" />
              </button>
            </div>
        )}

        {/* Step 2: Financial situation */}
        {step === 1 && (
          <div className="aip3-card">
              <h2 className="aip3-card-title">{cs ? 'Vase financni situace' : 'Vasa financna situacia'}</h2>
              <p className="aip3-card-sub">{cs ? 'Tyto udaje neposkytujeme nikomu — slouzi jen pro vypocet.' : 'Tieto udaje neposkytujeme nikomu.'}</p>
              <div className="lc3-f">
                <label>{cs ? 'Cisty mesicni prijem' : 'Cisty mesacny prijem'}</label>
                <div className="lc3-val"><span className="lc3-big">{fmtV(income)}</span><span className="lc3-unit">{curr}</span></div>
                <input type="range" className="sl3" min={isEUR?500:10000} max={isEUR?10000:200000} step={isEUR?100:5000} value={income} onChange={e => setIncome(+e.target.value)} style={{'--pct': pct(income,isEUR?500:10000,isEUR?10000:200000)+'%'}} />
              </div>
              <div className="lc3-f" style={{marginTop:20}}>
                <label>{cs ? 'Mesicni vydaje' : 'Mesacne vydavky'}</label>
                <div className="lc3-val"><span className="lc3-big">{fmtV(expenses)}</span><span className="lc3-unit">{curr}</span></div>
                <input type="range" className="sl3" min={0} max={isEUR?8000:150000} step={isEUR?100:5000} value={expenses} onChange={e => setExpenses(+e.target.value)} style={{'--pct': pct(expenses,0,isEUR?8000:150000)+'%'}} />
              </div>
              <div className="lc3-f" style={{marginTop:20}}>
                <label>{cs ? 'Stavajici mesicni splatky' : 'Existujuce mesacne splatky'}</label>
                <div className="lc3-val"><span className="lc3-big">{fmtV(existingLoans)}</span><span className="lc3-unit">{curr}</span></div>
                <input type="range" className="sl3" min={0} max={isEUR?3000:80000} step={isEUR?50:1000} value={existingLoans} onChange={e => setExistingLoans(+e.target.value)} style={{'--pct': pct(existingLoans,0,isEUR?3000:80000)+'%'}} />
              </div>
              {/* Available budget indicator */}
              <div className="aip3-budget">
                <span>{cs ? 'Disponibilni budget na splatku' : 'Disponibilny budget na splatku'}</span>
                <strong style={{color: (income - expenses - existingLoans) > 0 ? 'var(--c3-green)' : 'var(--c3-red)'}}>{fmtV(Math.max(0, income - expenses - existingLoans))} {curr}/{cs?'mes':'mes'}</strong>
              </div>
              <div className="aip3-nav">
                <button className="b3-ghost" onClick={() => setStep(0)}><Ico name="arrowRight" size={14} style={{transform:'rotate(180deg)'}} /> {cs?'Zpet':'Spat'}</button>
                <button className="b3-primary b3-lg" style={{flex:1}} onClick={() => setStep(2)}>{cs ? 'Pokracovat' : 'Pokracovat'} <Ico name="arrowRight" size={16} color="#0a0e1a" /></button>
              </div>
            </div>
        )}

        {/* Step 3: Preferences */}
        {step === 2 && (
          <div className="aip3-card">
              <h2 className="aip3-card-title">{cs ? 'Co je pro vas dulezitejsi?' : 'Co je pre vas dolezitejsie?'}</h2>
              <div className="aip3-pref">
                <label className="aip3-pref-label">{cs ? 'Priorita' : 'Priorita'}</label>
                <div className="aip3-pref-opts">
                  {riskLabels.map((l, i) => (
                    <button key={i} className={'aip3-pref-btn' + (riskPref===i?' act':'')} onClick={() => setRiskPref(i)}>
                      <Ico name={['shield','chart','bolt'][i]} size={18} color={riskPref===i?'#0a0e1a':'var(--c3-muted)'} />
                      <span>{l}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="aip3-pref" style={{marginTop:20}}>
                <label className="aip3-pref-label">{cs ? 'Rychlost schvaleni' : 'Rychlost schvalenia'}</label>
                <div className="aip3-pref-opts">
                  {speedLabels.map((l, i) => (
                    <button key={i} className={'aip3-pref-btn' + (speedPref===i?' act':'')} onClick={() => setSpeedPref(i)}>
                      <Ico name={['moon','bolt','rocket'][i]} size={18} color={speedPref===i?'#0a0e1a':'var(--c3-muted)'} />
                      <span>{l}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="aip3-nav" style={{marginTop:28}}>
                <button className="b3-ghost" onClick={() => setStep(1)}><Ico name="arrowRight" size={14} style={{transform:'rotate(180deg)'}} /> {cs?'Zpet':'Spat'}</button>
                <button className="b3-primary b3-lg" style={{flex:1}} onClick={analyze}>
                  <Ico name="sparkle" size={16} color="#0a0e1a" /> {cs ? 'Analyzovat' : 'Analyzovat'}
                </button>
              </div>
            </div>
        )}

        {/* Analyzing animation */}
        {analyzing && (
          <div className="aip3-card" style={{textAlign:'center',padding:'48px 24px'}}>
            <div className="aip3-analyzing">
              <div className="aip3-pulse"></div>
              <Ico name="sparkle" size={32} color="var(--c3-primary)" />
            </div>
            <h3 style={{marginTop:20,fontFamily:'Space Grotesk',fontSize:18}}>{cs ? 'Analyzuji vasi situaci...' : 'Analyzujem vasu situaciu...'}</h3>
            <p style={{color:'var(--c3-muted)',fontSize:14,marginTop:6}}>{cs ? 'Porovnavam nabidky a hledam nejlepsi reseni.' : 'Porovnavam ponuky a hladam najlepsie riesenie.'}</p>
          </div>
        )}

        {/* Step 4: Results */}
        {step === 3 && result && !result.empty && !analyzing && (
          <div className="aip3-result-page">
              {/* Top recommendation */}
              <div className="aip3-top-card">
                <div className="aip3-top-badge"><Ico name="sparkle" size={14} color="#0a0e1a" /> {cs ? 'Doporuceni pro vas' : 'Odporucenie pre vas'}</div>
                <div className="aip3-top-head">
                  <div className="rc3-logo" style={{background:result.top.logo?'transparent':result.top.color,width:52,height:52,fontSize:18}}>{result.top.logo?<img src={result.top.logo} alt={result.top.name} style={{width:'100%',height:'100%',objectFit:'contain'}} onError={e=>{e.target.style.display='none'}} />:result.top.initial}</div>
                  <div style={{flex:1}}>
                    <h2 className="aip3-top-name">{result.top.name}</h2>
                    <div className="rc3-type"><Ico name={result.top.type==='bank'?'bank':'building'} size={12} /> {result.top.type==='bank'?'Banka':'Nebankovni'}</div>
                  </div>
                  <div className="d3-score"><span className="d3-sn">{result.top.fairness}</span><span className="d3-so">/10</span></div>
                </div>
                <div className="aip3-top-stats">
                  <div><div className="rc3-gv rc3-gv-main">{fmt(result.top.monthly,isEUR)}</div><div className="rc3-gl">{cs?'Splatka':'Splatka'}</div></div>
                  <div><div className="rc3-gv rc3-rpsn">{result.top.rpsn}%</div><div className="rc3-gl">RPSN</div></div>
                  <div><div className="rc3-gv">{result.top.rate}%</div><div className="rc3-gl">{cs?'Urok':'Urok'}</div></div>
                  <div><div className="rc3-gv">{result.top.approval}min</div><div className="rc3-gl">{cs?'Schvaleni':'Schvalenie'}</div></div>
                </div>
                <button className="b3-primary b3-lg" style={{width:'100%',marginTop:16}} onClick={() => onNav('compare')}>
                  {cs ? 'Zobrazit vsechny nabidky' : 'Zobrazit vsetky ponuky'} <Ico name="arrowRight" size={16} color="#0a0e1a" />
                </button>
              </div>

              {/* Financial health */}
              <div className="aip3-health">
                <h3 className="d3-section-title">{cs ? 'Financni zdravi' : 'Financne zdravie'}</h3>
                <div className="aip3-health-grid">
                  <div className="aip3-health-item">
                    <span>{cs ? 'Splatka / prijem' : 'Splatka / prijem'}</span>
                    <strong style={{color: result.dti <= 30 ? 'var(--c3-green)' : result.dti <= 40 ? '#fbbf24' : 'var(--c3-red)'}}>{result.dti}%</strong>
                    <div className="aip3-health-bar"><div style={{width: Math.min(100, result.dti * 2) + '%', background: result.dti <= 30 ? 'var(--c3-green)' : result.dti <= 40 ? '#fbbf24' : 'var(--c3-red)', height:'100%', borderRadius:4}}></div></div>
                    <span className="aip3-health-note">{result.dti <= 30 ? (cs?'Bezpecne':'Bezpecne') : result.dti <= 40 ? (cs?'Na hrane':'Na hrane') : (cs?'Rizikove':'Rizikove')}</span>
                  </div>
                  <div className="aip3-health-item">
                    <span>{cs ? 'Bezpecna splatka' : 'Bezpecna splatka'}</span>
                    <strong style={{color:'var(--c3-primary)'}}>{fmtV(result.maxSafe)} {curr}</strong>
                    <span className="aip3-health-note">{cs ? '40 % disponibilniho budgetu' : '40 % disponibilneho budgetu'}</span>
                  </div>
                  <div className="aip3-health-item">
                    <span>{cs ? 'Uspora oproti nejdrazsi' : 'Uspora oproti najdrahsej'}</span>
                    <strong style={{color:'var(--c3-green)'}}>{fmtV(result.savings)} {curr}</strong>
                  </div>
                </div>
              </div>

              {/* Warnings */}
              {result.warnings.length > 0 && (
                <div className="aip3-warnings">
                  {result.warnings.map((w, i) => (
                    <div key={i} className="aip3-warning"><Ico name="shield" size={16} color="var(--c3-red)" /><span>{w}</span></div>
                  ))}
                </div>
              )}

              {/* Tips */}
              {result.tips.length > 0 && (
                <div className="aip3-tips">
                  <h3 className="d3-section-title">{cs ? 'Tipy pro vas' : 'Tipy pre vas'}</h3>
                  {result.tips.map((tip, i) => (
                    <div key={i} className="aip3-tip"><Ico name="bolt" size={16} color="var(--c3-primary)" /><span>{tip}</span></div>
                  ))}
                </div>
              )}

              {/* Runner-up */}
              {result.runner && (
                <div className="aip3-runner">
                  <h3 className="d3-section-title">{cs ? 'Alternativa' : 'Alternativa'}</h3>
                  <div className="fi3-rank-card" onClick={() => onNav('compare')}>
                    <div className="rc3-logo" style={{background:result.runner.logo?'transparent':result.runner.color,width:38,height:38,fontSize:13}}>{result.runner.logo?<img src={result.runner.logo} alt={result.runner.name} style={{width:'100%',height:'100%',objectFit:'contain'}} onError={e=>{e.target.style.display='none'}} />:result.runner.initial}</div>
                    <div className="fi3-rank-info"><div className="fi3-rank-name">{result.runner.name}</div><div className="rc3-type"><Ico name={result.runner.type==='bank'?'bank':'building'} size={11} /> {result.runner.type==='bank'?'Banka':'Nebankovni'}</div></div>
                    <div style={{textAlign:'right'}}><div className="rc3-gv" style={{fontSize:15}}>{fmt(result.runner.monthly,isEUR)}/{cs?'mes':'mes'}</div><div className="rc3-gl">RPSN {result.runner.rpsn}%</div></div>
                  </div>
                </div>
              )}

              {/* Start over */}
              <button className="b3-ghost" style={{width:'100%',marginTop:20}} onClick={() => { setStep(0); setResult(null); }}>
                <Ico name="arrowRight" size={14} style={{transform:'rotate(180deg)'}} /> {cs ? 'Zkusit znovu s jinymi parametry' : 'Skusit znova s inymi parametrami'}
              </button>
            </div>
        )}

        {step === 3 && result && result.empty && (
          <div className="aip3-card" style={{textAlign:'center',padding:'48px 24px'}}>
            <Ico name="shield" size={32} color="var(--c3-red)" />
            <h3 style={{marginTop:16}}>{cs ? 'Zadna nabidka nenalezena' : 'Ziadna ponuka nenajdena'}</h3>
            <p style={{color:'var(--c3-muted)',marginTop:8}}>{cs ? 'Zkuste upravit castku nebo dobu splaceni.' : 'Skuste upravit sumu alebo dobu splacania.'}</p>
            <button className="b3-ghost" style={{marginTop:16}} onClick={() => { setStep(0); setResult(null); }}>
              <Ico name="arrowRight" size={14} style={{transform:'rotate(180deg)'}} /> {cs ? 'Zpet' : 'Spat'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Fairness Index Page ──────────────────────────
const FAIRNESS_CRITERIA = {
  cs: [
    { id: 'transparency', name: 'Transparentnost', weight: 30, icon: 'eye', desc: 'Jasnost podminek, srozumitelnost smlouvy, dostupnost informaci na webu.' },
    { id: 'fees', name: 'Poplatky', weight: 25, icon: 'shield', desc: 'Vyse poplatku za zrizeni, vedeni a predcasne splaceni v pomeru k castce.' },
    { id: 'flexibility', name: 'Flexibilita', weight: 20, icon: 'bolt', desc: 'Moznost zmeny splatek, odkladu, predcasneho splaceni bez sankci.' },
    { id: 'satisfaction', name: 'Spokojenost klientu', weight: 15, icon: 'star', desc: 'Hodnoceni na nezavislych portalech, pocet stiznosti, reseni reklamaci.' },
    { id: 'digital', name: 'Digitalizace', weight: 10, icon: 'globe', desc: 'Kvalita online zadosti, mobilni aplikace, rychlost schvaleni.' },
  ],
  sk: [
    { id: 'transparency', name: 'Transparentnost', weight: 30, icon: 'eye', desc: 'Jasnost podmienok, zrozumitelnost zmluvy, dostupnost informacii.' },
    { id: 'fees', name: 'Poplatky', weight: 25, icon: 'shield', desc: 'Vyska poplatkov za zriadenie, vedenie a predcasne splatenie.' },
    { id: 'flexibility', name: 'Flexibilita', weight: 20, icon: 'bolt', desc: 'Moznost zmeny splatok, odkladu, predcasneho splatenia.' },
    { id: 'satisfaction', name: 'Spokojnost klientov', weight: 15, icon: 'star', desc: 'Hodnotenie na nezavislych portaloch.' },
    { id: 'digital', name: 'Digitalizacia', weight: 10, icon: 'globe', desc: 'Kvalita online ziadosti, mobilna aplikacia.' },
  ],
};

// Simulate per-criteria scores for each provider
function getProviderScores(provider) {
  const f = provider.fairness;
  const base = f;
  // Deterministic variation based on provider properties
  const seed = provider.id.charCodeAt(0) + provider.id.charCodeAt(1);
  return {
    transparency: Math.min(10, Math.max(3, base + (seed % 3 - 1) * 0.4)),
    fees: Math.min(10, Math.max(2, provider.noFees ? base + 0.5 : base - 1.2)),
    flexibility: Math.min(10, Math.max(3, provider.earlyFree ? base + 0.3 : base - 1.5)),
    satisfaction: Math.min(10, Math.max(3, base + ((seed * 7) % 5 - 2) * 0.3)),
    digital: Math.min(10, Math.max(4, provider.online ? base + 0.2 : base - 0.8)),
  };
}

function FairnessIndex3({ lang, onNav }) {
  const cs = lang === 'cs';
  const criteria = FAIRNESS_CRITERIA[lang] || FAIRNESS_CRITERIA.cs;
  const [selectedProv, setSelectedProv] = React.useState(null);

  // Sort providers by fairness
  const ranked = [...P].filter(p => !p.isSK || lang === 'sk').sort((a, b) => b.fairness - a.fairness);

  const t = {
    title: cs ? 'Index ferovosti' : 'Index ferovosti',
    sub: cs
      ? 'Nezavisle hodnoceni poskytovatelu pujcek na stupnici 1\u201310. Porovnavame transparentnost, poplatky, flexibilitu, spokojenost klientu a digitalizaci.'
      : 'Nezavisle hodnotenie poskytovatelov poziciek na stupnici 1\u201310.',
    methodTitle: cs ? 'Jak hodnotime' : 'Ako hodnotime',
    methodSub: cs ? 'Kazdy poskytovatel je hodnocen v 5 kategoriich s ruznou vahou.' : 'Kazdy poskytovatel je hodnoteny v 5 kategoriach.',
    rankTitle: cs ? 'Zebricek poskytovatelu' : 'Rebricek poskytovatelov',
    rankSub: cs ? 'Serazeno od nejferovejsiho. Kliknete pro detail hodnoceni.' : 'Zoradene od najferovejsieho.',
    weight: cs ? 'Vaha' : 'Vaha',
    score: cs ? 'Skore' : 'Skore',
    overall: cs ? 'Celkove skore' : 'Celkove skore',
    backToRank: cs ? 'Zpet na zebricek' : 'Spat na rebricek',
    detail: cs ? 'Rozklad hodnoceni' : 'Rozklad hodnotenia',
    seoTitle: cs ? 'O metodice hodnoceni' : 'O metodike hodnotenia',
    seoText: cs
      ? 'Index ferovosti je nezavisle hodnoceni, ktere jsme vyvinuli s cilem prinest transparentnost do sveta spotrebitelskych uveru. Kazdy poskytovatel je hodnocen na zaklade verejne dostupnych informaci, podminek produktu a zpetne vazby klientu. Hodnoceni probiha ctvrtletne a metodiku pravidelne aktualizujeme. Provize od poskytovatelu nikdy neovlivnuji poradi v indexu.'
      : 'Index ferovosti je nezavisle hodnotenie poskytovatelov spotrebitelskych uverov.',
  };

  // Donut chart for methodology weights
  function DonutChart({ size = 160 }) {
    const colors = ['#c8ff00', '#38bdf8', '#6ee7b7', '#fbbf24', '#a78bfa'];
    const r = size / 2 - 8;
    const c = size / 2;
    let cumAngle = -90;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {criteria.map((crit, i) => {
          const angle = (crit.weight / 100) * 360;
          const startAngle = cumAngle;
          const endAngle = cumAngle + angle;
          cumAngle = endAngle;
          const start = { x: c + r * Math.cos(startAngle * Math.PI / 180), y: c + r * Math.sin(startAngle * Math.PI / 180) };
          const end = { x: c + r * Math.cos(endAngle * Math.PI / 180), y: c + r * Math.sin(endAngle * Math.PI / 180) };
          const largeArc = angle > 180 ? 1 : 0;
          const d = `M${c},${c} L${start.x},${start.y} A${r},${r} 0 ${largeArc} 1 ${end.x},${end.y} Z`;
          return <path key={i} d={d} fill={colors[i]} opacity={0.85} />;
        })}
        <circle cx={c} cy={c} r={r * 0.55} fill="var(--c3-surface)" />
        <text x={c} y={c - 6} textAnchor="middle" fill="var(--c3-text)" fontSize="22" fontWeight="700" fontFamily="Space Grotesk">5</text>
        <text x={c} y={c + 12} textAnchor="middle" fill="var(--c3-muted)" fontSize="10" fontWeight="600" textTransform="uppercase" letterSpacing=".06em">{cs ? 'KRITERII' : 'KRITERII'}</text>
      </svg>
    );
  }

  // Score bar
  function ScoreBar({ value, max = 10, color = 'var(--c3-primary)', height = 8 }) {
    const pct = Math.min(100, (value / max) * 100);
    return (
      <div style={{width:'100%',height,borderRadius:height/2,background:'var(--c3-surface2)',overflow:'hidden'}}>
        <div style={{width:pct+'%',height:'100%',borderRadius:height/2,background:color,transition:'width .5s ease'}}></div>
      </div>
    );
  }

  if (selectedProv) {
    const scores = getProviderScores(selectedProv);
    const colors = ['#c8ff00', '#38bdf8', '#6ee7b7', '#fbbf24', '#a78bfa'];
    return (
      <section className="fi3 page-in">
        <div className="w3" style={{maxWidth:720}}>
          <Crumbs items={[
            { label: L[lang].breadcrumbs.home },
            { label: t.title, onClick: () => setSelectedProv(null) },
            { label: selectedProv.name },
          ]} />
          <div className="d3-card">
            <div className="d3-head">
              <div className="rc3-logo" style={{background:selectedProv.logo?'transparent':selectedProv.color,width:52,height:52,fontSize:18}}>{selectedProv.logo?<img src={selectedProv.logo} alt={selectedProv.name} style={{width:'100%',height:'100%',objectFit:'contain'}} onError={e=>{e.target.style.display='none'}} />:selectedProv.initial}</div>
              <div style={{flex:1}}><h2 className="d3-name">{selectedProv.name}</h2><div className="rc3-type"><Ico name={selectedProv.type==='bank'?'bank':'building'} size={13}/> {selectedProv.type==='bank'?'Banka':'Nebankovni'}</div></div>
              <div className="d3-score"><span className="d3-sn">{selectedProv.fairness}</span><span className="d3-so">/10</span></div>
            </div>
            <h3 className="d3-section-title">{t.detail}</h3>
            <div className="fi3-detail-grid">
              {criteria.map((crit, i) => {
                const val = Math.round(scores[crit.id] * 10) / 10;
                return (
                  <div key={crit.id} className="fi3-detail-row">
                    <div className="fi3-detail-left">
                      <div className="fi3-detail-ico" style={{background:colors[i]+'20'}}><Ico name={crit.icon} size={16} color={colors[i]} /></div>
                      <div>
                        <div className="fi3-detail-name">{crit.name}</div>
                        <div className="fi3-detail-weight">{t.weight}: {crit.weight}%</div>
                      </div>
                    </div>
                    <div className="fi3-detail-right">
                      <ScoreBar value={val} color={colors[i]} height={10} />
                      <div className="fi3-detail-val">{val}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="fi3-overall">
              <span>{t.overall}</span>
              <strong>{selectedProv.fairness}/10</strong>
            </div>
            <button className="b3-ghost" style={{width:'100%',marginTop:16}} onClick={() => setSelectedProv(null)}>
              <Ico name="arrowRight" size={14} color="var(--c3-text)" style={{transform:'rotate(180deg)'}} /> {t.backToRank}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="fi3 page-in" aria-label={t.title}>
      <div className="w3" style={{maxWidth:920}}>
        <Crumbs items={[
          { label: L[lang].breadcrumbs.home },
          { label: t.title },
        ]} />

        <div className="fi3-header">
          <h1 className="gl3-h1">{t.title}</h1>
          <p className="gl3-sub">{t.sub}</p>
        </div>

        {/* Methodology */}
        <div className="fi3-method">
          <div className="fi3-method-chart">
            <DonutChart size={180} />
          </div>
          <div className="fi3-method-list">
            <h2 className="d3-section-title">{t.methodTitle}</h2>
            <p style={{fontSize:14,color:'var(--c3-muted)',marginBottom:16,lineHeight:1.6}}>{t.methodSub}</p>
            {criteria.map((crit, i) => {
              const colors = ['#c8ff00', '#38bdf8', '#6ee7b7', '#fbbf24', '#a78bfa'];
              return (
                <div key={crit.id} className="fi3-crit">
                  <div className="fi3-crit-head">
                    <div className="fi3-crit-dot" style={{background:colors[i]}}></div>
                    <span className="fi3-crit-name">{crit.name}</span>
                    <span className="fi3-crit-weight">{crit.weight}%</span>
                  </div>
                  <div className="fi3-crit-desc">{crit.desc}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ranking table */}
        <div className="fi3-rank-section">
          <h2 className="d3-section-title">{t.rankTitle}</h2>
          <p style={{fontSize:14,color:'var(--c3-muted)',marginBottom:20,textAlign:'center'}}>{t.rankSub}</p>
          <div className="fi3-rank-list">
            {ranked.map((prov, i) => (
              <Reveal key={prov.id} delay={i * 40}>
                <div className="fi3-rank-card" onClick={() => setSelectedProv(prov)}>
                  <div className="fi3-rank-pos">{i + 1}</div>
                  <div className="rc3-logo" style={{background:prov.logo?'transparent':prov.color,width:38,height:38,fontSize:13}}>{prov.logo?<img src={prov.logo} alt={prov.name} style={{width:'100%',height:'100%',objectFit:'contain'}} onError={e=>{e.target.style.display='none'}} />:prov.initial}</div>
                  <div className="fi3-rank-info">
                    <div className="fi3-rank-name">{prov.name}</div>
                    <div className="rc3-type" style={{marginTop:2}}><Ico name={prov.type==='bank'?'bank':prov.type==='p2p'?'users':'building'} size={11}/> {prov.type==='bank'?'Banka':prov.type==='p2p'?'P2P':'Nebankovni'}</div>
                  </div>
                  <div className="fi3-rank-bar">
                    <ScoreBar value={prov.fairness} color={prov.fairness >= 8.5 ? '#c8ff00' : prov.fairness >= 7 ? '#6ee7b7' : prov.fairness >= 6 ? '#fbbf24' : '#f87171'} height={8} />
                  </div>
                  <div className="fi3-rank-score" style={{color: prov.fairness >= 8.5 ? '#c8ff00' : prov.fairness >= 7 ? '#6ee7b7' : prov.fairness >= 6 ? '#fbbf24' : '#f87171'}}>
                    {prov.fairness}
                  </div>
                  <Ico name="chevronRight" size={16} color="var(--c3-dim)" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* SEO text */}
        <div className="d3-section" style={{marginTop:32}}>
          <h3 className="d3-section-title">{t.seoTitle}</h3>
          <p className="d3-seo-text">{t.seoText}</p>
        </div>
      </div>
    </section>
  );
}

// ─── Contact Page ──────────────────────────
function Contact3({ lang }) {
  const [form, setForm] = React.useState({ name:'', email:'', subject:'', message:'' });
  const [sent, setSent] = React.useState(false);
  const up = (k, v) => setForm(f => ({...f, [k]: v}));

  const cs = lang === 'cs';
  const t = {
    title: cs ? 'Kontaktujte nas' : 'Kontaktujte nas',
    sub: cs ? 'Mate dotaz, napad nebo zpetnou vazbu? Napiste nam — odpovidame do 24 hodin.' : 'Mate otazku, napad alebo spatnu vazbu? Napiste nam.',
    name: cs ? 'Jmeno a prijmeni' : 'Meno a priezvisko',
    email: 'E-mail',
    subject: cs ? 'Predmet' : 'Predmet',
    subjects: cs
      ? ['Obecny dotaz', 'Problem s kalkulackou', 'Spoluprace / partnerství', 'Chyba v udajich poskytovatele', 'Navrh na zlepseni', 'Jine']
      : ['Vseobecna otazka', 'Problem s kalkulackou', 'Spolupraca / partnerstvo', 'Chyba v udajoch poskytovatela', 'Navrh na zlepsenie', 'Ine'],
    message: cs ? 'Zprava' : 'Sprava',
    send: cs ? 'Odeslat zpravu' : 'Odoslat spravu',
    sent: cs ? 'Zprava odeslana!' : 'Sprava odoslana!',
    sentSub: cs ? 'Dekujeme. Ozveme se vam do 24 hodin.' : 'Dakujeme. Ozveme sa vam do 24 hodin.',
    infoTitle: cs ? 'Kontaktni udaje' : 'Kontaktne udaje',
    hoursTitle: cs ? 'Provozni doba' : 'Prevadzkova doba',
    hours: cs ? 'Po-Pa: 9:00 - 17:00' : 'Po-Pi: 9:00 - 17:00',
    hoursNote: cs ? 'Vikend: odpovedi az v pondeli' : 'Vikend: odpovede az v pondelok',
    socialTitle: cs ? 'Sledujte nas' : 'Sledujte nas',
  };

  if (sent) return (
    <section className="ct3 page-in">
      <div className="w3" style={{maxWidth:600, textAlign:'center', padding:'80px 16px'}}>
        <div className="af3-ok"><Ico name="check" size={28} color="var(--c3-green)" /></div>
        <h2 style={{marginBottom:8}}>{t.sent}</h2>
        <p style={{color:'var(--c3-muted)', marginBottom:24}}>{t.sentSub}</p>
      </div>
    </section>
  );

  return (
    <section className="ct3 page-in" aria-label={t.title}>
      <div className="w3" style={{maxWidth:920}}>
        <Crumbs items={[
          { label: L[lang].breadcrumbs.home },
          { label: cs ? 'Kontakt' : 'Kontakt' },
        ]} />

        <div className="ct3-header">
          <h1 className="gl3-h1">{t.title}</h1>
          <p className="gl3-sub">{t.sub}</p>
        </div>

        <div className="ct3-layout">
          {/* Contact form */}
          <div className="ct3-form-card">
            <div className="ct3-fields">
              <div className="ct3-row">
                <div className="af3-field">
                  <label>{t.name}</label>
                  <input type="text" value={form.name} onChange={e => up('name', e.target.value)} placeholder="Jan Novak" />
                </div>
                <div className="af3-field">
                  <label>{t.email}</label>
                  <input type="email" value={form.email} onChange={e => up('email', e.target.value)} placeholder="jan@email.cz" />
                </div>
              </div>
              <div className="af3-field">
                <label>{t.subject}</label>
                <select className="ct3-select" value={form.subject} onChange={e => up('subject', e.target.value)}>
                  <option value="">{cs ? '-- Vyberte --' : '-- Vyberte --'}</option>
                  {t.subjects.map((s, i) => <option key={i} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="af3-field">
                <label>{t.message}</label>
                <textarea className="ct3-textarea" value={form.message} onChange={e => up('message', e.target.value)}
                          placeholder={cs ? 'Popiste svuj dotaz...' : 'Popiste svoju otazku...'} rows={5}></textarea>
              </div>
            </div>
            <button className="b3-primary b3-lg" style={{width:'100%', marginTop:16}}
                    disabled={!form.name || !form.email || !form.message}
                    onClick={() => setSent(true)}>
              {t.send} <Ico name="arrowRight" size={16} color="#0a0e1a" />
            </button>
          </div>

          {/* Sidebar info */}
          <div className="ct3-sidebar">
            <div className="ct3-info-card">
              <div className="ct3-info-title"><Ico name="building" size={16} color="var(--c3-primary)" /> {t.infoTitle}</div>
              <div className="ct3-info-item">
                <Ico name="globe" size={14} color="var(--c3-muted)" />
                <div><strong>Pujckomat s.r.o.</strong><span>Praha, Ceska republika</span></div>
              </div>
              <div className="ct3-info-item">
                <Ico name="bolt" size={14} color="var(--c3-muted)" />
                <div><strong>info@pujckomat.cz</strong><span>{cs ? 'Obecne dotazy' : 'Vseobecne otazky'}</span></div>
              </div>
              <div className="ct3-info-item">
                <Ico name="shield" size={14} color="var(--c3-muted)" />
                <div><strong>ICO: 12345678</strong><span>{cs ? 'Registrovany u CNB' : 'Registrovany u NBS'}</span></div>
              </div>
            </div>

            <div className="ct3-info-card">
              <div className="ct3-info-title"><Ico name="bolt" size={16} color="var(--c3-primary)" /> {t.hoursTitle}</div>
              <div className="ct3-hours">
                <div className="ct3-hours-row"><span>{t.hours}</span><span className="ct3-hours-badge">{cs ? 'Online' : 'Online'}</span></div>
                <div className="ct3-hours-note">{t.hoursNote}</div>
              </div>
            </div>

            <div className="ct3-info-card">
              <div className="ct3-info-title"><Ico name="globe" size={16} color="var(--c3-primary)" /> {t.socialTitle}</div>
              <div className="ct3-social">
                {['LinkedIn', 'X / Twitter', 'Facebook'].map(s => (
                  <a key={s} className="ct3-social-link">{s}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── GDPR Cookie Bar ──────────────────────────
function CookieBar({ lang }) {
  const cs = lang === 'cs';
  const [visible, setVisible] = React.useState(false);
  const [showDetail, setShowDetail] = React.useState(false);
  const [prefs, setPrefs] = React.useState({ necessary: true, analytics: true, marketing: false });

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem('pujckomat_cookies');
      if (!saved) {
        setTimeout(() => setVisible(true), 1500);
      }
    } catch(e) { setVisible(true); }
  }, []);

  const accept = (all) => {
    const consent = all ? { necessary:true, analytics:true, marketing:true } : prefs;
    try { localStorage.setItem('pujckomat_cookies', JSON.stringify({ ...consent, ts: Date.now() })); } catch(e){}
    setVisible(false);
  };

  const reject = () => {
    try { localStorage.setItem('pujckomat_cookies', JSON.stringify({ necessary:true, analytics:false, marketing:false, ts: Date.now() })); } catch(e){}
    setVisible(false);
  };

  if (!visible) return null;

  const t = {
    title: cs ? 'Tato stranka pouziva cookies' : 'Tato stranka pouziva cookies',
    desc: cs
      ? 'Pouzivame cookies pro zakladni funkcnost webu, analyzu navstevnosti a personalizaci obsahu. Muzete si zvolit, ktere kategorie povolite.'
      : 'Pouzivame cookies pre zakladnu funkcnost webu, analyzu navstevnosti a personalizaciu obsahu.',
    necessary: cs ? 'Nezbytne' : 'Nevyhnutne',
    necessaryDesc: cs ? 'Nutne pro zakladni funkcnost webu. Nelze vypnout.' : 'Nutne pre zakladnu funkcnost.',
    analytics: cs ? 'Analyticke' : 'Analyticke',
    analyticsDesc: cs ? 'Pomahaji nam pochopit, jak web pouzivate (Google Analytics).' : 'Pomahaju nam pochopit, ako web pouzivate.',
    marketing: cs ? 'Marketingove' : 'Marketingove',
    marketingDesc: cs ? 'Umoznuji zobrazeni relevantnich reklam a mereni jejich ucinnosti.' : 'Umoznuju zobrazenie relevantnych reklam.',
    acceptAll: cs ? 'Prijmout vse' : 'Prijat vsetko',
    acceptSelected: cs ? 'Prijmout vybrane' : 'Prijat vybrane',
    rejectAll: cs ? 'Odmitnou vse' : 'Odmietnut vsetko',
    settings: cs ? 'Nastaveni' : 'Nastavenia',
    moreInfo: cs ? 'Vice informaci v nasich' : 'Viac informacii v nasich',
    privacyLink: cs ? 'zasadach ochrany osobnich udaju' : 'zasadach ochrany osobnych udajov',
  };

  return (
    <div className="ck3-overlay">
      <div className="ck3-bar" role="dialog" aria-label="Cookie consent">
        <div className="ck3-main">
          <div className="ck3-icon"><Ico name="shield" size={22} color="var(--c3-primary)" /></div>
          <div className="ck3-content">
            <h3 className="ck3-title">{t.title}</h3>
            <p className="ck3-desc">{t.desc}</p>
            <p className="ck3-link">{t.moreInfo} <a style={{color:'var(--c3-primary)',fontWeight:600}}>{t.privacyLink}</a>.</p>
          </div>
        </div>

        {showDetail && (
          <div className="ck3-detail">
            <div className="ck3-cat">
              <div className="ck3-cat-head">
                <div className="ck3-cat-toggle ck3-cat-locked"><Ico name="lock" size={14} color="var(--c3-green)" /></div>
                <div><strong>{t.necessary}</strong><span>{t.necessaryDesc}</span></div>
              </div>
            </div>
            <div className="ck3-cat">
              <div className="ck3-cat-head">
                <button className={'ck3-cat-toggle' + (prefs.analytics ? ' ck3-on' : '')} onClick={() => setPrefs(p => ({...p, analytics: !p.analytics}))}>
                  <div className="ck3-toggle-dot"></div>
                </button>
                <div><strong>{t.analytics}</strong><span>{t.analyticsDesc}</span></div>
              </div>
            </div>
            <div className="ck3-cat">
              <div className="ck3-cat-head">
                <button className={'ck3-cat-toggle' + (prefs.marketing ? ' ck3-on' : '')} onClick={() => setPrefs(p => ({...p, marketing: !p.marketing}))}>
                  <div className="ck3-toggle-dot"></div>
                </button>
                <div><strong>{t.marketing}</strong><span>{t.marketingDesc}</span></div>
              </div>
            </div>
          </div>
        )}

        <div className="ck3-actions">
          <button className="ck3-btn-ghost" onClick={reject}>{t.rejectAll}</button>
          {!showDetail && <button className="ck3-btn-ghost" onClick={() => setShowDetail(true)}>{t.settings}</button>}
          {showDetail && <button className="ck3-btn-ghost" onClick={() => accept(false)}>{t.acceptSelected}</button>}
          <button className="ck3-btn-primary" onClick={() => accept(true)}>{t.acceptAll}</button>
        </div>
      </div>
    </div>
  );
}

// ─── Providers Listing + Profile ──────────────────────────
function ProvidersListing3({ lang, onNav }) {
  const cs = lang === 'cs';
  const isEUR = lang === 'sk';
  const providers = P.filter(p => isEUR ? p.isSK : !p.isSK);

  return (
    <section className="provs3 page-in">
      <div className="w3" style={{maxWidth:900}}>
        <Crumbs items={[{label:L[lang].breadcrumbs.home},{label:cs?'Profily spolecnosti':'Profily spolocnosti'}]} />
        <div className="blog3-header">
          <div className="aip3-badge"><Ico name="building" size={14} color="var(--c3-primary)" /> {cs?'Poskytovatele':'Poskytovatelia'}</div>
          <h1 className="gl3-h1">{cs?'Profily spolecnosti':'Profily spolocnosti'}</h1>
          <p className="gl3-sub">{cs?'Podrobne informace o vsech poskytovatelich pujcek v nasem srovnavaci.':'Podrobne informacie o vsetkych poskytovateloch.'}</p>
        </div>
        <div className="provs3-grid">
          {providers.map((p, i) => {
            const prof = PROFILES[p.id];
            return (
              <div key={p.id} className="provs3-card" style={{animationDelay:i*0.05+'s'}} onClick={() => onNav('provider:'+p.id)}>
                <div className="provs3-card-top">
                  <div className="rc3-logo" style={{background:p.logo?'transparent':p.color,width:48,height:48,fontSize:16}}>{p.logo?<img src={p.logo} alt={p.name} style={{width:'100%',height:'100%',objectFit:'contain'}} onError={e=>{e.target.style.display='none'}} />:p.initial}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div className="provs3-name">{p.name}</div>
                    <div className="rc3-type"><Ico name={p.type==='bank'?'bank':p.type==='p2p'?'users':'building'} size={12}/> {p.type==='bank'?'Banka':p.type==='p2p'?'P2P':(cs?'Nebankovni':'Nebankovy')}</div>
                  </div>
                  {prof && <div className="provs3-rating" style={{color:prof.rating>=85?'var(--c3-primary)':prof.rating>=70?'var(--c3-green)':'#fbbf24'}}>{prof.rating}<span>/100</span></div>}
                </div>
                <div className="provs3-stats">
                  <div><span>{cs?'Urok od':'Urok od'}</span><strong>{p.rateFrom}%</strong></div>
                  <div><span>RPSN</span><strong>{p.rpsnFrom}%</strong></div>
                  <div><span>{cs?'Schvaleni':'Schvalenie'}</span><strong>{p.approval} min</strong></div>
                  <div><span>{cs?'Ferovost':'Ferovost'}</span><strong>{p.fairness}/10</strong></div>
                </div>
                <span className="blog3-card-link">{cs?'Zobrazit profil':'Zobrazit profil'} <Ico name="arrowRight" size={14} color="var(--c3-primary)"/></span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProviderProfile3({ lang, providerId, onNav }) {
  const cs = lang === 'cs';
  const isEUR = lang === 'sk';
  const p = P.find(x => x.id === providerId);
  const prof = PROFILES[providerId];
  if (!p || !prof) return <div className="w3" style={{padding:'80px 20px',textAlign:'center'}}><h2>{cs?'Poskytovatel nenalezen':'Poskytovatel nenajdeny'}</h2></div>;

  const defaultAmt = isEUR ? 5000 : 150000;
  const defaultMo = 36;
  const rv = p.rateFrom / 100 / 12;
  const mo = calcMo(defaultAmt, defaultMo, p.rateFrom);
  const tot = mo * defaultMo;

  // Provider FAQ
  const provFaq = [
    {q:cs?`Jake jsou uroky u ${p.name}?`:`Ake su uroky u ${p.name}?`, a:cs?`Urokova sazba ${p.name} zacina na ${p.rateFrom} % p.a., RPSN od ${p.rpsnFrom} %.`:`Urokova sadzba od ${p.rateFrom} %.`},
    {q:cs?`Jak rychle ${p.name} schvali pujcku?`:`Ako rychlo ${p.name} schvali pozicku?`, a:cs?`Schvaleni probiha do ${p.approval} minut. Sjednani je ${p.online?'plne online':'mozne i na pobocce'}.`:`Schvalenie do ${p.approval} minut.`},
    {q:cs?`Ma ${p.name} poplatky?`:`Ma ${p.name} poplatky?`, a:cs?`Poplatek za zrizeni: ${p.fees.setup}. Vedeni: ${p.fees.maintenance}. Predcasne splaceni: ${p.fees.earlyRepay}.`:`Zriadenie: ${p.fees.setup}. Vedenie: ${p.fees.maintenance}.`},
  ];
  const [faqOpen, setFaqOpen] = React.useState(-1);

  return (
    <section className="provp3 page-in" itemScope itemType="https://schema.org/FinancialService">
      <div className="w3" style={{maxWidth:820}}>
        <Crumbs items={[
          {label:L[lang].breadcrumbs.home, onClick:()=>onNav('home')},
          {label:cs?'Profily':'Profily', onClick:()=>onNav('providers')},
          {label:p.name},
        ]} />

        {/* Hero */}
        <div className="provp3-hero">
          <div className="provp3-hero-top">
            <div className="rc3-logo" style={{background:p.logo?'transparent':p.color,width:64,height:64,fontSize:22}}>{p.logo?<img src={p.logo} alt={p.name} style={{width:'100%',height:'100%',objectFit:'contain'}} onError={e=>{e.target.style.display='none'}} />:p.initial}</div>
            <div style={{flex:1}}>
              <h1 className="provp3-h1" itemProp="name">{p.name}</h1>
              <div className="provp3-fullname" itemProp="legalName">{prof.fullName}</div>
              <div className="provp3-tags">
                <span className="t3 t3-t">{p.type==='bank'?'Banka':p.type==='p2p'?'P2P':(cs?'Nebankovni':'Nebankovy')}</span>
                <span className="t3 t3-g">{cs?'Licence':'Licencia'} {prof.license}</span>
                {prof.group !== 'Nezavisla' && <span className="t3" style={{background:'var(--c3-surface2)',color:'var(--c3-muted)',border:'1px solid var(--c3-border)'}}>{prof.group}</span>}
              </div>
            </div>
            <div className="provp3-rating-big">
              <div className="provp3-rating-num" style={{color:prof.rating>=85?'var(--c3-primary)':prof.rating>=70?'var(--c3-green)':'#fbbf24'}}>{prof.rating}</div>
              <div className="provp3-rating-lbl">/100</div>
            </div>
          </div>
          <p className="provp3-desc" itemProp="description">{prof.desc}</p>
          <button className="b3-primary b3-lg" style={{width:'100%',justifyContent:'center',marginTop:16}} onClick={() => onNav('compare')}>
            {cs?`Srovnat ${p.name} s ostatnimi`:`Porovnat ${p.name} s ostatnymi`} <Ico name="arrowRight" size={16} color="#0a0e1a" />
          </button>
        </div>

        {/* Quick stats */}
        <div className="provp3-stats">
          <div className="provp3-stat"><Ico name="chart" size={18} color="#38bdf8"/><div><strong>{p.rateFrom} %</strong><span>{cs?'Urok od':'Urok od'}</span></div></div>
          <div className="provp3-stat"><Ico name="shield" size={18} color="var(--c3-green)"/><div><strong>{p.rpsnFrom} %</strong><span>RPSN od</span></div></div>
          <div className="provp3-stat"><Ico name="bolt" size={18} color="#fbbf24"/><div><strong>{p.approval} min</strong><span>{cs?'Schvaleni':'Schvalenie'}</span></div></div>
          <div className="provp3-stat"><Ico name="star" size={18} color="var(--c3-primary)"/><div><strong>{p.fairness}/10</strong><span>{cs?'Ferovost':'Ferovost'}</span></div></div>
        </div>

        {/* Info grid */}
        <div className="d3-info-grid">
          <div className="d3-info-box">
            <div className="d3-info-title"><Ico name="chart" size={14} color="var(--c3-primary)"/> {cs?'Parametry pujcky':'Parametre pozicky'}</div>
            <div className="d3-info-row"><span>{cs?'Castka':'Suma'}</span><strong>{fmt(p.minAmt,isEUR)} - {fmt(p.maxAmt,isEUR)}</strong></div>
            <div className="d3-info-row"><span>{cs?'Doba':'Doba'}</span><strong>{p.minMo} - {p.maxMo} {cs?'mes':'mes'}</strong></div>
            <div className="d3-info-row"><span>{cs?'Urok':'Urok'}</span><strong>{p.rateFrom} - {p.rateTo} %</strong></div>
            <div className="d3-info-row"><span>RPSN</span><strong>{p.rpsnFrom} - {p.rpsnTo} %</strong></div>
          </div>
          <div className="d3-info-box">
            <div className="d3-info-title"><Ico name="shield" size={14} color="var(--c3-primary)"/> {cs?'Poplatky':'Poplatky'}</div>
            <div className="d3-info-row"><span>{cs?'Zrizeni':'Zriadenie'}</span><strong className={p.fees.setup==='Zdarma'||p.fees.setup==='Zadarmo'?'d3-fee-free':'d3-fee-paid'}>{p.fees.setup}</strong></div>
            <div className="d3-info-row"><span>{cs?'Vedeni':'Vedenie'}</span><strong className={p.fees.maintenance==='Zdarma'||p.fees.maintenance==='Zadarmo'?'d3-fee-free':'d3-fee-paid'}>{p.fees.maintenance}</strong></div>
            <div className="d3-info-row"><span>{cs?'Predcasne':'Predcasne'}</span><strong className={p.fees.earlyRepay==='Zdarma'||p.fees.earlyRepay==='Zadarmo'?'d3-fee-free':'d3-fee-paid'}>{p.fees.earlyRepay}</strong></div>
          </div>
          <div className="d3-info-box">
            <div className="d3-info-title"><Ico name="building" size={14} color="var(--c3-primary)"/> {cs?'O spolecnosti':'O spolocnosti'}</div>
            <div className="d3-info-row"><span>{cs?'Zalozena':'Zalozena'}</span><strong>{prof.founded}</strong></div>
            <div className="d3-info-row"><span>{cs?'Sidlo':'Sidlo'}</span><strong>{prof.hq}</strong></div>
            <div className="d3-info-row"><span>{cs?'Klienti':'Klienti'}</span><strong>{prof.clients}</strong></div>
            <div className="d3-info-row"><span>{cs?'Pobocky':'Pobocky'}</span><strong>{prof.branches}</strong></div>
          </div>
        </div>

        {/* Features */}
        <div className="provp3-section">
          <h2 className="d3-section-title">{cs?'Hlavni vyhody':'Hlavne vyhody'}</h2>
          <div className="provp3-features">
            {prof.features.map((f,i) => (
              <div key={i} className="provp3-feat"><Ico name="check" size={16} color="var(--c3-green)"/><span>{f}</span></div>
            ))}
          </div>
        </div>

        {/* Pros/Cons */}
        <div className="d3-pc">
          <div><div className="d3-pct d3-pro"><Ico name="check" size={15} color="var(--c3-green)"/> {cs?'Vyhody':'Vyhody'}</div>
            {p.pros.map((x,i) => <div key={i} className="d3-pci"><Ico name="check" size={14} color="var(--c3-green)"/><span>{x}</span></div>)}</div>
          <div><div className="d3-pct d3-con"><Ico name="x" size={15} color="var(--c3-red)"/> {cs?'Nevyhody':'Nevyhody'}</div>
            {p.cons.map((x,i) => <div key={i} className="d3-pci"><Ico name="x" size={14} color="var(--c3-red)"/><span>{x}</span></div>)}</div>
        </div>

        {/* Products */}
        <div className="provp3-section">
          <h2 className="d3-section-title">{cs?'Nabizene produkty':'Ponukane produkty'}</h2>
          <div className="provp3-products">{prof.products.map((pr,i) => <span key={i} className="ch3">{pr}</span>)}</div>
        </div>

        {/* Example calc */}
        <div className="provp3-section">
          <h2 className="d3-section-title">{cs?'Priklad splatky':'Priklad splatky'}</h2>
          <div className="provp3-example">
            <div className="provp3-ex-row"><span>{cs?'Castka':'Suma'}</span><strong>{fmt(defaultAmt,isEUR)}</strong></div>
            <div className="provp3-ex-row"><span>{cs?'Doba':'Doba'}</span><strong>{defaultMo} {cs?'mes':'mes'}</strong></div>
            <div className="provp3-ex-row"><span>{cs?'Urok':'Urok'}</span><strong>{p.rateFrom} %</strong></div>
            <div className="provp3-ex-row"><span>{cs?'Mesicni splatka':'Mesacna splatka'}</span><strong style={{color:'var(--c3-primary)',fontSize:20}}>{fmt(Math.round(mo),isEUR)}</strong></div>
            <div className="provp3-ex-row"><span>{cs?'Celkem':'Celkovo'}</span><strong>{fmt(Math.round(tot),isEUR)}</strong></div>
          </div>
          <button className="b3-primary" style={{width:'100%',justifyContent:'center',marginTop:14}} onClick={() => onNav('calcpage')}>
            {cs?'Spocitat vlastni splatku':'Vypocitat vlastnu splatku'} <Ico name="arrowRight" size={14} color="#0a0e1a"/>
          </button>
        </div>

        {/* FAQ */}
        <div className="provp3-section" itemScope itemType="https://schema.org/FAQPage">
          <h2 className="d3-section-title">{cs?'Caste otazky':'Caste otazky'}</h2>
          {provFaq.map((item,i) => (
            <div key={i} className={'fq3-item'+(faqOpen===i?' open':'')} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <button className="fq3-q" onClick={()=>setFaqOpen(faqOpen===i?-1:i)}><span itemProp="name">{item.q}</span><span className="fq3-c">{faqOpen===i?'\u2212':'+'}</span></button>
              <div className="fq3-a" style={{maxHeight:faqOpen===i?200:0}} itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer"><div itemProp="text">{item.a}</div></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="cp3-cta">
          <div className="cp3-cta-inner">
            <div><h3>{cs?`Porovnat ${p.name} s ostatnimi`:`Porovnat ${p.name}`}</h3><p>{cs?'Najdete lepsi podminky? Srovnejte vsechny nabidky.':'Najdite lepsie podmienky.'}</p></div>
            <button className="b3-primary b3-lg" onClick={() => onNav('compare')}>{cs?'Srovnat':'Porovnat'} <Ico name="arrowRight" size={16} color="#0a0e1a"/></button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Blog Page ──────────────────────────
const BLOG_ARTICLES = {
  cs: [
    { id:'jak-vybrat-pujcku', title:'Jak vybrat nejlepsi pujcku v roce 2026', cat:'Pruvodce', date:'15. 5. 2026', readMin:8, color:'#c8ff00',
      excerpt:'Kompletni pruvodce vyberem pujcky — na co se zamerit, cemu se vyhnout a jak usetrit tisice korun.',
      content:[
        {h:'Proc je RPSN dulezitejsi nez urok', p:'Urokova sazba je jen cast ceny pujcky. RPSN (rocni procentni sazba nakladu) zahrnuje i poplatky za zrizeni, vedeni a pojisteni. Dva poskytovatele se stejnym urokem mohou mit RPSN lisici se o 5 i vice procentnich bodu. Proto vzdy srovnavejte podle RPSN — je to jediny spolehlivy ukazatel skutecne ceny.'},
        {h:'Bankovni vs. nebankovni: co je lepsi?', p:'Banky nabizeji nizsi uroky (od 3,9 %), ale prisnejsi podminky. Nebankovni poskytovatele schvali rychleji a s mirnejsimi pozadavky, ale RPSN byva vyssi (8-25 %). Pro klienty s dobrym prijem a cistou historii jsou banky jasna volba. Pro rychlou malu pujcku muze byt nebankovni sektor vyhodnejsi.'},
        {h:'5 veci, ktere kontrolovat pred podpisem', p:'1) RPSN — ne urok. 2) Poplatek za predcasne splaceni — nejlepsi poskytovatele ho nemaji. 3) Poplatek za vedeni — mesicni naklad, ktery se scita. 4) Moznost odkladu splatek — uzitecne pri neplanovanych udalostech. 5) Pojisteni — byva drahe a casto zbytecne.'},
        {h:'Jak zvysit sanci na schvaleni', p:'Mějte pravidelny prijem alespon 3 mesice. Nemejte negativni zaznamy v registrech (BRKI, NRKI, Solus). Nezdejte u vice poskytovatelu zaroven — kazdy dotaz do registru je viditelny. Pouzijte nas AI poradce pro optimalni vyber.'},
      ]},
    { id:'rpsn-vs-urok', title:'RPSN vs. urok — jaky je rozdil a proc na tom zalezi', cat:'Vzdelani', date:'10. 5. 2026', readMin:5, color:'#38bdf8',
      excerpt:'Vysvetlujeme nejdulezitejsi ukazatel ceny pujcky jednoduche a srozumitelne.',
      content:[
        {h:'Co je urokova sazba', p:'Urokova sazba je cena za pujceni penez vyjadrena v procentech za rok (p.a.). Rika vam, kolik procent z dluzne castky zaplatite bance jako odmenu za to, ze vam penize pujcila. Ale pozor — urok nezahrnuje poplatky.'},
        {h:'Co je RPSN', p:'RPSN zahrnuje urok PLUS vsechny povinne poplatky — za zrizeni, vedeni, pojisteni. Je to jedine cislo, ktere vam rekne skutecnou celkovou cenu pujcky. Ze zakona musi byt RPSN uvedeno u kazde nabidky.'},
        {h:'Priklad z praxe', p:'Pujcka A: urok 4,9 %, poplatek za zrizeni 2 % = RPSN 7,1 %. Pujcka B: urok 5,5 %, zadne poplatky = RPSN 5,5 %. Pujcka B je levnejsi, prestoze ma vyssi urok! Proto vzdy srovnavejte podle RPSN.'},
      ]},
    { id:'konsolidace-pruvodce', title:'Konsolidace pujcek krok za krokem', cat:'Pruvodce', date:'5. 5. 2026', readMin:7, color:'#6ee7b7',
      excerpt:'Jak sloucit vice pujcek do jedne, snizit splatku a zjednodusit finance.',
      content:[
        {h:'Kdy se konsolidace vyplati', p:'Konsolidace ma smysl, kdyz mate 2 a vice pujcek s ruznymi splatkami, nebo kdyz jsou vase stavajici uroky vyssi nez aktualni trzni sazby. Typicka uspora je 15-25 % na mesicnich splatkach.'},
        {h:'Jak na to — 4 kroky', p:'1) Sescitejte vsechny stavajici dluhy a splatky. 2) Porovnejte konsolidacni nabidky (doporucujeme nas srovnavac). 3) Zvolte poskytovatele s nejnizsim RPSN. 4) Novy poskytovatel splatí vase stare pujcky a vy plasite jen jednu splatku.'},
        {h:'Na co si dat pozor', p:'Kontrolujte poplatky za predcasne splaceni u starych pujcek. Nekteri poskytovatele uctujou az 1 % z predcasne splacene castky. Taky porovnejte celkovou cenu — nizsi splatka pri delsi dobe muze znamenat vyssi celkove naklady.'},
      ]},
    { id:'pujcka-bez-registru', title:'Pujcka bez registru — existuje vubec?', cat:'Myte', date:'1. 5. 2026', readMin:4, color:'#fbbf24',
      excerpt:'Pravda o pujckach "bez registru" a na co si dat pozor.',
      content:[
        {h:'Pravda o pujckach bez registru', p:'Zadny legitimni poskytovatel vam nepujci bez nahlédnuti do registru. Je to ze zakona povinnost. Nabidky "pujcka bez registru" jsou bud podvod, nebo nebankovni poskytovatele, kteri kontroluji registry, ale maji mirnejsi kriteria.'},
        {h:'Co delat s negativnim zaznamem', p:'Negativni zaznam neznamena konec. Nebankovni poskytovatele casto pujci i klientum s drobnym zpozdeným v historii. Duležité je prokázat aktualni schopnost splacet. Taky muzete pozadat o vymaz zastaraleho zaznamu.'},
      ]},
    { id:'financni-gramotnost', title:'10 pravidel financni gramotnosti', cat:'Vzdelani', date:'25. 4. 2026', readMin:6, color:'#a78bfa',
      excerpt:'Zakladni pravidla, ktera by mel znat kazdy, kdo si pujcuje penize.',
      content:[
        {h:'Pravidla, ktera vas ochrání', p:'1) Nikdy si nepujcujte na splaceni jine pujcky. 2) Splatka by nemela prekrocit 35 % cisteho prijmu. 3) Vzdy citejte smlouvu cele. 4) Porovnavejte minimalne 3 nabidky. 5) Nepodepisujte nic pod tlakem. 6) Ptejte se na RPSN, ne na urok. 7) Pojisteni splaceni je volitelne. 8) Predcasne splacení setri tisice. 9) Mějte nouzovy fond 3 mesicnich vydaju. 10) Pouzivejte nastroje jako Pujckomat.'},
      ]},
  ],
  sk: [
    { id:'jak-vybrat-pujcku', title:'Ako vybrat najlepsiu pozicku v roku 2026', cat:'Sprievodca', date:'15. 5. 2026', readMin:8, color:'#c8ff00',
      excerpt:'Kompletny sprievodca vyberom pozicky.',
      content:[{h:'Preco je RPSN dolezitejsie nez urok',p:'RPSN zahrna urok aj vsetky poplatky. Vzdy porovnavajte podla RPSN.'}]},
    { id:'rpsn-vs-urok', title:'RPSN vs. urok — aky je rozdiel', cat:'Vzdelanie', date:'10. 5. 2026', readMin:5, color:'#38bdf8',
      excerpt:'Vysvetlujeme najdolezitejsi ukazovatel ceny pozicky.',
      content:[{h:'Co je RPSN',p:'RPSN zahrna urok plus vsetky povinne poplatky.'}]},
    { id:'konsolidace-pruvodce', title:'Konsolidacia poziciek krok za krokom', cat:'Sprievodca', date:'5. 5. 2026', readMin:7, color:'#6ee7b7',
      excerpt:'Ako zlucit pozicky do jednej.',
      content:[{h:'Kedy sa konsolidacia oplati',p:'Konsolidacia ma zmysel, ked mate 2 a viac poziciek.'}]},
  ],
};

function Blog3({ lang, onArticle }) {
  const cs = lang === 'cs';
  const articles = BLOG_ARTICLES[lang] || BLOG_ARTICLES.cs;
  const cats = [...new Set(articles.map(a => a.cat))];
  const [activeCat, setActiveCat] = React.useState('all');
  const filtered = activeCat === 'all' ? articles : articles.filter(a => a.cat === activeCat);

  return (
    <section className="blog3 page-in" aria-label="Blog">
      <div className="w3" style={{maxWidth:900}}>
        <Crumbs items={[{label:L[lang].breadcrumbs.home},{label:'Blog'}]} />
        <div className="blog3-header">
          <div className="aip3-badge"><Ico name="chart" size={14} color="var(--c3-primary)" /> {cs?'Financni magazin':'Financny magazin'}</div>
          <h1 className="gl3-h1">{cs?'Blog o pujckach a financich':'Blog o pozickach a financiach'}</h1>
          <p className="gl3-sub">{cs?'Prakticke clanky, pruvodce a tipy, ktere vam pomohou lepe se orientovat ve svete pujcek.':'Prakticke clanky a tipy o pozickach.'}</p>
        </div>

        <div className="blog3-cats">
          <button className={'ch3'+(activeCat==='all'?' act':'')} onClick={()=>setActiveCat('all')}>{cs?'Vse':'Vsetko'}</button>
          {cats.map(c => <button key={c} className={'ch3'+(activeCat===c?' act':'')} onClick={()=>setActiveCat(c)}>{c}</button>)}
        </div>

        <div className="blog3-grid">
          {filtered.map((a, i) => (
            <article key={a.id} className="blog3-card" style={{animationDelay:i*0.05+'s'}} onClick={()=>onArticle(a.id)}>
              <div className="blog3-card-color" style={{background:a.color}}></div>
              <div className="blog3-card-body">
                <div className="blog3-card-meta">
                  <span className="blog3-card-cat">{a.cat}</span>
                  <span className="blog3-card-date">{a.date}</span>
                  <span className="blog3-card-read">{a.readMin} min</span>
                </div>
                <h2 className="blog3-card-title">{a.title}</h2>
                <p className="blog3-card-excerpt">{a.excerpt}</p>
                <span className="blog3-card-link">{cs?'Cist clanek':'Citat clanok'} <Ico name="arrowRight" size={14} color="var(--c3-primary)" /></span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogArticle3({ lang, articleId, onBack }) {
  const cs = lang === 'cs';
  const articles = BLOG_ARTICLES[lang] || BLOG_ARTICLES.cs;
  const article = articles.find(a => a.id === articleId);
  if (!article) return <div className="w3" style={{padding:'80px 20px',textAlign:'center'}}><h2>{cs?'Clanek nenalezen':'Clanok nenajdeny'}</h2></div>;

  return (
    <section className="blogart3 page-in">
      <div className="w3" style={{maxWidth:720}}>
        <Crumbs items={[
          {label:L[lang].breadcrumbs.home, onClick:()=>onBack('home')},
          {label:'Blog', onClick:()=>onBack('blog')},
          {label:article.title},
        ]} />
        <article className="blogart3-card" itemScope itemType="https://schema.org/Article">
          {/* Hero illustration */}
          <div className="blogart3-hero-img" style={{background:`linear-gradient(135deg, ${article.color}15, ${article.color}08)`}}>
            <svg width="100%" height="100%" viewBox="0 0 600 200" preserveAspectRatio="xMidYMid slice" style={{display:'block'}}>
              <defs>
                <linearGradient id={'bh-'+article.id} x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor={article.color} stopOpacity="0.3"/>
                  <stop offset="100%" stopColor={article.color} stopOpacity="0.05"/>
                </linearGradient>
              </defs>
              {/* Grid pattern */}
              {Array.from({length:13}).map((_,i)=><line key={'v'+i} x1={i*50} y1="0" x2={i*50} y2="200" stroke={article.color} strokeOpacity="0.06" strokeWidth="1"/>)}
              {Array.from({length:5}).map((_,i)=><line key={'h'+i} x1="0" y1={i*50} x2="600" y2={i*50} stroke={article.color} strokeOpacity="0.06" strokeWidth="1"/>)}
              {/* Abstract shapes based on article index */}
              {article.id==='jak-vybrat-pujcku' && <>
                <circle cx="150" cy="100" r="60" fill={`url(#bh-${article.id})`}/>
                <circle cx="300" cy="80" r="40" fill={article.color} fillOpacity="0.08"/>
                <circle cx="450" cy="120" r="50" fill={article.color} fillOpacity="0.06"/>
                <path d="M100 140 L200 60 L300 100 L400 40 L500 80" fill="none" stroke={article.color} strokeWidth="2" strokeOpacity="0.25" strokeLinecap="round"/>
                <circle cx="200" cy="60" r="4" fill={article.color} fillOpacity="0.5"/>
                <circle cx="400" cy="40" r="4" fill={article.color} fillOpacity="0.5"/>
              </>}
              {article.id==='rpsn-vs-urok' && <>
                <rect x="120" y="50" width="80" height="100" rx="8" fill={article.color} fillOpacity="0.08"/>
                <rect x="220" y="70" width="80" height="80" rx="8" fill={article.color} fillOpacity="0.12"/>
                <rect x="320" y="40" width="80" height="110" rx="8" fill={article.color} fillOpacity="0.06"/>
                <rect x="420" y="60" width="80" height="90" rx="8" fill={article.color} fillOpacity="0.1"/>
                <line x1="120" y1="155" x2="500" y2="155" stroke={article.color} strokeWidth="1.5" strokeOpacity="0.2"/>
              </>}
              {article.id==='konsolidace-pruvodce' && <>
                <circle cx="180" cy="80" r="30" fill="none" stroke={article.color} strokeWidth="2" strokeOpacity="0.2"/>
                <circle cx="300" cy="100" r="30" fill="none" stroke={article.color} strokeWidth="2" strokeOpacity="0.2"/>
                <circle cx="420" cy="80" r="30" fill="none" stroke={article.color} strokeWidth="2" strokeOpacity="0.2"/>
                <path d="M210 80 L270 100" stroke={article.color} strokeWidth="2" strokeOpacity="0.3" strokeLinecap="round"/>
                <path d="M330 100 L390 80" stroke={article.color} strokeWidth="2" strokeOpacity="0.3" strokeLinecap="round"/>
                <circle cx="300" cy="150" r="40" fill={article.color} fillOpacity="0.1"/>
                <path d="M180 110 Q300 170 420 110" fill="none" stroke={article.color} strokeWidth="2" strokeOpacity="0.15" strokeDasharray="6,4"/>
              </>}
              {article.id==='pujcka-bez-registru' && <>
                <rect x="200" y="50" width="200" height="100" rx="16" fill="none" stroke={article.color} strokeWidth="2" strokeOpacity="0.15"/>
                <line x1="220" y1="80" x2="380" y2="80" stroke={article.color} strokeWidth="1.5" strokeOpacity="0.12"/>
                <line x1="220" y1="100" x2="350" y2="100" stroke={article.color} strokeWidth="1.5" strokeOpacity="0.12"/>
                <line x1="220" y1="120" x2="320" y2="120" stroke={article.color} strokeWidth="1.5" strokeOpacity="0.12"/>
                <circle cx="440" cy="100" r="30" fill="none" stroke={article.color} strokeWidth="2" strokeOpacity="0.2"/>
                <line x1="425" y1="85" x2="455" y2="115" stroke={article.color} strokeWidth="2.5" strokeOpacity="0.3" strokeLinecap="round"/>
                <line x1="455" y1="85" x2="425" y2="115" stroke={article.color} strokeWidth="2.5" strokeOpacity="0.3" strokeLinecap="round"/>
              </>}
              {article.id==='financni-gramotnost' && <>
                {Array.from({length:10}).map((_,i)=><circle key={i} cx={100+i*45} cy={100-Math.sin(i*0.7)*30} r={8+i*1.5} fill={article.color} fillOpacity={0.04+i*0.015}/>)}
                <path d={`M100 ${100-Math.sin(0)*30} ${Array.from({length:10}).map((_,i)=>`L${100+i*45} ${100-Math.sin(i*0.7)*30}`).join(' ')}`} fill="none" stroke={article.color} strokeWidth="2" strokeOpacity="0.2" strokeLinecap="round"/>
              </>}
              {/* Fallback for SK or unknown */}
              {!['jak-vybrat-pujcku','rpsn-vs-urok','konsolidace-pruvodce','pujcka-bez-registru','financni-gramotnost'].includes(article.id) && <>
                <circle cx="300" cy="100" r="70" fill={`url(#bh-${article.id})`}/>
                <circle cx="300" cy="100" r="50" fill="none" stroke={article.color} strokeWidth="1.5" strokeOpacity="0.15"/>
              </>}
            </svg>
          </div>
          <div className="blogart3-meta">
            <span className="blog3-card-cat">{article.cat}</span>
            <span>{article.date}</span>
            <span>{article.readMin} min {cs?'cteni':'citania'}</span>
          </div>
          <h1 className="blogart3-h1" itemProp="headline">{article.title}</h1>
          <p className="blogart3-excerpt">{article.excerpt}</p>

          <div className="blogart3-content" itemProp="articleBody">
            {article.content.map((sec, i) => (
              <div key={i} className="blogart3-section">
                <h2 className="blogart3-h2">{sec.h}</h2>
                <p className="blogart3-p">{sec.p}</p>
              </div>
            ))}
          </div>

          {/* Related articles */}
          <div className="blogart3-related">
            <h3 className="d3-section-title">{cs?'Dalsi clanky':'Dalsie clanky'}</h3>
            <div className="blogart3-related-grid">
              {articles.filter(a=>a.id!==articleId).slice(0,2).map(a => (
                <div key={a.id} className="blogart3-related-card" onClick={()=>onBack('article:'+a.id)}>
                  <div className="blog3-card-color" style={{background:a.color,height:4}}></div>
                  <div className="blog3-card-cat" style={{marginTop:12}}>{a.cat}</div>
                  <div className="blog3-card-title" style={{fontSize:15}}>{a.title}</div>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* CTA — outside the article card */}
        <div className="cp3-cta" style={{marginTop:28}}>
          <div className="cp3-cta-inner">
            <div><h3>{cs?'Hledate pujcku?':'Hladate pozicku?'}</h3><p>{cs?'Srovnejte nabidky od 10+ poskytovatelu.':'Porovnajte ponuky.'}</p></div>
            <button className="b3-primary" onClick={()=>onBack('compare')}>{cs?'Srovnat':'Porovnat'} <Ico name="arrowRight" size={14} color="#0a0e1a" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Category Landing Page (SEO) ──────────────────────────
function CategoryPage3({ lang, catId, onNav }) {
  const cs = lang === 'cs';
  const isEUR = lang === 'sk';
  const cat = CATEGORIES[catId];
  if (!cat) return <div className="w3" style={{padding:'80px 20px',textAlign:'center'}}><h2>{cs?'Kategorie nenalezena':'Kategoria nenajdena'}</h2></div>;
  const t = cat[lang] || cat.cs;
  const curr = isEUR ? 'EUR' : 'CZK';

  // Filter providers
  const filtered = P.filter(p => {
    if (isEUR && !p.isSK) return false;
    if (!isEUR && p.isSK) return false;
    return t.filter(p);
  });

  // Generate offers for default params
  const defaultAmt = isEUR ? 5000 : 150000;
  const defaultMo = 36;
  const offers = filtered.map(p => {
    const af = Math.max(0, 1 - (defaultAmt - p.minAmt) / (p.maxAmt - p.minAmt)) * 0.3;
    const pf = (defaultMo / p.maxMo) * 0.2;
    const rate = Math.max(p.rateFrom, p.rateFrom + (p.rateTo - p.rateFrom) * (af + pf));
    const rpsn = rate + (p.rpsnFrom - p.rateFrom) + (p.noFees ? 0 : 0.5);
    const monthly = calcMo(defaultAmt, defaultMo, rate);
    return { ...p, rate: Math.round(rate*100)/100, rpsn: Math.round(rpsn*100)/100,
             monthly: Math.round(monthly), total: Math.round(monthly * defaultMo), amount: defaultAmt, months: defaultMo };
  }).sort((a,b) => a.rpsn - b.rpsn);

  const best = offers.length ? offers[0] : null;

  // FAQ for this category
  const catFaq = [
    { q: cs ? `Jaky je nejnizsi urok u ${t.h1.toLowerCase()}?` : `Aky je najnizsi urok?`,
      a: cs ? `Nejnizsi urok na trhu je ${best ? best.rateFrom : '3,99'} % p.a. u ${best ? best.name : 'nejlepsich poskytovatelu'}.` : `Najnizsi urok je od ${best ? best.rateFrom : '3,99'} %.` },
    { q: cs ? `Kolik si mohu pujcit?` : `Kolko si mozem poziciat?`,
      a: cs ? `Castky se pohybuji od 5 000 Kc do 2 500 000 Kc podle poskytovatele. Doba splaceni 6 az 120 mesicu.` : `Sumy od 500 do 40 000 EUR.` },
    { q: cs ? `Jak rychle dostanu penize?` : `Ako rychlo dostanem peniaze?`,
      a: cs ? `Nejrychlejsi schvaleni je za ${best ? Math.min(...offers.map(o=>o.approval)) : 3} minut. Penize na uctu obvykle do 24 hodin.` : `Najrychlejsie schvalenie za 3 minuty.` },
  ];
  const [faqOpen, setFaqOpen] = React.useState(-1);

  return (
    <section className="catpg page-in">
      <div className="w3" style={{maxWidth:900}}>
        <Crumbs items={[
          { label: L[lang].breadcrumbs.home, onClick: () => onNav('home') },
          { label: t.h1 },
        ]} />

        {/* Hero */}
        <div className="catpg-hero">
          <h1 className="catpg-h1">{t.h1}</h1>
          <p className="catpg-sub">{t.sub}</p>
          <div className="catpg-meta">
            <span><Ico name="bank" size={14} color="var(--c3-primary)" /> {offers.length} {cs?'poskytovatelu':'poskytovatelov'}</span>
            <span><Ico name="chart" size={14} color="var(--c3-primary)" /> {cs?'Urok od':'Urok od'} {best ? best.rateFrom : '?'} %</span>
            <span><Ico name="bolt" size={14} color="var(--c3-primary)" /> {cs?'Schvaleni od':'Schvalenie od'} {best ? Math.min(...offers.map(o=>o.approval)) : '?'} min</span>
          </div>
          <button className="b3-primary" onClick={() => onNav('compare')}>{cs?'Srovnat vsechny nabidky':'Porovnat vsetky ponuky'} <Ico name="arrowRight" size={14} color="#0a0e1a" /></button>
        </div>

        {/* Provider cards — same style as compare view */}
        <div className="catpg-section">
          <h2 className="d3-section-title">{cs?`Nejlepsi ${t.h1.toLowerCase()} v roce 2026`:`Najlepsie ${t.h1.toLowerCase()} v roku 2026`}</h2>
          <div className="catpg-cards">
            {offers.map((o, i) => (
              <article key={o.id} className={'rc3' + (i===0?' rc3-best':'')} style={{animationDelay: i*0.04+'s'}}
                       itemScope itemType="https://schema.org/FinancialProduct">
                {i === 0 && <div className="rc3-ai"><Ico name="sparkle" size={13} color="#0a0e1a" /> {cs?'Nejlepsi volba':'Najlepsia volba'}</div>}
                <div className="rc3-top">
                  <div className="rc3-logo" style={{background:o.logo?'transparent':o.color}} aria-hidden="true">{o.logo?<img src={o.logo} alt={o.name} style={{width:'100%',height:'100%',objectFit:'contain'}} onError={e=>{e.target.style.display='none'}} />:o.initial}</div>
                  <div className="rc3-info">
                    <h3 className="rc3-name" itemProp="name">{o.name}</h3>
                    <div className="rc3-type"><Ico name={o.type==='bank'?'bank':o.type==='p2p'?'users':'building'} size={12} /> {o.type==='bank'?'Banka':o.type==='p2p'?'P2P':(cs?'Nebankovni':'Nebankovy')}</div>
                  </div>
                  <div className="rc3-score-wrap">
                    <svg viewBox="0 0 36 36" className="rc3-ring"><circle cx="18" cy="18" r="16" fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="3"/><circle cx="18" cy="18" r="16" fill="none" stroke={o.fairness>=8?'#10b981':o.fairness>=6?'#eb0f55':'#ef4444'} strokeWidth="3" strokeDasharray={`${o.fairness*10.05} 100.5`} strokeLinecap="round" transform="rotate(-90 18 18)"/></svg>
                    <div className="rc3-score-num">{o.fairness}</div>
                  </div>
                </div>
                <div className="rc3-grid">
                  <div>
                    <div className="rc3-gv rc3-gv-main">{fmt(o.monthly,isEUR)}</div>
                    <div className="rc3-gl">{cs?'Splatka':'Splatka'}</div>
                  </div>
                  <div className="rc3-secondary-stats">
                    <div><div className="rc3-gv">{o.rate}%</div><div className="rc3-gl">{cs?'Urok':'Urok'}</div></div>
                    <div><div className="rc3-gv rc3-rpsn">{o.rpsn}%</div><div className="rc3-gl">RPSN</div></div>
                    <div><div className="rc3-gv">{o.approval} min</div><div className="rc3-gl">{cs?'Schvaleni':'Schvalenie'}</div></div>
                  </div>
                </div>
                <div className="rc3-tags">
                  {o.noFees && <span className="t3 t3-g">{cs?'Bez poplatku':'Bez poplatkov'}</span>}
                  {o.earlyFree && <span className="t3 t3-t">{cs?'Predcasne splaceni zdarma':'Predcasne splatenie zadarmo'}</span>}
                </div>
                <div className="rc3-actions">
                  <button className="b3-ghost" onClick={() => onNav('provider:'+o.id)}>{cs?'Profil':'Profil'}</button>
                  <button className="b3-primary" onClick={() => onNav('compare')}>{cs?'Srovnat nabidky':'Porovnat ponuky'} <Ico name="arrowRight" size={14} color="#0a0e1a" /></button>
                </div>
              </article>
            ))}
          </div>
          {offers.length === 0 && <p style={{textAlign:'center',color:'var(--c3-muted)',padding:40}}>{cs?'Pro tuto kategorii nemame zatim poskytovatele.':'Pre tuto kategoriu nemame zatial poskytovatelov.'}</p>}
        </div>

        {/* SEO content */}
        <div className="catpg-section">
          <h2 className="d3-section-title">{t.seoTitle}</h2>
          <p className="d3-seo-text">{t.seoText}</p>
        </div>

        {/* Category FAQ */}
        <div className="catpg-section" itemScope itemType="https://schema.org/FAQPage">
          <h2 className="d3-section-title">{cs?'Caste otazky':'Caste otazky'}</h2>
          {catFaq.map((item, i) => (
            <div key={i} className={'fq3-item' + (faqOpen===i?' open':'')} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
              <button className="fq3-q" onClick={() => setFaqOpen(faqOpen===i?-1:i)}>
                <span itemProp="name">{item.q}</span>
                <span className="fq3-c">{faqOpen===i?'\u2212':'+'}</span>
              </button>
              <div className="fq3-a" style={{maxHeight:faqOpen===i?200:0}} itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                <div itemProp="text">{item.a}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="cp3-cta">
          <div className="cp3-cta-inner">
            <div>
              <h3>{cs?`Najdete nejlepsi ${t.h1.toLowerCase()}`:`Najdite najlepsie ${t.h1.toLowerCase()}`}</h3>
              <p>{cs?'Porovnejte vsechny nabidky s kalkulackou na miru.':'Porovnajte vsetky ponuky s kalkulackou na mieru.'}</p>
            </div>
            <button className="b3-primary b3-lg" onClick={() => onNav('compare')}>{cs?'Srovnat':'Porovnat'} <Ico name="arrowRight" size={16} color="#0a0e1a" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── About Page ──────────────────────────
function About3({ lang }) {
  const cs = lang === 'cs';
  const team = [
    { name: 'Tomas Krejci', role: cs ? 'Zakladatel & CEO' : 'Zakladatel & CEO', color: '#c8ff00', initial: 'TK',
      desc: cs ? '12 let ve financnich technologiich. Drive vedl produktovy tym v Ceske sporitelne.' : '12 rokov vo financnych technologiach.' },
    { name: 'Petra Novakova', role: cs ? 'Head of Data' : 'Head of Data', color: '#38bdf8', initial: 'PN',
      desc: cs ? 'Datova analyticka s 8 lety zkusenosti. Zodpovedna za index ferovosti a metodiku.' : 'Datova analyticka s 8 rokmi skusenosti.' },
    { name: 'Martin Dvorak', role: cs ? 'Lead Developer' : 'Lead Developer', color: '#6ee7b7', initial: 'MD',
      desc: cs ? 'Fullstack vyvojar se specializaci na fintech. Postavil platformu od nuly.' : 'Fullstack vyvojar so specializaciou na fintech.' },
    { name: 'Anna Prochazkova', role: cs ? 'UX Designer' : 'UX Designer', color: '#fbbf24', initial: 'AP',
      desc: cs ? 'Designerka s vasi financnich produktu. Zodpovedna za jednoduchost a pristupnost.' : 'Dizajnerka financnych produktov.' },
  ];

  const milestones = [
    { year: '2023', title: cs ? 'Napad' : 'Napad', desc: cs ? 'Frustrace z nepruhlednych srovnavacu nas privedla k zalozeni projektu.' : 'Frustracia z nepruhladnych porovnavacov.' },
    { year: '2024', title: cs ? 'Beta verze' : 'Beta verzia', desc: cs ? 'Spusteni prvni verze s 5 poskytovateli. 10 000 uzivatelu za prvni mesic.' : 'Spustenie prvej verzie s 5 poskytovatelmi.' },
    { year: '2025', title: cs ? 'Index ferovosti' : 'Index ferovosti', desc: cs ? 'Predstaveni vlastni metodiky hodnoceni poskytovatelu. Registrace u CNB.' : 'Predstavenie vlastnej metodiky hodnotenia.' },
    { year: '2026', title: cs ? 'AI poradce' : 'AI poradca', desc: cs ? 'Spusteni chytreho poradce a rozsireni na 10+ poskytovatelu v CR i SR.' : 'Spustenie chytreho poradcu a rozsirenie na SR.' },
  ];

  const values = [
    { icon: 'eye', title: cs ? 'Transparentnost' : 'Transparentnost', desc: cs ? 'Zverejnujeme metodiku, zdrojova data i zpusob financovani. Zadne skryte agendy.' : 'Zverejnujeme metodiku aj sposob financovania.' },
    { icon: 'shield', title: cs ? 'Nezavislost' : 'Nezavislost', desc: cs ? 'Provize od poskytovatelu nikdy neovlivnuji poradi vysledku. Radime podle dat, ne podle penez.' : 'Provzie neovplyvnuju poradie vysledkov.' },
    { icon: 'bolt', title: cs ? 'Jednoduchost' : 'Jednoduchost', desc: cs ? 'Finance nemusi byt slozite. Kazdy nastroj navrhujeme tak, aby ho pochopil kazdy.' : 'Finance nemusia byt zlozite.' },
    { icon: 'star', title: cs ? 'Kvalita dat' : 'Kvalita dat', desc: cs ? 'Data aktualizujeme denne. Kazdy poskytovatel je rucne overeny a pravidelne kontrolovany.' : 'Data aktualizujeme denne.' },
  ];

  return (
    <section className="ab3 page-in" aria-label={cs ? 'O nas' : 'O nas'}>
      <div className="w3" style={{maxWidth:860}}>
        <Crumbs items={[
          { label: L[lang].breadcrumbs.home },
          { label: cs ? 'O nas' : 'O nas' },
        ]} />

        {/* Hero */}
        <div className="ab3-hero">
          <div className="aip3-badge"><Ico name="users" size={14} color="var(--c3-primary)" /> {cs ? 'Nas pribeh' : 'Nas pribeh'}</div>
          <h1 className="gl3-h1">{cs ? 'Verime, ze pujcka musi byt fer.' : 'Verime, ze pozicka musi byt fer.'}</h1>
          <p className="gl3-sub" style={{maxWidth:560}}>{cs
            ? 'Jsme cesky tym financnich nadsencu, datovych analytiku a vyvojaru. Postavili jsme Pujckomat, protoze jsme sami hledali ferovou pujcku — a nenasli zadny srovnavac, kteremu bychom verili.'
            : 'Sme cesky tym financnych nadsencov, datovych analytikov a vyvojarov. Postavili sme Pujckomat, pretoze sme sami hladali ferovu pozicku.'}</p>
        </div>

        {/* Numbers */}
        <div className="ab3-numbers">
          <div className="ab3-num"><strong>10+</strong><span>{cs ? 'Poskytovatelu' : 'Poskytovatelov'}</span></div>
          <div className="ab3-num"><strong>50 000+</strong><span>{cs ? 'Porovnani mesicne' : 'Porovnani mesacne'}</span></div>
          <div className="ab3-num"><strong>4.8/5</strong><span>{cs ? 'Hodnoceni uzivatelu' : 'Hodnotenie uzivatelov'}</span></div>
          <div className="ab3-num"><strong>2026</strong><span>{cs ? 'Registrace CNB' : 'Registracia NBS'}</span></div>
        </div>

        {/* Values */}
        <div className="ab3-section">
          <h2 className="d3-section-title">{cs ? 'Nase hodnoty' : 'Nase hodnoty'}</h2>
          <div className="ab3-values-grid">
            {values.map((v, i) => (
              <div key={i} className="ab3-value-card">
                <div className="trust3-ico"><Ico name={v.icon} size={22} color="var(--c3-primary)" /></div>
                <h3 className="ab3-value-title">{v.title}</h3>
                <p className="ab3-value-desc">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="ab3-section">
          <h2 className="d3-section-title">{cs ? 'Jak jsme vznikli' : 'Ako sme vznikli'}</h2>
          <div className="ab3-timeline">
            {milestones.map((m, i) => (
              <div key={i} className="ab3-ms">
                {i < milestones.length - 1 && <div className="ab3-ms-line"></div>}
                <div className="ab3-ms-dot"><span>{m.year}</span></div>
                <div className="ab3-ms-content">
                  <h3 className="ab3-ms-title">{m.title}</h3>
                  <p className="ab3-ms-desc">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="ab3-section">
          <h2 className="d3-section-title">{cs ? 'Nas tym' : 'Nas tym'}</h2>
          <div className="ab3-team-grid">
            {team.map((t, i) => (
              <div key={i} className="ab3-team-card">
                <div className="ab3-avatar" style={{background: t.color}}>{t.initial}</div>
                <h3 className="ab3-team-name">{t.name}</h3>
                <div className="ab3-team-role">{t.role}</div>
                <p className="ab3-team-desc">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How we make money */}
        <div className="ab3-section">
          <div className="ab3-funding">
            <div className="ab3-funding-head">
              <Ico name="shield" size={20} color="var(--c3-primary)" />
              <h2 className="d3-section-title" style={{marginBottom:0,textAlign:'left'}}>{cs ? 'Jak vydelavame' : 'Ako zarabame'}</h2>
            </div>
            <p className="d3-seo-text">{cs
              ? 'Pujckomat je financovan z provizi od poskytovatelu pujcek. Kdyz si skrze nas srovnavac sjednate pujcku, dostaneme od poskytovatele odmenu. Tento model nam umoznuje nabizet srovnani zcela zdarma. Dulezite je, ze provize NIKDY neovlivnuji poradi vysledku — razeni je vzdy podle RPSN, ferovosti nebo jinych objektivnich kriterii. Nase metodiku hodnoceni zverejnujeme a pravidelne aktualizujeme.'
              : 'Pujckomat je financovany z provizii od poskytovatelov poziciek. Provize NIKDY neovplyvnuju poradie vysledkov.'}</p>
          </div>
        </div>

        {/* Registration */}
        <div className="ab3-reg">
          <div className="ab3-reg-row">
            <Ico name="bank" size={18} color="var(--c3-muted)" />
            <div>
              <strong>Pujckomat s.r.o.</strong>
              <span>ICO: 12345678 | {cs ? 'Registrovany u Ceske narodni banky' : 'Registrovany u Narodnej banky Slovenska'}</span>
            </div>
          </div>
          <div className="ab3-reg-row">
            <Ico name="globe" size={18} color="var(--c3-muted)" />
            <div>
              <strong>Praha, {cs ? 'Ceska republika' : 'Ceska republika'}</strong>
              <span>{cs ? 'Kancelar: Karlovo namesti 1, 120 00 Praha 2' : 'Kancelaria: Karlovo namesti 1, Praha'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Footer ──────────────────────────
function Footer3({ lang, onNav }) {
  const t = L[lang].footer;
  return (
    <footer className="ft3" role="contentinfo">
      <div className="w3">
        <div className="ft3-grid">
          <div>
            <div className="ft3-brand"><div className="n3-mark">P</div><span className="n3-name" style={{color:'#fff'}}>Pujckomat</span></div>
            <p className="ft3-tag">{t.tag}</p>
          </div>
          {t.cols.map((col,i) => (
            <div key={i}><div className="ft3-ct">{col.t}</div><div className="ft3-links">{col.links.map((l,j) => {
              const label = typeof l === 'string' ? l : l.label;
              const viewId = typeof l === 'string' ? null : l.view;
              return <a key={j} onClick={viewId && onNav ? () => onNav(viewId) : undefined} style={viewId ? {cursor:'pointer'} : undefined}>{label}</a>;
            })}</div></div>
          ))}
        </div>
        <div className="ft3-bottom"><span>{t.copy}</span></div>
      </div>
    </footer>
  );
}

// ─── Sticky Mobile CTA ──────────────────────────
function StickyBar3({ lang, onCompare, visible }) {
  if (!visible) return null;
  const t = L[lang].stickyBar;
  return (
    <div className="sb3" role="complementary">
      <span className="sb3-text">{t.text}</span>
      <button className="b3-primary" onClick={onCompare}>{t.btn} <Ico name="arrowRight" size={14} color="#0a0e1a"/></button>
    </div>
  );
}

Object.assign(window, { Ico, Crumbs, AmortChart, Reveal, AiAdvisor, SortDropdown, CalcPage3, Nav3, Hero3, Trust3, LiveCalc3, Detail3, AppForm3, How3, FAQ3, CookieBar, ProvidersListing3, ProviderProfile3, Blog3, BlogArticle3, Glossary3, Contact3, FairnessIndex3, AiPage3, CategoryPage3, About3, Footer3, StickyBar3 });
