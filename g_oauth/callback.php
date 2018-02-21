<?php
    if(!session_id()) {
        session_start();
    }
    require_once("init.php");
    require_once('google-login-api.php');

    if (isset($_GET['code'])){
        try{
            $gapi = new GoogleLoginApi();

            // Get the access token 
            $data = $gapi->GetAccessToken(CLIENT_ID, CLIENT_REDIRECT_URL, CLIENT_SECRET, $_GET['code']);

            // Access Token
            $access_token = $data['access_token'];

            // Get user information
            $user_info = $gapi->GetUserProfileInfo($access_token);

            //Refresh Token Encryption
            require_once "../includes/tokenizer.php";
            $tokenize = new Tokenizer();
            $_SESSION['user']['token'] = $tokenize->encrypt($data['refresh_token']);

            $_SESSION['user']['expiry'] = time()+(3600*24*60);
            $_SESSION['user']['user_id'] = $user_info['id'];
            $_SESSION['user']['name'] = $user_info['displayName'];
            $_SESSION['user']['email'] = $user_info['emails'][0]['value'];
            $_SESSION['user']['source'] = "g";
            if(empty($user_info['gender'])){
                $_SESSION['user']['gender'] = "N/A";
            }else{
                $_SESSION['user']['gender'] = $user_info['gender'];
            }

            //Set profile picture
            $image_url = filter_var(substr($user_info['image']['url'], 0, -2)."200", FILTER_SANITIZE_URL);
            setcookie("user_image", $image_url, time()+3600*24*30, "/");
            $_SESSION["user"]["image"] = $image_url;

            header("Location: ../includes/session.php");
        }catch (Exception $e) {
            echo $e->getMessage();
            exit();
        }
    }
?>