import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import {
  Sparkles, TrendingUp, Key, Layers, Check, Phone, Mail, MapPin, Star, ArrowRight,
  Repeat, Shield, Clock, Award, Leaf, X, BadgeCheck, FileX, ChevronDown,
} from 'lucide-react';

/* lucide-react no incluye iconos de marca; se definen aquí en el mismo estilo */
function InstagramIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function FacebookIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
/* Logo del sitio live (lucide Sparkles + wordmark) con "Cleaning Co." debajo */
function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Sparkles className="w-6 h-6" style={{ fill: 'black' }} />
      <div className="flex items-baseline gap-1.5">
        <span className="text-[22px] font-bold tracking-heading leading-none">Pristine</span>
        <span className="text-[11px] font-w456 text-graphite leading-none whitespace-nowrap">Tassie Cleaning Co.</span>
      </div>
    </div>
  );
}

/* ── FORM HELPERS ─────────────────────────────────────────────────────────── */
function FLabel({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-w456 text-graphite uppercase tracking-wide pl-1">{label}</label>
      {children}
    </div>
  );
}
const base = "w-full bg-mist border border-transparent rounded-full px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink focus:bg-white transition-colors";
function FSel({ label, value, onChange, options, ph = 'Select…' }) {
  return (
    <FLabel label={label}>
      <select value={value || ''} onChange={e => onChange(e.target.value)} className={base}>
        <option value="" disabled>{ph}</option>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
      </select>
    </FLabel>
  );
}
function FInput({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <FLabel label={label}>
      <input type={type} value={value || ''} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} className={base + " placeholder-ash"} />
    </FLabel>
  );
}
function FCheck({ label, checked, onChange, accent }) {
  return (
    <label className={`flex items-start gap-3 cursor-pointer rounded-2xl p-3 hover:bg-mist transition-colors ${accent ? 'bg-mist border border-fog' : ''}`}>
      <input type="checkbox" checked={checked || false} onChange={e => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 cursor-pointer" style={{ accentColor: '#141414' }} />
      <span className="text-sm text-ink leading-tight">{label}</span>
    </label>
  );
}

/* ── FORM PROPERTY STEP ───────────────────────────────────────────────────── */
function PropStep({ svc, d, u }) {
  if (svc === 'residential') return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <FSel label="Bedrooms" value={d.beds} onChange={v => u('beds', v)} options={['Studio', '1', '2', '3', '4', '5+']} />
        <FSel label="Bathrooms" value={d.baths} onChange={v => u('baths', v)} options={['1', '2', '3', '4+']} />
      </div>
      <FSel label="Property Type" value={d.propType} onChange={v => u('propType', v)} options={['House', 'Apartment', 'Unit', 'Townhouse']} />
      <FSel label="Frequency" value={d.freq} onChange={v => u('freq', v)} options={['Weekly', 'Fortnightly', 'Monthly', 'One-time']} />
      <div>
        <p className="text-xs font-w456 text-graphite uppercase tracking-wide mb-2 pl-1">Extras: tick all that apply</p>
        <div className="space-y-1">
          <FCheck label="Inside oven clean" checked={d.oven} onChange={v => u('oven', v)} />
          <FCheck label="Inside fridge clean" checked={d.fridge} onChange={v => u('fridge', v)} />
          <FCheck label="Interior windows" checked={d.windows} onChange={v => u('windows', v)} />
          <FCheck label="Ironing service" checked={d.ironing} onChange={v => u('ironing', v)} />
        </div>
      </div>
    </div>
  );
  if (svc === 'presale') return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <FSel label="Bedrooms" value={d.beds} onChange={v => u('beds', v)} options={['1', '2', '3', '4', '5+']} />
        <FSel label="Bathrooms" value={d.baths} onChange={v => u('baths', v)} options={['1', '2', '3', '4+']} />
      </div>
      <FSel label="Property Type" value={d.propType} onChange={v => u('propType', v)} options={['House', 'Apartment', 'Unit', 'Townhouse']} />
      <FInput label="Open Home / Listing Date" value={d.listDate} onChange={v => u('listDate', v)} type="date" />
      <FSel label="Property Condition" value={d.condition} onChange={v => u('condition', v)} options={['Good, light touch-up', 'Average, standard clean', 'Needs deep clean']} />
      <FCheck label="Include exterior areas (garage, paths, outdoor)" checked={d.exterior} onChange={v => u('exterior', v)} />
      <FCheck label="Working with a real estate agent or staging company?" checked={d.staging} onChange={v => u('staging', v)} />
    </div>
  );
  if (svc === 'endoflease') return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <FSel label="Bedrooms" value={d.beds} onChange={v => u('beds', v)} options={['Studio', '1', '2', '3', '4', '5+']} />
        <FSel label="Bathrooms" value={d.baths} onChange={v => u('baths', v)} options={['1', '2', '3', '4+']} />
        <FSel label="Living Areas" value={d.living} onChange={v => u('living', v)} options={['1', '2', '3+']} />
      </div>
      <FSel label="Property Type" value={d.propType} onChange={v => u('propType', v)} options={['House', 'Apartment', 'Unit', 'Townhouse']} />
      <FSel label="Furnished?" value={d.furnished} onChange={v => u('furnished', v)} options={['Unfurnished', 'Semi-furnished', 'Fully furnished']} />
      <div>
        <p className="text-xs font-w456 text-graphite uppercase tracking-wide mb-2 pl-1">Extras: tick all that apply</p>
        <div className="space-y-1">
          <FCheck label="Balcony / outdoor area" checked={d.balcony} onChange={v => u('balcony', v)} />
          <FCheck label="Garage / carport" checked={d.garage} onChange={v => u('garage', v)} />
          <FCheck label="Oven deep clean" checked={d.oven} onChange={v => u('oven', v)} />
          <FCheck label="Pets were in the property" checked={d.pets} onChange={v => u('pets', v)} />
        </div>
      </div>
      <FCheck label="Add carpet steam clean (quoted separately per room)" checked={d.carpetSteam} onChange={v => u('carpetSteam', v)} accent={true} />
    </div>
  );
  if (svc === 'carpet') return (
    <div className="space-y-4">
      <FSel label="Number of Carpeted Rooms" value={d.rooms} onChange={v => u('rooms', v)} options={['1', '2', '3', '4', '5', '6+']} />
      <FSel label="Main Issue" value={d.issue} onChange={v => u('issue', v)} options={['General clean', 'Stains', 'Pet odour', 'Stains & odour', 'Overall deep clean']} />
      <FCheck label="Pets in or have been in the property?" checked={d.petOdor} onChange={v => u('petOdor', v)} />
    </div>
  );
  return null;
}

