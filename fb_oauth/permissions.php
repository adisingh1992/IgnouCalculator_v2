<?php
    require_once "init.php";

    $permissions = ['email']; // Optional permissions for more permission you need to send your application for review

    $url = filter_input(INPUT_SERVER, "HTTP_HOST");
    $redirect_uri = "http://".$url."/fb_oauth/callback.php";
    $loginUrl = $helper->getReRequestUrl($redirect_uri, $permissions, '&');
    header("Location: " . $loginUrl);
?>