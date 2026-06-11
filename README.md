# GradPlan Copy

A personal learning project — a static clone of the BYU Idaho GradPlan **My Plan** screen.

## Run locally

Open `index.html` in your browser, or:

```bash
open index.html
```

## Custom domain: `mygradplan.app`

Recommended domain for this project. Short, clear, and easy to remember. You can swap it for any name you buy — just edit the `CNAME` file to match.

### Step 1 — Buy the domain

Register **mygradplan.app** (or your preferred name) at a registrar such as:

- [Namecheap](https://www.namecheap.com)
- [Google Domains / Squarespace](https://domains.google)
- [Cloudflare Registrar](https://www.cloudflare.com/products/registrar/)

Typical cost: about $10–20/year for `.app` or `.com`.

### Step 2 — Enable GitHub Pages

1. Open [github.com/she21020-dotcom/GradPlan_copy/settings/pages](https://github.com/she21020-dotcom/GradPlan_copy/settings/pages)
2. Under **Build and deployment** → **Source**, choose **Deploy from a branch**
3. Branch: **main**, folder: **/ (root)**
4. Save

Your site will be live at:

`https://she21020-dotcom.github.io/GradPlan_copy/`

### Step 3 — Add the custom domain in GitHub

1. On the same **Pages** settings page, under **Custom domain**, enter: `mygradplan.app`
2. Click **Save**
3. Wait for the DNS check (can take a few minutes up to 24 hours)
4. Enable **Enforce HTTPS** once the certificate is ready

The `CNAME` file in this repo tells GitHub which domain to use. Keep it in sync with what you enter in Settings.

### Step 4 — Configure DNS at your registrar

Use **one** of these setups.

#### Option A — Apex domain (`mygradplan.app`) — recommended

Add **four A records** pointing to GitHub Pages:

| Type | Host / Name | Value           |
|------|-------------|-----------------|
| A    | `@`         | `185.199.108.153` |
| A    | `@`         | `185.199.109.153` |
| A    | `@`         | `185.199.110.153` |
| A    | `@`         | `185.199.111.153` |

Optionally add **www** as well:

| Type  | Host / Name | Value                        |
|-------|-------------|------------------------------|
| CNAME | `www`       | `she21020-dotcom.github.io`  |

#### Option B — Subdomain only (`www.mygradplan.app`)

| Type  | Host / Name | Value                        |
|-------|-------------|------------------------------|
| CNAME | `www`       | `she21020-dotcom.github.io`  |

Then set the custom domain in GitHub to `www.mygradplan.app` and update `CNAME` to match.

### Step 5 — Verify

After DNS propagates (usually 5–30 minutes, sometimes up to 48 hours):

- Visit `https://mygradplan.app`
- Confirm the padlock (HTTPS) appears in the browser

Check DNS propagation: [dnschecker.org](https://dnschecker.org)

---

## Using a different domain name

1. Buy your domain
2. Change the single line in `CNAME` to your domain (e.g. `planmydegree.dev`)
3. Enter the same domain in GitHub Pages → Custom domain
4. Point DNS using the records above (replace `mygradplan.app` with your domain)

### Other name ideas

| Domain              | Notes                          |
|---------------------|--------------------------------|
| `planmydegree.dev`  | Good for a dev/learning project |
| `gradplan-tracker.com` | Very descriptive            |
| `mydegreeplan.app`  | Alternative to mygradplan.app  |
| `shelleygradplan.com` | Personal / portfolio style   |

---

## Project files

| File         | Purpose                                      |
|--------------|----------------------------------------------|
| `index.html` | My Plan layout and sample course data        |
| `styles.css` | Layout, colors, and responsive styles        |
| `app.js`     | Year accordion and sidebar tab interactivity |
| `CNAME`      | Custom domain for GitHub Pages               |
