<?php
// Routing manual sederhana
$page = $_GET['page'] ?? 'home';

switch ($page) {
    case 'home':
        include '../resource/views/home.php';
        break;
    case 'map':
        include '../resource/views/HalamanPeta.php';
        break;
    case 'about':
        include '../resource/views/about.php';
        break;
    default:
        echo "404 - Halaman tidak ditemukan.";
        break;
}
    