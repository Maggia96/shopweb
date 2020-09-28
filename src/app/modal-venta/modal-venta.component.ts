import { Component, OnInit } from '@angular/core';
import { producto } from '../interface/producto';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';
import { DVentas } from '../interface/DVenta';
import { Detalles_web } from '../interface/Detalles_web';
import { venta } from '../interface/Venta';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-modal-venta',
  templateUrl: './modal-venta.component.html',
  styleUrls: ['./modal-venta.component.scss'],
})
export class ModalVentaComponent implements OnInit {
  cantidad: number;
  buscartxt: string;
  productos: producto[];
  stock : number;
  constructor(public servicio: ServiciosService, public toastr: ToastrService) {
    this.cantidad = 0;
  }

  ngOnInit(): void {
    
  }

  obtenerTalles(producto: producto) {
    this.servicio.ProductoSeleccionado = producto;
    this.servicio.getTallesStock().subscribe((data: any) => {
      this.servicio.talles = data.data.productos;
      console.log(this.servicio.talles);
    });
  }
  buscar() {
    if (this.buscartxt.length <= 2) {
      this.productos = [];
      return;
    }
    this.servicio.getProdPorNombre(this.buscartxt).subscribe((data: any) => {
      this.productos = data.data.productos;
    });
  }
  Ver(pro: producto) {
    this.servicio.ProductoSeleccionado = pro;
    this.buscartxt = '';
    this.productos = [];
    setTimeout(() => {
      this.servicio.getTallesStock().subscribe((data: any) => {
        this.servicio.talles = data.data.productos;
      });
    }, 200);
  }

  AgregarDetalle() {
    this.stock = 0;
    if (this.servicio.ProductoSeleccionado.id == null) {
      this.toastr.error('Debe elgir un producto');
      return;
    }
    if (
      this.cantidad == null ||
      this.cantidad == 0 ||
      this.servicio.talleSeleccionado == null
    ) {
      this.toastr.error('Debe elegir un talle , asignar la cantidad.');
      return;
    }

    for (let index = 0; index < this.servicio.talles.length; index++) {
     
      if (this.servicio.talles[index].idTalle == this.servicio.talleSeleccionado){
           this.stock = this.servicio.talles[index].stock;
      }
    }
    console.log(this.servicio.talles);
    console.log(this.stock, "este es el stock");
    if(this.cantidad > this.stock){
      this.toastr.error("no tiene el stock suficiente!");
      return;
    }

    console.log(this.servicio.ventaActual.id);
    this.servicio.nuevoDetalleVenta.idProducto = this.servicio.ProductoSeleccionado.id;
    this.servicio.nuevoDetalleVenta.idTalle = this.servicio.talleSeleccionado;
    this.servicio.nuevoDetalleVenta.idVenta = this.servicio.ventaActual.id;
    this.servicio.nuevoDetalleVenta.cantidad = this.cantidad;
    this.servicio.nuevoDetalleVenta.precioUnitario = this.servicio.ProductoSeleccionado.precioVenta;
    this.servicio.nuevoDetalleVenta.total =
      this.servicio.ProductoSeleccionado.precioVenta * this.cantidad;
   this.servicio.nuevoDetalleVenta.alCosto = this.servicio.ProductoSeleccionado.precioVenta - this.servicio.ProductoSeleccionado.precioCompra;
    console.log(this.servicio.nuevoDetalleVenta);
    this.servicio.post_detalleVenta().subscribe((data: any) => {
      console.log(data.data);
      if (data.data.success) {
        this.servicio.ProductoSeleccionado = new producto();
        this.servicio.talleSeleccionado = null;
        this.cantidad = 0;
        this.servicio.talles= [];
        this.cargarDetalles();
         
        setTimeout(() => {
          this.calcularTotal();
        }, 100);
      }else{
        this.toastr.error(data.data.mensaje);
      }
    });
  }

