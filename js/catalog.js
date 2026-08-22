import { STORE_CONFIG } from '../config/config.js';

import { Cart } from './cart.js';

import {
    CATEGORY_DESCRIPTIONS
} from './categoryDescriptions.js';



export class Catalog {


    constructor(data) {


        this.data = data;


        // =====================================================
        // ELEMENTS
        // =====================================================

        this.categoriesSection =
            document.getElementById(
                'categories-section'
            );


        this.productsSection =
            document.getElementById(
                'products-section'
            );


        this.categoriesGrid =
            document.getElementById(
                'categories-grid'
            );


        this.productsGrid =
            document.getElementById(
                'products-grid'
            );


        this.categoryTitle =
            document.getElementById(
                'category-title'
            );


        this.backButton =
            document.getElementById(
                'back-button'
            );


        this.searchInput =
            document.getElementById(
                'search-input'
            );


        // =====================================================
        // CATEGORY DESCRIPTION
        // =====================================================

        this.categoryDescription =
            document.getElementById(
                'category-description'
            );


        this.categoryDescriptionLabel =
            document.getElementById(
                'category-description-label'
            );


        this.categoryDescriptionTitle =
            document.getElementById(
                'category-description-title'
            );


        this.categoryDescriptionText =
            document.getElementById(
                'category-description-text'
            );



        // =====================================================
        // CART
        // =====================================================

        this.cart =
            new Cart();



        // =====================================================
        // CURRENT VIEW
        // =====================================================

        this.currentView =
            'categories';


        this.currentProducts =
            [];


        this.currentCategoryId =
            null;


        this.currentCategoryName =
            '';


        this.currentSearchQuery =
            '';



        // =====================================================
        // GLOBAL
        // =====================================================

        window.catalog =
            this;



        // =====================================================
        // EVENTS
        // =====================================================

        this.initEvents();



        // =====================================================
        // LANGUAGE CHANGE
        // =====================================================

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

    getTranslation(
        key,
        fallback = ''
    ) {


        if (
            window.currentLanguage &&
            window.currentLanguage[key]
        ) {

            return (
                window.currentLanguage[key]
            );

        }


        return fallback;

    }



    // =====================================================
    // CURRENT LANGUAGE
    // =====================================================

    getCurrentLanguage() {


        return (

            localStorage.getItem(
                'language'
            )

            || 'id'

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



        // =================================================
        // INDONESIAN
        // =================================================

        if (
            language === 'id'
        ) {


            return new Intl.NumberFormat(
                'id-ID',
                {

                    style:
                        'currency',

                    currency:
                        'IDR',

                    minimumFractionDigits:
                        0,

                    maximumFractionDigits:
                        0

                }
            ).format(
                numericPrice
            );

        }



        // =================================================
        // ENGLISH / USD
        // =================================================

        const USD_RATE =
            15000;


        const usdPrice =
            numericPrice /
            USD_RATE;


        return new Intl.NumberFormat(
            'en-US',
            {

                style:
                    'currency',

                currency:
                    'USD',

                minimumFractionDigits:
                    2,

                maximumFractionDigits:
                    2

            }
        ).format(
            usdPrice
        );

    }



    // =====================================================
    // PRICE WITH SIZE
    // =====================================================

    getPriceWithSize(
        basePrice,
        selectedSize
    ) {


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


        return (

            parseFloat(
                basePrice
            )

            + extraPrice

        );

    }



    // =====================================================
    // EVENTS
    // =====================================================

    initEvents() {


        // BACK

        if (
            this.backButton
        ) {

            this.backButton.addEventListener(
                'click',
                () => {

                    this.showCategories();

                }
            );

        }



        // SEARCH

        if (
            this.searchInput
        ) {

            this.searchInput.addEventListener(
                'input',
                (e) => {

                    this.handleSearch(
                        e.target.value
                    );

                }
            );

        }



        // IMAGE MODAL

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



    // =====================================================
    // SEARCH
    // =====================================================

    handleSearch(query) {


        const searchTerm =
            query
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
                            product.product_name ||
                            ''
                        )
                        .toLowerCase();


                    const categoryName =
                        String(
                            product.category_name ||
                            ''
                        )
                        .toLowerCase();


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



    // =====================================================
    // SEARCH RESULTS
    // =====================================================

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


        this.hideCategoryDescription();



        if (
            this.backButton
        ) {

            this.backButton
                .classList.remove(
                    'hidden'
                );

        }


        const searchResult =
            this.getTranslation(
                'searchResult',
                'Search Results:'
            );


        this.categoryTitle.textContent =
            `${searchResult} "${query}"`;


        this.renderProducts(
            results
        );

    }



    // =====================================================
    // BUILD CATEGORIES
    // =====================================================

    buildCategories() {


        this.currentView =
            'categories';


        this.categoriesGrid.innerHTML =
            '';


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

            }
        );



        const categories =
            Array.from(
                categoriesMap.values()
            );



        if (
            categories.length === 0
        ) {


            this.categoriesGrid.innerHTML = `

                <div class="loading">

                    Tidak ada kategori ditemukan.

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
                        class="card-content category-card-content"
                    >

                        <h3
                            class="card-title"
                        >

                            ${category.name}

                        </h3>


                        <div class="category-rating">

                            ⭐ ${category.rating || 0}

                            |

                            ${category.sold || 0}

                            Sold

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



    // =====================================================
    // SHOW PRODUCTS BY CATEGORY
    // =====================================================

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



        if (
            this.backButton
        ) {

            this.backButton
                .classList.remove(
                    'hidden'
                );

        }



        const productText =
            this.getTranslation(
                'product',
                'Product:'
            );


        this.categoryTitle.textContent =
            `${productText} ${category_name}`;



        const products =
            this.data.filter(
                item =>
                    String(
                        item.category_id
                    ) ===
                    String(
                        category_id
                    )
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
            !this.categoryDescriptionText
        ) {

            return;

        }



        const description =
            CATEGORY_DESCRIPTIONS[
                categoryId
            ];



        // =================================================
        // NO DESCRIPTION
        // =================================================

        if (
            !description
        ) {

            this.hideCategoryDescription();

            return;

        }



        const language =
            this.getCurrentLanguage();



        const text =
            description[
                language
            ]
            ||
            description.id
            ||
            description.en
            ||
            '';



        if (
            !text.trim()
        ) {

            this.hideCategoryDescription();

            return;

        }



        // =================================================
        // TITLE
        // =================================================

        const title =
            language === 'en'
                ? 'About This Collection'
                : 'Tentang Koleksi Ini';



        if (
            this.categoryDescriptionLabel
        ) {

            this.categoryDescriptionLabel
                .textContent =
                    title;

        }



        if (
            this.categoryDescriptionTitle
        ) {

            this.categoryDescriptionTitle
                .textContent =
                    categoryName;

        }



        this.categoryDescriptionText
            .textContent =
                text;



        this.categoryDescription
            .classList.remove(
                'hidden'
            );

    }



    // =====================================================
    // HIDE CATEGORY DESCRIPTION
    // =====================================================

    hideCategoryDescription() {


        if (
            this.categoryDescription
        ) {

            this.categoryDescription
                .classList.add(
                    'hidden'
                );

        }

    }



    // =====================================================
    // RENDER PRODUCTS
    // =====================================================

    renderProducts(
        products
    ) {


        this.productsGrid.innerHTML =
            '';



        if (
            products.length === 0
        ) {


            this.productsGrid.innerHTML = `

                <div class="loading">

                    Tidak ada produk ditemukan.

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

    renderProductCard(
        product
    ) {


        const formattedPrice =
            this.formatPrice(
                product.price
            );



        const card =
            document.createElement(
                'div'
            );


        card.className =
            'card';



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
        // HTML
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
        // SIZE
        // =================================================

        const sizeSelect =
            card.querySelector(
                '.size-select'
            );



        // =================================================
        // ADD CART
        // =================================================

        card.querySelector(
            '.add-to-cart-btn'
        )
        .addEventListener(
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
                    STORE_CONFIG
                        .whatsappNumber;


                const language =
                    this.getCurrentLanguage();


                let priceText;



                if (
                    language === 'en'
                ) {


                    const USD_RATE =
                        15000;


                    const usdPrice =
                        finalPrice /
                        USD_RATE;


                    priceText =
                        new Intl.NumberFormat(
                            'en-US',
                            {

                                style:
                                    'currency',

                                currency:
                                    'USD',

                                minimumFractionDigits:
                                    2

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
                    `Halo, saya tertarik membeli ${product.product_name}. ` +
                    `Size: ${selectedSize}. ` +
                    `Harga: ${priceText}`;



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
        // IMAGE MODAL
        // =================================================

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



        // =================================================
        // APPEND
        // =================================================

        this.productsGrid
            .appendChild(
                card
            );

    }



    // =====================================================
    // REFRESH AFTER LANGUAGE CHANGE
    // =====================================================

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
                    'Product:'
                );


            this.categoryTitle.textContent =
                `${productText} ${this.currentCategoryName}`;


            this.renderProducts(
                this.currentProducts
            );



            // REFRESH DESCRIPTION

            this.renderCategoryDescription(
                this.currentCategoryId,
                this.currentCategoryName
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
                    'Search Results:'
                );


            this.categoryTitle.textContent =
                `${searchResult} "${this.currentSearchQuery}"`;


            this.renderProducts(
                this.currentProducts
            );

        }

    }



    // =====================================================
    // SHOW CATEGORIES
    // =====================================================

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
            STORE_CONFIG
                .whatsappNumber;


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
