# Family Matters

**Family Matters** is a planned invitation-only family hub for shared expenses, chores and trip planning. It grows out of the currently deployed **SplitCare / AppleCare One** tracker.

## Start here

- **Current working prototype:** [Open SplitCare](https://alexusar.github.io/Splitcare/)
- **Family Matters designs:** [Explore six interactive page mockups](https://alexusar.github.io/Splitcare/docs/mockups/)
- **Product requirements:** [PRODUCT_SPEC.md](docs/PRODUCT_SPEC.md)
- **What exists today:** [STATUS.md](docs/STATUS.md)
- **Prioritized work and milestones:** [ROADMAP.md](docs/ROADMAP.md)
- **Proposed architecture/security:** [ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Test-driven development standard:** [TESTING.md](docs/TESTING.md)
- **Visual design:** [DESIGN.md](docs/DESIGN.md)
- **Domain terminology:** [GLOSSARY.md](docs/GLOSSARY.md)
- **Settled/open decisions:** [DECISIONS.md](docs/DECISIONS.md)
- **Agent instructions:** [AGENTS.md](AGENTS.md)

## Product map

| Destination | Planned experience |
| --- | --- |
| **Home** | Family overview, upcoming expenses/chores/trips and activity |
| **Expenses** | Shared expense groups and member contributions |
| **AppleCare One** | Existing SplitCare payment tracker, spin wheel, credits, proof review |
| **Chores** | Recurring assignments, optional approvals and points |
| **Trips & Calendar** | Destination proposals, free/busy voting, dates and itinerary |
| **Family Administration** | Invitations, roles, privacy and preferences |

## Important distinction

The live `index.html` is still a **browser-local prototype**; it is **not** a secure, synchronized family portal. Its receipt attachments live in browser storage and its spin limits are not enforced across devices. The mockups are only visual designs and do not have functioning payments, accounts or calendars. GitHub Pages hosts public static frontend files, so do not put family information or receipts in repository files.

The planned upgrade introduces backend-authoritative identity, roles, shared records, private receipt storage, server-enforced wheel, an auditable credit ledger, chores, trip date polls, and optional OCR-assisted payment review. OCR is not proof that a transfer settled.

## Development workflow

Follow [AGENTS.md](AGENTS.md): Matt Pocock's skills-inspired **spec → tickets → one test at a time (red / green / refactor) → review**, plus privacy/security review before deployment. Skill installation and actual automated tests are separate tasks and are *not yet completed*.

## Repo naming

The repository remains **alexusar/Splitcare** to preserve the current GitHub Pages URL during planning. Renaming it to Family Matters can be a later managed migration.
