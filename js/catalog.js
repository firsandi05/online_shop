import { STORE_CONFIG } from '../config/config.js';
import { Cart } from './cart.js';


// =========================================================
// CATEGORY DESCRIPTIONS
// 1 DESKRIPSI UNTUK 1 KATEGORI
// Tidak perlu dimasukkan ke CSV.
// =========================================================

const CATEGORY_DESCRIPTIONS = {

    1: {
        id: {
            title: 'Q&Q Analog Replica',
            text: 'Koleksi Q&Q Analog Replica menghadirkan desain jam analog bergaya klasik dengan berbagai pilihan warna dan strap brick yang unik. Cocok untuk penggunaan sehari-hari maupun sebagai aksesori fashion yang playful dan berbeda.'
        },
        en: {
            title: 'Q&Q Analog Replica',
            text: 'The Q&Q Analog Replica collection features classic analog-style watch designs combined with unique brick straps. Available in various colors, these watches are suitable for everyday use or as a playful and distinctive fashion accessory.'
        }
    },

    2: {
        id: {
            title: 'Casio Digital Replica',
            text: 'Koleksi Casio Digital Replica mengusung tampilan digital yang simpel dan sporty. Desainnya cocok untuk kamu yang menyukai gaya retro, casual, dan praktis dengan karakter strap brick yang colorful.'
        },
        en: {
            title: 'Casio Digital Replica',
            text: 'The Casio Digital Replica collection features a simple and sporty digital watch design. It is ideal for those who enjoy a retro, casual, and practical style combined with a colorful brick strap.'
        }
    },

    3: {
        id: {
            title: 'Casio F91W Original',
            text: 'Koleksi Casio F91W Original menghadirkan Casio F91W original dengan desain digital klasik yang ikonik. Pilihan yang cocok untuk kamu yang menginginkan jam original dengan tampilan retro dan strap brick yang unik.'
        },
        en: {
            title: 'Casio F91W Original',
            text: 'The Casio F91W Original collection features the iconic original Casio F91W with its classic digital design. A great choice for those who want an original watch with a retro look and a unique brick strap.'
        }
    },

    4: {
        id: {
            title: 'Swatch Replica',
            text: 'Koleksi Swatch Replica menawarkan desain yang colorful dan playful dengan karakter strap brick khas XWing Project. Cocok untuk melengkapi outfit casual dan memberikan tampilan yang lebih colorful.'
        },
        en: {
            title: 'Swatch Replica',
            text: 'The Swatch Replica collection offers colorful and playful designs combined with XWing Project’s distinctive brick strap. These watches are ideal for casual outfits and adding a more colorful touch to your style.'
        }
    },

    5: {
        id: {
            title: 'Casio Analog Replica',
            text: 'Koleksi Casio Analog Replica menggunakan desain analog yang clean dan versatile. Dipadukan dengan strap brick, koleksi ini cocok digunakan untuk gaya casual maupun aktivitas sehari-hari.'
        },
        en: {
            title: 'Casio Analog Replica',
            text: 'The Casio Analog Replica collection features clean and versatile analog designs. Combined with a brick strap, these watches are suitable for casual styles and everyday activities.'
        }
    },

    6: {
        id: {
            title: 'Q&Q Trans Original',
            text: 'Koleksi Q&Q Trans Original menghadirkan jam Q&Q original dengan desain yang ringan dan colorful. Strap brick memberikan karakter yang berbeda dan dapat menjadi pilihan menarik untuk penggunaan sehari-hari.'
        },
        en: {
            title: 'Q&Q Trans Original',
            text: 'The Q&Q Trans Original collection features original Q&Q watches with lightweight and colorful designs. The brick strap adds a distinctive character, making them an interesting choice for everyday use.'
        }
    },

    7: {
        id: {
            title: 'Casio Digital Replica V2',
            text: 'Casio Digital Replica V2 merupakan variasi lain dari koleksi digital dengan tampilan yang sporty dan retro. Dipadukan dengan strap brick colorful untuk memberikan pilihan style yang lebih playful dan unik.'
        },
        en: {
            title: 'Casio Digital Replica V2',
            text: 'The Casio Digital Replica V2 collection offers another digital watch variation with a sporty and retro appearance. Combined with a colorful brick strap, it provides a more playful and distinctive style.'
        }
    },

    8: {
        id: {
            title: 'Q&Q For Kids Original',
            text: 'Koleksi Q&Q For Kids Original dirancang untuk memberikan tampilan jam yang colorful dan playful. Menggunakan jam Q&Q original dengan strap brick yang menarik, koleksi ini cocok untuk gaya anak-anak dan pengguna yang menyukai desain colorful.'
        },
        en: {
            title: 'Q&Q For Kids Original',
            text: 'The Q&Q For Kids Original collection offers colorful and playful watch designs. Featuring original Q&Q watches with attractive brick straps, this collection is suitable for kids and anyone who enjoys colorful designs.'
        }
    },

    9: {
        id: {
            title: 'Casio LA20WH Original',
            text: 'Koleksi Casio LA20WH Original menghadirkan jam Casio original dengan desain digital yang compact dan stylish. Dipadukan dengan strap brick untuk memberikan tampilan yang lebih unik dan berbeda.'
        },
        en: {
            title: 'Casio LA20WH Original',
            text: 'The Casio LA20WH Original collection features compact and stylish original Casio digital watches. Combined with a brick strap, the design becomes more unique and distinctive.'
        }
    },

    10: {
        id: {
            title: 'Q&Q Mini Elegance Original',
            text: 'Koleksi Q&Q Mini Elegance Original menawarkan desain yang compact dan elegan. Cocok untuk pengguna yang menyukai ukuran jam yang lebih kecil dengan tampilan yang simple dan stylish.'
        },
        en: {
            title: 'Q&Q Mini Elegance Original',
            text: 'The Q&Q Mini Elegance Original collection offers a compact and elegant design. It is suitable for users who prefer smaller watches with a simple and stylish appearance.'
        }
    },

    11: {
        id: {
            title: 'Q&Q Mini Elegance Original V2',
            text: 'Versi kedua dari Q&Q Mini Elegance Original dengan pilihan desain yang berbeda namun tetap mempertahankan karakter compact dan elegan. Cocok untuk penggunaan sehari-hari maupun sebagai aksesori fashion.'
        },
        en: {
            title: 'Q&Q Mini Elegance Original V2',
            text: 'The second version of the Q&Q Mini Elegance Original collection offers different design options while maintaining its compact and elegant character. Suitable for everyday use or as a fashion accessory.'
        }
    },

    12: {
        id: {
            title: 'SKMEI Trans Original',
            text: 'Koleksi SKMEI Trans Original menghadirkan jam SKMEI original dengan desain colorful dan modern. Strap brick memberikan sentuhan unik sehingga jam lebih mudah dipadukan dengan berbagai gaya.'
        },
        en: {
            title: 'SKMEI Trans Original',
            text: 'The SKMEI Trans Original collection features original SKMEI watches with colorful and modern designs. The brick strap adds a unique touch that makes the watches easy to pair with different styles.'
        }
    },

    13: {
        id: {
            title: 'SKMEI Small Original',
            text: 'Koleksi SKMEI Small Original menawarkan ukuran yang lebih compact dengan desain yang simple dan stylish. Cocok untuk pengguna yang menyukai jam berukuran kecil dan nyaman digunakan sehari-hari.'
        },
        en: {
            title: 'SKMEI Small Original',
            text: 'The SKMEI Small Original collection offers a more compact size with a simple and stylish design. It is ideal for users who prefer smaller watches that are comfortable for everyday use.'
        }
    },

    14: {
        id: {
            title: 'SKMEI Elegance Original',
            text: 'Koleksi SKMEI Elegance Original mengutamakan tampilan yang lebih clean dan elegan. Jam original SKMEI dipadukan dengan strap brick untuk menghasilkan kombinasi antara gaya elegan dan playful.'
        },
        en: {
            title: 'SKMEI Elegance Original',
            text: 'The SKMEI Elegance Original collection focuses on a clean and elegant appearance. Original SKMEI watches are combined with brick straps to create a balance between elegant and playful styling.'
        }
    },

    15: {
        id: {
            title: 'Q&Q Elegance Original',
            text: 'Koleksi Q&Q Elegance Original menawarkan desain yang clean dan elegan untuk penggunaan sehari-hari maupun acara tertentu. Dipadukan dengan strap brick khas XWing Project untuk memberikan karakter yang lebih unik.'
        },
        en: {
            title: 'Q&Q Elegance Original',
            text: 'The Q&Q Elegance Original collection offers a clean and elegant design suitable for everyday use and various occasions. The distinctive XWing Project brick strap adds a unique character to the watch.'
        }
    }

};


