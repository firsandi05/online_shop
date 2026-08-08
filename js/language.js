document.addEventListener('DOMContentLoaded', () => {

    const langId = document.getElementById('lang-id');
    const langEn = document.getElementById('lang-en');

    const translations = {

        id: {

            search: 'Cari produk...',

            category: 'Kategori Produk',

            cart: 'Keranjang Belanja',

            back: '← Kembali ke Kategori',

            order: 'Pesan (WA)',

            clear: 'Kosongkan',

            emptyCart: 'Keranjang masih kosong',

            total: 'Total Keseluruhan:',

            home: 'Home',

            catalog: 'Katalog',

            size: 'Ukuran',

            buy: 'Beli Sekarang',

            addCart: '+ Keranjang',

            searchResult: 'Hasil Pencarian:',

            product: 'Produk:',

            sold: 'Terjual'

        },

        en: {

            search: 'Search products...',

            category: 'Product Categories',

            cart: 'Shopping Cart',

            back: '← Back to Categories',

            order: 'Order (WA)',

            clear: 'Clear',

            emptyCart: 'Cart is empty',

            total: 'Grand Total:',

            home: 'Home',

            catalog: 'Catalog',

            size: 'Size',

            buy: 'Buy Now',

            addCart: '+ Cart',

            searchResult: 'Search Results:',

            product: 'Product:',

            sold: 'Sold'

        }

    };


    function setLanguage(lang) {

        /*
        ==========================================
        PASTIKAN BAHASA VALID
        ==========================================
        */

        if (!translations[lang]) {
            lang = 'id';
        }


        /*
        ==========================================
        SIMPAN BAHASA
        ==========================================
        */

        localStorage.setItem(
            'language',
            lang
        );


        const t =
            translations[lang];


        /*
        ==========================================
        SIMPAN KE GLOBAL
        ==========================================
        */

        window.currentLanguage = t;


        /*
        ==========================================
        NAVBAR - HOME
        ==========================================
        */

        const navHome =
            document.getElementById(
                'nav-home'
            );

        if (navHome) {
            navHome.textContent =
                t.home;
        }


        /*
        ==========================================
        NAVBAR - KATALOG
        ==========================================
        */

        const navCatalog =
            document.getElementById(
                'nav-catalog'
            );

        if (navCatalog) {
            navCatalog.textContent =
                t.catalog;
        }


        /*
        ==========================================
        SEARCH
        ==========================================
        */

        const searchInput =
            document.getElementById(
                'search-input'
            );

        if (searchInput) {

            searchInput.placeholder =
                t.search;

        }


        /*
        ==========================================
        CATEGORY TITLE
        ==========================================
        */

        const categoriesTitle =
            document.querySelector(
                '#categories-section .section-title'
            );

        if (categoriesTitle) {

            categoriesTitle.textContent =
                t.category;

        }


        /*
        ==========================================
        CART TITLE
        ==========================================
        */

        const cartTitle =
            document.querySelector(
                '#cart-section .section-title'
            );

        if (cartTitle) {

            cartTitle.textContent =
                t.cart;

        }


        /*
        ==========================================
        BACK BUTTON
        ==========================================
        */

        const backButton =
            document.getElementById(
                'back-button'
            );

        if (backButton) {

            backButton.textContent =
                t.back;

        }


        /*
        ==========================================
        CLEAR CART
        ==========================================
        */

        const clearCart =
            document.getElementById(
                'clear-cart'
            );

        if (clearCart) {

            clearCart.textContent =
                t.clear;

        }


        /*
        ==========================================
        WHATSAPP CHECKOUT
        ==========================================
        */

        const checkout =
            document.getElementById(
                'checkout-whatsapp'
            );

        if (checkout) {

            /*
            Cari text node yang berisi
            "Pesan (WA)"
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


        /*
        ==========================================
        ACTIVE LANGUAGE BUTTON
        ==========================================
        */

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


        /*
        ==========================================
        REFRESH CATALOG
        ==========================================
        */

        /*
        Kalau catalog.js sudah selesai
        dibuat, refresh katalog.

        Kalau belum selesai, tidak masalah.
        */

        if (
            window.catalog &&
            typeof window.catalog.refreshLanguage ===
            'function'
        ) {

            window.catalog.refreshLanguage();

        }


        /*
        ==========================================
        REFRESH CART
        ==========================================
        */

        if (
            window.catalog &&
            window.catalog.cart &&
            typeof window.catalog.cart.updateUI ===
            'function'
        ) {

            window.catalog.cart.updateUI();

        }

    }


    /*
    ==============================================
    BUTTON INDONESIA
   
