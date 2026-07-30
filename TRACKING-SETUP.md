# Visitor tracking + private /track dashboard

Visitor counting is done by [GoatCounter](https://www.goatcounter.com) (free, cookieless,
privacy-friendly, no consent banner needed). The private dashboard lives at
**avrgk.com/track/** and shows pageviews over time, top pages, referrers, countries,
browsers, and operating systems.

## How the security works

GitHub Pages is static and the repo is public, so no plaintext secret can ever be
committed. Instead:

- The GoatCounter API token is committed only as **AES-256-GCM ciphertext**
  (`site-d/public/track/config.json`).
- Your dashboard password derives the decryption key in the browser via
  **PBKDF2-SHA256 with 600,000 iterations**. Wrong password = decryption fails.
- The decrypted token lives in JS memory only. It is never written to
  localStorage, cookies, or the repo. The password itself is stored nowhere.
- `/track` is disallowed in `robots.txt` and the page carries a
  `noindex, nofollow, noarchive` meta tag.
- The API token you create is scoped to **read statistics only**, so even a
  cracked password can't modify or delete anything.

Because the ciphertext is public, someone could brute-force guesses offline.
Use a long passphrase (4+ random words). The 600k PBKDF2 iterations make each
guess slow.

## One-time setup (about 5 minutes)

1. **Create a GoatCounter account** at https://www.goatcounter.com/signup.
   Pick the site code `avrgk` (this gives you `avrgk.goatcounter.com`).
   If you pick a different code, also update it in `site-d/index.html`
   (the `data-goatcounter` attribute at the bottom).

2. **Create an API token**: GoatCounter → Settings (top-right menu) → API →
   New token. Tick **only** "Read statistics". Copy the token.

3. **Generate the encrypted config**: open `track-setup.html` (repo root) by
   double-clicking it. It runs entirely offline in your browser. Enter site
   code, token, and your chosen password. Click Generate, then Download.

4. **Replace the placeholder**: save the downloaded file as
   `site-d/public/track/config.json` (overwrite the placeholder).

5. **Commit and push**:
   ```
   git add site-d TRACKING-SETUP.md track-setup.html
   git commit -m "feat: add visitor tracking and private /track dashboard"
   git push
   ```

6. After the Pages deploy goes green, counting starts on the next visit.
   Open **https://avrgk.com/track/** and unlock with your password.

## Changing the password or token

Re-run `track-setup.html` with the new password and/or a fresh token, replace
`config.json`, commit, push. To revoke access entirely, delete the token in
GoatCounter settings — the committed ciphertext becomes useless.

## Notes

- Stats appear from the moment the tracker goes live (GoatCounter has no
  historical backfill).
- The dashboard queries the GoatCounter API directly from your browser;
  data never passes through any other server.
- `/track` itself has no GoatCounter script, so your own dashboard visits
  aren't counted. GoatCounter also ignores localhost by default, so local
  dev doesn't pollute the numbers.
- The footer line on the main site was updated from "No tracking, no cookies"
  to "Anonymous view counts, no cookies" to stay honest.
