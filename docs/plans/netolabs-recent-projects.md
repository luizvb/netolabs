---
title: NetoLabs recent projects portfolio delta
status: in_progress
owner: fde
created: 2026-07-13
updated: 2026-07-13
run: /Users/luizneto/Documents/Obsidian Vault/Memory/Runs-history/2026-07-13-1739-netolabs-projetos-recentes.md
---

# NetoLabs recent projects portfolio delta

## Decision and gate

`recommendation: go`

Define the smallest evidence-backed update that adds the latest public projects deployed under `*.netolabs.dev`, with real product screenshots, while preserving the current NetoLabs brand, information architecture, lifecycle taxonomy, links, and SEO. This document is the FDE contract for the `PRODUCT CONTRACT` gate; Coder owns the next engineering section and Tester alone owns release readiness.

## Status and owners

| Step | Owner | Status | Exit evidence |
| --- | --- | --- | --- |
| Confirm current portfolio and public aliases | FDE | completed | `E-001` through `E-009` |
| Decide inclusion, lifecycle, copy, links, and asset sources | FDE | completed | `D-001` through `D-008`, `FR-*`, `AC-*` |
| Add engineering plan before product-code or asset mutation | Coder | completed | Engineering plan in the Coder section, mapped to `FR-*` / `AC-*` |
| Implement the approved portfolio delta and engineering tests | Coder | completed | Eleven-card data/rendering delta, nine optimized assets, 8 contract tests, and green test/lint/build/diff evidence |
| Independently validate acceptance and visual behavior | Tester | pending | `ready`, `conditional`, or `blocked` with evidence |
| Publish and verify the production release | Main | pending | Authorized commit/deployment and production smoke evidence |

## FDE contract

### Problem, user, and outcome

**User/job hypothesis.** A visitor evaluating NetoLabs — prospective collaborator, customer, operator, or technical peer — needs a current, credible portfolio snapshot and a direct path to the products, without having to infer which projects are live from GitHub or deployment history.

**Problem statement.** The July 2026 site lists seven projects, but only VOXA has a real product image, four newer public launches are absent, and the Forge positioning no longer matches its current public product surface.

**BET-001.** If NetoLabs represents every current public `*.netolabs.dev` project with an accurate card, a real screenshot, and a valid canonical destination — while keeping repository-only tools — visitors can understand the latest portfolio without NetoLabs inventing maturity, traction, stack, or proof.

**Success signal.** The released portfolio contains the approved eleven distinct projects; all nine public product links work and each of those nine cards renders its matching real screenshot; the two repository-only tools remain reachable; responsive, accessibility, privacy, SEO, and quality gates pass.

**Falsification/stop condition.** Block or reduce the release if a candidate cannot be tied to a public `netolabs.dev` alias, its identity/copy cannot be grounded in its source repository, its screenshot exposes private information, or the expanded grid cannot preserve readable responsive behavior.

No market benchmark, pricing change, onboarding/auth change, analytics instrumentation, business-model decision, or Stripe behavior is required: this is a narrow portfolio-content delta that does not change NetoLabs' product thesis.

### Primary journey

1. Visitor arrives at the existing NetoLabs homepage and navigates to `#portfolio`.
2. Visitor sees the unchanged lifecycle legend and a July 2026 snapshot ordered by lifecycle, with recent projects first inside the relevant lifecycle.
3. For each public web project, the visitor sees a real, recognizable screenshot and grounded summary.
4. Visitor opens the public deployment; when a repository is public, the visitor may also open GitHub.
5. Benchline exposes only its public product destination because its source repository is private.

Time to value is the first viewport of the portfolio section; login is not applicable because NetoLabs is a public static portfolio.

### Context observed and evidence ledger

| ID | Class | Claim | Source |
| --- | --- | --- | --- |
| E-001 | observed | `src/data/projects.ts` contains 7 entries: Forge, VOXA, LegacyBridge, Logr, Pitch Perfect AI, MockData AI, and FeedbackFlow. Five have `*.netolabs.dev` destinations; LegacyBridge and Logr are repository-only. | `src/data/projects.ts:1`; inspected 2026-07-13 |
| E-002 | observed | The current card contract requires a GitHub URL and supports a fixed VOXA image only; every other project uses generated accent art. | `src/components/motion-elements.tsx:86`; inspected 2026-07-13 |
| E-003 | observed | Vercel aliases confirm the recent absent launches `misebuy.netolabs.dev`, `misebuy-prep.netolabs.dev`, `agent.netolabs.dev`, and `evals.netolabs.dev`; existing aliases include `forge`, `voxa`, `pitch`, `mockdata`, and `feedback`. | `npx vercel alias ls` plus paginated output, account `luizvb`, 2026-07-13 |
| E-004 | observed | All nine selected public URLs returned HTTP 200 during FDE inspection. | `curl -L` smoke against the nine HTTPS URLs, 2026-07-13 |
| E-005 | observed | MiseBuy compares restaurant supplier lists and exports a reviewed buying plan; its public preview runs locally without a backend. MiseBuy Prep is a separately useful, free, browser-local companion tool that normalizes one supplier list. | `Repositories/misebuy/README.md`; `Repositories/misebuy-prep/README.md` |
| E-006 | observed | Aquiles is an end-to-end AI development agent for Codex; the inspected sales site uses Next.js, React, and Motion. | `Repositories/aquiles-agent/README.md` |
| E-007 | observed | Benchline owns an agent-evaluation and release-decision loop; its public destination is `evals.netolabs.dev`. | `/Users/luizneto/mz/netolabs-benchline/README.md`; `/Users/luizneto/mz/netolabs-benchline/docs/PRODUCT.md` |
| E-008 | observed | MiseBuy, MiseBuy Prep, Aquiles Agent, and the existing project repositories are public; `luizvb/netolabs-benchline` is private. | `gh repo view ... --json nameWithOwner,url,visibility,isPrivate`, 2026-07-13 |
| E-009 | observed | Browser captures at 1440×900 exist for the nine selected web projects and show only their public surfaces. Forge now presents itself in Portuguese as operational AI for real workflows, not only generic ADK infrastructure. | `Memory/Runs-history/assets/netolabs-project-screenshots/`; `Repositories/netolabs-forge/apps/web/src/pages/Landing.tsx:31` |
| E-010 | observed | CaaSy is public at `caasy.vercel.app` but has no observed `*.netolabs.dev` alias; FundFold likewise has no selected `*.netolabs.dev` alias. | Vercel alias inventory, 2026-07-13 |

### Portfolio inclusion and exclusion

| Project/surface | Decision | Lifecycle | Canonical public destination | Rationale |
| --- | --- | --- | --- | --- |
| Forge | retain; refresh copy and add screenshot | focus | `https://forge.netolabs.dev` | Already approved as focus; current public positioning changed materially. |
| VOXA | retain; add screenshot | focus | `https://voxa.netolabs.dev` | Existing approved project and live alias. |
| Aquiles | add | tool | `https://agent.netolabs.dev` | Distinct public project and reusable Codex capability; `tool` does not imply traction. |
| MiseBuy Prep | add | tool | `https://misebuy-prep.netolabs.dev` | Repository explicitly identifies it as an independently useful free tool. |
| LegacyBridge | retain unchanged | tool | GitHub only | Existing portfolio scope is preserved; no web screenshot is fabricated. |
| Logr | retain unchanged | tool | GitHub only | Existing portfolio scope is preserved; no web screenshot is fabricated. |
| Benchline | add | experiment | `https://evals.netolabs.dev` | Real public product surface, conservatively classified because no market validation is evidenced; no private GitHub link. |
| MiseBuy | add | experiment | `https://misebuy.netolabs.dev` | The repository calls the current experience a public preview and seeks workflow validation. |
| Pitch Perfect AI | retain; add screenshot | experiment | `https://pitch.netolabs.dev` | Existing approved project and live alias. |
| MockData AI | retain; add screenshot | experiment | `https://mockdata.netolabs.dev` | Existing approved project and live alias. |
| FeedbackFlow | retain; add screenshot | experiment | `https://feedback.netolabs.dev` | Existing approved project and live alias. |
| CaaSy / CaaSy Agents | exclude | not applicable | `caasy.vercel.app` only | Fails the explicit `*.netolabs.dev` filter. |
| FundFold | exclude | not applicable | Vercel alias only | No selected `*.netolabs.dev` alias was observed. |

The inclusion unit is a distinct project, not a raw subdomain. MiseBuy and MiseBuy Prep both enter because they have separate repositories, public surfaces, and independently useful jobs; the copy must preserve their relationship without merging them or presenting Prep as a second MiseBuy tier.

### Scope

In scope:

