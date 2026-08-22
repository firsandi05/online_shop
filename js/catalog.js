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
       
