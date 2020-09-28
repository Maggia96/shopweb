import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ServiciosService} from "src/app/servicios.service";
import { from } from 'rxjs';
import { usuario } from '../interface/usuario';
import { producto } from '../interface/producto';
import { ThemeService } from 'ng2-charts';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  a:producto = new producto(); 
  test:usuario;


  constructor(public root:Router , public servicio:ServiciosService , public tostr :ToastrService) { 
    this.test = new usuario();

  }

  ngOnInit(): void {
    
    if(localStorage.getItem("acceso")){
      this.root.navigate(["/home"]);
      this.servicio.loguedo = true;
     
    }
   }

acceder(){
if(this.test.password === "4322575belen." && this.test.user === "Belen"){
this.servicio.loguedo = true;
localStorage.setItem("acceso" , "si");
this.root.navigate(["/home"]);
}else{
  this.tostr.error("DEbe ingresar un usuario y contraseña valida ");
}


}

}
