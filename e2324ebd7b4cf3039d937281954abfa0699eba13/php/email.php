<?php

//include 'signup.php';
/* STORE ERROR STATE BEFORE SENDING */
/*
 * md5_file() calculates the hash of the log file
 */
$log     = 'C:\xampp\sendmail\error.log';
$loghash = md5_file($log);

/* EMAIL SENDING */
$to = $email;
$subject = "WebDev CA2 Test: Confirmation Email";
$message = "Hi, This is a test mail to confirm your submissions. Thank you!\n"
        . "\n"
        . "Movie Website";
$headers = "From: Movie Website";

if (mail($to, $subject, $message, $headers)) {
    echo "Email sent at '$to'";
} else {
    echo "Email sending failed";
}
/* END OF EMAIL SENDING */


/* DISPLAY EMAIL ERROR */
/* 
 * check if the log has changed after the mail() call by comparing the hashes
 * file() converts the log file into an array line by line
 * array_slice() takes a subset of the array, in this case -1 means the last element
 * [0] is the first (and only) element of the subset, a string. Hence can be echoed.
 */
if (md5_file($log) != $loghash) {
    echo "<br><br>Sendmail Error Log<br><br>";
    echo array_slice(file($log), -1)[0];
}
/*
 * as above plus:
 * array_slice() offset is set to -3, meaning the last three elements of the array
 * implode() collapses the whole array into a single string
 */
$apachelog = 'C:\xampp\apache\logs\error.log';
echo "<br><br>Apache Log Dump:<br>";
echo '<table border="1"><tr><td>' . implode("</td></tr><tr><td>", array_slice(file($apachelog), -3)) . "</td></tr></table>";