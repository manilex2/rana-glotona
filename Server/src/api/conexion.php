<?php
    function retornarConexion()
    {
        require_once(__DIR__ . '/../../vendor/autoload.php');
        $dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
        $dotenv -> load();
        $con=mysqli_connect($_ENV["DB_HOST"], $_ENV["DB_USER"], $_ENV["DB_PASSWORD"], $_ENV["DB_NAME"], $_ENV["DB_PORT"]);
        //$con=mysqli_connect('localhost', 'root', 'd3VR4n46l0t0n4.,', 'ranaglotona', 3306);
        return $con;
    }
?>