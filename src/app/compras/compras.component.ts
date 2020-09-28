import { Component, OnInit } from '@angular/core';
import { fechas } from '../interface/fechas';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';
import { compra } from '../interface/compra';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss']
})
export class ComprasComponent implements OnInit {

  fechas:fechas = new fechas();
  constructor(public servicio : ServiciosService ,  public toastr : ToastrService) {
    
   }

  ngOnInit(): void {
    this.cargarCompras();
  }


  cargarCompras(){
  this.servicio.getCompras().subscribe((data:any)=>{
    if(data.data.success){
    this.servicio.listaCompras = data.data.compras;
    this.servicio.anular = false;
      }
    else{
      this.toastr.error(data.data.mensaje);
      this.servicio.anular = false;
    }
  });
  }

  cargarComprasAnuladas(){
    this.servicio.getAnuladasCompras().subscribe((data:any) =>{
      console.log(data);
      this.servicio.listaCompras = data.data.compras;
      this.servicio.anular =true;
    });
  }

  

  comprasPorFechas(){

  }

NuevaCompra(){
this.servicio.nuevaCompra = true;
this.servicio.compraseleccionada = new compra();

}

abrirDetalles(compra : compra){
  this.servicio.nuevaCompra = false;
  this.servicio.compraseleccionada = compra;
}

}
