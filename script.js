// JavaScript for Zakrzewski Hubert Portfolio

/* ============================================ */
/* PAGE LOADER */
/* ============================================ */

window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    const body = document.body;

    // Add loading class to body
    body.classList.add('loading');

    // Initialize Splitting.js
    Splitting();

    // Wait a short moment, then trigger the loader animation
    setTimeout(() => {
        loader.classList.add('loaded');
        body.classList.remove('loading');
    }, 300);

    // Remove loader from DOM after animation completes
    setTimeout(() => {
        loader.style.display = 'none';
    }, 1100);

    // Show glass pills after layout is stable (after fonts are loaded)
    setTimeout(() => {
        const glassPills = document.querySelectorAll('.liquid-glass-pill');
        glassPills.forEach(pill => {
            pill.classList.add('visible');
        });
    }, 1200);

    // Hero text animations - start after page loader completes
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        const heroBody = document.querySelector('.hero-body');
        const heroButton = document.querySelector('.hero-cta');

        if (heroTitle && heroBody && heroButton) {
            // Create GSAP timeline with smooth sine.out easing
            const tl = gsap.timeline({ defaults: { ease: 'sine.out' } });

            // Animate title letters
            tl.to('.hero-title .char', {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.03
            });

            // Animate paragraph words (0.3s delay after title)
            tl.to('.hero-body .word', {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.02
            }, '+=0.1');

            // Animate button (0.4s delay after paragraph)
            tl.to('.hero-cta', {
                opacity: 1,
                y: 0,
                duration: 0.6
            }, '+=0.1');
        }
    }, 1100); // Start hero animations after loader is gone
});

/* ============================================ */
/* SMOOTH SCROLL FOR ANCHOR LINKS */
/* ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Get all anchor links that start with #
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');

            // Skip if it's just "#" or empty
            if (targetId === '#' || targetId === '') return;

            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                e.preventDefault();

                // Native smooth scroll - works beautifully with CSS scroll-behavior
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

/* ============================================ */
/* SCROLL ANIMATIONS */
/* ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Animate carousel slides all at once with 0.12s stagger
    const carouselSlides = document.querySelectorAll('.carousel-slide.scroll-animate');
    if (carouselSlides.length > 0) {
        gsap.fromTo(carouselSlides,
            {
                opacity: 0,
                y: 40
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'sine.out',
                stagger: 0.12,
                scrollTrigger: {
                    trigger: '.selected-work',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                }
            }
        );
    }

    // Animate other scroll-animate elements with smooth easing
    const otherAnimateElements = document.querySelectorAll('.scroll-animate:not(.carousel-slide)');
    otherAnimateElements.forEach((el) => {
        gsap.fromTo(el,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'sine.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    // Animate fade-only elements
    const fadeElements = document.querySelectorAll('.scroll-animate-fade');
    fadeElements.forEach((el) => {
        gsap.fromTo(el,
            {
                opacity: 0
            },
            {
                opacity: 1,
                duration: 1,
                ease: 'sine.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
});

/* ============================================ */
/* MAIN FUNCTIONALITY */
/* ============================================ */

// Icon tile backdrop blur and touch support
document.addEventListener('DOMContentLoaded', () => {
    // Icon tile backdrop blur and touch support
    const iconTiles = document.querySelectorAll('.icon-tile');
    const backdrop = document.querySelector('.skill-orbit-backdrop');

    // Detect if device is touch-enabled
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    const isMobileViewport = () => window.innerWidth <= 767;

    iconTiles.forEach(tile => {
        // Mouse events (desktop only - not mobile viewport)
        tile.addEventListener('mouseenter', () => {
            if (backdrop && !isTouchDevice && !isMobileViewport()) {
                backdrop.style.opacity = '1';
                backdrop.style.backdropFilter = 'blur(15px)';
                backdrop.style.background = 'rgba(0, 0, 0, 0.3)';
            }
        });

        tile.addEventListener('mouseleave', () => {
            if (backdrop && !isTouchDevice && !isMobileViewport()) {
                backdrop.style.opacity = '0';
                backdrop.style.backdropFilter = 'blur(0px)';
                backdrop.style.background = 'rgba(0, 0, 0, 0)';
            }
        });

        // Touch events (tablet only - not mobile viewport)
        if (isTouchDevice) {
            tile.addEventListener('click', (e) => {
                // Skip mobile viewport - tiles are always expanded there
                if (isMobileViewport()) {
                    return;
                }

                // Close all other tiles with smooth animation
                iconTiles.forEach(otherTile => {
                    if (otherTile !== tile) {
                        otherTile.classList.remove('active');
                    }
                });

                // Toggle this tile with smooth animation
                const isActive = tile.classList.contains('active');
                if (isActive) {
                    tile.classList.remove('active');
                    if (backdrop) {
                        // Smooth fade out for backdrop
                        requestAnimationFrame(() => {
                            backdrop.style.opacity = '0';
                            backdrop.style.backdropFilter = 'blur(0px)';
                            backdrop.style.background = 'rgba(0, 0, 0, 0)';
                        });
                    }
                } else {
                    tile.classList.add('active');
                    if (backdrop) {
                        // Smooth fade in for backdrop
                        requestAnimationFrame(() => {
                            backdrop.style.opacity = '1';
                            backdrop.style.backdropFilter = 'blur(15px)';
                            backdrop.style.background = 'rgba(0, 0, 0, 0.3)';
                        });
                    }
                }

                e.stopPropagation();
            });
        }
    });

    // Close all tiles when clicking outside (touch devices, not mobile viewport)
    if (isTouchDevice) {
        document.addEventListener('click', (e) => {
            // Skip mobile viewport
            if (isMobileViewport()) {
                return;
            }

            if (!e.target.closest('.icon-tile')) {
                iconTiles.forEach(tile => {
                    tile.classList.remove('active');
                });
                if (backdrop) {
                    // Smooth fade out for backdrop
                    requestAnimationFrame(() => {
                        backdrop.style.opacity = '0';
                        backdrop.style.backdropFilter = 'blur(0px)';
                        backdrop.style.background = 'rgba(0, 0, 0, 0)';
                    });
                }
            }
        });
    }

    // Contact form submission - Formspree integration
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            // Let Formspree handle the submission naturally
            // The form will submit to https://formspree.io/f/xgvpbqkw
            console.log('Form submitting to Formspree...');

            // Optional: Add analytics tracking here
            // Example: gtag('event', 'form_submit', { form_name: 'contact' });
        });
    }
});

