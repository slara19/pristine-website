#!/usr/bin/env node
/**
 * Generates a branded Pristine Cleaning Co. quote PDF.
 *
 * Usage:
 *   node generate.js <path-to-quote-data.json> [output.pdf]
 *   node generate.js --example              (renders the built-in example)
 *
 * Renders quotes/template.js to HTML, then shells out to a locally
 * installed Chromium-based browser (Edge or Chrome) in headless mode to
 * print it to PDF. No npm dependencies required.
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const os = require('os');
const { buildQuoteHtml } = require('./template');

const BROWSER_CANDIDATES = [
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
];

function findBrowser() {
  const found = BROWSER_CANDIDATES.find(p => fs.existsSync(p));
  if (!found) {
    throw new Error('No Chromium-based browser found (checked Edge and Chrome default install paths).');
  }
  return found;
}

const EXAMPLE_DATA = {
  quoteNumber: 'PCC-0001',
  issueDate: '15 Aug 2026',
  validUntil: '14 Sep 2026',
  serviceTitle: 'End of Lease Clean',
  propertySummary: '3 bed · 1 bath · 1 living area',
  address: 'Sandy Bay, TAS',
  client: { name: 'Sarah', phone: '', email: '' },
  lineItems: [
    { label: 'End of Lease Clean (3 bed / 1 bath / 1 living — 14.25h @ $65/hr)', amount: 925 },
    { label: 'Carpet Steam Clean — 3 rooms @ $40/room', amount: 120 },
  ],
  total: 1045,
  depositPct: 50,
  paymentNote: 'Payment details will be provided when you confirm your booking.',
};

function main() {
  const args = process.argv.slice(2);
  let data;
  let outPath;

  if (args[0] === '--example' || args.length === 0) {
    data = EXAMPLE_DATA;
    outPath = args[1] || path.join(__dirname, 'output', `${data.quoteNumber}.pdf`);
  } else {
    const jsonPath = path.resolve(args[0]);
    data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    outPath = args[1]
      ? path.resolve(args[1])
      : path.join(__dirname, 'output', `${data.quoteNumber || 'quote'}.pdf`);
  }

  fs.mkdirSync(path.dirname(outPath), { recursive: true });

  const html = buildQuoteHtml(data);
  const tmpHtml = path.join(os.tmpdir(), `pristine-quote-${Date.now()}.html`);
  fs.writeFileSync(tmpHtml, html, 'utf8');

  const browser = findBrowser();
  execFileSync(browser, [
    '--headless',
    '--disable-gpu',
    '--no-pdf-header-footer',
    `--print-to-pdf=${outPath}`,
    '--print-to-pdf-no-header',
    `file:///${tmpHtml.replace(/\\/g, '/')}`,
  ], { stdio: 'inherit' });

  fs.unlinkSync(tmpHtml);
  console.log(`✓ Quote PDF generated: ${outPath}`);
}

main();
