refreshLanguage() {

    /*
    Kalau sedang melihat kategori
    */
    if (
        this.currentView ===
        'categories'
    ) {

        this.buildCategories();

        return;
    }


    /*
    Kalau sedang melihat produk
    */
    if (
        this.currentView ===
        'products'
    ) {

        const productText =
            this.getTranslation(
                'product',
                'Produk:'
            );

        this.categoryTitle.textContent =
            `${productText} ${this.currentCategoryName}`;

        this.renderProducts(
            this.currentProducts
        );

        return;
    }


    /*
    Kalau sedang melihat hasil pencarian
    */
    if (
        this.currentView ===
        'search'
    ) {

        const searchResult =
            this.getTranslation(
                'searchResult',
                'Hasil Pencarian:'
            );

        this.categoryTitle.textContent =
            `${searchResult} "${this.currentSearchQuery}"`;

        this.renderProducts(
            this.currentProducts
        );

    }

}
