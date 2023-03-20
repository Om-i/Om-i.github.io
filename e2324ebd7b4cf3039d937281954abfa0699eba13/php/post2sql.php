<?php

$name  = filter_input(INPUT_POST, 'name'); // $_POST['name'];
$email = filter_input(INPUT_POST, 'email');
$title = filter_input(INPUT_POST, 'title');
$date  = filter_input(INPUT_POST, 'date');

$servername = "localhost";
$username   = "root";
$password   = "";
//$dbname     = "moviewebsite";


mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT); // makes mysql errors visible as php exceptions
// Create connection
$conn = new mysqli($servername, $username, $password);//, $dbname);
// sql instruction
$sql = "CREATE DATABASE IF NOT EXISTS `wdCA2023`;
USE `wdCA2023`;
CREATE TABLE IF NOT EXISTS `booking` (
`bookingId` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`name` VARCHAR(255),
`email` VARCHAR(255),
`title` VARCHAR(255),
`date` DATE);
INSERT INTO `booking` VALUES (NULL, '$name', '$email', '$title', '$date');";

//$conn -> query($sql); returns true when successful
if ($conn -> multi_query($sql) === TRUE) { // query() produces syntax error when multiple commands are issued. multi_query() must be used
    echo "<script>";
    echo "alert('Congratulations, $name. Booking Successful!');";
    echo "location.replace('../index.html');"; // redirects the user to the homepage
    echo "</script>";
} else {
    echo "Booking Error: " . $conn -> error;
}

$conn -> close();