/* ============================================ */
/* CAROUSEL FUNCTIONALITY */
/* ============================================ */

class FiniteCarousel {
    constructor(viewport, track) {
        this.viewport = viewport;
        this.track = track;
        this.slides = [...track.querySelectorAll('.carousel-slide')];
        this.currentIndex = 0;

        this.isDragging = false;
        this.startX = 0;
        this.currentX = 0;
        this.dragStartX = 0;
        this.hasMoved = false;

        this.slideWidth = this.slides[0]?.offsetWidth || 0;
        this.gap = 20;

        this.init();
    }

    init() {
        // Mouse events
        this.viewport.addEventListener('mousedown', this.onDragStart.bind(this));
        document.addEventListener('mousemove', this.onDragMove.bind(this));
        document.addEventListener('mouseup', this.onDragEnd.bind(this));

        // Touch events
        this.viewport.addEventListener('touchstart', this.onDragStart.bind(this), { passive: true });
        document.addEventListener('touchmove', this.onDragMove.bind(this), { passive: false });
        document.addEventListener('touchend', this.onDragEnd.bind(this));

        // Prevent clicks during drag
        this.slides.forEach(slide => {
            slide.addEventListener('click', (e) => {
                if (this.hasMoved) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        });

        // Recalculate on resize
        window.addEventListener('resize', () => {
            this.slideWidth = this.slides[0]?.offsetWidth || 0;
            this.snapToIndex(this.currentIndex, false);
        });
    }

    onDragStart(e) {
        this.isDragging = true;
        this.hasMoved = false;
        this.viewport.classList.add('dragging');
        this.track.classList.add('no-transition');

        this.startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        this.dragStartX = this.getCurrentTranslate();
    }

    onDragMove(e) {
        if (!this.isDragging) return;

        const currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
        const diff = currentX - this.startX;

        if (Math.abs(diff) > 3) {
            this.hasMoved = true;
            if (e.cancelable) {
                e.preventDefault();
            }
        }

        let newTranslate = this.dragStartX + diff;

        // Edge resistance
        const maxTranslate = 0;
        const minTranslate = -(this.slideWidth + this.gap) * (this.slides.length - 1);

        if (newTranslate > maxTranslate) {
            const excess = newTranslate - maxTranslate;
            newTranslate = maxTranslate + excess * 0.25;
        } else if (newTranslate < minTranslate) {
            const excess = minTranslate - newTranslate;
            newTranslate = minTranslate - excess * 0.25;
        }

        this.track.style.transform = `translateX(${newTranslate}px)`;
    }

    onDragEnd(e) {
        if (!this.isDragging) return;

        this.isDragging = false;
        this.viewport.classList.remove('dragging');
        this.track.classList.remove('no-transition');

        const currentTranslate = this.getCurrentTranslate();
        const diff = currentTranslate - this.dragStartX;
        const threshold = this.slideWidth * 0.15;

        if (Math.abs(diff) > threshold) {
            if (diff > 0 && this.currentIndex > 0) {
                this.currentIndex--;
            } else if (diff < 0 && this.currentIndex < this.slides.length - 1) {
                this.currentIndex++;
            }
        }

        this.snapToIndex(this.currentIndex);

        setTimeout(() => {
            this.hasMoved = false;
        }, 100);
    }

    getCurrentTranslate() {
        const transform = window.getComputedStyle(this.track).transform;
        if (transform === 'none') return 0;
        const matrix = transform.match(/matrix.*\((.+)\)/)[1].split(', ');
        return parseFloat(matrix[4]);
    }

    snapToIndex(index, animate = true) {
        const targetTranslate = -(this.slideWidth + this.gap) * index;

        if (!animate) {
            this.track.classList.add('no-transition');
        }

        this.track.style.transform = `translateX(${targetTranslate}px)`;
        this.currentIndex = index;

        if (!animate) {
            setTimeout(() => {
                this.track.classList.remove('no-transition');
            }, 50);
        }
    }
}

// Initialize carousel
document.addEventListener('DOMContentLoaded', () => {
    const viewport = document.querySelector('.carousel-viewport');
    const track = document.querySelector('.carousel-track');

    if (viewport && track) {
        new FiniteCarousel(viewport, track);
    }

    // Button text animation - split text into letters
    const animateButtons = document.querySelectorAll('.slide-btn, .hero-cta, .about-cta, .form-submit');

    animateButtons.forEach((button) => {
        // Skip if it's the hero CTA or about CTA (already has text splitting from earlier code)
        if (button.classList.contains('hero-cta') || button.classList.contains('about-cta')) {
            const textSpan = button.querySelector('.cta-text');
            if (textSpan && textSpan.innerText && !textSpan.querySelector('.block')) {
                let innerText = textSpan.innerText;
                textSpan.innerHTML = "";

                // Create wrapper for vertical stacking
                let wrapper = document.createElement("div");
                wrapper.style.display = "flex";
                wrapper.style.flexDirection = "column";

                // Create first block
                let textContainer1 = document.createElement("div");
                textContainer1.classList.add("block");
                for (let letter of innerText) {
                    let span = document.createElement("span");
                    span.innerText = letter.trim() === "" ? "\xa0" : letter;
                    span.classList.add("letter");
                    textContainer1.appendChild(span);
                }

                // Clone for second block
                let textContainer2 = textContainer1.cloneNode(true);

                wrapper.appendChild(textContainer1);
                wrapper.appendChild(textContainer2);
                textSpan.appendChild(wrapper);
            }
        } else if (button.classList.contains('form-submit')) {
            // Handle form submit button
            const textSpan = button.querySelector('.submit-text');
            if (textSpan && textSpan.innerText && !textSpan.querySelector('.block')) {
                let innerText = textSpan.innerText;
                textSpan.innerHTML = "";

                // Create wrapper for vertical stacking
                let wrapper = document.createElement("div");
                wrapper.style.display = "flex";
                wrapper.style.flexDirection = "column";

                // Create first block
                let textContainer1 = document.createElement("div");
                textContainer1.classList.add("block");
                for (let letter of innerText) {
                    let span = document.createElement("span");
                    span.innerText = letter.trim() === "" ? "\xa0" : letter;
                    span.classList.add("letter");
                    textContainer1.appendChild(span);
                }

                // Clone for second block
                let textContainer2 = textContainer1.cloneNode(true);

                wrapper.appendChild(textContainer1);
                wrapper.appendChild(textContainer2);
                textSpan.appendChild(wrapper);
            }
        } else {
            // For slide buttons
            if (button.innerText && !button.querySelector('.block')) {
                let innerText = button.innerText;
                button.innerHTML = "";

                // Create wrapper for vertical stacking
                let wrapper = document.createElement("div");
                wrapper.classList.add("btn-text-wrapper");

                // Create first block
                let textContainer1 = document.createElement("div");
                textContainer1.classList.add("block");
                for (let letter of innerText) {
                    let span = document.createElement("span");
                    span.innerText = letter.trim() === "" ? "\xa0" : letter;
                    span.classList.add("letter");
                    textContainer1.appendChild(span);
                }

                // Clone for second block
                let textContainer2 = textContainer1.cloneNode(true);

                wrapper.appendChild(textContainer1);
                wrapper.appendChild(textContainer2);
                button.appendChild(wrapper);
            }
        }
    });
});

/* ============================================ */
/* PROJECT MODAL FUNCTIONALITY */
/* ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.getElementById('modalClose');
    const body = document.body;
    let scrollPosition = 0;

    // Project data - you can customize this with actual project content
    const projectData = {
        'aswent': {
            title: 'ASWENT',
            year: '2025',
            tagline: 'Brand website for 20+ year engineering firm',
            content: `
                <!-- ROW 1: Image left, Text right -->
                <div class="project-row project-row-1">
                    <div class="image-clip reveal-text">
                        <img src="images/aswent/worker.webp" alt="ASWENT Worker">
                    </div>
                    <div class="text-block">
                        <h1 class="reveal-text">ASWENT™</h1>
                        <h2 class="reveal-text">Branding & Web Development / 2025</h2>
                        <h2 class="reveal-text">Industry: Ventilation and Construction</h2>
                        <p class="reveal-text">A comprehensive brand identity and digital presence for a 20-year engineering firm specializing in ventilation systems and industrial solutions.</p>
                    </div>
                </div>

                <!-- ROW 2: Full-width image -->
                <div class="project-row project-row-2">
                    <div class="image-clip">
                        <img src="images/aswent/logo-in-flare.webp" alt="ASWENT Logo">
                    </div>
                </div>

                <!-- ROW 3: Heading + list left, Image right -->
                <div class="project-row project-row-3">
                    <div class="text-block">
                        <h3>The Challenge</h3>
                        <ul>
                            <li>Modernize outdated brand identity while maintaining professional credibility</li>
                            <li>Create cohesive visual system across digital and physical touchpoints</li>
                            <li>Differentiate from competitors in industrial engineering sector</li>
                            <li>Build scalable design system for future brand growth</li>
                        </ul>
                    </div>
                    <div class="image-clip">
                        <img src="images/aswent/aswent-logo.webp" alt="ASWENT Logo">
                    </div>
                </div>

                <!-- ROW 4: Image left, Heading + paragraph right -->
                <div class="project-row project-row-4">
                    <div class="image-clip">
                        <img src="images/aswent/aswent-cards.webp" alt="ASWENT Business Cards">
                    </div>
                    <div class="text-block">
                        <h3>Brand Applications</h3>
                        <p>The new visual identity was applied across all brand touchpoints, from business stationery to marketing materials, creating a cohesive and professional presence in the industry.</p>
                    </div>
                </div>

                <!-- ROW 5: "What We Built" + list left, Image right -->
                <div class="project-row project-row-5">
                    <div class="text-block">
                        <h3>What We Built</h3>
                        <ul>
                            <li>Brand strategy and positioning framework</li>
                            <li>Complete visual identity system</li>
                            <li>Custom logo design and brand guidelines</li>
                            <li>Business stationery and collateral</li>
                            <li>Marketing materials and templates</li>
                            <li>Responsive website with CMS</li>
                        </ul>
                    </div>
                    <div class="image-clip">
                        <img src="images/aswent/aswent-tshirt.webp" alt="ASWENT T-Shirt">
                    </div>
                </div>

                <!-- ROW 6: Timeline & Details left, Visual right -->
                <div class="project-row project-row-6">
                    <div class="details-column">
                        <!-- Timeline Section -->
                        <div class="project-timeline-section">
                            <h3>Timeline</h3>
                            <div class="timeline-container">
                                <!-- Phase 1: Branding (33.33% of total, starts at 0%) -->
                                <div class="timeline-phase">
                                    <div class="timeline-phase-header">
                                        <span class="timeline-phase-name">Branding</span>
                                        <span class="timeline-phase-duration">2 weeks</span>
                                    </div>
                                    <div class="timeline-phase-track">
                                        <div class="timeline-phase-bar" style="margin-left: 0%; width: 33.33%;"></div>
                                    </div>
                                </div>

                                <!-- Phase 2: Design (33.33% of total, starts at 33.33%) -->
                                <div class="timeline-phase">
                                    <div class="timeline-phase-header">
                                        <span class="timeline-phase-name">Design</span>
                                        <span class="timeline-phase-duration">2 weeks</span>
                                    </div>
                                    <div class="timeline-phase-track">
                                        <div class="timeline-phase-bar" style="margin-left: 33.33%; width: 33.33%;"></div>
                                    </div>
                                </div>

                                <!-- Phase 3: Development (33.34% of total, starts at 66.66%) -->
                                <div class="timeline-phase">
                                    <div class="timeline-phase-header">
                                        <span class="timeline-phase-name">Development</span>
                                        <span class="timeline-phase-duration">2 weeks</span>
                                    </div>
                                    <div class="timeline-phase-track">
                                        <div class="timeline-phase-bar" style="margin-left: 66.66%; width: 33.34%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Stack Info -->
                        <div class="project-stack-info">
                            <div class="stack-info-row">
                                <span class="stack-info-label">Stack</span>
                                <span class="stack-info-value">HTML / CSS / JavaScript</span>
                            </div>
                            <div class="stack-info-row">
                                <span class="stack-info-label">AI-Assisted</span>
                                <span class="stack-info-value">Cursor, Claude Code</span>
                            </div>
                            <div class="stack-info-row">
                                <span class="stack-info-label">Tools</span>
                                <span class="stack-info-value">Figma, Photoshop, Illustrator</span>
                            </div>
                        </div>

                        <!-- Launch Note -->
                        <p class="project-launch-note">
                            Launched Q1 2025. The new digital presence positions ASWENT as the modern, credible partner they've always been — from invisible to discoverable, from outdated to industry-leading.
                        </p>
                    </div>

                    <!-- Visual -->
                    <div class="image-clip">
                        <img src="images/aswent/aswent-workers.webp" alt="ASWENT Project Visual">
                    </div>
                </div>

                <!-- ROW 7: Full-width large visual -->
                <div class="project-row project-row-7">
                    <div class="image-clip">
                        <img src="images/aswent/light-box.webp" alt="ASWENT Light Box">
                    </div>
                </div>

                <!-- ROW 8: Footer -->
                <div class="project-row project-row-8">
                    <p>Designed and developed by Hubert Zakrzewski</p>
                    <p>© 2025 All rights reserved</p>
                </div>
            `
        },
        'lumena': {
            title: 'Lumena',
            year: '2025',
            tagline: 'Trusted European agency for premium elderly care',
            content: `
                <!-- ROW 1: Image left, Text right -->
                <div class="project-row project-row-1">
                    <div class="image-clip reveal-text">
                        <img src="images/lumena/clients_book.webp" alt="Lumena Client Book">
                    </div>
                    <div class="text-block">
                        <h1 class="reveal-text">LUMENA</h1>
                        <h2 class="reveal-text">Branding & Web Development / 2025</h2>
                        <h2 class="reveal-text">Industry: Elderly Care Services</h2>
                        <p class="reveal-text">A comprehensive brand identity and digital platform for a trusted European agency specializing in premium elderly care services, connecting families with qualified caregivers.</p>
                    </div>
                </div>

                <!-- ROW 2: Full-width image -->
                <div class="project-row project-row-2">
                    <div class="image-clip">
                        <img src="images/lumena/Billboard_Mockup_3.webp" alt="Lumena Billboard">
                    </div>
                </div>

                <!-- ROW 3: Heading + list left, Image right -->
                <div class="project-row project-row-3">
                    <div class="text-block">
                        <h3>The Challenge</h3>
                        <ul>
                            <li>Build trust and credibility in sensitive elderly care sector</li>
                            <li>Create warm, approachable brand that maintains professionalism</li>
                            <li>Design intuitive platform for connecting families with caregivers</li>
                            <li>Implement automation workflows for lead management and client onboarding</li>
                        </ul>
                    </div>
                    <div class="image-clip">
                        <img src="images/lumena/Business_Card_Mockup_85x55.webp" alt="Lumena Business Cards">
                    </div>
                </div>

                <!-- ROW 4: Image left, Heading + paragraph right -->
                <div class="project-row project-row-4">
                    <div class="image-clip">
                        <img src="images/lumena/Envelopes_Mockup_1.webp" alt="Lumena Envelopes">
                    </div>
                    <div class="text-block">
                        <h3>Brand Applications</h3>
                        <p>The brand identity was thoughtfully applied across all touchpoints, from printed materials to digital platforms, ensuring consistent communication of Lumena's caring, professional values across every client interaction.</p>
                    </div>
                </div>

                <!-- ROW 5: "What We Built" + list left, Image right -->
                <div class="project-row project-row-5">
                    <div class="text-block">
                        <h3>What We Built</h3>
                        <ul>
                            <li>Brand strategy and positioning framework</li>
                            <li>Complete visual identity system</li>
                            <li>Custom logo design and brand guidelines</li>
                            <li>Business stationery and marketing collateral</li>
                            <li>Responsive website built in Webflow</li>
                            <li>Make.com automation for client workflows</li>
                        </ul>
                    </div>
                    <div class="image-clip">
                        <img src="images/lumena/Cropped_T-Shirt_Mockup.webp" alt="Lumena T-Shirt">
                    </div>
                </div>

                <!-- ROW 6: Timeline & Details left, Visual right -->
                <div class="project-row project-row-6">
                    <div class="details-column">
                        <!-- Timeline Section -->
                        <div class="project-timeline-section">
                            <h3>Timeline</h3>
                            <div class="timeline-container">
                                <!-- Phase 1: Branding (30% of total, starts at 0%) -->
                                <div class="timeline-phase">
                                    <div class="timeline-phase-header">
                                        <span class="timeline-phase-name">Branding</span>
                                        <span class="timeline-phase-duration">3 weeks</span>
                                    </div>
                                    <div class="timeline-phase-track">
                                        <div class="timeline-phase-bar" style="margin-left: 0%; width: 30%;"></div>
                                    </div>
                                </div>

                                <!-- Phase 2: Design (35% of total, starts at 30%) -->
                                <div class="timeline-phase">
                                    <div class="timeline-phase-header">
                                        <span class="timeline-phase-name">Design</span>
                                        <span class="timeline-phase-duration">3.5 weeks</span>
                                    </div>
                                    <div class="timeline-phase-track">
                                        <div class="timeline-phase-bar" style="margin-left: 30%; width: 35%;"></div>
                                    </div>
                                </div>

                                <!-- Phase 3: Development (35% of total, starts at 65%) -->
                                <div class="timeline-phase">
                                    <div class="timeline-phase-header">
                                        <span class="timeline-phase-name">Development</span>
                                        <span class="timeline-phase-duration">3.5 weeks</span>
                                    </div>
                                    <div class="timeline-phase-track">
                                        <div class="timeline-phase-bar" style="margin-left: 65%; width: 35%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Stack Info -->
                        <div class="project-stack-info">
                            <div class="stack-info-row">
                                <span class="stack-info-label">Stack</span>
                                <span class="stack-info-value">Webflow / Make / JavaScript</span>
                            </div>
                            <div class="stack-info-row">
                                <span class="stack-info-label">AI-Assisted</span>
                                <span class="stack-info-value">ChatGPT</span>
                            </div>
                            <div class="stack-info-row">
                                <span class="stack-info-label">Tools</span>
                                <span class="stack-info-value">Adobe Stack, Webflow, Make</span>
                            </div>
                        </div>

                        <!-- Launch Note -->
                        <p class="project-launch-note">
                            Launched Q1 2025. The new digital platform connects families with trusted caregivers across Europe, bringing transparency and professionalism to premium elderly care services.
                        </p>
                    </div>

                    <!-- Visual -->
                    <div class="image-clip">
                        <img src="images/lumena/Free_Folder_Mockup_2.webp" alt="Lumena Folder">
                    </div>
                </div>

                <!-- ROW 7: Full-width large visual -->
                <div class="project-row project-row-7">
                    <div class="image-clip">
                        <img src="images/lumena/Glued_Poster_Mockup_no_2.webp" alt="Lumena Poster">
                    </div>
                </div>

                <!-- ROW 8: Footer -->
                <div class="project-row project-row-8">
                    <p>Designed and developed by Hubert Zakrzewski</p>
                    <p>© 2025 All rights reserved</p>
                </div>
            `
        },
        'tintara': {
            title: 'Tintara™',
            year: '2025',
            tagline: 'Brand website for windows and foils company',
            content: `
                <!-- ROW 1: Image left, Text right -->
                <div class="project-row project-row-1">
                    <div class="image-clip reveal-text">
                        <img src="images/tintara/hero-image.webp" alt="Tintara Hero">
                    </div>
                    <div class="text-block">
                        <h1 class="reveal-text">TINTARA™</h1>
                        <h2 class="reveal-text">Branding & Web Development / 2025</h2>
                        <h2 class="reveal-text">Industry: Windows and Foils</h2>
                        <p class="reveal-text">A comprehensive brand identity and digital presence for a professional windows and architectural foils company, combining modern design with functional web solutions.</p>
                    </div>
                </div>

                <!-- ROW 2: Full-width image -->
                <div class="project-row project-row-2">
                    <div class="image-clip">
                        <img src="images/tintara/tintara_strona_glowna.webp" alt="Tintara Website">
                    </div>
                </div>

                <!-- ROW 3: Heading + list left, Image right -->
                <div class="project-row project-row-3">
                    <div class="text-block">
                        <h3>The Challenge</h3>
                        <ul>
                            <li>Create distinctive brand identity in competitive windows and foils market</li>
                            <li>Develop intuitive website showcasing product range and technical specifications</li>
                            <li>Build scalable design system for future product launches</li>
                            <li>Establish professional digital presence with Webflow platform</li>
                        </ul>
                    </div>
                    <div class="image-clip">
                        <img src="images/tintara/logo-creation.webp" alt="Tintara Logo">
                    </div>
                </div>

                <!-- ROW 4: Image left, Heading + paragraph right -->
                <div class="project-row project-row-4">
                    <div class="image-clip">
                        <img src="images/tintara/business-cards.webp" alt="Tintara Business Cards">
                    </div>
                    <div class="text-block">
                        <h3>Brand Applications</h3>
                        <p>The visual identity was carefully applied across all brand touchpoints, from business cards to marketing materials, ensuring consistent brand recognition and professional presentation in the architecture and construction industry.</p>
                    </div>
                </div>

                <!-- ROW 5: "What We Built" + list left, Image right -->
                <div class="project-row project-row-5">
                    <div class="text-block">
                        <h3>What We Built</h3>
                        <ul>
                            <li>Complete visual identity and brand guidelines</li>
                            <li>Custom logo design and typography system</li>
                            <li>Business stationery and marketing materials</li>
                            <li>Responsive website built in Webflow</li>
                            <li>Product catalog with technical specifications</li>
                            <li>Custom JavaScript interactions and animations</li>
                        </ul>
                    </div>
                    <div class="image-clip">
                        <img src="images/tintara/fonts.webp" alt="Tintara Typography">
                    </div>
                </div>

                <!-- ROW 6: Timeline & Details left, Visual right -->
                <div class="project-row project-row-6">
                    <div class="details-column">
                        <!-- Timeline Section -->
                        <div class="project-timeline-section">
                            <h3>Timeline</h3>
                            <div class="timeline-container">
                                <!-- Phase 1: Branding (30% of total, starts at 0%) -->
                                <div class="timeline-phase">
                                    <div class="timeline-phase-header">
                                        <span class="timeline-phase-name">Branding</span>
                                        <span class="timeline-phase-duration">2.5 weeks</span>
                                    </div>
                                    <div class="timeline-phase-track">
                                        <div class="timeline-phase-bar" style="margin-left: 0%; width: 30%;"></div>
                                    </div>
                                </div>

                                <!-- Phase 2: Design (35% of total, starts at 30%) -->
                                <div class="timeline-phase">
                                    <div class="timeline-phase-header">
                                        <span class="timeline-phase-name">Design</span>
                                        <span class="timeline-phase-duration">3 weeks</span>
                                    </div>
                                    <div class="timeline-phase-track">
                                        <div class="timeline-phase-bar" style="margin-left: 30%; width: 35%;"></div>
                                    </div>
                                </div>

                                <!-- Phase 3: Development (35% of total, starts at 65%) -->
                                <div class="timeline-phase">
                                    <div class="timeline-phase-header">
                                        <span class="timeline-phase-name">Development</span>
                                        <span class="timeline-phase-duration">3 weeks</span>
                                    </div>
                                    <div class="timeline-phase-track">
                                        <div class="timeline-phase-bar" style="margin-left: 65%; width: 35%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Stack Info -->
                        <div class="project-stack-info">
                            <div class="stack-info-row">
                                <span class="stack-info-label">Stack</span>
                                <span class="stack-info-value">Webflow + JavaScript</span>
                            </div>
                            <div class="stack-info-row">
                                <span class="stack-info-label">AI-Assisted</span>
                                <span class="stack-info-value">Gemini</span>
                            </div>
                            <div class="stack-info-row">
                                <span class="stack-info-label">Tools</span>
                                <span class="stack-info-value">Figma, Adobe Stack, Webflow</span>
                            </div>
                        </div>

                        <!-- Launch Note -->
                        <p class="project-launch-note">
                            Launched Q1 2025. The new digital presence positions Tintara as a modern, professional partner in the windows and architectural foils industry with a scalable platform for future growth.
                        </p>
                    </div>

                    <!-- Visual -->
                    <div class="image-clip">
                        <img src="images/tintara/tape.webp" alt="Tintara Brand Visual">
                    </div>
                </div>

                <!-- ROW 7: Full-width large visual -->
                <div class="project-row project-row-7">
                    <div class="image-clip">
                        <img src="images/tintara/fly-design.webp" alt="Tintara Marketing Materials">
                    </div>
                </div>

                <!-- ROW 8: Footer -->
                <div class="project-row project-row-8">
                    <p>Designed and developed by Hubert Zakrzewski</p>
                    <p>© 2025 All rights reserved</p>
                </div>
            `
        },
        'ges': {
            title: 'GES',
            year: '2025',
            tagline: 'Brand website for hydraulics and construction company',
            content: `
                <!-- ROW 1: Image left, Text right -->
                <div class="project-row project-row-1">
                    <div class="image-clip reveal-text">
                        <img src="images/ges/ges-hero.webp" alt="GES Hero">
                    </div>
                    <div class="text-block">
                        <h1 class="reveal-text">GES</h1>
                        <h2 class="reveal-text">Branding & Web Development / 2025</h2>
                        <h2 class="reveal-text">Industry: Hydraulics and Construction</h2>
                        <p class="reveal-text">A professional website for a hydraulics and construction company, showcasing their technical expertise and portfolio of completed projects with modern web technologies.</p>
                    </div>
                </div>

                <!-- Coming Soon Notice -->
                <div class="project-row project-row-notice">
                    <div class="project-notice">
                        <h3>Full Case Study Coming Soon</h3>
                        <p>The complete project breakdown with process, challenges, and detailed insights will be published shortly. In the meantime, check out the live website to see the final result.</p>
                        <a href="https://gesgreen.pl/" target="_blank" rel="noopener noreferrer" class="notice-link">Visit Live Website →</a>
                    </div>
                </div>

                <!-- ROW 8: Footer -->
                <div class="project-row project-row-8">
                    <p>Designed and developed by Hubert Zakrzewski</p>
                    <p>© 2025 All rights reserved</p>
                </div>
            `
        },
        'cherry-detailing': {
            title: 'Cherry Detailing',
            year: '2025',
            tagline: 'Brand website for premium auto detailing studio',
            content: `
                <!-- ROW 1: Image left, Text right -->
                <div class="project-row project-row-1">
                    <div class="image-clip reveal-text">
                        <img src="images/cherry/cherry_hero.webp" alt="Cherry Detailing Hero">
                    </div>
                    <div class="text-block">
                        <h1 class="reveal-text">CHERRY DETAILING</h1>
                        <h2 class="reveal-text">Branding & Web Development / 2025</h2>
                        <h2 class="reveal-text">Industry: Auto Detailing Services</h2>
                        <p class="reveal-text">A premium auto detailing studio website featuring elegant design and smooth user interactions. The site highlights their services with beautiful imagery and clean layouts that reflect the premium nature of their detailing services.</p>
                    </div>
                </div>

                <!-- Coming Soon Notice -->
                <div class="project-row project-row-notice">
                    <div class="project-notice">
                        <h3>Full Case Study Coming Soon</h3>
                        <p>The complete project breakdown with process, challenges, and detailed insights will be published shortly. In the meantime, check out the live website to see the final result.</p>
                        <a href="https://www.detailingcherry.com/" target="_blank" rel="noopener noreferrer" class="notice-link">Visit Live Website →</a>
                    </div>
                </div>

                <!-- ROW 8: Footer -->
                <div class="project-row project-row-8">
                    <p>Designed and developed by Hubert Zakrzewski</p>
                    <p>© 2025 All rights reserved</p>
                </div>
            `
        },
        'finizen': {
            title: 'Finizen',
            year: '2025',
            tagline: 'Productivity app with pomodoro timer and goal tracking',
            content: `
                <!-- ROW 1: Image left, Text right -->
                <div class="project-row project-row-1">
                    <div class="image-clip reveal-text">
                        <img src="images/finizen/finizen_opening_cover.webp" alt="Finizen App Interface">
                    </div>
                    <div class="text-block">
                        <h1 class="reveal-text">FINIZEN</h1>
                        <h2 class="reveal-text">Product Design & Development / 2025</h2>
                        <h2 class="reveal-text">Type: Productivity & Time Management App</h2>
                        <p class="reveal-text">A comprehensive productivity application that combines goal tracking, pomodoro time blocking, and ambient soundscapes to help users stay focused and measure their progress in real-time.</p>
                    </div>
                </div>

                <!-- ROW 2: Full-width image -->
                <div class="project-row project-row-2">
                    <div class="image-clip">
                        <img src="images/finizen/finizen_image_1.webp" alt="Finizen App Dashboard">
                    </div>
                </div>

                <!-- ROW 3: Heading + list left, Image right -->
                <div class="project-row project-row-3">
                    <div class="text-block">
                        <h3>The Challenge</h3>
                        <ul>
                            <li>Create intuitive time tracking that doesn't interrupt workflow</li>
                            <li>Build flexible goal system supporting both monthly and daily objectives</li>
                            <li>Design bilingual interface (Polish/English) with seamless language switching</li>
                            <li>Integrate ambient sound selection without cluttering the minimal UI</li>
                        </ul>
                    </div>
                    <div class="image-clip">
                        <img src="images/finizen/finizen_goals_and_limits.webp" alt="Finizen Goals Interface">
                    </div>
                </div>

                <!-- ROW 4: Image left, Heading + paragraph right -->
                <div class="project-row project-row-4">
                    <div class="image-clip">
                        <img src="images/finizen/finizen_black_mode.webp" alt="Finizen Dark Mode">
                    </div>
                    <div class="text-block">
                        <h3>Design Philosophy</h3>
                        <p>The interface follows a minimal, distraction-free design philosophy with support for both light and dark modes. Every interaction is designed to keep users in flow state, with visual feedback that informs without interrupting focus.</p>
                    </div>
                </div>

                <!-- ROW 5: "What We Built" + list left, Image right -->
                <div class="project-row project-row-5">
                    <div class="text-block">
                        <h3>What We Built</h3>
                        <ul>
                            <li>Pomodoro timer with customizable time blocks</li>
                            <li>Real-time tracking of hours and minutes spent on tasks</li>
                            <li>Monthly and daily goal management system</li>
                            <li>Bilingual interface (Polish/English)</li>
                            <li>Ambient sound selection for focus enhancement</li>
                            <li>Responsive design optimized for desktop workflows</li>
                        </ul>
                    </div>
                    <div class="image-clip">
                        <img src="images/finizen/finizen_icon_set.webp" alt="Finizen Icon Set">
                    </div>
                </div>

                <!-- ROW 6: Timeline & Details left, Visual right -->
                <div class="project-row project-row-6">
                    <div class="details-column">
                        <!-- Timeline Section -->
                        <div class="project-timeline-section">
                            <h3>Timeline</h3>
                            <div class="timeline-container">
                                <!-- Phase 1: Concept (20% of total, starts at 0%) -->
                                <div class="timeline-phase">
                                    <div class="timeline-phase-header">
                                        <span class="timeline-phase-name">Concept</span>
                                        <span class="timeline-phase-duration">1 day</span>
                                    </div>
                                    <div class="timeline-phase-track">
                                        <div class="timeline-phase-bar" style="margin-left: 0%; width: 20%;"></div>
                                    </div>
                                </div>

                                <!-- Phase 2: Design (20% of total, starts at 20%) -->
                                <div class="timeline-phase">
                                    <div class="timeline-phase-header">
                                        <span class="timeline-phase-name">Design</span>
                                        <span class="timeline-phase-duration">1 day</span>
                                    </div>
                                    <div class="timeline-phase-track">
                                        <div class="timeline-phase-bar" style="margin-left: 20%; width: 20%;"></div>
                                    </div>
                                </div>

                                <!-- Phase 3: Prototype (60% of total, starts at 40%) -->
                                <div class="timeline-phase">
                                    <div class="timeline-phase-header">
                                        <span class="timeline-phase-name">Prototype</span>
                                        <span class="timeline-phase-duration">3 days</span>
                                    </div>
                                    <div class="timeline-phase-track">
                                        <div class="timeline-phase-bar" style="margin-left: 40%; width: 60%;"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Stack Info -->
                        <div class="project-stack-info">
                            <div class="stack-info-row">
                                <span class="stack-info-label">Stack</span>
                                <span class="stack-info-value">React / JavaScript / Tailwind</span>
                            </div>
                            <div class="stack-info-row">
                                <span class="stack-info-label">AI-Assisted</span>
                                <span class="stack-info-value">Claude Code, Gemini 3.0</span>
                            </div>
                            <div class="stack-info-row">
                                <span class="stack-info-label">Tools</span>
                                <span class="stack-info-value">Antigravity, Figma, Netlify</span>
                            </div>
                        </div>

                        <!-- Launch Note -->
                        <p class="project-launch-note">
                            Launched Q1 2025. Finizen represents a new approach to productivity tools—one that respects your focus while providing the structure needed to accomplish meaningful work.
                        </p>
                    </div>

                    <!-- Visual -->
                    <div class="image-clip">
                        <img src="images/finizen/finizen_ending_cover.webp" alt="Finizen App Overview">
                    </div>
                </div>

                <!-- ROW 7: Full-width large visual -->
                <div class="project-row project-row-7">
                    <div class="image-clip">
                        <img src="images/finizen/finizen_cover.webp" alt="Finizen Hero Visual">
                    </div>
                </div>

                <!-- ROW 8: Footer -->
                <div class="project-row project-row-8">
                    <p>Designed and developed by Hubert Zakrzewski</p>
                    <p>© 2025 All rights reserved</p>
                </div>
            `
        }
    };

    // Open modal function
    function openModal(projectId) {
        const project = projectData[projectId];
        if (!project) return;

        // Save current scroll position
        scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

        // Load project content
        modalContent.innerHTML = project.content;

        // Set data attribute for project-specific styling
        modal.setAttribute('data-project', projectId);

        // Lock body scroll completely
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        body.style.position = 'fixed';
        body.style.top = `-${scrollPosition}px`;
        body.style.width = '100%';
        body.style.overflow = 'hidden';
        body.style.paddingRight = `${scrollbarWidth}px`;

        // Show modal
        requestAnimationFrame(() => {
            modal.classList.add('active');

            // Reset scroll positions after modal is shown
            requestAnimationFrame(() => {
                const panel = document.querySelector('.project-modal-panel');
                if (panel) panel.scrollTop = 0;
                if (modalContent) modalContent.scrollTop = 0;
            });
        });
    }

    // Close modal function
    function closeModal() {
        modal.classList.remove('active');

        // Wait for animation to complete before restoring scroll
        setTimeout(() => {
            // Temporarily disable smooth scrolling for instant position restore
            const htmlElement = document.documentElement;
            const originalScrollBehavior = htmlElement.style.scrollBehavior;
            htmlElement.style.scrollBehavior = 'auto';

            // Restore body scroll
            body.style.position = '';
            body.style.top = '';
            body.style.width = '';
            body.style.overflow = '';
            body.style.paddingRight = '';

            // Remove data attribute
            modal.removeAttribute('data-project');

            // Restore scroll position instantly (no smooth scroll)
            window.scrollTo(0, scrollPosition);

            // Re-enable smooth scrolling after position is restored
            setTimeout(() => {
                htmlElement.style.scrollBehavior = originalScrollBehavior || 'smooth';
            }, 50);
        }, 500); // Match modal transition duration
    }

    // Handle "Open Project" button clicks
    const projectButtons = document.querySelectorAll('.slide-btn.primary');
    projectButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const slide = button.closest('.carousel-slide');
            const projectId = slide.getAttribute('data-project');
            if (projectId) {
                openModal(projectId);
            }
        });
    });

    // Handle "Live Site" button clicks
    const liveSiteButtons = document.querySelectorAll('.slide-btn.secondary');
    const projectLinks = {
        'finizen': 'https://finizen.netlify.app',
        'tintara': 'https://www.tintara.pl/',
        'ges': 'https://gesgreen.pl/',
        'lumena': 'https://www.lumenacare.eu/',
        'cherry-detailing': 'https://www.detailingcherry.com/'
    };

    liveSiteButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const slide = button.closest('.carousel-slide');
            const projectId = slide.getAttribute('data-project');

            if (projectId === 'aswent') {
                // Show "In development" popup for Aswent
                showDevPopup();
            } else if (projectLinks[projectId]) {
                // Open link in new tab for other projects
                window.open(projectLinks[projectId], '_blank', 'noopener,noreferrer');
            }
        });
    });

    // Show development popup function
    function showDevPopup() {
        const popup = document.getElementById('devPopup');
        if (!popup) return;

        popup.classList.add('active');

        // Auto-hide after 2.5 seconds
        setTimeout(() => {
            popup.classList.remove('active');
        }, 2500);
    }

    // Close button click
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Click outside panel to close
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
});

/* ============================================ */
/* COOKIE CONSENT BANNER */
/* ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    const cookieBanner = document.getElementById('cookieBanner');
    const acceptBtn = document.getElementById('cookieAccept');
    const declineBtn = document.getElementById('cookieDecline');

    // Check if user has already made a choice
    const cookieConsent = localStorage.getItem('cookieConsent');

    if (!cookieConsent) {
        // Show banner after a short delay for better UX
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    // Handle Accept button
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            // Save consent
            localStorage.setItem('cookieConsent', 'accepted');

            // Hide banner
            cookieBanner.classList.remove('show');

            // Load Google Analytics
            if (typeof loadGoogleAnalytics === 'function') {
                loadGoogleAnalytics();
            }

            // Optional: Track consent acceptance
            if (typeof gtag === 'function') {
                gtag('event', 'cookie_consent', {
                    'consent_action': 'accepted'
                });
            }
        });
    }

    // Handle Decline button
    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            // Save decline
            localStorage.setItem('cookieConsent', 'declined');

            // Hide banner
            cookieBanner.classList.remove('show');

            // Optional: You might want to disable any analytics here
            console.log('User declined cookie consent');
        });
    }
});