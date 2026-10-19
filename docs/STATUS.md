# Project status — 2026-10-18

## Snapshot
**Name:** Family Matters (proposed)  
**Repository:** alexusar/Splitcare (public)  
**Current live product:** SplitCare proof of concept on GitHub Pages, root `index.html`.  
**Phase:** planning/design for multiuser expansion. No Supabase project or shared backend connected yet.

| Area | Current status | Evidence / gap |
| --- | --- | --- |
| GitHub Pages | Working by user confirmation | https://alexusar.github.io/Splitcare/ |
| Original AppleCare tracker | Implemented prototype | `index.html`; localStorage; no shared sync |
| Spin to Pay | Implemented prototype | Weighted client-side wheel; local, resettable, not server-enforced |
| Receipt upload | Implemented prototype | Saved in localStorage; no OCR or payment settlement validation |
| Manual payment confirmation | Implemented prototype | User confirmation step, not independent bank verification |
| Actual auth and invitations | **Not started** | No user accounts, sessions or role policies |
| Shared expense database | **Not started** | No DB or server-side transactions |
| Real credit ledger | **Not started** | Prototype recalculates from local statuses |
| Chores | **Not started** | Design only |
| Trips / calendar | **Not started** | Design only |
| Reminders | **Not started** | No scheduling or email integration |
| OCR checks | **Not started** | Planned with admin review; no OCR engine selected |
| Zelle/Venmo handoff | **Not started** | No verified payment recipient configured |
| Page mockups | **Design artifact** | `docs/mockups/index.html` |
| Automated tests + CI | **Initial foundation committed** | `src/payment-rules.mjs`, `tests/payment-rules.test.mjs`, `.github/workflows/domain-tests.yml`; 6 tests passed locally in working container; GitHub Actions result not yet confirmed |

## Risks
1. Any visitor can download the publicly served page; current data is browser-local, not family-private server data. Anyone using a shared browser can access its local information.
2. Users on other phones have independent data. Wheel uniqueness and admin permissions require a backend.
3. Local receipt images can exhaust browser storage and may disappear if the user clears site data.
4. Screenshot OCR cannot establish funds settled; payment verification needs admin review.
5. Scope of family groups and transaction/credit edge cases not finalized.
6. Production deploy is currently a static public GitHub Pages site; private records must never be shipped in repository assets.

## Next recommended action
Review six-page mockups and confirm scope (one family vs multiple), then create M1 tickets: typed frontend shell, Supabase schema + RLS tests, invitations, and private storage. Do not migrate real receipts until M1 security checks pass.

## How to update this file
Change statuses only with a linked commit, acceptance tests, and observed deployment. Avoid optimistic percentages.

