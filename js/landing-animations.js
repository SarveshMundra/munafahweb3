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
    .floating-features {
        visibility: hidden;
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

    // Initialize gift box animation
    const giftBoxAnimation = new DotLottie({
        autoplay: true,
        loop: true,
        canvas: document.getElementById("giftBoxCanvas"),
        src: "https://lottie.host/b4fa9fd9-5b2a-4415-9db8-126c710af110/5U34HpSDEk.lottie"
    });

    // Initialize sparkle animation
    const sparkleAnimation = new DotLottie({
        autoplay: false,
        loop: false,
        canvas: document.getElementById("sparkleCanvas"),
        src: "https://lottie.host/3afdfb48-ec82-45f5-af4b-4645de8efc7a/bzWejngDPa.lottie"
    });

    // Animate each letter
    const letters = document.querySelectorAll('#hero-title .letter');
    letters.forEach((letter, index) => {
        timeline.to(letter, {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 0.5,
            delay: index * 0.1
        }, index * 0.1);
    });

    // Animate tagline after letters
    timeline.to("#hero-tagline", {
        y: 0,
        opacity: 1,
        duration: 2,
    });

    // Reveal features after tagline animation
    timeline.call(() => {
        document.querySelector('.floating-features').style.visibility = 'visible';
    });

    // Animate feature icons
    timeline.call(initHeroFeatureIconsAnimation);

    // Show "See All Features" button after feature icons animation
    timeline.to(".show-features-btn", {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out"
    }, "+=1"); // Adjust delay as needed

    // Show gift box after features
    timeline.add(() => {
        gsap.to(".gift-box-container", {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "back.out(1.7)"
        });
    }, "+=1"); // Adjust delay as needed

    // Handle gift box click
    let isGiftOpened = false;

    document.querySelector('.gift-box-container').addEventListener('click', function () {
        if (isGiftOpened) return;
        isGiftOpened = true;

        const revealTimeline = gsap.timeline();

        revealTimeline
            .to('.gift-box-container', {
                scale: 0,
                opacity: 0,
                duration: 0.3,
                onComplete: () => {
                    document.querySelector('.gift-box-container').style.visibility = 'hidden';
                    document.getElementById('sparkleCanvas').style.display = 'block';
                    sparkleAnimation.play();
                }
            })
            .to('.wrapper-container', {
                opacity: 1,
                visibility: 'visible',
                duration: 0.3
            })
            .to('.wrapper-container', {
                opacity: 0,
                duration: 0.6,
                delay: 0.6, // Give time for sparkle animation
                onComplete: () => {
                    document.querySelector('.wrapper-container').style.visibility = 'hidden';
                    document.querySelector('.early-bird-container').style.display = 'flex';
                }
            })
            .to(".early-bird-container", {
                opacity: 1,
                visibility: 'visible',
                scale: 1,
                duration: 0.5,
                ease: "back.out(.3)"
            })
            // Counter animation
            .call(() => {
                let obj = { val: 0 };
                document.querySelector('.spots-counter').textContent = Math.round(obj.val); // Ensure initial value is 0
                gsap.to(obj, {
                    val: 47,
                    duration: 1,
                    ease: "steps(47)",
                    onUpdate: function () {
                        document.querySelector('.spots-counter').textContent = Math.round(obj.val);
                    }
                });
            })
            // Animate spots text
            .from('.spots-text', {
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            }, "-=1")
            // Animate CTA button
            .to(".cta-button-container", {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power3.out"
            });
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


// Split-Screen Reveal Services Animation
function initSplitScreenServicesAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    // Animate the title and subtitle
    gsap.to(".services-section.services-split-screen .services-title", {
        scrollTrigger: {
            trigger: ".services-section.services-split-screen",
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out"
    });

    gsap.to(".services-section.services-split-screen .services-subtitle", {
        scrollTrigger: {
            trigger: ".services-section.services-split-screen",
            start: "top 70%",
            toggleActions: "play none none none"
        },
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        ease: "power2.out"
    });

    // Divider dot pulse animation
    gsap.to(".services-section.services-split-screen .divider-dot", {
        scrollTrigger: {
            trigger: ".services-section.services-split-screen",
            start: "top 60%",
            toggleActions: "play none none none"
        },
        boxShadow: "0 0 30px rgba(255, 255, 255, 1)",
        repeat: -1,
        yoyo: true,
        duration: 1.5
    });

    // Split animation for left and right panels
    const splitScreenTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".services-section.services-split-screen",
            start: "top 60%",
            toggleActions: "play reverse play reverse"
        }
    });

    splitScreenTl
        .to(".services-section.services-split-screen .split-left, .services-section.services-split-screen .split-right", {
            x: 0,
            duration: 0.3,
            ease: "power3.out"
        })
        .to(".services-section.services-split-screen .split-content", {
            opacity: 1,
            duration: 0.3,
            ease: "power3.out"
        }, 0); // Start at the same time as the previous animation
}



