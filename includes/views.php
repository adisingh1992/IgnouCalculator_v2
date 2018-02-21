<?php
    class Views{
        protected $dir = "templates/";
        protected $params = array();
        
        public function __construct($dir = null){
            if($dir !== null){
                $this->dir = $dir;
            }
        }
        
        public function __set($name, $value){
            $this->params[$name] = $value;
        }
        
        public function __get($name){
            return $this->params[$name];
        }
        
        public function render($filename, $vars = ""){
            if(file_exists($this->dir.$filename)){
                include $this->dir.$filename;
            }
            else{
               throw new Exception("Oops..!! The requested file was not found.");
            }
        }
    }
?>