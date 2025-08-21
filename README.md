# Pulsar Ventures Website

A modern, responsive website for Pulsar Ventures built with Jekyll and deployed on GitHub Pages.

## 🚀 Quick Start

### Prerequisites
- Git
- Ruby (for local development)
- GitHub account

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone git@github.com:pulsarventures/pv-website.git
   cd pv-website
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Run local server**
   ```bash
   bundle exec jekyll serve
   ```

4. **Visit the site**
   Open http://localhost:4000 in your browser

### Deployment

The website automatically deploys to GitHub Pages when changes are pushed to the `main` branch.

- **Live Site**: https://pulsarventures.co
- **GitHub Pages**: https://pulsarventures.github.io/pv-website

## 📁 Project Structure

```
pv-website/
├── _config.yml                 # Jekyll configuration
├── _layouts/                   # Page layouts
├── _includes/                  # Reusable components
├── _posts/                     # Blog posts
├── _pages/                     # Static pages
├── assets/                     # Static assets (CSS, JS, images)
├── _sass/                      # SCSS styles
├── index.html                  # Homepage
├── 404.html                    # Custom 404 page
├── .github/                    # GitHub Actions
├── Gemfile                     # Ruby dependencies
└── CNAME                       # Custom domain
```

## 🎨 Content Management

### Adding New Blog Posts

1. Create a new file in `_posts/` with the format: `YYYY-MM-DD-title.md`
2. Add front matter:
   ```yaml
   ---
   layout: post
   title: "Your Post Title"
   date: 2024-01-15
   categories: [blog]
   tags: [ai, business, technology]
   ---
   ```
3. Write your content in Markdown
4. Commit and push to deploy

### Adding New Pages

1. Create a new file in `_pages/` with the format: `page-name.md`
2. Add front matter:
   ```yaml
   ---
   layout: page
   title: "Page Title"
   permalink: /page-name/
   ---
   ```
3. Write your content in Markdown
4. Commit and push to deploy

### Updating Navigation

Edit `_includes/header.html` to add new navigation items.

## 🛠️ Customization

### Styling
- Main styles: `assets/css/main.scss`
- Bootstrap 5 is included for responsive design
- Custom variables defined in SCSS

### Layouts
- `_layouts/default.html`: Base layout for all pages
- `_layouts/page.html`: Layout for static pages
- `_layouts/post.html`: Layout for blog posts

### Components
- `_includes/head.html`: Meta tags and CSS includes
- `_includes/header.html`: Navigation
- `_includes/footer.html`: Footer content

## 🔧 Configuration

### Jekyll Settings (`_config.yml`)
- Site title and description
- URL configuration
- Plugin settings
- Collection definitions

### Custom Domain
- Domain: pulsarventures.co
- CNAME file included in repository
- DNS configured for GitHub Pages

## 🚀 Deployment

### Automatic Deployment
- GitHub Actions workflow: `.github/workflows/deploy.yml`
- Triggers on push to `main` branch
- Builds and deploys to GitHub Pages

### Manual Deployment
1. Push changes to `main` branch
2. GitHub Actions will automatically build and deploy
3. Site will be live in 2-5 minutes

## 📝 Content Guidelines

### Writing Blog Posts
- Use clear, engaging titles
- Include relevant tags and categories
- Add meta descriptions for SEO
- Use images when appropriate

### Page Content
- Keep content concise and scannable
- Use headings for structure
- Include call-to-action buttons
- Optimize for mobile reading

## 🔍 SEO

- Meta tags automatically generated
- Sitemap automatically created
- Open Graph tags for social sharing
- Structured data for search engines

## 🐛 Troubleshooting

### Common Issues

1. **Site not updating after push**
   - Check GitHub Actions tab for build status
   - Verify changes are on `main` branch
   - Wait 2-5 minutes for deployment

2. **Local build errors**
   - Run `bundle update`
   - Check Ruby version compatibility
   - Verify all dependencies installed

3. **Custom domain not working**
   - Check DNS settings
   - Verify CNAME file in repository
   - Contact domain provider if needed

### Getting Help
- Check GitHub Issues for known problems
- Review Jekyll documentation
- Contact the development team

## 📄 License

This project is proprietary to Pulsar Ventures.

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test locally
4. Submit a pull request
5. Wait for review and merge

---

**Built with ❤️ by Pulsar Ventures**
