# Architecture proposal — not yet implemented

## Hosting
- **Frontend:** continue GitHub Pages. Current `index.html` is a temporary static prototype. Future build may be Vite + TypeScript + React to improve tests/routing and preserve GitHub Pages deployment.
- **Identity/data/storage:** proposed Supabase Auth + Postgres + RLS + private Storage buckets.
- **Trusted operations:** Edge Functions / database transactions for invitations, spins, payment approvals, ledger entries, reminders, and signed upload URLs.
- **Optional later:** OCR service, email provider, external calendar connectors.

## Core tables (proposed)
`families(id,name)`, `profiles(user_id,display_name)`, `memberships(family_id,user_id,role)`, `invitations(family_id,email_hash,token_hash,expires_at,consumed_at)`, `expense_groups(id,family_id,type,name,monthly_price)`, `expense_participants(group_id,user_id,base_cents)`, `cycles(id,group_id,year,month,timezone)`, `spins(id,cycle_id,user_id,multiplier,created_at,reset_reason)`, `payment_submissions(id,cycle_id,user_id,amount_cents,status,receipt_path)`, `payment_approvals(id,submission_id,admin_id,decision,created_at)`, `credit_ledger(id,family_id,user_id,source_id,delta_cents,type,created_at)`, `chores`, `chore_occurrences`, `trip_proposals`, `availability_votes`, `activity_events`, `notification_preferences`.

## Permission boundaries
- Only invitees can join; invitation consumed once and bound to email.
- Membership and role checks enforced by database RLS on every query and storage access.
- Service-role secret only server-side; never include in GitHub repository or browser JS.
- Only admin can approve payment, change wheel settings or adjust credit; all logged.
- Members see own private receipts; family-wide aggregate totals can be shared as policy permits.
- Calendar vote is an explicit availability signal, not raw event details.

## Wheel transaction
1. Verify auth, family membership and eligible cycle on server.
2. In one atomic DB operation: enforce unique (cycle_id,user_id), generate cryptographically secure outcome in assigned weighted intervals.
3. Persist immutable spin event, return same result on retry, update payable amount.
4. Reset is admin-only, audited; prefer invalidation and replacement rather than deletion.

## Credit ledger rules
- Store integers in cents, never binary floating-point money.
- On *confirmed and settled* payment, add excess owed above base as credit via idempotent transaction.
- On future confirmed application, debit eligible credit at most once.
- Free month uses explicit waiver; does not create a financial payment.
- Corrections require compensating ledger entries, not silent overwrite.
- Clarify whether pending credit can be reserved and rules for changed base amounts before implementation.

## Receipt-review workflow
Pending upload → Pending admin review → Confirmed or Rejected. Optional OCR adds extracted fields and confidence, not final state. Private objects have constrained types/sizes, malware/privacy controls, expiry, deletion policy and short-lived signed access.

## Migration
Provide client export; import into authenticated account after user reviews mapping. Hash/dedupe legacy receipts and spins; preserve history, require admin confirmation for imported paid statuses. Keep old prototype until sign-off.
