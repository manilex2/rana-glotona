<?php
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

    $json = file_get_contents('php://input');
    $params = json_decode($json, true);

    require("conexion.php");

    $nombreArchivo = $params["imagen_producto"]["nombreArchivo"];
    $extension = pathinfo($nombreArchivo, PATHINFO_EXTENSION);
    $token = md5(uniqid(rand(), true));
    $nombreArchivo = $token .'.'. $extension;
    $ruta_categoria = $params["imagen_producto"]["categoria"];
    $archivo = $params["imagen_producto"]["base64textString"];
    $archivo = base64_decode($archivo);

    $filePath = $_SERVER["DOCUMENT_ROOT"]."./src/assets/img/Product Images/".$ruta_categoria.'/';
    if (!file_exists($filePath)) {
        @mkdir($filePath, 077, true);
    }
    $rutacreada = $filePath.$nombreArchivo;
    file_put_contents($rutacreada, $archivo);
    $url_db = "./assets/img/Product Images/".$ruta_categoria.'/'.$nombreArchivo;

    $con = retornarConexion();
    $query = mysqli_query($con, "INSERT INTO productos(
        titulo_producto,
        volumen_producto,
        peso_producto,
        cantidad_producto,
        unidades_pack_producto,
        costo_producto,
        costo_transporte_producto,
        costo_vzla_producto,
        precio_venta_producto,
        precio_real_producto,
        precio_pagina_producto,
        ancho_producto,
        profundidad_producto,
        alto_producto,
        desperdicio_producto,
        ancho_pack_producto,
        profundidad_pack_producto,
        alto_pack_producto,
        volumen_pack_producto,
        peso_pack_producto,
        id_proveedor_producto,
        imagen_producto,
        id_categoria,
        id_proveedor) VALUES (
        '$params[titulo_producto]',
        $params[volumen_producto],
        $params[peso_producto],
        $params[cantidad_producto],
        $params[unidades_pack_producto],
        $params[costo_producto],
        $params[costo_transporte_producto],
        $params[costo_vzla_producto],
        $params[precio_venta_producto],
        $params[precio_real_producto],
        $params[precio_pagina_producto],
        $params[ancho_producto],
        $params[profundidad_producto],
        $params[alto_producto],
        $params[desperdicio_producto],
        $params[ancho_pack_producto],
        $params[profundidad_pack_producto],
        $params[alto_pack_producto],
        $params[volumen_pack_producto],
        $params[peso_pack_producto],
        '$params[id_proveedor_producto]',
        '$url_db',
        $params[id_categoria],
        $params[id_proveedor])"
    );
    
    class Resultado{};

    $respuesta = new Resultado();
    $respuesta -> resultado = "OK";
    $respuesta -> mensaje = "producto creado";

    echo json_encode($respuesta);
    header('Content-Type: application/json');
?>