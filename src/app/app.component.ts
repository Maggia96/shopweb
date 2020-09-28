import { Component , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from './servicios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ShopWeb';
constructor(public root:Router , public servicio : ServiciosService ){

}

ngOnInit(): void {
    
  
    this.root.navigate(["/login"]);
   
  
 }


 cargarTalles(){
  this.servicio.getTalles().subscribe((data:any) =>{
    this.servicio.talleslista = data.data.talles;

  })
}

cerrar(){
  this.servicio.loguedo = false;
  localStorage.removeItem("acceso");
  this.root.navigate(["/login"]);
}
}
