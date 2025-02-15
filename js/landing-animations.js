// Register GSAP ScrollTrigger Plugin
gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

const styleElement = document.createElement('style');
styleElement.textContent = `
    .feature-card {
        visibility: hidden;
    }
    .feature-card.gsap-initialized {
        visibility: visible;
    }
`;
document.head.appendChild(styleElement);

// Mouse tracking variables
let mouseX = 0;
let mouseY = 0;

// Track mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Hero Section Animations
function initHeroAnimations() {
    // Create timeline for letters animation
    const timeline = gsap.timeline({
        defaults: { ease: "power3.out" }
    });

    // Animate each letter
    const letters = document.querySelectorAll('#hero-title .letter');
    letters.forEach((letter, index) => {
        timeline.to(letter, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.5,
            delay: index * 0.1 // Delay each letter for typing effect
        }, index * 0.1); // Start each animation after delay
    });

    // Animate tagline after letters
    timeline.to("#hero-tagline", {
        y: 50,
        opacity: 1,
        duration: 1.5,

    });

    // Animate feature icons after tagline
    timeline.call(initHeroFeatureIconsAnimation);

        // Add a delay before starting the early bird counter animation
        timeline.to({}, { duration: 2 }); // Add a 1-second delay

// Animate early bird counter after feature icons
timeline.to(".early-bird-container", {
    opacity: 1,
    y: 0,
    duration: .1,
    delay: 1, // Delay after feature icons
    ease: "power3.out",
    onComplete: function() {
        // Enhanced counter animation
        let obj = { val: 0 };
        gsap.to(obj, {
            val: 47,
            duration: 1.5,
            delay: 0.1, // Delay after the container animation
            ease: "steps(47)",  // This creates that mechanical stepping effect
            onUpdate: function() {
                document.querySelector('.spots-counter').textContent = Math.round(obj.val);
            }
        });
    }
});

    // Animate CTA button
    timeline.to(".cta-button-container", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        onComplete: () => {
            // Add class for initial animation
            document.querySelector('.cta-button').classList.add('initial-animate');
            
            // Remove class after animation (optional - the animation will finish naturally)
            setTimeout(() => {
                document.querySelector('.cta-button').classList.remove('initial-animate');
            }, 5000); // Match this with animation duration (1.2s = 1200ms)
        }
    });



    // Orb animations
    const orb1 = document.querySelector('.orb-1');
    gsap.to(orb1, {
        duration: 0.2,
        repeat: -1,
        repeatRefresh: true,
        onUpdate: function () {
            const orbRect = orb1.getBoundingClientRect();
            const maxX = window.innerWidth - orbRect.width;
            const maxY = window.innerHeight - orbRect.height;
            const targetX = mouseX - (orbRect.width / 2);
            const targetY = mouseY - (orbRect.height / 2);

            gsap.to(orb1, {
                x: targetX,
                y: targetY,
                duration: 0.3,
                ease: "power2.out"
            });
        }
    });

    // Orb-2 animation
    gsap.to(".orb-2", {
        scrollTrigger: {
            trigger: ".hero-section",
            start: "top top",
            end: "bottom top",
            scrub: 1.5
        },
        y: 100,
        x: 50
    });
}

function initHeroFeatureIconsAnimation() {
    const icons = document.querySelectorAll('.feature-icon');
    const isMobile = window.innerWidth <= 768;
    const centerX = window.innerWidth / 2;
    const spacing = isMobile ? 60 : 100; // Smaller spacing for mobile

    icons.forEach((icon, index) => {
        // Initial position at the center
        gsap.set(icon, {
            x: 0,
            opacity: 0,
            scale: 0
        });

        // Calculate final position
        let finalX;
        if (window.innerWidth <= 480) {
            // Mobile vertical layout
            finalX = index % 2 === 0 ? -spacing : spacing;
        } else {
            // Desktop/tablet horizontal layout
            finalX = index < 3 ? -spacing * (3 - index) : spacing * (index - 2);
        }

        // Animation
        gsap.to(icon, {
            x: finalX,
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: 0.2 * index,
            ease: "back.out(1.2)",
        });
    });
}



