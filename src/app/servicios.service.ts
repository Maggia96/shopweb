import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import{usuario} from "src/app/interface/usuario";
import{producto} from "src/app/interface/producto";
import { talle } from './interface/talle';
import {stockTalle} from './interface/stockTalle';
import {venta} from './interface/Venta';
import {DVentas} from './interface/DVenta';
import {Detalles_web} from './interface/Detalles_web';
import {compra} from './interface/compra';
import {estaRopa} from './interface/estadisticas_ropa';

import { ToastrService } from 'ngx-toastr';
import { fechas } from './interface/fechas';
import { gastos } from './interface/gastos';

@Injectable({
  providedIn: 'root'
})
export class ServiciosService {
loguedo:boolean;
 preuab:usuario = new usuario();
nuevoProducto:boolean;
nuevaCompra:boolean;
eliminarProducto:boolean;
selectedfile : File;
talleSeleccionado:number;
talles : stockTalle[];
talleslista : talle[];
talleNuevo: stockTalle = new stockTalle();
talle : talle = new talle();
ventaActual : venta;
anular:boolean;
nuevoDetalleVenta : DVentas = new DVentas();
Detalles: Detalles_web[];
ListaVentas : venta[];
listaCompras : compra[];
compraseleccionada : compra = new compra();
hosting : string;

public ProductoSeleccionado:producto = new producto();
  constructor(private http: HttpClient ,public toastr: ToastrService) { 
    this.nuevoProducto = false;
    this.eliminarProducto = false;
    this.talleSeleccionado = null;
    this.ventaActual = new venta();
    this.nuevaCompra= false;
    this.anular = false;
    this.loguedo = false;
     this.hosting = "localhost"
  }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getUsuario(data:usuario){
    console.log(data , "2")
    return this.http.post<[usuario]>("https://shoptest0.000webhostapp.com/validarusuario.php" , {usuario:data});
   
  }
  getUsuario2(){
   
    return this.http.get<[usuario]>("https://shoptest0.000webhostapp.com/getusuario.php");
   
  }
  
  // producots //

  getProdPorNombre(buscar : string){

     return this.http.post<[Detalles_web[]]>("http://"+this.hosting+"/shopweb/api-Productos/getProductosPorNombre.php" , {data: buscar})
  }

  
  postProducto(producto:producto){
   
    return this.http.post<[producto]>("http://"+this.hosting+"/shopweb/api-Productos/postProducto.php" , {data:producto});
   }

   getproductos(){
      return this.http.get<[producto[]]>("http://"+this.hosting+"/shopweb/api-Productos/getProdutos.php")
   }
   putProductos(producto:producto){
     return this.http.put<[producto]>("http://"+this.hosting+"/shopweb/api-Productos/putProducto.php" , {data:producto})
   }
   deleteProductos(producto:producto){
    return this.http.put<[producto]>("http://"+this.hosting+"/shopweb/api-Productos/deleteProducto.php" , {data:producto})
   }