  cargarDetalles() {
    
    this.servicio.getDetalles_VentaActual().subscribe((data: any) => {
      this.servicio.Detalles = data.data.detalles;
      console.log(data.data);
      
    });
  }


sumarGanancias(){
  this.cargarDetalles();
  var costo :Number;
   var cantidad : Number;
  var resultado : Number;
  resultado = 0;
  for (let index = 0; index < this.servicio.Detalles.length; index++) {

      costo =this.servicio.Detalles[index].alCosto ;
      cantidad =  this.servicio.Detalles[index].cantidad;
      resultado = Number(cantidad) * Number(costo) + Number(resultado);

  }
  this.servicio.ventaActual.precioCosto = Number(resultado);

}

  calcularTotal() {
    if (this.servicio.Detalles.length < 0) {
      return;
    }
    this.servicio.ventaActual.subTotal = 0;
    var sum: number;

    var result: number;
    result = 0;
    for (let index = 0; index < this.servicio.Detalles.length; index++) {
      console.log(this.servicio.Detalles[index].Total);
      sum = this.servicio.Detalles[index].Total;
      sum = Number(sum);

      result = sum + result;
    }
    this.servicio.ventaActual.subTotal = result;
    this.total_pagar();
  }

  eliminarDetalle(detalle: Detalles_web) {
    if(this.servicio.ventaActual.estado == true){
      console.log("no boorra");
        return;
    }
    console.log(detalle);
    this.servicio
      .EliminarDetalles_VentaActual(detalle)
      .subscribe((data: any) => {
        this.toastr.success(data.data.mensaje);
        this.cargarDetalles();
        setTimeout(() => {
          if(this.servicio.Detalles != null){
            this.calcularTotal();
    
          }
          else{
            this.servicio.ventaActual.subTotal = 0;
          }
        }, 100);
        if(this.servicio.ProductoSeleccionado.id != null){
          this.servicio.getTallesStock().subscribe((data: any) => {
            this.servicio.talles = data.data.productos;
          });
          
        }
        
      });
  }
  salir(){
    this.servicio.ProductoSeleccionado = new producto();
    this.servicio.talleSeleccionado = null;
    this.cantidad = 0;
    this.servicio.talles= [];
  };



total_pagar(){
  this.servicio.ventaActual.total = this.servicio.ventaActual.subTotal  - (this.servicio.ventaActual.subTotal * (this.servicio.ventaActual.descuento / 100));
}

finalizar_venta(){
  
  if(this.servicio.Detalles ==  null){
   this.toastr.error("Debe cargar al menos un producto");
   return;
  }
  else{
    this.servicio.ventaActual.estado = true;
    this.sumarGanancias();
  this.servicio.finalizarVenta().subscribe((data:any)=>
  {
    if(data.data.success){
       this.toastr.success(data.data.mensaje);
       this.limpiar();
       this.cargarVentas(); 
    }else{
      this.toastr.error(data.data.mensaje);
    }
  })
  }
}
limpiar(){
  this.servicio.ProductoSeleccionado = new producto();
  this.servicio.Detalles = null;
  this.servicio.talleSeleccionado = null;
  this.servicio.ventaActual = new venta();
}

anular(){
  this.reponer_stock_alAnular();
  this.servicio.anularVenta().subscribe((data:any )=> {
    if(data.data.success){
      this.toastr.success(data.data.mensaje);
      this.cargarVentas();
    }
    else{
     this.toastr.error(data.data.mensaje);
    }
  })
}


reponer_stock_alAnular(){

  for (let index = 0; index < this.servicio.Detalles.length; index++) {
    console.log(this.servicio.Detalles[index], "fila");  
    console.log(this.servicio.Detalles , "completa");
    this.servicio.recuperarStock(this.servicio.Detalles[index]).subscribe((data:any)=> {
     console.log(data.data.mensaje);
    })
}


}

cargarVentas(){
  this.servicio.getlistaVentas().subscribe((data:any) =>{
    console.log(data);
    this.servicio.ListaVentas = data.data.ventas;
  
  })
}

}
