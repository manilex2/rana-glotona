import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AngularMaterialModule } from "./modules/angular-material/angular-material.module";
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavegacionComponent } from './components/navegacion/navegacion.component';
import { LayoutModule } from '@angular/cdk/layout';
import { InicioSesionComponent } from './components/inicio-sesion/inicio-sesion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioComponent } from './components/inicio/inicio.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CategoriasToolbarComponent } from './components/categorias-toolbar/categorias-toolbar.component';
import { CategoriasService } from './services/categorias.service';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { ProductosService } from './services/productos.service';
import { TablaProductosComponent } from './components/tabla-productos/tabla-productos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavegacionComponent,
    InicioSesionComponent,
    InicioComponent,
    CategoriasToolbarComponent,
    ListaProductosComponent,
    CrearProductoComponent,
    TablaProductosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    FlexLayoutModule,
    HttpClientModule
  ],
  providers: [
    CategoriasService,
    ProductosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
