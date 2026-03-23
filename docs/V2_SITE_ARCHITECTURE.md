# AIMusings.site V2 - Site Architecture

## Visual Site Map

```mermaid
graph TD
    A[aimusings.space] --> B[Current Homepage<br/>index.html]
    A --> C[V2 Page<br/>v2.html]
    
    C --> D[Hero Section]
    C --> E[Talks Section]
    C --> F[Meetups Section]
    C --> G[Workshops Section]
    C --> H[Contact Section]
    
    D --> D1[3 Pillar Cards]
    D --> D2[CTA Buttons]
    
    E --> E1[Event Table<br/>10 rows visible]
    E --> E2[Scrollable Container]
    E --> E3[Status Badges]
    
    F --> F1[Event Table<br/>10 rows visible]
    F --> F2[Scrollable Container]
    F --> F3[Status Badges]
    
    G --> G1[Level 100<br/>Beginner Intro]
    G --> G2[Level 200<br/>Builder Series]
    G --> G3[Level 300<br/>Advanced Deep Dive]
    
    G1 --> G1A[Description]
    G1 --> G1B[Upcoming Sessions]
    G1 --> G1C[Past Sessions Table]
    
    G2 --> G2A[Description]
    G2 --> G2B[Upcoming Sessions]
    G2 --> G2C[Past Sessions Table]
    G2 --> G2D[Photo Gallery]
    G2 --> G2E[Video Gallery]
    
    G3 --> G3A[Description]
    G3 --> G3B[Claude Track]
    G3 --> G3C[Copilot Track]
    G3 --> G3D[Gemini Track]
    
    H --> H1[Cal.com Integration]
    H --> H2[Email Contact]
    H --> H3[Social Links]
```

## Data Flow Architecture

```mermaid
graph LR
    A[YAML Data Files] --> B[Jekyll Processing]
    B --> C[Liquid Templates]
    C --> D[HTML Output]
    
    A1[_data/talks.yml] --> B
    A2[_data/meetups.yml] --> B
    A3[_data/workshops.yml] --> B
    
    D --> E[v2.html Page]
    
    F[Assets] --> E
    F1[Images] --> F
    F2[Videos] --> F
```

## Component Hierarchy

```mermaid
graph TD
    A[landing-v2.html Layout] --> B[v2.html Page]
    
    B --> C[Navigation]
    B --> D[Hero Section]
    B --> E[Content Sections]
    B --> F[Footer]
    
    C --> C1[Desktop Menu]
    C --> C2[Mobile Menu]
    
    D --> D1[Heading]
    D --> D2[Pillar Cards]
    D --> D3[CTA Buttons]
    
    E --> E1[Talks]
    E --> E2[Meetups]
    E --> E3[Workshops]
    
    E1 --> E1A[Table Component]
    E2 --> E2A[Table Component]
    E3 --> E3A[Level 100]
    E3 --> E3B[Level 200]
    E3 --> E3C[Level 300]
```

## Responsive Breakpoints

```
Desktop (1024px+)
├── 3-column pillar cards
├── Full-width tables
├── Side-by-side content
└── Desktop navigation

Tablet (768px - 1023px)
├── 2-column pillar cards
├── Scrollable tables
├── Stacked content
└── Desktop navigation

Mobile (<768px)
├── 1-column pillar cards
├── Card-based tables
├── Fully stacked content
└── Hamburger menu
```

## User Journey Flow

```mermaid
graph TD
    A[User lands on v2] --> B{What interests them?}
    
    B -->|Talks| C[View Talks Section]
    B -->|Meetups| D[View Meetups Section]
    B -->|Workshops| E[View Workshops Section]
    
    C --> F[Browse Events]
    D --> F
    E --> G[Choose Level]
    
    G --> G1[Level 100]
    G --> G2[Level 200]
    G --> G3[Level 300]
    
    F --> H{Event Status?}
    H -->|Upcoming| I[Register]
    H -->|Completed| J[View Recap]
    
    I --> K[External Registration]
    J --> L[LinkedIn/YouTube]
    
    F --> M[Schedule Call]
    F --> N[Contact Email]
```

## Content Update Workflow

```mermaid
graph LR
    A[Content Editor] --> B[Edit YAML File]
    B --> C[Add/Update Event]
    C --> D[Commit to Git]
    D --> E[Push to GitHub]
    E --> F[GitHub Pages Build]
    F --> G[Live Site Updated]
    
    B --> B1[talks.yml]
    B --> B2[meetups.yml]
    B --> B3[workshops.yml]
```

## File Structure

