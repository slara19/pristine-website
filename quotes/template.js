/**
 * Pristine Cleaning Co. — branded quote HTML template.
 *
 * Shared by:
 *  - generate.js (renders this to PDF via headless browser)
 *  - later, the email quote flow (same header/branding block, reused as-is)
 *
 * Usage: buildQuoteHtml(data) -> full HTML string
 */

const SPARKLE_SVG = `<svg width="22" height="22" viewBox="0 0 24 24" fill="#000">
  <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
  <path d="M20 3v4" stroke="#000" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M22 5h-4" stroke="#000" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M4 17v2" stroke="#000" stroke-width="2" stroke-linecap="round" fill="none"/>
  <path d="M5 18H3" stroke="#000" stroke-width="2" stroke-linecap="round" fill="none"/>
</svg>`;

const money = (n) => `$${Number(n).toLocaleString('en-AU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

function escapeHtml(str = '') {
  return String(str)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * @param {Object} data
 * @param {string} data.quoteNumber        e.g. "PCC-0001"
 * @param {string} data.issueDate          e.g. "15 Aug 2026"
 * @param {string} data.validUntil         e.g. "14 Sep 2026"
 * @param {string} data.serviceTitle       e.g. "End of Lease Clean"
 * @param {string} data.propertySummary    e.g. "3 bed · 1 bath · 1 living area"
 * @param {string} [data.address]
 * @param {Object} data.client             { name, phone, email }
 * @param {Array<{label:string, amount:number}>} data.lineItems
 * @param {number} data.total
 * @param {number} data.depositPct         e.g. 50
 * @param {string} [data.paymentNote]      free text, e.g. bank details or "TBC on booking"
 */
function buildQuoteHtml(data) {
  const {
    quoteNumber, issueDate, validUntil, serviceTitle, propertySummary,
    address = '', client = {}, lineItems = [], total = 0, depositPct = 50,
    paymentNote = 'Payment details will be provided when you confirm your booking.',
  } = data;

  const deposit = total * (depositPct / 100);
  const balance = total - deposit;

  const rows = lineItems.map(li => `
    <tr>
      <td class="li-label">${escapeHtml(li.label)}</td>
      <td class="li-amount">${money(li.amount)}</td>
    </tr>`).join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
<style>
  * { box-sizing: border-box; }
  @page { size: A4; margin: 0; }
  html, body { width: 210mm; }
  body {
    font-family: 'Inter', -apple-system, 'Segoe UI', sans-serif;
    color: #111; margin: 0; padding: 34px 52px;
    font-size: 12.5px; line-height: 1.45;
  }
  .header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 22px; }
  .brand { display: flex; align-items: center; gap: 8px; }
  .brand-name { font-size: 21px; font-weight: 800; letter-spacing: -0.01em; }
  .tagline { font-size: 9.5px; color: #888; text-transform: uppercase; letter-spacing: 0.12em; margin-top: 4px; font-weight: 600; }
  .quote-meta { text-align: right; }
  .quote-meta .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.14em; color: #999; font-weight: 700; }
  .quote-meta .num { font-size: 19px; font-weight: 800; margin: 2px 0 8px; }
  .quote-meta table { border-collapse: collapse; }
  .quote-meta table td { padding: 1px 0; font-size: 11px; }
  .quote-meta table td:first-child { color: #888; padding-right: 14px; }
  .quote-meta table td:last-child { font-weight: 600; text-align: right; }

  .divider { border: none; border-top: 1px solid #eee; margin: 0 0 18px; }

  .two-col { display: flex; justify-content: space-between; gap: 40px; margin-bottom: 18px; }
  .two-col .block { flex: 1; }
  .block h3 { font-size: 9.5px; text-transform: uppercase; letter-spacing: 0.12em; color: #999; font-weight: 700; margin: 0 0 6px; }
  .block p { margin: 0 0 3px; font-size: 12.5px; }
  .block .name { font-weight: 700; font-size: 13.5px; margin-bottom: 3px; }

  table.items { width: 100%; border-collapse: collapse; margin-bottom: 4px; }
  table.items thead td { font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; font-weight: 700; padding: 0 0 6px; border-bottom: 1.5px solid #111; }
  table.items thead td.li-amount, table.items td.li-amount { text-align: right; }
  table.items td { padding: 9px 0; border-bottom: 1px solid #eee; }
  .li-label { font-weight: 500; }

  .total-box { background: #111; color: #fff; border-radius: 14px; padding: 14px 22px; margin-top: 14px; display: flex; justify-content: space-between; align-items: center; }
  .total-box .t-label { font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.12em; color: #aaa; font-weight: 700; }
  .total-box .t-amount { font-size: 23px; font-weight: 800; }

  .pay-terms { display: flex; gap: 20px; margin-top: 14px; }
  .pay-terms .pill { flex: 1; background: #f7f7f7; border-radius: 12px; padding: 11px 16px; }
  .pay-terms .pill .k { font-size: 10px; text-transform: uppercase; letter-spacing: 0.1em; color: #999; font-weight: 700; margin-bottom: 4px; }
  .pay-terms .pill .v { font-size: 15px; font-weight: 700; }
  .pay-terms .pill .note { font-size: 11px; color: #777; margin-top: 3px; }

  .guarantee { background: #f7f7f7; border-radius: 14px; padding: 13px 18px; margin-top: 16px; }
  .guarantee h4 { margin: 0 0 6px; font-size: 11.5px; font-weight: 700; display: flex; align-items: center; gap: 6px; }
  .guarantee p { margin: 0 0 5px; font-size: 11px; color: #444; }
  .guarantee p:last-child { margin-bottom: 0; }

  .terms-list { margin-top: 12px; font-size: 10.5px; color: #888; }
  .terms-list li { margin-bottom: 3px; }

  .footer { margin-top: 22px; padding-top: 14px; border-top: 1px solid #eee; text-align: center; }
  .footer .thanks { font-size: 14px; font-weight: 700; margin-bottom: 5px; }
  .footer .contact { font-size: 11px; color: #666; }
  .footer .contact span { margin: 0 8px; }
  .footer .trust { margin-top: 8px; font-size: 9.5px; color: #aaa; text-transform: uppercase; letter-spacing: 0.08em; font-weight: 600; }
</style>
</head>
<body>

  <div class="header">
    <div>
      <div class="brand">${SPARKLE_SVG}<span class="brand-name">Pristine Cleaning Co.</span></div>
      <div class="tagline">Hobart's Premier Cleaning Service</div>
    </div>
    <div class="quote-meta">
      <div class="label">Quote</div>
      <div class="num">#${escapeHtml(quoteNumber)}</div>
      <table>
        <tr><td>Issued</td><td>${escapeHtml(issueDate)}</td></tr>
        <tr><td>Valid until</td><td>${escapeHtml(validUntil)}</td></tr>
      </table>
    </div>
  </div>

  <hr class="divider" />

  <div class="two-col">
    <div class="block">
      <h3>Prepared for</h3>
      <p class="name">${escapeHtml(client.name || '')}</p>
      ${client.phone ? `<p>${escapeHtml(client.phone)}</p>` : ''}
      ${client.email ? `<p>${escapeHtml(client.email)}</p>` : ''}
    </div>
    <div class="block">
      <h3>Service</h3>
      <p class="name">${escapeHtml(serviceTitle)}</p>
      <p>${escapeHtml(propertySummary)}</p>
      ${address ? `<p>${escapeHtml(address)}</p>` : ''}
    </div>
  </div>

  <table class="items">
    <thead><tr><td>Description</td><td class="li-amount">Amount</td></tr></thead>
    <tbody>${rows}</tbody>
  </table>

  <div class="total-box">
    <span class="t-label">Total Due</span>
    <span class="t-amount">${money(total)}</span>
  </div>

  <div class="pay-terms">
    <div class="pill">
      <div class="k">Deposit (${depositPct}%) — due to book</div>
      <div class="v">${money(deposit)}</div>
    </div>
    <div class="pill">
      <div class="k">Balance — due on completion</div>
      <div class="v">${money(balance)}</div>
    </div>
  </div>
  <p style="color:#888; font-size: 11px; margin-top: 10px;">${escapeHtml(paymentNote)}</p>

  <div class="guarantee">
    <h4>${SPARKLE_SVG.replace('width="22" height="22"', 'width="14" height="14"')} 100% Bond-Back Guarantee</h4>
    <p>If your property manager notes any issue in the exit report, let us know within <strong>72 hours</strong> of that inspection and we'll return to fix it free of charge within 24 hours.</p>
    <p>This guarantee doesn't cover dust or marks that build up if the property sits vacant for 7–10+ days after our clean before the final inspection (consistent with CBOS Tasmania tenancy guidance) — that's outside our control.</p>
  </div>

  <ul class="terms-list">
    <li>This quote is valid for 30 days and based on the property details provided. On-the-day condition may affect the final price.</li>
    <li>Please book at least 10 days in advance where possible.</li>
    <li>24 hours notice is required to cancel or reschedule without a fee.</li>
    <li>Fully insured, police-checked team. No lock-in contracts, no hidden fees.</li>
  </ul>

  <div class="footer">
    <div class="thanks">Thank you for considering Pristine Cleaning Co.</div>
    <div class="contact">
      <span>📍 Hobart &amp; Greater Tasmania</span>
      <span>📞 0450 349 425</span>
      <span>✉️ pristine.hobart@gmail.com</span>
      <span>🌐 pristinetassie.com</span>
    </div>
    <div class="trust">4+ Years Experience · Fully Insured &amp; Police Checked · 100% Satisfaction Guarantee</div>
  </div>

</body>
</html>`;
}

module.exports = { buildQuoteHtml, money };
