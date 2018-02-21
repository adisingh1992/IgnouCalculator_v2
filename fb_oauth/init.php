<?php
    if (!session_id()) {
        session_start();
    }
    require_once( 'Facebook/autoload.php' );

// Test Settings
//    $fb = new Facebook\Facebook([
//        'app_id' => '',
//        'app_secret' => '',
//        'default_graph_version' => 'v2.5',
//        ]);
//
// Live Settings
    $fb = new Facebook\Facebook([
        'app_id' => '',
        'app_secret' => '',
        'default_graph_version' => 'v2.5',
        ]);

    $helper = $fb->getRedirectLoginHelper();
?>
