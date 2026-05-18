import { STORE_CONFIG } from '../config/config.js';
import { Cart } from './cart.js';

export class Catalog {
    constructor(data) {
        this.data = data;

        this.categoriesSection =
            document.getElementById('categories-section');

        this.productsSection =
            document.getElementById('products-section');

        this.categoriesGrid =
            document.getElementById('categories-grid');

        this.productsGrid =
            document.getElementById('products-grid');

        this.categoryTitle =
            document.getElementById('category-title');

        this.backButton =
            document.getElementById('back-button');

        this.searchInput =
            document.getElementById('search-input');

        this.cart = new Cart();

        this.initEvents();
    }

    initEvents() {

        // Tombol kembali
        if (this.backButton) {
            this.backButton.addEventListener('click', () => {
                this.showCategories();
            });
        }

        // Search
        if (this.searchInput) {
            this.searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Close modal zoom image
        const modal =
            document.getElementById('imageModal');

        if (modal) {
            modal.addEventListener('click', () => {
                modal.classList.remove('show');
            });
        }
    }

    handleSearch(query) {

        const searchTerm =
            query.toLowerCase().trim();

        if (searchTerm.length === 0) {
            this.showCategories();
            return;
        }

        const results = this.data.filter(product =>
            product.product_name
                .toLowerCase()
                .includes(searchTerm)
            ||
            product.category_name
                .toLowerCase()
                .includes(searchTerm)
        );

        this.showSearchResults(
            results,
            searchTerm
        );
    }

    showSearchResults(results, query) {

        this.categoriesSection
            .classList.add('hidden');

        this.productsSection
            .classList.remove('hidden');

        this.categoryTitle.textContent =
            `Hasil Pencarian: "${query}"`;

        this.backButton
            .classList.remove('hidden');

        this.renderProducts(results);
    }

    buildCategories() {

        this.categoriesGrid.innerHTML = '';

        const categoriesMap = new Map();

        this.data.forEach(item => {

            if (!categoriesMap.has(item.category_id)) {

                categoriesMap.set(
                    item.category_id,
                    {
                        id: item.category_id,
                        name: item.category_name,
                        image: item.category_image
                    }
                );
            }
        });

        const categories =
            Array.from(categoriesMap.values());

        if (categories.length === 0) {

            this.categoriesGrid.innerHTML =
                '<div class="loading">Tidak ada kategori ditemukan.</div>';

            return;
        }

        categories.forEach(category => {

            const card =
                document.createElement('div');

            card.className = 'card';

            card.innerHTML = `
                <div class="card-img-wrapper">
                    <img 
                        src="assets/categories/${category.image}" 
                        alt="${category.name}" 
                        onerror="this.src='https://placehold.co/400x300?text=${encodeURIComponent(category.name)}'"
                    >
                </div>

                <div class="card-content" 
                    style="justify-content:center; align-items:center;">

                    <h3 class="card-title" 
                        style="margin:0; font-size:1.5rem;">
                        ${category.name}
                    </h3>
                </div>
            `;

            card.addEventListener('click', () => {
                this.showProductsByCategory(
                    category.id,
                    category.name
                );
            });

            this.categoriesGrid.appendChild(card);
        });
    }

    showProductsByCategory(category_id, category_name) {

        this.categoriesSection
            .classList.add('hidden');

        this.productsSection
            .classList.remove('hidden');

        this.categoryTitle.textContent =
            `Produk: ${category_name}`;

        const products =
            this.data.filter(item =>
                item.category_id === category_id
            );

        this.renderProducts(products);
    }

    renderProducts(products) {

        this.productsGrid.innerHTML = '';

        if (products.length === 0) {

            this.productsGrid.innerHTML =
                '<div class="loading">Tidak ada produk ditemukan.</div>';

            return;
        }

        products.forEach(product => {

            const formattedPrice =
                new Intl.NumberFormat(
                    'id-ID',
                    {
                        style: 'currency',
                        currency: 'IDR',
                        minimumFractionDigits: 0
                    }
                ).format(product.price);

            const whatsappLink =
                this.createWhatsAppLink(
                    product.product_name
                );

            const card =
                document.createElement('div');

            card.className = 'card';

            card.innerHTML = `
                <div class="card-img-wrapper">

                    <img
                        src="assets/products/${product.product_image}"
                        alt="${product.product_name}"
                        class="product-image clickable-image"
                        onerror="this.src='https://placehold.co/400x400?text=${encodeURIComponent(product.product_name)}'"
                    >

                </div>

                <div class="card-content">

                    <h3 class="card-title">
                        ${product.product_name}
                    </h3>

                    <div class="card-price">
                        ${formattedPrice}
                    </div>

                    <div class="product-size">
                        <label>Ukuran:</label>

                        <select class="size-select">
                            <option value="Small (12 cm)">
                                Small (12 cm)
                            </option>

                            <option value="Medium (15 cm)">
                                Medium (15 cm)
                            </option>

                            <option value="Large (20 cm)">
                                Large (20 cm)
                            </option>

                            <option value="Xtra Large (25 cm)">
                                Xtra Large (25 cm)
                            </option>
                        </select>
                    </div>

                    <div class="card-actions">

                        <button class="btn btn-cart add-to-cart-btn">
                            + Keranjang
                        </button>

                        <a href="${whatsappLink}"
                            target="_blank"
                            class="btn btn-whatsapp btn-buy-now">

                            Beli Sekarang
                        </a>
                    </div>
                </div>
            `;

            // Add to cart
            card.querySelector('.add-to-cart-btn')
            .addEventListener('click', (e) => {

                e.stopPropagation();

                const selectedSize =
                    card.querySelector('.size-select')
                    .value;

                let extraPrice = 0;

                if (
                    selectedSize ===
                    'Large (20 cm)'
                ) {
                    extraPrice = 15000;
                }

                else if (
                    selectedSize ===
                    'Xtra Large (25 cm)'
                ) {
                    extraPrice = 30000;
                }

                this.cart.addItem({
                    ...product,
                    selectedSize,
                    finalPrice:
                        parseFloat(product.price)
                        + extraPrice
                });
            });

            // Zoom image
            const image =
                card.querySelector(
                    '.clickable-image'
                );

            image.addEventListener(
                'click',
                () => {

                    const modal =
                        document.getElementById(
                            'imageModal'
                        );

                    const modalImage =
                        document.getElementById(
                            'modalImage'
                        );

                    modalImage.src =
                        `assets/products/${product.product_image}`;

                    modal.classList.add('show');
                }
            );

            this.productsGrid
                .appendChild(card);
        });
    }

    showCategories() {

        this.productsSection
            .classList.add('hidden');

        this.categoriesSection
            .classList.remove('hidden');

        if (this.searchInput) {
            this.searchInput.value = '';
        }
    }

    createWhatsAppLink(productName) {

        const number =
            STORE_CONFIG.whatsappNumber;

        const message =
            `Halo, saya tertarik membeli ${productName}`;

        const encodedMessage =
            encodeURIComponent(message);

        return `https://wa.me/${number}?text=${encodedMessage}`;
    }
}