   getTalles(){
     return this.http.get<[talle]>("http://"+this.hosting+"/shopweb/api-Talles/getTalles.php");
   }

getTallesStock(){
  console.log(this.ProductoSeleccionado);
  return this.http.post<[producto]>("http://"+this.hosting+"/shopweb/api-Talles/getTallesStock.php" , {data:this.ProductoSeleccionado})
}
 actualizarTalle(talle:stockTalle){
  return this.http.put<[stockTalle]>("http://"+this.hosting+"/shopweb/api-Talles/actualizarStock.php" , {data:talle});
 }
nuevoTalleStock(){
  return this.http.post<[stockTalle]>("http://"+this.hosting+"/shopweb/api-Talles/postTalleStock.php" , {data:this.talleNuevo});
}
postTalle(talle:talle){
   
  return this.http.post<[talle]>("http://"+this.hosting+"/shopweb/api-Talles/postTalle.php" , {data:talle});
 }

eliminartalle(talle : talle){
  return this.http.put<[talle]>("http://"+this.hosting+"/shopweb/api-Talles/deleteTalle.php" , {data:talle});
}


//_____________________________________________________________________________________________________________________________________________//

get_CrearVenta(){
return this.http.get<[venta]>("http://"+this.hosting+"/shopweb/api-ventas/crearVenta.php");
}

getlistaVentas(){
  return this.http.get<[venta]>("http://"+this.hosting+"/shopweb/api-ventas/getVentas.php");
}

getlistaVentasPorFechas(fechas : fechas ){
  return this.http.post<[venta]>("http://"+this.hosting+"/shopweb/api-ventas/getVentasPorFecha.php" , { data : fechas});
}

getlistaVentasAnuladas(){
  return this.http.get<[venta]>("http://"+this.hosting+"/shopweb/api-ventas/getVentasAnuladas.php");
}

post_detalleVenta(){
 return this.http.post<[DVentas]>("http://"+this.hosting+"/shopweb/api-ventas/postDetalle.php" , {data:this.nuevoDetalleVenta});
}

EliminarDetalles_VentaActual( DWeb : Detalles_web){
  console.log(DWeb);

   return this.http.put<[Detalles_web[]]>("http://"+this.hosting+"/shopweb/api-ventas/eliminarDetalle.php" , {data: DWeb})
}

anularVenta(){
  return this.http.put<[venta]>("http://"+this.hosting+"/shopweb/api-ventas/anularVenta.php" , {data :this.ventaActual});
}

recuperarStock(stock : Detalles_web){
  return this.http.put<[Detalles_web]>("http://"+this.hosting+"/shopweb/api-ventas/reponerStock.php" , {data:stock});
}

getDetalles_VentaActual(){
  console.log(this.ventaActual);

   return this.http.post<[Detalles_web[]]>("http://"+this.hosting+"/shopweb/api-ventas/getDetalles.php" , {data: this.ventaActual.id})
}

finalizarVenta(){
  return this.http.put<[venta]>("http://"+this.hosting+"/shopweb/api-ventas/finalizarVenta.php" , {data:this.ventaActual});
}


postCompra(){
return this.http.post<[compra]>("http://"+this.hosting+"/shopweb/api-compras/postCompra.php" , {data:this.compraseleccionada});
}

getCompras(){
return this.http.get<[compra[]]>("http://"+this.hosting+"/shopweb/api-compras/getCompras.php")
}
getAnuladasCompras(){
  return this.http.get<[compra[]]>("http://"+this.hosting+"/shopweb/api-compras/getComprasAnuladas.php")
  }
deleteCompras(compra:compra){
return this.http.put<[compra]>("http://"+this.hosting+"/shopweb/api-compras/deleteCompra.php" , {data:compra});
}

//______________________________________________________________________________________________________________________________________________//
   onUpload(){
    const UploadData = new FormData();
    UploadData.append("myFile" , this.selectedfile , this.selectedfile.name);
    console.log(UploadData);
    this.http.post("http://"+this.hosting+"/shopweb/api-Productos/UploadImagen.php" , UploadData ).subscribe((data:any) => {
      if(data.data.success){
        this.toastr.success(data.data.mensaje);   
       console.log(true);
      }else{
        this.toastr.error(data.data.mensaje);
        console.log(false);
      }
    });
    }


    onUploadFactura(){
      const UploadData = new FormData();
      UploadData.append("myFile" , this.selectedfile , this.selectedfile.name);
      console.log(UploadData);
      this.http.post("http://"+this.hosting+"/shopweb/api-compras/uploadFactura.php" , UploadData ).subscribe((data:any) => {
        if(data.data.success){
          this.toastr.success(data.data.mensaje);   
         console.log(true);
        }else{
          this.toastr.error(data.data.mensaje);
          console.log(false);
        }
      });
      }
  
/////////////////////////////////////////////////////////////////////////////////////////////////////////


// estadisticas //


getEstadisticasRopa(){
  return this.http.get<[estaRopa[]]>("http://"+this.hosting+"/shopweb/api-estadisticas/estadisticasRopa.php");
}

getEstadisticasGastos(){
  return this.http.get<[gastos]>("http://"+this.hosting+"/shopweb/api-estadisticas/estadisticasGastos.php");
}
getEstadisticasGastosRopa(anio){
  return this.http.post<[gastos]>("http://"+this.hosting+"/shopweb/api-estadisticas/estadisticasGastosRopa.php" , {anio});
}
getEstadisticasGastosOtros(anio){
  return this.http.post<[gastos]>("http://"+this.hosting+"/shopweb/api-estadisticas/estadisticasGastosOtros.php" , {anio});
}
getEstadisticasEfectivo(){
  return this.http.get<[gastos]>("http://"+this.hosting+"/shopweb/api-estadisticas/estadisticasEfectivo.php");
}
getEstadisticasVentasXmes(anio){

  return this.http.post<[]>("http://"+this.hosting+"/shopweb/api-estadisticas/getEstadisiticasVentasPorMes.php" , {anio});
}
getEstadisticasGananciasXmes(anio){

  return this.http.post<[]>("http://"+this.hosting+"/shopweb/api-estadisticas/estadisticasGanancia.php" , {anio});
}
getEstadisticasTalles(){

  return this.http.get<[]>("http://"+this.hosting+"/shopweb/api-estadisticas/estadisticasTalles.php");
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

filtroTalleSexo(talle , sexo){
  return this.http.post<[]>("http://"+this.hosting+"/shopweb/api-pdf/filtoTalleSexo.php" , {talle , sexo});
}
filtroTalle(talle ){
  return this.http.post<[]>("http://"+this.hosting+"/shopweb/api-pdf/filtroTalle.php" , {talle});
}

filtrosexo(sexo ){
  return this.http.post<[]>("http://"+this.hosting+"/shopweb/api-pdf/filtrosexo.php" , {sexo});
}
filtrotodo( ){
  return this.http.get<[]>("http://"+this.hosting+"/shopweb/api-pdf/filtroTodo.php" );
}
}
