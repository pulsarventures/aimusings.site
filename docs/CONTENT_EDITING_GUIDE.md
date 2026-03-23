# AI Musings V2 - Content Editing Guide

## Overview

This guide explains how to add and update content on the AI Musings V2 website. All event data is stored in YAML files, making it easy to add new events without touching HTML code.

---

## Quick Start

### Location of Data Files
All event data is stored in the `_data/` directory:
- `_data/talks.yml` - All talk events
- `_data/meetups.yml` - All meetup events
- `_data/workshops.yml` - All workshop events

### Basic YAML Syntax
```yaml
- name: "Event Name"
  field1: "value1"
  field2: "value2"
```

**Important Rules:**
- Use 2 spaces for indentation (not tabs)
- Put text values in quotes
- Lists start with a dash (-)
- Nested items are indented

---

## Adding a New Talk

### Step 1: Open the File
Open `_data/talks.yml` in your text editor

### Step 2: Copy the Template
```yaml
- name: "Talk Title"
  date: "2026-04-15"
  dates: "April 15, 2026"
  status: "upcoming"
  location: "Virtual / City, Venue"
  description: "Brief description of the talk"
  speakers:
    - "Speaker Name 1"
    - "Speaker Name 2"
  registration_link: "https://..."
  recap_links:
    - url: "https://linkedin.com/..."
      type: "LinkedIn Post"
      icon: "fab fa-linkedin"
```

### Step 3: Fill in Your Details
```yaml
- name: "AI in Healthcare: Practical Applications"
  date: "2026-06-20"
  dates: "June 20, 2026"
  status: "upcoming"
  location: "Boston, MA - Tech Hub"
  description: "Exploring AI applications in healthcare industry"
  speakers:
    - "Dr. Jane Smith"
    - "Sree Pradhip"
  registration_link: "https://eventbrite.com/..."
  recap_links: []
```

### Step 4: Save and Commit
1. Save the file
2. Commit to Git: `git add _data/talks.yml`
3. Commit: `git commit -m "Add new talk: AI in Healthcare"`
4. Push: `git push`

### Field Descriptions

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `name` | Yes | Talk title | "AI in Business" |
| `date` | Yes | ISO date for sorting | "2026-06-20" |
| `dates` | Yes | Human-readable date | "June 20, 2026" |
| `status` | Yes | Event status | "upcoming", "completed", "cancelled" |
| `location` | No | Where the talk is held | "Virtual" or "Atlanta, GA" |
| `description` | No | Brief description | "Exploring AI trends..." |
| `speakers` | No | List of speakers | See template |
| `registration_link` | No | Registration URL | "https://..." |
| `recap_links` | No | Post-event links | See template |

---

## Adding a New Meetup

### Step 1: Open the File
Open `_data/meetups.yml` in your text editor

### Step 2: Copy the Template
```yaml
- name: "Meetup Title"
  date: "2026-05-20"
  dates: "May 20, 2026"
  status: "upcoming"
  location: "City, Venue"
  description: "Brief description of the meetup"
  attendees: 25
  registration_link: "https://..."
  recap_links:
    - url: "https://linkedin.com/..."
      type: "Event Recap"
      icon: "fab fa-linkedin"
```

### Step 3: Fill in Your Details
```yaml
- name: "AI Builders Summer Meetup"
  date: "2026-07-15"
  dates: "July 15, 2026"
  status: "upcoming"
  location: "Atlanta, GA - Ponce City Market"
  description: "Summer networking event for AI enthusiasts"
  attendees: 40
  registration_link: "https://meetup.com/..."
  recap_links: []
```

### Field Descriptions

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `name` | Yes | Meetup title | "AI Builders Meetup" |
| `date` | Yes | ISO date for sorting | "2026-07-15" |
| `dates` | Yes | Human-readable date | "July 15, 2026" |
| `status` | Yes | Event status | "upcoming", "completed", "cancelled" |
| `location` | Yes | Venue details | "Atlanta, GA - Tech Square" |
| `description` | No | Brief description | "Networking event..." |
| `attendees` | No | Expected/actual count | 25 |
| `registration_link` | No | Registration URL | "https://..." |
| `recap_links` | No | Post-event links | See template |

---

## Adding a New Workshop

### Step 1: Open the File
Open `_data/workshops.yml` in your text editor

