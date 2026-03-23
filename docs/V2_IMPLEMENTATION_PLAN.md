# AIMusings.site V2 Implementation Plan

## Executive Summary

This document outlines the comprehensive plan to build the v2 version of aimusings.site at the `/v2` endpoint. The new page will showcase the full story of AI Musings' engagement activities across three main pillars: **Talks**, **Meetups**, and **Workshops**.

---

## 1. Project Overview

### Current State
- **URL**: https://aimusings.space
- **Focus**: Primarily showcases 200-level workshops (Builder Series)
- **Missing**: Talks, Meetups, 100-level workshops, 300-level workshops

### Target State
- **New URL**: https://aimusings.space/v2
- **Coexistence**: Current homepage remains unchanged
- **New Features**: Complete engagement activity showcase with 3 pillars
- **Data Management**: YAML-based for easy content updates

---

## 2. Information Architecture

### Site Structure
```
aimusings.space/
├── index.html (current - unchanged)
├── v2.html (NEW - comprehensive landing page)
├── _layouts/
│   ├── default.html (existing)
│   ├── landing.html (existing)
│   └── landing-v2.html (NEW - based on landing-v3.html reference)
├── _data/ (NEW directory)
│   ├── talks.yml
│   ├── meetups.yml
│   └── workshops.yml
└── assets/
    ├── images/ (existing - will add new event photos)
    └── videos/ (organize existing videos)
```

### Page Sections (v2.html)
1. **Hero Section** - Welcome message with 3-pillar overview
2. **Navigation Pills** - Quick jump to Talks, Meetups, Workshops
3. **Talks Section** - Event listing with scrollable table
4. **Meetups Section** - Event listing with scrollable table
5. **Workshops Section** - 3 levels (100, 200, 300)
6. **Call-to-Action** - Schedule call, contact info
7. **Footer** - Updated contact information

---

## 3. Design Reference

### Source
- **Repository**: https://github.com/pulsarventures/pv-website
- **Commit**: e2e2ccc7e7971c6ccfb1466bd3edd2890c625a73
- **Key Files**:
  - `_layouts/landing-v3.html` - Modern, clean layout with Tailwind CSS
  - `v3.html` - Page structure and component organization

### Design Principles
- **Modern & Clean**: Tailwind CSS-based design
- **Responsive**: Mobile-first approach
- **Accessible**: WCAG compliant
- **Animated**: Smooth scroll-triggered animations
- **Professional**: Purple/violet brand colors

---

## 4. Data Structure (YAML)

### 4.1 Talks Data
```yaml
- name: "Talk Title"
  date: "2026-04-15"
  dates: "April 15, 2026"
  status: "upcoming"
  location: "Virtual"
  description: "Brief description"
  speakers:
    - "Speaker Name"
  registration_link: "https://..."
  recap_links:
    - url: "https://linkedin.com/..."
      type: "LinkedIn Post"
      icon: "fab fa-linkedin"
```

### 4.2 Meetups Data
```yaml
- name: "Meetup Title"
  date: "2026-05-20"
  dates: "May 20, 2026"
  status: "upcoming"
  location: "City, Venue"
  description: "Brief description"
  registration_link: "https://..."
  recap_links:
    - url: "https://linkedin.com/..."
      type: "Event Recap"
```

### 4.3 Workshops Data
```yaml
- name: "Workshop Title"
  level: 200
  level_name: "Builder Series"
  series: "Builder Series - 9"
  date: "2026-04-19"
  dates: "April 19 & 22, 2026"
  status: "scheduled"
  format: "Virtual on Zoom"
  registration_link: "https://..."
  recap_links:
    - url: "https://linkedin.com/..."
      type: "Workshop Recap"
```

---

## 5. Component Breakdown

### 5.1 Hero Section
- Large heading with 3-pillar introduction
- Navigation cards for Talks, Meetups, Workshops
- CTA buttons for scheduling and contact

### 5.2 Talks Section
- Section header with icon
- Scrollable event table (10 rows visible)
- Columns: Event Name | Date(s) | Status | Posts & Recap
- Status badges with icons

### 5.3 Meetups Section
- Section header with icon
- Scrollable event table (10 rows visible)
- Same structure as Talks
- Location information included

### 5.4 Workshops Section
Three levels with consistent structure:
- **Level 100**: Beginner Intro sessions
- **Level 200**: Builder Series (existing content)
- **Level 300**: Advanced Deep Dive (Claude, Copilot, Gemini)

Each level includes:
- Level badge and description
- Featured upcoming workshop
- Scrollable past workshops table
- Photo/video gallery integration

---

## 6. Technical Implementation

### 6.1 Layout File (landing-v2.html)
Based on `_layouts/landing-v3.html` with:
- Tailwind CSS via CDN
- Inter font family
- Lucide icons
- Scroll-triggered animations
- Mobile menu toggle
- Smooth scroll navigation

### 6.2 Custom Styles
```css
.table-scroll-container {
  max-height: 600px;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.table-scroll-container thead {
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
}

.pillar-card {
  transition: transform 0.3s ease;
}

.pillar-card:hover {
  transform: translateY(-8px);
}
```

