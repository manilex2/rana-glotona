import { Component, OnInit } from '@angular/core';
import { CategoriasService } from '../../services/categorias.service';

@Component({
  selector: 'app-categorias-toolbar',
  templateUrl: './categorias-toolbar.component.html',
  styleUrls: ['./categorias-toolbar.component.css']
})
export class CategoriasToolbarComponent implements OnInit {
  categorias: any;

  constructor(private categoriasServicio: CategoriasService) { }

  ngOnInit(): void {
    this.recuperarCategorias();
  }

  recuperarCategorias(){
    this.categoriasServicio.obtenerCategorias().subscribe(result => this.categorias = result);
  }

  hayCategorias(){
    return true;
  }

}
