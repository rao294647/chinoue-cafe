/**
 * CHINOUE Café - GSAP Animation Engine
 * Replicating Brars.com motion rhythm and parallax depth.
 */

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Animations = (() => {
    
    const init = () => {
        initHeroParallax();
        initStoryScroll();
        initMenuStream();
        initReviewsReveal();
        initGlobalParticles();
    };

    /**
     * Hero Cinematic Parallax
     * 5-layered depth with asynchronous movement.
     */
    const initHeroParallax = () => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".hero",
                start: "top top",
                end: "bottom top",
                scrub: 1
            }
        });

        // L1: Background (Slow drift)
        tl.to(".hero__layer--bg", { y: "15%", ease: "none" }, 0);
        
        // L2: Back Typography (Deep Parallax)
        tl.to(".hero__layer--typography-back", { 
            y: "-25%", 
            scale: 1.2, 
            opacity: 0, 
            ease: "none" 
        }, 0);

        // L3: Main Product (Anchor)
        tl.to(".hero__layer--product", { 
            y: "-15%", 
            scale: 1.1, 
            rotate: 5,
            ease: "none" 
        }, 0);

        // L4: Front Typography (Opposition)
        tl.to(".hero__layer--typography-front", { 
            y: "-40%", 
            scale: 0.9,
            opacity: 0.2,
            ease: "none" 
        }, 0);

        // L5: High-speed Floaters (Kinetic)
        tl.to(".accent--1", { y: "-300px", x: "-50px", rotate: -45, ease: "none" }, 0);
        tl.to(".accent--2", { y: "-400px", x: "80px", rotate: 60, ease: "none" }, 0);
        tl.to(".accent--3", { y: "-250px", x: "30px", rotate: 90, ease: "none" }, 0);
        tl.to(".accent--4", { y: "-350px", x: "-40px", rotate: -30, ease: "none" }, 0);

        // CTA Content
        tl.to(".hero__content", { opacity: 0, y: 100, ease: "none" }, 0);
    };

    /**
     * Scroll Story (Cinematic Pinned Narrative)
     * High-fidelity cross-fades with asynchronous asset movement.
     */
    const initStoryScroll = () => {
        const slides = gsap.utils.toArray(".story__slide");
        if (slides.length === 0) return;

        const storySection = document.querySelector(".story");
        
        // Master Timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".story",
                start: "top top",
                end: `+=${slides.length * 150}%`, // Longer scroll for cinematic feel
                pin: true,
                scrub: 1.5, // Smoother scrub
                anticipatePin: 1
            }
        });

        // Background large text deep parallax
        tl.to(".story__bg-text", { x: "-25%", opacity: 0.1, ease: "none" }, 0);

        slides.forEach((slide, i) => {
            const imgWrap = slide.querySelector(".story__img-wrap");
            const content = slide.querySelector(".story__content-stack");
            const title = slide.querySelector(".story__title");
            const quote = slide.querySelector(".story__quote");

            // 1. Enter Slide
            tl.to(slide, { autoAlpha: 1, duration: 0.8 }, i === 0 ? 0 : ">-0.4");
            
            // 2. Async Asset Motion (Zoom + Drift)
            if (imgWrap) {
                tl.fromTo(imgWrap, 
                    { scale: 1.3, y: 100, rotate: i % 2 ? 5 : -5, opacity: 0 },
                    { scale: 1, y: 0, rotate: 0, opacity: 1, duration: 1.2, ease: "power2.out" },
                    "<"
                );
            }

            // 3. Staggered Text Reveal
            if (content) {
                tl.from([title, quote], {
                    y: 50,
                    opacity: 0,
                    stagger: 0.2,
                    duration: 1,
                    ease: "power3.out"
                }, "-=0.8");
            }

            // 4. Exit Slide (except last one)
            if (i < slides.length - 1) {
                tl.to(slide, { 
                    autoAlpha: 0, 
                    scale: 0.9, 
                    y: -50,
                    duration: 0.8 
                }, "+=0.5");
            }
        });
    };

    /**
     * Menu Revealing Stream
     * High-fidelity entrance for stream items with image zoom parallax.
     */
    const initMenuStream = () => {
        const items = gsap.utils.toArray(".menu__stream-item");
        
        items.forEach(item => {
            const visual = item.querySelector(".menu__item-visual img");
            const info = item.querySelector(".menu__item-info");

            // Scroll-triggered Reveal
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                autoAlpha: 0,
                y: 100,
                rotateX: -5,
                duration: 1.5,
                ease: "power4.out"
            });

            // Image Parallax Zoom
            if (visual) {
                gsap.fromTo(visual, 
                    { scale: 1.4, y: -50 },
                    { 
                        scale: 1, 
                        y: 50,
                        scrollTrigger: {
                            trigger: item,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true
                        }
                    }
                );
            }
        });
    };

    /**
     * Reviews (Wall of Love) Stagger Reveal
     */
    const initReviewsReveal = () => {
        gsap.utils.toArray(".review-card").forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top 95%",
                    toggleActions: "play none none reverse"
                },
                y: 100,
                autoAlpha: 0,
                scale: 0.9,
                rotateX: -15,
                duration: 1.4,
                delay: (i % 3) * 0.1,
                ease: "expo.out"
            });
        });

        gsap.from(".reviews__header", {
            scrollTrigger: {
                trigger: ".reviews",
                start: "top 80%"
            },
            y: 50,
            autoAlpha: 0,
            duration: 1.2,
            ease: "power4.out"
        });
    };

    /**
     * Global Particle System
     * Injects and animates floating ingredients for immersive depth.
     */
    const initGlobalParticles = () => {
        const container = document.querySelector(".particles-container");
        if (!container) return;

        const particleCount = 20;
        const types = ["bean", "petal"];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement("div");
            const type = types[Math.floor(Math.random() * types.length)];
            particle.className = `floating-particle particle--${type}`;
            
            // Random positioning spread across pages
            const left = Math.random() * 100;
            const top = Math.random() * 800; // Large vertical span
            const scale = 0.4 + Math.random();
            
            particle.style.left = `${left}%`;
            particle.style.top = `${top}%`;
            particle.style.transform = `scale(${scale})`;

            // Visual fallback
            particle.innerHTML = type === "bean" ? "🫘" : "🌸";

            container.appendChild(particle);

            // Infinite floating loop
            gsap.to(particle, {
                y: "-300vh",
                x: `${(Math.random() - 0.5) * 300}px`,
                rotate: 720 * (Math.random() > 0.5 ? 1 : -1),
                duration: 20 + Math.random() * 30,
                repeat: -1,
                ease: "none",
                delay: Math.random() * -30
            });
        }
    };

    /**
     * Cinematic Loader Reveal Sequence
     */
    const playLoaderReveal = () => {
        const tl = gsap.timeline({
            onComplete: () => {
                document.body.classList.remove("no-scroll");
                window.scrollTo(0, 0); // Reset scroll to top
            }
        });

        tl.to(".loader__progress-bar", { width: "100%", duration: 2.5, ease: "power4.inOut" })
          .to(".loader__logo text", { fill: "#FF8DA1", strokeDashoffset: 0, duration: 0.8 }, "-=0.5")
          .to(".loader", { 
              yPercent: -100, 
              duration: 1.5, 
              ease: "expo.inOut",
              delay: 0.2
          })
          .from(".hero__layer--bg", { scale: 0.8, opacity: 0, duration: 1.8, ease: "expo.out" }, "-=0.8")
          .from(".hero__layer--typography-back", { y: 150, opacity: 0, scale: 0.8, duration: 2, ease: "expo.out" }, "-=1.4")
          .from(".hero__layer--product", { 
              scale: 0.3, 
              opacity: 0, 
              y: 250, 
              rotate: -20, 
              duration: 2.2, 
              ease: "expo.out" 
          }, "-=1.6")
          .from(".hero__title--front", { y: 120, opacity: 0, scale: 0.9, duration: 1.6, ease: "power4.out" }, "-=1.4")
          .from(".hero__subtitle--front", { y: 30, opacity: 0, duration: 1, ease: "power3.out" }, "-=0.8")
          .from(".hero__layer--accents .hero__accent", { 
              scale: 0, 
              opacity: 0, 
              stagger: 0.2, 
              duration: 1.4, 
              ease: "back.out(1.7)" 
          }, "-=1.4")
          .from(".hero__content", { y: 50, opacity: 0, duration: 1.2, ease: "power3.out" }, "-=0.6");
    };


    /**
     * Basic Interaction Handling (Form, Nav)
     */
    const initInteractions = () => {
        
        // Smooth scroll for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: target,
                        ease: "power4.inOut"
                    });
                }
            });
        });

        // Contact Form
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                const btn = form.querySelector('button');
                const originalText = btn.innerText;
                btn.innerText = "SENDING...";
                btn.disabled = true;
                
                setTimeout(() => {
                    btn.innerText = "SENT!";
                    form.reset();
                    setTimeout(() => {
                        btn.innerText = originalText;
                        btn.disabled = false;
                    }, 2000);
                }, 1500);
            });
        }
    };

    return { init, playLoaderReveal, initInteractions };
})();

// Ensure system is ready
document.addEventListener("DOMContentLoaded", () => {
    Animations.init();
    Animations.initInteractions();
});

window.addEventListener("load", () => {
    Animations.playLoaderReveal();
});