// Feature details data 
const featureDetails = {
    "Purchase": {
        title: "Purchase Management",
        features: [
            "Purchase order creation",
            "Supplier management",
            "Purchase tracking",
            "Inventory updates",
            "Order history"
        ]
    },
    "Inventory": {
        title: "Inventory Management",
        features: [
            "Stock tracking",
            "Low stock alerts",
            "Barcode scanning",
            "Multiple locations",
            "Batch tracking"
        ]
    },
    "Sales": {
        title: "Sales Management",
        features: [
            "Invoice generation",
            "Customer orders",
            "Payment tracking",
            "Sales analytics",
            "Discount management"
        ]
    },
    "Customer": {
        title: "Customer Management",
        features: [
            "Contact information",
            "Purchase history",
            "Communication logs",
            "Loyalty programs",
            "Custom fields"
        ]
    },
    "e-Commerce": {
        title: "e-Commerce Management",
        features: [
            "Online catalog",
            "Order processing",
            "Payment integration",
            "Shipping options",
            "Store analytics"
        ]
    },
    "Finance": {
        title: "Financial Management",
        features: [
            "Income tracking",
            "Expense management",
            "Financial reports",
            "Tax calculations",
            "Budget planning"
        ]
    }
};


function initHeroFeatureIconsAnimation() {
    const container = document.querySelector('.floating-features');
    const icons = document.querySelectorAll('.feature-icon');

    // Add features title
    const title = document.createElement('div');
    title.className = 'features-title';
    title.textContent = 'Features';
    container.insertBefore(title, container.firstChild);

    // Galaxy animation setup
    const radius = window.innerWidth <= 480 ? 140 : 300;
    const orbitDuration = 200;

    // Animate title
    gsap.to(title, {
        opacity: 1,
        duration: 1,
        delay: 0,
        y: 40,
    });

    // Initial setup
    icons.forEach((icon, index) => {
        gsap.set(icon, {
            opacity: 0,
            scale: 0,
        });

        // Add feature details container to each icon
        const featureName = icon.querySelector('span').textContent;
        if (featureDetails[featureName]) {
            const detailsContainer = document.createElement('div');
            detailsContainer.className = 'feature-details';
            detailsContainer.innerHTML = `
          <h3>${featureDetails[featureName].title}</h3>
          <ul>
            ${featureDetails[featureName].features.map(feature => `<li>${feature}</li>`).join('')}
          </ul>
        `;
            icon.appendChild(detailsContainer);
        }

        // Add click event
        icon.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent click from bubbling up

            // Close all other open details
            icons.forEach(otherIcon => {
                if (otherIcon !== icon) {
                    otherIcon.classList.remove('active');
                }
            });

            // Toggle active state for this icon
            icon.classList.toggle('active');
        });
    });

    // Close details when clicking outside
    document.addEventListener('click', function () {
        icons.forEach(icon => icon.classList.remove('active'));
    });

    // Create orbits
    icons.forEach((icon, index) => {
        const angle = (index / icons.length) * Math.PI * 2;
        const delay = index * 0.2;

        // Create orbit animation
        gsap.to(icon, {
            opacity: 1,
            scale: 1,
            duration: 1,
            delay: delay + .5,
        });

        // Continuous orbit animation
        gsap.to(icon, {
            duration: orbitDuration,
            repeat: -1,
            ease: "none",
            onUpdate: function () {
                const progress = this.progress();
                const currentAngle = angle + (progress * Math.PI * 2);

                const x = Math.cos(currentAngle) * radius;
                const z = Math.sin(currentAngle) * radius;
                const y = Math.sin(currentAngle) * (radius / 4); // Adjust the tilt smaller number more tilt
                const scale = gsap.utils.mapRange(-radius, radius, 1, 1, z); // Scale Icons when they come in the front

                icon.style.transform = `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
                icon.style.zIndex = z < 0 ? 0 : 2;
            }
        });
    });

    // Auto-show the Inventory feature details briefly (add this at the end of initHeroFeatureIconsAnimation function)
    setTimeout(() => {
        // Find the inventory icon
        const inventoryIcon = Array.from(icons).find(icon =>
            icon.querySelector('span') && icon.querySelector('span').textContent === 'Inventory'
        );

        if (inventoryIcon) {
            // Show the details
            inventoryIcon.classList.add('active');

            // Hide after 2 seconds
            setTimeout(() => {
                inventoryIcon.classList.remove('active');
            }, 2000);
        }
    }, 3000); // Start 3 seconds after the animation completes

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
            y: 30,
            opacity: 1,
            duration: 1.5,
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
    initSplitScreenServicesAnimations();
    initFeatureCarousel();
    initCrossPlatformAnimations();

});


// Make functions available globally
window.initHeroAnimations = initHeroAnimations;
window.initSplitScreenServicesAnimations = initSplitScreenServicesAnimations;
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