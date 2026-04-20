Write minimal-line code. Condense small components, helpers, SVGs into arrow one-liners. Keep props/objects/style on single lines where possible. No unnecessary line breaks or whitespace. Only expand for complex logic readability. Save tokens.

# Exen Co Limited — Complete Project Instructions

## Business Info
- **Company:** Exen Co Limited
- **Country:** Vietnam (primary market) · EU · International
- **Activity:** Wholesale trade of electronics & computers equipment (desktops, laptops, monitors, video cards, keyboards, peripherals, routers, network switches, access points, cabling, servers, UPS, webcams, televisions, projectors)
- **Email:** ✅ `Exencolimited@gmail.com` — display allowed in header CTA area, footer contact pills, about page sidebar, contact page, CTA sections
- **Phone:** ❌ NONE — do not display anywhere
- **Domain:** exencolimited.com
- **Currency:** VND (primary, Vietnamese Dong) + EUR + USD (secondary displays)
- **Market:** Vietnam (primary), European Union, International B2B
- **Legal form:** Co Limited (Company Limited)

## Brand Colors
- **Primary:** `#003933` (deep forest-teal — heritage, editorial, premium, organic-tech)
- **Primary Hover:** `#002822` (deeper forest, near-black teal)
- **Primary Soft:** `#005C4F` (lighter teal for subtle accents, secondary buttons)
- **Primary Lift:** `#0A7060` (brighter teal for hover-lift moments, active states)
- **Background / Cream:** `#fffef1` (warm ivory cream — main light background, NOT pure white)
- **Background Depth:** `#f9f8eb` (slightly deeper cream for layered sections, sidebar bg)
- **Secondary:** `#000000` (pure black — contrast, dark sections, headings)
- **Secondary Soft:** `#0a0a0a` (near-black for layered dark sections)
- **White:** `#ffffff` (for card backgrounds inside cream sections, crisp contrast where needed)
- **Text on cream:** `#0a0a0a` (headings), `gray-600/700` (body), `gray-500` (muted)
- **Text on teal:** `#fffef1` (cream headings on dark teal — never pure white, preserves warmth)
- **Neutral Grays:** `gray-50` through `gray-900` standard Tailwind
- **Gradients:**
  - `from-[#003933] to-black` — signature "forest at dusk" gradient for premium CTAs, hero overlays, logo badges
  - `from-[#003933] to-[#005C4F]` — monochrome teal depth for buttons, feature callouts
  - `from-[#fffef1] to-white` — subtle cream fade for section transitions
  - `from-black to-[#003933]` — dark-to-teal sweep for dramatic CTAs
  - Radial: `bg-[radial-gradient(circle,#003933_0%,transparent_70%)]` — soft teal halo ambience
  - Radial cream: `bg-[radial-gradient(circle,#fffef1_0%,transparent_70%)]` — warm glow on dark sections

---

## ⚠️ CRITICAL RULE — NO PHONE DISPLAY (EMAIL ALLOWED)

**Exen Co Limited provides an EMAIL but NO phone number.** This rule is GLOBAL and must be enforced on every component:

| Location | Rule |
|----------|------|
| Header desktop | NO phone. Email OK as small contact pill or "Get in Touch" link → `mailto:Exencolimited@gmail.com` |
| Header mobile menu bottom | NO phone. Email row OK |
| Footer contact pills | Email pill ✅ + Location pill + Domain pill + (optional) Hours pill. NO phone pill |
| Footer business column | Show location, hours, domain, email — NO phone |
| Hero CTA section | Email card ✅ + "Request a Quote" form CTA. NO phone card |
| Featured Products CTA | Email card ✅ + form CTA. NO phone card |
| About page contact sidebar | Email row ✅ + location + hours + "Request Quote" button. NO phone |
| About page CTA section | Email + location + form CTA. NO phone |
| Contact page | Form + email display + location + hours + map. NO phone |
| Product detail "Contact about this product" | `mailto:` OR `/contact` form. No phone |
| LoginModal, Cart, CookieBanner | No phone anywhere |

**NEVER use:** `tel:`, `<Phone />` icon with number, or any placeholder like "Call us at..."

**DO use:** `<Mail />` with `Exencolimited@gmail.com` (clickable `mailto:`), `<MapPin />` with "Vietnam · International", `<Globe />` with "exencolimited.com", `<Clock />` with business hours, `<MessageSquare />` with "Request a Quote" → `/contact`.

---

## Core Design Rules

