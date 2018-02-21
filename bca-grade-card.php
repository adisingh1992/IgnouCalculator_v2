<?php
    if(!session_id()) {
        session_start();
    }
    include_once "includes/errors.php";

    if($_SERVER["REQUEST_METHOD"] === "POST" && $_SESSION["bca_grade_id"] === filter_input(INPUT_POST, "form_id", FILTER_SANITIZE_STRING)){
        require_once "includes/functions.php";
        
        $enrolment = validator(htmlspecialchars($_POST["eno"]), 1);
        $program = htmlspecialchars(filter_input(INPUT_POST, "program", FILTER_SANITIZE_STRING));

        if($enrolment === false || empty($program) || $program !== "BCA"){
            $msg->error("Oops!! Looks like you've entered an invalid enrolment number, please try again");
        }
        else{
            marks_request($enrolment, $program, $msg);
        }
    }else{
        require_once "includes/views.php";
                
        $form_id = md5(rand());
        $_SESSION["bca_grade_id"] = $form_id;

        $view = new Views();
        $view->render("header.html");
        $view->render("bca-grade-card.html", $form_id);
        $view->render("footer.html");
        
        flush();
        if(isset($_SESSION['user']['eno'])){
            echo "<script>$(document).ready(function(){ $('#eno').val(".$_SESSION['user']['eno']."); $('#submit').click(); });</script>";
        }
    }
?>