<?php 

$conn = mysqli_connect('localhost', 'root', '', 'db_geoarah');

if (!$conn) {
    echo "GAGAL";
}