<?php
    namespace PHPMailer\PHPMailer;

    if(!session_id()) {
        session_start();
    }

    require 'phpMailer/PHPMailer.php';
    require 'phpMailer/SMTP.php';
    require 'phpMailer/Exception.php';

    function send_project($email, $username, $projectfile){
        //Create a new PHPMailer instance
        $mail = new PHPMailer;
        //Tell PHPMailer to use SMTP
        $mail->isSMTP();
        //Enable SMTP debugging
        // 0 = off (for production use)
        // 1 = client messages
        // 2 = client and server messages
        $mail->SMTPDebug = 0;
        //Set the hostname of the mail server
        $mail->Host = '';

        // use
        // $mail->Host = gethostbyname('smtp.gmail.com');
        // if your network does not support SMTP over IPv6
        //Set the SMTP port number - 587 for authenticated TLS, a.k.a. RFC4409 SMTP submission
        $mail->Port = 465;
        //Set the encryption system to use - ssl (deprecated) or tls
        $mail->SMTPSecure = 'ssl';
        //Whether to use SMTP authentication
        $mail->SMTPAuth = true;
        //Username to use for SMTP authentication - use full email address for gmail
        //$mail->Username = "ignoucalculator@gmail.com";
        //Password to use for SMTP authentication
        //$mail->Password = "adi@ignoucalculator";

        $mail->Username = "abc@xyz.in";
        //Password to use for SMTP authentication
        $mail->Password = "abcd";

        //Set who the message is to be sent from
        $mail->setFrom('projects@teamscorpion.in', 'IgnouCalculator');
        //Set an alternative reply-to address
        $mail->addReplyTo('projects@teamscorpion.in', 'IgnouCalculator');
        //Set who the message is to be sent to
        //$mail->addAddress($email, 'IgnouCalculator');
        $mail->addAddress($email, $username);
        //Set the subject line
        $mail->Subject = 'Project from IgnouCalculator';
        //Read an HTML message body from an external file, convert referenced images to embedded,
        //convert HTML into a basic plain-text alternative body
        $mail->msgHTML('<h3>Thanks for your payment..!!</h3><p>Your purchased project is attached to this e-mail.<br/>Keep visiting!!</p>');
        //Replace the plain text body with one created manually
        $mail->AltBody = '<h3>Thanks for your payment..!!</h3><p>Your purchased project is attached to this e-mail.<br/>Keep visiting!!</p>';
        //add attachment
        $mail->addAttachment($projectfile, 'Project');
        //send the message, check for errors
        ($mail->send()) ? true : false;
    }
?>
