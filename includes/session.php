<?php
    if(!session_id()) {
        session_start();
    }
    require_once "initdb.php";
    
    $query = "SELECT uuid, user_id, eno, name, email, gender, source, token, expiry, rc, sc, dob, contact, address FROM users WHERE email=%s LIMIT 1";
    $result = DB::query($query, $_SESSION['user']['email']);

    if(!empty($result)){
        if($_SESSION['user']['source'] === $result[0]['source']){
            //Update token in database
            require_once "tokenizer.php";
            $tokenize = new Tokenizer();
            $tokenize->update($_SESSION['user']['token'], $_SESSION['user']['expiry']);
        }else{
            $_SESSION['user']['token'] = $result[0]['token'];
            $_SESSION['user']['expiry'] = $result[0]['expiry'];
        }

        //Getting Profile Picture
        if(isset($_COOKIE["user_image"])){
            $_SESSION['user']['image'] = filter_var($_COOKIE['user_image'], FILTER_SANITIZE_URL);
        }
        $_SESSION['user']['uuid'] = $result[0]["uuid"];
        $_SESSION['user']['user_id'] = $result[0]['user_id'];
        $_SESSION['user']['eno'] = $result[0]['eno'];
        $_SESSION['user']['name'] = $result[0]['name'];
        $_SESSION['user']['email'] = $result[0]['email'];
        $_SESSION['user']['gender'] = $result[0]['gender'];
        $_SESSION['user']['source'] = $result[0]['source'];
        $_SESSION['user']['rc'] = $result[0]['rc'];
        $_SESSION['user']['sc'] = $result[0]['sc'];
        $_SESSION["user"]["dob"] = date("d-m-Y", $result[0]["dob"]);
        $_SESSION["user"]["contact"] = $result[0]["contact"];
        $_SESSION["user"]["address"] = $result[0]["address"];
        $_SESSION['user']['programme'] = DB::query("SELECT p_name FROM programmes INNER JOIN users_programmes ON programmes.p_id = users_programmes.p_id INNER JOIN users ON users.uuid = users_programmes.uuid  WHERE users.uuid = %s LIMIT 1", $_SESSION['user']['uuid'])[0]["p_name"];

        $cookie_token = substr($_SESSION['user']['token'], 0, 64);
        $cookie_value = $_SESSION['user']['uuid'].",".$cookie_token;
        setcookie("user", $cookie_value, time()+3600*24*30, "/");

        header("Location: ../profile.php");
    }else{
        header("Location: ../register.php");
    }
?>