<?php require 'layouts/header.php' ?>

<!-- Hero Section -->
<!-- Tambahkan class 'relative' dan 'overflow-hidden' jika belum ada -->
<!-- Gunakan min-h-screen atau h-screen untuk tinggi penuh viewport -->
<section id="beranda" class="hero-section flex items-center justify-center relative overflow-hidden min-h-screen">

    <!-- --- Tambahkan elemen video di sini --- -->
    <!-- Gunakan class Tailwind untuk positioning dan ukuran -->
    <video autoplay loop muted playsinline class="absolute top-0 left-0 w-full h-full object-cover z-0">
        <!-- Ganti 'path/to/your-video.mp4' dengan path file video Anda -->
        <!-- Sediakan format MP4 dan WebM untuk kompatibilitas yang luas -->
        <source src="../Video/JalananJogja.mp4" type="video/mp4">
        <!-- Teks fallback jika browser tidak mendukung video -->
    </video>
    <!-- --- Akhir elemen video --- -->

    <!-- Konten Hero (Text, Button) - Pastikan di depan video/overlay -->
    <!-- Gunakan class Tailwind 'z-10' (atau lebih tinggi) dan 'relative' -->
    <div class="container mx-auto px-6 text-center z-10 relative">
        <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">GeoArah</h1>
        <p class="text-xl md:text-2xl text-white mb-8">Arah Jalan yang Jelas, Perjalanan Tanpa Salah Arah.</p>
        <div class="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <!-- Ganti # dengan link yang relevan -->
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors">Jelajahi Peta Sekarang</button>
            <!-- Ganti # dengan link yang relevan -->
            <button class="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-white hover:text-blue-600 transition-colors">Pelajari Lebih Lanjut</button>
        </div>
    </div>
</section>

<!-- About Us Section -->
<section id="about" class="py-16 bg-white text-center">
    <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-gray-800 mb-4">Tentang GeoArah</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">GeoArah adalah platform peta digital canggih yang memberikan informasi navigasi real-time, detail jalan satu arah dan dua arah, serta membantu Anda merencanakan perjalanan dengan aman dan efisien.</p>
    </div>
</section>

<!-- Features -->
<section id="features" class="py-16 bg-gray-50"> <!-- Sesuaikan background jika perlu -->
    <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Fitur Utama</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="feature-card bg-white rounded-lg p-6 shadow-lg">
                <div class="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <!-- Icon Navigasi -->
                    <svg class="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4" />
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">Navigasi Real-Time</h3>
                <p class="text-gray-600">Dapatkan informasi arah jalan secara real-time dengan rute terbaik dan terhindar dari kemacetan.</p>
            </div>

            <div class="feature-card bg-white rounded-lg p-6 shadow-lg">
                <div class="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <!-- Icon Waktu -->
                    <svg class="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">Estimasi Waktu Tempuh</h3>
                <p class="text-gray-600">Penghitungan waktu tempuh yang akurat berdasarkan kondisi lalu lintas terkini.</p>
            </div>

            <div class="feature-card bg-white rounded-lg p-6 shadow-lg">
                <div class="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <!-- Icon Warning -->
                    <svg class="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-2">Informasi Jalan</h3>
                <p class="text-gray-600">Informasi lengkap tentang jalan satu arah, dua arah, dan rambu-rambu lalu lintas.</p>
            </div>
        </div>
    </div>
</section>

<!-- Road Info Section -->
<section class="py-16 bg-gray-100">
    <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Informasi Jalan</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
                <div class="p-6">
                    <h3 class="text-2xl font-bold text-blue-600 mb-4">Apa Itu Jalan Dua Arah?</h3>
                    <p class="text-gray-700 mb-4">Jalan dua arah adalah jalan di mana kendaraan bisa melaju dari dua arah yang berlawanan. Biasanya memiliki pembatas atau garis markah di tengah jalan.</p>
                    <!-- Ganti # dengan link yang relevan jika ada halaman detail -->
                </div>
                <!-- Ganti div ini dengan tag <img> yang menampilkan gambar sebenarnya -->
                <div class="image-container">
                    <img src="../Gambar/Dua_arah.jpeg" alt="Jalan Dua Arah">
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105">
                <div class="p-6">
                    <h3 class="text-2xl font-bold text-blue-600 mb-4">Apa Itu Jalan Satu Arah?</h3>
                    <p class="text-gray-700 mb-4">Jalan satu arah adalah jenis jalan di mana kendaraan hanya boleh melaju ke satu arah tertentu saja, sesuai dengan aturan yang ditetapkan.</p>
                    <!-- Ganti # dengan link yang relevan jika ada halaman detail -->
                </div>
                <!-- Ganti div ini dengan tag <img> yang menampilkan gambar sebenarnya -->
                <div class="image-container">
                    <img src="../Gambar/Satu_arah.jpeg" alt="Jalan Dua Arah">
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Interactive Map Preview -->
<section class="py-16 bg-white">
    <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Lihat Peta Interaktif</h2>

        <div class="relative w-full h-96 bg-gray-200 rounded-lg shadow-lg overflow-hidden">
            <div class="absolute inset-0 bg-blue-50">
                <!-- Simplified map visualization -->
                <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-4/5 w-4/5 bg-white rounded-lg shadow-inner">
                    <div class="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-gray-200 rounded">
                        <!-- Roads -->
                        <div class="absolute top-1/2 left-0 w-full h-4 bg-gray-500"></div>
                        <div class="absolute top-0 left-1/2 w-4 h-full bg-gray-500"></div>

                        <!-- Map marker (Menggunakan class 'map-marker' dari CSS kustom) -->
                        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                            <div class="map-marker h-6 w-6 bg-red-500 rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="absolute bottom-4 right-4">
                <button class="bg-white p-3 rounded-full shadow-lg hover:bg-gray-100 focus:outline-none">
                    <svg class="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
            </div>
        </div>

        <div class="mt-8 text-center">
            <!-- Ganti # dengan link ke halaman peta -->
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium transition-colors">Buka Peta Lengkap</button>
        </div>
    </div>
