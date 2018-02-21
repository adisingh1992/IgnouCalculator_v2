<?php
    if (!session_id()) {
        session_start();
    }
    /* Google App Client Id */
    //
    define('CLIENT_ID', '');
    /* Google App Client Secret */
    define('CLIENT_SECRET', '');
    /* Google App Redirect Url */
    define('CLIENT_REDIRECT_URL', 'http://localhost:8000/g_oauth/callback.php');
?>