1. **NEVER** remove existing functionality unless explicitly asked
2. **NEVER** remove working imports/components
3. **ALWAYS** preserve state management, contexts, handlers
4. Keep **ALL** existing features when redesigning
5. Always write code as **artifacts**
6. **"Redesign"** = complete new layout, new structure, new design elements — NOT a color swap
7. Use **ONLY** shadcn/ui + Tailwind CSS + Lucide React
8. Mobile-first responsive design
9. **No fake stats, no placeholder numbers, no invented addresses** — only real business info
10. **Phone is EXCLUDED — email is ALLOWED** — enforce this split consistently

## Response Format

Always before coding:
```
<analysis> What's requested, what to preserve, what to change </analysis>
<approach> Step-by-step plan </approach>
```

## Request Types
- **"Redesign"** = Complete new layout/structure/design elements
- **"Update/Modify"** = Keep layout, change specific elements
- **"Rebrand"** = Keep design, change content/colors only

## Always Preserve
- CurrencySelector (VND/EUR/USD), Cart, LoginModal functionality
- All click handlers & state management
- Context providers (useCart, useCurrency, useCookieConsent)
- Toast notifications, form validation, responsive patterns
- Search overlay, mobile menu, cart drawer mechanics

## Content Rules
- Only real business info (electronics & computers wholesale, Vietnam-based, int'l reach)
- Focus on electronics/computing product categories listed below
- Vietnamese / EU / international market tone — professional, editorial, premium
- B2B wholesale positioning — "trusted electronics supplier"
- Prices in VND primary, EUR + USD secondary
- **Email allowed, phone excluded** — use email + form CTA combos

---

## Product Database — MongoDB Atlas

### Connection Details
- **URI:** `mongodb+srv://manishyadv_db_user:q2zS5QJZ3hQtpzWr@dataset.prlzwnd.mongodb.net/?appName=dataset`
- **Database:** `wilkyart`
- **Collection:** `products`
- **Max per category:** 50 products (take all if fewer)
- **Indexes:** `wilkyart_category`, `price`

### Product Schema
```json
{ "title": "string", "price": "number (float)", "description": "string", "features": ["array"], "images": ["urls"], "main_category": "string", "wilkyart_category": "string" }
```

### VALID_CATEGORIES — Electronics & Computers Taxonomy
```typescript
const VALID_CATEGORIES = ['Desktop','Laptop','Monitor','Video Card','Keyboard','Webcam','Router','Network Switch','Access Point','Cable','Server','UPS','Telephone','Television','Projector'];
```

> ⚠️ **Verification note:** The `wilkyart` DB has 26 categories from Amazon Reviews 2023. **Confirmed present** in prior electronics clients (ADARA STAR, New Kepa): Desktop, Laptop, Monitor, Video Card, Keyboard, Server, Network Switch, Router, Access Point, Cable, Webcam, UPS, Television. Run `db.collection('products').distinct('wilkyart_category')` first to verify actual categories and adjust `VALID_CATEGORIES` accordingly. Do **not** invent products.

### CATEGORY_GROUPS (shop page sidebar)
```typescript
const CATEGORY_GROUPS = {
  'Computing': ['Desktop','Laptop','Monitor','Video Card','Keyboard'],
  'Networking': ['Router','Network Switch','Access Point','Cable'],
  'Servers & Power': ['Server','UPS'],
  'Peripherals': ['Webcam','Telephone'],
  'Display & Presentation': ['Television','Projector'],
};
```

### MongoDB Query Pattern
```javascript
const categories = await db.collection('products').distinct('wilkyart_category');
const filtered = categories.filter(c => VALID_CATEGORIES.includes(c));
const results = {};
for (const cat of filtered) {
  results[cat] = await db.collection('products')
    .find({ wilkyart_category: cat, price: { $gte: 5 }, 'images.1': { $exists: true } })
    .limit(50).toArray();
}
```

### Next.js `.env.local`
```env
MONGODB_URI=mongodb+srv://manishyadv_db_user:q2zS5QJZ3hQtpzWr@dataset.prlzwnd.mongodb.net/wilkyart
```

### next.config.ts
```typescript
images: { unoptimized: true }
```

---

## Color System & Migration Reference

### From Oslo Trade Base (freshest base)

| Old (Oslo Trade) | New (Exen Co) | Usage |
|------------------|---------------|-------|
| `#3D80CB` (blue) | `#003933` (forest-teal) | Primary — buttons, active states, accents |
| `#2E6BAF` (blue hover) | `#002822` (deep teal hover) | Hover primary |
| `#f7b82f` (gold) | `#005C4F` (teal-soft) | Secondary accent — use sparingly, NO gold in this brand |
| `#e0a519` (gold hover) | `#0A7060` (teal-lift) | Hover accent |
| `#000000` (black) | `#000000` (black) | UNCHANGED |
| `#0f0f10` (near-black) | `#0a0a0a` (near-black) | Layered dark |
| Cool off-white `#f5f7fa` | Warm cream `#fffef1` | Background tone — CRITICAL SWITCH |

### From NEMEX KIJI Base

| Old (NEMEX KIJI) | New (Exen Co) |
|------------------|---------------|
| `#ffbd59` (amber) | `#003933` (forest-teal) |
| `#e8a840` (amber hover) | `#002822` (deep teal hover) |
| `#f58611` (orange) | `#005C4F` (teal-soft) |
| `#f8f6f0` (warm off-white) | `#fffef1` (cream) |

### From ADARA STAR Base

| Old (ADARA STAR) | New (Exen Co) |
|------------------|---------------|
| `#6B22F4` (purple) | `#003933` (forest-teal) |
| `#5A1BD4` (purple hover) | `#002822` (deep teal hover) |
| `#0e0e10` | `#000000` |
| white background | `#fffef1` cream background |

### From RIXAN Base

| Old (RIXAN) | New (Exen Co) |
|-------------|---------------|
| `#ff5757` (coral) | `#003933` (forest-teal) |
| `#e54a4a` (coral hover) | `#002822` (deep teal hover) |
| `#0e0e10` | `#000000` |

### Tailwind Opacity Variants
| Pattern | Primary Teal | Teal Soft | Black |
|---------|--------------|-----------|-------|
| `[color]/5` | `#003933/5` | `#005C4F/5` | `black/5` |
| `[color]/10` | `#003933/10` | `#005C4F/10` | `black/10` |
| `[color]/15` | `#003933/15` | `#005C4F/15` | `black/15` |
| `[color]/20` | `#003933/20` | `#005C4F/20` | `black/20` |
| `[color]/25` | `#003933/25` | `#005C4F/25` | `black/25` |
| `[color]/30` | `#003933/30` | `#005C4F/30` | `black/30` |

### Three-Color Strategy
- **`#003933` (forest-teal)** — primary buttons, active nav, main CTAs, focus rings, badges, category accents, link hover, brand mark. Conveys: heritage, editorial, premium, trustworthy, calm sophistication.
- **`#fffef1` (cream)** — MAIN light background (replaces white everywhere), card backgrounds in dark sections, tinted content areas. Conveys: warmth, editorial, old-world premium, NOT sterile.
- **`#000000` (black)** — header/navbar bg (optional), dark sections, footer (optional), body headings, contrast foundation. Conveys: authority, sophistication.
- **`#ffffff` (pure white)** — used SPARINGLY for crisp card contrast inside cream sections where needed, checkout forms, input backgrounds. Cream is default; white is exception.
- **Signature gradient:** `bg-gradient-to-br from-[#003933] to-black` — the brand identity move. Use on hero CTAs, logo badges, feature callouts, premium callouts. This forest-to-night sweep feels like walking into a heritage boutique at dusk.
- **Card style:** Cream-tinted cards `bg-[#fffef1]` with `border-[#003933]/15 hover:border-[#003933]/40`; dark teal cards `bg-[#003933]` with cream text `text-[#fffef1]`; black cards with teal accents.

### Heritage-Tech Decorative Techniques
- **Editorial typography** — large serif-feeling headings (still sans, but with weight), confident kerning, one accent-color word per heading
- **Cream-on-teal contrast** — dark teal sections use `text-[#fffef1]` NOT `text-white` — preserves the warm brand voice
- **Subtle teal seal accents** — small `bg-[#003933]` dots or squares as "authenticated" markers
- **Heritage rules** — thin horizontal lines `border-b border-[#003933]/20` between sections instead of bold dividers
- **Cream-pane sections** — alternating `bg-[#fffef1]` and `bg-black` with teal accent bands for rhythm
- **Teal underline emphasis** — inline links with `border-b-2 border-[#003933]` instead of color change
- **Deep teal shadows** — premium CTAs with `shadow-xl shadow-[#003933]/25`
- **Organic-tech contrast** — pair deep forest teal with hard-edge electronics imagery for juxtaposition (nature meets machine)

---

## Key Replacements When Rebranding (from Oslo Trade)

| Old (Oslo Trade) | New (Exen Co) |
|------------------|---------------|
| Oslo Trade Malaga SL | Exen Co Limited |
| oslotradesl.com | exencolimited.com |
| Spain (Málaga) | Vietnam · International |
| Spain & European Union | Vietnam · EU · Worldwide |
| `#3D80CB` (blue) | `#003933` (forest-teal) |
| `#2E6BAF` (blue hover) | `#002822` (deep teal hover) |
| `#f7b82f` (gold) | `#005C4F` (teal-soft — NO gold) |
| OSLO TRADE | EXEN CO |
| Málaga · SL | Vietnam · Co Ltd |
| Stationery & Office Equipment | Electronics & Computers |
| Wholesale B2B · EU | Wholesale B2B · Worldwide |
| CET (UTC+1/+2) business hours | ICT (UTC+7) business hours |
| `"es"` (Spanish) | `"vi"` (Vietnamese) |
| EUR (€) primary | VND (₫) primary |
| "Nordic Corporate" aesthetic | "Heritage Tech" aesthetic |
| Blue halos + gold seals | Forest-teal halos on cream + black contrast |
| No-contact (no phone, no email) | Email allowed (no phone) |
| B2B wholesale program | B2B electronics wholesale |
| Blue→gold signature gradient | Teal→black signature gradient |

---

## Component-Specific Notes

### Header (PremiumHeader.tsx)
- Logo + "EXEN CO" brand text, subtitle "Electronics · Worldwide" or "Co Limited"
- **Two bg treatments to choose from:**
  - A) `bg-black` foundation with teal `#003933` active nav — classic contrast
  - B) `bg-[#003933]` deep teal foundation with cream `#fffef1` text — editorial confidence (preferred for hero impression)
