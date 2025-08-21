# Deployment Guide

This guide provides step-by-step instructions for deploying the Pulsar Ventures website to GitHub Pages.

## Prerequisites

- GitHub account
- Git installed on your local machine
- Ruby (for local development and testing)

## Initial Setup

### 1. Repository Setup

The repository is already configured with:
- Remote origin: `git@github.com:pulsarventures/pv-website.git`
- Main branch: `main`
- GitHub Actions workflow for automatic deployment

### 2. Local Development Setup

```bash
# Clone the repository
git clone git@github.com:pulsarventures/pv-website.git
cd pv-website

# Install Ruby dependencies
bundle install

# Run local server
bundle exec jekyll serve

# Visit http://localhost:4000
```

## Deployment Process

### Automatic Deployment (Recommended)

The website automatically deploys when changes are pushed to the `main` branch.

1. **Make your changes** to the codebase
2. **Commit and push** to main branch:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```
3. **Monitor deployment** in GitHub Actions tab
4. **Site will be live** in 2-5 minutes at https://pulsarventures.co

### Manual Deployment

If you need to deploy manually:

1. Go to repository Settings → Pages
2. Source: Deploy from a branch
3. Branch: gh-pages (created by GitHub Actions)
4. Save

## Custom Domain Configuration

### DNS Settings

Configure your domain provider with these records:

**A Records:**
- `185.199.108.153`
- `185.199.109.153`
- `185.199.110.153`
- `185.199.111.153`

**CNAME Record:**
- Point to: `pulsarventures.github.io`

### GitHub Pages Settings

1. Go to repository Settings → Pages
2. Custom domain: `pulsarventures.co`
3. Check "Enforce HTTPS"
4. Save

The CNAME file is already included in the repository.

## Content Management

### Adding New Blog Posts

1. Create a new file in `_posts/` with format: `YYYY-MM-DD-title.md`
2. Add front matter:
   ```yaml
   ---
   layout: post
   title: "Your Post Title"
   date: 2024-01-15
   author: "Pulsar Ventures"
   categories: [category1, category2]
   tags: [tag1, tag2]
   excerpt: "Brief description of the post"
   ---
   ```
3. Write your content in Markdown
4. Commit and push to deploy

### Adding New Pages

1. Create a new file in `_pages/` with format: `page-name.md`
2. Add front matter:
   ```yaml
   ---
   layout: page
   title: "Page Title"
   permalink: /page-name/
   description: "Page description for SEO"
   ---
   ```
3. Write your content in Markdown
4. Commit and push to deploy

### Updating Navigation

Edit `_includes/header.html` to add new navigation items.

## Configuration

### Jekyll Settings (`_config.yml`)

Key settings to modify:
- `title`: Site title
- `description`: Site description
- `url`: Site URL (https://pulsarventures.co)
- `author`: Author information
- `analytics`: Google Analytics ID

### Custom Domain

- Domain: pulsarventures.co
- CNAME file: Already included
- HTTPS: Automatically enforced by GitHub Pages

## Troubleshooting

### Common Issues

1. **Site not updating after push**
   - Check GitHub Actions tab for build status
   - Verify changes are on `main` branch
   - Wait 2-5 minutes for deployment

2. **Build errors**
   - Check GitHub Actions logs
   - Verify Jekyll syntax and front matter
   - Test locally with `bundle exec jekyll serve`

3. **Custom domain not working**
   - Check DNS settings with domain provider
   - Verify CNAME file in repository
   - Check GitHub Pages settings

4. **Local build errors**
   - Run `bundle update`
   - Check Ruby version compatibility
   - Verify all dependencies installed

### Getting Help

- Check GitHub Issues for known problems
- Review Jekyll documentation
- Contact the development team

## Security Considerations

### Environment Variables

- Never commit API keys or sensitive data
- Use GitHub Secrets for sensitive configuration
- Keep dependencies updated

### Content Security

- Validate all user inputs
- Sanitize HTML content
- Use HTTPS for all external links

## Performance Optimization

### Images

- Optimize images before uploading
- Use appropriate formats (WebP, JPEG, PNG)
- Consider lazy loading for large images

### Code

- Minify CSS and JavaScript in production
- Use CDN for external libraries
- Optimize Jekyll build process

## Monitoring

### Analytics

- Google Analytics: Add tracking ID to `_config.yml`
- Monitor page performance and user behavior
- Track conversion goals

### Uptime

- Monitor site availability
- Set up alerts for downtime
- Regular backup of content

## Backup Strategy

### Content Backup

- Repository serves as primary backup
- Regular commits ensure content safety
- Consider external backup for critical content

### Configuration Backup

- Version control for all configuration files
- Document custom settings and changes
- Backup custom domain settings

## Future Enhancements

### Planned Features

- Advanced search functionality
- Newsletter integration
- Contact form backend
- Analytics dashboard
- Content management system

### Maintenance Tasks

- Monthly dependency updates
- Quarterly security reviews
- Annual content audits
- Performance optimization reviews

---

**Last Updated**: January 2024  
**Maintained by**: Pulsar Ventures Development Team
