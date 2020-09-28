import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { Router } from '@angular/router';
import { producto } from '../interface/producto';
import { ConstantPool } from '@angular/compiler';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  NomProducto:string;
  buscartxt: string;
  constructor(public root:Router , public servicio:ServiciosService) { }
  productos:producto[];
  ngOnInit(): void {
    this.iniciar();
  }

  iniciar(){
   this.servicio.getproductos().subscribe((data:any)=>{ this.productos = data.data.productos;
    console.log(this.productos);
  });
  
  }

  
  modificarProducto(producto: producto) {
    this.servicio.nuevoProducto = false;
    this.servicio.ProductoSeleccionado = producto;
  
    console.log(this.servicio.nuevoProducto);
  }

 nuevoProducto(){
    this.servicio.nuevoProducto = true;
    this.servicio.ProductoSeleccionado = new producto();
    console.log(this.servicio.nuevoProducto);

 }
 
 
   obtenerTalles(producto:producto){
     this.servicio.ProductoSeleccionado=producto;
     this.servicio.getTallesStock().subscribe((data:any)=> {
       this.servicio.talles = data.data.productos;
       console.log(this.servicio.talles);
     });
     this.cargarTalles();
   }
   cargarTalles(){
    this.servicio.getTalles().subscribe((data:any) =>{
      this.servicio.talleslista = data.data.talles;
 
    })
  }
   
  buscar() {
    if (this.buscartxt.length <= 2) {
      this.productos = [];
      if(this.buscartxt == ""){
      this.iniciar();
      }
      return;
    }
    this.servicio.getProdPorNombre(this.buscartxt).subscribe((data: any) => {
      this.productos = data.data.productos;
    });
  }

}
