import { STORE_CONFIG } from '../config/config.js';
import { Cart } from './cart.js';


export class Catalog {

    constructor(data) {

        this.data = data || [];

        // ==========================================
        // HTML ELEMENTS
        // ==========================================

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


        // ==========================================
        // CART
        // ==========================================

        this.cart = new Cart();


        // ==========================================
        // CURRENT PAGE STATE
        // ==========================================

        this.currentView = 'categories';

        this.currentProducts = [];

        this.currentCategoryId = null;

        this.currentCategoryName = '';

        this.currentSearchQuery = '';


        // ==========================================
        // MAKE CATALOG AVAILABLE GLOBALLY
        // ==========================================

        window.catalog = this;


        // ==========================================
        // EVENTS
        // ==========================================

        this.initEvents();


        // ==========================================
        // LANGUAGE CHANGE
        // ==========================================

        window.addEventListener(
            'languageChanged',
            () => {

                this.refreshCurrentView();

            }
        );

    }


    // =================================================
    // LANGUAGE
    // =================================================

    getLanguage() {

        return (
            localStorage.getItem('language')
            || 'id'
        );

    }


    getTranslation(
        key,
        idText,
        enText
    ) {

        const lang =
            this.getLanguage();


        if (lang === 'en') {

            return enText;

        }


        return idText;

    }


    // =================================================
    // EVENTS
    // =================================================

    initEvents() {


        // ---------------------------------------------
        // BACK BUTTON
        // ---------------------------------------------

        if (this.backButton) {

            this.backButton.addEventListener(
                'click',
                () => {

                    this.showCategories();

                }
            );

        }


        // ---------------------------------------------
        // SEARCH
        // ---------------------------------------------

        if (this.searchInput) {

            this.searchInput.addEventListener(
                'input',
                (event) => {

                    this.handleSearch(
                        event.target.value
                    );

                }
            );

        }


        // ---------------------------------------------
        // IMAGE MODAL
        // ---------------------------------------------

        const modal =
            document.getElementById(
                'imageModal'
            );


        if (modal) {

            modal.addEventListener(
                'click',
                () => {

                    modal.classList.remove(
                        'show'
                    );

                }
            );

        }

    }


    // =================================================
    // SEARCH
    // =================================================

    handleSearch(query) {

        const searchTerm =
            String(query)
                .toLowerCase()
                .trim();


        if (!searchTerm) {

            this.showCategories();

            return;

        }


        const results =
            this.data.filter(
                product => {

                    const productName =
                        String(
                            product.product_name || ''
                        ).toLowerCase();


                    const categoryName =
                        String(
                            product.category_name || ''
                        ).toLowerCase();


                    return (
                        productName.includes(
                            searchTerm
                        )
                        ||
                        categoryName.includes(
                            searchTerm
                        )
                    );

                }
            );


        this.showSearchResults(
            results,
            searchTerm
        );

    }


    // =================================================
    // SEARCH RESULTS
    // =================================================

    showSearchResults(
        results,
        query
    ) {

        this.currentView =
            'search';


        this.currentProducts =
            results;


        this.currentSearchQuery =
            query;


        if (this.categoriesSection) {

            this.categoriesSection
                .classList.add('hidden');

        }


        if (this.productsSection) {

            this.productsSection
                .classList.remove('hidden');

        }


        if (this.backButton) {

            this.backButton
                .classList.remove('hidden');

        }


        if (this.categoryTitle) {

            const title =
                this.getTranslation(
                    'searchResult',
                    'Hasil Pencarian:',
                    'Search Results:'
                );


            this.categoryTitle.textContent =
                `${title} "${query}"`;

        }


        this.renderProducts(
            results
        );

    }


    // =================================================
    // BUILD CATEGORIES
    // =================================================

