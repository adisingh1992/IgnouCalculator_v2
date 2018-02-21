<?php
    session_start();

    // Random value
    $val = rand(9, true) . rand(9, true) . rand(9, true) . rand(9, true) . rand(9, true) . rand(9, true);

    // Setup session value
    $_SESSION["captcha"] = $val;

    // Creating a blank image and adding some text
    $im = imagecreate(65, 25);

    $bg = imagecolorallocate($im, 255, 255, 255);
    $text_color = imagecolorallocate($im, 233, 14, 91);
    imagestring($im, 5, 5, 5, $val, $text_color);

    // Displaying the image as jpg
    header('Content-Type: image/jpeg'); /* defining the image type to be shown in browser window */
    imagejpeg($im, NULL, 90); /* Showing image */

    // Freeing up memory
    imagedestroy($im);
?>