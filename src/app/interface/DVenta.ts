export class DVentas {
   id : number;
   idVenta : number;
   idProducto : number;
   idTalle : number;
   precioUnitario:number;
   total : number;
   cantidad: number;
   alCosto:number;
 
   constructor(){
     
       this.idVenta = null;
       this.idProducto = null;
       this.idTalle = null;
       this.precioUnitario = 0;
       this.total = 0;
       this.cantidad = 0;
       this.alCosto = 0;
   }
}

