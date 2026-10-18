# Decisions and open questions

## Accepted / user-indicated
- **ADR-001 — Brand:** Family Matters, with Home, Expenses (AppleCare group), Chores and Trips/Calendar.
- **ADR-002 — Hosting:** existing GitHub Pages frontend and repo `alexusar/Splitcare` stay in place during planning.
- **ADR-003 — Accounts:** private invitation, verified email and password for family members. Admin has separate authorization; usernames are optional display names, not sufficient identity.
- **ADR-004 — Money movement:** Zelle/Venmo handoff/QR only; users authorize inside payment services. No bank login inside Family Matters.
- **ADR-005 — Receipt checks:** explore OCR extraction; require admin review for final approval.
- **ADR-006 — Wheel odds:** 10% zero, 60% normal, 20% double, 10% triple; one per person per month; excess confirmed payments apply as future credit.
- **ADR-007 — Development discipline:** use Matt Pocock-inspired spec→tickets→TDD→review; no claim of skill installation or passing tests until verified.

## Proposed, pending confirmation
- **OPEN-001:** single family only or multiple independent families supported from day one?
- **OPEN-002:** who may view aggregate household payments and individual balances?
- **OPEN-003:** one admin only or ability to designate other admins?
- **OPEN-004:** should a zero-cost/free wheel result auto-waive or require admin acknowledgement?
- **OPEN-005:** what happens to credits if contributions change, members leave, or payments are reversed?
- **OPEN-006:** choose Supabase backend only after evaluating costs/privacy and creating credentials *outside* GitHub.
- **OPEN-007:** exact Zelle/ Venmo recipient identity and app handoff must be provided and verified by admin, not guessed.
- **OPEN-008:** reminders cadence, timezone, quiet hours, opt-outs, and email provider.
- **OPEN-009:** calendar sync consent boundaries and whether manual polling suffices for MVP.
- **OPEN-010:** repository rename to Family Matters after migration; preserve redirects/links.
