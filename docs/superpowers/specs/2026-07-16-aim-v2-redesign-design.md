# AI Musings — Website v2 Redesign (Design Spec)

**Date:** 2026-07-16
**Branch:** `feature/v2-redesign`
**Source of truth:** `AIM Landing page revisions.zip` → `design_handoff_ai_musings_website/` (Claude "cloud design" high-fidelity prototype + README). Where README and the prototype HTML disagree, **the HTML wins.**

## Decision summary (from owner)
- **v2 is the single source of truth.** The current site is ignored. Anything not present in v2 is dropped: the old Meetups & Talks sections/data, the Blog, and the standalone About / Contact / Speaker pages.
- Stay on **Jekyll + GitHub Pages** (domain `aimusings.site`, already configured via `CNAME`).
- Turn the prototype's client-side view switching into **real, linkable, SEO-indexable routes.**
- Recreate the design **using the codebase's own patterns** (proper Jekyll layouts/includes/data + a real, responsive stylesheet) — *not* a copy of the prototype's inline styles. Match the design's exact tokens, copy, and spacing.
- Content the owner maintains lives in **`_data/*.yml`**.
- Build order: **design system + shared chrome + Home first** (for review), then fan out the other four pages.

## Routes (real pages)
| Route | File | `nav_active` |
|---|---|---|
| `/` | `index.html` | `home` |
| `/workshops/` | `workshops.html` | `workshops` |
| `/professionals/` | `professionals.html` | `pros` |
| `/corporate/` | `corporate.html` | `corporate` |
| `/universities/` | `universities.html` | `university` |

The prototype's `Instructors` and `Stories` nav items are **anchors on Home** (`#sec-instructors`, `#sec-stories`, `scroll-margin-top:80px`). Cross-page links go to `/#sec-...`. `Academy` is an external link (`https://academy.aimusings.site`).

## Architecture
- **Layout** `_layouts/v2.html` — `<head>` (SEO/meta/fonts/css), fixed **nav**, page content (`{{ content }}`), **footer**, **register modal**, `v2.js`.
- **Includes** `_includes/v2/`:
  - `head.html` — meta, jekyll-seo-tag, preload fonts, link `assets/css/v2.css`
  - `nav.html` — fixed header: logo → Home · Workshops · **Programs ▾** (Professionals/Corporate/Universities) · Instructors · Stories · **Academy ↗** · **Connect ▾** (Schedule/Email/WhatsApp/LinkedIn/YouTube) · **Register** button. Dropdowns open on hover (200 ms close delay) + click. Active item = purple. Mobile: hamburger panel.
  - `footer.html` — `#100a1f`; © + icon links (emails, WhatsApp, LinkedIn, YouTube, Schedule a call, Academy).
  - `register-modal.html` — dark scrim + 560px card listing open cohorts (each → Tixtree).
  - `inquiry-card.html` — shared Corporate + Universities contact card (`#sec-inquiry`): "Schedule a free call" (cal.com) + "Email us instead" (mailto). **No form** (matches handoff).
  - Section partials for Home as needed.
- **Styles** `assets/css/v2.css` — plain CSS with custom-property tokens (below). Responsive: multi-column grids collapse at ≤900px / ≤640px; hero and audience layouts stack; nav becomes a hamburger. Hover states (prototype `style-hover`) become real `:hover` rules.
- **JS** `assets/js/v2.js` — vanilla, no framework: nav dropdowns + mobile toggle, register modal open/close, testimonial auto-rotate (6 s, 3 visible, 220 ms fade, pause when modal open, prev/next), FAQ accordion (one open), catalog filter pills.
- **Removed** (recoverable via git): old `index.html`, `_pages/*`, `_data/meetups.yml` + `talks.yml` + `photos.yml`, old `_sass/*`, old `_includes/*` (Bootstrap/AOS/FontAwesome/Inter chrome), `404`/`_layouts` reworked.

## Data model (`_data/`)
- `cohorts.yml` — open-for-registration list (Home card, Professionals card, Register modal). Fields: `name, meta, mon, day, link, dark`.
- `levels.yml` — learning-path 4 cards: `num, name, desc, meta, flag, dark`.
- `catalog.yml` — 4 workshops: `lvl, num, name, flag, desc, topics (·-separated), next, link, request` (request=true → "Request a cohort" → /corporate).
- `past_cohorts.yml` — 13 rows: `name, dates, fmt, recap`.
- `faqs.yml` — 9 `question/answer` (first open by default).
- `testimonials.yml` — 6 `name/text` (rotates 3 at a time).
- `tools.yml` — 4 groups (`GENERAL PURPOSE / BUILD / AUTOMATION / OTHER`) each with `label` + `items[{name, icon}]`.
- `corp_offers.yml` — 4 `name/tag/desc/icon` (Assess/Discover/Build/Scale).
- **`_config.yml`**: `professionals_trained: "200+"` and a `v2:` block for shared URLs (emails, cal.com, whatsapp, youtube, linkedin, academy) + default Tixtree.

