# Publishing to GitHub Pages

Deploying **site-professional** to `https://<username>.github.io`.
The workflow at `.github/workflows/deploy.yml` builds it with Vite and publishes `dist/` on every push to `master`.

---

## 1. Create the repo on GitHub

Go to https://github.com/new and create a repo named exactly:

```
<your-github-username>.github.io
```

Example: if your username is `adityavr`, name it `adityavr.github.io`.

- Visibility: **Public** (required for Pages on free accounts)
- Do **not** add a README, .gitignore, or license (the local repo already has history)

---

## 2. Push from your machine

Open a terminal in `E:\AI\CV` and run:

```bash
git add .
git commit -m "chore: add GitHub Pages deploy workflow"
git remote add origin https://github.com/<your-username>/<your-username>.github.io.git
git push -u origin master
```

If you'd rather use `main` as the branch name:

```bash
git branch -M main
git push -u origin main
```

...then change `branches: [master]` to `branches: [main]` in `.github/workflows/deploy.yml`.

---

## 3. Enable Pages

In the repo on GitHub: **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**.

That's it. The workflow triggers on the push. Watch it under the **Actions** tab; first run takes ~1 minute.

Live at `https://<your-username>.github.io` once the deploy job goes green.

---

## Notes

**`dist/` and `node_modules/` are gitignored** — that's correct. GitHub Actions builds from source, so nothing built needs committing.

**The `shared/` folder is required.** Vite aliases `@shared` to `../shared`, so the workflow checks out the whole repo and builds from `site-professional/`. Don't move `shared/`.

**Contact form is not wired up yet.** `src/sections/contact.js` still has placeholders:

```js
emailjs.init('YOUR_EMAILJS_PUBLIC_KEY');
emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target);
```

Sign up at emailjs.com and drop in the real IDs. The EmailJS public key is safe to commit (it's client-side by design), but set domain restrictions in the EmailJS dashboard so nobody else can use your quota.

**Custom domain** (e.g. `adityavr.com`): add a `CNAME` file containing just the domain to `site-professional/public/`, then set the domain under Settings → Pages and point your DNS at GitHub.

**Publishing site-bold too:** add a second build job that outputs to `site-bold/dist`, copy it into a `bold/` subfolder of the artifact, and set `base: '/bold/'` in `site-bold/vite.config.js`. Happy to wire that up if you want it.
