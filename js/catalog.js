import { STORE_CONFIG } from '../config/config.js';

export class Catalog {
    constructor(data) {
        this.data = data;
        this.categoriesSection = document.getElementById('categories-section');
        this.productsSection = document.getElementById('products-section');
        this.categoriesGrid = document.getElementById('categories-grid');
        this.productsGrid = document.getElementById('products-grid');
        this.categoryTitle = document.getElementById('category-title');
        this.backButton = document.getElementById('back-button');

        this.initEvents();
    }

    initEvents() {
        if (this.backButton) {
            this.backButton.addEventListener('click', () => this.showCategories());
        }
    }

    /**
     * Menampilkan daftar kategori unik dari data CSV
     */
    buildCategories() {
        this.categoriesGrid.innerHTML = '';
        
        // Mengumpulkan daftar kategori yang unik
        const categoriesMap = new Map();
        this.data.forEach(item => {
            if (!categoriesMap.has(item.category_id)) {
                categoriesMap.set(item.category_id, {
                    id: item.category_id,
                    name: item.category_name,
                    image: item.category_image
                });
            }
        });

        const categories = Array.from(categoriesMap.values());

        if (categories.length === 0) {
            this.categoriesGrid.innerHTML = '<div class="loading">Tidak ada kategori ditemukan.</div>';
            return;
        }

        categories.forEach(category => {
            const card = document.createElement('div');
            card.className = 'card';
            
            // onerror: fallback ke placeholder jika gambar asli belum ada di folder assets
            card.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="assets/categories/${category.image}" alt="${category.name}" onerror="this.src='https://placehold.co/400x300?text=${encodeURIComponent(category.name)}'">
                </div>
                <div class="card-content" style="justify-content: center; align-items: center;">
                    <h3 class="card-title" style="margin: 0; font-size: 1.5rem;">${category.name}</h3>
                </div>
            `;
            
            card.addEventListener('click', () => this.showProductsByCategory(category.id, category.name));
            this.categoriesGrid.appendChild(card);
        });
    }

    /**
     * Menampilkan produk berdasarkan ID kategori yang dipilih
     */
    showProductsByCategory(category_id, category_name) {
        // Sembunyikan kategori, tampilkan produk
        this.categoriesSection.classList.add('hidden');
        this.productsSection.classList.remove('hidden');
        this.categoryTitle.textContent = `Produk: ${category_name}`;

        this.productsGrid.innerHTML = '';

        // Filter produk berdasarkan kategori
        const products = this.data.filter(item => item.category_id === category_id);

        if (products.length === 0) {
            this.productsGrid.innerHTML = '<div class="loading">Tidak ada produk dalam kategori ini.</div>';
            return;
        }

        products.forEach(product => {
            // Format harga ke Rupiah
            const formattedPrice = new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(product.price);

            const whatsappLink = this.createWhatsAppLink(product.product_name);

            const card = document.createElement('div');
            card.className = 'card';
            
            card.innerHTML = `
                <div class="card-img-wrapper">
                    <img src="assets/products/${product.product_image}" alt="${product.product_name}" onerror="this.src='https://placehold.co/400x400?text=${encodeURIComponent(product.product_name)}'">
                </div>
                <div class="card-content">
                    <h3 class="card-title">${product.product_name}</h3>
                    <div class="card-price">${formattedPrice}</div>
                    <a href="${whatsappLink}" target="_blank" class="btn btn-whatsapp">
                        <!-- Icon WhatsApp SVG -->
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                        </svg>
                        Beli via WhatsApp
                    </a>
                </div>
            `;
            
            this.productsGrid.appendChild(card);
        });
    }

    /**
     * Kembali ke daftar kategori (Level 1)
     */
    showCategories() {
        this.productsSection.classList.add('hidden');
        this.categoriesSection.classList.remove('hidden');
    }

    /**
     * Membuat URL WhatsApp dengan template pesan
     */
    createWhatsAppLink(productName) {
        const number = STORE_CONFIG.whatsappNumber;
        const message = `Halo, saya tertarik membeli ${productName}`;
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${number}?text=${encodedMessage}`;
    }
}
