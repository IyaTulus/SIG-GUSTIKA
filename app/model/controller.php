<?php

include_once 'config.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    if (isset($_GET['data'])) {
        // Search by nama_jalan
        $d = $_GET['data'];

        $query = mysqli_query($conn, "SELECT * FROM jalan WHERE nama_jalan LIKE '%$d%'");
        $data = [];

        if ($query && mysqli_num_rows($query) > 0) {
            while ($row = mysqli_fetch_assoc($query)) {
                $data[] = $row;
            }
        }

        echo json_encode($data);
    } else if (isset($_GET['id'])) {
        // Get by ID
        $id = $_GET['id'];

        $query = mysqli_query($conn, "SELECT * FROM jalan WHERE id = '$id'");
        $data = [];

        if ($query && mysqli_num_rows($query) > 0) {
            while ($row = mysqli_fetch_assoc($query)) {
                $data[] = $row;
            }
        }

        echo json_encode($data);
    } else {
        // Get all
        $query = mysqli_query($conn, "SELECT * FROM jalan");
        $data = [];

        if ($query && mysqli_num_rows($query) > 0) {
            while ($row = mysqli_fetch_assoc($query)) {
                $data[] = $row;
            }
        }

        echo json_encode($data);
    }
}

if (isset($_GET['tambahJalan'])) {
    $input = json_decode(file_get_contents("php://input"), true);

    if (!isset($input['nama_jalan'])) {
        echo json_encode([
            'success' => false,
            'message' => 'Data tidak lengkap!',
        ]);
        exit;
    }

    $nama_jalan = mysqli_real_escape_string($conn, $input['nama_jalan']);
    $panjang = mysqli_real_escape_string($conn, $input['panjang']);

    $query = mysqli_query($conn, "INSERT INTO jalan (nama_jalan, panjang) VALUES ('$nama_jalan', '$panjang')");

    if ($query) {
        echo json_encode(['success' => true, 'message' => 'Data berhasil ditambahkan']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal menambahkan data']);
    }

    exit; // pastikan tidak ada output tambahan
}
if ($method === 'DELETE' && isset($_GET['hapusJalan'])) {
    // Hapus data jalan berdasarkan ID
    parse_str(file_get_contents("php://input"), $input);

    if (!isset($input['id'])) {
        echo json_encode(['success' => false, 'message' => 'ID tidak ditemukan']);
        exit;
    }

    $id = mysqli_real_escape_string($conn, $input['id']);
    $query = mysqli_query($conn, "DELETE FROM jalan WHERE id = '$id'");

    if ($query) {
        echo json_encode(['success' => true, 'message' => 'Data berhasil dihapus']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Gagal menghapus data']);
    }
}
