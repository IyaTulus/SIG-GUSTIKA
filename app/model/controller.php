<?php

include_once 'config.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

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
    
} else if (isset($_GET["id"])) {
    // Get specific jalan by id
    $key = $_GET['id'];

    $query = mysqli_query($conn, "SELECT * FROM jalan WHERE id = '$key'");

    $data = [];
    if ($query && mysqli_num_rows($query) > 0) {
        while ($row = mysqli_fetch_assoc($query)) {
            $data[] = $row;
        }
    }
    echo json_encode($data);
    
} else {
    // Get all jalan data
    $query = mysqli_query($conn, "SELECT * FROM jalan");
    $data = [];

    if ($query && mysqli_num_rows($query) > 0) {
        while ($row = mysqli_fetch_assoc($query)) {
            $data[] = $row;
        }
    }
    echo json_encode($data);
}

?>