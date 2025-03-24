// Contact Modal functionality
class ContactModal {
    constructor() {
        this.modal = null;
        this.overlay = null;
        this.closeBtn = null;
        this.init();
    }

    init() {
        // Create modal HTML
        this.createModal();

        // Add event listeners to buttons
        const showModalBtns = document.querySelectorAll('.contact-us-btn, .contact-trigger');


        showModalBtns.forEach(btn => {

            btn.addEventListener('click', () => {
                this.showModal();
            });
        });

        this.closeBtn.addEventListener('click', () => this.hideModal());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.hideModal();
            }
        });

        // Add keyboard support for closing modal with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('modal-show')) {
                this.hideModal();
            }
        });
    }

    createModal() {
        // Create modal elements
        this.overlay = document.createElement('div');
        this.overlay.className = 'modal-overlay contact-modal-overlay';

        const modalHTML = `
            <div class="modal-container contact-modal-container">
            <button class="modal-close">&times;</button>
            <div class="modal-header">
                <h2 class="modal-title">Get In Touch</h2>
                <p class="modal-subtitle">Lets get started. Reach out to us through any of these channels.</p>
            </div>
            <div class="contact-cards-container">
                <div class="contact-modal-card">
                <div class="contact-icon">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                </div>
                <h3 class="contact-title">I dont want to wait</h3>
                <p class="contact-text">+1 (404) 491-8845<br> 7AM-11PM EST</p>
                <a href="tel:+14044918845" class="contact-action-btn">Call Now</a>
                </div>

                <div class="contact-modal-card">
                <div class="contact-icon">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                </div>
                <h3 class="contact-title">I can wait a bit</h3>
                <p class="contact-text">+1 (404) 491-8845<br>Quick Response within 1hr</p>
                <a href="sms:+14044918845" class="contact-action-btn">Send Text</a>
                </div>

                <div class="contact-modal-card">
                <div class="contact-icon">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="white">
                    <path d="M20 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V6a2 2 0 00-2-2zm-1.4 3L12 11.25 5.4 7H18.6zM4 18V8l8 5 8-5v10H4z" />
                    </svg>
                </div>
                <h3 class="contact-title">I have time</h3>
                <p class="contact-text">munafah@outlook.com<br>24/7 Email Support</p>
                <a href="mailto:munafah@outlook.com" class="contact-action-btn">Send Email</a>
                </div>

                
            </div>
            </div>
        `;

        this.overlay.innerHTML = modalHTML;
        document.body.appendChild(this.overlay);

        this.modal = this.overlay.querySelector('.modal-container');
        this.closeBtn = this.overlay.querySelector('.modal-close');
    }

    showModal() {



        // Show modal with GSAP animation
        this.overlay.classList.add('modal-show');

        gsap.to(this.overlay, {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out"
        });

        gsap.to(this.modal, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            delay: 0.1,
            ease: "back.out(1.7)"
        });

        // Animate cards entry
        const cards = this.modal.querySelectorAll('.contact-modal-card');
        gsap.fromTo(cards,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.4,
                stagger: 0.1,
                delay: 0.3,
                ease: "power2.out"
            }
        );
    }

    hideModal() {
        // Hide modal with GSAP animation
        gsap.to(this.modal, {
            opacity: 0,
            scale: 0.8,
            duration: 0.3,
            ease: "power2.in"
        });

        gsap.to(this.overlay, {
            opacity: 0,
            duration: 0.3,
            delay: 0.1,
            ease: "power2.in",
            onComplete: () => {
                this.overlay.classList.remove('modal-show');
            }
        });
    }
}

// Initialize modal when document is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ContactModal();
});