### Step 2: Choose the Level
- **Level 100**: Beginner intro workshops
- **Level 200**: Builder Series workshops
- **Level 300**: Advanced platform-specific workshops

### Step 3: Copy the Appropriate Template

#### Level 100 Template
```yaml
- name: "Workshop Title"
  level: 100
  level_name: "Beginner Intro"
  series: "Intro Series - 1"
  date: "2026-05-05"
  dates: "May 5, 2026"
  status: "upcoming"
  format: "Virtual on Zoom"
  duration: "3 hours"
  description: "Workshop description"
  topics:
    - "Topic 1"
    - "Topic 2"
  registration_link: "https://..."
  recap_links: []
```

#### Level 200 Template
```yaml
- name: "AI Builder: Builder Series - 10"
  level: 200
  level_name: "Builder Series"
  series: "Builder Series - 10"
  date: "2026-06-15"
  dates: "June 15 & 18, 2026"
  status: "scheduled"
  format: "Virtual on Zoom"
  duration: "2 sessions"
  description: "Hands-on AI workshop"
  topics:
    - "AI Fundamentals"
    - "Tool Mastery"
    - "Prototype Building"
    - "AI Agents"
  tools:
    - "ChatGPT"
    - "Claude"
    - "Cursor"
  registration_link: "https://..."
  recap_links: []
```

#### Level 300 Template
```yaml
- name: "Platform Deep Dive"
  level: 300
  level_name: "Advanced Deep Dive"
  series: "Platform Series - 1"
  platform: "Platform Name"
  date: "2026-07-20"
  dates: "July 20, 2026"
  status: "upcoming"
  format: "Virtual on Zoom"
  duration: "Single session"
  description: "Deep dive into platform"
  topics:
    - "Advanced Topic 1"
    - "Advanced Topic 2"
  registration_link: "https://..."
  recap_links: []
```

### Field Descriptions

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `name` | Yes | Workshop name | "AI Fundamentals" |
| `level` | Yes | Workshop level | 100, 200, or 300 |
| `level_name` | Yes | Level description | "Beginner Intro" |
| `series` | Yes | Series identifier | "Builder Series - 10" |
| `platform` | 300 only | Platform name | "Anthropic Claude" |
| `date` | Yes | ISO date for sorting | "2026-06-15" |
| `dates` | Yes | Human-readable date | "June 15 & 18, 2026" |
| `status` | Yes | Event status | "scheduled", "completed", "upcoming" |
| `format` | Yes | Delivery format | "Virtual on Zoom" |
| `duration` | Yes | Time commitment | "2 sessions" |
| `description` | Yes | Workshop description | "Hands-on..." |
| `topics` | No | List of topics | See template |
| `tools` | No | List of tools covered | See template |
| `registration_link` | No | Registration URL | "https://..." |
| `recap_links` | No | Post-event links | See template |

---

## Adding Recap Links

After an event is completed, add recap links to share photos, videos, and posts.

### Step 1: Update Status
Change the status from "upcoming" to "completed":
```yaml
status: "completed"
```

### Step 2: Add Recap Links
```yaml
recap_links:
  - url: "https://www.linkedin.com/posts/..."
    type: "Workshop Recap"
    icon: "fab fa-linkedin"
  - url: "https://youtube.com/..."
    type: "Video Recording"
    icon: "fab fa-youtube"
  - url: "https://photos.google.com/..."
    type: "Photo Gallery"
    icon: "fas fa-images"
```

### Common Icon Options
- LinkedIn: `fab fa-linkedin`
- YouTube: `fab fa-youtube`
- Photos: `fas fa-images`
- Blog Post: `fas fa-blog`
- PDF: `fas fa-file-pdf`

---

## Status Values

Use these exact values for the `status` field:

### For Talks and Meetups
- `upcoming` - Event is scheduled and open for registration
- `completed` - Event has finished
- `cancelled` - Event was cancelled

### For Workshops
- `upcoming` - Event is announced but not yet open for registration
- `scheduled` - Event is open for registration
- `completed` - Event has finished

---

## Common Tasks

### Task 1: Update Event from Upcoming to Completed

1. Find the event in the appropriate YAML file
2. Change `status: "upcoming"` to `status: "completed"`
3. Add recap links (see above)
4. Save, commit, and push

### Task 2: Add Registration Link

