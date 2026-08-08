document.addEventListener('DOMContentLoaded', () => {

    const langId = document.getElementById('lang-id');
    const langEn = document.getElementById('lang-en');


    // =====================================================
    // TRANSLATIONS
    // =====================================================

    const translations = {

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

            buy:
                'Beli Sekarang',

            addCart:
                '+ Keranjang',

            searchResult:
                'Hasil Pencarian:',

            product:
                'Produk:',

            heroDescription:
                'Xwing Project menghadirkan jam tangan unik dengan strap brick yang colorful dan customizable. Kombinasikan warna, tambahkan karakter, dan buat jam tangan yang benar-benar mencerminkan gaya kamu.',

            heroCatalog:
                'Lihat Katalog',

            footerDescription:
                'Temukan produk terbaik kami dengan harga yang terjangkau. Belanja aman, mudah, dan terpercaya.',

            footerFindUs:
                'Temukan Kami di',

            loadingCategory:
                'Memuat kategori...',

            loadingProduct:
                'Memuat produk...',

            noCategory:
                'Tidak ada kategori ditemukan.',

            noProduct:
                'Tidak ada produk ditemukan.'

        },


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

            buy:
                'Buy Now',

            addCart:
                '+ Cart',

            searchResult:
                'Search Results:',

            product:
                'Product:',

            heroDescription:
                'Xwing Project offers unique watches with colorful and customizable brick straps. Mix colors, add characters, and create a watch that truly reflects your style.',

            heroCatalog:
                'View Catalog',

            footerDescription:
                'Discover our best products at affordable prices. Shop safely, easily, and confidently.',

            footerFindUs:
                'Find Us On',

            loadingCategory:
                'Loading categories...',

            loadingProduct:
                'Loading products...',

            noCategory:
                'No categories found.',

            noProduct:
                'No products found.'

        }

    };


    // =====================================================
    // HELPER
    // =====================================================

    function setText(id, text) {

        const element =
            document.getElementById(id);

        if (element) {

            element.textContent =
                text;

        }

    }


    // =====================================================
    // TRANSLATE DYNAMIC TEXT
    // =====================================================

    function translateExistingText(t) {

        /*
         * CART EMPTY
         */

        const cartEmpty =
            document.getElementById(
                'cart-empty-text'
            );

        if (cartEmpty) {

            cartEmpty.textContent =
                t.emptyCart;

        }


        /*
         * TOTAL
         */

        setText(
            'cart-total-label',
            t.total
        );


        /*
         * HERO
         */

        setText(
            'hero-description',
            t.heroDescription
        );


        setText(
            'hero-catalog-button',
            t.heroCatalog
        );


        /*
         * FOOTER
         */

        setText(
            'footer-description',
            t.footerDescription
        );


        setText(
            'footer-find-us',
            t.footerFindUs
        );


        /*
         * LOADING
         */

        setText(
            'categories-loading',
            t.loadingCategory
        );

        setText(
            'products-loading',
            t.loadingProduct
        );

    }


    // =====================================================
    // SET LANGUAGE
    // =====================================================

    function setLanguage(lang) {

        /*
         * Validasi
         */

        if (!translations[lang]) {

            lang = 'id';

        }


        /*
         * Save language
         */

        localStorage.setItem(
            'language',
            lang
        );


        /*
         * Translation object
         */

        const t =
            translations[lang];


        /*
         * Global language
         *
         * catalog.js akan membaca ini
         */

        window.currentLanguage =
            t;


        /*
         * HTML LANG
         */

        document.documentElement.lang =
            lang;


        // =================================================
        // NAVBAR
        // =================================================

        setText(
            'nav-home',
            t.home
        );

        setText(
            'nav-catalog',
            t.catalog
        );


        // =================================================
        // SEARCH
        // =================================================

        const searchInput =
            document.getElementById(
                'search-input'
            );

        if (searchInput) {

            searchInput.placeholder =
                t.search;

        }


        // =================================================
        // CATEGORY
        // =================================================

        const categoryTitle =
            document.querySelector(
                '#categories-section .section-title'
            );

        if (categoryTitle) {

            categoryTitle.textContent =
                t.category;

        }


        // =================================================
        // CART
        // =================================================

        const cartTitle =
            document.querySelector(
                '#cart-section .section-title'
            );

        if (cartTitle) {

            cartTitle.textContent =
                t.cart;

        }


        // =================================================
        // BACK BUTTON
        // =================================================

        setText(
            'back-button',
            t.back
        );


        // =================================================
        // CLEAR CART
        // =================================================

        setText(
            'clear-cart',
            t.clear
        );


        // =================================================
        // WHATSAPP
        // =================================================

        setText(
            'checkout-text',
            t.order
        );


        // =================================================
        // OTHER STATIC TEXT
        // =================================================

        translateExistingText(t);


        // =================================================
        // LANGUAGE BUTTON
        // =================================================

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

        }


        if (lang === 'en') {

            if (langEn) {

                langEn.classList.add(
                    'active'
                );

            }

        }


        // =================================================
        // REFRESH CART
        // =================================================

        if (
            window.catalog &&
            window.catalog.cart &&
            typeof window.catalog.cart.updateUI ===
            'function'
        ) {

            window.catalog.cart.updateUI();

        }


        // =================================================
        // REFRESH CATALOG
        // =================================================

        window.dispatchEvent(
            new Event(
                'languageChanged'
            )
        );

    }


    // =====================================================
    // ID BUTTON
    // =====================================================

    if (langId) {

        langId.addEventListener(
            'click',
            () => {

                setLanguage('id');

            }
        );

    }


    // =====================================================
    // EN BUTTON
    // =====================================================

    if (langEn) {

        langEn.addEventListener(
            'click',
            () => {

                setLanguage('en');

            }
        );

    }


    // =====================================================
    // LOAD SAVED LANGUAGE
    // =====================================================

    const savedLanguage =
        localStorage.getItem(
            'language'
        ) || 'id';


    setLanguage(
        savedLanguage
    );

});
