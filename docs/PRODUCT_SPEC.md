# Product specification — Family Matters (draft v0.1)

**Product:** An invitation-only shared space for a family to coordinate money, household responsibilities, and time together.

## Product goals
1. Reduce friction collecting shared recurring expenses.
2. Clarify who is responsible for what chore, without passive-aggressive group texts.
3. Find mutually available trip dates without exposing private calendar event details.
4. Be delightful and easy to use on mobile; retain existing SplitCare wheel.
5. Keep members' receipts and family records private.

## Navigation
- **Home** — upcoming tasks, pending payment approvals, trip polls, activity.
- **Expenses** — expense groups and monthly balances.
- **AppleCare One (within Expenses)** — migrated SplitCare tracker, proof, spin, credit ledger.
- **Chores** — assign, recur, complete, approve, points optional.
- **Trips & Calendar** — date proposals, availability votes, itinerary and budget.
- **Family / Settings** — invitations, profiles, permissions and preferences.

## Users and access
- **Family admin:** manages family, expense groups, invitations, chore templates, trip polls, payment verification, and wheel resets; sees family-owned records.
- **Member:** sees their own payment obligations and files, shared chores/trips according to family rules, can submit proof and manage own availability; cannot approve own payment or reset spins.
- **Invitation:** admin enters email or generates single-use, expiring invitation; invited person verifies email and sets password. Re-invites/revocations are handled server-side.
- **Scope still open:** single family group initially vs multi-family support from the start. Architecture should be family-ID scoped either way.

## Expenses requirements
- Admin can create expense groups (AppleCare One first), define monthly price, members, individual base contributions.
- Each member has a monthly bill with expected amount, status: due → proof submitted / needs review → confirmed / rejected; free-month waiver handled separately.
- **Wheel:** once per member, per expense cycle/month, server-enforced. Outcomes 0× 10%, 1× 60%, 2× 20%, 3× 10%. No reroll; admin reset must create audit event.
- **Credits:** extra actually-confirmed 2×/3× funds become future credit. Credit is applied once, with auditable ledger entries; no credit minted for pending/rejected proof.
- Admin reviews amount, month/year, recipient, reference and status from submitted proof and/or independent receipt of funds. Only admin confirms payment.
- Provide user-controlled Zelle/Venmo recipient link or QR, displayed with verified identity and exact amount. **No bank account access; no automatic claim of payment settlement.**
- Receipt OCR may extract date, amount, status, recipient and reference as a *review suggestion*; uncertain values or mismatches are flagged, never auto-confirmed.
- Overpayments, manual adjustments, partial payments, reversals, credited free months require explicit policies before implementing beyond MVP.

## Chores requirements
- Admin creates chore with title, assignee(s), due date, repeat rule, optional evidence/points.
- Member can mark done; optional admin approval; activity timeline and notification.
- Rotations and streaks are later phase; chores should never be mistaken for financial obligations.

## Trips & availability requirements
- Member proposes a destination, budget range, travel window and description.
- Family votes on dates; per-person private free/busy responses, never disclose underlying event text.
- Calendar month view with availability overlays; best-match date calculations.
- Itinerary and shared trip expenses. Optional Google/Apple/Outlook integration only with member consent; **manual availability first**.

## Cross-cutting requirements
- Role-based data access enforced in backend, mobile first, accessible labels, reduced-motion support.
- Invitations, reminders and approval events produce activity records.
- Backup/export of records, privacy controls, account removal and data retention documented.
- No mandatory bank or calendar connections.

## Acceptance scenarios
1. Dana uploads evidence for a $20 October bill; app displays Pending Review. Admin checks receipt/funds, approves; Dana's payment becomes Confirmed and eligible excess credits post once.
2. Caro spins 3× in October; a repeat request or second device cannot change the result.
3. A user outside the family cannot read a receipt, activity record, or trip availability.
4. Member declines to share calendar event details yet can vote 'free' for Nov 20–21.
5. Admin creates a repeating weekly chore; next week's instance is separately tracked.
6. The GitHub Pages prototype remains usable until live database migration is deliberately approved.

## Explicit non-goals for first release
Bank account aggregation, direct Zelle money movement, fully automatic screenshot approval, full itinerary booking, public marketplace or public family directory.
