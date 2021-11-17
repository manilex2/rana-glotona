import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {

  API_URI = "http://localhost:80/La-Rana-Glotona/server/api/";

  constructor(private http: HttpClient) { }

  obtenerProveedores(){
    return this.http.get(`${this.API_URI}recuperarproveedores.php`);
  }
}