// =========================================================
// CATALOG CLASS
// =========================================================

export class Catalog {

    constructor(data) {

        this.data = Array.isArray(data) ? data : [];

        // =================================================
        // ELEMENTS
        // =================================================

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


        // =================================================
        // CATEGORY DESCRIPTION ELEMENTS
        // =================================================

        this.categoryDescription =
            document.getElementById('category-description');

        this.categoryDescriptionContent =
            document.getElementById('category-description-content');


        // =================================================
        // CART
        // =================================================

        this.cart = new Cart();


        // =================================================
        // CURRENT VIEW
        // =================================================

        this.currentView = 'categories';

        this.currentProducts = [];

        this.currentCategoryId = null;

        this.currentCategoryName = '';

        this.currentSearchQuery = '';


        // =================================================
        // GLOBAL CATALOG
        // =================================================

        window.catalog = this;


        // =================================================
        // EVENTS
        // =================================================

        this.initEvents();


        // =================================================
        // LANGUAGE CHANGE
        // =================================================

        window.addEventListener(
            'languageChanged',
            () => {
                this.refreshCurrentView();
            }
        );

    }


    // =====================================================
    // TRANSLATION
    // =====================================================

    getTranslation(key, fallback = '') {

        if (
            window.currentLanguage &&
            window.currentLanguage[key]
        ) {
            return window.currentLanguage[key];
        }

        return fallback;
    }


