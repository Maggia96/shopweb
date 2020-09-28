import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { talle } from '../interface/talle';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal-talle',
  templateUrl: './modal-talle.component.html',
  styleUrls: ['./modal-talle.component.scss']
})
export class ModalTalleComponent implements OnInit {
  eliminartalle:boolean;
  talleParaEliminar : talle = new talle();
  constructor(public servicio:ServiciosService, public toastr: ToastrService,) {
    this.eliminartalle = false;
   }

  ngOnInit(): void {
  }

agregar(){
  if(this.servicio.talle.talle == "")return;

  this.servicio.postTalle(this.servicio.talle).subscribe((data:any) => 
  {
    if(data.data.success){ 
      this.toastr.success(data.data.mensaje);
      this.cargarTalles();
    }
    else{
      this.toastr.error(data.data.mensaje);
      this.cargarTalles();
    }
   
 
  })

  
}

cargarTalles(){
  this.servicio.getTalles().subscribe((data:any) =>{
    this.servicio.talleslista = data.data.talles;
   this.cancelar();
  })
}

eliminar(talles : talle){
 this.talleParaEliminar = talles;
 this.eliminartalle = true;
}
cancelar(){
  this.eliminartalle = false;
}

eliminarConfirmado(){
  this.servicio.eliminartalle(this.talleParaEliminar).subscribe((data:any)=> {
    if(data.data.success){ 
      this.toastr.success(data.data.mensaje);
      this.cargarTalles();
    }
    else{
      this.toastr.error(data.data.mensaje);
      this.cargarTalles();
    }
   })

}

}