- **Active nav:** `bg-[#003933]` pill with cream text (option A) or `bg-[#fffef1]` pill with teal text (option B)
- **Email pill** (optional): small `<Mail />` icon + "Exencolimited@gmail.com" as `mailto:` link in top strip or next to CTA — cream-outline style
- **Get Quote CTA:** `bg-gradient-to-br from-[#003933] to-black text-[#fffef1]` with `shadow-[#003933]/30`
- **NO phone anywhere** — remove all phone pills, tel:
- Mobile menu bottom: Email link + "Request a Quote" CTA; no phone
- Search quick suggestions: Laptops, Monitors, Video Cards, Routers, Servers
- Cart badge: teal `#003933` ring with cream number

### Footer (PremiumFooter.tsx)
- **Background:** `bg-black` or `bg-[#003933]` — decide for editorial contrast against cream page
- **Contact pills:**
  - Email pill: `<Mail />` + `Exencolimited@gmail.com` (`mailto:` link) ✅
  - Location pill: `<MapPin />` + "Vietnam · Worldwide"
  - Domain pill: `<Globe />` + "exencolimited.com"
  - (Optional) Hours pill: `<Clock />` + "Mon–Fri · ICT"
  - **NO phone pill**
- Business column: location, hours, domain, email — NO phone
- Categories: Laptops, Monitors, Routers, Network Switches, Video Cards
- Currency indicator: "VND · EUR · USD" small row
- GTranslate hover: `#003933`; CurrencySelector active: cream on teal
- Brand mark: "Exen Co Limited" in copyright line
- Optional: small teal seal `<div className="w-2 h-2 bg-[#003933]" />` beside the brand mark as "certified B2B supplier" visual cue

