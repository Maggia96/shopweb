import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductosComponent } from './productos/productos.component';
import { VentasComponent } from './ventas/ventas.component';
import { ComprasComponent } from './compras/compras.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { PdfComponent } from './pdf/pdf.component';


const routes: Routes = [
  {path: "login"   , component :LoginComponent},
  {path: "home"   , component :HomeComponent},
  {path: "productos" , component :ProductosComponent},
  {path: "ventas" , component : VentasComponent},
  {path: "compras" , component : ComprasComponent},
  {path : "estadisticas" ,component : EstadisticasComponent},
  {path : "pdf" , component : PdfComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
