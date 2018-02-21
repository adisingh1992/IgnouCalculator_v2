<?php
    if(!session_id()) {
        session_start();
    }
    include_once "includes/errors.php";

    if($_SERVER["REQUEST_METHOD"] === "POST" && $_SESSION["faq_id"] === filter_input(INPUT_POST, "form_id", FILTER_SANITIZE_STRING)){
    }else{
        require_once "includes/views.php";

        $form_id = md5(rand());
        $_SESSION["faq_id"] = $form_id;

        $view = new Views();
        $view->render("header.html");
        $view->render("faq.html", $form_id);
        $view->render("footer.html");
    }
?>