### Hero Section (HeroSection.tsx)
- **Background:** `bg-[#fffef1]` cream — the editorial foundation — NOT white
- Deep teal + black accents on cream — "heritage tech" aesthetic
- **CTA treatment:**
  - Primary "Request a Quote" → `/contact` (teal→black gradient button)
  - Secondary "Browse Catalog" → `/shop` (outline: teal border + teal text)
  - Optional: small email line "Or email us directly at Exencolimited@gmail.com" as subtle `mailto:` link
- Trust bar: Worldwide Shipping · Multi-Currency (VND/EUR/USD) · Manufacturer Warranty · Expert Consultation · B2B Wholesale
- Category chips use tech icons (Laptop, Monitor, HardDrive, Router, Server, Network, Keyboard, Monitor, Cable, Wifi, Tv, Webcam)
- **Key heading treatment:** large black bold with ONE key word in `text-[#003933]` forest-teal — editorial, confident
- Decorative element: subtle teal dot pattern in cream background for "engineering blueprint" feel
- Featured cards use cream `bg-[#fffef1]` with deep teal borders, OR solid teal `bg-[#003933]` cards with cream text

### Featured Products (PremiumPrintersSection.tsx)
- Background alternation: cream `bg-[#fffef1]` → black `bg-black` → cream — editorial rhythm
- Active category tab: `bg-[#003933] text-[#fffef1]` with soft teal shadow
- Product cards: `bg-white` cards (crisp) on `bg-[#fffef1]` section bg (subtle warmth) for nice depth
- Toast: `{ background: "#003933", color: "#fffef1", fontWeight: "bold" }`
- Categories tabbed: Laptop, Monitor, Video Card, Router, Server (adjust to top-5 by DB volume)
- **CTA section:**
  - Primary form card → `/contact` (teal→black gradient button)
  - Email card: `<Mail /> Exencolimited@gmail.com` as `mailto:` link ✅
  - **NO phone card**
