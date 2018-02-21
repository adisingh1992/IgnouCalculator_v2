<?php
    if(!session_id()) {
        session_start();
    }
    include_once "includes/errors.php";
    require_once "includes/functions.php";

    if($_SERVER["REQUEST_METHOD"] === "POST" && $_SESSION["index_id"] === filter_input(INPUT_POST, "form_id", FILTER_SANITIZE_STRING)){
        require_once "includes/initdb.php";
        $id = filter_input(INPUT_POST, "id", FILTER_SANITIZE_STRING);
        if($id === '1'){
            $captcha = filter_input(INPUT_POST, "captcha", FILTER_SANITIZE_STRING);
            $username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
            $email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
            $subject = filter_input(INPUT_POST, "subject", FILTER_SANITIZE_STRING);
            $msg = filter_input(INPUT_POST, "msg", FILTER_SANITIZE_STRING);
            if($captcha !== $_SESSION['captcha'] || empty($username) || empty($email) || empty($subject) || empty($msg)){
                die("Please fill-up all fields correctly!!");
            }
            submit_feedback($username, $email, $subject, $msg);
        }else if($id === '2'){
            $email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_EMAIL);
            if(empty($email)){
                die("Please provide e-mail correctly!!");
            }
            subscribe($email);
        }
    }else{
        require_once "includes/views.php";

        $form_id = md5(rand());
        $_SESSION["index_id"] = $form_id;

        $view = new Views();
        $view->news = get_news_response($msg);
        $view->render("header.html");
        $view->render("index.html", $form_id);
        $view->render("footer.html");
    }
?>