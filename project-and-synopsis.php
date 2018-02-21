<?php
    if(!session_id()) {
        session_start();
    }
    include_once "includes/errors.php";
    require_once "includes/functions.php";

    if($_SERVER["REQUEST_METHOD"] === "POST" && $_SESSION["project_id"] === filter_input(INPUT_POST, "form_id", FILTER_SANITIZE_STRING)){
        $flag = validator(htmlspecialchars($_POST["flag"]), 2);
        if($flag === 1){
            $project_type = filter_input(INPUT_POST, "p_type", FILTER_SANITIZE_STRING);
            if(empty($project_type)){
                $msg->error("Oops!! Looks like you've entered an invalid choice, please try again");
                die();
            }
            fetch_projects($project_type, $msg);
        }else if($flag === 2){
            $project_id = htmlspecialchars(filter_input(INPUT_POST, "project_id", FILTER_SANITIZE_STRING));
            $filename = "projects/".(update_projects_counter($project_id));
            echo $filename;
        }
    }else{
        require_once "includes/views.php";

        $form_id = md5(rand());
        $_SESSION["project_id"] = $form_id;

        $view = new Views();
        $view->render("header.html");
        $view->render("project-and-synopsis.html", $form_id);
        $view->render("footer.html");
    }
?>