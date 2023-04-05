<?php

$email = filter_input(INPUT_POST, 'email'); // $_POST['name'];
$pass  = filter_input(INPUT_POST, 'password');
$salt  = bin2hex(random_bytes(5));            // generate and convert random binary string to ascii
$hash  = sha1($pass . $salt);                 // hashing and salting

$servername = "localhost";
$username   = "root";
$dbpass     = "";
//$dbname     = "wdca2023";


mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT); // makes mysql errors visible as php exceptions
// Create connection
$conn = new mysqli($servername, $username, $dbpass); //, $dbname);
// sql instruction
$sql  = "CREATE DATABASE IF NOT EXISTS `wdCA2023`;
USE `wdCA2023`;
CREATE TABLE IF NOT EXISTS `accounts` (
`userId` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
`email` VARCHAR(255),
`salt` VARCHAR(255),
`hash` VARCHAR(255)
);
INSERT INTO `accounts` VALUES (NULL, '$email', '$salt', '$hash');";

//$conn -> query($sql); returns true when successful
if ($conn -> multi_query($sql) === TRUE) { // query() produces syntax error when multiple commands are issued. multi_query() must be used
    echo "<script>";
    echo "alert('Congratulations, registration Successful! You will soon receive an email at " . $email . "');";
    echo "location.replace('../index.html');"; // redirects the user to the homepage
    echo "</script>";
} else {
    echo "Registration Error: " . $conn -> error;
}

$conn -> close();

/* pass to email verification */
include 'email.php';
