import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from  '@angular/common/http';
import { ProductosComponent } from './productos/productos.component';
import { ModalProductoComponent } from './modal-producto/modal-producto.component';
import { ChartsModule } from 'ng2-charts';
import { ReactiveFormsModule} from '@angular/forms' 
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalStockComponent } from './modal-stock/modal-stock.component';
import { ModalTalleComponent } from './modal-talle/modal-talle.component';
import { VentasComponent } from './ventas/ventas.component';
import { ModalVentaComponent } from './modal-venta/modal-venta.component';
import { ComprasComponent } from './compras/compras.component';
import { ModalCompraComponent } from './modal-compra/modal-compra.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';
import { PdfComponent } from './pdf/pdf.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProductosComponent,
    ModalProductoComponent,
    ModalStockComponent,
    ModalTalleComponent,
    VentasComponent,
    ModalVentaComponent,
    ComprasComponent,
    ModalCompraComponent,
    EstadisticasComponent,
    PdfComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ChartsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
