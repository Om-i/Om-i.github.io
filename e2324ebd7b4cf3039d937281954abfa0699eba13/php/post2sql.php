<?php

$date  = $_POST['date'];
$name  = $_POST['name'];
$email = $_POST['email'];

$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "ca";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn -> connect_error) {
    die("Connection failed: " . $conn -> connect_error);
}
// sql instruction
$sql = "INSERT INTO bookings VALUES ('$date', '$name', '$email')";

//$conn -> query($sql);
if ($conn -> query($sql) === TRUE) {
    echo "Booking Successful!";
} else {
    echo "Booking Error: " . $conn -> error;
}

$conn -> close();
