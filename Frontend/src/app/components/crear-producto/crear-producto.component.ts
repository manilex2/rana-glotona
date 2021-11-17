import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ProductosService } from 'src/app/services/productos.service';
import { ProveedoresService } from 'src/app/services/proveedores.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  crearProducto: FormGroup;
  enviado = false;
  categorias: any;
  proveedores: any;
  esDolar=false;
  esEuro=false;
  productoCosto;
  productoCostoTransporte;
  productoCostoVzla;
  archivos = [];
  previsualizacion: string;
  archivo = {
    nombreArchivo: null,
    base64textString: null,
    categoria: null
  }

  constructor(
    private categoriasServicio: CategoriasService,
    private fb: FormBuilder,
    private productosServicio: ProductosService,
    private proveedoresServicio: ProveedoresService) {

  }

  ngOnInit(): void {
    this.recuperarCategorias();
    this.recuperarProveedores();
    this.crearProducto = this.fb.group({
    titulo_producto: ['', Validators.required],
    volumen_producto: ['', Validators.compose([
      Validators.pattern(/^[0-9]{1,}(\.[0-9]{1,})?$/),
      Validators.required
    ])],
    peso_producto: ['', Validators.compose([
      Validators.pattern(/^[0-9]{1,}(\.[0-9]{1,3})?$/),
      Validators.required
    ])],
    cantidad_producto: ['', Validators.compose([
      Validators.pattern(/^[0-9]{1,}$/),
      Validators.required
    ])],
    unidades_pack_producto: ['', Validators.compose([
      Validators.pattern(/^[0-9]{1,}$/),
      Validators.required
    ])],
    costo_producto: ['', Validators.compose([
      Validators.pattern(/^[0-9]{1,}(\.[0-9]{1,2})?$/),
      Validators.required
    ])],
    costo_transporte_producto: ['', Validators.compose([
      Validators.pattern(/^[0-9]{1,}(\.[0-9]{1,2})?$/),
      Validators.required
    ])],
    costo_vzla_producto: ['', Validators.compose([
      Validators.pattern(/^[0-9]{1,}(\.[0-9]{1,2})?$/),
      Validators.required
    ])],
    precio_venta_producto: ['', Validators.compose([
      Validators.pattern(/^[0-9]{1,}(\.[0-9]{1,2})?$/),
      Validators.required
    ])],
    precio_real_producto: ['', Validators.compose([
      Validators.pattern(/^[0-9]{1,}(\.[0-9]{1,2})?$/),
      Validators.required
    ])],
    precio_pagina_producto: ['', Validators.compose([
      Validators.pattern(/^[0-9]{1,}(\.[0-9]{1,2})?$/),
      Validators.required
    ])],
    ancho_producto: ['', Validators.compose([
      Validators.pattern(/^[0-9]{1,}(\.[0-9]{1,2})?$/),
      Validators.required
    ])],
    profundidad_producto: ['', Validators.compose([
      Validators.pattern(/^[0-9]{1,}(\.[0-9]{1,2})?$/),
      Validators.required
    ])],
    alto_producto: ['', Validators.compose([
      Validators.pattern(/^[0-9]{1,}(\.[0-9]{1,2})?$/),
      Validators.required
    ])],
    desperdicio_producto: ['', Validators.compose([
      Validators.pattern(/^[0-9]{1,}(\.[0-9]{1,2})?$/),
      Validators.required
    ])],
    ancho_pack_producto: ['', Validators.compose([
      Validators.pattern(/^[0-9]{1,}(\.[0-9]{1,2})?$/),
      Validators.required
    ])],
    profundidad_pack_producto: ['', Validators.compose([
      Validators.pattern(/^[0-9]{1,}(\.[0-9]{1,2})?$/),
      Validators.required
    ])],
    alto_pack_producto: ['', Validators.compose([
      Validators.pattern(/^[0-9]{1,}(\.[0-9]{1,2})?$/),
      Validators.required
    ])],
    volumen_pack_producto: ['', Validators.compose([
      Validators.pattern(/^[0-9]{1,}(\.[0-9]{1,})?$/),
      Validators.required
    ])],
    peso_pack_producto: ['', Validators.compose([
      Validators.pattern(/^[0-9]{1,}(\.[0-9]{1,3})?$/),
      Validators.required
    ])],
    id_proveedor_producto: [''],
    imagen_producto: ['../../../assets/img/no-image.png'],
    id_categoria: [0],
    id_proveedor: [0]
  });
  }

  recuperarCategorias(){
    this.categoriasServicio.obtenerCategorias().subscribe(result => this.categorias = result);
  }

  recuperarProveedores(){
    this.proveedoresServicio.obtenerProveedores().subscribe(result => this.proveedores = result);
  }

  get f() {
    return this.crearProducto.controls;
  }

  agregarProducto() {
    this.productosServicio.crearProducto(this.crearProducto.value).subscribe(
        datos => {
          console.log(this.crearProducto.value);
          if (datos["resultado"]=="OK"){
            alert (datos["mensaje"]);
          }
        }
      );
  }

  enviarDatos(){
    this.enviado = true;
    if (this.crearProducto.invalid){
      return;
    }

    try {
      this.crearProducto.value.id_categoria = parseInt(this.crearProducto.value.id_categoria);
      this.crearProducto.value.id_proveedor = parseInt(this.crearProducto.value.id_proveedor);
      this.crearProducto.value.costo_producto = this.productoCosto;
      this.crearProducto.value.costo_transporte_producto = this.productoCostoTransporte;
      this.crearProducto.value.costo_vzla_producto = this.productoCostoVzla;
      this.archivo.categoria = this.categorias[this.crearProducto.value.id_categoria-1].titulo_categoria;
      this.crearProducto.value.imagen_producto = this.archivo;
      this.agregarProducto();

      console.log(this.crearProducto.value);
    }catch (e) {
        return console.log(e);
    }
  }

  costoProducto() {
    if(this.esDolar===false && this.esEuro===true) {
      this.productoCosto = (this.crearProducto.value.costo_producto*1.30).toFixed(2);
      this.productoCosto = parseFloat(this.productoCosto);
    }else {
      this.productoCosto = this.crearProducto.value.costo_producto.toFixed(2);
      this.productoCosto = parseFloat(this.productoCosto);
    }
  }

  costoTransporteProducto() {
    if(this.esDolar===false && this.esEuro===true) {
      this.productoCostoTransporte = (this.crearProducto.value.costo_transporte_producto*1.30).toFixed(2);
      this.productoCostoTransporte = parseFloat(this.productoCostoTransporte);
    }else {
      this.productoCostoTransporte = this.crearProducto.value.costo_transporte_producto.toFixed(2);
      this.productoCostoTransporte = parseFloat(this.productoCostoTransporte);
    }
  }

  costoVzlaProducto() {
    if(this.esDolar===false && this.esEuro===true) {
      this.productoCostoVzla = (this.crearProducto.value.costo_vzla_producto*1.30).toFixed(2);
      this.productoCostoVzla = parseFloat(this.productoCostoVzla);
    }else {
      this.productoCostoVzla = this.crearProducto.value.costo_vzla_producto.toFixed(2);
      this.productoCostoVzla = parseFloat(this.productoCostoVzla);
    }
  }

  subirImagen(event) {
    const imagenCapturada = event.target.files[0];
    this.extraerBase64(imagenCapturada).then((imagen: any) => {
      this.previsualizacion = imagen.base;
    })
    this.archivos.push(imagenCapturada);
    this.archivo.nombreArchivo = imagenCapturada.name;

    if (imagenCapturada) {
      var reader2 = new FileReader();
      reader2.onload = this._handleReaderLoaded.bind(this);
      reader2.readAsBinaryString(imagenCapturada);
    }
  }

  _handleReaderLoaded(readerEvent) {
    var binaryString = readerEvent.target.result;
    this.archivo.base64textString = btoa(binaryString);
  }

  extraerBase64 = async ($event: any) => new Promise((resolve) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      }
      reader.onerror = () => {
        resolve({
          base: null
        });
      }
    } catch (e) {
      return null;
    }
  })
}
