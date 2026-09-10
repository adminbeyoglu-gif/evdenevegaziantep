# 🔍 evdenevegaziantep.com — Site Audit Report

**Site:** Beyoğlu Evden Eve Nakliyat (Gaziantep)  
**Date:** 2026-09-10  
**Pages audited:** 51 HTML pages + sitemap, robots.txt, _headers, _redirects  
**Total size:** 3.4 MB (excl. .git) | Images: ~1 MB (11 JPG files)

---

## ✅ Strengths — What's Done Well

### SEO (Very Good)
| Item | Status |
|------|--------|
| Unique `<title>` per page | ✅ All 51 pages |
| Unique meta description per page | ✅ |
| Canonical URLs on all pages | ✅ |
| Open Graph + Twitter Card tags | ✅ Complete set |
| XML Sitemap with image extensions | ✅ 47 URLs, proper priorities |
| `robots.txt` with Sitemap directive | ✅ |
| Semantic heading hierarchy (H1→H2→H3) | ✅ Single H1 per page |
| Geo meta tags (region, position) | ✅ TR-27 / Gaziantep |

### Structured Data — JSON-LD (Excellent)
The homepage includes **5 schema types**:
1. **MovingCompany** — Full business info with address, geo, hours, areas served, makesOffer
2. **Organization** — Contact point, logo, social links
3. **HowTo** — 4-step moving process
4. **FAQPage** — 6 Q&A pairs
5. **WebSite** — With SearchAction

District pages add **LocalBusiness + Place + BreadcrumbList** schemas.  
Blog posts include **BlogPosting** schema.

### Accessibility (Good)
| Item | Status |
|------|--------|
| Skip-to-content link | ✅ |
| `aria-label` on navigation | ✅ "Ana menü" |
| `aria-hidden="true"` on decorative SVGs | ✅ All icons |
| `aria-expanded` / `aria-controls` on mobile menu | ✅ |
| Form `<label for="...">` associations | ✅ All inputs |
| Proper input types (`tel`, `date`, `email`) | ✅ |
| `lang="tr"` on `<html>` | ✅ |
| Descriptive image alt texts | ✅ Turkish, keyword-rich |

### Security Headers (`_headers`)
- ✅ Content-Security-Policy (strict, with Google Analytics exceptions)
- ✅ Strict-Transport-Security (2 years, preload)
- ✅ X-Content-Type-Options, X-Frame-Options, Referrer-Policy
- ✅ Permissions-Policy (camera, mic, geolocation disabled)

### Performance Basics
- ✅ CSS is inline (no render-blocking external stylesheets)
- ✅ Explicit `width`/`height` on all `<img>` tags (prevents CLS)
- ✅ `loading="lazy"` + `decoding="async"` on below-fold images
- ✅ Minimal JS (~20 lines), inline at end of body
- ✅ SVG favicon as data URI (no extra request)
- ✅ Asset cache headers: 1 year immutable for images

### Conversion Optimization
- ✅ Click-to-call (`tel:`) links prominent
- ✅ WhatsApp deep links with pre-filled messages
- ✅ Lead capture form → WhatsApp redirect
- ✅ GA4 event tracking for phone, WhatsApp, form conversions
- ✅ 301 redirects for old URL structure (no broken links)

---

## 🔴 High Priority Issues

### 1. Hero Image in Sitemap ≠ Actual Page Content
**Problem:** `sitemap.xml` declares `hero-nakliyat.jpg` as an image for the homepage, but the homepage hero section uses a **CSS gradient background** — the image is never displayed to users.

**Impact:** Google Image Search may penalize this as misleading markup. The image file (128 KB) is downloaded by zero pages on the site.

**Fix:** Either add the hero image to the homepage HTML, or remove it from the sitemap's homepage `<url>` entry.

---

### 2. No Modern Image Formats (WebP/AVIF)
**Problem:** All 11 images are JPG only. No `<picture>` elements with WebP/AVIF fallbacks.

| Image | Size | Est. WebP savings |
|-------|------|-------------------|
| hero-nakliyat.jpg | 128 KB | ~35-45 KB |
| asansorlu-tasima.jpg | 135 KB | ~45-50 KB |
| asansor-kiralama.jpg | 169 KB | ~55-65 KB |
| og-kapak.jpg | 79 KB | ~25-30 KB |

**Total potential savings:** ~200-250 KB (25-30% reduction)

**Fix:** Convert all JPGs to WebP (with JPG fallback via `<picture>`). Add AVIF for modern browsers.

---

### 3. LCP Image Not Optimized
**Problem:** The first visible image on the homepage (`asansorlu-tasima.jpg` in the elevator section ~line 699) has both `loading="lazy"` AND `fetchpriority="low"`. If this is the Largest Contentful Paint element, these attributes actively **slow down** rendering.

**Fix:**
- Remove `loading="lazy"` from the first image below the fold on each page
- Add `fetchpriority="high"` to the LCP image
- Consider adding `<link rel="preload" as="image" href="assets/img/asansorlu-tasima.jpg">` in `<head>`

---

