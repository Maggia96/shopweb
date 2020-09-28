export class compra{

id : number;
proveedor: string;
total:number;
cancelado:boolean;
fecha : Date; 
descripcion: string;
tipo:string;

constructor(){
    this.proveedor = "";
    this.total = 0;
    this.fecha = null;
    this.descripcion = "actualizar.png";
    this.cancelado = false;
    this.tipo = "";
}
}