- add four cards: MiseBuy, MiseBuy Prep, Aquiles, and Benchline;
- retain all seven current cards and their approved lifecycle assignments;
- update Forge's kind/description so they match its current public operational-AI surface;
- show one real screenshot for each of the nine cards with a public `netolabs.dev` deployment;
- preserve abstract accent art for LegacyBridge and Logr, because no public product surface is in scope;
- make GitHub optional per project so Benchline does not expose a private or unusable repository link;
- adjust portfolio ordering/layout only as needed to accommodate eleven cards while preserving the existing brand and lifecycle hierarchy;
- update implementation tests to enforce the approved inventory, destinations, lifecycle mix, image coverage, and optional GitHub behavior.

Out of scope / non-goals:

- removing or rebranding existing projects other than the grounded Forge copy refresh;
- adding CaaSy, FundFold, Vercel-only URLs, APIs, preview deployments, or duplicate aliases;
- changing NetoLabs' hero, model, contact, footer, navigation, lifecycle taxonomy, metadata, canonical URL, Open Graph image, domain, DNS, environment variables, billing, analytics, or authentication;
- changing any candidate product repository or deployment;
- claiming customers, revenue, adoption, rankings, performance, compliance, availability guarantees, commercial validation, or lifecycle maturity not present in the cited sources;
- inventing product imagery, testimonials, logos, stacks, or screenshots of authenticated/private states;
- introducing a new dependency solely for this static portfolio delta.

### Approved content contract

English remains the portfolio language. Copy is intentionally compact and source-grounded; Coder must not strengthen these statements.

| Project | Kind | Lifecycle | Description | Stack label | Public URL | GitHub |
| --- | --- | --- | --- | --- | --- | --- |
| Forge | AI operations | focus | Turns business processes, CRM, and knowledge into AI agents for real operations. | TypeScript / Google ADK / Neon | `https://forge.netolabs.dev` | `https://github.com/luizvb/netolabs-forge` |
| VOXA | Conversation intelligence | focus | Preserve current copy. | Preserve current label. | `https://voxa.netolabs.dev` | `https://github.com/luizvb/voxa` |
| Aquiles | AI development agent | tool | An end-to-end AI development agent for Codex, from discovery through production. | Next.js / React / Motion | `https://agent.netolabs.dev` | `https://github.com/luizvb/aquiles-agent` |
| MiseBuy Prep | Procurement tool | tool | Cleans one supplier price list locally into MiseBuy's standard CSV format. | TypeScript / Vite / Browser-local | `https://misebuy-prep.netolabs.dev` | `https://github.com/luizvb/misebuy-prep` |
| LegacyBridge | Enterprise infrastructure | tool | Preserve current copy. | Preserve current label. | none | `https://github.com/luizvb/legacybridge` |
| Logr | Developer tools | tool | Preserve current copy. | Preserve current label. | none | `https://github.com/luizvb/logr` |
| Benchline | Agent release intelligence | experiment | Turns agent evidence into repeatable evaluations and explicit release verdicts. | Vite / Fastify / Neon | `https://evals.netolabs.dev` | none; repository is private |
| MiseBuy | Restaurant procurement | experiment | Compares supplier lists, checks pack math, and exports a reviewed buying plan. | React / TypeScript / Vite | `https://misebuy.netolabs.dev` | `https://github.com/luizvb/misebuy` |
| Pitch Perfect AI | Sales intelligence | experiment | Preserve current copy. | Preserve current label. | `https://pitch.netolabs.dev` | `https://github.com/luizvb/pitch-perfect-ai` |
| MockData AI | Developer platform | experiment | Preserve current copy. | Preserve current label. | `https://mockdata.netolabs.dev` | `https://github.com/luizvb/mockdata-ai` |
| FeedbackFlow | Revenue intelligence | experiment | Preserve current copy. | Preserve current label. | `https://feedback.netolabs.dev` | `https://github.com/luizvb/feedbackflow-ai-mvp` |

Ordering is lifecycle-first and recent-first inside each lifecycle: `Forge`, `VOXA`; `Aquiles`, `MiseBuy Prep`, `LegacyBridge`, `Logr`; `Benchline`, `MiseBuy`, `Pitch Perfect AI`, `MockData AI`, `FeedbackFlow`. The lifecycle legend and “Portfolio snapshot · July 2026” remain unchanged.

### Asset contract

Source assets are public-surface captures at 1440×900 (16:10):

| Project | Source capture | Required target identity |
| --- | --- | --- |
| Forge | `.../netolabs-project-screenshots/forge.png` | `forge` |
| VOXA | `.../netolabs-project-screenshots/voxa.png` | `voxa` |
| Aquiles | `.../netolabs-project-screenshots/aquiles-agent.png` | `aquiles-agent` |
| MiseBuy Prep | `.../netolabs-project-screenshots/misebuy-prep.png` | `misebuy-prep` |
| Benchline | `.../netolabs-project-screenshots/benchline.png` | `benchline` |
| MiseBuy | `.../netolabs-project-screenshots/misebuy.png` | `misebuy` |
| Pitch Perfect AI | `.../netolabs-project-screenshots/pitch-perfect.png` | `pitch-perfect` |
| MockData AI | `.../netolabs-project-screenshots/mockdata.png` | `mockdata` |
| FeedbackFlow | `.../netolabs-project-screenshots/feedbackflow.png` | `feedbackflow` |

The `...` prefix is `/Users/luizneto/Documents/Obsidian Vault/Memory/Runs-history/assets`. Coder may copy/convert them into the repository's `public/images/` convention, but must:

- preserve recognizable product identity, H1/primary surface, and 16:10 aspect ratio;
- optimize each production image to no more than 350 KiB while retaining legible identity at the rendered card size;
- use stable local filenames, explicit image dimensions or a stable aspect-ratio container, correct responsive `sizes`, and below-fold lazy loading;
- provide a concise, non-promotional accessible description such as “MiseBuy supplier comparison preview”; do not transcribe screenshot text or expose account/user information;
- use a deliberate per-image crop/object position when needed; do not use one crop that hides product identity;
- keep LegacyBridge and Logr on the current abstract treatment and never manufacture a screenshot for them.

### Functional requirements

- **FR-001 — Canonical inventory.** The portfolio data source must contain exactly the eleven approved distinct projects, with unique names and one lifecycle from `focus | tool | experiment`.
- **FR-002 — Public destinations.** Each of the nine deployed web projects must expose exactly its approved HTTPS `*.netolabs.dev` URL; LegacyBridge and Logr remain GitHub-only.
- **FR-003 — New projects.** The four new entries must use the approved name, kind, lifecycle, description, stack label, URL, GitHub visibility, and screenshot identity from this contract.
- **FR-004 — Existing-project preservation.** Existing names, lifecycle, links, copy, and stack labels remain unchanged except Forge's approved kind/description and the addition of screenshots.
- **FR-005 — Optional GitHub.** The view model/rendering must allow a missing GitHub URL and omit the icon/link entirely for Benchline; no private URL, placeholder, or disabled link is rendered.
- **FR-006 — Screenshot coverage.** Every project with a public product URL renders its matching real local screenshot; repository-only projects render the existing abstract visual treatment.
- **FR-007 — Ordering.** Cards render in the approved lifecycle-first/recent-first order and the legend continues to describe every lifecycle value present.
- **FR-008 — External-link behavior.** Public product and public GitHub actions open the exact destination in a new browsing context with `noreferrer`, retain an accessible name containing the project name, and remain keyboard reachable.
- **FR-009 — Static failure safety.** Missing image metadata or an absent optional GitHub field must not crash the page; invalid/missing required public URLs or images fail automated validation before release.
- **FR-010 — Site preservation.** Header, hero, thesis, model, process, contact, footer, lifecycle legend, snapshot date, and site metadata remain semantically and textually unchanged.

### Non-functional requirements

- **NFR-001 — Responsive layout.** At 390×844, 768×1024, and 1440×900, the eleven-card portfolio has no horizontal overflow, overlap, clipped card copy/actions, or unreadable lifecycle labels; screenshots retain coherent crops.
- **NFR-002 — Accessibility.** Preserve semantic articles/headings, visible keyboard focus, descriptive link labels, meaningful concise screenshot alternatives, and current reduced-motion behavior. The card remains understandable without its image.
- **NFR-003 — Performance.** Images must be locally hosted and optimized as specified in the asset contract, reserve layout space, and avoid eager-loading all nine below-fold assets. No new runtime dependency is justified by this delta.
- **NFR-004 — Privacy.** Screenshots may contain only publicly reachable, signed-out product surfaces and synthetic/public copy. They must not include email addresses, authenticated workspaces, customer/supplier data, tokens, secrets, internal URLs, browser chrome with personal state, or user identifiers.
- **NFR-005 — SEO and identity.** Preserve `metadataBase`, title, description, canonical `/`, Open Graph/Twitter configuration, `html lang="en"`, brand tokens, navigation IDs, and public route behavior.
- **NFR-006 — Reliability.** Before release, all nine public destinations must return an HTTP success or expected public redirect that resolves successfully; no portfolio action may lead to a private GitHub 404.
- **NFR-007 — Quality.** Repository test, lint, build, diff, privacy scan, and independent browser QA must pass against the release candidate; Coder may not treat a screenshot review alone as release evidence.

