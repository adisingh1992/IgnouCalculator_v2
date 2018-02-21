<?php
    if(!session_id()) {
        session_start();
    }
    include_once "includes/errors.php";
    
    if($_SERVER["REQUEST_METHOD"] === "POST"){
        require_once "includes/functions.php";

        $enrolment = validator(htmlspecialchars($_POST["eno"]), 1);
        $program = htmlspecialchars(filter_input(INPUT_POST, "program", FILTER_SANITIZE_STRING));

        if($program === "BCA"){
            $f_id = "bca_grade_id";
        }else if($program === "MCA"){
            $f_id = "mca_grade_id";
        }
        if($_SESSION[$f_id] === filter_input(INPUT_POST, "form_id", FILTER_SANITIZE_STRING)){
            $info = get_admission_info($enrolment, $program);
            fetch_student_list($info[0], $program, $info[1], 1);
        }
    }else{
        $msg->display();
    }
?>