<?php
    if(!session_id()) {
        session_start();
    }
    if(!isset($_SESSION["user"]) && !isset($_COOKIE["user"])){
        require_once("init.php");

        $login_url = 'https://accounts.google.com/o/oauth2/v2/auth?scope=' . urlencode('https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.me') . '&redirect_uri=' . urlencode(CLIENT_REDIRECT_URL) . '&response_type=code&client_id=' . CLIENT_ID . '&access_type=offline&prompt=consent';
        header("Location: ".$login_url);
    }else if(!isset($_SESSION["user"]) && isset($_COOKIE["user"])){
        $cookie_data = htmlspecialchars(($_COOKIE["user"]), ENT_QUOTES);
        $cookie_data = explode(",", $cookie_data);

        //Getting Profile Picture
        if(isset($_COOKIE["user_image"])){
            $_SESSION['user']['image'] = filter_var($_COOKIE['user_image'], FILTER_SANITIZE_URL);
        }

        require_once "../includes/initdb.php";
        $query = "SELECT uuid, user_id, eno, name, email, gender, token, source, expiry, rc, sc, dob, contact, address FROM users WHERE uuid=%i LIMIT 1";
        $result = DB::query($query, $cookie_data[0]);

        if($cookie_data[1] === substr($result[0]['token'], 0, 64)){
            $_SESSION['user']['uuid'] = $result[0]["uuid"];
            $_SESSION['user']['user_id'] = $result[0]['user_id'];
            $_SESSION['user']['eno'] = $result[0]['eno'];
            $_SESSION['user']['name'] = $result[0]['name'];
            $_SESSION['user']['email'] = $result[0]['email'];
            $_SESSION['user']['gender'] = $result[0]['gender'];
            $_SESSION['user']['expiry'] = $result[0]['expiry'];
            $_SESSION['user']['token'] = $result[0]['token'];
            $_SESSION['user']['source'] = $result[0]['source'];
            $_SESSION['user']['rc'] = $result[0]['rc'];
            $_SESSION['user']['sc'] = $result[0]['sc'];
            $_SESSION["user"]["dob"] = date("d-m-Y", $result[0]["dob"]);
            $_SESSION["user"]["contact"] = $result[0]["contact"];
            $_SESSION["user"]["address"] = $result[0]["address"];
            $_SESSION['user']['programme'] = DB::query("SELECT p_name FROM programmes INNER JOIN users_programmes ON programmes.p_id = users_programmes.p_id INNER JOIN users ON users.uuid = users_programmes.uuid WHERE users.uuid = %s LIMIT 1", $_SESSION['user']['uuid'])[0]["p_name"];

            header("Location: ../profile.php");
        }
    }else if(isset($_SESSION["user"])){
        header("Location: ../profile.php");
    }
?>