# CSJ Official Website

Chuan San Jia Hardware (CSJ) - jewelry-led zipper hardware manufacturer.
A 6-page static marketing site for overseas B2B clients, built with pure HTML/CSS/JS (no build tools).

## Quick Start

### Requirements

- None for viewing; any static file server for local preview (Python 3 built-in works)

### Run Locally

```bash
cd website
python3 -m http.server 8080
# open http://localhost:8080
```

## Structure

```
website/
├── index.html              # Home
├── collections.html        # Product collections
├── creative-services.html  # Creative process & designer
├── manufacturing.html      # Capabilities, stats, certs
├── about.html              # Company & designer story
├── contact.html            # Inquiry form & contact info
├── css/style.css           # Global design system
├── js/main.js              # Nav toggle, scroll reveal, form placeholder
├── images/                 # AI-generated placeholder hero images
├── sitemap.xml             # Update domain after purchase
└── robots.txt              # Update domain after purchase
```

## Deploy to Cloudflare Pages

Option A - Drag & drop: Workers & Pages > Create > Drag and drop the `website` folder.
Option B - Git: push this folder to a GitHub repo, then Pages > Connect to Git (no build command, no output directory).

## TODO Before Launch

- [ ] Replace AI placeholder hero images with real photography
- [ ] Replace product grid placeholders with real product photos (6 pieces, CSJ-01 to CSJ-06)
- [ ] Fill real factory address, email, WhatsApp in contact.html
- [ ] Confirm real stats (tolerance, capacity, molds, lead time) in manufacturing.html
- [ ] Buy domain, update sitemap.xml / robots.txt / canonical references
- [ ] Connect inquiry form to a Cloudflare Worker (email forwarding)
- [ ] Add real favicon + logo (transparent PNG/SVG)

## Design System

- Fonts: Jost (light sans, wide tracking) + Cormorant Garamond (serif quotes) via Google Fonts
- Colors: #FFFFFF background, #2A2A2A ink, #1B3F8F royal blue accent (small elements only)
- Language of record: English (target audience: overseas fashion brands)
