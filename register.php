<?php
    if(!session_id()) {
        session_start();
    }
    require_once "includes/initdb.php";
    
    if($_SERVER["REQUEST_METHOD"] == "POST" && $_SESSION["reg_id"] === filter_input(INPUT_POST, "form_id", FILTER_SANITIZE_STRING)){
        require_once "includes/functions.php";

        $rc = filter_input(INPUT_POST, "rc", FILTER_SANITIZE_STRING);
        $sc = filter_input(INPUT_POST, "sc", FILTER_SANITIZE_STRING);
        $eno = validator(filter_input(INPUT_POST, "eno", FILTER_SANITIZE_STRING), 1);
        $progs = $_POST["progs"];

        if(empty($rc) || empty($sc) || empty($eno) || empty($progs)){
            die("<script>alert('Invalid data entered, try again!!');</script>");
        }

        $_SESSION['user']['rc'] = $rc;
        $_SESSION['user']['sc'] = $sc;
        $_SESSION['user']['eno'] = $eno;

        if($_SESSION['user']['source'] === 'f'){
            $_SESSION['user']['expiry'] = strtotime(json_decode($_SESSION['user']['expiry'])->date);
        }
        DB::insert("users", array(
            "user_id" => $_SESSION['user']['user_id'],
            "eno" => $_SESSION['user']['eno'],
            "name" => $_SESSION['user']['name'],
            "email" => $_SESSION['user']['email'],
            "gender" => $_SESSION['user']['gender'],
            "source" => $_SESSION['user']['source'],
            "token" => $_SESSION['user']['token'],
            "expiry" => $_SESSION['user']['expiry'],
            "rc" => $_SESSION['user']['rc'],
            "sc" => $_SESSION['user']['sc']
        ));
        $_SESSION['user']['uuid'] = DB::insertId();

        foreach($progs as $p){
            DB::insert("users_programmes", array(
                "uuid" => $_SESSION['user']['uuid'],
                "p_id" => htmlspecialchars($p)
            ));
        }

        $_SESSION['user']['programme'] = DB::query("SELECT p_name FROM programmes INNER JOIN users_programmes ON programmes.p_id = users_programmes.p_id INNER JOIN users ON users.uuid = users_programmes.uuid  WHERE users.uuid = %s LIMIT 1", $_SESSION['user']['uuid'])[0]["p_name"];
        
        //Getting Profile Picture
        if(isset($_COOKIE["user_image"])){
            $_SESSION['user']['image'] = filter_var($_COOKIE['user_image'], FILTER_SANITIZE_URL);
        }

        $cookie_token = substr($_SESSION['user']['token'], 0, 64);
        $cookie_value = $_SESSION['user']['uuid'].",".$cookie_token;
        setcookie("user", $cookie_value, time()+3600*24*30);

        header("Location: ../profile.php");
    }else if(!isset($_SESSION['user']['uuid']) & isset($_SESSION['user']['user_id'])){
        require_once "includes/views.php";
        
        $form_id = md5(rand());
        $_SESSION["reg_id"] = $form_id;
        
        $view = new Views();
        
        $query = "SELECT rc_id, rc_name FROM regional_centers ORDER BY rc_name ASC";
        $regional_centers = DB::query($query);
        $view->regional_centers = $regional_centers;

        $query = "SELECT sc_id, sc_name FROM study_centers";
        $study_centers = DB::query($query);
        $view->study_centers = $study_centers;

        $query = "SELECT p_id, p_name FROM programmes";
        $programmes = DB::query($query);
        $view->programmes = $programmes;

        $view->render("header.html");
        $view->render("register.html", $form_id);
        $view->render("footer.html");
    }else{
        header("Location: /");
    }
?>