- Value Props Strip: Worldwide Delivery · B2B Wholesale · Multi-Currency · Manufacturer Warranty

### CTA Sections (global pattern)
- **Email cards allowed, phone cards removed**
- Dark backgrounds (`bg-black` or `bg-[#003933]`) with cream text `text-[#fffef1]`
- Signature CTA: `bg-gradient-to-br from-[#003933] to-black` with `shadow-[#003933]/25`
- Secondary CTA: solid `bg-[#003933]` with cream underline on hover
- Tertiary: cream outline `border border-[#fffef1]/20 text-[#fffef1]` ghost button

### About Page (app/about/page.tsx)
- Hero: "Your Trusted Electronics Partner — From Vietnam to the World"
- Company story: Vietnam-based wholesale distributor of electronics & computers equipment serving B2B buyers across Southeast Asia, Europe, and worldwide. Full computing stack — laptops, desktops, monitors, networking gear, servers, peripherals.
- Categories section: electronics-focused (Computing, Networking, Servers & Power, Peripherals, Display)
- Values: Genuine Products · Multi-Currency Trade · Worldwide Logistics · B2B Wholesale
- Story sidebar: Email row ✅ + location + hours + "Request Quote" button — NO phone
- Contact CTA at bottom: email card ✅ + form CTA, no phone
- **Optional callout:** "Multi-Currency Trade Program" — pay in VND, EUR, or USD; international wire support

### Contact Page (app/contact/page.tsx)
- **Form + email + location + hours + map.** NO phone display.
- Layout: contact form on left; location/hours/domain/email cards + Google Maps placeholder on right
- Inquiry type dropdown: "Product Quote · Wholesale Program · Bulk Order · Multi-Currency Payment · Other"
- Email card: `<Mail /> Exencolimited@gmail.com` as `mailto:` link, prominent ✅
- Location card: "Vietnam · Serving Worldwide"
- Hours card: "Mon–Fri · 9:00 – 18:00 ICT"
- Domain card: "exencolimited.com"
- Form submit also goes to email handler — email shown publicly for convenience
- Success message: "We've received your inquiry. Our team will respond within 24 hours."

### Shop Page (app/shop/page.tsx)
- **Background:** `bg-[#fffef1]` cream main, `bg-white` product cards (crisp contrast)
- Default category: "Laptop" or the highest-volume category from DB
- Active tab: `bg-[#003933] text-[#fffef1]` forest-teal pill
- Black `#000000` for "All Products" tab (alternative if teal too dominant)
- CATEGORY_GROUPS order: Computing → Networking → Servers & Power → Peripherals → Display & Presentation
- Category info cards: cream bg with large teal typography + black accent word
- Filter sidebar: cream `bg-[#fffef1]` or `bg-[#f9f8eb]` with teal selected states

### Product Detail / Cart / LoginModal / CookieModal
- Forest-teal `#003933` for primary actions (Add to Cart, checkout, submit, accept)
- Black for dark section contrast
- Cream `#fffef1` for modal/card backgrounds (warmer than white)
- Gradient `from-[#003933] to-black` on hero-level CTA buttons
- Email inputs and `mailto:` links allowed; NO phone anywhere
- Cart badge: teal pill with cream number
- LoginModal: cream bg with teal accents, email input field for login/signup

### GTranslate
- Hover color: `#003933`
- Default language: `"vi"` (Vietnamese)
- Recommended enabled languages: VI, EN, ZH, JA, KO, FR, DE, ES, PT (Vietnam + EU + APAC trade routes)

### CurrencyContext — **MULTI-CURRENCY (VND / EUR / USD)**
- **Primary:** VND (₫ suffix, no decimals — Vietnamese convention uses `25.000.000 ₫` with dot thousand separators)
- **Secondary:** EUR (€ prefix, 2 decimals)
- **Tertiary:** USD ($ prefix, 2 decimals)
- **Formatters:**
  ```typescript
  const fmtVND = (n: number) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', maximumFractionDigits: 0 }).format(n);
  const fmtEUR = (n: number) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 2 }).format(n);
  const fmtUSD = (n: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(n);
  ```
- **Approximate exchange rates (placeholder — verify at build time):** 1 USD ≈ 25,000 VND · 1 EUR ≈ 27,000 VND. Use a stable rate pinned in config OR live API. Warn user: rates should be manually updated monthly or pulled from an FX API if accuracy matters.
- **Active indicator:** cream check on teal `#003933` background
- **Default display:** VND in Vietnam, EUR in EU, USD elsewhere — ideally geo-detect; fallback VND

