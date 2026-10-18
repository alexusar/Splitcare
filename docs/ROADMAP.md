# Roadmap and actionable to-dos

Legend: [x] known done, [ ] not done. Priority P0 before P1 before P2. Tickets are proposed work slices, not completed work or existing GitHub Issues.

## Current prototype
- [x] GitHub Pages hosts the existing SplitCare single-file tracker.
- [x] Local month switching, per-member totals, payments, receipt storage, JSON/CSV export.
- [x] Weighted monthly wheel and local credit calculation.
- [x] Improved wheel labels and mixed slice positions, payment confirmation prompt, test-spin reset.
- [ ] Test current prototype on multiple mobile browsers and confirm all payment edge cases.
- [ ] Create a safe export/import migration plan before remote storage is introduced.

## P0 — planning, foundation & security
- [x] SPEC-001: Write product spec, status, roadmap, architecture, testing, glossary and design direction.
- [x] DESIGN-001: Create six-page interactive UI mockups for review.
- [ ] DECISION-001: Confirm whether one family or multiple independent family groups are supported.
- [ ] DECISION-002: Confirm the exact receipt-review requirement, payment types and payment recipient settings.
- [ ] INFRA-001: Set up Supabase project, dev/prod separation, secrets and documented free-tier limits.
- [ ] INFRA-002: Add typed frontend structure/build tooling, CI checks, Playwright smoke tests; keep GitHub Pages deployed.
- [ ] AUTH-001: Invitation tokens + email verification + password login; test one-time expiry and invalid token.
- [ ] AUTH-002: Admin/member policies and database row-level security (RLS); test forbidden cross-family access.
- [ ] DATA-001: Schema, migrations, auditing, private receipt storage and signed URLs; test authorization.
- [ ] DATA-002: Export/import of browser-local SplitCare data without duplicate credits/spins.

## P1 — usable product vertical slices
- [ ] NAV-001: Home shell, responsive navigation and member profile.
- [ ] EXP-001: Add/view expense groups; AppleCare group migrated intact.
- [ ] EXP-002: Server-authoritative monthly bill states + admin proof approval.
- [ ] EXP-003: Atomic server-enforced wheel with exact weighted odds and monthly uniqueness.
- [ ] EXP-004: Immutable credit ledger, idempotent posting, adjustments/reversals.
- [ ] EXP-005: Zelle and Venmo handoff/QR + verify recipient + manual receipt review.
- [ ] CHORE-001: Add/assign/complete chores; recurrence and optional approval.
- [ ] TRIP-001: Propose trip and vote on dates; calendar availability grid with privacy.
- [ ] NOTIFY-001: Email invitation and actionable reminders; opt out and rate limiting.
- [ ] ACTIVITY-001: Family activity timeline with accurate actor/time/event metadata.
- [ ] QA-001: Cross-device, security and accessibility acceptance test pass.

## P2 — optional extensions
- [ ] OCR-001: Private-image extraction + flagging, administrator always decides.
- [ ] TRIP-002: Shared itinerary, trip expense group, polls and budget.
- [ ] CAL-001: Opt-in Google/Apple/Outlook busy-only calendar integration.
- [ ] CHORE-002: Fair rotation, optional points, achievements/streaks.
- [ ] UX-001: PWA installability, offline read cache, push notifications.

## Milestones
- **M0:** spec/mockups reviewed and open decisions answered.
- **M1:** invite-only secure shell + shared data + passing policy tests.
- **M2:** AppleCare migrated, approved payments/credits and server wheel operational.
- **M3:** chores + trip-date voting + reminders.
- **M4:** OCR and external integrations after privacy/cost review.

## Release checklist for every milestone
[ ] tests ran and passed  [ ] no sensitive data leaked  [ ] mobile/browser QA  [ ] security review  [ ] production URL verified  [ ] STATUS.md updated.
