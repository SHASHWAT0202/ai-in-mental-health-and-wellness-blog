# 🚀 Deployment Guide for AI Mental Health Blog

## Quick Deploy to Vercel (Recommended)

### Option 1: Deploy from GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: AI Mental Health Blog"
   git branch -M main
   git remote add origin https://github.com/yourusername/ai-mental-health-blog.git
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Click "Deploy"
   - Your site will be live in ~30 seconds!

### Option 2: Deploy with Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd "ai in mental health and wellness blog"
   vercel
   ```

3. **Follow the prompts:**
   - Link to existing project? No
   - What's your project's name? ai-mental-health-blog
   - In which directory is your code located? ./
   - Want to modify settings? No

## Alternative Deployment Options

### Netlify
1. Drag and drop the folder to [netlify.com/drop](https://netlify.com/drop)
2. Or connect your GitHub repository

### GitHub Pages
1. Push to GitHub
2. Go to Settings > Pages
3. Select source: Deploy from a branch
4. Choose main branch
5. Your site will be available at `username.github.io/repository-name`

### Local Development

```bash
# Using Python (if you have Python installed)
python -m http.server 8000

# Using Node.js serve package
npx serve .

# Using PHP (if you have PHP installed)
php -S localhost:8000
```

Then open `http://localhost:8000` in your browser.

## Post-Deployment Checklist

### 1. Update URLs
After deployment, update these files with your actual domain:

**vercel.json** - Update domain references
**sitemap.xml** - Replace `https://your-domain.vercel.app/` with your actual URL
**index.html** - Update canonical URL and Open Graph URLs
**robots.txt** - Update sitemap URL

### 2. Configure Custom Domain (Optional)
In Vercel dashboard:
1. Go to your project
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### 3. Set up Analytics (Optional)
Add Google Analytics or Vercel Analytics:

**Google Analytics:**
```html
<!-- Add before closing </head> tag -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_TRACKING_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_TRACKING_ID');
</script>
```

**Vercel Analytics:**
- Enable in Vercel dashboard under Analytics tab

### 4. SEO Optimization
- Submit sitemap to Google Search Console
- Submit sitemap to Bing Webmaster Tools
- Set up social media profiles mentioned in the footer
- Consider adding a blog RSS feed

### 5. Performance Monitoring
- Check Lighthouse scores
- Monitor Core Web Vitals
- Set up uptime monitoring

## Environment Variables (if needed)

If you add any API integrations later, set environment variables in Vercel:
1. Go to project dashboard
2. Click "Settings"
3. Click "Environment Variables"
4. Add your variables

## Troubleshooting

### Common Issues:

**Build Fails:**
- Check that all files are properly committed
- Ensure vercel.json syntax is correct

**Assets Not Loading:**
- Check file paths are correct
- Ensure all files are in the repository

**Styles Not Working:**
- Verify CSS file paths
- Check for syntax errors in CSS

**Mobile Issues:**
- Test on actual devices
- Use browser dev tools mobile simulator

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify all files are included in your repository
3. Test locally first
4. Check browser console for errors

## Updates

To update your deployed site:
1. Make changes locally
2. Commit and push to GitHub
3. Vercel will automatically redeploy

---

**Your AI Mental Health Blog is ready to inspire the world! 🧠✨**