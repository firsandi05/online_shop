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

                home:
                    'Home',

                catalog:
                    'Katalog'
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

                home:
                    'Home',

                catalog:
                    'Catalog'
            }
        };

        function setLanguage(
            lang
        ) {

            localStorage.setItem(
                'language',
                lang
            );

            document.getElementById(
                'search-input'
            ).placeholder =
                translations[lang]
                .search;

            document.querySelector(
                '#categories-section .section-title'
            ).textContent =
                translations[lang]
                .category;

            document.querySelector(
                '#cart-section .section-title'
            ).textContent =
                translations[lang]
                .cart;

            document.getElementById(
                'back-button'
            ).textContent =
                translations[lang]
                .back;

            document.getElementById(
                'checkout-whatsapp'
            ).lastChild.textContent =
                translations[lang]
                .order;

            document.getElementById(
                'nav-home'
            ).textContent =
                translations[lang]
                .home;

            document.getElementById(
                'nav-catalog'
            ).textContent =
                translations[lang]
                .catalog;

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
            }

            else {
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

        setLanguage(
            savedLang
        );
    }
);
