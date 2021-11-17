import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from "./components/inicio/inicio.component";
import { InicioSesionComponent } from "./components/inicio-sesion/inicio-sesion.component";
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { TablaProductosComponent } from './components/tabla-productos/tabla-productos.component';

const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'login', component: InicioSesionComponent },
  {path: 'categorias/productos/:id_categoria', component: ListaProductosComponent },
  {path: 'nuevo-producto', component: CrearProductoComponent },
  {path: 'tabla-productos', component: TablaProductosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
