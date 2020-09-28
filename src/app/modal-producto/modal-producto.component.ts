import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { producto } from '../interface/producto';
import { ToastrService } from 'ngx-toastr';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-modal-producto',
  templateUrl: './modal-producto.component.html',
  styleUrls: ['./modal-producto.component.scss']
})
export class ModalProductoComponent implements OnInit {

  @Output()
  reload = new EventEmitter();
  eliminarProducto:boolean;
  constructor(public root:Router ,
     public servicio:ServiciosService,
     public toastr: ToastrService,) { 
    this.eliminarProducto = false;
  }

  ngOnInit(): void {
   // this.servicio.ProductoSeleccionado = new producto();
  }

  salir(){
    this.reload.emit();
  }

   subirImagenClean(){}

  OnFileChanged(event){
     
    this.servicio.selectedfile = event.target.files[0];
    console.log(this.servicio.selectedfile)
    this.servicio.ProductoSeleccionado.imagen = this.servicio.selectedfile.name;
    
    }

    ValidarInput(){
      this.servicio.ProductoSeleccionado.nombre = this.servicio.ProductoSeleccionado.nombre.replace(/ +/g, ' ');
     
    }

    onlyNumberKey(event) {

      return event.charCode == 8 || event.charCode == 0 
        ? null
        : event.charCode >= 48 && event.charCode <= 57;
  
       
    }

    cancelar(){
      this.eliminarProducto = false;
    
    }

    mensajeEliminar(){
  
      this.eliminarProducto = true;
     
    }

    eliminar(){
      if(this.eliminarProducto){
        this.servicio.deleteProductos(this.servicio.ProductoSeleccionado).subscribe((data:any)=> {
          
          if(data.data.success){
             this.toastr.success(data.data.mensaje);
             this.reload.emit();
             this.eliminarProducto = false;
           }else{
             this.toastr.error(data.data.mensaje);
             this.reload.emit();
             this.eliminarProducto = false;
           }

        });

        }
      }

      guardar() {
        this.servicio.ProductoSeleccionado.sexo = this.servicio.ProductoSeleccionado.sexo.toUpperCase();
         
        if (!this.servicio.nuevoProducto) {
          this.editar()
          this.servicio.onUpload();
          return;
        }
        this.crear();
        this.servicio.onUpload();
     
      }
    
    
      editar() {
      //  this.loadingService.iniciarLoad();
        this.ValidarInput();
       /* if(!this.validarInputsGuardar())
        {
          
          return;
        }*/
         
        console.log(this.servicio.ProductoSeleccionado);
        this.servicio.putProductos(this.servicio.ProductoSeleccionado).subscribe(
          (res:any) => { 
            if(res.data.success){
              this.toastr.success(res.data.mensaje);
            }else{
              this.toastr.error(res.data.mensaje);
            }
            this.reload.emit();
        
           // this.loadingService.cancelarLoad();
    
          },
          err => {
           // this.loadingService.cancelarLoad();
            this.toastr.error("Ocurrio un error");
          });
      }
    
    
      crear() {
        
      //  this.loadingService.iniciarLoad();
        
        this.ValidarInput();
        if(!this.validarInputsGuardar())
        {
          return;
        }
        this.servicio.postProducto(this.servicio.ProductoSeleccionado).subscribe(
          (res:any) => {
           
    
            this.reload.emit();
            if(res.data.success){
             this.toastr.success(res.data.mensaje);
            }else{
             this.toastr.error(res.data.mensaje);
            }
            
            this.servicio.ProductoSeleccionado = new producto();
           // this.loadingService.cancelarLoad();
            
          },
          err => {
            this.toastr.error(err.message.mensaje);
           // this.loadingService.cancelarLoad();
            //this.toastr.error("Ocurrio un error");
          });
      }
      validarInputsGuardar(){
        if(this.servicio.ProductoSeleccionado.nombre.trim() == "")
        {
          this.toastr.error("debe ingresar un nombre");
          this.servicio.ProductoSeleccionado.nombre = "";
         //this.loadingService.cancelarLoad();
          return false;
        }
      
      
       else{
          return true;
        }
      }

      CalcularPorcentaje(){
        if(this.servicio.ProductoSeleccionado.precioCompra!= 0 && this.servicio.ProductoSeleccionado.precioVenta != 0){
          var pC =  this.servicio.ProductoSeleccionado.precioCompra ;
          var pV = this.servicio.ProductoSeleccionado.precioVenta;
          var dif = pV - pC;
          var resultado = ( dif / pC) * 100;
         
          this.servicio.ProductoSeleccionado.porcentaje = resultado;
        }
       
      }
    }

