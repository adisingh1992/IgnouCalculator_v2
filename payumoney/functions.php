<?php
    require_once "init.php";

    function get_transaction_id(){
        $txnid = substr(hash('sha256', mt_rand() . microtime()), 0, 20);
        return $txnid;
    }

    function calculate_hash($payment, $SALT, $hashSequence){
        $hashVarsSeq = explode('|', $hashSequence);
        $hash_string = '';	
        foreach($hashVarsSeq as $hash_var) {
            $hash_string .= isset($payment[$hash_var]) ? $payment[$hash_var] : '';
            $hash_string .= '|';
        }
        $hash_string .= $SALT;
        $hash = strtolower(hash('sha512', $hash_string));
        return $hash;
    }
?>