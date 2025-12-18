# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website for Hubert Zakrzewski, a web developer and project manager. The site is built with vanilla HTML, CSS, and JavaScript, featuring advanced animations and interactive elements. It's a static, single-page application with no build tools or dependencies.

**Live URL**: https://zakrzewskihubert.com/

## Development Commands

This project has no build process or package manager. Development is straightforward:

- **Local development**: Open `index.html` in a browser or use a local server (e.g., `python -m http.server` or VS Code Live Server extension)
- **Deploy**: Push to git - the site is hosted statically, files are served directly

## Architecture & Key Concepts

### File Structure
```
├── index.html              # Main portfolio page
├── privacy-policy.html     # Privacy policy page (Polish)
├── lawyers-landing.html    # Landing page for legal services case study
├── script.js              # All JavaScript functionality (~1270 lines)
├── styles.css             # All styles (~2400+ lines)
├── fonts/                 # Manrope (300,400,600,700) & Condenso fonts
├── images/                # Project screenshots and assets
└── icons/                 # SVG icons for skills section
```

### Design System

**Color Palette** (CSS variables in `:root`):
- `--bg-primary`: rgba(21, 21, 21, 1) - Main background
- `--text-primary`: rgba(247, 246, 239, 1) - Primary text
- `--text-secondary`: rgba(247, 246, 239, 0.7) - Secondary text
- `--text-tertiary`: rgba(247, 246, 239, 0.5) - Tertiary text
- `--accent`: rgba(247, 246, 239, 0.15) - Accent color

**Typography**:
- Primary font: Manrope (300, 400, 600, 700 weights)
- Display font: Condenso (used for hero title and headings)
- All fonts are self-hosted in `fonts/` directory

### Core JavaScript Architecture

The `script.js` file is organized into functional sections:

1. **Page Loader** (lines 7-70): Split-screen loading animation that hides after 300ms
2. **Smooth Scroll** (lines 76-100): Native smooth scrolling for anchor links
3. **Scroll Animations** (lines 106-174): GSAP ScrollTrigger animations for sections
4. **Icon Tiles** (lines 180-288): Backdrop blur effects and touch support for skill tiles
5. **Carousel** (lines 294-532): Custom finite carousel with drag/swipe support
6. **Project Modal** (lines 538-1214): Full-screen modal system with project content
7. **Cookie Consent** (lines 1220-1271): GDPR-compliant cookie banner

### Animation Libraries

The site uses external CDN libraries (loaded in `<head>`):
- **GSAP 3.12.5**: Core animation engine
- **ScrollTrigger**: Scroll-based animations
- **Splitting.js**: Text splitting for letter/word animations

### Key Interactive Features

**Liquid Glass Pills**: SVG-filtered decorative elements that animate on page load. They use `feTurbulence` and `feDisplacementMap` for organic liquid effect (defined in inline SVG filters in index.html:90-115).

**Custom Carousel**: Class-based carousel (`FiniteCarousel`) with:
- Drag/swipe support (mouse + touch)
- Edge resistance when dragging beyond bounds
- 15% threshold for slide transition
- Auto-snap to slides

**Project Modal System**: Full-screen modal with:
- Scroll lock when open (using `position: fixed` on body)
- Project data stored in `projectData` object (script.js:546-1077)
- Five projects: aswent, lumena, tintara, ges, cherry-detailing
- "Live Site" buttons with conditional behavior (some open URLs, 'aswent' shows dev popup)

**Button Text Animations**: All buttons use letter-by-letter animations with dual-block technique (creates duplicate text block for smooth transitions on hover).

## Important Patterns & Conventions

### Scroll Lock Pattern
When opening modals, the code preserves scroll position and prevents body scroll:
```javascript
scrollPosition = window.pageYOffset;
body.style.position = 'fixed';
body.style.top = `-${scrollPosition}px`;
```
On close, it restores scroll without smooth scrolling to avoid jarring UX.

### GSAP Animation Pattern
Animations use consistent easing (`sine.out`) and stagger timing:
- Default duration: 0.6-0.8s
- Stagger delays: 0.03s for letters, 0.12s for carousel slides
- ScrollTrigger start: `top 80-85%` (triggers before element fully visible)

