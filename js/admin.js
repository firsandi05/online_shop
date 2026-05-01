import { loadCSV } from './csvParser.js';
import { STORE_CONFIG } from '../config/config.js';

let productsData = [];
let editingIndex = -1; // -1 berarti tambah baru, angka lain berarti index yang sedang diedit

document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup Login Logic
    const loginBtn = document.getElementById('login-btn');
    const passwordInput = document.getElementById('admin-password');
    const loginError = document.getElementById('login-error');
    
    loginBtn.addEventListener('click', () => {
        // Password statis yang disimpan di JS (karena tidak ada backend)
        if (passwordInput.value === 'admin123') { 
            document.getElementById('login-section').classList.add('hidden');
            document.getElementById('admin-section').classList.remove('hidden');
            initAdmin();
        } else {
            loginError.classList.remove('hidden');
        }
    });

    document.getElementById('logout-btn').addEventListener('click', () => {
        document.getElementById('admin-section').classList.add('hidden');
        document.getElementById('login-section').classList.remove('hidden');
        passwordInput.value = '';
    });
});

// Inisialisasi data setelah login berhasil
async function initAdmin() {
    // Load config WhatsApp
    document.getElementById('wa-number').value = STORE_CONFIG.whatsappNumber;

    // Load Data Produk dari CSV
    try {
        productsData = await loadCSV('data/products.csv');
        renderTable();
    } catch (error) {
        alert("Gagal memuat data CSV. Pastikan file ada.");
    }

    // Setup Modal Events
    document.getElementById('add-product-btn').addEventListener('click', openModalForAdd);
    document.getElementById('close-modal-btn').addEventListener('click', closeModal);
    document.getElementById('save-product-btn').addEventListener('click', saveProduct);

    // Setup Download Events
    document.getElementById('download-csv-btn').addEventListener('click', downloadCSV);
    document.getElementById('download-config-btn').addEventListener('click', downloadConfig);
}

// Menampilkan data ke dalam tabel HTML
function renderTable() {
    const tbody = document.querySelector('#products-table tbody');
    tbody.innerHTML = '';
    
    productsData.forEach((item, index) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${item.category_id}</td>
            <td>${item.category_name}</td>
            <td>${item.category_image}</td>
            <td>${item.product_id}</td>
            <td>${item.product_name}</td>
            <td>Rp${item.price}</td>
            <td>${item.product_image}</td>
            <td>
                <button class="btn btn-secondary" onclick="editProduct(${index})" style="padding: 0.25rem 0.5rem; font-size: 0.8rem; margin-bottom: 0.2rem;">Edit</button>
                <button class="btn btn-secondary" onclick="deleteProduct(${index})" style="padding: 0.25rem 0.5rem; font-size: 0.8rem; color: #dc2626;">Hapus</button>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

// Fungsi Edit Produk (Global agar bisa diakses dari atribut onclick)
window.editProduct = (index) => {
    editingIndex = index;
    const item = productsData[index];
    
    document.getElementById('cat-id').value = item.category_id;
    document.getElementById('cat-name').value = item.category_name;
    document.getElementById('cat-img').value = item.category_image;
    document.getElementById('prod-id').value = item.product_id;
    document.getElementById('prod-name').value = item.product_name;
    document.getElementById('prod-price').value = item.price;
    document.getElementById('prod-img').value = item.product_image;
    
    document.getElementById('modal-title').textContent = 'Edit Produk';
    document.getElementById('product-modal').classList.remove('hidden');
};

// Fungsi Hapus Produk (Global)
window.deleteProduct = (index) => {
    if (confirm('Yakin ingin menghapus produk ini dari daftar?')) {
        productsData.splice(index, 1);
        renderTable();
    }
};

// Buka modal untuk tambah baru
function openModalForAdd() {
    editingIndex = -1;
    // Kosongkan form
    document.getElementById('cat-id').value = '';
    document.getElementById('cat-name').value = '';
    document.getElementById('cat-img').value = '';
    document.getElementById('prod-id').value = '';
    document.getElementById('prod-name').value = '';
    document.getElementById('prod-price').value = '';
    document.getElementById('prod-img').value = '';
    
    document.getElementById('modal-title').textContent = 'Tambah Produk Baru';
    document.getElementById('product-modal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('product-modal').classList.add('hidden');
}

// Menyimpan data produk dari form ke Array sementara
function saveProduct() {
    const newItem = {
        category_id: document.getElementById('cat-id').value,
        category_name: document.getElementById('cat-name').value,
        category_image: document.getElementById('cat-img').value,
        product_id: document.getElementById('prod-id').value,
        product_name: document.getElementById('prod-name').value,
        price: document.getElementById('prod-price').value,
        product_image: document.getElementById('prod-img').value
    };

    if (editingIndex === -1) {
        // Tambah baru
        productsData.push(newItem);
    } else {
        // Edit yang sudah ada
        productsData[editingIndex] = newItem;
    }

    renderTable();
    closeModal();
}

// --------------------------------------------------------
// GENERATOR & DOWNLOADER FILE
// --------------------------------------------------------

function downloadCSV() {
    if (productsData.length === 0) {
        alert("Data kosong!");
        return;
    }
    
    // Ambil header dari keys object pertama
    const headers = Object.keys(productsData[0]);
    
    const csvRows = [];
    csvRows.push(headers.join(',')); // Baris pertama adalah Header
    
    // Gabungkan value setiap baris
    productsData.forEach(row => {
        const values = headers.map(header => row[header]);
        csvRows.push(values.join(','));
    });
    
    const csvString = csvRows.join('\n');
    
    // Proses download file
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'products.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function downloadConfig() {
    const newWa = document.getElementById('wa-number').value;
    
    // Membuat string persis seperti file aslinya
    const configString = `export const STORE_CONFIG = {
  // Ganti dengan nomor WhatsApp toko (gunakan format kode negara, contoh: 62)
  whatsappNumber: "${newWa}"
};`;

    // Proses download file
    const blob = new Blob([configString], { type: 'text/javascript' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'config.js');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
