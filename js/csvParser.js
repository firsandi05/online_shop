/**
 * Membaca file CSV dari URL tertentu dan mengubahnya menjadi array object (JSON)
 */
export async function loadCSV(url) {
    try {
        // Pada GitHub Pages, fetch bisa membaca file yang berada satu repository
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const csvText = await response.text();
        return parseCSV(csvText);
    } catch (error) {
        console.error("Error loading CSV:", error);
        return [];
    }
}

function parseCSV(csvText) {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return []; // Kosong atau hanya header

    const headers = lines[0].split(',').map(header => header.trim());
    const result = [];

    for (let i = 1; i < lines.length; i++) {
        // Parsing sederhana berbasis koma. Jika ada koma dalam teks, ini perlu disesuaikan.
        const currentLine = lines[i].split(',');
        
        // Memastikan jumlah kolom baris sama dengan jumlah kolom header
        if (currentLine.length === headers.length) {
            const obj = {};
            for (let j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentLine[j].trim();
            }
            result.push(obj);
        }
    }
    
    return result;
}