### Acceptance criteria

- **AC-001 (FR-001, FR-007).** Given the portfolio data, when its inventory is tested, then it contains exactly 11 unique projects in the approved order with counts `focus=2`, `tool=4`, and `experiment=5`.
- **AC-002 (FR-002).** Given each deployed project card, when its public action is inspected, then the exact URL map is Forge→`forge`, VOXA→`voxa`, Aquiles→`agent`, MiseBuy Prep→`misebuy-prep`, Benchline→`evals`, MiseBuy→`misebuy`, Pitch Perfect AI→`pitch`, MockData AI→`mockdata`, and FeedbackFlow→`feedback`, all under `https://*.netolabs.dev`.
- **AC-003 (FR-003).** Given the four new cards, when their visible content is compared to the approved content contract, then name, kind, lifecycle, description, stack label, destination, and available public GitHub action match exactly.
- **AC-004 (FR-004).** Given Forge, when its card renders, then it says `AI operations` and “Turns business processes, CRM, and knowledge into AI agents for real operations.” while retaining its existing name, focus lifecycle, stack label, public URL, and public GitHub link.
- **AC-005 (FR-004).** Given the other six existing entries, when the data diff is inspected, then none was removed and no pre-existing lifecycle/link/copy/stack changed beyond the approved screenshot field.
- **AC-006 (FR-005).** Given Benchline, when the card renders for an unauthenticated visitor, then it has an `Open Benchline` public action and no GitHub icon, private repository URL, placeholder, or empty interactive element.
- **AC-007 (FR-006).** Given the nine deployed cards, when the portfolio is rendered, then each shows the matching local real screenshot; LegacyBridge and Logr show the current abstract treatment; no broken image or mismatched product image appears.
- **AC-008 (FR-008, NFR-002).** Given keyboard-only navigation, when focus traverses each card action, then every available action receives visible focus, has a unique accessible name including the project, and opens the expected public destination.
- **AC-009 (NFR-001).** Given viewports 390×844, 768×1024, and 1440×900, when the whole page and portfolio are inspected, then there is no horizontal overflow, overlap, clipped text/actions, or unusable screenshot crop; the existing sections before and after the grid remain intact.
- **AC-010 (NFR-002).** Given `prefers-reduced-motion: reduce`, when the portfolio enters the viewport or a card is hovered/focused, then the content remains visible and usable without required motion.
- **AC-011 (NFR-003, NFR-007).** Given the release candidate, when `npm test`, `npm run lint`, and `npm run build` execute, then all exit 0; the build does not report missing image assets or invalid project types.
- **AC-012 (NFR-004).** Given every production asset and staged diff, when the screenshots are visually reviewed and the privacy scan runs, then neither reveals a secret, authenticated/private surface, personal identifier, customer/supplier content, or unintended non-portfolio file.
- **AC-013 (NFR-005).** Given `src/app/layout.tsx`, page landmarks, and navigation IDs, when the diff and built page are inspected, then NetoLabs title/description/canonical/Open Graph/Twitter metadata, `lang="en"`, `#top`, `#portfolio`, `#model`, and `#contact` remain unchanged and present.
- **AC-014 (NFR-006).** Given the nine approved public URLs, when release smoke follows redirects, then each resolves successfully; every rendered GitHub action is public for a signed-out visitor.

### Edge cases and failure behavior

- A public project URL that fails release smoke blocks that card/release; do not substitute a preview or raw Vercel deployment silently.
- A screenshot that shows an authenticated surface, personal browser state, private data, or a mismatched deployment must be recaptured from the public signed-out surface before release.
- A long project name or description must wrap without covering lifecycle/actions or changing the underlying copy.
- Benchline's missing GitHub field is a supported state, not an error state.
- Existing repository-only projects remain valid without `href` or screenshot; adding fake destinations/assets is prohibited.
- If a screenshot cannot meet legibility and size together, prefer a carefully cropped public capture over reducing text to unreadable pixels; record the crop decision in the Coder section.
- If the eleven-card composition requires a layout deviation, Coder must update this plan before proceeding; brand/IA or lifecycle changes require Main/FDE review.

### Verification and evidence strategy

Coder must record exact commands, exit codes, and release-candidate identity in the Coder section. Tester then independently validates:

1. automated portfolio contract: exact inventory, lifecycle counts/order, destination map, image coverage, optional GitHub, and unique names;
2. `npm test`, `npm run lint`, `npm run build`, `git diff --check`, and privacy scan;
3. static asset existence, dimensions/aspect ratio, per-file size, and correct screenshot-to-project mapping;
4. local production build or production-like browser QA at 390×844, 768×1024, and 1440×900, including full-page overflow and focus/reduced-motion checks;
5. HTTP smoke for all nine public project URLs and signed-out verification that every rendered GitHub link is public;
6. diff review proving NetoLabs metadata, anchor IDs, current project data outside Forge, and non-portfolio sections were preserved;
7. after deployment, HTTP and browser smoke on `https://netolabs.dev`, tied to the exact commit/deployment, before Main declares completion.

No analytics event is added. The release signal is deterministic portfolio correctness and production evidence, not an invented engagement target.

### Risks and rollback

| ID | Risk | Mitigation / trigger | Owner |
| --- | --- | --- | --- |
| R-001 | Eleven cards make the existing index-specific asymmetry break or bury content. | Validate all target viewports; preserve lifecycle-first order; update plan before material IA change. | Coder / Tester |
| R-002 | Nine screenshots add page weight or layout shift. | Local optimized assets, 16:10 reserved space, responsive sizes, lazy loading, 350 KiB cap per image. | Coder |
| R-003 | Screenshot crop hides project identity or exposes private state. | Use only supplied public captures, deliberate crop, visual/privacy review. | Coder / Tester |
| R-004 | Benchline's private repository becomes a broken public action. | Optional GitHub contract and no rendered Benchline GitHub link. | Coder / Tester |
| R-005 | Copy turns implementation facts into unsupported maturity/traction claims. | Use the approved content table verbatim; reject stronger claims without new evidence. | FDE / Main |
| R-006 | A subdomain changes or becomes unavailable before release. | Re-run public URL smoke immediately before and after deployment; block instead of silently substituting. | Tester / Main |

Rollback is content-only: revert the release commit or promote the last known-good Vercel deployment for NetoLabs. No database, migration, environment, DNS, domain, or candidate-project rollback is applicable. Roll back when the released grid breaks critical navigation/layout, exposes private data, renders mismatched/broken assets, or introduces dead public destinations that cannot be corrected with a bounded forward fix.

### Decisions and deviations

| ID | Decision | Rationale | Owner/date |
| --- | --- | --- | --- |
| D-001 | Use real screenshots from public product surfaces only. | The image is evidence of actual work; fabricated interfaces or private state violate the request and privacy constraint. | Main, 2026-07-13 |
| D-002 | Treat a subdomain as discovery evidence, not automatically as a standalone project. | The portfolio represents distinct projects, not deployment topology. | FDE, 2026-07-13 |
| D-003 | Add MiseBuy and MiseBuy Prep as separate entries. | Separate repositories, public destinations, and independently useful jobs are explicitly documented. | FDE, 2026-07-13 |
| D-004 | Add Aquiles as `tool`; add Benchline and MiseBuy as `experiment`; add MiseBuy Prep as `tool`. | These are conservative behavior/status labels grounded in reusable-tool or preview evidence and do not imply traction. | FDE, 2026-07-13 |
| D-005 | Retain all seven current projects; add four; remove none. | The request asks for the latest work and images, not for portfolio pruning; preserving approved lifecycle/content minimizes scope. | FDE, 2026-07-13 |
| D-006 | Update only Forge's kind/description among current projects. | Direct browser/source evidence shows its current operational-AI positioning has materially diverged from the existing generic infrastructure copy. | Main / FDE, 2026-07-13 |
| D-007 | Omit Benchline's GitHub action. | The product is public but the repository is private; a public portfolio must not send visitors to an unusable/private URL. | FDE, 2026-07-13 |
| D-008 | Exclude CaaSy and FundFold from this release. | No qualifying `*.netolabs.dev` alias was observed; inclusion would violate the explicit filter. | Main / FDE, 2026-07-13 |

### Assumptions and open questions

- The lifecycle labels are portfolio allocation/status labels, not traction claims.
- The supplied public screenshots remain the canonical capture inputs unless Tester finds privacy or crop problems.
- No user decision is currently blocking Coder. If Main/Luiz wants Aquiles or Benchline treated as `focus`, that is a product-priority change and must update `D-004`, lifecycle counts, ordering, and tests before implementation continues.

