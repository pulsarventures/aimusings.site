# Contact Configuration Guide

This document explains how to manage contact information centrally in the Pulsar Ventures website.

## Centralized Contact Information

All contact information is now managed centrally in `_config.yml` under the `contact` section:

```yaml
contact:
  email: "spradhip@pulsarventures.io"
  calendly: "https://calendly.com/spradhip"
  linkedin: "https://www.linkedin.com/company/pulsar-ventures-llc"
  office_hours:
    weekdays: "9:00 AM - 6:00 PM (EST)"
    weekends: "By appointment"
    virtual: "Available worldwide"
```

## How to Use

### In Jekyll Templates and Pages

Use these variables in your templates and pages:

- **Email**: `{{ site.contact.email }}`
- **Calendly**: `{{ site.contact.calendly }}`
- **LinkedIn**: `{{ site.contact.linkedin }}`
- **Office Hours**: 
  - `{{ site.contact.office_hours.weekdays }}`
  - `{{ site.contact.office_hours.weekends }}`
  - `{{ site.contact.office_hours.virtual }}`

### Examples

#### Email Link
```html
<a href="mailto:{{ site.contact.email }}">Send us an Email</a>
```

#### Calendly Link
```html
<a href="{{ site.contact.calendly }}" target="_blank">Schedule a Call</a>
```

#### LinkedIn Link
```html
<a href="{{ site.contact.linkedin }}" target="_blank">Connect on LinkedIn</a>
```

#### Office Hours in Content
```markdown
**Office Hours:**
- Monday - Friday: {{ site.contact.office_hours.weekdays }}
- Weekends: {{ site.contact.office_hours.weekends }}
- Virtual Meetings: {{ site.contact.office_hours.virtual }}
```

## Benefits

1. **Single Source of Truth**: All contact information is managed in one place
2. **Easy Updates**: Change contact details once and it updates everywhere
3. **Consistency**: Ensures all pages show the same contact information
4. **Maintainability**: Future developers can easily find and update contact details

## Files Updated

The following files now use centralized contact information:

- `_includes/footer.html` - Footer navigation links
- `_pages/contact.md` - Contact page information
- `index.html` - Homepage call-to-action buttons
- `_pages/about.md` - About page contact links
- `_pages/blog.md` - Blog page social links
- `_posts/2024-01-15-welcome-to-pulsar-ventures.md` - Blog post contact information

## Adding New Contact Information

To add new contact information:

1. Add the new field to the `contact` section in `_config.yml`
2. Update templates and pages to use the new variable
3. Test the changes locally before pushing

## Example: Adding a Phone Number

1. Add to `_config.yml`:
```yaml
contact:
  email: "spradhip@pulsarventures.io"
  calendly: "https://calendly.com/spradhip"
  linkedin: "https://www.linkedin.com/company/pulsar-ventures-llc"
  phone: "+1-555-123-4567"  # New field
  office_hours:
    weekdays: "9:00 AM - 6:00 PM (EST)"
    weekends: "By appointment"
    virtual: "Available worldwide"
```

2. Use in templates:
```html
<a href="tel:{{ site.contact.phone }}">{{ site.contact.phone }}</a>
```

---

**Last Updated**: January 2024  
**Maintained by**: Pulsar Ventures Development Team