## Progress update — 2026-10-18 (phone-friendly work)
- Created six pure-domain tests for weighted wheel slices, pending/confirmed credit, waivers, and duplicate records. All six passed in local Node.js 22 test execution.
- Pushed rule module, tests, and GitHub Actions test workflow to `main`. CI outcome is not yet verified.
- Created issues [#1](https://github.com/alexusar/Splitcare/issues/1) through [#5](https://github.com/alexusar/Splitcare/issues/5) for shared database/security, invites/login, wheel migration, reminders/payment handoff and OCR.
- The new module is **not yet wired to the live SplitCare site**. Server-side auth and spin uniqueness remain unimplemented.

## SplitCare dashboard prototype — 2026-10-18
- Added **separate** responsive [member/admin dashboard prototype](../prototypes/splitcare-dashboards/index.html) at `prototypes/splitcare-dashboards/index.html`. It includes role switching, member dues, admin approvals, credit/activity, payment submission demonstration, login and invitation preview.
- Does **not** modify the live root `index.html`; existing tracker remains intact.
- Mock screens use illustrative amounts and simulated interactions. No true authentication, saved user accounts, invitation delivery, server-side authorization, Zelle handoff or uploaded receipts. Do not use real credentials or personal receipts in demo forms.
- GitHub Pages publication and live browser interaction have **not** been independently verified; repository commit was confirmed.

## Premium dashboard redesign — 2026-10-18
- Redesigned the **separate** `prototypes/splitcare-dashboards/index.html` using balanced premium colors, WebGL aurora (custom ShaderUI-inspired GLSL, **not** the official ShaderUI React package), refined navigation/cards, hero artwork, and better typography.
- iPhone-sized Chromium test (390×844): no JavaScript exceptions, no horizontal overflow; admin/member switching works.
- Added six dashboard contract tests in `tests/dashboard-prototype.test.mjs`. All six passed in hosted Node test environment. CI workflow includes dashboard file path on push and pull request; remote CI result not independently confirmed.
- Performance: low-power WebGL context, frame cap (~20fps), reduced render resolution, pause when tab hidden, CSS fallback, reduced-motion and save-data checks.
- No changes to root tracker `index.html`. This remains a demonstrative prototype, not real sign-in or settlement verification. Does not include bank/QR details.

## Interactive wheel added to dashboard prototype — 2026-10-18
- Added visible Spin to Pay page and dashboard shortcut for family and admin demonstration at `prototypes/splitcare-dashboards/index.html`.
- Wheel has 10 mixed slices (one free, six regular, two double, one triple), legible centrally placed SVG labels, and a visible once-per-month warning.
- Demo result persists in browser localStorage for the example member; reset is available with explicit confirmation. This **does not** affect the live tracker and is **not** server-enforced or cross-device.
- Verified in headless Chromium at 390px mobile width: SVG rendered, no JavaScript errors or horizontal overflow, spin blocked after first use, result persisted after reload.
- Dashboard contract tests: **7/7 passed locally**. GitHub Actions outcome still unverified.

## Member payment and admin approval flow prototype — 2026-10-18
- Made wheel prominent on member home (SVG), added payment handoff and simulated submission form with amount, month, filename-only attachment indicator.
- Added demo admin queue with per-submission details, settlement acknowledgement checkbox, simulated approve/reject, and in-memory update across role switching. No real file bytes are uploaded or persisted; do not enter real transaction details.
- Zelle QR and recipient identity are deliberately hidden until an authenticated/private backend exists; payment links do not work yet.
- Mobile headless Chromium verified: member → submit → admin → cannot approve without checking acknowledgement → approve; 390px viewport no overflow or page errors.
- Dashboard contract suite: 9/9 locally passing. GitHub Actions status still to be verified; production root tracker unchanged.

## Interim family trial and rare triple-spin odds — 2026-10-18
- Updated live root tracker and separate premium prototype to wheel odds **10% FREE, 80% 1×, 9% 2×, 1% 3×**. Triple slice visually occupies only 3.6°. Previously saved spins retain their outcomes. This changes future spins only.
- Live tracker payment details now offer **I sent payment — share update** via native share sheet or copy fallback; it is self-reported and requires independent confirmation by the organizer. Wheel dialog also offers share-result action.
- No real signup/sign-in, family data sync, server-enforced one-spin cap or payment validation is available without an authenticated backend. Never present demo login as real.
- Domain and dashboard tests updated for revised odds: **15/15 passed in isolated Node run**. Headless Chromium at 390px showed no JS errors or horizontal overflow on live tracker or separate prototype. GitHub Pages propagation was not independently verified.
- No personal Zelle QR, phone number, or financial receipts were committed.

## Correction: multipliers do not create future AppleCare credit — 2026-10-19
- Confirmed product rule: FREE = $0, 1× = base, 2× = twice base, 3× = three times base, **for that month only**.
- Updated live due calculations to ignore all prior months' payments and removed applied-credit display and CSV column. Existing stored spin and payment records remain unchanged; amounts due recompute without discounts.
- Updated planning-stage calculation rules, tests, and standalone premium prototype to remove future AppleCare credit claims. The optional family-trip fund is only an idea, with no money automatically allocated.
- Verification: all **17 automated tests passed** in a local run; Chromium mobile browser checks for live tracker and preview had no JS exceptions and no sideways scrolling. GitHub Pages propagation not independently verified.

## Monthly payments no longer earn future credit — 2026-10-19
- Updated the live `index.html` payment calculation: each month is independent, `due = base × wheel multiplier`. A 2× or 3× payment never reduces later AppleCare bills, including if marked paid.
- Removed obsolete carry-forward credit wording from the live tracker, payment details, and CSV export. Existing spin/payment histories are preserved; displayed dues recalculate under the clarified rule.
- Updated the separate premium dashboard to explain no future AppleCare credits; "Trip idea" is illustrative only, with **no automatic trip allocation or real fund**.
- Updated `src/payment-rules.mjs` and domain tests for independent monthly amounts. Verified all **17/17** repository tests locally, both screens load in mobile Chromium at 390px with no JS page errors or horizontal overflow.
- The tracker remains per-device, not shared/authenticated; prior saved spins are not altered.

## Family trip pot — 2026-10-19
- Live root tracker adds a family trip pot above the payment checklist, with a $500 default goal, progress bar, per-member contributions, and a separate pending-extra label.
- Once a 2× or 3× payment is marked paid on this browser, only the extra over the base monthly amount counts for the trip (e.g. $10 extra for 2×, $20 extra for 3× on a $10 base). Unpaid spins never inflate confirmed pot total. FREE and 1× contribute $0.
- Progress aggregates recorded paid extra contributions across all saved months; goal can be edited while amount editing is unlocked. Newly created spins snapshot the base amount for more stable accounting. Historical old spins without snapshots use current member base as fallback.
- Pot is a tracker, not a real bank account. It is not synced across devices and does not deduct from future AppleCare amounts. Manual payment confirmation is not proof of transfer.
- Browser tested on 390px viewport: $10 confirmed + $20 pending correct, 10% progress of $100 goal, no JS errors or horizontal scrolling. Node suite **18/18** passed locally.
