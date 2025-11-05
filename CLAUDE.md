# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Hubert Zakrzewski - a web developer, designer, and project manager. The site is built with vanilla HTML, CSS, and JavaScript (no build tools or frameworks), featuring advanced animations, custom interactions, and a project showcase system.

**Live Site:** https://zakrzewskihubert.com/

## Development Commands

Since this is a static website with no build process, development is straightforward:

- **Local Development:** Open `index.html` directly in a browser, or use a local server:
  ```bash
  # Python 3
  python -m http.server 8000

  # Node.js (if you have http-server installed)
  npx http-server -p 8000
  ```

- **No build, lint, or test commands** - this is a pure static site

## Architecture & Key Concepts

### File Structure

- **`index.html`** - Main portfolio page with all sections (hero, work, skills, about, contact)
- **`privacy-policy.html`** - Privacy policy page
- **`script.js`** - All JavaScript functionality (page loader, animations, carousel, modal)
- **`styles.css`** - All styles (includes responsive design, animations, component styles)
- **`fonts/`** - Custom fonts (Manrope family, Condenso)
- **`images/`** - Project screenshots and brand assets organized by project
- **`icons/`** - Technology/tool icons (SVG format)

### Core Technologies

1. **GSAP (GreenSock Animation Platform)**
   - Used for scroll-triggered animations and page transitions
   - CDN-loaded: `gsap.min.js` and `ScrollTrigger.min.js`
   - Key animations: hero text reveals, scroll-based fade-ins, carousel interactions

2. **Splitting.js**
   - Text splitting library for character/word-level animations
   - Used in hero section for letter-by-letter reveals

3. **Formspree**
   - Contact form backend (no server-side code needed)
   - Form submits to: `https://formspree.io/f/xgvpbqkw`

### JavaScript Architecture

The `script.js` file is organized into distinct sections:

1. **Page Loader** (lines 3-70)
   - Split-screen tile animation on page load
   - Initializes Splitting.js for text animations
   - Triggers hero text reveal animations

2. **Smooth Scroll** (lines 72-100)
   - Native smooth scrolling for anchor links
   - Works with CSS `scroll-behavior: smooth`

3. **Scroll Animations** (lines 102-174)
   - GSAP ScrollTrigger-based reveal animations
   - Staggered fade-in for carousel slides
   - Separate animations for `.scroll-animate` and `.scroll-animate-fade` elements

4. **Icon Tile System** (lines 180-288)
   - Interactive skill icons with hover/touch states
   - Backdrop blur effect on desktop
   - Touch-friendly expansion on tablets (click to expand)
   - Auto-expanded on mobile viewports

5. **FiniteCarousel Class** (lines 290-430)
   - Custom drag-to-scroll carousel implementation
   - Mouse and touch event support
   - Edge resistance and snap-to-slide behavior
   - Prevents accidental clicks during drag

6. **Button Text Animation** (lines 432-532)
   - Letter-by-letter text splitting for hover effects
   - Creates duplicate text blocks for smooth vertical slide animations

7. **Project Modal System** (lines 534-1214)
   - Dynamic modal content loading from `projectData` object
   - Body scroll locking when modal is open
   - Handles scrollbar width compensation
   - ESC key and click-outside-to-close functionality

8. **Cookie Consent System** (lines 1216-1271)
   - GDPR-compliant cookie banner with accept/decline options
   - Stores user preference in localStorage
   - Conditionally loads Google Analytics based on consent
   - Shows banner after 1 second delay on first visit

### CSS Architecture

The `styles.css` file is structured with clear sections:

- Font declarations with `font-display: block` for performance
- CSS variables for colors and theming
- Component-based organization (loader, hero, carousel, skills, etc.)
- Responsive design with mobile-first approach
- Custom animations and transitions

**Key Design Patterns:**
- "Liquid glass pill" effect (animated SVG filters)
- Grain overlay texture
- Backdrop blur effects
- Custom hover animations with split-text effects

### Project Data Structure

Project details are stored in the `projectData` object in `script.js` (lines 545-1077). Each project includes:
- `title`, `year`, `tagline`
- `content` (HTML string with standardized row structure)