### FDE handoff and exit criterion

`next_owner: Coder`

FDE status: `success`. The product contract is executable without Coder or Tester inventing inventory, lifecycle, copy, destination, repository visibility, screenshot source, privacy rules, expected responsive behavior, or release evidence. Coder exits only after its engineering plan is recorded below and implementation checks pass. Tester then owns the independent QA status.

## Coder section

Status: `success`.

### Engineering plan before implementation

**Design read and system.** Preserve-mode evolution of a technical portfolio for prospective customers, collaborators, operators, and peers. Keep the repository's graphite/signal-green CSS-token system, Geist typography, soft 16px card radius, Phosphor icon family, Motion reveal/hover behavior, light/dark theme behavior, and semantic card structure. Dials: `DESIGN_VARIANCE=6`, `MOTION_INTENSITY=4`, `VISUAL_DENSITY=4`. Real supplied public screenshots become the credibility layer; no visual-system or IA redesign is justified.

**Smallest coherent slice.** Extend the single static project data source to the approved eleven-entry contract; make `github` and screenshot metadata optional at the type boundary; render a local `next/image` only when complete screenshot metadata exists, otherwise retain the current abstract accent treatment; replace index-named grid exceptions with a stable two-column desktop / one-column mobile grid; update contract tests and add asset validation. No API, backend, global state, route, migration, analytics, or runtime error boundary is involved.

**Expected impacted artifacts.**

- `src/data/projects.ts`: approved order/content, optional GitHub, and per-project image metadata (`src`, `alt`, `width`, `height`, optional `objectPosition`).
- `src/components/motion-elements.tsx`: optional GitHub rendering, data-driven real images, descriptive alternatives, lazy loading, explicit dimensions/aspect behavior, and unchanged accessible external-link behavior.
- `src/app/globals.css`: remove `.project-card-N` layout coupling, use an index-independent responsive grid and stable 16:10 artwork container, preserving tokens, focus, reduced motion, and abstract accents.
- `public/images/projects/*.webp`: nine locally hosted 1440x900 public-surface screenshots, stable names, metadata stripped, each at or below 350 KiB. Default crop is full 16:10 (`object-position: center`); a project-specific position will be recorded only if identity is obscured.
- `tests/portfolio.test.mjs`: approved inventory/order/lifecycle/link/copy contract, optional GitHub behavior, image coverage and local asset dimensions/sizes, and source guards for preserved page metadata/anchors and index-independent layout.

**Domain and rendering contracts.** The bounded domain is static portfolio presentation. A project has one stable name, kind, lifecycle, description, stack, accent, optional public product URL, optional public GitHub URL, and optional complete screenshot object. Invariants: exactly eleven unique projects in the approved order; nine exact HTTPS `*.netolabs.dev` product URLs have matching local screenshots; LegacyBridge and Logr have neither product URL nor screenshot; Benchline has a product URL/screenshot and no GitHub field. Missing optional GitHub or screenshot metadata renders no empty control and cannot crash. Required data validity is enforced before release by tests.

**Dependencies and complexity.** Add no dependency. Reuse `next/image`, Motion, Phosphor, Node's test runner, native image tooling, and existing CSS. A data-driven image object is preferable to a parallel name map because identity, alternative, dimensions, and crop stay co-located. A deterministic two-column grid avoids both fragile numeric classes and premature masonry/layout abstractions. Scale trigger for a new portfolio component/data schema would be multiple pages, filtering, CMS ownership, or materially different card families; none is observed.

**Ordered implementation.**

1. Convert/copy the nine supplied 1440x900 captures to stable local WebP files without metadata; record dimensions and byte sizes.
2. Implement the exact eleven-project data contract and optional fields without strengthening approved copy.
3. Render screenshots and optional GitHub actions from data; preserve abstract LegacyBridge/Logr art and all target/rel/accessible-name behavior.
4. Remove numeric project-card layout selectors and establish explicit single-column `<641px` / two-column `>=641px` behavior with a reserved 16:10 art ratio and coherent object-fit.
5. Update tests and execute the engineering verification ladder. Fix only failures caused by this delta.

**Acceptance and test traceability.**

| Acceptance | Implementation / Coder evidence |
| --- | --- |
| `AC-001` | Data test asserts exact ordered names, unique count 11, and lifecycle counts 2/4/5. |
| `AC-002` | Data test asserts the exact nine-name public URL map and `https://*.netolabs.dev` shape. |
| `AC-003` | Deep contract assertions cover every approved field for Aquiles, MiseBuy Prep, Benchline, and MiseBuy. |
| `AC-004` | Forge-specific assertion covers approved kind/description plus preserved stack, lifecycle, links, and screenshot. |
| `AC-005` | Regression assertions cover the six other existing entries' exact pre-existing content and links, with screenshot as the only addition. |
| `AC-006` | Data assertion requires absent Benchline GitHub; render-source test requires conditional GitHub output with no empty action. Independent browser behavior remains Tester-owned. |
| `AC-007` | Asset/data tests require nine unique matching local images and no image on LegacyBridge/Logr; filesystem checks assert existence, 1440x900, 16:10, and size cap. |
| `AC-008` | Render-source assertions cover `target="_blank"`, `rel="noreferrer"`, and project-named labels; focus-visible CSS is preserved. Keyboard execution remains Tester-owned. |
| `AC-009` | CSS source assertion rejects numeric card selectors and requires explicit one/two-column rules plus 16:10 art containment; Coder build smoke and Tester viewport QA provide runtime evidence. |
| `AC-010` | Existing `useReducedMotion` and reduced-motion CSS remain unchanged; source tests guard both. Runtime emulation remains Tester-owned. |
| `AC-011` | Execute `npm test`, `npm run lint`, and `npm run build`, all required at exit 0. |
| `AC-012` | Supplied public sources only; metadata is stripped; filenames/assets are scanned for common credential/identifier markers and the staged diff is reviewed. Visual privacy sign-off remains Tester-owned. |
| `AC-013` | Source regression test guards metadata, `lang="en"`, and `#top/#portfolio/#model/#contact`; diff review must show no changes to page/layout. |
| `AC-014` | Rendered GitHub data is asserted public and Benchline omitted. Public HTTP smoke is an independent Tester/Main release gate and is not redefined by Coder. |

**Verification commands planned.** `npm test`; `npm run lint`; `npm run build`; `git diff --check`; asset dimension/size inventory via `sips`/`stat`; focused privacy scan over the production assets and diff; `git status --short` and `git diff --stat` for artifact scope. If local runtime/browser inspection is available after the build, Coder will smoke the rendered portfolio at representative mobile and desktop widths but will not issue QA readiness.

**Security, privacy, operations, and rollback.** Only FDE-supplied signed-out public captures may enter `public/`; conversion removes image metadata. No secrets, env values, authenticated state, supplier/customer data, private GitHub URL, external image host, telemetry, or network fetch is added. Observability, migration, data retention, deployment ordering, DNS, and environment changes are not applicable. Rollback is a content-only revert of the eventual release commit or promotion of the prior Vercel deployment by Main; Coder performs neither. There is no contract deviation at plan time.

**Exit criterion.** Code, assets, and implementation tests satisfy `AC-001` through `AC-014` to the extent owned by engineering; required local commands exit 0; exact evidence, crop decisions, deviations, and residual risks are appended here; next owner is Tester for independent QA. Coder does not commit, push, deploy, or mark release readiness.

### Implementation result

**Implemented slice.** `src/data/projects.ts` now contains the exact eleven-card ordered inventory with lifecycle counts `focus=2`, `tool=4`, `experiment=5`; Aquiles, MiseBuy Prep, Benchline, and MiseBuy were added with approved copy/links; Forge alone received the approved current positioning; nine deployed projects own local image metadata; LegacyBridge and Logr remain GitHub-only with abstract accents. `ProjectGrid` accepts absent GitHub/image fields, emits no Benchline GitHub control, renders descriptive lazy local screenshots with explicit 1440x900 dimensions and responsive `sizes`, and preserves named external actions with `target="_blank"`/`rel="noreferrer"`. CSS now uses an index-independent two-column grid above 640px, one column at or below 640px, and a reserved 16:10 art surface. No page, layout, hero, navigation, lifecycle legend, snapshot, metadata, route, dependency, lockfile, environment, domain, DNS, or external deployment changed.

**Asset decisions and evidence.** All supplied captures were converted with `cwebp -q 82 -metadata none` to stable local WebPs. Full-frame 16:10 composition keeps each logo/H1 or primary product surface recognizable at card size, so no crop or custom `object-position` was needed; rendering defaults to centered full-frame containment. Coder visually inspected all nine converted assets and found no authenticated workspace, personal identifier, browser chrome, private repository surface, secret, or readable customer/supplier record. The deterministic marker scan also returned no credential/email pattern. Tester retains independent visual privacy authority.

