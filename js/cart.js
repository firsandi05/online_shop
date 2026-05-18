import { STORE_CONFIG } from '../config/config.js';

export class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.cartCountElement = document.getElementById('cart-count');
        this.cartItemsElement = document.getElementById('cart-items');
        this.cartSummaryElement = document.getElementById('cart-summary');
        this.cartTotalPriceElement = document.getElementById('cart-total-price');
        this.checkoutButton = document.getElementById('checkout-whatsapp');
        this.clearButton = document.getElementById('clear-cart');

        this.initEvents();
        this.updateUI();
    }

    initEvents() {
        if (this.checkoutButton) {
            this.checkoutButton.addEventListener('click', () => this.checkout());
        }
        if (this.clearButton) {
            this.clearButton.addEventListener('click', () => this.clearCart());
        }
    }

    addItem(product) {
        if (!product || !product.product_id) return;

        const existingItem = this.items.find(
    item =>
        String(item.product_id) === String(product.product_id) &&
        item.size === product.selectedSize
);

        if (existingItem) {
            existingItem.qty += 1;
        } else {
            this.items.push({
    product_id: product.product_id,
    name: product.product_name,
    price: parseFloat(product.finalPrice || product.price),
    image: product.product_image,
    size: product.selectedSize,
    qty: 1
});
        }

        this.save();
        this.updateUI();
        this.showFeedback('Produk ditambahkan ke keranjang');
    }

    clearCart() {
        if (confirm('Kosongkan keranjang belanja?')) {
            this.items = [];
            this.save();
            this.updateUI();
        }
    }

    removeItem(productId) {
        this.items = this.items.filter(item => String(item.product_id) !== String(productId));
        this.save();
        this.updateUI();
    }

    updateQty(productId, delta) {
        const item = this.items.find(item => String(item.product_id) === String(productId));
        if (item) {
            item.qty += delta;
            if (item.qty <= 0) {
                this.removeItem(productId);
            } else {
                this.save();
                this.updateUI();
            }
        }
    }

    save() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateUI() {
        // Update count
        const totalCount = this.items.reduce((sum, item) => sum + item.qty, 0);
        if (this.cartCountElement) {
            this.cartCountElement.textContent = totalCount;
        }

        // Update items list
        if (!this.cartItemsElement) return;

        if (this.items.length === 0) {
            this.cartItemsElement.innerHTML = '<div class="cart-empty">Keranjang masih kosong</div>';
            this.cartSummaryElement?.classList.add('hidden');
            return;
        }

        this.cartSummaryElement?.classList.remove('hidden');
        this.cartItemsElement.innerHTML = '';

        let totalPrice = 0;

        this.items.forEach(item => {
            const itemTotal = item.price * item.qty;
            totalPrice += itemTotal;

            const formattedPrice = this.formatPrice(item.price);

            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <div class="cart-item-info">
                    <img src="assets/products/${item.image}" alt="${item.name}" class="cart-item-img" onerror="this.src='https://placehold.co/100x100?text=${encodeURIComponent(item.name)}'">
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
<p>Ukuran: ${item.size}</p>
<p class="cart-item-price">${formattedPrice}</p>
                    </div>
                </div>
                <div class="cart-item-controls">
                    <button class="qty-btn dec-btn" data-id="${item.product_id}">-</button>
                    <span class="cart-item-qty">${item.qty}</span>
                    <button class="qty-btn inc-btn" data-id="${item.product_id}">+</button>
                    <button class="remove-btn" data-id="${item.product_id}">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                    </button>
                </div>
            `;

            // Add events
            itemEl.querySelector('.dec-btn').addEventListener('click', () => this.updateQty(item.product_id, -1));
            itemEl.querySelector('.inc-btn').addEventListener('click', () => this.updateQty(item.product_id, 1));
            itemEl.querySelector('.remove-btn').addEventListener('click', () => this.removeItem(item.product_id));

            this.cartItemsElement.appendChild(itemEl);
        });

        if (this.cartTotalPriceElement) {
            this.cartTotalPriceElement.textContent = this.formatPrice(totalPrice);
        }
    }

    formatPrice(price) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(price);
    }

    checkout() {
        if (this.items.length === 0) return;

        const number = STORE_CONFIG.whatsappNumber;
        let message = `Halo XWing Project, saya ingin memesan:\n\n`;

        let totalPrice = 0;
        this.items.forEach((item, index) => {
            const itemTotal = item.price * item.qty;
            totalPrice += itemTotal;
            message += `${index + 1}. ${item.name} (x${item.qty}) - ${this.formatPrice(itemTotal)}\n`;
        });

        message += `\n*Total Keseluruhan: ${this.formatPrice(totalPrice)}*`;

        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${number}?text=${encodedMessage}`, '_blank');
    }

    showFeedback(message) {
        const feedback = document.createElement('div');
        feedback.style.position = 'fixed';
        feedback.style.bottom = '2rem';
        feedback.style.left = '50%';
        feedback.style.transform = 'translateX(-50%)';
        feedback.style.background = 'var(--primary-color)';
        feedback.style.color = 'white';
        feedback.style.padding = '0.75rem 1.5rem';
        feedback.style.borderRadius = '2rem';
        feedback.style.zIndex = '1000';
        feedback.style.boxShadow = 'var(--shadow-lg)';
        feedback.textContent = message;

        document.body.appendChild(feedback);

        setTimeout(() => {
            feedback.style.opacity = '0';
            feedback.style.transition = 'opacity 0.5s ease';
            setTimeout(() => feedback.remove(), 500);
        }, 2000);
    }
}
