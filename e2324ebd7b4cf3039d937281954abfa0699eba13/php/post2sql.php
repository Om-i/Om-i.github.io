<?php

$name  = filter_input(INPUT_POST, 'name');  // $_POST['name'];
$email = filter_input(INPUT_POST, 'email'); 
$date  = filter_input(INPUT_POST, 'date');  
$title  = filter_input(INPUT_POST, 'title');  

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
$sql = "INSERT INTO booking VALUES (NULL, '$name', '$email', '$date', '$title')";

//$conn -> query($sql); returns true when successful
if ($conn -> query($sql) === TRUE) {
    echo "<script>";
    echo "alert('Congratulations, $name. Booking Successful!');";
    echo "location.replace('../index.html');"; // redirects the user to the homepage
    echo "</script>";
} else {
    echo "Booking Error: " . $conn -> error;
}

$conn -> close();