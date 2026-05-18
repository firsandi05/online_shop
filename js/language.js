document.addEventListener(
    'DOMContentLoaded',
    () => {

        const langId =
            document.getElementById(
                'lang-id'
            );

        const langEn =
            document.getElementById(
                'lang-en'
            );

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
                    'Produk:'
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
                    'Products:'
            }
        };

        function setLanguage(lang) {

            localStorage.setItem(
                'language',
                lang
            );

            const t =
                translations[lang];

            // Navbar
            document.getElementById(
                'nav-home'
            ).textContent =
                t.home;

            document.getElementById(
                'nav-catalog'
            ).textContent =
                t.catalog;

            // Search
            document.getElementById(
                'search-input'
            ).placeholder =
                t.search;

            // Section title
            document.querySelector(
                '#categories-section .section-title'
            ).textContent =
                t.category;

            document.querySelector(
                '#cart-section .section-title'
            ).textContent =
                t.cart;

            // Buttons
            document.getElementById(
                'back-button'
            ).textContent =
                t.back;

            document.getElementById(
                'clear-cart'
            ).textContent =
                t.clear;

            document.getElementById(
                'checkout-whatsapp'
            ).lastChild.textContent =
                ` ${t.order}`;

            // Save translation globally
            window.currentLanguage =
                t;

            // Refresh cart UI
            if (
                window.catalog &&
                window.catalog.cart
            ) {
                window.catalog.cart
                    .updateUI();
            }

            // Active button
            langId.classList.remove(
                'active'
            );

            langEn.classList.remove(
                'active'
            );

            if (lang === 'id') {
                langId.classList.add(
                    'active'
                );
            } else {
                langEn.classList.add(
                    'active'
                );
            }
        }

        langId.addEventListener(
            'click',
            () => setLanguage(
                'id'
            )
        );

        langEn.addEventListener(
            'click',
            () => setLanguage(
                'en'
            )
        );

        const savedLang =
            localStorage.getItem(
                'language'
            ) || 'id';

        setLanguage(savedLang);
    }
);
