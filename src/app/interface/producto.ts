export class producto{
    id:number;
    nombre:string;
    precioCompra:number;
    porcentaje:number;
    precioVenta:number;
    sexo:string;
    eliminado:boolean;
    imagen:string;

    constructor(){
       this.nombre = "";
       this.porcentaje = 0;
       this.precioCompra = 0;
       this.precioVenta = 0;
       this.sexo = "";
       this.eliminado = false;
       this.imagen="avatar.jpg";
       this.id = null;
    }
}