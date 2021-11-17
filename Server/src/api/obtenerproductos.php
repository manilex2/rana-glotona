<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

    if (empty($_GET["id_categoria"])) {
        exit("No hay un id para esta categoria");
    }

    $id_categoria=$_REQUEST["id_categoria"];

    require("conexion.php");

    $con = retornarConexion();
    $query = "SELECT * FROM productos WHERE id_categoria='$_REQUEST[id_categoria]'";
    $registros=mysqli_query($con, $query);
    $vec=[];

    while ($reg=mysqli_fetch_array($registros)) {
        $vec[]=$reg;
    }

    $cad=json_encode($vec);
    echo $cad;
    header('Content-Type: application/json');
?>