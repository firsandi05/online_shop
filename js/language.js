document.addEventListener('DOMContentLoaded', () => {

    const langId = document.getElementById('lang-id');
    const langEn = document.getElementById('lang-en');


    /* =====================================================
       TRANSLATIONS
    ====================================================== */

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

            sold:
                'Terjual'

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

            size:
                'Size',

            buy:
                'Buy Now',

            addCart:
                '+ Cart',

            searchResult:
                'Search Results:',

            product:
                'Product:',

            sold:
                'Sold'

        }

    };


    /* =====================================================
       SET LANGUAGE
    ====================================================== */

    function setLanguage(lang) {

        /*
         * Pastikan language valid
         */

        if (!translations[lang]) {
            lang = 'id';
        }


        /*
         * Simpan language
         */

        localStorage.setItem(
            'language',
            lang
        );


        /*
         * Ambil translation
         */

        const t =
            translations[lang];


        /*
         * Simpan global
         *
         * catalog.js akan membaca ini
         */

        window.currentLanguage =
            t;


        /* =================================================
           NAVBAR
        ================================================= */

        const navHome =
            document.getElementById(
                'nav-home'
            );

        if (navHome) {

            navHome.textContent =
                t.home;

        }


        const navCatalog =
            document.getElementById(
                'nav-catalog'
            );

        if (navCatalog) {

            navCatalog.textContent =
                t.catalog;

        }


        /* =================================================
           SEARCH
        ================================================= */

        const searchInput =
            document.getElementById(
                'search-input'
            );

        if (searchInput) {

            searchInput.placeholder =
                t.search;

        }


        /* =================================================
           CATEGORY TITLE
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
           CART TITLE
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
           BACK BUTTON
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
           WHATSAPP CHECKOUT
        ================================================= */

        const checkout =
            document.getElementById(
                'checkout-whatsapp'
            );

        if (checkout) {

            /*
             * Jangan gunakan innerHTML karena
             * tombol punya SVG.
             *
             * Cari text node setelah SVG.
             */

            checkout.childNodes.forEach(
                node => {

                    if (
                        node.nodeType ===
                        Node.TEXT_NODE
                    ) {

                        if (
                            node.textContent.trim()
                        ) {

                            node.textContent =
                                ` ${t.order}`;

                        }

                    }

                }
            );

        }


        /* =================================================
           LANGUAGE BUTTON
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

        }


        if (lang === 'en') {

            if (langEn) {

                langEn.classList.add(
                    'active'
                );

            }

        }


        /* =================================================
           BERITAHU CATALOG.JS
        ================================================= */

        window.dispatchEvent(
            new Event(
                'languageChanged'
            )
        );

    }


    /* =====================================================
       INDONESIA BUTTON
    ====================================================== */

    if (langId) {

        langId.addEventListener(
            'click',
            () => {

                setLanguage('id');

            }
        );

    }


    /* =====================================================
       ENGLISH BUTTON
    ====================================================== */

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

});
