---
name: pristine-quote
description: Use this skill to calculate an End of Lease (bond/vacate) cleaning quote for Pristine Cleaning Co, or to draft a reply to a customer's end of lease quote request. Trigger when the user pastes/describes a lead's property details (bedrooms, bathrooms, living areas) and asks for a quote, price, or reply to send. Only covers End of Lease — Residential, Carpet Steam (standalone), and Pre-Sale are not yet calibrated with real market data.
---

# Pristine End of Lease Quote Calculator

## Data provenance

This formula is calibrated from two real competitor quotes for the same
property (4 bed / 2 bath / 1 living, furnished house, Moonah TAS), obtained
7 April 2026:

- **BCIC (bondcleaninginhobart.com.au):** $1,105 for 17 hours labour at an
  explicit **$65/hour per cleaner** rate ($1,070 after a $35 discount).
  Carpet steam clean NOT included. Garage/outdoor NOT included.
- **Jim's Cleaning (Kingston TAS):** $1,080 flat package, carpet steam
  clean of all carpeted rooms INCLUDED in that price.

Only one property size is anchored by real data. The formula below is
well-calibrated for **3–5 bedroom homes**. For studios/1-bedroom units, do
not trust the linear formula — apply the minimum call-out fee instead (see
below) until we have a real data point at that end of the market.

## Base pricing formula

```
Hours = 8  (base: kitchen, laundry, general areas, windows, wall spot-clean, floors)
      + Bedrooms    × 1.25h
      + Bathrooms   × 1.5h
      + Living areas × 1h

Price = Hours × $65/hour
```

Verification against the anchor data point: 8 + (4×1.25) + (2×1.5) + (1×1)
= 17h × $65 = $1,105 — matches BCIC exactly.

## Minimum call-out

For studio/1-bedroom properties, or if the formula above produces less
than $320, quote a **flat minimum of $320**. Flag this to the business
owner as an estimate to validate against a real small-property quote —
we don't have market data at that end yet.

## Extras (charged separately, NOT included in the base price)

Pristine deliberately prices these apart from the base End of Lease clean,
matching the BCIC/market standard rather than Jim's all-inclusive bundle:

| Extra | Price | Notes |
|---|---|---|
| Carpet steam clean | **$40 per carpeted room** (bedroom or living area) | Estimated default — no direct competitor data point for this specific line item yet. Adjust once validated. |
| Garage & outdoor areas (garage, balcony, outdoor spot-clean) | **$65 flat** | One labour-hour equivalent at the base rate. |
| Grout / mould / ceiling cleaning | Quote separately on inspection | Both competitors exclude this from their base bond clean — Pristine does too. |

Always list these as optional add-ons in the quote, never bundle them into
the base price silently.

## Commercial terms to include in every quote

- **Deposit: 50%** of the total, due to confirm the booking. Balance due
  on completion of the clean. (Matches Jim's — friendlier than BCIC's
  100%-upfront, while still protecting cash flow.)
- **No GST** — Pristine is not currently GST-registered. Do not add a GST
  line to quotes. (Revisit this skill once/if the business registers.)
- **Booking lead time:** recommend booking at least 10 days in advance.
- **Cancellation:** 24 hours notice required to avoid a late cancellation
  fee.
- **Bond-back guarantee:** Pristine returns free of charge to re-clean any
  issue the property manager notes in the exit report, provided the
  customer notifies us within **72 hours** of that inspection. We
  re-clean within 24 hours of being notified.
- **Vacant-property clause (Tasmania CBOS):** the guarantee does not cover
  dust/marks accumulated from agent inspections or tradespeople if the
  property sits vacant for 7–10+ days after our clean before the final
  inspection — consistent with Consumer, Building and Occupancy Services
  (CBOS) Tasmania tenancy guidance.

## How to calculate and respond

1. Extract from the lead's details: bedrooms, bathrooms, living areas,
   whether carpeted rooms need steam cleaning, whether garage/outdoor is
   requested, and the property address/suburb.
2. Compute Hours and Price with the base formula. If below the minimum
   call-out threshold, use $320 instead and note it's an estimate.
3. Add any requested extras as separate line items using the table above.
4. Produce a quote in this structure (adapt tone to match the site's
   voice — direct, friendly, no corporate filler, no em dashes):
   - Greeting using the customer's name
   - One-line summary of the property (beds/baths/living, furnished or
     not, address if provided)
   - Base clean price
   - Extras as separate lines with prices, only if requested/relevant
   - Total
   - Deposit due now (50%) and balance on completion
   - One line on the bond-back guarantee
   - Call to action: confirm the booking date, or call 0450 349 425 with
     questions
5. Always show your hour/price math so the business owner can sanity-check
   the number before sending — never just output a final price with no
   visible reasoning.
6. If a job clearly involves grout, mould, or ceiling issues, do not price
   it — say it needs to be quoted after an inspection, matching market
   practice.
7. To produce the branded PDF version of the quote, build a data object
   matching the shape documented in `quotes/template.js` (quoteNumber,
   issueDate, validUntil, serviceTitle, propertySummary, address, client,
   lineItems, total, depositPct, paymentNote) and run:
   `node quotes/generate.js <path-to-data.json>` from the project root
   (or `node quotes/generate.js --example` to sanity-check the template
   itself). This renders the same branded header/layout that will later
   be reused for email quotes once Gmail access is connected — keep that
   visual consistent, don't design a second look for email.

## Known gaps to close as more market research comes in

- Carpet steam clean rate ($40/room) is an estimate, not from a
  competitor quote — the business owner is collecting quotes for this
  specifically. Update the rate table above once that data arrives.
- No real data point yet for small properties (studio/1-bed) — the $320
  minimum call-out is a placeholder, not derived from a competitor quote.
- This skill only covers End of Lease. Residential, Carpet Steam
  (standalone), and Pre-Sale need their own market research before they
  can get a real formula here.
