import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';
import { compra } from '../interface/compra';

@Component({
  selector: 'app-modal-compra',
  templateUrl: './modal-compra.component.html',
  styleUrls: ['./modal-compra.component.scss']
})
export class ModalCompraComponent implements OnInit {
  mensajeeliminar:boolean;
  eliminarCompra:boolean;
  tipo :string;
  constructor(public root:Router ,
     public servicio:ServiciosService,
     public toastr: ToastrService,) { 
    this.eliminarCompra = false;
    this.tipo = "";
  }
  
  ngOnInit(): void {
  }

  salir(){

  }
  onlyNumberKey(event) {

    return event.charCode == 8 || event.charCode == 0 
      ? null
      : event.charCode >= 48 && event.charCode <= 57;

     
  }

  ValidarInput(){
    this.servicio.compraseleccionada.proveedor = this.servicio.compraseleccionada.proveedor.replace(/ +/g, ' ');
   
  }

  OnFileChanged(event){
     
    this.servicio.selectedfile = event.target.files[0];
    console.log(this.servicio.selectedfile)
    this.servicio.compraseleccionada.descripcion = this.servicio.selectedfile.name;
    
    }
    subirImagenClean(){}

    guardar() {
  

      if (!this.servicio.nuevaCompra) {
        this.editar()
        this.servicio.onUploadFactura();
        return;
      }
      this.crear();
      this.servicio.onUploadFactura();
   
    }
  
  
    editar() {
    //  this.loadingService.iniciarLoad();
      this.ValidarInput();
     /* if(!this.validarInputsGuardar())
      {
        
        return;
      }*/
       
    /*  console.log(this.servicio.compraseleccionada);
      this.servicio.deleteCompras().subscribe(
        (res:any) => { 
          if(res.data.success){
            this.toastr.success(res.data.mensaje);
          }else{
            this.toastr.error(res.data.mensaje);
          }
         // this.reload.emit();
      
         // this.loadingService.cancelarLoad();
  
        },
        err => {
         // this.loadingService.cancelarLoad();
          this.toastr.error("Ocurrio un error");
        });
   */ } 
  
  
    crear() {
      
    //  this.loadingService.iniciarLoad();
      
      this.ValidarInput();
      if(!this.validarInputsGuardar())
      {
        return;
      }
      if(this.servicio.compraseleccionada.tipo == ""){
          this.toastr.warning("debe seleccionar un tipo ");
          return  
      }
   
      console.log(this.servicio.compraseleccionada);
      this.servicio.postCompra().subscribe(
        (res:any) => {
         
         this.cargarCompras();
         // this.reload.emit();
          if(res.data.success){
           this.toastr.success(res.data.mensaje);
          }else{
           this.toastr.error(res.data.mensaje);
          }
          
          this.servicio.compraseleccionada = new compra();
         // this.loadingService.cancelarLoad();
          
        },
        err => {
          this.toastr.error(err.message.mensaje);
         // this.loadingService.cancelarLoad();
          //this.toastr.error("Ocurrio un error");
        });
    }

    validarInputsGuardar(){
      if(this.servicio.compraseleccionada.proveedor.trim() == "")
      {
        this.toastr.error("debe ingresar un Proveedor");
        this.servicio.compraseleccionada.proveedor = "";
       //this.loadingService.cancelarLoad();
        return false;
      }
    
    
     else{
        return true;
      }
    }


    cancelar(){
      this.eliminarCompra = false;
    
    }

    mensajeEliminar(){
  
      this.eliminarCompra = true;
     
    }
    eliminar(){
      if(this.eliminarCompra){
        this.servicio.deleteCompras(this.servicio.compraseleccionada).subscribe((data:any)=> {
          
          if(data.data.success){
             this.toastr.success(data.data.mensaje);
            // this.reload.emit();
            this.cargarCompras();
             this.eliminarCompra = false;
           }else{
             this.toastr.error(data.data.mensaje);
            //this.reload.emit();
            this.cargarCompras();
             this.eliminarCompra = false;
           }

        });

        }
      }
      cargarCompras(){
        this.servicio.getCompras().subscribe((data:any)=>{
          if(data.data.success){
          this.servicio.listaCompras = data.data.compras;
            }
          else{
            this.toastr.error(data.data.mensaje);
          }
        })
        }

   
}
