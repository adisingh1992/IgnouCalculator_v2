<?php
    if(!session_id()) {
        session_start();
    }
    require_once "init.php";

    try {
        $accessToken = $helper->getAccessToken();
    } catch (Facebook\Exceptions\FacebookResponseException $e) {
        // When Graph returns an error  
        echo 'Graph returned an error: ' . $e->getMessage();
        exit();
    } catch (Facebook\Exceptions\FacebookSDKException $e) {
        // When validation fails or other local issues
        echo 'Facebook SDK returned an error: ' . $e->getMessage();
        exit();
    }
    
    if(!$accessToken){
        die("User Denied Permission");
    }

    try {
        // Get the Facebook\GraphNodes\GraphUser object for the current user.
        // If you provided a 'default_access_token', the '{access-token}' is optional.
        $response = $fb->get('/me?fields=id,name,email,first_name,last_name,gender,permissions', $accessToken->getValue());
    //  print_r($response);
    } catch (Facebook\Exceptions\FacebookResponseException $e) {
        // When Graph returns an error
        echo 'ERROR: Graph ' . $e->getMessage();
        exit;
    } catch (Facebook\Exceptions\FacebookSDKException $e) {
        // When validation fails or other local issues
        echo 'ERROR: validation fails ' . $e->getMessage();
        exit;
    }
    $me = $response->getGraphUser();

    $permissions = $me->getProperty('permissions');
    foreach ($permissions as $p => $permission) {
        if ($permission['status'] !== 'granted') {
            //die('Error: We require all permissions in order for you to login.');
            header("Location: permissions.php");
            exit();
        }
    }
    $_SESSION['user']['expiry'] = json_encode($accessToken->getExpiresAt());
    $_SESSION['user']['user_id'] = $me->getProperty('id');
    $_SESSION['user']['name'] = $me->getProperty('name');
    $_SESSION['user']['email'] = $me->getProperty('email');
    $_SESSION['user']['gender'] = $me->getProperty('gender');
    $_SESSION['user']['source'] = "f";
    
    //Set Profile Picture
    $image_url = "https://graph.facebook.com/" . $_SESSION['user']['user_id'] . "/picture?type=square&width=200&height=200";
    setcookie("user_image", $image_url, time()+3600*24*30, "/");
    $_SESSION["user"]["image"] = $image_url;

    //Token Encryption
    require_once "../includes/tokenizer.php";
    $tokenize = new Tokenizer();
    $_SESSION['user']['token'] = $tokenize->encrypt($accessToken->getValue());

    header("Location: ../includes/session.php");
?>