    // =====================================================
    // CURRENT LANGUAGE
    // =====================================================

    getCurrentLanguage() {

        return (
            localStorage.getItem('language') || 'id'
        );

    }


    // =====================================================
    // FORMAT PRICE
    // =====================================================

    formatPrice(price) {

        const numericPrice =
            parseFloat(price) || 0;

        const language =
            this.getCurrentLanguage();


        if (language === 'id') {

            return new Intl.NumberFormat(
                'id-ID',
                {
                    style: 'currency',
                    currency: 'IDR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }
            ).format(numericPrice);

        }


        const USD_RATE = 15000;

        const usdPrice =
            numericPrice / USD_RATE;


        return new Intl.NumberFormat(
            'en-US',
            {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        ).format(usdPrice);

    }


    // =====================================================
    // GET PRICE WITH SIZE
    // =====================================================

    getPriceWithSize(
        basePrice,
        selectedSize
    ) {

        let extraPrice = 0;


        if (
            selectedSize === 'Large (20 cm)'
        ) {

            extraPrice = 15000;

        }

        else if (
            selectedSize === 'Xtra Large (25 cm)'
        ) {

            extraPrice = 30000;

        }


        return (
            parseFloat(basePrice) + extraPrice
        );

    }


    // =====================================================
    // EVENTS
    // =====================================================

    initEvents() {

        // =================================================
        // BACK BUTTON
        // =================================================

        if (this.backButton) {

            this.backButton.addEventListener(
                'click',
                () => {
                    this.showCategories();
                }
            );

        }


        // =================================================
        // SEARCH
        // =================================================

        if (this.searchInput) {

            this.searchInput.addEventListener(
                'input',
                (e) => {
                    this.handleSearch(e.target.value);
                }
            );

        }


        // =================================================
        // IMAGE MODAL
        // =================================================

        const modal =
            document.getElementById('imageModal');

        if (modal) {

            modal.addEventListener(
                'click',
                () => {
                    modal.classList.remove('show');
                }
            );

        }

    }


    // =====================================================
    // SEARCH
    // =====================================================

    handleSearch(query) {

        const searchTerm =
            String(query)
                .toLowerCase()
                .trim();


        if (
            searchTerm.length === 0
        ) {

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
                        productName.includes(searchTerm) ||
                        categoryName.includes(searchTerm)
                    );

                }
            );


        this.showSearchResults(
            results,
            searchTerm
        );

    }


    // =====================================================
    // SEARCH RESULTS
    // =====================================================

    showSearchResults(
        results,
        query
    ) {

        this.currentView = 'search';

        this.currentProducts = results;

        this.currentSearchQuery = query;


        this.categoriesSection.classList.add(
            'hidden'
        );

        this.productsSection.classList.remove(
            'hidden'
        );


        this.hideCategoryDescription();


        if (this.backButton) {

            this.backButton.classList.remove(
                'hidden'
            );

        }


        const searchResult =
            this.getTranslation(
                'searchResult',
                'Hasil Pencarian:'
            );


        this.categoryTitle.textContent =
            `${searchResult} "${query}"`;


        this.renderProducts(results);

    }


