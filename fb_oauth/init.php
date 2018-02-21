<?php
    if (!session_id()) {
        session_start();
    }
    require_once( 'Facebook/autoload.php' );

// Test Settings
//    $fb = new Facebook\Facebook([
//        'app_id' => '2009190809364895',
//        'app_secret' => 'f925c7b5353090e8b6e92f0a92574b0d',
//        'default_graph_version' => 'v2.5',
//        ]);
//
// Live Settings
    $fb = new Facebook\Facebook([
        'app_id' => '824413457683384',
        'app_secret' => 'a83d1b9ff860d606f9b4f1b4f866bd12',
        'default_graph_version' => 'v2.5',
        ]);

    $helper = $fb->getRedirectLoginHelper();
?>