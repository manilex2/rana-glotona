import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  API_URI = "http://localhost:80/La-Rana-Glotona/server/api/";

  constructor(private http: HttpClient) { }

  obtenerProductos(id_categoria: any){
    return this.http.get(`${this.API_URI}obtenerproductos.php?id_categoria=${id_categoria}`);
  }

  crearProducto(producto){
    return this.http.post(`${this.API_URI}crearproducto.php`, JSON.stringify(producto));
  }

  obtenerProductosTabla(){
    return this.http.get(`${this.API_URI}recuperarproductos.php`);
  }
}
