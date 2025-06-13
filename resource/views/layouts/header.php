<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>GeoArah - Arah Jalan yang Jelas, Perjalanan Tanpa Salah Arah</title>

    <!-- Link Eksternal (Tailwind CSS dan Font Awesome tetap dari CDN) -->
    <!-- Tailwind CSS -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css" rel="stylesheet">
    <!-- Font Awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

    <!-- Link ke file CSS kustom Anda -->
    <!-- Pastikan file style.css berada di folder yang sama dengan index.html -->
    <link rel="stylesheet" href="../public/assets/CSS/StyleCssHome.css">

    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    <script src="../public/assets/JS/Maps.js"></script>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=" crossorigin=""></script>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

    <!-- Leaflet AJAX Plugin -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/leaflet-ajax/2.1.0/leaflet.ajax.min.js"></script>

    <!-- Opsional: Link font jika menggunakan font selain default sistem -->
    <!-- Contoh link font Poppins -->
    <!-- <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet"> -->

</head>

<body class="font-sans bg-gray-50">
    <!-- Navigation -->
    <nav class="bg-white shadow-md fixed w-full z-50"> <!-- Z-index diperbesar agar yakin di atas semua -->
        <div class="container mx-auto px-6 py-3 flex justify-between items-center">
            <div class="flex items-center">
                <!-- Logo SVG -->
                <img src="../public/assets/Logo/Logo.png" alt="logo" class="h-10 w-7">
                <span class="ml-2 text-2xl font-bold text-blue-600">GeoArah</span>
            </div>

            <!-- Nav Links (Desktop) -->
            <!-- Tambahkan ID/class untuk mobile toggle jika diperlukan JS -->
            <div class="hidden md:flex items-center space-x-8" id="nav-links">
                <a href="?page=home" class="text-gray-700 hover:text-blue-600 transition-colors">Beranda</a>
                <!-- Link ini mengarah ke halaman lain atau section fitur -->
                <a href="#features" class="text-gray-700 hover:text-blue-600 transition-colors">Fitur</a>
                <a href="?page=about" class="text-gray-700 hover:text-blue-600 transition-colors">Tentang Kami</a>
                <a href="#contact" class="text-gray-700 hover:text-blue-600 transition-colors">Kontak</a>
                <!-- Tombol di desktop na   v bisa langsung link -->
                <a href="?page=map" class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium transition-colors">Lihat Peta</a>
            </div>

            <div class="flex items-center">
                <!-- Tombol Lihat Peta (hanya muncul di mobile jika nav desktop disembunyikan) -->
                <!-- Anda bisa pilih salah satu tombol "Lihat Peta" tergantung kebutuhan -->
                <!-- Atau gunakan button ini sebagai mobile menu toggle -->
                <button id="mobile-menu-button" class="md:hidden ml-4">
                    <svg class="h-6 w-6 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
        </div>
    </nav>