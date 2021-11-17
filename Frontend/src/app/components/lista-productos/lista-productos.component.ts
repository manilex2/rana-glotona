import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from 'src/app/services/productos.service';
import { CategoriasService } from "../../services/categorias.service";

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  productos: any;
  categorias: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private categoriasService: CategoriasService,
    private productosService: ProductosService
    ) {}

  ngOnInit(): void {
    this.recuperarDatos();
  }

  recuperarDatos(){
    let id_categoria = this.activatedRoute.snapshot.paramMap.get("id_categoria");
    id_categoria;
    this.productosService.obtenerProductos(id_categoria).subscribe(
      result => {
        this.productos = result;
      },
      err => {
        console.error(err);
      }
    );
    this.categoriasService.obtenerCategoria(id_categoria).subscribe(
      result => {
        this.categorias = result;
      },
      err => {
        console.error(err);
      }
    );
  }

}
