# Test Strategy — v2 Namespace Consolidation (2026-07-20)

## Context

The site was rebuilt as "v2" on 2026-07-16. To let new files coexist with the old
site during migration, everything was namespaced `v2` (`_layouts/v2.html`,
`_includes/v2/`, `assets/css/v2.css`, `assets/js/v2.js`, `assets/v2/`, and the
`v2:` block in `_config.yml`). The old site was deleted, so the namespace no
longer disambiguates anything — it is migration scaffolding. This refactor
removes it. **The refactor must produce byte-identical rendered output except
for the renamed asset URLs.** There is no behavior change; therefore the test
strategy is built around build-diff regression, not unit tests.

## Renames under test

| Before | After |
|---|---|
| `_layouts/v2.html` | `_layouts/default.html` |
| `_includes/v2/*` (7 files) | `_includes/*` |
| `assets/css/v2.css` | `assets/css/main.css` |
| `assets/js/v2.js` | `assets/js/main.js` |
| `assets/v2/{fonts,icons,img}` | `assets/{fonts,icons,img}` |
| `_config.yml` `v2:` block | `links:` block (`site.v2.*` → `site.links.*`, 34 refs) |

## Phase 1 — Baseline (BEFORE any change)

1. Clean-build the unmodified working tree with the pinned toolchain
   (`jekyll/jekyll:4.2.2` Docker image, same as all prior local builds).
2. Snapshot `_site/` to a scratch location as `baseline_site/`.
3. Record the output file inventory (`find _site -type f | sort`).

## Phase 2 — Post-change acceptance criteria (ALL must pass)

1. **Build passes clean.** `jekyll build` exits 0 with no Liquid errors or
   warnings beyond those present in the baseline build log.
2. **Normalized diff is empty.** Apply the *expected* URL substitutions to the
   baseline HTML/CSS (`/assets/css/v2.css`→`/assets/css/main.css`,
   `/assets/js/v2.js`→`/assets/js/main.js`, `/assets/v2/`→`/assets/`), then
   `diff -r` against the new `_site/`. Any remaining difference — content,
   ordering, whitespace, schema markup — is a regression and blocks the change.
3. **Zero residual `v2`.** `grep -ri "v2" _site/` (excluding the sitemap
   `<lastmod>` false-positive class: none expected) returns nothing.
4. **Internal reference integrity.** Script-extract every local `href`, `src`,
   `srcset`, CSS `url()`, and JSON-LD URL from built HTML/CSS; each must resolve
   to an existing file in `_site/`. Covers all 18 font files, every icon,
   `logo.png`, `og-card.png`.
5. **JSON-LD validity.** Every `application/ld+json` block on all 5 pages parses
   with Python `json.loads`; `@id` cross-references between blocks still match.
6. **Output inventory matches.** Same file set as baseline modulo exactly the
   renamed asset paths; `sitemap.xml` page URL set unchanged.
7. **HTTP smoke test.** Serve `_site/` locally; assert 200 on `/`, `/workshops/`,
   `/corporate/`, `/universities/`, `/404.html`, `/assets/css/main.css`,
   `/assets/js/main.js`, `/assets/img/logo.png`, `/assets/img/og-card.png`,
   and one font file.
8. **Adversarial review.** Multi-agent review of the full diff under three
   lenses — reference integrity, Jekyll/Liquid semantics, SEO/schema impact —
   with each finding independently verified before it blocks or is dismissed.

## Known accepted risk

External caches that stored the literal old URLs (`/assets/v2/img/og-card.png`,
logo) will 404 after deploy. Social scrapers re-read the meta tags on next
scrape and the media layer only went live 2026-07-20, so exposure is hours old.
No redirects exist on GitHub Pages for assets; accepted.

## Out of scope

- `assets/images/` (23 MB) and `assets/timer/` are unreferenced legacy folders —
  tracked separately; not touched by this refactor so the diff stays reviewable.
- `docs/superpowers/specs/2026-07-16-aim-v2-redesign-design.md` keeps its `v2`
  wording — it is a historical record.
