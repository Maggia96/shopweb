export class Detalles_web {

detalleId : number;
productoId :number
talleId:number;
imagen:string;
nombre : string;
talle: string;
precioVenta :number;
cantidad:number;
Total:number;
alCosto:number;


constructor(){
    this.imagen = "";
    this.nombre = "";
    this.talle = "";
    this.precioVenta = 0;
    this.cantidad = 0;
    this.Total = 0;
    this.alCosto = 0;
}
}