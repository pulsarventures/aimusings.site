# Plan: Community Page under Programs

## Context
AI Musings wants to add a **Community** page as the third pillar under Programs (alongside Corporate and Universities). The community is the ongoing engagement path for workshop alumni and members who want to stay plugged in. The immediate offering is **Community Hours** -- bi-monthly calls every other Friday, 3:00-4:30 PM ET, with prepared presentations, community demos, and open Q&A. This is a paid membership at $50/month via Stripe.

## Approach

### 1. Create `community.html` (new file at repo root)
A new page following the same structure as `corporate.html` and `universities.html`:

- **Front matter**: `layout: default`, `nav_active: community`, `permalink: /community/`
- **Dark hero** (`.dark-hero` + `.dark-hero__wrap`): Community overview -- what the AI Musings community is, who it's for. Right side: key stats or value props in `.stat-glass` cards (e.g., "200+ professionals trained", "12+ monthly cohorts", "WhatsApp peer network").
- **Audience toggle**: `.aud-toggle--dark` linking Corporate / Universities / **Community** (active), matching the pattern on the other two pages.

**Page sections (top to bottom):**

1. **Dark Hero** -- "The AI Musings community" intro. What it is, who belongs (alumni, ongoing learners, AI-curious professionals).
2. **Community Hours section** -- The main offering:
   - Schedule: Every other Friday, 3:00-4:30 PM ET
   - Format: three cards/columns for Prepared Presentations, Community Demos, Open Q&A
   - Pricing: $50/month membership
   - **Stripe checkout button** embedded (see Stripe Integration section below)
3. **Reviews** -- Move the testimonials section from the homepage here (or show a subset). Community voices belong here.
4. **Event moments gallery** -- Move the photo gallery from the homepage here. These are community moments.
5. **Stay connected** -- Links to WhatsApp group, LinkedIn, YouTube. A lightweight section since these already exist in the footer/nav.
6. **CTA band** -- Closing dark band encouraging membership signup.

### 2. Update `_includes/nav.html`
Add "Community" as the third item in the Programs dropdown:
- **Desktop**: New `.nav__row` in the `.nav__menu` under Programs, with an icon and subtitle
- **Mobile**: New `<a>` in the `#m-grp-programs` accordion

### 3. Update homepage `index.html`
Move the full Reviews and Event Moments gallery sections to the community page. Replace on the homepage with a **teaser version**:
- Keep 1-2 testimonial quotes (static, no rotation) with a "See more from the community ->" link
- Keep 2-3 photos in a single row with a link to the full gallery on the community page
- This keeps social proof on the homepage while pointing people to the community

### 4. Update `assets/css/main.css`
Add minimal styles for:
- Community Hours format cards (can reuse `.grid.g3` + `.card` or `.method` pattern)
- Stripe button container (simple centered wrapper)
- Any community-specific components not covered by existing classes

### 5. Stripe Integration
Embed exactly as provided -- no modification needed:

```html
<script async src="https://js.stripe.com/v3/buy-button.js"></script>
<stripe-buy-button
  buy-button-id="buy_btn_1TxBSjDCmCL3mQUgc2AnJd0t"
  publishable-key="pk_live_51RjrvGDCmCL3mQUgqqPwiacqAQIRBGoxdMo4tV9CHIZIQVF00gg9MfK7GayG1TarpwomBIKQrM3yLJywwUkmAAqO00mWzHkJDH"
></stripe-buy-button>
```

This loads asynchronously and renders Stripe's hosted checkout button. Stripe captures name and email during checkout -- no custom form needed.

## Files to modify
1. **Create** `community.html` -- new page
2. **Edit** `_includes/nav.html` -- add Community to Programs dropdown (desktop + mobile)
3. **Edit** `index.html` -- move Reviews + Gallery to community page; add lightweight community teaser
4. **Edit** `assets/css/main.css` -- add community-specific styles

## Verification
1. Run `bundle exec jekyll serve` and verify:
   - Community page renders at `/community/`
   - Programs dropdown shows all three: Corporate, Universities, Community
   - Dark hero displays correctly
   - Stripe button loads and is clickable
   - Reviews and gallery appear on community page
   - Homepage still looks complete with the teaser/link
   - Mobile nav works
2. Check responsive behavior at 980px, 820px, 560px breakpoints
