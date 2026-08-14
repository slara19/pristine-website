import React, { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';
import {
  Sparkles, ChevronDown, Home, TrendingUp, Building2, Hammer, Key, Layers,
  Check, Phone, Mail, MapPin, Star, ArrowRight, Repeat,
  Shield, Clock, Award, Leaf, X,
} from 'lucide-react';

/* lucide-react no incluye iconos de marca; se definen aquí en el mismo estilo */
function InstagramIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}
function FacebookIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
      fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

/* ── FORM HELPERS ─────────────────────────────────────────────────────────── */
function FLabel({ label, children }) {
  return (
    <div className="space-y-1">
      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</label>
      {children}
    </div>
  );
}
const base = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-black transition-colors";
function FSel({ label, value, onChange, options, ph = 'Select…' }) {
  return (
    <FLabel label={label}>
      <select value={value || ''} onChange={e => onChange(e.target.value)} className={base + " bg-white"}>
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
        placeholder={placeholder} className={base + " placeholder-gray-400"} />
    </FLabel>
  );
}
function FCheck({ label, checked, onChange, accent }) {
  return (
    <label className={`flex items-start gap-3 cursor-pointer rounded-xl p-3 hover:bg-gray-50 transition-colors ${accent ? 'bg-gray-50 border border-gray-200' : ''}`}>
      <input type="checkbox" checked={checked || false} onChange={e => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 cursor-pointer" style={{ accentColor: '#000' }} />
      <span className="text-sm text-gray-700 leading-tight">{label}</span>
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
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Extras: tick all that apply</p>
        <div className="space-y-1">
          <FCheck label="Inside oven clean" checked={d.oven} onChange={v => u('oven', v)} />
          <FCheck label="Inside fridge clean" checked={d.fridge} onChange={v => u('fridge', v)} />
          <FCheck label="Interior windows" checked={d.windows} onChange={v => u('windows', v)} />
          <FCheck label="Ironing service" checked={d.ironing} onChange={v => u('ironing', v)} />
        </div>
      </div>
    </div>
  );
  if (svc === 'airbnb') return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <FSel label="Bedrooms" value={d.beds} onChange={v => u('beds', v)} options={['Studio', '1', '2', '3', '4', '5+']} />
        <FSel label="Bathrooms" value={d.baths} onChange={v => u('baths', v)} options={['1', '2', '3', '4+']} />
      </div>
      <FSel label="Property Type" value={d.propType} onChange={v => u('propType', v)} options={['House', 'Apartment', 'Unit', 'Townhouse']} />
      <FSel label="Frequency" value={d.freq} onChange={v => u('freq', v)} options={['One-time', 'Per Checkout', 'Weekly', 'Fortnightly']} />
      <FInput label="Next Check-in Date & Time" value={d.checkin} onChange={v => u('checkin', v)} type="datetime-local" />
      <FCheck label="Add linen change & bed making" checked={d.linen} onChange={v => u('linen', v)} />
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
  if (svc === 'commercial') return (
    <div className="space-y-4">
      <FSel label="Business Type" value={d.bizType} onChange={v => u('bizType', v)} options={['Office', 'Retail Store', 'Restaurant / Café', 'Medical / Dental', 'Warehouse', 'Other']} />
      <FSel label="Approximate Size" value={d.size} onChange={v => u('size', v)} options={['Under 100 m²', '100–300 m²', '300–500 m²', '500 m²+']} />
      <FSel label="Cleaning Frequency" value={d.freq} onChange={v => u('freq', v)} options={['Daily', '3× per week', 'Weekly', 'Fortnightly', 'Monthly', 'One-time deep clean']} />
      <FInput label="Preferred Access Hours" value={d.access} onChange={v => u('access', v)} placeholder="e.g. Mon–Fri before 7am" />
      <div className="grid grid-cols-2 gap-3">
        <FInput label="No. of Bathrooms" value={d.baths} onChange={v => u('baths', v)} type="number" placeholder="0" />
        <FInput label="No. of Kitchens / Breakrooms" value={d.kitchens} onChange={v => u('kitchens', v)} type="number" placeholder="0" />
      </div>
    </div>
  );
  if (svc === 'construction') return (
    <div className="space-y-4">
      <FSel label="Project Type" value={d.projType} onChange={v => u('projType', v)} options={['New Build', 'Renovation', 'Home Extension', 'Commercial Build']} />
      <FSel label="Clean Stage" value={d.stage} onChange={v => u('stage', v)} options={['Initial post-build (rough clean)', 'Final pre-handover (detailed)', 'Both stages']} />
      <FSel label="Approximate Size" value={d.size} onChange={v => u('size', v)} options={['Under 100 m²', '100–200 m²', '200–400 m²', '400 m²+']} />
      <FInput label="Handover / Completion Date" value={d.handover} onChange={v => u('handover', v)} type="date" />
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
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Extras: tick all that apply</p>
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
  } else if (svc === 'airbnb') {
    if (d.beds)     lines.push(`Bedrooms: ${d.beds}`);
    if (d.baths)    lines.push(`Bathrooms: ${d.baths}`);
    if (d.propType) lines.push(`Property Type: ${d.propType}`);
    if (d.freq)     lines.push(`Frequency: ${d.freq}`);
    if (d.checkin)  lines.push(`Next Check-in: ${d.checkin}`);
    if (d.linen)    lines.push('Extra: Linen change & bed making ✓');
  } else if (svc === 'presale') {
    if (d.beds)      lines.push(`Bedrooms: ${d.beds}`);
    if (d.baths)     lines.push(`Bathrooms: ${d.baths}`);
    if (d.propType)  lines.push(`Property Type: ${d.propType}`);
    if (d.listDate)  lines.push(`Open Home / Listing Date: ${d.listDate}`);
    if (d.condition) lines.push(`Condition: ${d.condition}`);
    if (d.exterior)  lines.push('Extra: Include exterior areas ✓');
    if (d.staging)   lines.push('Extra: Working with agent / staging company ✓');
  } else if (svc === 'commercial') {
    if (d.bizType)  lines.push(`Business Type: ${d.bizType}`);
    if (d.size)     lines.push(`Size: ${d.size}`);
    if (d.freq)     lines.push(`Frequency: ${d.freq}`);
    if (d.access)   lines.push(`Access Hours: ${d.access}`);
    if (d.baths)    lines.push(`Bathrooms: ${d.baths}`);
    if (d.kitchens) lines.push(`Kitchens / Breakrooms: ${d.kitchens}`);
  } else if (svc === 'construction') {
    if (d.projType) lines.push(`Project Type: ${d.projType}`);
    if (d.stage)    lines.push(`Clean Stage: ${d.stage}`);
    if (d.size)     lines.push(`Size: ${d.size}`);
    if (d.handover) lines.push(`Handover Date: ${d.handover}`);
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

/* ── QUOTE MODAL ──────────────────────────────────────────────────────────── */
const FORM_SVCS = [
  { id: 'residential',  label: 'Residential Cleaning',   Icon: Repeat,     bg: 'bg-teal-50',    border: 'border-teal-200',    ib: 'bg-teal-500'    },
  { id: 'carpet',       label: 'Carpet Steam Cleaning',  Icon: Layers,     bg: 'bg-purple-50',  border: 'border-purple-200',  ib: 'bg-purple-500'  },
  { id: 'presale',      label: 'Pre-Sale Clean',         Icon: TrendingUp, bg: 'bg-emerald-50', border: 'border-emerald-200', ib: 'bg-emerald-500' },
  { id: 'airbnb',       label: 'Airbnb Cleaning',        Icon: Home,       bg: 'bg-rose-50',    border: 'border-rose-200',    ib: 'bg-rose-500'    },
  { id: 'commercial',   label: 'Commercial',             Icon: Building2,  bg: 'bg-slate-50',   border: 'border-slate-200',   ib: 'bg-slate-600'   },
  { id: 'construction', label: 'Construction',           Icon: Hammer,     bg: 'bg-amber-50',   border: 'border-amber-200',   ib: 'bg-amber-500'   },
  { id: 'endoflease',   label: 'End of Lease',           Icon: Key,        bg: 'bg-sky-50',     border: 'border-sky-200',     ib: 'bg-sky-500'     },
];

function QuoteModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [svc, setSvc] = useState('');
  const [d, setD] = useState({});
  const [done, setDone] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const u = (k, v) => setD(p => ({ ...p, [k]: v }));
  const sel = FORM_SVCS.find(s => s.id === svc);
  const canSend = d.name && d.phone && d.email;

  const handleSend = async () => {
    if (!canSend || sending) return;
    setSending(true);
    setSendError('');
    try {
      await emailjs.send('service_ptzeiln', 'template_lsdeywj', {
        service : sel ? sel.label : svc,
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

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-lg sm:mx-4 max-h-[92vh] flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-black">Get Your Free Quote</h2>
            {!done && (
              <div className="flex items-center gap-2 mt-2">
                {['Service', 'Property', 'Your Details'].map((s, i) => (
                  <React.Fragment key={s}>
                    <div className="flex items-center gap-1.5">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step > i + 1 ? 'bg-black text-white' : step === i + 1 ? 'bg-black text-white' : 'bg-gray-100 text-gray-400'}`}>
                        {step > i + 1 ? '✓' : i + 1}
                      </div>
                      <span className={`text-xs ${step === i + 1 ? 'text-black font-medium' : 'text-gray-400'}`}>{s}</span>
                    </div>
                    {i < 2 && <div className="w-4 h-px bg-gray-200" />}
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto flex-1 px-6 py-5">
          {done ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">✓</div>
              <h3 className="text-xl font-semibold text-black mb-2">Request Sent!</h3>
              <p className="text-gray-600 mb-4">Thanks {d.name ? d.name.split(' ')[0] : ''}! We'll review your details and get back to you within a few hours.</p>
              <p className="text-sm text-gray-500">Questions? Call <a href="tel:0450349425" className="font-semibold text-black">0450 349 425</a></p>
            </div>
          ) : step === 1 ? (
            <div>
              <p className="text-sm text-gray-600 mb-4">What service do you need?</p>
              <div className="grid grid-cols-2 gap-3">
                {FORM_SVCS.map(s => {
                  const SIcon = s.Icon;
                  return (
                    <button key={s.id} onClick={() => { setSvc(s.id); setStep(2); }}
                      className={`flex flex-col items-start gap-2 p-4 rounded-2xl border-2 text-left transition-all hover:shadow-md ${svc === s.id ? `${s.bg} ${s.border}` : 'border-gray-100 hover:border-gray-200'}`}>
                      <div className={`w-8 h-8 ${s.ib} rounded-lg flex items-center justify-center`}>
                        <SIcon className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-sm font-medium text-gray-900">{s.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : step === 2 ? (
            <div className="space-y-4">
              {sel && (
                <div className={`inline-flex items-center gap-2 ${sel.bg} rounded-xl px-3 py-1.5`}>
                  <sel.Icon className="w-3.5 h-3.5" />
                  <span className="text-xs font-semibold">{sel.label}</span>
                </div>
              )}
              <FInput label="Property Address" value={d.address} onChange={v => u('address', v)} placeholder="e.g. 12 Collins St, Hobart TAS 7000" />
              <PropStep svc={svc} d={d} u={u} />
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-sm text-gray-600">Almost done! Just your contact details.</p>
              <FInput label="Full Name" value={d.name} onChange={v => u('name', v)} placeholder="Your full name" />
              <div className="grid grid-cols-2 gap-3">
                <FInput label="Phone" value={d.phone} onChange={v => u('phone', v)} type="tel" placeholder="0400 000 000" />
                <FInput label="Email" value={d.email} onChange={v => u('email', v)} type="email" placeholder="you@email.com" />
              </div>
              <FInput label="Preferred Date" value={d.date} onChange={v => u('date', v)} type="date" />
              <FLabel label="Additional Notes (optional)">
                <textarea value={d.notes || ''} onChange={e => u('notes', e.target.value)} rows={3}
                  placeholder="Anything else we should know…"
                  className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 focus:outline-none focus:border-black transition-colors resize-none placeholder-gray-400" />
              </FLabel>
            </div>
          )}
        </div>

        {/* Footer */}
        {!done && (
          <div className="px-6 py-4 border-t border-gray-100 flex-shrink-0">
            {step === 1 ? (
              <p className="text-xs text-center text-gray-400">Select a service above to continue</p>
            ) : (
              <div className="flex gap-3">
                <button onClick={() => setStep(s => s - 1)}
                  className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-full text-sm font-medium hover:border-gray-300 transition-colors">
                  Back
                </button>
                {step < 3 ? (
                  <button onClick={() => setStep(s => s + 1)}
                    className="flex-1 bg-black text-white py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                    Continue
                  </button>
                ) : (
                  <button onClick={handleSend}
                    disabled={!canSend || sending}
                    className={`flex-1 py-3 rounded-full text-sm font-medium transition-colors ${canSend && !sending ? 'bg-black text-white hover:bg-gray-800' : 'bg-gray-100 text-gray-400 cursor-not-allowed'}`}>
                    {sending ? 'Sending…' : 'Send Quote Request'}
                  </button>
                )}
              </div>
            )}
            {sendError && <p className="text-xs text-red-500 text-center mt-2">{sendError}</p>}
          </div>
        )}
        {done && (
          <div className="px-6 py-4 border-t border-gray-100">
            <button onClick={onClose} className="w-full bg-black text-white py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">Close</button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── TABS ─────────────────────────────────────────────────────────────────── */
const TABS = [
  { id: 'residential',  label: 'Residential',  Icon: Repeat     },
  { id: 'carpet',       label: 'Carpet Steam', Icon: Layers     },
  { id: 'presale',      label: 'Pre-Sale',      Icon: TrendingUp },
  { id: 'airbnb',       label: 'Airbnb',       Icon: Home       },
  { id: 'commercial',   label: 'Commercial',    Icon: Building2  },
  { id: 'construction', label: 'Construction',  Icon: Hammer     },
  { id: 'endoflease',   label: 'End of Lease',  Icon: Key        },
];

const TAB_BG = {
  residential:  'from-teal-50 via-cyan-50 to-teal-100',
  carpet:       'from-purple-50 via-violet-50 to-purple-100',
  presale:      'from-emerald-50 via-green-50 to-emerald-100',
  airbnb:       'from-rose-50 via-pink-50 to-rose-100',
  commercial:   'from-slate-100 via-gray-100 to-slate-200',
  construction: 'from-amber-50 via-orange-50 to-amber-100',
  endoflease:   'from-sky-50 via-blue-50 to-sky-100',
};

/* ── TAB CARDS ────────────────────────────────────────────────────────────── */
function Card({ children }) {
  return <div className="bg-white rounded-2xl shadow-xl p-6 w-72 sm:w-80 max-w-[85vw]">{children}</div>;
}
function CardHeader({ Icon: Ic, iconBg, title, sub, badge }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className={`w-8 h-8 ${iconBg} rounded-lg flex items-center justify-center`}>
        <Ic className="w-4 h-4 text-white" />
      </div>
      <div>
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{sub}</p>
      </div>
      {badge && <span className="ml-auto">{badge}</span>}
    </div>
  );
}
function Checklist({ items, checkClass }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2">
          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${checkClass}`}>
            <Check className="w-3 h-3" />
          </div>
          <p className="text-sm text-gray-700">{item}</p>
        </div>
      ))}
    </div>
  );
}

const TAB_CONTENT = {
  residential: (
    <Card>
      <CardHeader Icon={Repeat} iconBg="bg-teal-500" title="Home Cleaning Schedule" sub="Weekly, fortnightly or one-off"
        badge={<span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded-full">On Schedule</span>} />
      <Checklist checkClass="bg-teal-100 text-teal-600" items={['Kitchen, bathrooms & living areas','Floors vacuumed & mopped','Dusting & surface wipe-down','Beds made (on request)','Same trusted cleaner each visit']} />
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-500">Next clean: Fri, 9:00 AM</span>
        <span className="text-xs font-medium text-teal-600 bg-teal-50 px-2 py-1 rounded-full">Confirmed</span>
      </div>
    </Card>
  ),
  carpet: (
    <Card>
      <CardHeader Icon={Layers} iconBg="bg-purple-500" title="Deep Steam Clean" sub="Professional grade results" />
      <div className="space-y-3 mb-4">
        {[{n:'1',l:'Pre-treatment spray',c:'bg-purple-100 text-purple-700'},{n:'2',l:'Hot water extraction',c:'bg-purple-200 text-purple-800'},{n:'3',l:'Deodorize & sanitize',c:'bg-purple-400 text-white'},{n:'4',l:'Speed dry finish',c:'bg-purple-600 text-white'}].map(r=>(
          <div key={r.n} className="flex items-center gap-3">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${r.c}`}>{r.n}</div>
            <p className="text-sm text-gray-700">{r.l}</p>
          </div>
        ))}
      </div>
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-500">Average dry time</span>
        <span className="text-xs font-semibold text-purple-600">2–4 hours</span>
      </div>
    </Card>
  ),
  airbnb: (
    <Card>
      <CardHeader Icon={Home} iconBg="bg-rose-500" title="Guest-Ready Checklist" sub="Turnover in 2–3 hrs"
        badge={<div className="flex gap-0.5">{[0,1,2,3,4].map(i=><Star key={i} className="w-3 h-3" style={{fill:'#fbbf24',color:'#fbbf24'}}/>)}</div>} />
      <Checklist checkClass="bg-green-100 text-green-600" items={['Kitchen & appliances sanitized','Bathrooms deep cleaned','Fresh linens & towels set','Floors vacuumed & mopped','Amenities restocked']} />
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-500">Last clean: Today, 10:30 AM</span>
        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Guest-ready</span>
      </div>
    </Card>
  ),
  presale: (
    <Card>
      <CardHeader Icon={TrendingUp} iconBg="bg-emerald-500" title="Pre-Sale Presentation" sub="Maximise your sale price"
        badge={<span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Open Home</span>} />
      <Checklist checkClass="bg-emerald-100 text-emerald-600" items={['Deep clean all surfaces & fixtures','Windows polished inside & out','Carpets refreshed & deodorised','Kitchen & bathrooms spotless','Garage & outdoor areas','Scent-neutral, buyer-ready finish']} />
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-500">Works with staging companies</span>
        <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">Sale-ready</span>
      </div>
    </Card>
  ),
  commercial: (
    <Card>
      <CardHeader Icon={Building2} iconBg="bg-slate-700" title="Commercial Schedule" sub="Flexible & reliable"
        badge={<span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-full">Active</span>} />
      <div className="space-y-2 mb-4">
        {[{l:'Daily Office Clean',f:'Mon–Fri',a:true},{l:'Weekly Deep Clean',f:'Every Friday',a:true},{l:'Monthly Sanitize',f:'1st of month',a:false}].map((r,i)=>(
          <div key={i} className={`flex items-center justify-between p-2.5 rounded-lg ${r.a?'bg-slate-50':'bg-gray-50'}`}>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${r.a?'bg-green-500':'bg-gray-300'}`}/>
              <p className="text-sm font-medium text-gray-800">{r.l}</p>
            </div>
            <p className="text-xs text-gray-500">{r.f}</p>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-1.5 text-xs text-gray-500">
        <Shield className="w-3.5 h-3.5"/>
        <span>Fully insured · Police cleared staff</span>
      </div>
    </Card>
  ),
  construction: (
    <Card>
      <CardHeader Icon={Hammer} iconBg="bg-amber-500" title="Post-Build Clean" sub="Site ready for handover"
        badge={<span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">In Progress</span>} />
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-600 mb-1.5"><span>Overall progress</span><span className="font-semibold">85%</span></div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-amber-500 rounded-full" style={{width:'85%'}}/></div>
      </div>
      <div className="space-y-2">
        {[{l:'Dust & debris removal',d:true},{l:'Window & glass cleaning',d:true},{l:'Floor scrub & polish',d:true},{l:'Final inspection report',d:false}].map((r,i)=>(
          <div key={i} className="flex items-center gap-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${r.d?'bg-green-100':'bg-gray-100'}`}>
              <Check className={`w-3 h-3 ${r.d?'text-green-600':'text-gray-300'}`}/>
            </div>
            <p className={`text-sm ${r.d?'text-gray-700':'text-gray-400'}`}>{r.l}</p>
          </div>
        ))}
      </div>
    </Card>
  ),
  endoflease: (
    <Card>
      <CardHeader Icon={Key} iconBg="bg-sky-500" title="Bond-Back Guarantee" sub="Real Estate Approved"
        badge={<Shield className="w-5 h-5 text-sky-500"/>} />
      <div className="bg-sky-50 rounded-xl p-3 mb-4 text-center">
        <p className="text-2xl font-bold text-sky-700">100%</p>
        <p className="text-xs text-sky-600">Bond-Back Guarantee</p>
      </div>
      <Checklist checkClass="bg-sky-100 text-sky-600" items={['Oven & kitchen deep clean','Bathroom & toilet sanitize','Windows inside & out','Walls & skirting boards','Garage & outdoor areas','+ Carpet steam clean available']} />
    </Card>
  ),
};

/* ── APP ──────────────────────────────────────────────────────────────────── */
export default function App() {
  const [tab, setTab] = useState('residential');
  const [showForm, setShowForm] = useState(false);
  const open = () => setShowForm(true);

  useEffect(() => {
    if (showForm) return;
    const id = setInterval(() => {
      setTab(p => { const i = TABS.findIndex(t => t.id === p); return TABS[(i + 1) % TABS.length].id; });
    }, 4000);
    return () => clearInterval(id);
  }, [showForm]);

  return (
    <div className="bg-white min-h-screen">
      {showForm && <QuoteModal onClose={() => setShowForm(false)} />}

      {/* NAV */}
      <nav className="animate-fade-in-up sticky top-0 bg-white/90 backdrop-blur-sm z-40 border-b border-gray-50 px-6 py-4"
        style={{ opacity: 0, animationDelay: '0.1s' }}>
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" style={{ fill: 'black' }} />
            <span className="text-lg font-semibold">Pristine</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm text-gray-700 hover:text-black transition-colors">Services</a>
            <a href="#how-it-works" className="text-sm text-gray-700 hover:text-black transition-colors">How It Works</a>
            <a href="#why" className="text-sm text-gray-700 hover:text-black transition-colors">About</a>
            <a href="#contact" className="text-sm text-gray-700 hover:text-black transition-colors">Contact</a>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:0450349425" className="hidden md:flex items-center gap-1.5 text-sm text-gray-700 hover:text-black transition-colors whitespace-nowrap">
              <Phone className="w-4 h-4" /> 0450 349 425
            </a>
            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-gray-200">
              <a href="https://www.instagram.com/pristine.hobart/" target="_blank" rel="noopener noreferrer" aria-label="Pristine Cleaning Co. on Instagram"
                className="text-gray-500 hover:text-black transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61592442795488" target="_blank" rel="noopener noreferrer" aria-label="Pristine Cleaning Co. on Facebook"
                className="text-gray-500 hover:text-black transition-colors">
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
            <button onClick={open} className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Get Free Quote
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="px-6 pt-24 pb-32 max-w-7xl mx-auto text-center">
        <div className="animate-fade-in-up inline-flex items-center gap-2 mb-8" style={{ opacity: 0, animationDelay: '0.2s' }}>
          <div className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center">
            <Star className="w-3.5 h-3.5" style={{ fill: 'black', color: 'black' }} />
          </div>
          <span className="text-sm font-medium text-black">4+ years professional cleaning experience in Australia</span>
        </div>

        <h1 className="animate-fade-in-up text-6xl md:text-7xl lg:text-8xl font-normal leading-tight tracking-tight mb-5"
          style={{ opacity: 0, animationDelay: '0.3s' }}>
          Clean Spaces.<br />
          <span className="bg-gradient-to-r from-black via-gray-500 to-gray-400 bg-clip-text text-transparent">
            Perfect Results.
          </span>
        </h1>

        <p className="animate-fade-in-up text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          style={{ opacity: 0, animationDelay: '0.4s' }}>
          Residential homes, carpet steam cleaning, Airbnb turnovers, pre-sale presentations, commercial spaces, construction sites and end of lease. Pristine delivers across all of Hobart and Greater Tasmania.
        </p>

        <div className="animate-fade-in-up mb-12 flex flex-col sm:flex-row items-center justify-center gap-4"
          style={{ opacity: 0, animationDelay: '0.5s' }}>
          <button onClick={open} className="bg-black text-white px-8 py-3 rounded-full text-base font-medium hover:bg-gray-800 transition-colors">
            Get Free Quote
          </button>
          <a href="tel:0450349425" className="text-sm text-gray-500 hover:text-black transition-colors">or call 0450 349 425</a>
        </div>

        {/* Tab bar */}
        <div className="animate-fade-in-up mb-8" style={{ opacity: 0, animationDelay: '0.6s' }}>
          <div className="md:hidden inline-grid grid-cols-3 gap-1 bg-gray-100 rounded-xl p-1">
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex items-center justify-center gap-1 px-2 py-2 rounded-lg text-xs font-medium transition-colors ${tab === t.id ? 'bg-white text-black shadow-sm' : 'text-gray-600'}`}>
                <t.Icon className="w-3 h-3" />{t.label}
              </button>
            ))}
          </div>
          <div className="hidden md:inline-flex items-center bg-gray-100 rounded-xl p-1">
            {TABS.map((t, i) => (
              <React.Fragment key={t.id}>
                {i > 0 && <div className="w-px h-4 bg-gray-300 mx-0.5" />}
                <button onClick={() => setTab(t.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.id ? 'bg-white text-black shadow-sm' : 'text-gray-600 hover:text-black'}`}>
                  <t.Icon className="w-3.5 h-3.5" />{t.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Visual */}
        <div className={`animate-fade-in-up relative rounded-3xl overflow-hidden h-96 md:h-[500px] bg-gradient-to-br transition-colors duration-700 ${TAB_BG[tab]}`}
          style={{ opacity: 0, animationDelay: '0.7s' }}>
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white opacity-20" />
          <div className="absolute bottom-10 right-10 w-56 h-56 rounded-full bg-white opacity-10" />
          <div key={tab} className="animate-fade-in-overlay absolute inset-0 flex items-center justify-center">
            <div className="animate-slide-up-overlay">{TAB_CONTENT[tab]}</div>
          </div>
        </div>

        <div className="animate-fade-in-up mt-16 flex flex-wrap items-center justify-center gap-8"
          style={{ opacity: 0, animationDelay: '0.8s' }}>
          <span className="text-xs uppercase tracking-widest text-gray-400 font-medium">Trusted by</span>
          {['Airbnb Hosts', 'Property Developers', 'Real Estate Agencies', 'Hobart CBD Offices', 'Construction Companies'].map(n => (
            <span key={n} className="text-sm font-semibold text-gray-300 uppercase tracking-wide">{n}</span>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Simple Process</p>
            <h2 className="text-4xl md:text-5xl font-normal text-black leading-tight">How It Works</h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">From your first message to a spotless space: here's what to expect.</p>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-4 md:overflow-visible md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
            {[
              { n: '01', title: 'Request Your Quote', desc: 'Fill in our quick form with your property details and preferred date. Takes under 2 minutes, no commitment required.' },
              { n: '02', title: 'Receive Your Quote', desc: 'We review your request and send a detailed, transparent quote within a few hours. No hidden fees, no surprises.' },
              { n: '03', title: 'We Show Up & Deliver', desc: 'Our fully insured team arrives on time and cleans to the highest professional standard, every time, without exception.' },
              { n: '04', title: '100% Satisfied or Free', desc: "Not happy with any part of the clean? We return within 24 hours and fix it at no cost. Guaranteed, no arguments." },
            ].map((s, i) => (
              <div key={i} className="flex-shrink-0 w-64 snap-center md:w-auto text-center">
                <div className="w-14 h-14 rounded-2xl bg-black text-white flex items-center justify-center text-sm font-bold mx-auto mb-5 tracking-wide">{s.n}</div>
                <h3 className="font-semibold text-black mb-3">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <button onClick={open} className="bg-black text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
              Start With a Free Quote
            </button>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-gray-100 py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { v: '4+',   l: 'Years Professional Experience' },
            { v: '100%', l: 'Satisfaction Guarantee' },
            { v: '$0',   l: 'Bond Disputes' },
            { v: '🛡️',   l: 'Fully Insured & Police Checked' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl font-semibold text-black">{s.v}</p>
              <p className="text-sm text-gray-500 mt-1">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Our Services</p>
            <h2 className="text-4xl md:text-5xl font-normal text-black leading-tight">Everything You Need,<br />Spotlessly Delivered</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { Icon: Repeat,     title: 'Residential Cleaning',   badge: 'Most Requested',  desc: 'Weekly, fortnightly, or one-off cleans tailored to your home and routine. Consistent, reliable service you can count on every single visit.' },
              { Icon: Layers,     title: 'Carpet Steam Cleaning',  badge: null,              desc: 'Professional steam cleaning removes deep stains, allergens, and pet odours. Your carpets look brand new, with fast dry times.' },
              { Icon: TrendingUp, title: 'Pre-Sale Clean',         badge: 'High Impact',     desc: 'First impressions sell homes. A deep presentation clean that maximises buyer appeal. Perfect before open homes, photos, or listing day.' },
              { Icon: Home,       title: 'Airbnb Cleaning',        badge: 'Most Popular',    desc: 'Fast, hotel-quality turnovers between guests. We ensure your property is always 5-star ready for every arrival, on time, every time.' },
              { Icon: Building2,  title: 'Commercial Cleaning',    badge: null,              desc: 'Tailored schedules for offices, retail, restaurants, and more. Reliable, discreet, and fully insured, so your business keeps running.' },
              { Icon: Hammer,     title: 'Construction Cleaning',  badge: null,              desc: 'Post-build dust, debris, and residue completely removed. We prepare your site for final inspection or immediate occupancy.' },
              { Icon: Key,        title: 'End of Lease',           badge: 'Bond Guaranteed', desc: 'Comprehensive bond-back cleaning meeting real estate agent standards. Carpet steam clean available as an add-on.' },
            ].map((s, i) => (
              <div key={i} onClick={open}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-black transition-colors">
                    <s.Icon className="w-5 h-5 text-gray-700 group-hover:text-white transition-colors" />
                  </div>
                  {s.badge && <span className="text-xs font-medium text-black bg-gray-100 px-2.5 py-1 rounded-full">{s.badge}</span>}
                </div>
                <h3 className="text-base font-semibold text-black mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.desc}</p>
                <div className="flex items-center gap-1 mt-4 text-xs font-medium text-gray-400 group-hover:text-black transition-colors">
                  Get a quote <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY PRISTINE */}
      <section id="why" className="bg-gray-50 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Why Pristine</p>
              <h2 className="text-4xl md:text-5xl font-normal text-black mb-6 leading-tight">Hobart's Most<br />Trusted Cleaners</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                With over 4 years of professional cleaning experience across Australia, Pristine is now bringing that same standard of excellence to Hobart and Greater Tasmania. From Airbnb hosts to real estate agents and commercial businesses, all backed by consistent results, no lock-in contracts, no hidden fees.
              </p>
              <button onClick={open} className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                Get Your Free Quote
              </button>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {[
                { Icon: Leaf,   title: 'Eco-Friendly Products',  desc: 'Non-toxic, biodegradable solutions safe for families, children, and pets.' },
                { Icon: Clock,  title: 'Flexible Scheduling',    desc: 'Book same-day or plan ahead. We work around your timeline, not the other way around.' },
                { Icon: Shield, title: 'Fully Insured',          desc: 'Comprehensive public liability and workers compensation. Your property is fully protected.' },
                { Icon: Award,  title: 'Satisfaction Guarantee', desc: "Not happy? We return within 24 hours and re-clean for free. No questions asked." },
              ].map((f, i) => (
                <div key={i} className="p-5 bg-white rounded-2xl">
                  <div className="w-9 h-9 bg-black rounded-lg flex items-center justify-center mb-3">
                    <f.Icon className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-sm font-semibold text-black mb-1.5">{f.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">Testimonials</p>
            <h2 className="text-4xl font-normal text-black">Loved by Hobart Property Owners</h2>
          </div>
          <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-3 md:overflow-visible md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
            {[
              { name: 'Megan Foster',      role: 'Regular Cleaning, Glenorchy',  quote: "Between work and two kids, the house was always a mess by Friday. Now our regular clean means we actually get our weekends back. The team is reliable, friendly, and never misses a spot." },
              { name: 'Rachel Ong',        role: 'Carpet Steam Clean, Kingston', quote: "We had old wine and pet stains we thought were permanent. The steam clean lifted almost everything and the carpets smelled fresh for weeks. Genuinely didn't expect that result." },
              { name: 'Chloe Bennett',     role: 'End of Lease, South Hobart',   quote: 'We booked our end of lease clean two days before handover and they still fit us in and did a spotless job: oven, windows, carpets, all of it. Saved us so much stress.' },
            ].map((t, i) => (
              <div key={i} className="flex-shrink-0 w-80 snap-center md:w-auto p-6 rounded-2xl border border-gray-100 hover:shadow-sm transition-all">
                <div className="flex mb-4">
                  {[0,1,2,3,4].map(j => <Star key={j} className="w-4 h-4" style={{ fill: 'black', color: 'black' }} />)}
                </div>
                <p className="text-sm text-gray-700 leading-relaxed mb-5">"{t.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-600">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black">{t.name}</p>
                    <p className="text-xs text-gray-500">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-24 px-6 bg-black">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-normal text-white mb-6 leading-tight">Ready for a Spotless Space?</h2>
          <p className="text-gray-400 mb-10 text-lg">Free, no-obligation quotes. We service Hobart and all of Greater Tasmania.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={open} className="bg-white text-black px-8 py-3.5 rounded-full font-medium hover:bg-gray-100 transition-colors whitespace-nowrap">
                Get Free Quote
              </button>
              <a href="tel:0450349425" className="border border-gray-700 text-white px-8 py-3.5 rounded-full font-medium hover:border-gray-500 transition-colors text-center whitespace-nowrap">
                Call 0450 349 425
              </a>
            </div>
            <div className="hidden sm:block w-px h-12 bg-gray-700" />
            <div className="flex items-center gap-3">
              <img src="/santiago.jpg" alt="Santiago Lara" className="w-40 h-40 rounded-full object-cover border-2 border-gray-600" style={{ objectPosition: 'center 10%' }} />
              <div className="text-left">
                <p className="text-white text-sm font-semibold">Santiago Lara</p>
                <p className="text-gray-400 text-xs">Founder, Pristine Cleaning Co.</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm text-gray-500">
            {[{ Icon: MapPin, text: 'Hobart & Greater Tasmania' }, { Icon: Phone, text: '0450 349 425' }, { Icon: Mail, text: 'pristine.hobart@gmail.com' }].map((c, i) => (
              <div key={i} className="flex items-center justify-center gap-2 whitespace-nowrap">
                <c.Icon className="w-4 h-4" /><span>{c.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5" style={{ fill: 'black' }} />
              <span className="text-lg font-semibold">Pristine</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">Hobart's premium cleaning service for Airbnb, pre-sale, residential, and commercial properties across Tasmania.</p>
            <div className="flex items-center gap-3 mt-4">
              <a href="https://www.instagram.com/pristine.hobart/" target="_blank" rel="noopener noreferrer" aria-label="Pristine Cleaning Co. on Instagram"
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:border-black transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61592442795488" target="_blank" rel="noopener noreferrer" aria-label="Pristine Cleaning Co. on Facebook"
                className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-black hover:border-black transition-colors">
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">
            <div>
              <p className="font-semibold text-black mb-3">Services</p>
              <ul className="space-y-2 text-gray-500">
                {['Residential Cleaning', 'Carpet Steam Cleaning', 'Pre-Sale Clean', 'Airbnb Cleaning', 'Commercial', 'Construction', 'End of Lease'].map(s => (
                  <li key={s} onClick={open} className="hover:text-black cursor-pointer transition-colors">{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-black mb-3">Service Areas</p>
              <ul className="space-y-2 text-gray-500">
                {['Hobart CBD', 'Sandy Bay', 'Battery Point', 'Kingston', 'Glenorchy', 'Greater Tasmania'].map(a => (
                  <li key={a} className="hover:text-black cursor-pointer transition-colors">{a}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold text-black mb-3">Company</p>
              <ul className="space-y-2 text-gray-500">
                {['About Us', 'How It Works', 'Our Guarantee', 'Privacy Policy'].map(c => (
                  <li key={c} className="hover:text-black cursor-pointer transition-colors">{c}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-100 text-center text-xs text-gray-400">
          © 2026 Pristine Cleaning Co. All rights reserved. Hobart, Tasmania, Australia.
        </div>
      </footer>
    </div>
  );
}