| Asset | Dimensions | Bytes | Cap |
| --- | --- | ---: | --- |
| `aquiles-agent.webp` | 1440x900 | 60,138 | pass |
| `benchline.webp` | 1440x900 | 38,702 | pass |
| `feedbackflow.webp` | 1440x900 | 22,460 | pass |
| `forge.webp` | 1440x900 | 42,108 | pass |
| `misebuy-prep.webp` | 1440x900 | 30,160 | pass |
| `misebuy.webp` | 1440x900 | 72,008 | pass |
| `mockdata.webp` | 1440x900 | 18,716 | pass |
| `pitch-perfect.webp` | 1440x900 | 30,480 | pass |
| `voxa.webp` | 1440x900 | 31,124 | pass |

Every file is below the 350 KiB limit. Total production screenshot weight is 345,896 bytes.

### Acceptance implementation trace

| Acceptance | Coder result / evidence | Independent remainder |
| --- | --- | --- |
| `AC-001` | Implemented. Contract test asserts exact eleven-name order, uniqueness, and lifecycle counts 2/4/5. | Tester may confirm rendered order. |
| `AC-002` | Implemented. Contract test asserts the exact nine-name `https://*.netolabs.dev` map and no public URL for LegacyBridge/Logr. | Tester/Main rerun external URL smoke near release. |
| `AC-003` | Implemented. Deep field assertions cover approved copy, lifecycle, stack, destination, GitHub visibility, and image identity for all four additions. | Tester checks visible cards/actions. |
| `AC-004` | Implemented. Forge assertion covers exact new kind/description plus preserved lifecycle, stack, links, and screenshot. | Tester checks visible copy. |
| `AC-005` | Implemented. Regression assertions preserve the six other existing entries' exact kind/lifecycle/copy/stack/links; screenshot is the only added field where applicable. | Tester performs independent diff/visible regression review. |
| `AC-006` | Implemented. Benchline owns public href/image but no `github`; JSX conditionally omits the control; local rendered HTML contained zero Benchline/private-GitHub occurrences. | Tester checks focus order and absence in the browser. |
| `AC-007` | Implemented. Nine unique local WebPs are mapped one-to-one; tests verify existence, 1440x900 dimensions, 16:10 ratio, and cap; LegacyBridge/Logr have no image and render initials accents. | Tester checks matching visual identity/no broken image. |
| `AC-008` | Implemented. Both conditional action types retain named `aria-label`, `_blank`, and `noreferrer`; icons are decorative and existing `:focus-visible` remains. | Tester exercises keyboard navigation and destinations. |
| `AC-009` | Implemented structurally. Numeric card classes/selectors were removed; explicit one/two-column grid and 16:10 art containment are source-tested. | Tester owns 390x844, 768x1024, and 1440x900 browser evidence for overflow/copy/crops. |
| `AC-010` | Preserved. `useReducedMotion` still removes reveal/hover motion and existing CSS disables transitions/animations under reduce; source guard passes. | Tester exercises the media preference. |
| `AC-011` | Implemented and verified: test, lint, and production build all exit 0; build compiled TypeScript and prerendered `/` as static content. | Tester independently reruns required suites. |
| `AC-012` | Implemented within Coder scope. Only supplied public captures entered `public/`; conversion strips metadata; visual inspection and credential/email marker scan passed; diff scope is portfolio-only plus this plan. | Tester owns independent privacy/diff sign-off. |
| `AC-013` | Preserved. `src/app/page.tsx` and `src/app/layout.tsx` are untouched; regression test guards metadataBase, title, canonical, Open Graph, Twitter, `lang="en"`, four anchors, and July snapshot. | Tester checks built landmarks/metadata. |
| `AC-014` | Implemented link safety. Every rendered GitHub data value remains an approved public URL and Benchline is absent; local product images returned HTTP 200. | Tester/Main own signed-out GitHub and nine public destination smokes. |

### Verification executed

| Command / target | Exit | Material result |
| --- | ---: | --- |
| `npm test` in repository root | 0 | 8 tests, 8 passed, 0 failed; inventory, content, optional fields, assets, rendering source, layout source, and metadata/anchors covered. Node emitted only the pre-existing package module-type performance warning. |
| `npm run lint` in repository root | 0 | ESLint reported no findings. |
| `npm run build` in repository root | 0 | Next.js 16.2.10 production build compiled, TypeScript passed, and `/` prerendered static. |
| `git diff --check` in repository root | 0 | No whitespace errors. |
| `sips -g pixelWidth -g pixelHeight` plus `stat -f` for `public/images/projects/*.webp` | 0 | All nine are 1440x900 and 18,716-72,008 bytes. |
| `strings public/images/projects/*.webp` piped to credential/email marker `rg` | 0 | No marker matches. |
| Local production server `npm start -- -H 127.0.0.1 -p 3013`, then `curl` against `/` and nine local assets | 0 for smoke requests | HTML contained all eleven names, zero Benchline/private-GitHub occurrence; all nine asset requests returned HTTP 200. Server was then intentionally stopped with SIGINT. |
| `git status --short` and scoped `git diff --stat` | 0 | Only data, grid/component, tests, this plan, and nine project assets are in Coder scope; no commit/stage/push/deploy performed. |

### Decisions, deviations, and residual risk

- `D-CODER-001`: use a simple deterministic two-column grid rather than positional asymmetry. It removes the observed fragile numeric selectors and supports inventory growth without a layout DSL or new dependency.
- `D-CODER-002`: co-locate image identity, alt, and intrinsic dimensions with project data; keep `objectPosition` optional for future evidence-backed crops. All current assets use the default center because the full 16:10 capture is already the intended composition.
- `D-CODER-003`: retain existing abstract accent CSS even when current public cards use screenshots; it remains the fallback contract for LegacyBridge/Logr and avoids unrelated cleanup.
- `D-CODER-004` (`BUG-001`, recovery completed): add a reduced-motion-only `.project-card` CSS invariant with `opacity: 1 !important` and `transform: none !important`. Tester proved that Motion's server/hydration reveal can temporarily retain inline `opacity: 0` even though the client `useReducedMotion` guard exists; the media-scoped important declarations are the smallest layer that wins over inline Motion state before and during hydration without changing normal-preference animation. A source regression test now requires both declarations inside the reduce media block and rejects them from normal CSS.
- Contract deviations: none.
- Residual risks for Tester: real-browser overflow/copy/action behavior at the three required viewports, keyboard focus sequence, reduced-motion emulation, light/dark image framing, independent visual privacy/crop review, and current external HTTP/GitHub availability. Local build/runtime evidence does not replace those checks.
- Rollback remains content-only. No migration, backend, environment, DNS, analytics, observability, or operational rollback is applicable.

`next_owner: Tester`

### Recovery loop: `BUG-001` / `AC-010`

Status: `success`. Scope remained limited to the reduced-motion card invariant, its regression test, the four native engineering gates, and handback to Tester. No project data, copy, asset, layout, normal-motion behavior, dependency, release action, or previously passed acceptance criterion changed.

**Implementation.** Inside the existing `@media (prefers-reduced-motion: reduce)` block, `.project-card` now applies `opacity: 1 !important` and `transform: none !important`. This guarantees immediate card visibility and neutral geometry even while Motion's SSR/hydration inline reveal state is present. The existing `useReducedMotion` guard remains the client behavior owner; the CSS invariant is a hydration-safe fallback and is inactive under normal motion preferences.

**Regression coverage.** The existing rendering/accessibility test now isolates normal CSS from the reduced-motion block, requires both card overrides together inside that block, and fails if either important declaration appears in normal CSS. This guards the accessibility fix and the no-regression constraint without adding a browser/dependency to the repository suite.

**Engineering verification.** `npm test` exit 0 (8/8); `npm run lint` exit 0; `npm run build` exit 0 with TypeScript/static prerender passing; `git diff --check` exit 0. The only recovery mutations are `src/app/globals.css`, `tests/portfolio.test.mjs`, and this Coder decision/evidence. No commit, stage, push, deploy, external mutation, or run-file edit occurred.

**Residual validation.** Tester must rerun its isolated reduced-motion timeline for viewport entry plus hover/focus, then a bounded responsive smoke, against the new candidate. Coder does not self-approve `qa_status`.

`recovery_next_owner: Tester`

## Tester section

Status: `success` (validation and recovery retest complete; final `qa_status: ready`).

### Independent test plan before validation

