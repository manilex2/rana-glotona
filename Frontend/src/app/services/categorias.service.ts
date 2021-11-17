import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  API_URI = "http://localhost:80/La-Rana-Glotona/Server/api/";

  constructor(private http: HttpClient) { }

  obtenerCategorias(){
    return this.http.get(`${this.API_URI}recuperarcategorias.php`);
  }

  obtenerCategoria(id_categoria: any){
    return this.http.get(`${this.API_URI}obtenercategoria.php?id_categoria=${id_categoria}`);
  }
}