    // =====================================================
    // BUILD CATEGORIES
    // =====================================================

    buildCategories() {

        this.currentView = 'categories';

        this.hideCategoryDescription();


        if (!this.categoriesGrid) {
            return;
        }


        this.categoriesGrid.innerHTML = '';


        const categoriesMap =
            new Map();


        this.data.forEach(
            item => {

                if (
                    !categoriesMap.has(
                        item.category_id
                    )
                ) {

                    categoriesMap.set(
                        item.category_id,
                        {
                            id: item.category_id,
                            name: item.category_name,
                            image: item.category_image,
                            rating: item.category_rating,
                            sold: item.category_sold
                        }
                    );

                }

            }
        );


        const categories =
            Array.from(
                categoriesMap.values()
            );


        if (
            categories.length === 0
        ) {

            const noCategory =
                this.getTranslation(
                    'noCategory',
                    'Tidak ada kategori ditemukan.'
                );


            this.categoriesGrid.innerHTML = `
                <div class="loading">
                    ${noCategory}
                </div>
            `;

            return;

        }


        categories.forEach(
            category => {

                const card =
                    document.createElement('div');


                card.className = 'card';


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

                    <div class="card-content category-card-content">

                        <h3 class="card-title">
                            ${category.name}
                        </h3>

                        <div class="category-rating">
                            ⭐ ${category.rating || 0}
                            |
                            ${category.sold || 0} Sold
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


                this.categoriesGrid.appendChild(
                    card
                );

            }
        );

    }


    // =====================================================
    // SHOW PRODUCTS BY CATEGORY
    // =====================================================

    showProductsByCategory(
        category_id,
        category_name
    ) {

        this.currentView = 'products';

        this.currentCategoryId =
            category_id;

        this.currentCategoryName =
            category_name;


        this.categoriesSection.classList.add(
            'hidden'
        );

        this.productsSection.classList.remove(
            'hidden'
        );


        if (this.backButton) {

            this.backButton.classList.remove(
                'hidden'
            );

        }


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
                    item.category_id === category_id
            );


        this.currentProducts =
            products;


        this.renderProducts(
            products
        );


        // =================================================
        // SHOW CATEGORY DESCRIPTION
        // =================================================

