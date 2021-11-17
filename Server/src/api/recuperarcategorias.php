<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

    require("conexion.php");

    $con=retornarConexion();
    echo $query;
    $query="SELECT * FROM categorias";
    $registros=mysqli_query($con, $query);
    $vec=[];

    while ($reg=mysqli_fetch_array($registros)) {
        $vec[]=$reg;
    }

    $cad=json_encode($vec);
    echo $cad;
?>