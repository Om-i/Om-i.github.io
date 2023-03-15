<?php

$name  = $_POST['name'];
$email = $_POST['email'];
$date  = $_POST['date'];

$servername = "localhost";
$username   = "root";
$password   = "";
$dbname     = "moviewebsite";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn -> connect_error) {
    die("Connection failed: " . $conn -> connect_error);
}
// sql instruction
$sql = "INSERT INTO booking VALUES ('$name', '$email', '$date')";

//$conn -> query($sql);
if ($conn -> query($sql) === TRUE) {
    echo "Booking Successful!";
} else {
    echo "Booking Error: " . $conn -> error;
}

$conn -> close();
