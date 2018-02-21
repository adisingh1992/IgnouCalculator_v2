<?php
    if (!session_id()) {
        session_start();
    }
    /* Google App Client Id */
    //
    define('CLIENT_ID', '1025225131786-l8regfnj4jn1ridja88oav00igrnv8uc.apps.googleusercontent.com');
    /* Google App Client Secret */
    define('CLIENT_SECRET', 'wid_VJMm0wGGk2jA_QQfJpeA');
    /* Google App Redirect Url */
    define('CLIENT_REDIRECT_URL', 'http://localhost:8000/g_oauth/callback.php');
?>