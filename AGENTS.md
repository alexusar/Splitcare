# Family Matters — agent working agreement

## Read first
1. `docs/STATUS.md` — actual implementation, risks, blockers.
2. `docs/PRODUCT_SPEC.md` — user scenarios and acceptance criteria.
3. `docs/GLOSSARY.md` and `docs/DECISIONS.md` — domain and decisions.
4. `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `docs/DESIGN.md`.
5. Relevant ticket in `docs/ROADMAP.md`.

## Matt Pocock skills
Use the official upstream [mattpocock/skills](https://github.com/mattpocock/skills). When working in a local coding-agent environment, install via `npx skills@latest add mattpocock/skills` and run `/setup-matt-pocock-skills` if supported by that agent. This document configures expectations; **installing the actual skills has not been performed** in this repository. Do not claim a skill was executed when it wasn't.

Preferred sequence: `to-spec` → `to-tickets` → `implement` with `tdd` → `code-review`; use `domain-modeling`, `prototype`, `diagnosing-bugs`, and `research` as needed. Keep user in charge of irreversible product/security decisions.

## TDD mandatory for production features
- Choose one observable behavior (public interface, API or UI).
- Write one failing test (**RED**); record or run it to confirm the failure.
- Implement just enough for that test to pass (**GREEN**).
- Refactor only when all relevant tests pass. Repeat in vertical slices.
- Use expected literals from the spec, not values computed via the same algorithm as implementation.
- Test authorization denial, malformed data, duplicate requests, timezone boundaries, concurrent spins, and credit invariants.
- Prefer real local test database + UI interaction over mocking internals.
- Every PR includes test evidence, security notes, screenshots for UI changes, and a link to the ticket.

## Security invariants
- Do not commit personal data, email addresses, financial screenshots, API secrets, access tokens, service-role keys, or payment recipient details.
- Backend must enforce family membership, admin role, one spin per month, and private receipt access; never trust only client-side checks.
- OCR = suggestion for human review, never evidence that funds settled.
- Never mark a payment confirmed solely because a screenshot exists.
- No direct handling of bank credentials and no unreviewed payment redirects.
- GitHub Pages is a public static host, not a private database.
- Receipt files require private storage, signed short-lived access, size/type verification.
- New data migrations must preserve an export and rollback path.

## Definition of done
Acceptance criteria verified, tests passing, browser/mobile check performed, security reviewed, deployment verified, docs/status updated. Keep one live site functioning throughout the migration.
