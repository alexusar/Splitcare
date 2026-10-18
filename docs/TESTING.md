# Testing and TDD plan

Based on upstream `mattpocock/skills` / `tdd`; this is a repo policy, **not evidence tests have run**.

## Test-first loop
1. Pick **one observable scenario** and write an acceptance condition using a literal expected answer.
2. Write one failing automated test (RED) via a public API or screen action.
3. Implement the smallest behavior required (GREEN).
4. Refactor only after green; run the surrounding suite.
5. Repeat by thin vertical slices through UI, auth, DB, and storage.
6. Run typecheck, unit/integration, browser smoke and RLS tests in CI.

## Proposed tooling
TypeScript strict mode; Vitest or Node test runner; Playwright for browsers and mobile viewport; Supabase CLI/Postgres test environment with RLS integration tests; accessible queries (role/label) rather than fragile CSS selector tests. These are proposals and must be installed/verified.

## Priority tests (spec → expected observable outcome)
- Wheel: draw integer buckets [0,9] → 0×; [10,69] → 1×; [70,89] → 2×; [90,99] → 3×. Verify table mapping independently.
- Concurrent spin: two simultaneous requests for the same (cycle,member) → exactly one persisted outcome; both receive that identical result.
- Cross-family: family A member requesting family B receipt → denied, even if ID is known.
- Admin approval: member cannot confirm own payment; admin sees pending submission, checks and confirms.
- $10 base at 3×: owed $30; pending proof => $0 new confirmed credit; after approval => $20 credit; next eligible $10 charge covered once, leaving $10.
- Rejected proof => no credit.
- Free 0× => $0 owed and status 'waived', not '$0 transfer received'.
- Duplicate approval request => no duplicate ledger event.
- Calendar privacy: inviting another member exposes 'busy', not event title or location.
- Chore weekly recurrence: completing week 1 leaves week 2 instance pending.
- Invitation: token expires, can be consumed once, wrong-email use denied.
- Receipt: unauthorized download fails, oversized/unsupported uploads rejected.
- Accessibility: wheel result announced by screen reader; keyboard navigation works and reduced motion respected.

## CI gate
Build, lint, typecheck, focused integration/unit tests, Playwright smoke on Chrome/WebKit mobile, schema migrations, and policy tests. Failure blocks merge. Record command outputs and artifacts per PR.

## Definition of done
Green tests, reviewed permissions, no direct secrets in client, responsive screenshots, deployed URL verified, docs updated.