</section>

<!-- Gallery -->
<section id="galeri" class="py-16 bg-gray-100">
    <div class="container mx-auto px-6">
        <h2 class="text-3xl font-bold text-center text-gray-800 mb-12">Galeri</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Ganti div ini dengan tag <img> dan tambahkan alt text -->
            <div class="bg-gray-200 h-64 rounded-lg shadow-md flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer">
                <span class="text-gray-500 text-lg">GAMBAR SATU</span>
            </div>
            <!-- Ganti div ini dengan tag <img> dan tambahkan alt text -->
            <div class="bg-gray-200 h-64 rounded-lg shadow-md flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer">
                <span class="text-gray-500 text-lg">GAMBAR DUA</span>
            </div>
            <!-- Ganti div ini dengan tag <img> dan tambahkan alt text -->
            <div class="bg-gray-200 h-64 rounded-lg shadow-md flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer">
                <span class="text-gray-500 text-lg">GAMBAR TIGA</span>
            </div>
            <!-- Ganti div ini dengan tag <img> dan tambahkan alt text -->
            <div class="bg-gray-200 h-64 md:col-span-2 rounded-lg shadow-md flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer">
                <span class="text-gray-500 text-lg">GAMBAR EMPAT</span>
            </div>
            <!-- Ganti div ini dengan tag <img> dan tambahkan alt text -->
            <div class="bg-gray-200 h-64 rounded-lg shadow-md flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer">
                <span class="text-gray-500 text-lg">GAMBAR LIMA</span>
            </div>
        </div>
    </div>
</section>

<!-- Download App -->
<section class="py-16 bg-blue-600 text-white">
    <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row items-center justify-between">
            <div class="md:w-1/2 mb-8 md:mb-0">
                <h2 class="text-3xl font-bold mb-4">Download Aplikasi GeoArah</h2>
                <p class="text-lg mb-6">Dapatkan akses ke fitur navigasi lengkap langsung dari smartphone Anda. Tersedia untuk Android dan iOS.</p>
                <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <!-- Ganti # dengan link Play Store / App Store -->
                    <button class="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-gray-900 transition-colors">
                        <!-- Icon Apple -->
                        <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.125 3c-.002 1.997-1.452 3.638-3.372 3.993v13.007h5.747v-17h-2.375zm-9.25 5h-5.875v12h5.875v-12zm1 0v12h5.75v-12h-5.75z" />
                        </svg>
                        <div class="text-left">
                            <div class="text-xs">Download on the</div>
                            <div class="text-lg font-semibold">App Store</div>
                        </div>
                    </button>
                    <!-- Ganti # dengan link Play Store / App Store -->
                    <button class="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-gray-900 transition-colors">
                        <!-- Icon Android -->
                        <svg class="h-6 w-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M5.26 2.97c-.83.6-1.26 1.59-1.26 2.8v12.46c0 1.21.43 2.2 1.26 2.79l.15.13 6.7-6.7v-.15l-6.7-6.7-.15.13zm8.54 7.03l-2.12 2.13 2.12 2.13 2.44-1.35c.51-.29.68-.9.39-1.4l-.01-.02c-.29-.5-.76-.66-1.27-.37l-1.55.88z" />
                        </svg>
                        <div class="text-left">
                            <div class="text-xs">GET IT ON</div>
                            <div class="text-lg font-semibold">Google Play</div>
                        </div>
                    </button>
                </div>
            </div>
            <div class="md:w-1/3">
                <div class="bg-white p-2 rounded-3xl shadow-lg inline-block">
                    <!-- Ganti div ini dengan tag <img> yang menampilkan screenshot aplikasi -->
                    <div class="bg-gray-200 h-64 w-40 rounded-2xl mx-auto flex items-center justify-center">
                        <span class="text-gray-500">APP PREVIEW</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php require 'layouts/footer.php' ?>