### 4. No Resource Hints (preconnect/preload)
**Problem:** Missing performance hints:
- No `<link rel="preconnect">` for the site's own origin
- No `<link rel="preload">` for critical images or fonts
- No `<link rel="dns-prefetch">` for `wa.me` (WhatsApp) or Google Analytics domains

**Fix:** Add to `<head>`:
```html
<link rel="preconnect" href="https://www.evdenevegaziantep.com">
<link rel="dns-prefetch" href="https://wa.me">
<link rel="dns-prefetch" href="https://www.google-analytics.com">
```

---

## 🟡 Medium Priority Issues

### 5. WhatsApp Links Open in Same Tab
**Problem:** Static `<a href="https://wa.me/...">` links have `rel="noopener"` but **no `target="_blank"`**. This navigates away from the site, potentially losing the user.

**Note:** The JS form handler correctly uses `window.open('...', '_blank')` — only the static links are affected.

**Fix:** Add `target="_blank"` to all `wa.me` links (5 instances on homepage alone).

---

### 6. Junk `foto` File in Root
**Problem:** A 1-byte file named `foto` exists at the repository root. It appears to be accidental (possibly a placeholder that was never used).

**Fix:** Delete the file and add it to `.gitignore` or remove from the repo.

---

### 7. Massive CSS Duplication Across Pages
**Problem:** The full CSS (~14 KB) is **inlined in all 53 HTML pages**, totaling **760 KB of duplicated CSS** across the site. This means:
- Users who visit multiple pages download the same CSS repeatedly
- Any design change requires editing 53 files
- No browser caching benefit for CSS

**Recommendation:** Extract shared CSS to `/assets/css/style.css` and reference with `<link>`. Keep critical above-fold CSS inline if needed, with the full stylesheet loaded asynchronously.

---

### 8. Form Has No JavaScript Fallback
**Problem:** The lead form (`id="teklif"`) uses `e.preventDefault()` and constructs a WhatsApp URL via JavaScript. If JS is disabled, the form does nothing — no `action` attribute on the `<form>` element.

**Fix:** Add a fallback `action="https://wa.me/905461122797"` with `method="GET"`, or add a `<noscript>` message with the phone number.

---

### 9. `_onizleme.html` May Need `noindex`
**Problem:** The `_onizleme.html` (preview) page doesn't have `noindex` meta tag. The `_headers` file only applies `noindex` to `/404.html` and `/sitemap.xml`.

**Fix:** Add to `_headers`:
```
/_onizleme.html
  X-Robots-Tag: noindex, nofollow
```

---

### 10. SearchAction Structured Data May Be Misleading
**Problem:** The `WebSite` schema includes a `SearchAction` pointing to `/hizmet-bolgelerimiz/?q={search_term_string}`, but this is a **static site** with no actual search functionality. The query parameter would have no effect.

**Fix:** Either implement actual client-side search, or remove the `SearchAction` from structured data to avoid Google Search Console warnings.

---

## 🟢 Low Priority / Nice-to-Have

### 11. No `favicon.ico`
Only SVG favicon (`data:image/svg+xml`) is provided. While modern browsers handle this, older ones (Safari, older Android browsers) may not display any icon.

**Fix:** Add a small PNG favicon as fallback: `<link rel="icon" href="/favicon-32x32.png" sizes="32x32">`

---

### 12. No `<noscript>` Handling for Analytics
The GA4 tracking relies on `gtag()` being available, but there's no `<noscript>` fallback for Google Analytics. Users with JS disabled won't be counted.

---

### 13. CSP Uses `unsafe-inline` for Scripts
The Content-Security-Policy includes `script-src 'self' 'unsafe-inline'` — required because all JS is inline. This weakens XSS protection.

**Fix:** Either use CSP nonces/hashes for inline scripts, or move JS to an external file.

---

### 14. Missing `manifest.json`
No web app manifest. Not critical for a service business site, but would enable "Add to Home Screen" with proper branding.

---

### 15. H1 Title Could Be More Keyword-Focused
Homepage H1: *"Gaziantep Evden Eve Nakliyat'ta Güven & Kalite: Beyoğlu Nakliyat"*  
The `<title>` is more keyword-optimized than the H1. Consider adding "Asansörlü" to the H1 for the key differentiator.

---

## 📊 Summary Scorecard

| Category | Score | Notes |
|----------|-------|-------|
| **SEO** | ⭐⭐⭐⭐⭐ | Excellent structured data, meta tags, sitemap |
| **Accessibility** | ⭐⭐⭐⭐ | Good basics; missing skip link visibility check, focus management |
| **Performance** | ⭐⭐⭐ | No WebP, no preload hints, lazy LCP issue |
| **Security** | ⭐⭐⭐⭐⭐ | Comprehensive headers, HSTS, CSP |
| **Code Quality** | ⭐⭐⭐ | Massive duplication, junk files, missing fallbacks |
| **Mobile UX** | ⭐⭐⭐⭐ | Responsive design, but could benefit from PWA manifest |
| **Conversions** | ⭐⭐⭐⭐⭐ | Multiple CTAs, WhatsApp integration, tracking |

**Overall: 4.0 / 5.0** — A well-built static site with strong SEO and conversion focus. Main areas for improvement are **image optimization** and **reducing code duplication**.