**Candidate identity.** Local release candidate based on `main` at `c25bbd24f13132fc6b536ad5bc5604ac2699ce50`, with an intentionally dirty worktree limited at entry to `src/app/globals.css`, `src/components/motion-elements.tsx`, `src/data/projects.ts`, `tests/portfolio.test.mjs`, this `docs/` plan, and nine files under `public/images/projects/`. The composite SHA-256 of the four implementation/test files plus the nine WebPs at QA entry is `410c27ab454387006f340791acea547177298ea66f8e088db91aa621f88a0160`. Tester will recheck identity before the QA verdict and will not claim readiness if the candidate moves.

**Environment and mode.** macOS 27.0 (`26A5378j`), Node `v22.22.0`, npm `10.9.4`; local Next.js production build served on loopback. Validation mode is mixed: repository-native Node tests and build gates, static/diff inspection, HTTP smoke, and real-browser Playwright interaction through the in-app Browser runtime. No authenticated role, mutable test data, backend, database, AI provider, migration, or cleanup is applicable to this public static page.

**Scope and critical path.** Highest risk is a visually credible but unusable eleven-card portfolio: mismatched/private screenshots, clipped content in responsive layouts, absent or misleading actions, or dead destinations. The critical path is homepage arrival -> `#portfolio` -> ordered cards and lifecycle framing -> keyboard-reachable product/GitHub actions -> exact public destinations. Tester will independently cover inventory/copy/actions, all nine images and two abstract fallbacks, three required viewports, overflow/crop/text/action integrity, keyboard/focus and semantics, reduced motion, light/dark/system framing, console/network state, metadata/anchors, asset privacy/performance, nine product URLs, and every rendered public GitHub URL.

**Explicitly untested at plan entry.** The not-yet-authorized production deployment at `https://netolabs.dev` and its exact deployment/commit parity are release checks owned by Main after deployment. Field Core Web Vitals, a full assistive-technology audit, penetration testing, and CI execution are outside this static delta; Tester will still perform proportionate local lab, semantic, keyboard, privacy, and repository-CI inspection.

**Risk ranking.** `P1` release blockers: private/sensitive screenshot content, a broken critical page/build, dead or private action, missing/mismatched project, or unusable viewport. `P2`: material keyboard/focus, crop, content, theme, or reduced-motion defect with bounded reach. `P3`: low-impact visual polish that does not obscure identity or action. No risk waiver is implied; unresolved P2 requires Main/Luiz acceptance for `conditional`.

### Requirement-to-test matrix

| Acceptance | Test IDs | Layers / oracle | Planned evidence |
| --- | --- | --- | --- |
| `AC-001` | `TEST-001`, `TEST-004` | contract + rendered DOM; exact 11-name order and 2/4/5 lifecycle counts | native suite output and browser article order |
| `AC-002` | `TEST-001`, `TEST-009` | contract + HTTP; exact nine `https://*.netolabs.dev` URL map | suite assertions, DOM href inventory, redirect-following smoke |
| `AC-003` | `TEST-001`, `TEST-004` | contract + UI; exact visible fields/actions for four additions | data test and rendered card text/action inventory |
| `AC-004` | `TEST-001`, `TEST-004` | contract + UI; exact Forge copy and preserved fields | data assertion and Forge card inspection |
| `AC-005` | `TEST-001`, `TEST-010` | regression + diff; no unapproved existing-project or non-portfolio change | native suite and scoped diff review |
| `AC-006` | `TEST-004`, `TEST-007` | UI + keyboard; Benchline product action present and GitHub/empty control absent | DOM, accessible roles, focus order |
| `AC-007` | `TEST-003`, `TEST-004`, `TEST-005`, `TEST-006` | asset + visual; nine matching local images, two abstract treatments, no broken/cropped identity | asset inventory, browser/network checks, three screenshots |
| `AC-008` | `TEST-007`, `TEST-009` | keyboard + semantics + HTTP; visible focus, unique project-named actions, exact public destinations | focus traversal record, accessible names, link smoke |
| `AC-009` | `TEST-004`, `TEST-005`, `TEST-006` | responsive E2E; page width equals viewport and no overlap/clipped copy/actions/crop | DOM geometry assertions and full-page screenshots at 1440x900, 768x1024, 390x844 |
| `AC-010` | `TEST-008` | browser emulation; content stays visible/usable with reduced motion | computed/observed motion state and interaction smoke |
| `AC-011` | `TEST-002` | repository gates; test, lint, build, diff all exit 0 | exact commands, exits, counts, build/runtime target |
| `AC-012` | `TEST-003`, `TEST-010` | privacy + diff; no metadata/identifier/private surface or unrelated file | image metadata/marker scans, independent visual review, diff inventory |
| `AC-013` | `TEST-001`, `TEST-010` | source + built page; metadata, `lang=en`, anchors, hero and adjacent sections preserved | suite/diff plus DOM/head/landmark inspection |
| `AC-014` | `TEST-009` | real public boundary; nine products and all rendered GitHub actions resolve signed out | redirect-following HTTP status/final URL ledger |

### Test cases and execution order

1. `TEST-001 — Contract regression`: rerun the repository suite and independently inspect the rendered inventory/order, exact copy, lifecycle labels, hrefs, image alternatives, optional Benchline GitHub state, metadata, language, and anchor IDs.
2. `TEST-002 — Engineering gates`: run `npm test`, `npm run lint`, `npm run build`, and `git diff --check` from repository root, recording exact exit status and material output. The Next build is the applicable TypeScript/type gate; no separate formatter/typecheck script exists.
3. `TEST-003 — Asset and privacy gate`: inventory nine local WebPs, dimensions, ratio, bytes, MIME/metadata, mapping and load behavior; visually inspect every image for product identity, coherent crop, public signed-out state, PII/customer/supplier/credential/internal-state leakage; scan filenames/assets/diff for credential, email, token, private URL, or unrelated-file markers.
4. `TEST-004 — Desktop runtime`: serve the exact production build locally and inspect the full page at `1440x900`, including hero, navigation, lifecycle legend, all cards/actions, adjacent sections, footer, page/element overflow, overlap, crop, console errors, failed resources, and theme framing. Retain `2026-07-13-netolabs-recent-projects-desktop.png`.
5. `TEST-005 — Tablet runtime`: repeat layout, text/action, crop, overflow, theme and console/resource checks at `768x1024`. Retain `2026-07-13-netolabs-recent-projects-tablet.png`.
6. `TEST-006 — Mobile runtime`: repeat at `390x844`, including single-column flow, long-name wrapping, action visibility/tap geometry, sticky/safe-area behavior, and page width. Retain `2026-07-13-netolabs-recent-projects-mobile.png`.
7. `TEST-007 — Keyboard/accessibility`: use semantic roles and sequential `Tab` navigation from page entry through navigation and every available card action; verify logical order, visible focus indicator, unique accessible names containing project names, Benchline's single action, image alternatives, headings/articles/landmarks, and no hidden/empty interactive element. Use WCAG 2.2 AA as the risk lens; automation alone will not be treated as complete accessibility proof.
8. `TEST-008 — Motion/themes`: emulate `prefers-reduced-motion: reduce`; confirm portfolio/cards remain visible and usable without required motion. Inspect light, dark, and system color-scheme framing for readable text/actions and screenshots with no broken transparent/background treatment.
9. `TEST-009 — External boundaries`: follow redirects for the exact nine public product URLs and every rendered GitHub action without credentials; record HTTP result/final URL and reject a private/404 Benchline repository action.
10. `TEST-010 — Preservation/security/performance`: inspect the candidate diff and built DOM/head for unchanged hero/navigation/model/contact/footer/metadata/anchors; verify local responsive/lazy images reserve 16:10 space, do not eagerly load all below-fold cards, add no external image host/runtime dependency, and produce no console/network errors. Record lab-only limitations; field CWV is not inferred.

### Artifacts, sensitivity, and exit criteria

Screenshots will be stored only under `/Users/luizneto/Documents/Obsidian Vault/Memory/Runs-history/assets/` with the three required `2026-07-13-netolabs-recent-projects-*.png` names. They contain only the local public portfolio surface and are non-secret. No cookies, local storage, credentials, `.env` values, authenticated pages, user data, or production mutation will be used or retained.

Exit `ready` only if the candidate identity remains stable, all `AC-001..014` pass, native gates and local critical path pass, all public boundaries resolve, privacy is credible, and no P0/P1/P2 remains. Exit `conditional` only for an explicit bounded evidence gap or accepted P2 with named owner/condition. Exit `blocked` for a failed critical path, P0/P1, moving candidate, broken build/url/action, unusable viewport, or non-credible privacy evidence. Any product defect routes to Coder through Main; Tester will not edit product code. Final results, findings, gaps, retest scope, `qa_status`, and `next_owner: Main` will be appended below this plan.

### Validation result

`qa_status: conditional`

`next_owner: Main`