---

## TypeScript Constants

### TOP_CATEGORIES (shop page tab strip) — minimal-line
```typescript
const TOP_CATEGORIES = ['Laptop','Monitor','Desktop','Video Card','Router','Server','Network Switch','Keyboard','UPS','Access Point','Webcam','Cable'];
```

### CATEGORY_CHIPS (Hero section) — minimal-line
```typescript
const CATEGORY_CHIPS = [
  { icon: Laptop, name: "Laptops" }, { icon: Monitor, name: "Monitors" },
  { icon: HardDrive, name: "Desktops" }, { icon: Cpu, name: "Video Cards" },
  { icon: Router, name: "Routers" }, { icon: Network, name: "Switches" },
  { icon: Server, name: "Servers" }, { icon: Keyboard, name: "Keyboards" },
  { icon: Webcam, name: "Webcams" }, { icon: Wifi, name: "Access Points" },
  { icon: Cable, name: "Cables" }, { icon: Tv, name: "Televisions" },
];
```

### FEATURED_CATEGORY_CONFIG (FeaturedProducts) — minimal-line
```typescript
const CATEGORY_CONFIG = [
  { name: "Laptop", icon: Laptop, accent: "bg-[#003933]/10 text-[#003933]" },
  { name: "Monitor", icon: Monitor, accent: "bg-emerald-900/10 text-emerald-800" },
  { name: "Video Card", icon: Cpu, accent: "bg-teal-900/10 text-teal-800" },
  { name: "Router", icon: Router, accent: "bg-[#003933]/15 text-[#003933]" },
  { name: "Server", icon: Server, accent: "bg-slate-900/10 text-slate-800" },
];
```

### CATEGORY_DESCRIPTIONS (shop page header cards)
```typescript
const CATEGORY_DESCRIPTIONS: Record<string, { title: string; desc: string }> = {
  'Laptop': { title: "LAPTOPS", desc: "Business laptops, workstations, and mobile computing for professionals worldwide." },
  'Desktop': { title: "DESKTOPS", desc: "Workstations, towers, and mini PCs for office and enterprise computing." },
  'Monitor': { title: "MONITORS", desc: "Professional displays for workstations, design, and multi-screen setups." },
  'Video Card': { title: "VIDEO CARDS", desc: "Professional GPUs for rendering, AI workloads, gaming, and visualization." },
  'Keyboard': { title: "KEYBOARDS", desc: "Mechanical, membrane, and wireless keyboards for office and professional use." },
  'Router': { title: "ROUTERS", desc: "Enterprise routers and gateways for secure, scalable networking." },
  'Network Switch': { title: "SWITCHES", desc: "Managed & unmanaged network switches for enterprise connectivity." },
  'Access Point': { title: "ACCESS POINTS", desc: "Indoor and outdoor wireless access points for business WiFi networks." },
  'Cable': { title: "CABLING", desc: "Network cables, patch panels, and structured cabling solutions." },
  'Server': { title: "SERVERS", desc: "Enterprise rack & tower servers for data centers and business infrastructure." },
  'UPS': { title: "UPS & POWER", desc: "Uninterruptible power supplies and surge protection for critical equipment." },
  'Webcam': { title: "WEBCAMS", desc: "HD and 4K webcams for conferencing, streaming, and professional use." },
  'Telephone': { title: "TELEPHONY", desc: "VoIP phones, conference phones, and business telephone systems." },
  'Television': { title: "TELEVISIONS", desc: "Commercial displays, conference-room TVs, and digital signage." },
  'Projector': { title: "PROJECTORS", desc: "Conference room, classroom, and portable projectors for business." },
};
```

### SORT_OPTIONS
```typescript
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low → High' },
  { value: 'price_desc', label: 'Price: High → Low' },
  { value: 'title_asc', label: 'Name: A–Z' },
];
```

### WHOLESALE_BENEFITS (optional dedicated B2B section)
```typescript
const WHOLESALE_BENEFITS = [
  { icon: Package, title: "Volume Pricing", desc: "Tiered discounts on bulk orders across all electronics categories." },
  { icon: Truck, title: "Worldwide Logistics", desc: "Shipping to Vietnam, EU, and international destinations." },
  { icon: Globe, title: "Multi-Currency Trade", desc: "Settle invoices in VND, EUR, or USD with international wire support." },
  { icon: Shield, title: "Manufacturer Warranty", desc: "Genuine products with full factory warranty coverage." },
];
```