function initFeatureCarousel() {
    const carousel = document.querySelector('.feature-carousel');
    const slides = document.querySelectorAll('.feature-slide');
    const prevButton = document.querySelector('.nav-arrow.prev');
    const nextButton = document.querySelector('.nav-arrow.next');
    const progressDots = document.querySelectorAll('.progress-dot');

    let currentSlide = 0;
    let autoplayInterval;
    const autoplayDelay = 3000; // 3 seconds

    // Initialize first slide
    updateSlides();

    // Ensure autoplay starts after a slight delay
    setTimeout(() => {
        startAutoplay();
    }, 100); // 100ms delay

    // Event Listeners
    prevButton.addEventListener('click', () => {
        navigateSlide(-1);
        resetAutoplay();
    });

    nextButton.addEventListener('click', () => {
        navigateSlide(1);
        resetAutoplay();
    });

    carousel.addEventListener('mouseenter', () => {
        stopAutoplay();
    });

    carousel.addEventListener('mouseleave', () => {
        startAutoplay();
    });

    // Touch Events
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        stopAutoplay();
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
        startAutoplay();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                navigateSlide(1); // Swipe left
            } else {
                navigateSlide(-1); // Swipe right
            }
        }
    }

    function navigateSlide(direction) {
        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        updateSlides();
    }

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'next', 'prev');

            if (index === currentSlide) {
                slide.classList.add('active');
                gsap.from(slide.querySelector('.feature-content'), {
                    y: 100,
                    opacity: 0,
                    duration: 0.5,
                    ease: "power2.out"
                });
            } else if (index === (currentSlide + 1) % slides.length) {
                slide.classList.add('next');
            } else if (index === (currentSlide - 1 + slides.length) % slides.length) {
                slide.classList.add('prev');
            }
        });

        // Update progress dots
        progressDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function startAutoplay() {
        if (!autoplayInterval) {
            autoplayInterval = setInterval(() => {
                navigateSlide(1);
            }, autoplayDelay);
        }
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            autoplayInterval = null;
        }
    }

    function resetAutoplay() {
        stopAutoplay();
        startAutoplay();
    }

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            navigateSlide(-1);
            resetAutoplay();
        } else if (e.key === 'ArrowRight') {
            navigateSlide(1);
            resetAutoplay();
        }
    });
}


function initCrossPlatformAnimations() {
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: "#platforms", // Assuming this is the section ID
            start: "top center", // Adjust as needed
            toggleActions: "play reverse play reverse"
        }
    });

    // New code to animate video opacity
    gsap.to(".platform-video-container", {
        scrollTrigger: {
            trigger: ".cross-platform-section",
            start: "top 30%", // Start when the section enters the viewport
            end: "bottom 90%", // End when the section leaves the viewport
            scrub: true, // Smooth scrubbing
            toggleActions: "play reverse play reverse",
            onLeave: () => gsap.to(".platform-video-container", { opacity: 0.3, duration: 0.5 }), // Set opacity back to 0.3 with smooth transition
            onEnterBack: () => gsap.to(".platform-video-container", { opacity: 0.8, duration: 0.5 }), // Set opacity to 0.8 when scrolling back with smooth transition
            onLeaveBack: () => gsap.to(".platform-video-container", { opacity: 0.3, duration: 0.5 }) // Set opacity back to 0.3 when scrolling back with smooth transition
        },
        opacity: 0.8, // Change opacity to 0.8 when fully in viewport
        ease: "power3.out"
    });

    // Scale platform image  size from .5 to .8
    gsap.to(".platform-image", {
        scrollTrigger: {
            trigger: ".cross-platform-section",
            start: "top center", // Adjust as needed
            end: "bottom center", // Adjust as needed
            scrub: true, // Smooth scrubbing
            toggleActions: "play reverse play reverse"
        },
        scale: .8, // Scale to 1
        duration: 1,
        ease: "power3.out"
    });

    timeline
        .to("#platform-heading", {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out"
        })
        .to("#platform-tagline", {
            y: 30,
            opacity: 1,
            duration: 1.5,
            delay: 0.5,
            ease: "power3.out"
        });
}



// Initialize all animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP ScrollTrigger Plugin
    gsap.registerPlugin(ScrollTrigger);

    // Initialize animations
    initHeroAnimations();
    setupGrid(); // This is from grid-setup.js
    // initHeroFeatureIconsAnimation();
    initFeatureCarousel();
    initCrossPlatformAnimations();
});


// Make functions available globally
window.initHeroAnimations = initHeroAnimations;
// window.initHeroFeatureIconsAnimation = initHeroFeatureIconsAnimation;
window.initFeatureCarousel = initFeatureCarousel;
window.initCrossPlatformAnimations = initCrossPlatformAnimations;


// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});