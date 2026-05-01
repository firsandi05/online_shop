# Toko Online - Static Catalog

Proyek ini adalah sebuah website katalog toko online statis yang dibangun menggunakan HTML, CSS, dan Vanilla JavaScript. Data produk dan kategori dimuat secara dinamis dari file CSV.

## Struktur Direktori
- `index.html`: Halaman utama / landing page.
- `products.html`: Halaman katalog produk.
- `admin.html`: Halaman admin (opsional, jika ada fitur CRUD).
- `css/`: Direktori untuk file styling CSS.
- `js/`: Direktori untuk script JavaScript (parsing CSV, rendering produk).
- `data/`: Direktori untuk menyimpan data seperti `products.csv`.

## Cara Menjalankan Secara Lokal

Karena proyek ini menggunakan JavaScript (`fetch()`) untuk membaca file `data/products.csv`, Anda tidak bisa hanya membuka file HTML langsung di browser (dengan protokol `file://`) karena akan terkena **CORS (Cross-Origin Resource Sharing) policy error**.

Anda harus menjalankannya menggunakan **Local Web Server**. Berikut adalah beberapa cara mudah untuk menjalankannya:

### 1. Menggunakan Visual Studio Code (Live Server) - Direkomendasikan
Jika Anda menggunakan editor VS Code:
1. Buka folder `online_shop` di VS Code.
2. Install ekstensi **Live Server** (oleh Ritwick Dey) dari tab Extensions.
3. Buka file `index.html`.
4. Klik tombol **"Go Live"** di pojok kanan bawah editor, atau klik kanan pada file HTML dan pilih **"Open with Live Server"**.
5. Website akan otomatis terbuka di browser default Anda (biasanya `http://127.0.0.1:5500`).

### 2. Menggunakan Python (Tersedia secara default di Mac/Linux)
Jika Anda memiliki Python terinstal di komputer Anda:
1. Buka Terminal.
2. Navigasikan ke dalam folder proyek ini:
   ```bash
   cd /Users/irsyadfirsandi/Documents/lab/online_shop
   ```
3. Jalankan perintah server:
   - Untuk Python 3:
     ```bash
     python3 -m http.server 8000
     ```
   - Untuk Python 2:
     ```bash
     python -m SimpleHTTPServer 8000
     ```
4. Buka browser dan kunjungi: `http://localhost:8000`

### 3. Menggunakan Node.js (npx serve)
Jika Anda sudah menginstal Node.js:
1. Buka Terminal dan masuk ke direktori proyek.
2. Jalankan perintah berikut:
   ```bash
   npx serve .
   ```
3. Buka browser dan kunjungi URL yang muncul di terminal (biasanya `http://localhost:3000`).

## Mengubah Data Produk
Anda dapat menambah, menghapus, atau mengubah data produk dengan mengedit file `data/products.csv`. Pastikan format kolom tetap sama (misal: ID, Kategori, Nama Produk, Harga, dll).
