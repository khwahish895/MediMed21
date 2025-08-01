# 🚀 Deployment Guide - SanjeevaniRural Med

## 📋 Prerequisites

Before deploying, ensure you have:
- [Node.js 18+](https://nodejs.org/) installed
- [Git](https://git-scm.com/) installed
- A [GitHub](https://github.com/) account
- A [Netlify](https://netlify.com/) account

## 🔧 Local Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Test Locally
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

## 🌐 Netlify Deployment

### Option 1: Deploy via GitHub (Recommended)

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - SanjeevaniRural Med"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sanjeevani-rural-med.git
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Go to [Netlify](https://netlify.com/)
   - Click "New site from Git"
   - Choose GitHub
   - Select your repository: `sanjeevani-rural-med`
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Click "Deploy site"

### Option 2: Manual Deploy

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Go to [Netlify](https://netlify.com/)
   - Drag and drop the `dist` folder to the deploy area
   - Your site will be live instantly

## ⚙️ Netlify Configuration

The project includes `netlify.toml` with optimal settings:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This ensures:
- ✅ Single Page Application routing works
- ✅ Proper Node.js version
- ✅ Security headers
- ✅ Optimized build process

## 🔄 Continuous Deployment

Once connected to GitHub, Netlify will:
- ✅ Automatically deploy on every push to `main` branch
- ✅ Provide preview deployments for pull requests
- ✅ Rollback to previous versions if needed

## 🌍 Custom Domain (Optional)

1. **Add Custom Domain**:
   - In Netlify dashboard, go to "Domain settings"
   - Click "Add custom domain"
   - Enter your domain (e.g., `sanjeevani.com`)

2. **Configure DNS**:
   - Add CNAME record pointing to your Netlify site
   - Or use Netlify DNS for automatic configuration

## 📱 Environment Variables

If you need environment variables:

1. **In Netlify Dashboard**:
   - Go to Site settings > Environment variables
   - Add any required variables

2. **Common Variables**:
   ```
   VITE_API_URL=https://your-api.com
   VITE_APP_NAME=SanjeevaniRural Med
   ```

## 🔍 Troubleshooting

### Build Failures
- Check Node.js version (should be 18+)
- Ensure all dependencies are installed
- Check for TypeScript errors: `npm run lint`

### Routing Issues
- Verify `netlify.toml` redirects are correct
- Check that all routes use React Router

### Performance Issues
- Enable Netlify's asset optimization
- Use the included build optimizations in `vite.config.ts`

## 📊 Monitoring

### Netlify Analytics
- Enable analytics in Netlify dashboard
- Monitor site performance
- Track user behavior

### Error Tracking
- Check Netlify function logs
- Monitor build logs for issues
- Set up error notifications

## 🔒 Security

The deployment includes security headers:
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

## 🚀 Post-Deployment Checklist

- [ ] Site loads correctly
- [ ] All routes work (try direct URLs)
- [ ] Images and assets load
- [ ] Forms submit properly
- [ ] Mobile responsiveness
- [ ] Performance is acceptable
- [ ] SSL certificate is active
- [ ] Custom domain works (if applicable)

## 📞 Support

If you encounter issues:
1. Check Netlify build logs
2. Verify local build works: `npm run build`
3. Check GitHub repository for issues
4. Contact support with specific error messages

---

**Your SanjeevaniRural Med application is now ready for deployment! 🎉** 