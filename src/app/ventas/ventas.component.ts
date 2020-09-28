import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';
import { VirtualTimeScheduler } from 'rxjs';
import { venta } from '../interface/Venta';
import { fechas } from '../interface/fechas';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.scss']
})
export class VentasComponent implements OnInit {


  anuladas:boolean;
  fechas:fechas = new fechas();
  constructor(public servicio : ServiciosService ,  public toastr : ToastrService) {
    this.anuladas = false;
    
   }

  ngOnInit(): void {
    this.cargarVentas();
  }

  NuevaVenta(){
    this.servicio.anular = true;
  this.servicio.get_CrearVenta().subscribe((data:any) => {
    this.servicio.ventaActual = data.data.venta[0];
    console.log(this.servicio.ventaActual);
   
    if(!data.data.success){
      this.toastr.error("data.data.mensaje");    }
  });
  setTimeout(() => {
    this.cargarDetalles();
    setTimeout(() => {
      if(this.servicio.Detalles != null){
        this.calcularTotal();

      }
      else{
        this.servicio.ventaActual.subTotal = 0;
      }
    }, 100);
  
  }, 200);

}

cargarDetalles(){
  this.servicio.getDetalles_VentaActual().subscribe((data:any) =>{
    this.servicio.Detalles = data.data.detalles;
    console.log(data.data);
  })
}

calcularTotal() {
  this.cargarDetalles();
  if (this.servicio.Detalles.length < 0) {
     this.servicio.ventaActual.subTotal = 0;
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

total_pagar(){
  this.servicio.ventaActual.total = this.servicio.ventaActual.subTotal  - (this.servicio.ventaActual.subTotal * (this.servicio.ventaActual.descuento / 100));
}


cargarVentas(){
  this.servicio.getlistaVentas().subscribe((data:any) =>{
    console.log(data);
    this.servicio.ListaVentas = data.data.ventas;
    this.servicio.anular = false;
  })
}

cargarVentasAnuladas(){
  this.servicio.getlistaVentasAnuladas().subscribe((data:any) =>{
    console.log(data);
    this.servicio.ListaVentas = data.data.ventas;
    this.servicio.anular =true;
  })
}

abrirDetalles(venta : venta){
 this.servicio.ventaActual = venta;
 
 setTimeout(() => {
  this.cargarDetalles();
 }, 100);
}

ventasPorFechas(){
  if(this.fechas.desde== null || this.fechas.hasta ==null ) {
   this.toastr.warning("debe ingresar ambas fechas para filtrar");
   return
  }
console.log(this.fechas , "fechas");

this.servicio.getlistaVentasPorFechas(this.fechas).subscribe((data:any)=>{
  this.servicio.ListaVentas = data.data.ventas;
  console.log(data);
});
}

}
