import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';
import { Producto } from 'src/app/models/productos.interface'
import { Categoria } from 'src/app/models/categorias.interface';


@Component({
  selector: 'app-tabla-productos',
  templateUrl: './tabla-productos.component.html',
  styleUrls: ['./tabla-productos.component.css']
})
export class TablaProductosComponent implements OnInit {
  PRODUCTO_DATA: Producto[] = [];
  CATEGORIA_DATA: Categoria[] = [];
  columnasMostradas: string[] = ['titulo_categoria', 'id_producto', 'titulo_producto', 'volumen_producto', 'peso_producto', 'cantidad_producto', 'unidades_pack_producto', 'costo_producto', 'costo_transporte_producto', 'costo_vzla_producto', 'precio_venta_producto', 'precio_real_producto', 'precio_pagina_producto', 'ancho_producto', 'profundidad_producto', 'alto_producto', 'ancho_pack_producto', 'profundidad_pack_producto', 'alto_pack_producto', 'volumen_pack_producto', 'peso_pack_producto', 'id_proveedor_producto', 'imagen_producto', 'nombre_proveedor', 'fecha_creacion_producto', 'fecha_actualizacion_producto'];
  fuenteDatos = new MatTableDataSource<Producto>(this.PRODUCTO_DATA);
  fuenteDatosCategorias = new MatTableDataSource<Categoria>(this.CATEGORIA_DATA);

  @ViewChild(MatPaginator, {static: true}) paginador: MatPaginator;
  @ViewChild(MatSort, {static: true}) ordenador: MatSort;

  constructor(
    private productosServicio: ProductosService,
    private categoriasServicio: CategoriasService
  ) {}

  ngOnInit() {
    this.fuenteDatos.paginator = this.paginador;
    this.fuenteDatos.sort = this.ordenador;
    this.recuperarProductos();
    this.recuperarCategorias();
  }

  recuperarProductos(){
    let resp = this.productosServicio.obtenerProductosTabla();
    resp.subscribe(result => {
      this.fuenteDatos.data = result as Producto[];
      console.log(this.fuenteDatos.data[0].titulo_producto);
    });
  }

  recuperarCategorias(){
    let resp = this.categoriasServicio.obtenerCategorias();
    resp.subscribe(result => {
      this.fuenteDatosCategorias.data = result as Categoria[];
      console.log(this.fuenteDatosCategorias.data[0].titulo_categoria);
    });
  }

  aplicarFiltro(evento: Event) {
    const valorFiltro = (evento.target as HTMLInputElement).value;
    this.fuenteDatos.filter = valorFiltro.trim().toLowerCase();

    if(this.fuenteDatos.paginator){
      this.fuenteDatos.paginator.firstPage();
    }
  }
}