The identified local candidate remained stable at `HEAD c25bbd24f13132fc6b536ad5bc5604ac2699ce50` and composite product/test/asset SHA-256 `410c27ab454387006f340791acea547177298ea66f8e088db91aa621f88a0160` before and after QA. Native gates, all three responsive viewports, inventory/content/actions, assets/privacy, light/dark/system framing, console/network health, metadata/anchors, nine product boundaries, and ten public GitHub boundaries passed. `AC-010` failed because portfolio cards still perform a visible opacity reveal under `prefers-reduced-motion: reduce`; this is recorded as `BUG-001` (`P2`). No P0 or P1 was found.

The Browser skill was followed first. Its in-app/Chrome discovery returned no available browser for this Tester session (`agent.browsers.list(): []`) after the prescribed bounded recovery. Independent runtime QA therefore used an already-installed standalone `playwright-core 1.61.1` with Chromium `149.0.7827.55`; no dependency, package file, product test, or product code was added or changed by Tester.

### Acceptance result matrix

| Acceptance | Result | Independent evidence |
| --- | --- | --- |
| `AC-001` | pass | `TEST-001/004`: native contract tests plus rendered DOM showed exactly 11 unique cards in the approved order and lifecycle sequence `2 focus / 4 tool / 5 experiment`. |
| `AC-002` | pass | `TEST-001/009`: source contract asserted the exact nine host map; rendered actions resolved to the same URLs (the DOM `URL.href` serializer adds an equivalent terminal `/`); all nine real boundaries returned HTTP 200. |
| `AC-003` | pass | `TEST-001/004`: Aquiles, MiseBuy Prep, Benchline, and MiseBuy visible name/kind/lifecycle/description/stack/action/image identity matched the approved contract. |
| `AC-004` | pass | `TEST-001/004`: Forge rendered `AI operations` and the approved exact description with focus, stack, product, GitHub, and screenshot preserved. |
| `AC-005` | pass | `TEST-001/010`: contract regression passed; scoped diff confirmed no removal or unapproved data change and no diff in page/layout/package files. |
| `AC-006` | pass | `TEST-004/007`: Benchline exposed exactly one interactive card action, `Open Benchline`, resolving by a real click to `https://evals.netolabs.dev/`; no GitHub/private/empty control was present. |
| `AC-007` | pass | `TEST-003/004/005/006`: nine matching images loaded without error; LegacyBridge/Logr kept the abstract, `aria-hidden` treatment; independent asset and full-page visual review found coherent identity/crops in all viewports and themes. |
| `AC-008` | pass | `TEST-007/009`: sequential keyboard traversal reached all 19 card actions; every action matched `:focus-visible`, had a non-zero visible outline, a unique project-named accessible name, `_blank`, `noreferrer`, and a public destination. Real click paths for Benchline product and Forge GitHub succeeded. |
| `AC-009` | pass | `TEST-004/005/006`: at 1440x900, 768x1024, and 390x844, `documentWidth === viewportWidth`, zero out-of-bounds elements, zero card overlaps, and zero clipped card copy/actions; two columns remained usable on desktop/tablet and one column on mobile; before/after sections remained present. |
| `AC-010` | **fail** | `TEST-008`, `BUG-001`: with reduced motion active, Forge entered at `opacity: 0; translateY(34px)` and opacity progressed to `0.207@25ms`, `0.858@175ms`, `0.988@375ms`, and `1@725ms`. Content eventually becomes usable, but visibility still depends on a Motion reveal. |
| `AC-011` | pass | `TEST-002`: `npm test`, `npm run lint`, `npm run build`, and `git diff --check` all exited 0; 8/8 tests passed; TypeScript and static prerender passed; no missing image/type/build error. |
| `AC-012` | pass | `TEST-003/010`: exactly nine WebPs, each 1440x900 and 18,716-72,008 bytes, no EXIF/XMP/IPTC/comment data or deterministic credential/email/private markers; visual review found public/synthetic surfaces only and no PII, authenticated workspace, customer/supplier record, secret, internal URL, or browser chrome. Candidate diff remained portfolio-only plus tests/plan. |
| `AC-013` | pass | `TEST-001/010`: built page retained title, description, canonical, Open Graph/Twitter title, `lang=en`, hero, July snapshot, landmarks, and `#top/#portfolio/#model/#contact`; `src/app/page.tsx` and `src/app/layout.tsx` remained untouched. |
| `AC-014` | pass | `TEST-009`: all 9 product URLs and all 10 rendered GitHub URLs returned HTTP 200 while following redirects without credentials; Benchline had no GitHub boundary. |

### Evidence executed

| Test | Command / click path | Target / environment | Exit / observed oracle | Artifacts |
| --- | --- | --- | --- | --- |
| `TEST-001/002` | `npm test` | repo root; stable candidate | exit 0; 8 passed, 0 failed; only the pre-existing module-type performance warning | terminal output; contract suite |
| `TEST-002` | `npm run lint` | repo root | exit 0; no ESLint finding | terminal output |
| `TEST-002` | `npm run build` | Next.js 16.2.10 production build | exit 0; compile, TypeScript, static generation and `/` prerender passed | `.next` local build |
| `TEST-002/010` | `git diff --check`; `git status --short`; scoped diff/source inspection | repo root | exit 0; no whitespace failure; candidate scope unchanged; no page/layout/package diff | plan evidence |
| `TEST-003` | `file`, `sips`, `stat`, metadata and marker scans over `public/images/projects/*.webp` | 9 local assets | exit 0; 9/9 1440x900, WebP, <=72,008 bytes, metadata/marker scan empty | asset ledger and independent visual inspection |
| `TEST-004..008/010` | standalone Playwright QA script | Chromium 149; local production server `127.0.0.1:3013`; 1440x900, 768x1024, 390x844; light/dark/system/reduce | script exit 0; all responsive/DOM/keyboard/theme/console/network oracles passed except the explicit `AC-010` assertion | runtime JSON and six screenshots listed below |
| `TEST-007` | sequential `Tab` from page entry through all project actions | desktop Chromium | 19/19 project actions reached once; all unique, focus-visible, named, and visibly outlined | `runtime.json` keyboard record |
| `TEST-004/009` | `homepage -> #portfolio -> Open Benchline`; `homepage -> #portfolio -> Forge on GitHub` | real popup navigation | `https://evals.netolabs.dev/`; `https://github.com/luizvb/netolabs-forge` | `runtime.json` click paths |
| `TEST-008` | isolated reduced-motion timeline, repeated once after the main browser run | Chromium reduce; 1440x900 | 2/2 reproduced the opacity reveal; first card reached opacity 1 near 725ms | `reduced-motion-retest.json` |
| `TEST-009` | parallel signed-out `curl -L --max-time 30` over 9 products + 10 rendered GitHub URLs | real public internet boundary | all 19 probes exit 0 / HTTP 200; product timings 0.13-1.21s and GitHub 0.68-0.98s in this lab run | terminal ledger |

### Finding

```yaml
id: BUG-001
severity: P2
acceptance_ids: [AC-010]
environment: "local Next production build; Chromium 149.0.7827.55; 1440x900; prefers-reduced-motion: reduce"
candidate: "c25bbd24f13132fc6b536ad5bc5604ac2699ce50 + 410c27ab454387006f340791acea547177298ea66f8e088db91aa621f88a0160"
preconditions:
  - Browser reports matchMedia('(prefers-reduced-motion: reduce)').matches == true
steps:
  - Open http://127.0.0.1:3013/ in the reduced-motion context.
  - Navigate/scroll to the first portfolio card.
  - Sample computed opacity and transform from viewport entry until stable.
expected: "Portfolio content is immediately visible and usable without a required reveal animation."
actual: "Forge begins at opacity 0 and translateY(34px); transform is removed quickly, but opacity visibly animates to 1 over approximately 725ms."
frequency: "2/2 isolated reduced-motion executions"
user_and_business_impact: "Visitors who request reduced motion still receive an entrance reveal and momentarily hidden project content; the portfolio eventually becomes usable, so the impact is material accessibility rather than a broken critical journey."
evidence:
  - "/Users/luizneto/Documents/Obsidian Vault/Memory/Runs-history/assets/2026-07-13-netolabs-recent-projects-runtime.json"
  - "/Users/luizneto/Documents/Obsidian Vault/Memory/Runs-history/assets/2026-07-13-netolabs-recent-projects-reduced-motion-retest.json"
suspected_scope: "Motion initial/whileInView behavior in src/components/motion-elements.tsx during SSR/hydration; CSS reduced-motion duration does not prevent the Motion opacity reveal."
owner: coder
retest_required:
  - Re-run the isolated reduced-motion viewport-entry and hover/focus checks for all project cards.
  - Re-run npm test, lint, build, and a responsive browser smoke after the fix.
```

### Security, privacy, accessibility, and performance assessment

