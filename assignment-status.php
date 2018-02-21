<?php
    if(!session_id()) {
        session_start();
    }
    include_once "includes/errors.php";

    if($_SERVER["REQUEST_METHOD"] === "POST" && $_SESSION["assignment_status_id"] === filter_input(INPUT_POST, "form_id", FILTER_SANITIZE_STRING)){
        require_once "includes/functions.php";
        
        $enrolment = validator(htmlspecialchars($_POST["eno"]), 1);
        $program = htmlspecialchars(filter_input(INPUT_POST, "program", FILTER_SANITIZE_STRING));

        if($enrolment === false || empty($program)){
            $msg->error("Oops!! Looks like you've entered an invalid enrolment number or program, please try again");
        }
        else{
            echo assignment_status_response($enrolment, $program, $msg);
            echo "<script>if ($(window).width() < 768) { var trs = $('tr'); for(i=2; i<trs.length; i++){ trs[i].removeChild(trs[i].childNodes[0]); trs[i].removeChild(trs[i].childNodes[1]); } }</script>";
        }
    }else{
        require_once "includes/views.php";
        require_once "includes/initdb.php";

        $form_id = md5(rand());
        $_SESSION["assignment_status_id"] = $form_id;

        $view = new Views();

        $query = "SELECT p_name FROM programmes";
        $programmes = DB::query($query);
        $view->programmes = $programmes;

        $view->render("header.html");
        $view->render("assignment-status.html", $form_id);
        $view->render("footer.html");
        
        flush();
        if(isset($_SESSION['user']['eno'])){
            echo "<script>$(document).ready(function(){ $('#eno').val(".$_SESSION['user']['eno']."); $('.program').append('<option selected value=".$_SESSION['user']['programme'].">".$_SESSION['user']['programme']."</option>'); $('#submit').click(); });</script>";
        }
    }
?>