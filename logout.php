<?php
    if (!session_id()) {
        session_start();
    }
    unset($_SESSION["user"]);
    unset($_SESSION["user_image"]);
    session_destroy();
    setcookie('user', null, -1, '/');
    setcookie('user_image', null, -1, '/');
    header("Location: /");
?>