import { loadCSV } from './csvParser.js';
import { Catalog } from './catalog.js';

document.addEventListener('DOMContentLoaded', async () => {
    // Memastikan skrip katalog hanya berjalan di halaman yang memiliki section kategori (products.html)
    const categoriesSection = document.getElementById('categories-section');
    
    if (categoriesSection) {
        try {
            // Path relatif file CSV dari file HTML saat ini
            const data = await loadCSV('data/products.csv');
            
            if (data && data.length > 0) {
                // Inisiasi catalog dan tampilkan
                const catalog = new Catalog(data);
                catalog.buildCategories();
            } else {
                document.getElementById('categories-grid').innerHTML = 
                    '<div class="loading">Gagal memuat data atau katalog kosong. Pastikan data/products.csv memiliki data.</div>';
            }
        } catch (error) {
            console.error('Error initializing app:', error);
            document.getElementById('categories-grid').innerHTML = 
                '<div class="loading">Terjadi kesalahan sistem saat memuat data katalog.</div>';
        }
    }
});
