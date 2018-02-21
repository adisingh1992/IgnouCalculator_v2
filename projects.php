<?php
    if(!session_id()) {
        session_start();
    }
    include_once "includes/errors.php";
    require_once "includes/views.php";

    if($_SERVER["REQUEST_METHOD"] === "POST" && $_SESSION["payment_id"] === filter_input(INPUT_POST, "form_id", FILTER_SANITIZE_STRING)){
    }else if(isset($_SESSION['user']['eno'])){
        $form_id = md5(rand());
        $_SESSION["payment_id"] = $form_id;

        $view = new Views();
        $view->render("header.html");
        $view->render("projects.html", $form_id);
        $view->render("footer.html");
    }else{
        $view = new Views();
        $view->render("header.html");
        echo "<div class='container-fluid'><div style='min-height: 250px !important;'></div></div>";
        echo "<script>$(document).ready(function(){ $('.navbar-toggler').click(); $('#login-button').click();});</script>";
        $view->render("footer.html");
    }
?>