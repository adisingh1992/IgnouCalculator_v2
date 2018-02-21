<?php
    if(!session_id()) {
        session_start();
    }
    include_once "includes/errors.php";

    if($_SERVER["REQUEST_METHOD"] === "POST" && $_SESSION["student_list_id"] === filter_input(INPUT_POST, "form_id", FILTER_SANITIZE_STRING)){
        require_once "includes/functions.php";

        $program = htmlspecialchars(filter_input(INPUT_POST, "program", FILTER_SANITIZE_STRING));
        $sc = htmlspecialchars(filter_input(INPUT_POST, "sc", FILTER_SANITIZE_STRING));
        $admit_year = htmlspecialchars(filter_input(INPUT_POST, "admit_year", FILTER_SANITIZE_STRING));

        if(empty($program) || empty($sc) || empty($admit_year)){
            $msg->error("Oops!! Looks like you've entered an invalid study center code, session or program, please try again");
        }
        else{
            fetch_student_list($admit_year, $program, $sc);
        }
    }else{
        require_once "includes/views.php";
        require_once "includes/initdb.php";

        $form_id = md5(rand());
        $_SESSION["student_list_id"] = $form_id;

        $view = new Views();

        $query = "SELECT p_name FROM programmes";
        $programmes = DB::query($query);
        $view->programmes = $programmes;
        
        $query = "SELECT sc_id, sc_name FROM study_centers";
        $study_centers = DB::query($query);
        $view->study_centers = $study_centers;

        $view->admit_year = "";
        $year = date('Y');
        for($y = 2012; $y <= $year; $y++){
            $view->admit_year .= "<option value='January+$y'>January $y</option>";
            $view->admit_year .= "<option value='July+$y'>July $y</option>";
        }
        
        $view->render("header.html");
        $view->render("student-list.html", $form_id);
        $view->render("footer.html");
    }
?>