        this.renderCategoryDescription(
            category_id,
            category_name
        );

    }


    // =====================================================
    // RENDER CATEGORY DESCRIPTION
    // =====================================================

    renderCategoryDescription(
        categoryId,
        categoryName
    ) {

        if (
            !this.categoryDescription ||
            !this.categoryDescriptionContent
        ) {

            return;

        }


        const categoryData =
            CATEGORY_DESCRIPTIONS[
                String(categoryId)
            ];


        if (!categoryData) {

            this.hideCategoryDescription();

            return;

        }


        const language =
            this.getCurrentLanguage();


        const description =
            categoryData[language] ||
            categoryData.id;


        const descriptionTitle =
            this.getTranslation(
                'categoryDescription',
                'Tentang Kategori Ini'
            );


        this.categoryDescriptionContent.innerHTML = `

            <div class="category-description-header">

                <div class="category-description-icon">
                    ℹ
                </div>

                <div>

                    <span class="category-description-label">
                        ${descriptionTitle}
                    </span>

                    <h3>
                        ${description.title || categoryName}
                    </h3>

                </div>

            </div>


            <div class="category-description-text">

                <p>
                    ${description.text}
                </p>

            </div>

        `;


        this.categoryDescription.classList.remove(
            'hidden'
        );

    }


    // =====================================================
    // HIDE CATEGORY DESCRIPTION
    // =====================================================

    hideCategoryDescription() {

        if (this.categoryDescription) {

            this.categoryDescription.classList.add(
                'hidden'
            );

        }

    }


    // =====================================================
    // RENDER PRODUCTS
    // =====================================================

    renderProducts(products) {

        if (!this.productsGrid) {
            return;
        }


        this.productsGrid.innerHTML = '';


        if (
            products.length === 0
        ) {

            const noProduct =
                this.getTranslation(
                    'noProduct',
                    'Tidak ada produk ditemukan.'
                );


            this.productsGrid.innerHTML = `
                <div class="loading">
                    ${noProduct}
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


    // =====================================================
    // PRODUCT CARD
    // =====================================================

    renderProductCard(product) {

        const formattedPrice =
            this.formatPrice(
                product.price
            );


        // =================================================
        // TRANSLATIONS
        // =================================================

        const sizeText =
            this.getTranslation(
                'size',
                'Size'
            );


        const addCartText =
            this.getTranslation(
                'addCart',
                '+ Cart'
            );


        const buyText =
            this.getTranslation(
                'buy',
                'Buy Now'
            );


        // =================================================
        // CREATE CARD
        // =================================================

        const card =
            document.createElement('div');


        card.className = 'card';


        // =================================================
        // PRODUCT HTML
        // =================================================

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
                        rel="noopener"
                        class="btn btn-whatsapp btn-buy-now"
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
        // ADD TO CART
        // =================================================

        card.querySelector(
            '.add-to-cart-btn'
        ).addEventListener(
            'click',
            (e) => {

                e.stopPropagation();


                const selectedSize =
                    sizeSelect.value;


                const finalPrice =
                    this.getPriceWithSize(
                        product.price,
                        selectedSize
                    );


                this.cart.addItem({

                    ...product,

                    selectedSize,

                    price:
                        finalPrice

                });

            }
        );


        // =================================================
        // BUY NOW
        // =================================================

        const buyButton =
            card.querySelector(
                '.btn-buy-now'
            );


        const updateWhatsApp =
            () => {

                const selectedSize =
                    sizeSelect.value;


                const finalPrice =
                    this.getPriceWithSize(
                        product.price,
                        selectedSize
                    );


                const number =
                    STORE_CONFIG.whatsappNumber;


                const language =
                    this.getCurrentLanguage();


                let priceText;


                if (
                    language === 'en'
                ) {

                    const USD_RATE =
                        15000;


                    const usdPrice =
                        finalPrice / USD_RATE;


                    priceText =
                        new Intl.NumberFormat(
                            'en-US',
                            {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 2
                            }
                        ).format(
                            usdPrice
                        );

                }

                else {

                    priceText =
                        this.formatPrice(
                            finalPrice
                        );

                }


                const message =
                    `Halo, saya tertarik membeli ${product.product_name}. Size: ${selectedSize}. Harga: ${priceText}`;


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


        // =================================================
        // IMAGE ZOOM
        // =================================================

        const image =
            card.querySelector(
                '.clickable-image'
            );


        if (image) {

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


                    if (
                        modal &&
                        modalImage
                    ) {

                        modalImage.src =
                            `assets/products/${product.product_image}`;


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

        this.productsGrid.appendChild(
            card
        );

    }


    // =====================================================
    // REFRESH AFTER LANGUAGE CHANGE
    // =====================================================

    refreshCurrentView() {

        // =================================================
        // CATEGORIES
        // =================================================

        if (
            this.currentView ===
            'categories'
        ) {

            this.buildCategories();

            return;

        }


        // =================================================
        // PRODUCTS
        // =================================================

        if (
            this.currentView ===
            'products'
        ) {

            const productText =
                this.getTranslation(
                    'product',
                    'Product:'
                );


            this.categoryTitle.textContent =
                `${productText} ${this.currentCategoryName}`;


            this.renderProducts(
                this.currentProducts
            );


            this.renderCategoryDescription(
                this.currentCategoryId,
                this.currentCategoryName
            );


            return;

        }


        // =================================================
        // SEARCH
        // =================================================

        if (
            this.currentView ===
            'search'
        ) {

            const searchResult =
                this.getTranslation(
                    'searchResult',
                    'Search Results:'
                );


            this.categoryTitle.textContent =
                `${searchResult} "${this.currentSearchQuery}"`;


            this.renderProducts(
                this.currentProducts
            );


            this.hideCategoryDescription();

        }

    }


    // =====================================================
    // SHOW CATEGORIES
    // =====================================================

    showCategories() {

        this.currentView =
            'categories';


        this.productsSection.classList.add(
            'hidden'
        );


        this.categoriesSection.classList.remove(
            'hidden'
        );


        this.hideCategoryDescription();


        if (
            this.searchInput
        ) {

            this.searchInput.value =
                '';

        }


        this.buildCategories();

    }


    // =====================================================
    // WHATSAPP LINK
    // =====================================================

    createWhatsAppLink(
        productName
    ) {

        const number =
            STORE_CONFIG.whatsappNumber;


        const message =
            `Halo, saya tertarik membeli ${productName}`;


        const encodedMessage =
            encodeURIComponent(
                message
            );


        return (
            `https://wa.me/${number}?text=${encodedMessage}`
        );

    }

}
