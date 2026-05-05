// Konfigurasi Toko
export const STORE_CONFIG = {
  // Mengambil nomor WhatsApp dari variabel lingkungan jika tersedia, 
  // atau menggunakan nomor template default
  whatsappNumber: (typeof window !== 'undefined' && window.CONFIG_WHATSAPP_NUMBER) || 
                  "628123456789" 
};
