<?php
    $MERCHANT_KEY = "";
    $SALT = "";

    $PAYU_BASE_URL = "https://sandboxsecure.payu.in";		// For Sandbox Mode
    //$PAYU_BASE_URL = "https://secure.payu.in";			// For Production Mode
    $SUCCESS_URL = "http://localhost:8000/payumoney/callback.php";
    $FAILURE_URL = "http://localhost:8000/payumoney/callback.php";
    
    $action = $PAYU_BASE_URL."/_payment";
    
    $SERVICE_PROVIDER = "payu_paisa";

    // Hash Sequence
    $hashSequence = "key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5|udf6|udf7|udf8|udf9|udf10";
?>
