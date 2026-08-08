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

        // Menyimpan halaman yang sedang dibuka
        this.currentView = 'categories';

        this.currentProducts = [];

        this.currentCategoryId = null;

        this.currentCategoryName = '';

        this.currentSearchQuery = '';

        // Supaya language.js bisa mengakses catalog
        window.catalog = this;

        this.initEvents();

        /*
         * Kalau bahasa diganti, catalog akan refresh.
         */
        window.addEventListener(
            'languageChanged',
            () => {
                this.refreshCurrentView();
            }
        );
    }


    /* =====================================================
       GET TRANSLATION
    ====================================================== */

    getTranslation(key, fallback = '') {

        if (
            window.currentLanguage &&
            window.currentLanguage[key]
        ) {
            return window.currentLanguage[key];
        }

        return fallback;
    }


    /* =====================================================
       EVENTS
    ====================================================== */

    initEvents() {

        // Tombol kembali
        if (this.backButton) {

            this.backButton.addEventListener(
                'click',
                () => this.showCategories()
            );

        }


        // Search
        if (this.searchInput) {

            this.searchInput.addEventListener(
                'input',
                (e) => {

                    this.handleSearch(
                        e.target.value
                    );

                }
            );

        }


        // Close image modal
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


    /* =====================================================
       SEARCH
    ====================================================== */

    handleSearch(query) {

        const searchTerm =
            query.toLowerCase().trim();

        if (searchTerm.length === 0) {

            this.showCategories();

            return;

        }


        const results =
            this.data.filter(product =>

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


    /* =====================================================
       SEARCH RESULTS
    ====================================================== */

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


        this.categoriesSection
            .classList.add(
                'hidden'
            );

        this.productsSection
            .classList.remove(
                'hidden'
            );


        this.backButton
            .classList.remove(
                'hidden'
            );


        const searchResult =
            this.getTranslation(
                'searchResult',
                'Hasil Pencarian:'
            );


        this.categoryTitle.textContent =
            `${searchResult} "${query}"`;


        this.renderProducts(
            results
        );

    }


    /* =====================================================
       BUILD CATEGORIES
    ====================================================== */

    buildCategories() {

        this.currentView =
            'categories';


        this.categoriesGrid.innerHTML =
            '';


        const categoriesMap =
            new Map();


        this.data.forEach(item => {

            if (
                !categoriesMap.has(
                    item.category_id
                )
            ) {

                categoriesMap.set(
                    item.category_id,
                    {
                        id:
                            item.category_id,

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

        });


        const categories =
            Array.from(
                categoriesMap.values()
            );


        if (
            categories.length === 0
        ) {

            this.categoriesGrid.innerHTML = `
                <div class="loading">
                    ${this.getTranslation(
                        'noProducts',
                        'Tidak ada kategori ditemukan.'
                    )}
                </div>
            `;

            return;

        }


        categories.forEach(
            category => {

                const card =
                    document.createElement(
                        'div'
                    );


                card.className =
                    'card';


                const soldText =
                    this.getTranslation(
                        'sold',
                        'Terjual'
                    );


                card.innerHTML = `

                    <div class="card-img-wrapper">

                        <img
                            src="assets/categories/${category.image}"
                            alt="${category.name}"
                            onerror="this.src='https://placehold.co/400x300?text=${encodeURIComponent(category.name)}'"
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

                            ⭐ ${category.rating || 0}

                            |

                            ${category.sold || 0}
                            ${soldText}

                        </div>

                    </div>

                `;


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


    /* =====================================================
       SHOW PRODUCTS BY CATEGORY
    ====================================================== */

    showProductsByCategory(
        category_id,
        category_name
    ) {

        this.currentView =
            'products';

        this.currentCategoryId =
            category_id;

        this.currentCategoryName =
            category_name;


        this.categoriesSection
            .classList.add(
                'hidden'
            );


        this.productsSection
            .classList.remove(
                'hidden'
            );


        this.backButton
            .classList.remove(
                'hidden'
            );


        const productText =
            this.getTranslation(
                'product',
                'Produk:'
            );


        this.categoryTitle.textContent =
            `${productText} ${category_name}`;


        const products =
            this.data.filter(
                item =>
                    item.category_id ===
                    category_id
            );


        this.currentProducts =
            products;


        this.renderProducts(
            products
        );

    }


    /* =====================================================
       RENDER PRODUCTS
    ====================================================== */

    renderProducts(products) {

        this.productsGrid.innerHTML =
            '';


        if (
            products.length === 0
        ) {

            this.productsGrid.innerHTML = `

                <div class="loading">

                    ${this.getTranslation(
                        'noProducts',
                        'Tidak ada produk ditemukan.'
                    )}

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


    /* =====================================================
       PRODUCT CARD
    ====================================================== */

    renderProductCard(product) {

        const formattedPrice =
            new Intl.NumberFormat(
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
                product.price
            );


        const card =
            document.createElement(
                'div'
            );


        card.className =
            'card';


        /* =================================================
           TRANSLATION
        ================================================= */

        const sizeText =
            this.getTranslation(
                'size',
                'Ukuran'
            );


        const addCartText =
            this.getTranslation(
                'addCart',
                '+ Keranjang'
            );


        const buyText =
            this.getTranslation(
                'buy',
                'Beli Sekarang'
            );


        /* =================================================
           PRODUCT HTML
        ================================================= */

        card.innerHTML = `

            <div class="card-img-wrapper">

                <img
                    src="assets/products/${product.product_image}"
                    alt="${product.product_name}"
                    class="product-image clickable-image"

                    onerror="
                        this.src='https://placehold.co/400x400?text=${encodeURIComponent(product.product_name)}'
                    "
                >

            </div>


            <div class="card-content">

                <h3 class="card-title">

                    ${product.product_name}

                </h3>


                <div class="card-price">

                    ${formattedPrice}

                </div>


                <div class="product-rating">

                    ⭐ ${product.rating || 4.8}

                </div>


                <div class="product-size">

                    <label class="size-label">

                        ${sizeText}:

                    </label>


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

                    <button
                        class="btn btn-cart add-to-cart-btn"
                    >

                        ${addCartText}

                    </button>


                    <a
                        href="#"
                        target="_blank"
                        class="btn btn-whatsapp btn-buy-now"
                    >

                        ${buyText}

                    </a>

                </div>

            </div>

        `;


        /* =================================================
           SIZE SELECT
        ====================================================== */

        const sizeSelect =
            card.querySelector(
                '.size-select'
            );


        /* =================================================
           ADD TO CART
        ====================================================== */

        card.querySelector(
            '.add-to-cart-btn'
        )
        .addEventListener(
            'click',
            (e) => {

                e.stopPropagation();


                const selectedSize =
                    sizeSelect.value;


                let extraPrice =
                    0;


                if (
                    selectedSize ===
                    'Large (20 cm)'
                ) {

                    extraPrice =
                        15000;

                }

                else if (
                    selectedSize ===
                    'Xtra Large (25 cm)'
                ) {

                    extraPrice =
                        30000;

                }


                this.cart.addItem({

                    ...product,

                    selectedSize,

                    price:
                        parseFloat(
                            product.price
                        ) +
                        extraPrice

                });

            }
        );


        /* =================================================
           BUY NOW
        ====================================================== */

        const buyButton =
            card.querySelector(
                '.btn-buy-now'
            );


        const updateWhatsApp =
            () => {

                const selectedSize =
                    sizeSelect.value;


                let extraPrice =
                    0;


                if (
                    selectedSize ===
                    'Large (20 cm)'
                ) {

                    extraPrice =
                        15000;

                }

                else if (
                    selectedSize ===
                    'Xtra Large (25 cm)'
                ) {

                    extraPrice =
                        30000;

                }


                const finalPrice =
                    parseFloat(
                        product.price
                    ) +
                    extraPrice;


                const number =
                    STORE_CONFIG
                        .whatsappNumber;


                const message =
                    `Halo, saya tertarik membeli ${product.product_name}. ` +
                    `Ukuran: ${selectedSize}. ` +
                    `Harga: Rp ${finalPrice.toLocaleString('id-ID')}`;


                const encodedMessage =
                    encodeURIComponent(
                        message
                    );


                buyButton.href =
                    `https://wa.me/${number}?text=${encodedMessage}`;

            };


        updateWhatsApp();


        sizeSelect.addEventListener(
            'change',
            updateWhatsApp
        );


        /* =================================================
           IMAGE ZOOM
        ====================================================== */

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


                modal.classList.add(
                    'show'
                );

            }
        );


        /* =================================================
           APPEND CARD
        ====================================================== */

        this.productsGrid
            .appendChild(
                card
            );

    }


    /* =====================================================
       REFRESH CURRENT VIEW
    ====================================================== */

    refreshCurrentView() {

        if (
            this.currentView ===
            'categories'
        ) {

            this.buildCategories();

            return;

        }


        if (
            this.currentView ===
            'products'
        ) {

            const productText =
                this.getTranslation(
                    'product',
                    'Produk:'
                );


            this.categoryTitle.textContent =
                `${productText} ${this.currentCategoryName}`;


            this.renderProducts(
                this.currentProducts
            );

            return;

        }


        if (
            this.currentView ===
            'search'
        ) {

            const searchResult =
                this.getTranslation(
                    'searchResult',
                    'Hasil Pencarian:'
                );


            this.categoryTitle.textContent =
                `${searchResult} "${this.currentSearchQuery}"`;


            this.renderProducts(
                this.currentProducts
            );

        }

    }


    /* =====================================================
       SHOW CATEGORIES
    ====================================================== */

    showCategories() {

        this.currentView =
            'categories';


        this.productsSection
            .classList.add(
                'hidden'
            );


        this.categoriesSection
            .classList.remove(
                'hidden'
            );


        if (
            this.searchInput
        ) {

            this.searchInput.value =
                '';

        }


        this.buildCategories();

    }


    /* =====================================================
       WHATSAPP
    ====================================================== */

    createWhatsAppLink(
        productName
    ) {

        const number =
            STORE_CONFIG
                .whatsappNumber;


        const message =
            `Halo, saya tertarik membeli ${productName}`;


        const encodedMessage =
            encodeURIComponent(
                message
            );


        return `https://wa.me/${number}?text=${encodedMessage}`;

    }

}
