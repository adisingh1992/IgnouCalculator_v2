<?php
    if(!session_id()) {
        session_start();
    }
    include_once "includes/errors.php";

    if($_SERVER["REQUEST_METHOD"] === "POST" && $_SESSION["student_details_id"] === filter_input(INPUT_POST, "form_id", FILTER_SANITIZE_STRING)){
        require_once "includes/functions.php";

        $enrolment = validator(htmlspecialchars($_POST["eno"]), 1);
        $program = htmlspecialchars(filter_input(INPUT_POST, "program", FILTER_SANITIZE_STRING));

        if($enrolment === false || empty($program)){
            $msg->error("Oops!! Looks like you've entered an invalid enrolment number or program, please try again");
        }
        else{
            echo student_details_response($enrolment, $program, $msg);
            echo "<script>$('tr:eq(4) td:first-child').html('<strong>Guardian</strong>');</script>";
        }
    }else{
        require_once "includes/views.php";
        require_once "includes/initdb.php";

        $form_id = md5(rand());
        $_SESSION["student_details_id"] = $form_id;

        $view = new Views();

        $query = "SELECT p_name FROM programmes";
        $programmes = DB::query($query);
        $view->programmes = $programmes;

        $view->render("header.html");
        $view->render("student-details.html", $form_id);
        $view->render("footer.html");

        flush();
        if(isset($_SESSION['user']['eno'])){
            echo "<script>$(document).ready(function(){ $('#eno').val(".$_SESSION['user']['eno']."); $('.program').append('<option selected value=".$_SESSION['user']['programme'].">".$_SESSION['user']['programme']."</option>'); $('#submit').click(); });</script>";
        }
    }
?>