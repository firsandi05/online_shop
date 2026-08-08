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
            heroButton: 'Lihat Katalog',
            loadingCategories: 'Memuat kategori...',
            loadingProducts: 'Memuat produk...',
            footerDescription:
                'Temukan produk terbaik kami dengan harga yang terjangkau. Belanja aman, mudah, dan terpercaya.',
            findUs: 'Temukan Kami di',
            variant: 'Varian',
            color: 'Warna',
            quantity: 'Jumlah',
            price: 'Harga',
            description: 'Deskripsi',
            selectSize: 'Pilih Ukuran',
            selectVariant: 'Pilih Varian',
            addToCart: 'Tambah ke Keranjang',
            continueShopping: 'Lanjut Belanja',
            noProducts: 'Tidak ada produk ditemukan.',
            chooseProduct: 'Pilih Produk',
            available: 'Tersedia',
            outOfStock: 'Stok Habis',
            loading: 'Memuat...',
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
            heroButton: 'View Catalog',
            loadingCategories: 'Loading categories...',
            loadingProducts: 'Loading products...',
            footerDescription:
                'Find our best products at affordable prices. Shop safely, easily, and confidently.',
            findUs: 'Find Us On',
            variant: 'Variant',
            color: 'Color',
            quantity: 'Quantity',
            price: 'Price',
            description: 'Description',
            selectSize: 'Select Size',
            selectVariant: 'Select Variant',
            addToCart: 'Add to Cart',
            continueShopping: 'Continue Shopping',
            noProducts: 'No products found.',
            chooseProduct: 'Choose Product',
            available: 'Available',
            outOfStock: 'Out of Stock',
            loading: 'Loading...',
            sold: 'Sold'

        }

    };


    function setLanguage(lang) {

        if (!translations[lang]) {
            lang = 'id';
        }

        localStorage.setItem(
            'language',
            lang
        );

        const t =
            translations[lang];

        /*
        ==========================================
        NAVBAR
        ==========================================
        */

        const navHome =
            document.getElementById('nav-home');

        if (navHome) {
            navHome.textContent = t.home;
        }


        const navCatalog =
            document.getElementById('nav-catalog');

        if (navCatalog) {
            navCatalog.textContent = t.catalog;
        }


        /*
        ==========================================
        SEARCH
        ==========================================
        */

        const searchInput =
            document.getElementById('search-input');

        if (searchInput) {
            searchInput.placeholder =
                t.search;
        }


        /*
        ==========================================
        HERO
        ==========================================
        */

        const heroButton =
            document.getElementById(
                'hero-catalog-button'
            );

        if (heroButton) {
            heroButton.textContent =
                t.heroButton;
        }


        /*
        ==========================================
        CATEGORY
        ==========================================
        */

        const categoryTitle =
            document.querySelector(
                '#categories-section .section-title'
            );

        if (categoryTitle) {
            categoryTitle.textContent =
                t.category;
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
        CART
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


        const emptyCart =
            document.getElementById(
                'cart-empty-text'
            );

        if (emptyCart) {
            emptyCart.textContent =
                t.emptyCart;
        }


        const totalLabel =
            document.getElementById(
                'cart-total-label'
            );

        if (totalLabel) {
            totalLabel.textContent =
                t.total;
        }


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
        WHATSAPP BUTTON
        ==========================================
        */

        const checkout =
            document.getElementById(
                'checkout-whatsapp'
            );

        if (checkout) {

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

            }

        }


        /*
        ==========================================
        FOOTER
        ==========================================
        */

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


        /*
        ==========================================
        GLOBAL LANGUAGE
        ==========================================
        */

        window.currentLanguage =
            t;

        window.currentLanguageCode =
            lang;

        window.translations =
            translations;


        /*
        ==========================================
        REFRESH CATALOG
        ==========================================
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


        /*
        ==========================================
        ACTIVE BUTTON
        ==========================================
        */

        if (langId) {
            langId.classList.remove('active');
        }

        if (langEn) {
            langEn.classList.remove('active');
        }

        if (lang === 'id') {

            if (langId) {
                langId.classList.add('active');
            }

        } else {

            if (langEn) {
                langEn.classList.add('active');
            }

        }

    }


    /*
    ==========================================
    BUTTON EVENTS
    ==========================================
    */

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


    /*
    ==========================================
    INITIAL LANGUAGE
    ==========================================
    */

    const savedLanguage =
        localStorage.getItem(
            'language'
        ) || 'id';

    setLanguage(
        savedLanguage
    );

});