### 6.3 Jekyll Liquid Logic
```liquid
{% assign upcoming_talks = site.data.talks | where: "status", "upcoming" | sort: "date" %}
{% assign level_100 = site.data.workshops | where: "level", 100 %}
{% assign level_200 = site.data.workshops | where: "level", 200 %}
{% assign level_300 = site.data.workshops | where: "level", 300 %}
```

---

## 7. Asset Management

### Photo Organization
```
assets/images/
├── talks/
├── meetups/
└── workshops/
    ├── level-100/
    ├── level-200/ (existing photos)
    └── level-300/
```

### Video Integration
- YouTube embeds for testimonials
- Responsive 16:9 containers
- Lazy loading for performance

---

## 8. Mobile Responsiveness

### Breakpoints
- Desktop: 1024px+
- Tablet: 768px - 1023px
- Mobile: < 768px

### Mobile Adaptations
- Hero cards stack vertically
- Tables use horizontal scroll or card layout
- Hamburger navigation menu
- Responsive images and typography

---

## 9. Implementation Phases

### Phase 1: Foundation
1. Create `_data/` directory
2. Create YAML files with sample data
3. Create `_layouts/landing-v2.html`
4. Create `v2.html` basic structure
5. Test Jekyll build

### Phase 2: Talks & Meetups
6. Build Talks section with table
7. Build Meetups section with table
8. Add scrollable styling

### Phase 3: Workshops
9. Build Level 100 section
10. Build Level 200 section (migrate existing)
11. Build Level 300 section
12. Integrate galleries

### Phase 4: Polish & Testing
13. Add Cal.com integration
14. Update contact information
15. Mobile testing
16. Cross-browser testing

### Phase 5: Documentation
17. Create editor guide

---

## 10. Content Migration

### Existing Workshop Data
- Builder Series 1-9 with dates and status
- Claude Series 1 (special session)
- All LinkedIn recap links
- Registration links

### Photo Assets
- group1.jpeg through group8.jpeg
- instructors1.jpeg, instructors2.jpeg
- sree.jpeg, swati.jpeg
- Workshop flyers and class photos

---

## 11. Contact Information Updates

### Current
- Email: spradhip@pulsarventurs.co
- Calendly: https://calendly.com/spradhip

### New (v2)
- Email: **spradhip@pulsarventures.co**
- Cal.com: **https://cal.com/sree.pradhip**

---

## 12. Testing Checklist

### Functionality
- All internal links work
- External links open in new tabs
- Cal.com scheduling works
- Email links work
- Smooth scroll navigation
- Mobile menu toggles

### Content
- YAML data renders correctly
- Tables display 10 rows with scroll
- Status badges show correct colors
- Photos and videos load

### Responsive Design
- Desktop (1920px, 1440px, 1024px)
- Tablet (768px, 834px)
- Mobile (375px, 414px, 390px)

### Browser Compatibility
- Chrome, Firefox, Safari, Edge
- Mobile Safari, Mobile Chrome

---

## 13. Success Criteria

### Must Have
- v2 page at `/v2` endpoint
- Current homepage unchanged
- All 3 pillars visible
- Scrollable event tables
- Workshop levels 100, 200, 300
- YAML data structure
- Mobile responsive
- Contact info updated

### Nice to Have
- Animated transitions
- Photo galleries with lightbox
- Video testimonials carousel
- Search/filter functionality

---

## 14. Timeline Estimate

### Development
- Phase 1: 2-3 hours
- Phase 2: 2-3 hours
- Phase 3: 3-4 hours
- Phase 4: 2-3 hours
- Phase 5: 1-2 hours

**Total**: 10-15 hours

---

## 15. File Deliverables

### New Files
1. `_data/talks.yml`
2. `_data/meetups.yml`
3. `_data/workshops.yml`
4. `_layouts/landing-v2.html`
5. `v2.html`
6. `docs/CONTENT_EDITING_GUIDE.md`

### Files to Reference
- `index.html` (workshop data)
- `_layouts/landing.html` (design)
- `_config.yml` (site data)

---

## 16. Deployment Plan

### Pre-Deployment
1. Test on local Jekyll server
2. Validate YAML files
3. Check all links
4. Optimize images
5. Run Lighthouse audit

### Deployment
1. Commit to Git
2. Push to GitHub
3. Verify GitHub Pages build
4. Test live site
5. Monitor for errors

---

## 17. Maintenance Plan

### Weekly
- Review new events
- Update statuses
- Add recap links

### Monthly
- Archive old events
- Update media
- Review analytics

### Quarterly
- Content audit
- Design refresh
- Feature enhancements

---

## Appendix: Design Tokens

### Colors
- Brand Purple: #7c3aed
- Light Purple: #8b5cf6
- Success: #10b981
- Info: #3b82f6
- Warning: #f59e0b

### Typography
- Font: Inter
- Hero: 3rem
- H1: 2.5rem
- H2: 2rem
- Body: 1rem

### Icons
- Lucide Icons (via CDN)
- Font Awesome (existing)

---

## Conclusion

This plan provides a comprehensive roadmap for building AIMusings.site v2. The modular YAML-based approach ensures scalability and ease of content management. The design reference from pv-website ensures a modern, professional appearance.

**Next Steps**: Proceed with Phase 1 implementation.