    buildCategories() {

        this.currentView =
            'categories';


        if (!this.categoriesGrid) {

            return;

        }


        this.categoriesGrid.innerHTML =
            '';


        // ---------------------------------------------
        // CREATE UNIQUE CATEGORY LIST
        // ---------------------------------------------

        const categoriesMap =
            new Map();


        this.data.forEach(
            item => {

                const id =
                    item.category_id;


                if (
                    !categoriesMap.has(id)
                ) {

                    categoriesMap.set(
                        id,
                        {

                            id:
                                id,

                            name:
                                item.category_name,

                            image:
                                item.category_image,

                            rating:
                                item.category_rating,

                            sold:
                                item.category_sold

                        }
                    );

                }

            }
        );


        const categories =
            Array.from(
                categoriesMap.values()
            );


        // ---------------------------------------------
        // EMPTY CATEGORY
        // ---------------------------------------------

        if (
            categories.length === 0
        ) {

            const emptyText =
                this.getTranslation(
                    'noCategory',
                    'Tidak ada kategori ditemukan.',
                    'No categories found.'
                );


            this.categoriesGrid.innerHTML = `
                <div class="loading">
                    ${emptyText}
                </div>
            `;


            return;

        }


        // ---------------------------------------------
        // CATEGORY CARD
        // ---------------------------------------------

        categories.forEach(
            category => {

                const card =
                    document.createElement(
                        'div'
                    );


                card.className =
                    'card';


                // Rating
                const rating =
                    category.rating ||
                    0;


                // Sold
                const sold =
                    category.sold ||
                    0;


                const soldText =
                    this.getTranslation(
                        'sold',
                        'Terjual',
                        'Sold'
                    );


                card.innerHTML = `

                    <div class="card-img-wrapper">

                        <img
                            src="assets/categories/${category.image}"
                            alt="${category.name}"
                            onerror="
                                this.src='https://placehold.co/400x300?text=${encodeURIComponent(category.name)}'
                            "
                        >

                    </div>


                    <div
                        class="card-content"
                        style="
                            justify-content:center;
                            align-items:center;
                        "
                    >

                        <h3
                            class="card-title"
                            style="
                                margin:0;
                                font-size:1.5rem;
                            "
                        >

                            ${category.name}

                        </h3>


                        <div class="category-rating">

                            ⭐ ${rating}

                            |

                            ${sold}
                            ${soldText}

                        </div>

                    </div>

                `;


                // -------------------------------------
                // CLICK CATEGORY
                // -------------------------------------

                card.addEventListener(
                    'click',
                    () => {

                        this.showProductsByCategory(
                            category.id,
                            category.name
                        );

                    }
                );


                this.categoriesGrid
                    .appendChild(
                        card
                    );

            }
        );

    }


    // =================================================
    // SHOW PRODUCTS BY CATEGORY
    // =================================================

    showProductsByCategory(
        categoryId,
        categoryName
    ) {

        this.currentView =
            'products';


        this.currentCategoryId =
            categoryId;


        this.currentCategoryName =
            categoryName;


        if (this.categoriesSection) {

            this.categoriesSection
                .classList.add('hidden');

        }


        if (this.productsSection) {

            this.productsSection
                .classList.remove('hidden');

        }


        if (this.backButton) {

            this.backButton
                .classList.remove('hidden');

        }


        const productText =
            this.getTranslation(
                'product',
                'Produk:',
                'Product:'
            );


        if (this.categoryTitle) {

            this.categoryTitle.textContent =
                `${productText} ${categoryName}`;

        }


        const products =
            this.data.filter(
                item =>
                    String(
                        item.category_id
                    ) ===
                    String(
                        categoryId
                    )
            );


        this.currentProducts =
            products;


        this.renderProducts(
            products
        );

    }


    // =================================================
    // RENDER PRODUCTS
    // =================================================

    renderProducts(products) {

        if (!this.productsGrid) {

            return;

        }


        this.productsGrid.innerHTML =
            '';


        if (
            !products ||
            products.length === 0
        ) {

            const emptyText =
                this.getTranslation(
                    'noProduct',
                    'Tidak ada produk ditemukan.',
                    'No products found.'
                );


            this.productsGrid.innerHTML = `
                <div class="loading">
                    ${emptyText}
                </div>
            `;


            return;

        }


        products.forEach(
            product => {

                this.renderProductCard(
                    product
                );

            }
        );

    }


