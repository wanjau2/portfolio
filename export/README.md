# Eugene Wanjau — portfolio

Static one-page portfolio. No build step, no dependencies.

## Files

- `index.html` — the page
- `styles.css` — design tokens (Industry system) + page layout
- `assets/` — downloadable CVs

## Deploy

Any static host. Netlify: drag the folder in, or connect this repo with no build
command and the repo root as the publish directory.

## TODO before publishing

1. Add a `Verify` link to each row in the Certifications table (`index.html`)
   as credential URLs become available.
2. Add the live URL and repo link for each project (`search TODO` in the
   projects section — commented markup is in place).
3. Add PDF versions of the CVs to `assets/` and point the download links at them.
4. Update `<link rel="canonical">` and the `og:url` / `url` values if the site
   lives somewhere other than https://wanjau.tech/.