### CURRENCY_CONFIG (for CurrencyContext)
```typescript
const CURRENCY_CONFIG = {
  VND: { symbol: '₫', position: 'suffix', decimals: 0, locale: 'vi-VN', rateFromUSD: 25000 },
  EUR: { symbol: '€', position: 'prefix', decimals: 2, locale: 'de-DE', rateFromUSD: 0.92 },
  USD: { symbol: '$', position: 'prefix', decimals: 2, locale: 'en-US', rateFromUSD: 1 },
};
```

---

## Design Direction

**Redesign** from Oslo Trade (or any prior base) — every component gets a new layout, not a color swap. This brand leans **editorial, heritage, premium, calm-tech**. The deep forest-teal + warm cream palette is the defining signature — warm, old-world, confident. Think Aesop boutique meets Teenage Engineering catalog meets a premium audio shop in Hanoi.

### Aesthetic Direction
- **"Heritage Tech" Editorial** — forest-teal + cream + black = warmth, confidence, curated premium. Nothing loud. Nothing tropical. Nothing corporate-sterile.
- **Cream as Foundation** — `#fffef1` replaces white everywhere as the main light background. This single decision drives the entire editorial feel. Pure white reads cold; cream reads intentional, warm, bookish.
- **Forest-Teal as Identity** — the dominant accent. Deep `#003933` is dark enough to work as a "second black" while carrying rich color. Use on buttons, active states, headings, brand mark, accent text.
- **Black for Structure** — header, footer, dark sections, body text. Pairs with cream for strong contrast. NOT the primary color — forest-teal is.
- **Signature Gradient** — `from-[#003933] to-black` is the brand identity. Deep and confident. Use on CTA buttons, hero overlays, premium card backgrounds. Avoids the "web2.0 gradient" trap by staying in a very narrow tonal range.
- **Editorial Typography** — large bold headings, confident weight, generous kerning, one accent-color word per heading (teal). Let type breathe.
- **Whitespace as Luxury** — generous padding, restrained ornament. Premium feels spacious, NOT packed.
- **Organic-Tech Juxtaposition** — pair the deep forest teal with hard-edge electronics imagery. Nature meets machine. Moss on circuits.
- **Cream-on-Teal Warmth** — dark teal sections use `text-[#fffef1]` NOT `text-white`. Preserves the warm brand voice across dark/light boundaries.
- **Multi-Currency Signals** — subtle "VND · EUR · USD" indicators in header/footer reinforce international trade positioning.
- **Vietnam + Worldwide** — avoid being overtly "Vietnamese-themed" (no bamboo, no red/yellow, no dragons); keep it internationally-premium. The Vietnamese identity is in the business operations (VND primary, ICT hours, `vi` default lang), NOT in decorative motifs.