```
aimusings.site/
│
├── index.html                    # Current homepage (unchanged)
├── v2.html                       # NEW: V2 landing page
│
├── _layouts/
│   ├── default.html              # Existing layout
│   ├── landing.html              # Existing layout
│   └── landing-v2.html           # NEW: V2 layout
│
├── _data/                        # NEW: Data directory
│   ├── talks.yml                 # Talks events data
│   ├── meetups.yml               # Meetups events data
│   └── workshops.yml             # Workshops events data
│
├── _includes/
│   ├── head.html                 # Existing
│   ├── header.html               # Existing
│   └── footer.html               # Existing
│
├── assets/
│   ├── css/
│   │   └── main.scss             # Existing styles
│   ├── js/
│   │   ├── main.js               # Existing scripts
│   │   └── enhanced-interactions.js
│   └── images/
│       ├── talks/                # NEW: Talks photos
│       ├── meetups/              # NEW: Meetups photos
│       └── workshops/
│           ├── level-100/        # NEW: Level 100 photos
│           ├── level-200/        # Existing photos
│           └── level-300/        # NEW: Level 300 photos
│
└── docs/
    ├── V2_IMPLEMENTATION_PLAN.md # This plan
    ├── V2_SITE_ARCHITECTURE.md   # This document
    └── CONTENT_EDITING_GUIDE.md  # To be created
```

## Technology Stack

```
Frontend:
├── HTML5
├── Tailwind CSS (via CDN)
├── JavaScript (Vanilla)
└── Lucide Icons

Backend:
├── Jekyll (Static Site Generator)
├── Liquid (Templating)
└── YAML (Data Storage)

Hosting:
└── GitHub Pages

Integrations:
├── Cal.com (Scheduling)
├── YouTube (Videos)
└── LinkedIn (Social)
```

## Performance Optimization

```mermaid
graph TD
    A[Performance Strategy] --> B[Image Optimization]
    A --> C[Lazy Loading]
    A --> D[CSS Optimization]
    A --> E[JS Optimization]
    
    B --> B1[WebP Format]
    B --> B2[Responsive Images]
    B --> B3[Compression]
    
    C --> C1[Videos]
    C --> C2[Images Below Fold]
    
    D --> D1[Tailwind CDN]
    D --> D2[Critical CSS Inline]
    
    E --> E1[Defer Non-Critical]
    E --> E2[Minimize Dependencies]
```

## Security Considerations

```
1. External Links
   └── target="_blank" + rel="noopener noreferrer"

2. Form Submissions
   └── Cal.com handles security

3. Content Security
   └── YAML validation before deployment

4. HTTPS
   └── Enforced by GitHub Pages

5. No User Input
   └── Static site = minimal attack surface
```

## Accessibility Features

```
WCAG 2.1 AA Compliance:
├── Semantic HTML
├── ARIA labels
├── Keyboard navigation
├── Focus indicators
├── Color contrast (4.5:1 minimum)
├── Alt text for images
├── Skip to content link
└── Responsive text sizing
```

## Analytics & Tracking

```
Metrics to Track:
├── Page views (v2 vs current)
├── Section engagement (Talks/Meetups/Workshops)
├── Registration click-through rate
├── Mobile vs Desktop usage
├── Scroll depth
└── Time on page
```

## Future Scalability

```mermaid
graph TD
    A[Current V2] --> B[Phase 2 Enhancements]
    B --> C[Individual Event Pages]
    B --> D[Search Functionality]
    B --> E[Calendar View]
    B --> F[Newsletter Integration]
    
    B --> G[Phase 3 Advanced]
    G --> H[User Accounts]
    G --> I[Event Registration System]
    G --> J[Payment Integration]
    G --> K[CMS Integration]
```

## Deployment Pipeline

```mermaid
graph LR
    A[Local Development] --> B[Git Commit]
    B --> C[Push to GitHub]
    C --> D[GitHub Actions]
    D --> E[Jekyll Build]
    E --> F{Build Success?}
    F -->|Yes| G[Deploy to Pages]
    F -->|No| H[Notify Developer]
    G --> I[Live Site]
```

## Browser Support Matrix

```
Fully Supported:
├── Chrome 90+
├── Firefox 88+
├── Safari 14+
├── Edge 90+
├── Mobile Safari 14+
└── Mobile Chrome 90+

Graceful Degradation:
├── IE 11 (basic functionality)
└── Older browsers (no animations)
```

## Content Management Roles

```
Role: Content Editor
├── Add new events
├── Update event status
├── Add recap links
└── Upload photos

Role: Developer
├── Update layouts
├── Add new features
├── Performance optimization
└── Bug fixes

Role: Designer
├── Visual updates
├── Brand consistency
└── UX improvements
```

---

## Quick Reference: Key URLs

- **Current Site**: https://aimusings.space
- **V2 Page**: https://aimusings.space/v2
- **Cal.com**: https://cal.com/sree.pradhip
- **Email**: spradhip@pulsarventures.io
- **YouTube**: https://www.youtube.com/@AIMusingsBuilderCommunitySnS
- **WhatsApp**: https://chat.whatsapp.com/GRydfVAJke8AKdnKHFohnS

---

## Quick Reference: Color Codes

- **Brand Purple**: `#7c3aed`
- **Light Purple**: `#8b5cf6`
- **Success Green**: `#10b981`
- **Info Blue**: `#3b82f6`
- **Warning Orange**: `#f59e0b`

---

## Quick Reference: Status Badges

- 🎤 **Upcoming Talk**
- 🤝 **Upcoming Meetup**
- 📅 **Scheduled Workshop**
- ✓ **Completed**
- ❌ **Cancelled**
- 🎯 **Special Session**

---

This architecture document provides a visual and structural overview of the V2 implementation. Use it alongside the Implementation Plan for complete project understanding.