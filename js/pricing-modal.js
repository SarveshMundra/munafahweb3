// Feature data structure
const features = {
    salesManagement: {
        title: "Sales Management",
        features: [
            "Invoice generation & management",
            "Sales order processing",
            "Payment tracking",
            "Basic sales reports",
            "Receipt generation"
        ]
    },
    inventoryManagement: {
        title: "Inventory Management",
        features: [
            "Stock tracking",
            "Low stock alerts",
            "Basic inventory reports",
            "Product categorization",
            "Stock adjustment"
        ]
    },
    PurchaseManagement: {
        title: "Purchase Management",
        features: [
            "Purchase order creation",
            "Supplier management",
            "Purchase tracking",
            "Purchase reports",
            "Order adjustments"
        ]
    },
    CustomerManagement: {
        title: "Customer Management",
        features: [
            "Customer database",
            "Customer segmentation",
            "Customer interaction tracking",
            "Customer feedback management",
            "Customer reports"
        ]
    },
    b2bECommerce: {
        title: "B2B e-Commerce",
        features: [
            "Bulk order processing",
            "Wholesale pricing",
            "B2B customer portal",
            "Order history",
            "Reorder functionality"
        ]
    },
    financeManagement: {
        title: "Finance Management",
        features: [
            "Expense tracking",
            "Budget management",
            "Financial reporting",
            "Tax calculations",
            "Profit & loss statements"
        ]
    }
};

// Modal functionality
class FeaturesModal {
    constructor() {
        this.modal = null;
        this.overlay = null;
        this.closeBtn = null;
        this.init();
    }

    init() {
        // Create modal HTML
        this.createModal();
        
        // Add event listeners
        const showModalBtns = document.querySelectorAll('.show-features-btn');
        showModalBtns.forEach(btn => {
            btn.addEventListener('click', () => this.showModal());
        });

        this.closeBtn.addEventListener('click', () => this.hideModal());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.hideModal();
            }
        });
    }

    createModal() {
        // Create modal elements
        this.overlay = document.createElement('div');
        this.overlay.className = 'modal-overlay';
        
        const modalHTML = `
            <div class="modal-container">
                <button class="modal-close">&times;</button>
                <div class="modal-header">
                    <h2 class="modal-title">All Plan, Same Features</h2>
                </div>
                <div class="features-grid">
                    ${this.generateFeaturesHTML()}
                </div>
            </div>
        `;
        
        this.overlay.innerHTML = modalHTML;
        document.body.appendChild(this.overlay);
        
        this.modal = this.overlay.querySelector('.modal-container');
        this.closeBtn = this.overlay.querySelector('.modal-close');
    }

    generateFeaturesHTML() {
        return Object.values(features).map(category => `
            <div class="feature-category">
                <h3>${category.title}</h3>
                <ul class="feature-list">
                    ${category.features.map(feature => `
                        <li>${feature}</li>
                    `).join('')}
                </ul>
            </div>
        `).join('');
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

// Initialize modal
document.addEventListener('DOMContentLoaded', () => {
    new FeaturesModal();
});