function buildExtras(svc, d) {
  const lines = [];
  if (d.address) lines.push(`Address: ${d.address}`);
  if (svc === 'residential') {
    if (d.beds)     lines.push(`Bedrooms: ${d.beds}`);
    if (d.baths)    lines.push(`Bathrooms: ${d.baths}`);
    if (d.propType) lines.push(`Property Type: ${d.propType}`);
    if (d.freq)     lines.push(`Frequency: ${d.freq}`);
    if (d.oven)     lines.push('Extra: Inside oven clean ✓');
    if (d.fridge)   lines.push('Extra: Inside fridge clean ✓');
    if (d.windows)  lines.push('Extra: Interior windows ✓');
    if (d.ironing)  lines.push('Extra: Ironing service ✓');
  } else if (svc === 'presale') {
    if (d.beds)      lines.push(`Bedrooms: ${d.beds}`);
    if (d.baths)     lines.push(`Bathrooms: ${d.baths}`);
    if (d.propType)  lines.push(`Property Type: ${d.propType}`);
    if (d.listDate)  lines.push(`Open Home / Listing Date: ${d.listDate}`);
    if (d.condition) lines.push(`Condition: ${d.condition}`);
    if (d.exterior)  lines.push('Extra: Include exterior areas ✓');
    if (d.staging)   lines.push('Extra: Working with agent / staging company ✓');
  } else if (svc === 'endoflease') {
    if (d.beds)        lines.push(`Bedrooms: ${d.beds}`);
    if (d.baths)       lines.push(`Bathrooms: ${d.baths}`);
    if (d.living)      lines.push(`Living Areas: ${d.living}`);
    if (d.propType)    lines.push(`Property Type: ${d.propType}`);
    if (d.furnished)   lines.push(`Furnished: ${d.furnished}`);
    if (d.balcony)     lines.push('Extra: Balcony / outdoor area ✓');
    if (d.garage)      lines.push('Extra: Garage / carport ✓');
    if (d.oven)        lines.push('Extra: Oven deep clean ✓');
    if (d.pets)        lines.push('Extra: Pets were in property ✓');
    if (d.carpetSteam) lines.push('Extra: Carpet steam clean ✓');
  } else if (svc === 'carpet') {
    if (d.rooms)   lines.push(`Carpeted Rooms: ${d.rooms}`);
    if (d.issue)   lines.push(`Main Issue: ${d.issue}`);
    if (d.petOdor) lines.push('Extra: Pets in property ✓');
  }
  return lines.length ? lines.join('\n') : 'None';
}

