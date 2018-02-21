<?php
    if(!session_id()) {
        session_start();
    }
    header("authorization: pkl9XPycXWpvz8WKWLZP7+ju0LVwHg/GOuZ2h2zMyN0=");

    if($_SERVER["REQUEST_METHOD"] === "POST" && $_SESSION["payment_id"] === filter_input(INPUT_POST, "form_id", FILTER_SANITIZE_STRING) && isset($_SESSION['user']['eno'])){
        require_once "functions.php";
        
        $payment["amount"] = 500.00;
        if(preg_match('/^[0-9]{10}$/', $_POST['phone'])){
            $payment["phone"] = filter_input(INPUT_POST, "phone", FILTER_SANITIZE_STRING);
        }
        $payment["productinfo"] = filter_input(INPUT_POST, "project_id", FILTER_SANITIZE_STRING);
        $payment["firstname"] = $_SESSION["user"]["name"];
        $payment["email"] = $_SESSION["user"]["email"];
        $payment["txnid"] = get_transaction_id();
        $payment["key"] = $MERCHANT_KEY;
        $payment["surl"] = $SUCCESS_URL;
        $payment["furl"] = $FAILURE_URL;
        $payment["service_provider"] = $SERVICE_PROVIDER;
        $hash = calculate_hash($payment, $SALT, $hashSequence);
?>
<!--<html>
    <head></head>
    <body>
        <form action="<?php echo $action; ?>" method="POST" autocomplete="off">
            <input type="text" name="firstname" value="<?php echo $payment["firstname"]; ?>" readonly/>
            <input type="text" name="phone" value="<?php echo $payment["phone"]; ?>" readonly/>
            <input type="text" name="email" value="<?php echo $payment["email"]; ?>" readonly/>
            <input type="text" name="txnid" value="<?php echo $payment["txnid"]; ?>" readonly/>
            <input type="text" name="productinfo" value="<?php echo $payment["productinfo"]; ?>" readonly/>
            <input type="text" name="amount" value="<?php echo $payment["amount"]; ?>" readonly/>
            <input type="text" name="key" value="<?php echo $payment["key"]; ?>" readonly hidden/>
            <input type="text" name="surl" value="<?php echo $payment["surl"]; ?>" readonly hidden/>
            <input type="text" name="furl" value="<?php echo $payment["furl"]; ?>" readonly hidden/>
            <input type="text" name="service_provider" value="<?php echo $payment["service_provider"]; ?>" readonly hidden/>
            <input type="text" name="hash" value="<?php echo $hash; ?>" readonly hidden/>
            <input type="submit" name="submit" value="Proceed To Payment"/>
        </form>
    </body>
</html>-->
<html>
    <head>
        <title>IgnouCalculator Payment Gateway</title>
        <link rel=icon type=image/png sizes=16x16 href=../templates/static/favicon/favicon-16x16.png>
        <style>
            * {
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
            }
            body{
                /*background:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAUElEQVQoU2NkYGAwBuKzQAwDID4IoIgxIikAMZE1oRiArBDdZBSNMIXoJiFbDZYDKcSmCOYimDuNSVKIzRNYrUYOFuQgweoZbIoxgoeoAAcAEckW145YH8EAAAAASUVORK5CYII=") repeat;*/
                background:url("../templates/static/images/pattern.svg") repeat;
            }
            .responsive-container{
                background: #f7fbfc; /* Old browsers */
                background: -moz-linear-gradient(top, #f7fbfc 0%, #d9edf2 40%, #add9e4 100%); /* FF3.6-15 */
                background: -webkit-linear-gradient(top, #f7fbfc 0%,#d9edf2 40%,#add9e4 100%); /* Chrome10-25,Safari5.1-6 */
                background: linear-gradient(to bottom, #f7fbfc 0%,#d9edf2 40%,#add9e4 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
                filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f7fbfc', endColorstr='#add9e4',GradientType=0 ); /* IE6-9 */
                /**/
                width:50%;
                margin:0px auto;
                border:1px solid #eee;
                box-shadow: 0px 0px 10px #dedede;
                padding: 30px;
                border-radius:5px;
            }
            .desc{
                margin-left: 25px ;
                text-align: center;
                font-size: 18px;
                line-height: 2;
            }
            form > div {
                clear: both;
                overflow: hidden;
                padding: 1px;
                margin: 0 0 10px 0;
            }
            form > div > div,
            form > div > fieldset > div {
                width: 75%;
                float: right;
            }
            input{
                padding: 10px !important;
                border-radius:10px;
                border:1px solid #ddd;
            }

            input[type=text],
            input[type=email],
            input[type=url],
            input[type=password] {
                width: 100%;
            }
            input[type=text]:focus,
            input[type=email]:focus,
            input[type=url]:focus,
            input[type=password]:focus,
            textarea:focus {
                outline: 0;
                border-color: #4697e4;
            }
            .pay-button{
                border:1px solid #000;
                background-color: whitesmoke;
                padding: 10px 20px 10px 20px !important;
            }
            .pay-button:hover{ 
                box-shadow: 0px 0px 2px #090909;
                cursor: pointer;

            }
            .button-center{
                margin:0px auto !important; 
                text-align: center;
                margin-top: 30px !important;
            }
            @media (max-width: 600px) {
                .responsive-container{
                    width: 98% !important;
                    margin:0px  auto; 

                }
                form > div {
                    margin: 0 0 15px 0; 
                }
                form > div > label,
                legend {
                    width: 100%;
                    float: none;
                    margin: 0 0 5px 0;
                }
                form > div > div,
                form > div > fieldset > div {
                    width: 100%;
                    float: none;
                }
            }
            h2{
                text-align: center;
                color: grey;
            }
            .center-justified {
                text-align: justify;
                -moz-text-align-last: center;
                text-align-last: center;
            }
        </style>
    </head>
    <body>
        <div class="responsive-container">
            <h2>Confirm Your Details</h2>
            <form action="<?php echo $action; ?>" method="POST" autocomplete="off" name="payuForm">
                <div>
                    <label class="desc">Name:</label>
                    <div>
                        <input type="text" name="firstname" value="<?php echo $payment["firstname"]; ?>" readonly/>
                    </div>
                </div>
                <div>
                    <label class="desc">Email:</label>
                    <div>
                        <input type="text" name="email" value="<?php echo $payment["email"]; ?>" readonly/>
                    </div>
                </div>
                <div>
                    <label class="desc">Contact:</label>
                    <div>
                        <input type="text" name="phone" value="<?php echo $payment["phone"]; ?>" readonly/>
                    </div>
                </div>
                <div>
                    <label class="desc">Project:</label>
                    <div>
                        <input type="text" name="productinfo" value="<?php echo $payment["productinfo"]; ?>" readonly/>
                    </div>
                </div>
                <div>
                    <label class="desc">Transaction Id:</label>
                    <div>
                        <input type="text" name="txnid" value="<?php echo $payment["txnid"]; ?>" readonly/>
                    </div>
                </div>
                <div>
                    <label class="desc">Amount:</label>
                    <div>
                        <input type="text" name="amount" value="<?php echo $payment["amount"]; ?>" readonly/>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="text" name="key" value="<?php echo $payment["key"]; ?>" readonly hidden/>
                        <input type="text" name="surl" value="<?php echo $payment["surl"]; ?>" readonly hidden/>
                        <input type="text" name="furl" value="<?php echo $payment["furl"]; ?>" readonly hidden/>
                        <input type="text" name="service_provider" value="<?php echo $payment["service_provider"]; ?>" readonly hidden/>
                        <input type="text" name="hash" value="<?php echo $hash; ?>" readonly hidden/>
                    </div>
                </div>
                <div class="center-justified"><cite><strong>Note:</strong> After confirming the details, you will be redirected to a third-party payment gateway where you can pay using your Credit/Debit card.</cite></div>
                <div class="button-center">
                    <input class="pay-button" name="submit" type="submit" value="Confirm Details"/>
                </div>
            </form>
        </div>
    </body>
</html>
<?php
    }else{
        header("Location: ../index.php");
    }
?>