# CV Portfolio Launch Checklist

This document outlines the configuration and content steps needed before deploying the two CV portfolio sites.

## Sites Overview

- **site-professional/** — Professional theme (navy/teal, GSAP + Three.js particle network)
- **site-bold/** — Bold cyberpunk theme (black/green, GSAP + Three.js threat globe)

Both sites share the same CV data module (`shared/cv-data.js`) and are built with Vite.

---

## Pre-Launch Configuration

### 1. EmailJS Configuration

Both contact forms use EmailJS for email delivery. Before launching:

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Set up an email service (Gmail, Outlook, or custom SMTP)
3. Create an email template with the following form fields:
   - `from_name` — sender's name
   - `reply_to` — sender's email address
   - `message` — message body
4. Copy your credentials:
   - **Public Key** (from Account Settings)
   - **Service ID** (from Email Services)
   - **Template ID** (from Email Templates)

5. Update both contact form files:
   - `site-professional/src/sections/contact.js` — Line 33 and 41
   - `site-bold/src/sections/contact.js` — Line 33 and 41

Replace the placeholders:
```javascript
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');  // Line 33
await emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target);  // Line 41
```

### 2. CV Content Updates

All portfolio content comes from `shared/cv-data.js`. Update the following:

- **LinkedIn URL** — `cv.contact.linkedin`
- **Projects** — `cv.projects` array (title, description, tech tags, links)
- **Blog/Articles** — `cv.blog` array (title, description, date, link)
- **Experience** — Already populated with sample data; update as needed
- **Skills & Certifications** — Already populated; customize as needed

### 3. Profile Photo

1. Prepare a professional headshot (recommend 400x400px minimum)
2. Save as `profile.jpg` or `profile.png` in:
   - `site-professional/public/profile.jpg`
   - `site-bold/public/profile.jpg`
3. Update the CSS class `.avatar-placeholder` in both `src/sections/about.js` to use the image:
   ```javascript
   // Change from:
   // <div class="avatar-placeholder">AV</div>
   // To:
   // <img src="/profile.jpg" alt="Aditya Vignesh Ram" class="avatar-image" />
   ```

### 4. CV PDF

The CV PDF file is located at `public/Aditya_Vignesh_Ram_CV.pdf` in both sites. This was added during the build verification pass.

---

## Deployment Steps

### Local Testing

```bash
# Test site-professional
cd site-professional
npm install
npm run dev
# Open http://localhost:5173

# Test site-bold (in another terminal)
cd site-bold
npm install
npm run dev
# Open http://localhost:5174
```

### Build for Production

```bash
# Build both sites
cd site-professional && npm run build
cd ../site-bold && npm run build
```

Both sites produce optimized `dist/` folders ready for deployment.

### Deploy to Netlify or Vercel

1. Connect your GitHub repository to Netlify/Vercel
2. Set build command: `npm run build` (build happens in each site directory)
3. Set publish directory: `dist/`
4. For monorepo structure, you may need to configure each site separately:
   - **site-professional** — Base directory: `site-professional/`
   - **site-bold** — Base directory: `site-bold/`

---

## Build Information

### site-professional
- **Build Output**: `dist/index.html` + CSS/JS bundles
- **Module Count**: 41 modules
- **Size**: ~609 KB (minified), ~172 KB (gzipped)
- **Build Time**: ~2s

### site-bold
- **Build Output**: `dist/index.html` + CSS/JS bundles
- **Module Count**: 39 modules
- **Size**: ~617 KB (minified), ~173 KB (gzipped)
- **Build Time**: ~2s

**Note**: The chunk size warning from Three.js and GSAP is expected and not an error. The bundles are optimized and deploy successfully.

---

## Quick Reference

| Item | File Location | Status |
|------|--------------|--------|
| CV Data | `shared/cv-data.js` | ✓ Ready (update content) |
| EmailJS Keys | `site-*/src/sections/contact.js` | ⚠️ Needs configuration |
| Profile Photo | `site-*/public/profile.jpg` | ⚠️ Needs to be added |
| CV PDF | `site-*/public/Aditya_Vignesh_Ram_CV.pdf` | ✓ Added |
| .gitignore | `site-*/.gitignore` | ✓ Created |
| Meta Descriptions | `site-*/index.html` | ✓ Added |

---

## Support

For questions about deployment or configuration:
- EmailJS Help: https://www.emailjs.com/docs/
- Vite Build Guide: https://vitejs.dev/guide/build.html
- Three.js Examples: https://threejs.org/examples/
- GSAP Documentation: https://gsap.com/docs/
