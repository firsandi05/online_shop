document.addEventListener('DOMContentLoaded', () => {

    /* =====================================================
       LANGUAGE BUTTON
    ====================================================== */

    const langId = document.getElementById('lang-id');
    const langEn = document.getElementById('lang-en');


    /* =====================================================
       TRANSLATIONS
    ====================================================== */

    const translations = {

        /* =================================================
           INDONESIAN
        ================================================= */

        id: {

            search:
                'Cari produk...',

            category:
                'Kategori Produk',

            cart:
                'Keranjang Belanja',

            back:
                '← Kembali ke Kategori',

            order:
                'Pesan (WA)',

            clear:
                'Kosongkan',

            emptyCart:
                'Keranjang masih kosong',

            total:
                'Total Keseluruhan:',

            home:
                'Home',

            catalog:
                'Katalog',

            size:
                'Ukuran',

            buy:
                'Beli Sekarang',

            addCart:
                '+ Keranjang',

            searchResult:
                'Hasil Pencarian:',

            product:
                'Produk:',

            heroButton:
                'Lihat Katalog',

            loadingCategories:
                'Memuat kategori...',

            loadingProducts:
                'Memuat produk...',

            footerDescription:
                'Temukan produk terbaik kami dengan harga yang terjangkau. Belanja aman, mudah, dan terpercaya.',

            findUs:
                'Temukan Kami di',

            variant:
                'Varian',

            color:
                'Warna',

            quantity:
                'Jumlah',

            price:
                'Harga',

            description:
                'Deskripsi',

            selectSize:
                'Pilih Ukuran',

            selectVariant:
                'Pilih Varian',

            addToCart:
                'Tambah ke Keranjang',

            continueShopping:
                'Lanjut Belanja',

            noProducts:
                'Produk tidak ditemukan',

            chooseProduct:
                'Pilih Produk',

            available:
                'Tersedia',

            outOfStock:
                'Stok Habis',

            loading:
                'Memuat...'

        },


        /* =================================================
           ENGLISH
        ================================================= */

        en: {

            search:
                'Search products...',

            category:
                'Product Categories',

            cart:
                'Shopping Cart',

            back:
                '← Back to Categories',

            order:
                'Order (WA)',

            clear:
                'Clear',

            emptyCart:
                'Cart is empty',

            total:
                'Grand Total:',

            home:
                'Home',

            catalog:
                'Catalog',

            size:
                'Size',

            buy:
                'Buy Now',

            addCart:
                '+ Cart',

            searchResult:
                'Search Results:',

            product:
                'Products:',

            heroButton:
                'View Catalog',

            loadingCategories:
                'Loading categories...',

            loadingProducts:
                'Loading products...',

            footerDescription:
                'Find our best products at affordable prices. Shop safely, easily, and confidently.',

            findUs:
                'Find Us On',

            variant:
                'Variant',

            color:
                'Color',

            quantity:
                'Quantity',

            price:
                'Price',

            description:
                'Description',

            selectSize:
                'Select Size',

            selectVariant:
                'Select Variant',

            addToCart:
                'Add to Cart',

            continueShopping:
                'Continue Shopping',

            noProducts:
                'No products found',

            chooseProduct:
                'Choose Product',

            available:
                'Available',

            outOfStock:
                'Out of Stock',

            loading:
                'Loading...'

        }

    };


    /* =====================================================
       SET LANGUAGE
    ====================================================== */

    function setLanguage(lang) {

        /* Safety check */

        if (!translations[lang]) {
            lang = 'id';
        }


        /* Save language */

        localStorage.setItem(
            'language',
            lang
        );


        /* Current translation */

        const t =
            translations[lang];


        /* =================================================
           NAVBAR
        ================================================= */

        const navHome =
            document.getElementById('nav-home');

        if (navHome) {
            navHome.textContent =
                t.home;
        }


        const navCatalog =
            document.getElementById('nav-catalog');

        if (navCatalog) {
            navCatalog.textContent =
                t.catalog;
        }


        /* =================================================
           SEARCH
        ================================================= */

        const searchInput =
            document.getElementById('search-input');

        if (searchInput) {

            searchInput.placeholder =
                t.search;

        }


        /* =================================================
           HERO BUTTON
        ================================================= */

        const heroButton =
            document.getElementById(
                'hero-catalog-button'
            );

        if (heroButton) {

            heroButton.textContent =
                t.heroButton;

        }


        /* =================================================
           CATEGORY SECTION
        ================================================= */

        const categoryTitle =
            document.querySelector(
                '#categories-section .section-title'
            );

        if (categoryTitle) {

            categoryTitle.textContent =
                t.category;

        }


        /* =================================================
           PRODUCT SECTION
        ================================================= */

        const backButton =
            document.getElementById(
                'back-button'
            );

        if (backButton) {

            backButton.textContent =
                t.back;

        }


        /* =================================================
           CART SECTION
        ================================================= */

        const cartTitle =
            document.querySelector(
                '#cart-section .section-title'
            );

        if (cartTitle) {

            cartTitle.textContent =
                t.cart;

        }


        /* =================================================
           CART EMPTY
        ================================================= */

        const emptyCart =
            document.getElementById(
                'cart-empty-text'
            );

        if (emptyCart) {

            emptyCart.textContent =
                t.emptyCart;

        }


        /* =================================================
           CART TOTAL
        ================================================= */

        const totalLabel =
            document.getElementById(
                'cart-total-label'
            );

        if (totalLabel) {

            totalLabel.textContent =
                t.total;

        }


        /* =================================================
           CLEAR CART
        ================================================= */

        const clearCart =
            document.getElementById(
                'clear-cart'
            );

        if (clearCart) {

            clearCart.textContent =
                t.clear;

        }


        /* =================================================
           CHECKOUT WHATSAPP
        ================================================= */

        const checkout =
            document.getElementById(
                'checkout-whatsapp'
            );

        if (checkout) {

            /*
             * Preserve SVG icon.
             * Only change text node.
             */

            let textNode = null;

            checkout.childNodes.forEach(
                node => {

                    if (
                        node.nodeType ===
                        Node.TEXT_NODE
                    ) {

                        if (
                            node.textContent.trim()
                        ) {

                            textNode = node;

                        }

                    }

                }
            );


            if (textNode) {

                textNode.textContent =
                    ` ${t.order}`;

            } else {

                checkout.appendChild(
                    document.createTextNode(
                        ` ${t.order}`
                    )
                );

            }

        }


        /* =================================================
           LOADING CATEGORY
        ================================================= */

        const categoryLoading =
            document.getElementById(
                'categories-loading'
            );

        if (categoryLoading) {

            categoryLoading.textContent =
                t.loadingCategories;

        }


        /* =================================================
           LOADING PRODUCTS
        ================================================= */

        const productLoading =
            document.getElementById(
                'products-loading'
            );

        if (productLoading) {

            productLoading.textContent =
                t.loadingProducts;

        }


        /* =================================================
           FOOTER
        ================================================= */

        const footerDescription =
            document.querySelector(
                '.footer-brand p'
            );

        if (footerDescription) {

            footerDescription.textContent =
                t.footerDescription;

        }


        const findUs =
            document.querySelector(
                '.footer-social h4'
            );

        if (findUs) {

            findUs.textContent =
                t.findUs;

        }


        /* =================================================
           CATEGORY TITLE
        ================================================= */

        const categoryTitleDynamic =
            document.getElementById(
                'category-title'
            );

        if (
            categoryTitleDynamic &&
            (
                categoryTitleDynamic.textContent.trim() ===
                'Produk' ||

                categoryTitleDynamic.textContent.trim() ===
                'Products'
            )
        ) {

            categoryTitleDynamic.textContent =
                t.product;

        }


        /* =================================================
           GLOBAL TRANSLATION
        ================================================= */

        /*
         * app.js bisa mengambil translation
         * melalui window.currentLanguage
         */

        window.currentLanguage = t;

        window.currentLanguageCode = lang;


        /*
         * Simpan juga object lengkap.
         */

        window.translations =
            translations;


        /* =================================================
           REFRESH CART
        ================================================= */

        if (
            window.catalog &&
            window.catalog.cart &&
            typeof
            window.catalog.cart.updateUI ===
            'function'
        ) {

            window.catalog.cart.updateUI();

        }


        /* =================================================
           ACTIVE LANGUAGE BUTTON
        ================================================= */

        if (langId) {

            langId.classList.remove(
                'active'
            );

        }


        if (langEn) {

            langEn.classList.remove(
                'active'
            );

        }


        if (lang === 'id') {

            if (langId) {

                langId.classList.add(
                    'active'
                );

            }

        } else {

            if (langEn) {

                langEn.classList.add(
                    'active'
                );

            }

        }

    }


    /* =====================================================
       LANGUAGE BUTTON EVENTS
    ====================================================== */

    if (langId) {

        langId.addEventListener(
            'click',
            () => {

                setLanguage('id');

            }
        );

    }


    if (langEn) {

        langEn.addEventListener(
            'click',
            () => {

                setLanguage('en');

            }
        );

    }


    /* =====================================================
       LOAD SAVED LANGUAGE
    ====================================================== */

    const savedLanguage =
        localStorage.getItem(
            'language'
        ) || 'id';


    setLanguage(
        savedLanguage
    );


    /* =====================================================
       MAKE FUNCTION GLOBAL
    ====================================================== */

    window.setLanguage =
        setLanguage;

});
