// Navigation functionality
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.main-header');
    let lastScroll = 0;

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Header scroll behavior
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add background when scrolling down
        if (currentScroll > 10) {
            header.style.background = 'rgba(0, 0, 0, .01)';
        } else {
            header.style.background = 'rgba(0, 0, 0, .01)';
        }

        // Hide/show header based on scroll direction
        if (currentScroll > lastScroll && currentScroll > 30) {
            header.style.transform = 'translateY(-100%)';

        } else {
            header.style.transform = 'translateY(0)';

        }

        lastScroll = currentScroll;
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
            navLinks.classList.remove('active');
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu after clicking
                navLinks.classList.remove('active');
            }
        });
    });
});