import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import{talle } from '../interface/talle';
import { stockTalle } from '../interface/stockTalle';
import { Toast, ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-modal-stock',
  templateUrl: './modal-stock.component.html',
  styleUrls: ['./modal-stock.component.scss']
})
export class ModalStockComponent implements OnInit {
 
  @Output()
  reload = new EventEmitter();
  talles:stockTalle;
  cantidad : number;
  cantidad2:number;
  constructor(public servicio:ServiciosService, public toastr : ToastrService
    ) {
      this.cantidad = 0;
      this.cantidad2 = 0;
      this.talles= new stockTalle();
     }

  ngOnInit(): void {
    //this.cargarTalles();
  }
  salir(){
    this.reload.emit();
  }
  cargarTalles(){
    this.servicio.getTallesStock().subscribe((data:any) =>{
      
     
      console.log(data);
    })
  }
   
  actualizarStock(idTalle :number){
    this.talles.idProducto = this.servicio.ProductoSeleccionado.id;
    this.talles.idTalle = idTalle;
    this.talles.stock = this.cantidad;
    this.servicio.actualizarTalle(this.talles).subscribe((data:any)=>{
      console.log(data);
    })
    this.cantidad = 0;
    setTimeout(() => {
      this.servicio.getTallesStock().subscribe((data:any)=> {
        this.servicio.talles = data.data.productos;
        console.log(this.servicio.talles);
      });
    }, 500);
   
    
  };

  generarTalleNuevo(){
    if(this.servicio.talleSeleccionado == null){
      this.toastr.error("debe elegir un talle");
      return;
    }
    this.servicio.talleNuevo.idTalle = this.servicio.talleSeleccionado;
    this.servicio.talleNuevo.idProducto = this.servicio.ProductoSeleccionado.id;
    this.servicio.talleNuevo.stock = this.cantidad2;
     this.servicio.nuevoTalleStock().subscribe((data:any) => {
       console.log(data);
     })
     setTimeout(() => {
      this.servicio.getTallesStock().subscribe((data:any)=> {
        this.servicio.talles = data.data.productos;
        console.log(this.servicio.talles);
      });
    }, 500);
    
    }

}