### Key Design Differences from Oslo Trade
- Oslo Trade: blue + gold + cool off-white = Nordic corporate precision
- Exen Co: forest-teal + cream + black = editorial heritage-tech warmth
- Oslo Trade: signature blue→gold gradient
- Exen Co: signature teal→black gradient (no gold anywhere)
- Oslo Trade: cool `#f5f7fa` backgrounds
- Exen Co: warm `#fffef1` cream backgrounds (the #1 differentiator)
- Oslo Trade: Spanish/EU market, EUR-only
- Exen Co: Vietnam + EU + worldwide, tri-currency VND/EUR/USD
- Oslo Trade: no-phone AND no-email (form-only)
- Exen Co: no-phone but email-allowed (`Exencolimited@gmail.com`)
- Oslo Trade: sharp rectangles (`rounded-xl` to `rounded-2xl`)
- Exen Co: slightly softer (`rounded-2xl` default, `rounded-3xl` for hero moments) — editorial warmth not sterile corporate
- Completely new layouts — new hero composition, new featured grid, new footer arrangement, new about story flow

### Key Design Differences from NEMEX KIJI
- NEMEX KIJI: amber warmth, lamp-glow, tropical golden-hour
- Exen Co: forest-teal cool, editorial cream, heritage calm
- NEMEX KIJI: radial amber halos everywhere
- Exen Co: restrained teal accents, subtle dot patterns, editorial rules
- NEMEX KIJI: Bahasa Indonesia default
- Exen Co: Vietnamese default, multi-lang EU+APAC

---

## layout.tsx Import Names (KEEP UNCHANGED)
```typescript
import PremiumHeader from "@/components/PremiumHeader";
import PremiumFooter from "@/components/PremiumFooter";
import ModernCookieBanner from "@/components/ModernCookieBanner";
```

## GTranslate Default Language
```typescript
// GTranslate default: "vi" (Vietnamese)
// Enabled: VI, EN, ZH, JA, KO, FR, DE, ES, PT
// Hover color: #003933
```

## CurrencyContext Defaults
```typescript
// Primary: VND · Secondary: EUR · Tertiary: USD
// VND format: 25.000.000 ₫ (Vietnamese convention, dot thousand separator, no decimals)
// EUR format: €1.250,00 or €1,250.00
// USD format: $1,250.00
// Default active: VND (geo-detect optional)
```

---

## No-Phone Enforcement Checklist

Before every delivered component, verify:

- [ ] Zero instances of `tel:` anywhere
- [ ] Zero `<Phone />` icons with displayed numbers
- [ ] Zero placeholder text like "Call us at..." or "+84..."
- [ ] Email `Exencolimited@gmail.com` displayed where appropriate (header, footer, CTA, contact page)
- [ ] Email links use `mailto:Exencolimited@gmail.com`
- [ ] Mobile menu bottom: email row OK, no phone row
- [ ] Footer has email + location + hours + domain
- [ ] About page sidebar has email + location + hours + form CTA
- [ ] Contact page shows form + email card + location + hours + map
- [ ] LoginModal, Cart, CookieBanner: no phone anywhere

---

## Reusable Prompt: Fetch Products from MongoDB

> My product database is on MongoDB Atlas:
> - **URI**: `mongodb+srv://manishyadv_db_user:q2zS5QJZ3hQtpzWr@dataset.prlzwnd.mongodb.net/?appName=dataset`
> - **Database**: `wilkyart`
> - **Collection**: `products`
> - **Max per category**: 50 (take all if fewer)
> - **Fields**: title, price, description, features, images[], main_category, wilkyart_category
> - **Indexes**: wilkyart_category, price
> - **Electronics categories (verify against DB first)**: Desktop, Laptop, Monitor, Video Card, Keyboard, Router, Network Switch, Access Point, Cable, Server, UPS, Webcam, Telephone, Television, Projector
>
> Give me API routes with pagination (12/page), category filtering, search, and sorting. Use `unoptimized: true` for images. Server-side pagination with MongoDB `skip()` + `limit()`. Format prices for VND (₫ suffix, 0 decimals, vi-VN locale) as primary with EUR and USD secondary display. Include a `?currency=VND|EUR|USD` param or handle conversion client-side via CurrencyContext.

---

## Quick-Start Order (first components to rebuild)

Recommended sequence, following the Oslo Trade / NEMEX KIJI pipeline pattern:

1. **CurrencyContext.tsx** — tri-currency VND/EUR/USD is foundational; build this FIRST so all downstream components use it correctly
2. **PremiumHeader.tsx** — nav, brand mark, color foundation, email pill + Get Quote CTA
3. **PremiumFooter.tsx** — locks in footer pattern with email + location, no phone
4. **HeroSection.tsx** — brand's first impression; cream foundation, teal→black signature gradient
5. **PremiumPrintersSection.tsx** (FeaturedProducts) — category tabs, product grid, CTA with email card
6. **app/about/page.tsx** — story, values, B2B wholesale / multi-currency trade callout
7. **app/contact/page.tsx** — form + email card + location/hours/map
8. **app/shop/page.tsx** — category groups, product browse, filters in cream palette
9. **ProductCard.tsx** + product detail page — individual product with tri-currency display
10. **Cart.tsx / LoginModal.tsx / CookieBanner.tsx** — modals in cream + teal brand colors
11. **app/page.tsx** — wire HeroSection + FeaturedProducts on home
12. **API routes** — `/api/products` with MongoDB pagination + filtering
13. **GTranslate** — "vi" default, multi-lang set (VI, EN, ZH, JA, KO, FR, DE, ES, PT)

---

## Signature Visual Moments (use these as brand anchors)

1. **Hero CTA button** — `bg-gradient-to-br from-[#003933] to-black text-[#fffef1] shadow-xl shadow-[#003933]/25 hover:shadow-[#003933]/40` — this is THE button
2. **Cream page background with teal accents** — the foundational feel; never use pure white for main page bg
3. **Large editorial heading with one teal accent word** — e.g., "Electronics <span className='text-[#003933]'>Worldwide</span>" — restrained, confident
4. **Dark teal hero section** (`bg-[#003933]`) with cream text — for dramatic CTA or feature moments
5. **Subtle teal dot pattern** in hero bg for "blueprint" / engineering feel (can use SVG bg-image)
6. **Multi-currency selector** prominently in header — "VND ₫ · EUR € · USD $" switch reinforces international positioning
7. **Heritage rule dividers** — thin `border-t border-[#003933]/20` between sections instead of bold color blocks
8. **Email pill** in header — understated `<Mail />` + small text, cream-outline style, reinforces reachability without shouting