### Touch Device Detection
The code distinguishes between desktop, tablet, and mobile:
```javascript
const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
const isMobileViewport = () => window.innerWidth <= 767;
```
Skill tiles behave differently: hover on desktop, click to expand on tablet, always expanded on mobile.

### Form Handling
Contact form (index.html:595-658) uses **Formspree** for submissions:
- Action URL: `https://formspree.io/f/xgvpbqkw`
- Includes honeypot field `_gotcha` for spam protection
- GDPR consent checkbox required before submission

## Analytics & Privacy

**Google Analytics**: GA4 (ID: `G-QRCWQG2FNW`)
- Only loads after user accepts cookies via banner
- Script initialization in index.html:48-76
- Cookie consent stored in `localStorage` as `cookieConsent`

**Content Security Policy**: Strict CSP defined in `<meta http-equiv>` (index.html:6):
- Scripts allowed from: self, cdnjs, unpkg, formspree, Google Analytics
- Connect allowed to: self, formspree, Google Analytics

## Responsive Breakpoints

While not explicitly defined as variables, the styles use these key breakpoints:
- **Mobile**: ≤767px (detected with `isMobileViewport()`)
- **Tablet**: 768px-1024px
- **Desktop**: >1024px

## Project Data Structure

Each project in `projectData` object has:
- `title`: Project name
- `year`: Year completed
- `tagline`: Short description
- `content`: HTML string with 8 standardized row sections:
  1. Hero (image + text intro)
  2. Full-width visual
  3. Challenge section (list + image)
  4. Brand applications (image + text)
  5. What we built (list + image)
  6. Timeline & stack details
  7. Full-width visual
  8. Footer credits

## Adding New Projects

To add a new project to the portfolio:

1. **Add carousel slide** in index.html after line 393:
   ```html
   <div class="carousel-slide scroll-animate" data-project="project-id">
   ```

2. **Add project data** to `projectData` object in script.js (after line 1077):
   ```javascript
   'project-id': {
       title: 'Project Name',
       year: '2025',
       tagline: 'Short description',
       content: `<!-- 8-row HTML structure -->`
   }
   ```

3. **Add project images** to `images/project-id/` directory

4. **(Optional) Add live link** to `projectLinks` object (script.js:1160-1165)

## Common Modifications

**Updating contact form**: Change Formspree endpoint in index.html:595
**Changing Google Analytics ID**: Update in index.html:69
**Adjusting animations**: Modify GSAP timeline in script.js:44-68
**Modifying colors**: Update CSS variables in styles.css:43-49

## Secondary Landing Pages

### Lawyers Landing Page (`lawyers-landing.html`)

A standalone landing page for legal web services, independent from the main portfolio:

**Design Philosophy**:
- Clean white theme with professional aesthetics
- Left-aligned text layout (no centered content)
- Manrope as primary font with Helvetica fallback
- Smooth button hover effects with subtle animations

**Content Structure**:
1. **Hero Section**: Value proposition with call-to-action buttons
2. **Stats Section**: Key market statistics (96%, 35%, 88%, 75%)
3. **Case Study**: Before/after comparison showing 12,100% lead increase
4. **Problems Section**: 6 pain points (missed calls, mobile optimization, etc.)
5. **Solutions Section**: 6-point solution architecture
6. **ROI Calculator**: Financial impact visualization (654,000 PLN annual cost)
7. **CTA Section**: Contact and consultation prompts

**Design Features**:
- CSS variables for consistent theming (white/gray palette with blue accent)
- Gradient overlays on image placeholders (blends background smoothly)
- Responsive grid layouts (auto-fit minmax patterns)
- No external dependencies except Google Fonts (Manrope)

**Note**: This is a self-contained page with inline styles - no dependency on main `styles.css`.

## Tech Stack Summary

- **HTML5**: Semantic markup with meta tags for SEO and Open Graph
- **CSS3**: Custom properties, flexbox, grid, advanced animations
- **Vanilla JavaScript**: ES6+ class-based architecture
- **GSAP 3.12.5**: Animation library
- **Splitting.js**: Text splitting utility
- **Formspree**: Form backend service
- **Google Analytics 4**: Web analytics
- **No build tools**: Direct file serving, no webpack/vite/etc.