    // =================================================
    // PRODUCT CARD
    // =================================================

    renderProductCard(product) {


        // ---------------------------------------------
        // PRODUCT DATA
        // ---------------------------------------------

        const productName =
            product.product_name ||
            'Product';


        const image =
            product.product_image ||
            '';


        const basePrice =
            parseFloat(
                product.price
            ) || 0;


        const rating =
            product.rating ||
            4.8;


        // ---------------------------------------------
        // TRANSLATION
        // ---------------------------------------------

        const sizeText =
            this.getTranslation(
                'size',
                'Ukuran',
                'Size'
            );


        const addCartText =
            this.getTranslation(
                'addCart',
                '+ Keranjang',
                '+ Cart'
            );


        const buyText =
            this.getTranslation(
                'buy',
                'Beli Sekarang',
                'Buy Now'
            );


        // ---------------------------------------------
        // PRICE
        // ---------------------------------------------

        const formattedPrice =
            this.formatPrice(
                basePrice
            );


        // ---------------------------------------------
        // CARD
        // ---------------------------------------------

        const card =
            document.createElement(
                'div'
            );


        card.className =
            'card';


        card.innerHTML = `

            <div class="card-img-wrapper">

                <img
                    src="assets/products/${image}"
                    alt="${productName}"
                    class="product-image clickable-image"

                    onerror="
                        this.src='https://placehold.co/400x400?text=${encodeURIComponent(productName)}'
                    "
                >

            </div>


            <div class="card-content">


                <h3 class="card-title">

                    ${productName}

                </h3>


                <div class="card-price">

                    ${formattedPrice}

                </div>


                <div class="product-rating">

                    ⭐ ${rating}

                </div>


                <div class="product-size">


                    <label class="size-label">

                        ${sizeText}:

                    </label>


                    <select class="size-select">


                        <option
                            value="Small"
                            data-extra="0"
                        >
                            Small (12 cm)
                        </option>


                        <option
                            value="Medium"
                            data-extra="0"
                        >
                            Medium (15 cm)
                        </option>


                        <option
                            value="Large"
                            data-extra="15000"
                        >
                            Large (20 cm)
                        </option>


                        <option
                            value="Xtra Large"
                            data-extra="30000"
                        >
                            Xtra Large (25 cm)
                        </option>


                    </select>


                </div>


                <div class="card-actions">


                    <button
                        class="
                            btn
                            btn-cart
                            add-to-cart-btn
                        "
                    >

                        ${addCartText}

                    </button>


                    <a
                        href="#"
                        target="_blank"
                        class="
                            btn
                            btn-whatsapp
                            btn-buy-now
                        "
                    >

                        ${buyText}

                    </a>


                </div>


            </div>

        `;


        // =================================================
        // SIZE SELECT
        // =================================================

        const sizeSelect =
            card.querySelector(
                '.size-select'
            );


        // =================================================
        // GET SELECTED PRICE
        // =================================================

        const getSelectedSize =
            () => {

                return (
                    sizeSelect
                        .options[
                            sizeSelect.selectedIndex
                        ]
                );

            };


        const getSelectedExtraPrice =
            () => {

                const option =
                    getSelectedSize();


                return parseFloat(
                    option.dataset.extra
                ) || 0;

            };


        // =================================================
        // ADD TO CART
        // =================================================

        const addCartButton =
            card.querySelector(
                '.add-to-cart-btn'
            );


        if (addCartButton) {

            addCartButton.addEventListener(
                'click',
                event => {

                    event.stopPropagation();


                    const option =
                        getSelectedSize();


                    const selectedSize =
                        option.value;


                    const extraPrice =
                        getSelectedExtraPrice();


                    const finalPrice =
                        basePrice +
                        extraPrice;


                    this.cart.addItem({

                        ...product,

                        selectedSize:

                            selectedSize,

                        price:

                            finalPrice

                    });

                }
            );

        }


        // =================================================
        // BUY NOW
        // =================================================

        const buyButton =
            card.querySelector(
                '.btn-buy-now'
            );


        const updateWhatsApp =
            () => {

                const option =
                    getSelectedSize();


                const selectedSize =
                    option.value;


                const extraPrice =
                    getSelectedExtraPrice();


                const finalPrice =
                    basePrice +
                    extraPrice;


                const number =
                    STORE_CONFIG
                        .whatsappNumber;


                const message =
                    `Halo, saya tertarik membeli ${productName}. ` +
                    `Ukuran: ${selectedSize}. ` +
                    `Harga: Rp ${finalPrice.toLocaleString('id-ID')}`;


                const encoded =
                    encodeURIComponent(
                        message
                    );


                if (buyButton) {

                    buyButton.href =
                        `https://wa.me/${number}?text=${encoded}`;

                }

            };


        updateWhatsApp();


        sizeSelect.addEventListener(
            'change',
            updateWhatsApp
        );


        // =================================================
        // IMAGE ZOOM
        // =================================================

        const imageElement =
            card.querySelector(
                '.clickable-image'
            );


        if (imageElement) {

            imageElement.addEventListener(
                'click',
                event => {

                    event.stopPropagation();


                    const modal =
                        document.getElementById(
                            'imageModal'
                        );


                    const modalImage =
                        document.getElementById(
                            'modalImage'
                        );


                    if (
                        modal &&
                        modalImage
                    ) {

                        modalImage.src =
                            `assets/products/${image}`;

                        modal.classList.add(
                            'show'
                        );

                    }

                }
            );

        }


        // =================================================
        // APPEND
        // =================================================

        this.productsGrid
            .appendChild(
                card
            );

    }