/* ── SERVICES DATA ────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    id: 'residential', label: 'Residential', title: 'Residential Cleaning', Icon: Repeat, tag: 'Most requested',
    desc: 'Weekly, fortnightly, or one-off cleans tailored to your home and routine. Consistent, reliable service you can count on every single visit.',
    items: ['Kitchen, bathrooms & living areas', 'Floors vacuumed & mopped', 'Dusting & surface wipe-down', 'Beds made (on request)', 'Same trusted cleaner each visit'],
    note: 'Weekly, fortnightly or one-off',
  },
  {
    id: 'carpet', label: 'Carpet Steam', title: 'Carpet Steam Cleaning', Icon: Layers, tag: null,
    desc: 'Professional steam cleaning removes deep stains, allergens, and pet odours. Your carpets look brand new, with fast dry times.',
    items: ['Pre-treatment spray', 'Hot water extraction', 'Deodorise & sanitise', 'Speed dry finish'],
    note: 'Average dry time: 2 to 4 hours',
  },
  {
    id: 'presale', label: 'Pre-Sale', title: 'Pre-Sale Clean', Icon: TrendingUp, tag: 'High impact',
    desc: 'First impressions sell homes. A deep presentation clean that maximises buyer appeal. Perfect before open homes, photos, or listing day.',
    items: ['Deep clean all surfaces & fixtures', 'Windows polished inside & out', 'Carpets refreshed & deodorised', 'Kitchen & bathrooms spotless', 'Garage & outdoor areas', 'Scent-neutral, buyer-ready finish'],
    note: 'Works with agents and staging companies',
  },
  {
    id: 'endoflease', label: 'End of Lease', title: 'End of Lease', Icon: Key, tag: 'Bond-back guarantee',
    desc: 'Comprehensive bond-back cleaning meeting real estate agent standards. Carpet steam clean available as an add-on.',
    items: ['Oven & kitchen deep clean', 'Bathroom & toilet sanitised', 'Windows inside & out', 'Walls & skirting boards', 'Garage & outdoor areas', 'Carpet steam clean available'],
    note: 'Real estate approved checklist',
  },
];

// Google Business Profile: enlace permanente (cid) y enlace directo para dejar reseña
const GOOGLE_PROFILE = 'https://maps.google.com/?cid=14281976878887091409';
const GOOGLE_REVIEW = 'https://g.page/r/CdE8aFxNxjPGEAI/review';

const GALLERY = [
  { src: '/gallery/hero-kitchen-routine.webp',  title: 'Routine kitchen clean',     alt: 'Routine kitchen clean, Hobart' },
  { src: '/gallery/oven-clean.webp',            title: 'Oven deep clean',           alt: 'Before and after oven deep clean, Hobart', ba: true },
  { src: '/gallery/hero-bathroom-2.webp',       title: 'Ensuite & shower clean',    alt: 'Ensuite and shower clean, Hobart' },
  { src: '/gallery/presentation-kitchen.webp',  title: 'Full presentation clean',   alt: 'Presentation-ready kitchen clean, Hobart' },
  { src: '/gallery/driveway-clean.webp',        title: 'Driveway clean',            alt: 'Before and after driveway clean, Hobart', ba: true },
  { src: '/gallery/presentation-bathroom.webp', title: 'Presentation bathroom',     alt: 'Presentation-ready bathroom clean, Hobart' },
];

/* ── QUOTE MODAL ──────────────────────────────────────────────────────────── */
function QuoteModal({ onClose, initialSvc }) {
  const [step, setStep] = useState(initialSvc ? 2 : 1);
  const [svc, setSvc] = useState(initialSvc || '');
  const [d, setD] = useState({});
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const u = (k, v) => setD(p => ({ ...p, [k]: v }));
  const sel = SERVICES.find(s => s.id === svc);
  const canSend = d.name && d.phone && d.email;

  const handleSend = async () => {
    if (!canSend || sending) return;
    setSending(true);
    setSendError('');
    try {
      await emailjs.send('service_ptzeiln', 'template_lsdeywj', {
        service : sel ? sel.title : svc,
        name    : d.name,
        phone   : d.phone,
        email   : d.email,
        date    : d.date   || 'Not specified',
        extras  : buildExtras(svc, d),
        notes   : d.notes  || 'None',
      }, { publicKey: 'pAG7Xde322ReZPvCf' });
      setDone(true);
    } catch (err) {
      setSendError('Something went wrong. Please try again or call us on 0450 349 425.');
    } finally {
      setSending(false);
    }
  };

  const dialogRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    // keyboard access: focus moves into the dialog, Esc closes it, focus returns to the button that opened it
    const opener = document.activeElement;
    dialogRef.current?.focus();
    const onKey = e => { if (e.key === 'Escape') closeRef.current(); };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKey);
      opener?.focus?.();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center animate-fade-in-overlay"
      style={{ backgroundColor: 'rgba(20,20,20,0.45)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="quote-title" tabIndex={-1}
        className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg sm:mx-4 max-h-[92vh] flex flex-col shadow-float outline-none">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-fog flex-shrink-0">
          <div>
            <h2 id="quote-title" className="text-xl font-semibold tracking-heading text-ink">Get your free quote</h2>
            {!done && (
              <div className="flex items-center gap-2 mt-2">
                {['Service', 'Property', 'Your details'].map((s, i) => (
                  <React.Fragment key={s}>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-semibold transition-colors ${step >= i + 1 ? 'bg-ink text-white' : 'bg-mist text-graphite'}`}>
                        {step > i + 1 ? '✓' : i + 1}
                      </div>
                      <span className={`text-xs ${step === i + 1 ? 'text-ink font-w456' : 'text-graphite'}`}>{s}</span>
                    </div>
                    {i < 2 && <div className="w-4 h-px bg-fog" />}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
          <button onClick={onClose} aria-label="Close" className="w-9 h-9 rounded-full bg-mist flex items-center justify-center hover:bg-fog transition-colors">
            <X className="w-4 h-4 text-ink" strokeWidth={1.5} />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {done ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-ink rounded-full flex items-center justify-center mx-auto mb-5">
                <Check className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <h3 className="text-2xl font-semibold tracking-heading text-ink mb-2">Request sent</h3>
              <p className="text-graphite mb-4">Thanks {d.name ? d.name.split(' ')[0] : ''}! We'll review your details and get back to you within a few hours.</p>
              <p className="text-sm text-graphite">Questions? Call <a href="tel:0450349425" onClick={() => trackEvent('phone_click')} className="font-semibold text-ink">0450 349 425</a></p>
            </div>
          ) : step === 1 ? (
            <div>
              <p className="text-sm text-graphite mb-4">What service do you need?</p>
              <div className="grid grid-cols-2 gap-3">
                {SERVICES.map(s => (
                  <button key={s.id} onClick={() => { setSvc(s.id); setStep(2); }}
                    className={`flex flex-col items-start gap-3 p-4 rounded-2xl border text-left transition-colors ${svc === s.id ? 'border-ink' : 'border-fog hover:border-ash'}`}>
                    <div className="w-9 h-9 bg-mist rounded-xl flex items-center justify-center">
                      <s.Icon className="w-4 h-4 text-ink" strokeWidth={1.5} />
                    </div>
                    <span className="text-sm font-w456 text-ink">{s.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : step === 2 ? (
            <div className="space-y-4">
              {sel && (
                <div className="inline-flex items-center gap-2 bg-mist rounded-full px-3 py-1.5">
                  <sel.Icon className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span className="text-xs font-w456">{sel.title}</span>
                </div>
              )}
              <FInput label="Property Address" value={d.address} onChange={v => u('address', v)} placeholder="e.g. 12 Collins St, Hobart TAS 7000" />
              <PropStep svc={svc} d={d} u={u} />
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-graphite">Almost done! Just your contact details.</p>
              <FInput label="Full Name" value={d.name} onChange={v => u('name', v)} placeholder="Your full name" />
              <div className="grid grid-cols-2 gap-3">
                <FInput label="Phone" value={d.phone} onChange={v => u('phone', v)} type="tel" placeholder="0400 000 000" />
                <FInput label="Email" value={d.email} onChange={v => u('email', v)} type="email" placeholder="you@email.com" />
              </div>
              <FInput label="Preferred Date" value={d.date} onChange={v => u('date', v)} type="date" />
              <FLabel label="Additional Notes (optional)">
                <textarea value={d.notes || ''} onChange={e => u('notes', e.target.value)} rows={3}
                  placeholder="Anything else we should know…"
                  className="w-full bg-mist border border-transparent rounded-2xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-ink focus:bg-white transition-colors resize-none placeholder-ash" />
              </FLabel>
            </div>
          )}
        </div>

        {/* Footer */}
        {!done && (
          <div className="px-6 py-4 border-t border-fog flex-shrink-0">
            {step === 1 ? (
              <p className="text-xs text-center text-graphite">Select a service above to continue</p>
            ) : (
              <div className="flex gap-3">
                <button onClick={() => setStep(s => s - 1)}
                  className="flex-1 border border-ink text-ink py-3 rounded-full text-sm font-semibold hover:bg-mist transition-colors">
                  Back
                </button>
                {step < 3 ? (
                  <button onClick={() => setStep(s => s + 1)}
                    className="flex-1 bg-ink text-white py-3 rounded-full text-sm font-semibold hover:bg-black transition-colors">
                    Continue
                  </button>
                ) : (
                  <button onClick={handleSend}
                    disabled={!canSend || sending}
                    className={`flex-1 py-3 rounded-full text-sm font-semibold transition-colors ${canSend && !sending ? 'bg-ink text-white hover:bg-black' : 'bg-mist text-ash cursor-not-allowed'}`}>
                    {sending ? 'Sending…' : 'Send quote request'}
                  </button>
                )}
              </div>
            )}
            {sendError && <p className="text-xs text-red-600 text-center mt-2">{sendError}</p>}
            {step === 3 && !sendError && (
              <p className="text-xs text-center text-graphite mt-3">
                We'll only use your details to reply to your quote. <a href="./privacy/" target="_blank" rel="noopener" className="underline hover:text-ink">Privacy Policy</a>
              </p>
            )}
          </div>
        )}
        {done && (
          <div className="px-6 py-4 border-t border-fog">
            <button onClick={onClose} className="w-full bg-ink text-white py-3 rounded-full text-sm font-semibold hover:bg-black transition-colors">Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── ANALYTICS ────────────────────────────────────────────────────────────── */
// Fires a GA4 event if gtag is loaded (no-op otherwise, e.g. in dev or if a
// blocker strips it) — keeps conversion tracking from ever breaking the UI.
function trackEvent(name, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', name, params);
  }
}

/* ── SHARED UI ────────────────────────────────────────────────────────────── */
const btnFilled = "inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-ink text-white text-[15px] font-semibold hover:bg-black transition-colors whitespace-nowrap";
const btnOutline = "inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full border border-ink text-ink text-[15px] font-semibold hover:bg-mist transition-colors whitespace-nowrap";

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const delay = ms => ({ '--reveal-delay': `${ms}ms` });

function SectionHead({ title, sub, action }) {
  return (
    <div className="reveal flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 md:mb-12">
      <div className="max-w-3xl">
        <h2 className="text-4xl md:text-[56px] font-w652 tracking-display leading-[1.05] text-ink">{title}</h2>
        {sub && <p className="text-lg font-w440 text-graphite mt-4 leading-relaxed">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

/* ── HOW IT WORKS DATA ────────────────────────────────────────────────────── */
const STEPS = [
  { n: '01', title: 'Request your quote', desc: 'Fill in our quick form with your property details and preferred date. Takes under 2 minutes, no commitment required.' },
  { n: '02', title: 'Receive your quote', desc: 'We review your request and send a detailed, transparent quote within a few hours. No hidden fees, no surprises.' },
  { n: '03', title: 'We show up & deliver', desc: 'Our fully insured team arrives on time and cleans to the highest professional standard, every time, without exception.' },
  { n: '04', title: '100% satisfaction guarantee', desc: "Not happy with any part of the clean? We return within 24 hours and fix it at no cost. Guaranteed, no arguments." },
];

function IncludedList({ items }) {
  return (
    <ul className="space-y-4">
      {items.map(it => (
        <li key={it} className="flex items-center gap-3 text-[15px] text-ink">
          <span className="w-6 h-6 rounded-full bg-white border border-fog flex items-center justify-center flex-shrink-0">
            <Check className="w-3.5 h-3.5" strokeWidth={2} />
          </span>
          {it}
        </li>
      ))}
    </ul>
  );
}

/* ── APP ──────────────────────────────────────────────────────────────────── */
export default function App() {
  const [tab, setTab] = useState('residential');
  const [mOpen, setMOpen] = useState('residential'); // acordeón de servicios en móvil
  const [step, setStep] = useState(0);              // paso visible del slider "How it works" en móvil
  const [form, setForm] = useState(null); // null = closed, '' = open on step 1, id = open on that service
  const open = (svcId = '') => { trackEvent('generate_lead', { method: 'quote_form' }); setForm(typeof svcId === 'string' ? svcId : ''); };
  const svc = SERVICES.find(s => s.id === tab);

  // Calcula qué tarjeta de un slider horizontal está a la vista (gap de 16px)
  const trackSlide = setter => e => {
    const el = e.currentTarget;
    const card = el.firstElementChild;
    if (!card) return;
    setter(Math.round(el.scrollLeft / (card.offsetWidth + 16)));
  };
  const onStepsScroll = trackSlide(setStep);

  // Links internos (#seccion): desplazamiento suave con aceleración y frenado,
  // duración según la distancia y compensando el header fijo
  useEffect(() => {
    let raf = null;
    const cancel = () => { if (raf) cancelAnimationFrame(raf); raf = null; };
    const ease = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
    const onClick = e => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      const el = id && document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const navH = document.querySelector('nav')?.offsetHeight || 0;
      const startY = window.scrollY;
      const targetY = Math.max(0, el.getBoundingClientRect().top + startY - navH);
      const dist = targetY - startY;
      history.replaceState(null, '', '#' + id);
      cancel();
      if (prefersReducedMotion() || Math.abs(dist) < 2) { window.scrollTo(0, targetY); return; }
      const dur = Math.min(1500, Math.max(750, Math.abs(dist) * 0.4));
      const t0 = performance.now();
      // Se usa performance.now() (no el timestamp de rAF, que puede ir detrás de t0)
      const tick = () => {
        const k = Math.min(1, Math.max(0, (performance.now() - t0) / dur));
        window.scrollTo(0, startY + dist * ease(k));
        raf = k < 1 ? requestAnimationFrame(tick) : null;
      };
      raf = requestAnimationFrame(tick);
    };
    document.addEventListener('click', onClick);
    // Si la persona toca o usa la rueda durante el recorrido, se le devuelve el control
    window.addEventListener('wheel', cancel, { passive: true });
    window.addEventListener('touchstart', cancel, { passive: true });
    return () => {
      cancel();
      document.removeEventListener('click', onClick);
      window.removeEventListener('wheel', cancel);
      window.removeEventListener('touchstart', cancel);
    };
  }, []);

  // Bloques con .reveal aparecen (fundido + subida leve) al entrar en pantalla
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window) || prefersReducedMotion()) {
      els.forEach(el => el.classList.add('is-visible'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="bg-white min-h-screen text-ink">
      {form !== null && <QuoteModal initialSvc={form} onClose={() => setForm(null)} />}

      {/* NAV (igual al sitio live) */}
      <nav className="animate-fade-in-up sticky top-0 bg-white/90 backdrop-blur-sm z-40 border-b border-gray-50 px-6 py-4"
        style={{ opacity: 0, animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Logo />
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm text-gray-700 hover:text-black transition-colors">Services</a>
            <a href="#how-it-works" className="text-sm text-gray-700 hover:text-black transition-colors">How It Works</a>
            <a href="#why" className="text-sm text-gray-700 hover:text-black transition-colors">About</a>
            <a href="#contact" className="text-sm text-gray-700 hover:text-black transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:0450349425" onClick={() => trackEvent('phone_click')} className="hidden md:flex items-center gap-1.5 text-sm text-gray-700 hover:text-black transition-colors whitespace-nowrap">
              <Phone className="w-4 h-4" /> 0450 349 425
            </a>
            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-gray-200">
              <a href="https://www.instagram.com/pristine.hobart/" target="_blank" rel="noopener noreferrer" aria-label="Pristine Tassie Cleaning Co. on Instagram"
                className="text-gray-500 hover:text-black transition-colors">
                <InstagramIcon className="w-4 h-4" strokeWidth="2" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61592442795488" target="_blank" rel="noopener noreferrer" aria-label="Pristine Tassie Cleaning Co. on Facebook"
                className="text-gray-500 hover:text-black transition-colors">
                <FacebookIcon className="w-4 h-4" strokeWidth="2" />
              </a>
            </div>
            <button onClick={() => open()} className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Get Free Quote
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="top" className="px-6 pt-20 md:pt-28 pb-16 max-w-7xl mx-auto text-center">
        <p className="animate-fade-in-up text-sm font-w456 text-graphite mb-6" style={{ opacity: 0, animationDelay: '0.15s' }}>
          4+ years professional cleaning experience in Australia
        </p>
        <h1 className="animate-fade-in-up text-[44px] sm:text-6xl md:text-[80px] font-w652 tracking-display leading-[1.02] text-ink"
          style={{ opacity: 0, animationDelay: '0.2s' }}>
          Clean spaces.<br />
          <span className="bg-gradient-to-r from-ink via-graphite to-ash bg-clip-text text-transparent">Perfect results.</span>
        </h1>
        <p className="animate-fade-in-up text-lg md:text-xl font-w440 text-graphite mt-6 max-w-[560px] mx-auto leading-relaxed text-balance"
          style={{ opacity: 0, animationDelay: '0.3s' }}>
          Residential homes, carpet steam cleaning, pre-sale presentations and end of lease. Across Hobart and Greater Tasmania.
        </p>
        <div className="animate-fade-in-up mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
          style={{ opacity: 0, animationDelay: '0.4s' }}>
          <button onClick={() => open()} className={btnFilled}>Get free quote</button>
          <a href="tel:0450349425" onClick={() => trackEvent('phone_click')} className={btnOutline}>
            <Phone className="w-4 h-4" strokeWidth={1.5} /> Call 0450 349 425
          </a>
        </div>

        {/* Trust bar */}
        <div className="animate-fade-in-up mt-16 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          style={{ opacity: 0, animationDelay: '0.5s' }}>
          {[
            { Icon: Shield,     t: 'Fully insured' },
            { Icon: BadgeCheck, t: 'Police checked' },
            { Icon: Award,      t: '100% satisfaction guarantee' },
            { Icon: FileX,      t: 'No lock-in contracts' },
          ].map(({ Icon, t }) => (
            <span key={t} className="flex items-center gap-2 text-sm font-w456 text-graphite">
              <Icon className="w-4 h-4" strokeWidth={1.5} /> {t}
            </span>
          ))}
        </div>
      </section>

      {/* OUR WORK: grilla escalonada, sin marcos */}
      <section id="work" className="px-6 pt-20 pb-28 md:pb-36 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <SectionHead title="Recent work in Hobart" />
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-3 gap-y-8 md:gap-x-6 md:gap-y-12">
            {GALLERY.map((g, i) => (
              <figure key={g.src}
                className={`${i % 2 === 1 ? 'translate-y-10' : ''} ${i % 3 === 1 ? 'md:translate-y-16' : 'md:translate-y-0'}`}>
                <div className="reveal" style={delay((i % 3) * 120)}>
                  <div className="relative overflow-hidden rounded-2xl md:rounded-3xl">
                    <img src={g.src} alt={g.alt} loading="lazy"
                      className="w-full aspect-[4/5] object-cover transition-transform duration-500 hover:scale-[1.03]" />
                    {g.ba && <span className="absolute top-3 left-3 bg-ink/80 backdrop-blur-sm text-white text-[11px] md:text-xs font-semibold px-2.5 py-1 rounded-full">Before & after</span>}
                  </div>
                  <figcaption className="pt-3 px-1 text-sm font-w456 text-ink">{g.title}</figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="px-6 py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <SectionHead title="Everything you need, spotlessly delivered" sub="Four services, one standard. Pick yours to see what's included." />

          {/* Móvil: acordeón, los 4 servicios visibles sin deslizar */}
          <div className="reveal md:hidden space-y-3">
            {SERVICES.map(s => {
              const isOpen = mOpen === s.id;
              return (
                <div key={s.id} className={`rounded-3xl border transition-colors ${isOpen ? 'border-ink' : 'border-fog'}`}>
                  <button onClick={() => setMOpen(isOpen ? null : s.id)} aria-expanded={isOpen}
                    className="w-full flex items-center gap-3 p-4 text-left">
                    <span className={`w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? 'bg-ink text-white' : 'bg-mist text-ink'}`}>
                      <s.Icon className="w-5 h-5" strokeWidth={1.5} />
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-lg font-semibold tracking-heading text-ink leading-tight">{s.title}</span>
                      {s.tag && <span className="block text-xs text-graphite mt-0.5">{s.tag}</span>}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-ink transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} strokeWidth={1.5} />
                  </button>
                  {isOpen && (
                    <div className="animate-fade-in-overlay px-4 pb-5">
                      <p className="text-[15px] font-w440 text-graphite leading-relaxed">{s.desc}</p>
                      <div className="bg-mist rounded-2xl p-5 mt-5">
                        <p className="text-xs font-w456 text-graphite uppercase tracking-wide mb-4">What's included</p>
                        <IncludedList items={s.items} />
                      </div>
                      <button onClick={() => open(s.id)} className={btnFilled + ' w-full mt-5'}>
                        Quote my {s.label.toLowerCase()} clean <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Escritorio: fila de píldoras + tarjeta de detalle */}
          <div className="reveal hidden md:block">
            <div className="flex gap-2 mb-6">
              {SERVICES.map(s => (
                <button key={s.id} onClick={() => setTab(s.id)}
                  className={`flex items-center gap-1.5 h-10 px-4 rounded-full text-sm font-w440 border transition-colors whitespace-nowrap ${tab === s.id ? 'bg-ink border-ink text-white' : 'border-ink text-ink hover:bg-mist'}`}>
                  <s.Icon className="w-3.5 h-3.5" strokeWidth={1.5} />{s.label}
                </button>
              ))}
            </div>
            <div key={tab} className="animate-fade-in-overlay grid grid-cols-2 gap-12 rounded-3xl border border-fog p-10">
              <div className="flex flex-col">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-2xl border border-fog flex items-center justify-center">
                    <svc.Icon className="w-5 h-5 text-ink" strokeWidth={1.5} />
                  </div>
                  {svc.tag && <span className="text-xs font-semibold bg-mist text-ink px-3 py-1.5 rounded-full">{svc.tag}</span>}
                </div>
                <h3 className="text-[40px] font-w652 tracking-display leading-[1.08] text-ink">{svc.title}</h3>
                <p className="text-lg font-w440 text-graphite mt-4 leading-relaxed">{svc.desc}</p>
                <p className="text-sm text-graphite mt-4">{svc.note}</p>
                <div className="mt-auto pt-8">
                  <button onClick={() => open(svc.id)} className={btnFilled}>
                    Quote my {svc.label.toLowerCase()} clean <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
              <div className="bg-mist rounded-2xl p-8">
                <p className="text-xs font-w456 text-graphite uppercase tracking-wide mb-5">What's included</p>
                <IncludedList items={svc.items} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-y-10">
          {[
            { v: '4+',   l: 'Years professional experience' },
            { v: '100%', l: 'Satisfaction guarantee' },
            { v: '24h',  l: 'Re-clean if anything is missed' },
            { v: '$0',   l: 'Bond disputes' },
          ].map((s, i) => (
            <div key={s.v} style={delay(i * 100)} className={`reveal px-4 md:px-8 ${i % 2 === 1 ? 'border-l border-fog' : ''} ${i === 2 ? 'md:border-l md:border-fog' : ''}`}>
              <p className="text-5xl md:text-[56px] font-w652 tracking-display leading-none text-ink">{s.v}</p>
              <p className="text-sm md:text-base font-w440 text-graphite mt-3 leading-snug">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS: slider en móvil (como el sitio live), grilla en escritorio */}
      <section id="how-it-works" className="px-6 py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto">
          <SectionHead title="How it works" sub="From your first message to a spotless space: here's what to expect."
            action={<button onClick={() => open()} className={btnFilled + ' hidden md:inline-flex'}>Start with a free quote</button>} />
          <div onScroll={onStepsScroll}
            className="flex gap-4 overflow-x-auto pb-2 snap-x snap-mandatory -mx-6 px-6 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {STEPS.map((s, i) => (
              <div key={s.n} style={delay(i * 110)} className="reveal flex-shrink-0 w-[78%] sm:w-72 snap-center md:w-auto rounded-3xl border border-fog p-6 md:p-7">
                <span className="inline-flex w-12 h-12 rounded-2xl bg-ink text-white items-center justify-center text-sm font-semibold tracking-wide">{s.n}</span>
                <h3 className="text-xl font-semibold tracking-heading text-ink mt-10 mb-3">{s.title}</h3>
                <p className="text-[15px] text-graphite leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          {/* Indicador de paso (solo móvil) */}
          <div className="md:hidden flex items-center justify-center gap-1.5 mt-6">
            {STEPS.map((s, i) => (
              <span key={s.n} className={`h-1.5 rounded-full transition-all duration-300 ${step === i ? 'w-6 bg-ink' : 'w-1.5 bg-silver'}`} />
            ))}
          </div>
          <div className="md:hidden mt-8 text-center">
            <button onClick={() => open()} className={btnFilled}>Start with a free quote</button>
          </div>
        </div>
      </section>

      {/* WHY PRISTINE */}
      <section id="why" className="px-6 py-20 scroll-mt-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16">
          <h2 className="reveal text-4xl md:text-[56px] font-w652 tracking-display leading-[1.05] text-ink">Why choose Pristine</h2>
          <div className="reveal" style={delay(150)}>
            <p className="text-lg font-w440 text-graphite leading-relaxed mb-8">
              With over 4 years of professional cleaning experience across Australia, Pristine is now bringing that same standard of excellence to Hobart and Greater Tasmania. From homeowners to real estate agents, all backed by consistent results, no lock-in contracts, no hidden fees.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { Icon: Leaf,   title: 'Eco-friendly options on request' },
                { Icon: Clock,  title: 'Flexible scheduling' },
                { Icon: Shield, title: 'Fully insured' },
                { Icon: Award,  title: 'Satisfaction guarantee' },
              ].map(f => (
                <div key={f.title} className="flex items-center gap-3 rounded-2xl border border-fog px-4 py-3.5">
                  <f.Icon className="w-5 h-5 text-ink flex-shrink-0" strokeWidth={1.5} />
                  <span className="text-sm font-w456 text-ink">{f.title}</span>
                </div>
              ))}
            </div>
            <button onClick={() => open()} className={btnFilled}>Get your free quote</button>
          </div>
        </div>
      </section>

      {/* REVIEWS: sin reseñas reales todavía, se invita a dejar la primera */}
      <section className="px-6 py-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 md:gap-16 md:items-end">
          <h2 className="reveal text-4xl md:text-[56px] font-w652 tracking-display leading-[1.05] text-ink">
            New to Hobart.<br />
            <span className="bg-gradient-to-r from-ink via-graphite to-ash bg-clip-text text-transparent">Not new to cleaning.</span>
          </h2>
          <div className="reveal" style={delay(150)}>
            <p className="text-lg font-w440 text-graphite leading-relaxed">
              We're building our name in Hobart one home at a time, with 4+ years of professional experience behind every clean. Every job is backed by our 100% satisfaction guarantee: miss a spot, and we're back within 24 hours to fix it, free.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button onClick={() => open()} className={btnFilled}>Get free quote</button>
              <a href={GOOGLE_REVIEW} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('review_click')} className={btnOutline}>
                <Star className="w-4 h-4" strokeWidth={1.5} /> Leave us a review
              </a>
            </div>
            <p className="text-sm text-graphite mt-4">Already cleaned with us? A quick Google review helps other locals find us.</p>
          </div>
        </div>
      </section>

      {/* CTA + fundador */}
      <section id="contact" className="px-6 py-20 scroll-mt-16">
        <div className="reveal max-w-7xl mx-auto bg-mist rounded-3xl p-6 sm:p-10 md:p-14 grid md:grid-cols-[1.15fr_0.85fr] gap-10 md:gap-14 items-center">
          <div>
            <h2 className="text-4xl md:text-[64px] font-w652 tracking-display leading-[1.02] text-ink">Ready for a spotless space?</h2>
            <p className="text-lg font-w440 text-graphite mt-5 max-w-[480px] leading-relaxed">Free, no-obligation quotes. We service Hobart and all of Greater Tasmania.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <button onClick={() => open()} className={btnFilled}>Get free quote</button>
              <a href="tel:0450349425" onClick={() => trackEvent('phone_click')} className={btnOutline}>
                <Phone className="w-4 h-4" strokeWidth={1.5} /> Call 0450 349 425
              </a>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row gap-3 sm:gap-8 text-sm text-graphite">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" strokeWidth={1.5} /><span>Hobart & Greater Tasmania</span>
              </div>
              <a href="mailto:pristine.hobart@gmail.com" onClick={() => trackEvent('email_click')}
                className="flex items-center gap-2 hover:text-ink transition-colors">
                <Mail className="w-4 h-4" strokeWidth={1.5} /><span>pristine.hobart@gmail.com</span>
              </a>
            </div>
          </div>
          <figure className="relative">
            <img src="/founders.jpg" alt="Ginna and Santiago, founders of Pristine Tassie Cleaning Co., in their Pristine uniforms" loading="lazy"
              className="w-full aspect-square md:aspect-[4/5] object-cover rounded-3xl" style={{ objectPosition: 'center 38%' }} />
            <figcaption className="absolute left-4 bottom-4 bg-white/90 backdrop-blur-sm rounded-full pl-4 pr-5 py-2.5">
              <span className="block text-sm font-semibold text-ink leading-tight">Ginna &amp; Santiago</span>
              <span className="block text-xs text-graphite leading-tight">Founders, Pristine Tassie Cleaning Co.</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 pt-12 pb-10 border-t border-fog">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
          <div className="max-w-xs">
            <div className="mb-3"><Logo /></div>
            <p className="text-sm text-graphite leading-relaxed">Hobart's premium cleaning service for residential homes, carpets, pre-sale presentations and end of lease properties across Tasmania.</p>
            <div className="flex items-center gap-2 mt-5">
              <a href="https://www.instagram.com/pristine.hobart/" target="_blank" rel="noopener noreferrer" aria-label="Pristine Tassie Cleaning Co. on Instagram"
                className="w-10 h-10 rounded-full border border-fog flex items-center justify-center text-ink hover:border-ink transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61592442795488" target="_blank" rel="noopener noreferrer" aria-label="Pristine Tassie Cleaning Co. on Facebook"
                className="w-10 h-10 rounded-full border border-fog flex items-center justify-center text-ink hover:border-ink transition-colors">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href={GOOGLE_PROFILE} target="_blank" rel="noopener noreferrer" aria-label="Pristine Tassie Cleaning Co. on Google Maps"
                className="w-10 h-10 rounded-full border border-fog flex items-center justify-center text-ink hover:border-ink transition-colors">
                <MapPin className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 text-sm">
            <div>
              <p className="text-xs font-w456 text-graphite uppercase tracking-wide mb-4">Services</p>
              <ul className="space-y-2.5">
                {SERVICES.map(s => (
                  <li key={s.id}><button onClick={() => open(s.id)} className="font-w440 text-ink hover:text-graphite transition-colors text-left">{s.title}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-w456 text-graphite uppercase tracking-wide mb-4">Service areas</p>
              <ul className="space-y-2.5 font-w440 text-ink">
                {['Hobart CBD', 'Sandy Bay', 'Battery Point', 'Kingston', 'Glenorchy', 'Greater Tasmania'].map(a => <li key={a}>{a}</li>)}
              </ul>
            </div>
            <div>
              <p className="text-xs font-w456 text-graphite uppercase tracking-wide mb-4">Company</p>
              <ul className="space-y-2.5">
                {[['#why', 'About us'], ['#work', 'Our work'], ['#how-it-works', 'How it works'], ['#contact', 'Contact']].map(([h, l]) => (
                  <li key={h}><a href={h} className="font-w440 text-ink hover:text-graphite transition-colors">{l}</a></li>
                ))}
                <li><a href="tel:0450349425" onClick={() => trackEvent('phone_click')} className="font-w440 text-ink hover:text-graphite transition-colors">0450 349 425</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-fog text-xs text-graphite flex flex-col md:flex-row md:justify-between gap-3">
          <p>© 2026 Santiago Lara Ariza trading as Pristine Tassie Cleaning Co. ABN 59 933 594 680. Hobart, Tasmania, Australia.</p>
          <p className="flex gap-5">
            <a href="./privacy/" className="hover:text-ink transition-colors">Privacy Policy</a>
            <a href="./terms/" className="hover:text-ink transition-colors">Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
}
