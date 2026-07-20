# AI Musings — website

Marketing site for **AI Musings** — live, hands-on AI fluency workshops for professionals, corporate teams, and universities. Built with **Jekyll**, deployed on **GitHub Pages** at **https://aimusings.site**.

This is the **2026 redesign** — a full visual overhaul recreated from the design handoff in `docs/superpowers/specs/`. Registration is handled externally on Tixtree; organization inquiries route to a scheduling link (cal.com) and email. There are **no forms and no backend**.

## Pages (real routes)

| Route | File | Purpose |
|---|---|---|
| `/` | `index.html` | Home |
| `/workshops/` | `workshops.html` | Catalog (100/200/300/400), what's included, past cohorts |
| `/professionals/` | `professionals.html` | Public cohorts for individuals |
| `/corporate/` | `corporate.html` | Private programs for teams |
| `/universities/` | `universities.html` | Campus programs |

`Instructors` and `Stories` in the nav are anchors on the Home page (`/#sec-instructors`, `/#sec-stories`).

## Editing content

Content the team maintains lives in **`_data/*.yml`** — edit these, no HTML needed:

- `cohorts.yml` — open-for-registration cohorts (Home + Professionals hero cards + Register modal)
- `catalog.yml` — the four workshop levels shown on `/workshops/`
- `levels.yml` — the learning-path cards on Home
- `past_cohorts.yml` — the past-cohorts table (`recap:` is an optional LinkedIn URL)
- `faqs.yml` — Home FAQ accordion
- `testimonials.yml` — rotating reviews on Home
- `tools.yml` — the "tools that matter" grid
- `corp_offers.yml` — the four Corporate offerings

Shared links (emails, cal.com, WhatsApp, YouTube, LinkedIn, Academy) and the tweakable `professionals_trained` number live in **`_config.yml`** under the `links:` block.

## Project structure

```
_config.yml            # Site config + shared URLs (links: block)
_data/*.yml            # All editable content
_layouts/default.html  # Base layout (head, nav, footer, register modal)
_includes/             # head, nav, footer, register-modal, cohort-list, open-cohorts, schema
assets/css/main.css    # Design system (tokens, components, responsive)
assets/js/main.js      # Nav dropdowns, mobile menu, modal, testimonial rotation, FAQ, catalog filter
assets/                # Self-hosted fonts, icons, and images (no CDNs)
index.html, *.html     # The five pages
docs/superpowers/specs # Design spec (source of truth for the redesign)
```

## Local development

### Option A — Ruby / Bundler
```bash
bundle install
bundle exec jekyll serve      # http://localhost:4000
```

### Option B — Docker (no local Ruby needed)
```bash
docker run --rm -v "$PWD":/srv/jekyll -w /srv/jekyll -p 4000:4000 \
  jekyll/jekyll:4.2.2 sh -c "bundle install && jekyll serve --host 0.0.0.0"
```

Then open http://localhost:4000.

## Deployment

Pushing to `main` publishes to GitHub Pages (custom domain `aimusings.site` via the `CNAME` file). The site uses only GitHub-Pages-supported plugins (`jekyll-seo-tag`, `jekyll-sitemap`).

## Design system (quick reference)

- **Type:** Public Sans (UI/body) · Source Serif 4 (headings, italic accent words)
- **Primary purple:** `#6c4ac6` (hover `#57379f`) · ink `#171028` · footer `#100a1f`
- All tokens are defined as CSS custom properties at the top of `assets/css/main.css`.
- Fonts and icons are **self-hosted** in `assets/` — do not reintroduce CDN links.

---

© AI Musings