    // =================================================
    // FORMAT PRICE
    // =================================================

    formatPrice(price) {

        return new Intl.NumberFormat(
            'id-ID',
            {
                style:
                    'currency',

                currency:
                    'IDR',

                minimumFractionDigits:
                    0
            }
        ).format(
            price
        );

    }


    // =================================================
    // REFRESH CURRENT VIEW
    // =================================================

    refreshCurrentView() {


        // ---------------------------------------------
        // CATEGORY PAGE
        // ---------------------------------------------

        if (
            this.currentView ===
            'categories'
        ) {

            this.buildCategories();

            return;

        }


        // ---------------------------------------------
        // PRODUCT PAGE
        // ---------------------------------------------

        if (
            this.currentView ===
            'products'
        ) {

            const productText =
                this.getTranslation(
                    'product',
                    'Produk:',
                    'Product:'
                );


            if (this.categoryTitle) {

                this.categoryTitle.textContent =
                    `${productText} ${this.currentCategoryName}`;

            }


            this.renderProducts(
                this.currentProducts
            );


            return;

        }


        // ---------------------------------------------
        // SEARCH PAGE
        // ---------------------------------------------

        if (
            this.currentView ===
            'search'
        ) {

            const searchText =
                this.getTranslation(
                    'searchResult',
                    'Hasil Pencarian:',
                    'Search Results:'
                );


            if (this.categoryTitle) {

                this.categoryTitle.textContent =
                    `${searchText} "${this.currentSearchQuery}"`;

            }


            this.renderProducts(
                this.currentProducts
            );

        }

    }


    // =================================================
    // SHOW CATEGORIES
    // =================================================

    showCategories() {

        this.currentView =
            'categories';


        if (this.productsSection) {

            this.productsSection
                .classList.add('hidden');

        }


        if (this.categoriesSection) {

            this.categoriesSection
                .classList.remove('hidden');

        }


        if (this.searchInput) {

            this.searchInput.value =
                '';

        }


        this.buildCategories();

    }


    // =================================================
    // WHATSAPP LINK
    // =================================================

    createWhatsAppLink(
        productName
    ) {

        const number =
            STORE_CONFIG
                .whatsappNumber;


        const message =
            `Halo, saya tertarik membeli ${productName}`;


        return (
            `https://wa.me/${number}?text=` +
            encodeURIComponent(message)
        );

    }

}