1. Find the event in the YAML file
2. Update the `registration_link` field:
```yaml
registration_link: "https://eventbrite.com/your-event"
```
3. Save, commit, and push

### Task 3: Cancel an Event

1. Find the event in the YAML file
2. Change status to `cancelled`:
```yaml
status: "cancelled"
```
3. Optionally, remove the registration link
4. Save, commit, and push

---

## Troubleshooting

### Problem: Site won't build after my changes

**Solution**: Check for YAML syntax errors
- Ensure proper indentation (2 spaces)
- Check that all quotes are closed
- Verify no tabs are used (use spaces)
- Use a YAML validator: https://www.yamllint.com/

### Problem: Events appear in wrong order

**Solution**: Check the `date` field
- Must be in ISO format: `YYYY-MM-DD`
- Example: `2026-06-15` not `06/15/2026`

### Problem: Links don't work

**Solution**: Check URL format
- Must include `https://` or `http://`
- Example: `https://linkedin.com/...` not `linkedin.com/...`

### Problem: Special characters display incorrectly

**Solution**: Use quotes around text with special characters
```yaml
name: "AI & Machine Learning: A Deep Dive"
description: "Learn about AI's impact on business"
```

---

## Best Practices

### 1. Always Test Locally First
```bash
bundle exec jekyll serve
```
Then visit `http://localhost:4000/v2` to preview changes

### 2. Use Descriptive Commit Messages
```bash
git commit -m "Add Builder Series 10 workshop"
git commit -m "Update Claude Series 1 with recap links"
git commit -m "Mark February meetup as completed"
```

### 3. Keep Descriptions Concise
- Talks: 1-2 sentences
- Meetups: 1-2 sentences
- Workshops: 2-3 sentences

### 4. Update Regularly
- Add new events as soon as they're scheduled
- Update status when events complete
- Add recap links within 1 week of event

### 5. Maintain Consistency
- Use consistent date formats
- Use consistent location formats
- Use consistent capitalization

---

## File Locations Quick Reference

```
aimusings.site/
├── _data/
│   ├── talks.yml          ← Edit talks here
│   ├── meetups.yml        ← Edit meetups here
│   └── workshops.yml      ← Edit workshops here
├── v2.html                ← Main V2 page (don't edit)
└── _layouts/
    └── landing-v2.html    ← Layout file (don't edit)
```

---

## Getting Help

### Resources
- **YAML Syntax**: https://yaml.org/
- **YAML Validator**: https://www.yamllint.com/
- **Jekyll Documentation**: https://jekyllrb.com/docs/

### Contact
- **Email**: spradhip@pulsarventures.io
- **Schedule Call**: https://cal.com/sree.pradhip

---

## Example: Complete Workflow

### Adding a New Workshop

1. **Open file**: `_data/workshops.yml`

2. **Add new entry** at the top of the appropriate level section:
```yaml
- name: "AI Builder: Builder Series - 10"
  level: 200
  level_name: "Builder Series"
  series: "Builder Series - 10"
  date: "2026-06-15"
  dates: "June 15 & 18, 2026"
  status: "scheduled"
  format: "Virtual on Zoom"
  duration: "2 sessions"
  description: "Hands-on AI workshop - Learn, Build, Apply"
  topics:
    - "AI Fundamentals & Mechanics"
    - "AI Tools Deep Dive"
    - "Build Your First Prototype"
    - "Build Your First AI Agent"
  tools:
    - "ChatGPT"
    - "Claude"
    - "Cursor"
  registration_link: "https://tixtree.com/e/builder-series-10"
  recap_links: []
```

3. **Save the file**

4. **Test locally**:
```bash
bundle exec jekyll serve
```

5. **Commit and push**:
```bash
git add _data/workshops.yml
git commit -m "Add Builder Series 10 workshop for June 2026"
git push
```

6. **Verify live site**: Visit https://aimusings.space/v2

---

## Checklist for New Events

- [ ] Event added to correct YAML file
- [ ] All required fields filled in
- [ ] Date in ISO format (YYYY-MM-DD)
- [ ] Status set correctly
- [ ] Registration link added (if available)
- [ ] Description is clear and concise
- [ ] File saved
- [ ] Changes tested locally
- [ ] Changes committed with descriptive message
- [ ] Changes pushed to GitHub
- [ ] Live site verified

---

**Last Updated**: 2026-03-23  
**Version**: 1.0