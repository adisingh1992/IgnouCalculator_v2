<?php
    if(!session_id()) {
        session_start();
    }

    class Tokenizer{
        private $key = "";
        
        public function __construct(){
            $this->key = base64_encode(md5("2009190809364895"));
        }
        
        public function encrypt($token){
            $plaintext = $token;
            $key = $this->key;
            $ivlen = openssl_cipher_iv_length($cipher="AES-128-CBC");
            $iv = openssl_random_pseudo_bytes($ivlen);
            $ciphertext_raw = openssl_encrypt($plaintext, $cipher, $key, $options=OPENSSL_RAW_DATA, $iv);
            $hmac = hash_hmac('sha256', $ciphertext_raw, $key, $as_binary=true);
            $ciphertext = base64_encode( $iv.$hmac.$ciphertext_raw );
            return $ciphertext;
        }
        
        public function decrypt($token){
            $ciphertext = $token;
            $key = $this->key;
            $c = base64_decode($ciphertext);
            $ivlen = openssl_cipher_iv_length($cipher="AES-128-CBC");
            $iv = substr($c, 0, $ivlen);
            $hmac = substr($c, $ivlen, $sha2len=32);
            $ciphertext_raw = substr($c, $ivlen+$sha2len);
            $original_plaintext = openssl_decrypt($ciphertext_raw, $cipher, $key, $options=OPENSSL_RAW_DATA, $iv);
            $calcmac = hash_hmac('sha256', $ciphertext_raw, $key, $as_binary=true);
            if (hash_equals($hmac, $calcmac)){ //PHP 5.6+ timing attack safe comparison
                return $original_plaintext."\n";
            }
            return -1;
        }
        
        public function update($token, $expiry){
            require_once "initdb.php";
            DB::update('users', array(
                'token' => $token,
                'expiry' => $expiry
            ), "user_id=%s", $_SESSION['user']['user_id']);
        }
    }
?>