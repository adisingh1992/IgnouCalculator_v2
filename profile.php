<?php
    if(!session_id()) {
        session_start();
    }
    include_once "includes/errors.php";
    include_once "includes/functions.php";
    include_once "includes/initdb.php";

    if($_SERVER["REQUEST_METHOD"] === "POST" && $_SESSION["profile_id"] === filter_input(INPUT_POST, "form_id", FILTER_SANITIZE_STRING)){
        if(filter_input(INPUT_POST, "type", FILTER_SANITIZE_STRING) === "fetch"){
            $program = htmlspecialchars(filter_input(INPUT_POST, "program", FILTER_SANITIZE_STRING));
            $enrolment = $_SESSION['user']['eno'];

            if(empty($program)){
                $msg->error("Oops!! Looks like you've entered an invalid programme, please try again");
            }
            else{
                marks_request($enrolment, $program, $msg);
            }
        }else if(filter_input(INPUT_POST, "type", FILTER_SANITIZE_STRING) === "update"){
            $contact = $dob = $address = NULL;
            if(preg_match('/^[0-9]{10}$/', $_POST['contact'])){
                $contact = filter_input(INPUT_POST, "contact", FILTER_SANITIZE_STRING);
            }
            $dob = validate_date(filter_input(INPUT_POST, "dob", FILTER_SANITIZE_STRING));
            $address = htmlspecialchars(filter_input(INPUT_POST, "address", FILTER_SANITIZE_STRING));
            if(update_profile($contact, $dob, $address, $_SESSION["user"]["uuid"], $msg) === true){
                $result = DB::query("SELECT dob, contact, address FROM users WHERE uuid = %s LIMIT 1", $_SESSION["user"]["uuid"]);
                $_SESSION["user"]["dob"] = date("d-m-Y", $result[0]["dob"]);
                $_SESSION["user"]["contact"] = $result[0]["contact"];
                $_SESSION["user"]["address"] = $result[0]["address"];
            }
        }
    }else if(isset($_SESSION['user']['eno'])){
        require_once "includes/views.php";

        $form_id = md5(rand());
        $_SESSION["profile_id"] = $form_id;

        $view = new Views();
        $view->news = get_news_response($msg);

        $query = "SELECT p_name FROM programmes";
        $programmes = DB::query($query);
        $view->programmes = $programmes;

        $query = "SELECT p_name FROM programmes INNER JOIN users_programmes ON programmes.p_id = users_programmes.p_id INNER JOIN users ON users.uuid = users_programmes.uuid  WHERE users.uuid = %s";
        $user_programmes = DB::query($query, $_SESSION['user']['uuid']);
        $view->user_programmes = $user_programmes;

        $view->render("header.html");
        $view->render("profile.html", $form_id);
        $view->render("footer.html");
    }else{
        require_once "includes/views.php";
        $view = new Views();
        $view->render("header.html");
        echo "<div class='container-fluid'><div style='min-height: 250px !important;'></div></div>";
        echo "<script>$(document).ready(function(){ $('.navbar-toggler').click(); $('#login-button').click(); $('#login-close').remove();});</script>";        
        $view->render("footer.html");
    }
?>