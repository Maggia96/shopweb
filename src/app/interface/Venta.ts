export class venta{

    id : number;
    fecha : Date;
    descuento: number;
    subTotal: number;
    total : number;
    cancelado :boolean;
    cliente : string;
    estado:boolean;
    precioCosto:number;
    constructor(){
     this.fecha = null;
     this.descuento = 0;    
      this.subTotal = 0;
     this.total = 0;
     this.cancelado = false;
     this.cliente = "";
     this.estado = false;
     this.precioCosto = 0;
    }

} 