- **Security/privacy:** pass for this bounded static delta. No env/config/dependency change, external image host, secret, private repository action, authenticated surface, PII, readable customer/supplier record, or browser/session state was observed. HTTP probing was signed out and read-only.
- **Accessibility:** semantic `header/nav/main/footer`, 11 `article` cards with 11 `h3` headings, nine concise non-empty alternatives, two decorative abstract treatments, zero empty interactive elements, unique action names, 34x34 CSS-pixel card targets, logical keyboard order, and visible focus passed. Reduced motion fails only as `BUG-001`; no full screen-reader session or conformance claim was made.
- **Performance:** nine production WebPs total 345,896 bytes; all have intrinsic 1440x900 metadata, a reserved 16:10 rendered box, responsive `sizes`, local Next image URLs, and `loading=lazy`. All loaded after deliberate navigation with zero failed request. This is lab evidence, not field CWV/p75 evidence.
- **Themes/visual:** light, dark, and system modes retained readable card framing, lifecycle labels, actions, and recognizable screenshots. No crop hid product identity in desktop, tablet, or mobile evidence.
- **CI/CD:** no `.github` CI configuration is present in this repository. Local gates were rerun independently; automated CI/Playwright enforcement remains a coverage gap, not evidence fabricated as green.

### Coverage gaps and release conditions

- The production deployment at `https://netolabs.dev` was not authorized or mutated by Tester. Main must tie deployment to the exact released commit and repeat production HTTP/browser smoke before declaring release completion.
- Browser coverage is Chromium only in Tester evidence; the Browser plugin itself had no discoverable browser in this session, so standalone Playwright was the bounded fallback. No Safari/Firefox compatibility claim is made.
- Field Core Web Vitals, a full assistive-technology pass, and penetration testing were not performed; none is inferred from local lab checks.
- `qa_status` becomes `ready` after Coder removes the reduced-motion opacity reveal and Tester reruns the named retest scope. Alternatively, Main/Luiz may explicitly accept `BUG-001` as a bounded P2 risk and release under `conditional`; Tester does not grant that waiver.

### Retained QA artifacts

- `/Users/luizneto/Documents/Obsidian Vault/Memory/Runs-history/assets/2026-07-13-netolabs-recent-projects-desktop.png`
- `/Users/luizneto/Documents/Obsidian Vault/Memory/Runs-history/assets/2026-07-13-netolabs-recent-projects-tablet.png`
- `/Users/luizneto/Documents/Obsidian Vault/Memory/Runs-history/assets/2026-07-13-netolabs-recent-projects-mobile.png`
- `/Users/luizneto/Documents/Obsidian Vault/Memory/Runs-history/assets/2026-07-13-netolabs-recent-projects-theme-light.png`
- `/Users/luizneto/Documents/Obsidian Vault/Memory/Runs-history/assets/2026-07-13-netolabs-recent-projects-theme-dark.png`
- `/Users/luizneto/Documents/Obsidian Vault/Memory/Runs-history/assets/2026-07-13-netolabs-recent-projects-theme-system.png`
- `/Users/luizneto/Documents/Obsidian Vault/Memory/Runs-history/assets/2026-07-13-netolabs-recent-projects-runtime.json`
- `/Users/luizneto/Documents/Obsidian Vault/Memory/Runs-history/assets/2026-07-13-netolabs-recent-projects-reduced-motion-retest.json`
- `/Users/luizneto/Documents/Obsidian Vault/Memory/Runs-history/assets/2026-07-13-netolabs-recent-projects-qa.cjs`

### Retest cycle 1 — `BUG-001`

Status: `completed`.

**Retest candidate.** `main` at `c25bbd24f13132fc6b536ad5bc5604ac2699ce50`; composite SHA-256 of the four product/test files plus nine WebPs is `d64fa2a0cfbcae819815fc65269ba00ffd944a2984981f621524bb51925e27f5`. The delta from the prior QA candidate is bounded to the reduced-motion `.project-card` CSS invariant, its source regression assertion, and this living plan.

**Retest plan before execution.** `RETEST-001` reruns native `npm test`, lint, production build, and diff gates. `RETEST-002` loads the production build with `prefers-reduced-motion: reduce`, samples computed `opacity`/`transform` from first response through hydration and viewport entry, then verifies every card remains immediately `opacity: 1` / `transform: none`. `RETEST-003` exercises hover and keyboard focus under reduce and confirms visibility/geometry remain invariant. `RETEST-004` repeats the same entry/hover path under normal motion and requires the existing reveal/hover behavior to remain active. `RETEST-005` performs a bounded 1440x900, 768x1024, and 390x844 smoke for 11 cards, 9 images, Benchline's single action, grid columns, horizontal fit, clipping/overlap, console/page/network health, and stable candidate identity.

**Exit criterion.** Mark `BUG-001` closed and final `qa_status: ready` only if `AC-010` passes from hydration onward, normal motion is not disabled, the bounded responsive/native gates do not regress, and the candidate hash remains stable. Otherwise retain `conditional` or emit `blocked` according to severity. Tester will append the executed timeline, artifacts, residual gaps, and final `next_owner: Main` below without changing product code.

### Retest result — `BUG-001` closed

`final qa_status: ready`

`next_owner: Main`

This result supersedes the initial `conditional` verdict for composite candidate `410c27ab454387006f340791acea547177298ea66f8e088db91aa621f88a0160`. The recovery candidate remained stable before and after retest at `HEAD c25bbd24f13132fc6b536ad5bc5604ac2699ce50` and composite SHA-256 `d64fa2a0cfbcae819815fc65269ba00ffd944a2984981f621524bb51925e27f5`. `BUG-001` is closed: `AC-010` now passes, all `AC-001..014` pass for the local candidate, and no open P0/P1/P2 remains.

**Native gates.** Independent execution of `npm test`, `npm run lint`, `npm run build`, and `git diff --check` exited 0. The suite passed 8/8 tests; Next.js 16.2.10 completed compilation, TypeScript checking, static generation, and `/` prerender. Candidate scope remained the same four product/test files, nine WebPs, and the living `docs/` plan.

**Reduced-motion timeline.** Chromium 149 with `prefers-reduced-motion: reduce` passed at 390x844, 768x1024, and 1440x900. After CSS application and through hydration, viewport entry samples at `0/25/75/175/375/725/1425ms`, hover, keyboard focus, and all eleven card checks, computed state remained `opacity: 1` and `transform: none`. The harness' earliest DOM observer sample at mobile/tablet occurred before first paint while the first card was below the viewport; CSS corrected the state before paint. The user-observable oracle therefore remained strict from first paint, hydration completion, and viewport entry onward.

**Normal-motion regression.** With reduced-motion preference inactive, the first card retained its intended entry reveal (`opacity: 0`/`translateY(34px)` before entry, progressing to `opacity: 1`/zero translation by 725ms) and hover lift (approximately `-5.46px`). The accessibility fix is therefore media-scoped and did not disable normal motion.

**Bounded responsive smoke.** All three viewports rendered exactly eleven cards and nine loaded images; Benchline retained one action; grid behavior remained one column at 390 and two columns at 768/1440. Document width equaled viewport width, no card clipped or overflowed, and console errors, page errors, request failures, and bad responses were empty. Independent visual inspection of the four retained screenshots found no material regression.

**Residual coverage gaps.** Tester did not deploy or validate `https://netolabs.dev`; Main still owns release parity and production HTTP/browser smoke. Browser coverage is Chromium-only because the in-app Browser runtime exposed no browser after bounded recovery, so the already-installed standalone Playwright/Chromium runtime was used without modifying repository dependencies. No Safari/Firefox, field CWV, full assistive-technology, or penetration-test claim is made. These bounded gaps do not block local `ready`.

**Retest artifacts.** The machine-readable evidence and four screenshots are retained outside the repository:

- `/Users/luizneto/Documents/Obsidian Vault/Memory/Runs-history/assets/2026-07-13-netolabs-recent-projects-bug001-retest.json`
- `/Users/luizneto/Documents/Obsidian Vault/Memory/Runs-history/assets/2026-07-13-netolabs-recent-projects-bug001-retest-1440.png`
- `/Users/luizneto/Documents/Obsidian Vault/Memory/Runs-history/assets/2026-07-13-netolabs-recent-projects-bug001-retest-768.png`
- `/Users/luizneto/Documents/Obsidian Vault/Memory/Runs-history/assets/2026-07-13-netolabs-recent-projects-bug001-retest-390.png`
- `/Users/luizneto/Documents/Obsidian Vault/Memory/Runs-history/assets/2026-07-13-netolabs-recent-projects-bug001-retest-normal.png`
- `/Users/luizneto/Documents/Obsidian Vault/Memory/Runs-history/assets/2026-07-13-netolabs-recent-projects-bug001-retest.cjs`
