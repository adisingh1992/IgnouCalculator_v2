<?php
    if(!session_id()) {
        session_start();
    }

    require_once "init.php";

    if($_SERVER["REQUEST_METHOD"] === "POST" && isset($_SESSION['user']['eno'])){
        $status = filter_input(INPUT_POST, "status", FILTER_SANITIZE_STRING);
        $firstname = filter_input(INPUT_POST, "firstname", FILTER_SANITIZE_STRING);
        $amount = filter_input(INPUT_POST, "amount", FILTER_SANITIZE_STRING);
        $txnid = filter_input(INPUT_POST, "txnid", FILTER_SANITIZE_STRING);
        $posted_hash = filter_input(INPUT_POST, "hash", FILTER_SANITIZE_STRING);
        $key = filter_input(INPUT_POST, "key", FILTER_SANITIZE_STRING);
        $productinfo = filter_input(INPUT_POST, "productinfo", FILTER_SANITIZE_STRING);
        $email = filter_input(INPUT_POST, "email", FILTER_SANITIZE_STRING);

        if(isset($_POST["additionalCharges"])) {
            $additionalCharges = filter_input(INPUT_POST, "additionalCharges", FILTER_SANITIZE_STRING);
            $retHashSeq = $additionalCharges . '|' . $SALT . '|' . $status . '|||||||||||' . $email . '|' . $firstname . '|' . $productinfo . '|' . $amount . '|' . $txnid . '|' . $key;
        }else{
            $retHashSeq = $SALT . '|' . $status . '|||||||||||' . $email . '|' . $firstname . '|' . $productinfo . '|' . $amount . '|' . $txnid . '|' . $key;
        }
        $hash = hash("sha512", $retHashSeq);
        if($hash !== $posted_hash){
            echo "Invalid Transaction Details, Please try again";
            echo "<a href='../projects.php'>Take Me Back</a>";
        }else{
            if($status === "failure"){
                echo "Your Transaction has failed, Please try again";
                echo "<a href='../projects.php'>Take Me Back</a>";
            }else if($status === "success"){
                require_once "../includes/project_sender.php";
                send_project($_SESSION['user']['email'], $_SESSION['user']['name'], $productinfo.".zip");
                echo "<h3>Thank You, Your order has successfully been placed!</h3>";
                echo "<h4>Your Transaction ID is " . $txnid . ". You can record this for future reference.</h4>";
                echo "You will recieve your project soon in your mail..!!";
                echo "<a href='../projects.php'>Take Me Back</a>";
                echo "<cite>If for some reason you don't recieve the project, please also check your spam folder or you can also contact us at mail@ignoucalculator.com</cite>";
            }
        }
    }
?>