## Design tokens (exact)
**Type:** Public Sans (400–800, UI/body) · Source Serif 4 (headings, italic accent words). Heading sizes 56/48/44/34/32/28/26/22 px, serif 600. Eyebrows `500 13px` purple, "— " prefix. Body 13–17.5 px.
**Color:** ink `#171028` · body `#453d5c` · muted `#776f8e` · faint `#b6b0c6` · purple `#6c4ac6` / hover `#57379f` / light `#8b72c9` / deep `#43265f` · tints `#efeafa` `#f6f4fb` `#f6dcec` `#f2eee6` · dark `#171028` / footer `#100a1f` · on-dark `#cfc6e4` `#9c8fc0` `#d9c7f5` `#b9a8ea` · borders `rgba(23,16,40,.08/.1/.15/.16/.2)` · LinkedIn `#0A66C2` · error `#b4304a` · positive `#0a7d4f`.
**Radii:** pills 99px · buttons 9–10px · cards 12–16px · large/modal 20px.
**Shadows:** cards `0 8px 30px rgba(21,13,41,.07)` · dropdowns `0 14px 40px rgba(21,13,41,.16)` · modal `0 24px 70px rgba(0,0,0,.35)`.
**Grid:** max-width 1200px, 32px side padding, section 52–56px vertical, `border-top:1px solid rgba(23,16,40,.08)` between Home sections.

## Assets (vendored — no CDNs)
`assets/v2/`:
- `fonts/*.woff2` — Public Sans + Source Serif 4 subsets (self-hosted; `@font-face` in `v2.css`).
- `icons/*.svg` — mono lucide icons used via CSS `mask` (friendly names: `briefcase-business, building-2, graduation-cap, book-open, hammer, handshake, radio, rocket, users-round, video, door-open, calendar-check, gauge, zap, mic, calendar-days, award, shapes, target, mail, linkedin, youtube, calendar-clock, search-check, map, trending-up, whatsapp`).
- `icons/tools/*` — brand tool logos (`openai, claude, googlegemini, cursor, claudecode, n8n, perplexity, notebooklm, lovable`) + monogram fallbacks (`gamma, mindstudio`).
- `img/` — `logo.png`, `swati-jain.jpg`, `sree-pradhip.jpg`, `event-01..12.jpg` (testimonial/event gallery).

## Home sections (order)
Hero (2-col: copy + open-cohorts card) → **The AI Musings method** (learn/build/network loop) → **One goal, three doors** (+ role chips) → **Why AI Musings** (shortfalls + 2×2 cards) → **The learning path** (4 levels + tools grid) → **Outcomes** (5 stat cards on `#f2eee6` + "leaves with" chips) → **Not another video library** (comparison table) → **Instructors** `#sec-instructors` → **Reviews** `#sec-stories` (YouTube embed `pU1DiMgk-ZY` + rotating quotes + event photo gallery) → **Corporate band** (dark, 5 numbered items) → **FAQ** (centered accordion).

## Other pages
- **Workshops** — "The catalog." + filter pills (All/100/200/300/400) · 4 catalog rows · "Every cohort ships with" (3×2) · "Twelve cohorts and counting" past-cohorts table.
- **Professionals** — audience toggle · hero + cohorts card · "Find yourself here" (3 persona cards) · "How it works" (3 steps) · "What you'll walk away with" (3×2 checks) · dark CTA band with stat row.
- **Corporate** — dark hero + 4 stat cards · "AI as a teammate" current→future table · 4 offer cards · 3 representative engagements · dark "three ways to start" · shared inquiry card.
- **Universities** — dark hero + 3 offering cards · "Students build, not just watch" (3 cards) · shared inquiry card.

## Key URLs / content facts
- Tixtree cohort links, cal.com `https://cal.com/sree.pradhip`, WhatsApp, YouTube `@AIMusingsBuilderCommunitySnS`, LinkedIn `company/aimusings`, Academy `academy.aimusings.site`, emails `sree@ / swati@aimusings.site` — all external links open in a new tab.
- Instructors: **Swati Jain** (LinkedIn `swatijainatl`) and **Sree Pradhip** (LinkedIn `sree-pradhip`); cohorts co-taught, capped at 15 seats.
- Stats: `{{ professionals_trained }}` (200+), 15+ workshops, 4.8★, 12+ months, 10+ tools.

## Out of scope
No backend, no forms, no blog, no meetups/talks. No new copy — all text is final from the prototype.