**Available Projects:**
- `aswent` - Full case study with timeline
- `lumena` - Full case study with timeline
- `tintara` - Full case study with timeline
- `ges` - Coming soon placeholder
- `cherry-detailing` - Coming soon placeholder

### Animation Timing & Sequences

**Page Load Sequence:**
1. Page loader shows (300ms delay before animation)
2. Loader tiles slide out (800ms animation)
3. Hero text animates in (letter-by-letter stagger)
4. Glass pills fade in (after 1200ms)

**Scroll Animation Triggers:**
- Elements animate when they reach 80-85% viewport height
- Carousel slides use 0.12s stagger
- Other elements animate individually

## Important Implementation Details

### Responsive Breakpoints

The site adapts behavior based on viewport width:
- **Mobile:** ≤767px - Icon tiles always expanded, carousel adapts
- **Tablet:** 768px-1023px - Touch interactions enabled
- **Desktop:** ≥1024px - Hover interactions, backdrop blur effects

### Form Handling

The contact form uses Formspree:
- Honeypot field (`_gotcha`) for spam protection
- GDPR/RODO consent checkbox required
- No client-side validation beyond HTML5 attributes
- Formspree handles submission, validation, and email delivery

### Security Considerations

- Content Security Policy defined in `<head>` (line 6 of index.html)
- Allows specific CDNs and Formspree
- `'unsafe-inline'` permitted for scripts/styles (required for dynamic animations)
- External links use `rel="noopener noreferrer"`

### Performance Optimizations

- Custom fonts use `font-display: block` to prevent FOUT
- Images use WebP format where possible
- GSAP and Splitting.js loaded via CDN
- No framework overhead - pure vanilla JS

## Common Modification Patterns

### Adding a New Project

1. Add project images to `images/[project-name]/` directory
2. Add entry to `projectData` object in `script.js` (around line 545)
3. Add carousel slide in `index.html` with `data-project="[project-name]"`
4. Add live site link to `projectLinks` object (around line 1160)

### Modifying Animations

- Page loader timing: `script.js` lines 18-34
- Hero text animation: `script.js` lines 36-69
- Scroll animations: `script.js` lines 106-174
- Adjust easing with `ease: 'sine.out'` or other GSAP easing functions

### Styling Updates

- Color scheme: CSS variables in `styles.css` lines 42-49
- Typography: Font weights defined in `styles.css` lines 1-40
- Component styles: Organized by section with clear comment headers

## Browser Compatibility

Target browsers:
- Modern Chrome, Firefox, Safari, Edge (last 2 versions)
- Mobile Safari (iOS 13+)
- Chrome Android (last 2 versions)

Uses modern JavaScript (ES6+) and CSS features:
- `const`/`let`
- Arrow functions
- Template literals
- CSS Grid and Flexbox
- CSS custom properties
- Backdrop filters (with fallbacks)

## Contact Form Configuration

If you need to change the form endpoint:
- Update the `action` attribute in `index.html` (line 574)
- Update analytics tracking if implemented (line 285 in `script.js`)

## Cookie Consent & Privacy Compliance

The site implements a GDPR-compliant cookie consent banner:

**How it works:**
1. **Banner Display:** Shows after 1 second delay on first visit (if no consent stored)
2. **User Choice Stored:** Consent preference saved in `localStorage` as `'cookieConsent'`
3. **Google Analytics Loading:** Only loads after user accepts cookies
4. **Persistent:** Once user makes a choice, banner won't show again

**Implementation Details:**
- Cookie banner HTML: `index.html` lines 695-711
- Cookie banner styles: `styles.css` lines 3385-3526
- Cookie consent logic: `script.js` lines 1216-1271
- Google Analytics conditional loading: `index.html` lines 48-77

**Cookie Consent States:**
- `'accepted'` - Google Analytics loads, tracking enabled
- `'declined'` - No analytics loaded, no tracking cookies set
- `null` - No choice made yet, banner displays

**Testing Cookie Banner:**
To test the banner again after accepting/declining:
```javascript
localStorage.removeItem('cookieConsent');
// Refresh the page
```

## Analytics

Google Analytics 4 is configured:
- Tracking ID: `G-QRCWQG2FNW`
- Conditional loading based on cookie consent (see above)
- IP anonymization enabled by default
- Only loads when user accepts cookies via consent banner
