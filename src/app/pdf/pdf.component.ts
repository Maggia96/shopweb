import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ServiciosService } from '../servicios.service';
import { producto } from '../interface/producto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnInit {

@ViewChild('content') content : ElementRef;
productos:[];
sexo: string;
PrecioBox:boolean;
  constructor(public servicio : ServiciosService , public toastr : ToastrService) {
    this.sexo = "";
    this.servicio.talleSeleccionado = null;
    this.PrecioBox = true;
   }
 


  ngOnInit(): void {
    this.iniciar();
  }

  iniciar(){
    this.servicio.filtroTalleSexo(this.servicio.talleSeleccionado , this.sexo).subscribe((data:any)=>{ this.productos = data.data.productos;
     console.log(data , "hola");
   });
   
   }
 
  


   

  CrearPDF()
  {
    var doc = new jsPDF();

    var content = document.getElementById('content')
  
    html2canvas(content).then(canvas => {
  
      doc.addImage(canvas.toDataURL("image/png"), 'PNG', 5, 5, 200, content.offsetWidth);
      
      doc.save(`MYPdf.pdf`);
  
    });
  }

  
  cargarTalles(){
    this.servicio.getTalles().subscribe((data:any) =>{
      this.servicio.talleslista = data.data.talles;
 
    })
  }

  buscar(){
    console.log(this.sexo , this.servicio.talleSeleccionado);
    if(this.sexo == ""){
      this.servicio.filtroTalle(this.servicio.talleSeleccionado ).subscribe((data:any)=>{ this.productos = data.data.productos;
        if(!data.data.success){
          this.toastr.warning(data.data.mensaje);
        }
       });
        return
    }
    if(this.servicio.talleSeleccionado == null){
      this.servicio.filtrosexo(this.sexo).subscribe((data:any)=>{ this.productos = data.data.productos;
        if(!data.data.success){
          this.toastr.warning(data.data.mensaje);
        }
       });
          return
    }
    
    this.servicio.filtroTalleSexo(this.servicio.talleSeleccionado , this.sexo).subscribe((data:any)=>{ this.productos = data.data.productos;
     if(!data.data.success){
       this.toastr.warning(data.data.mensaje);
     }
    });
  }


  getPDF(){
    var content = document.getElementById('content')
		var HTML_Width =  document.getElementById('content').offsetWidth;
		var HTML_Height = document.getElementById('content').offsetHeight;
		var top_left_margin = 15;
		var PDF_Width = HTML_Width+(top_left_margin*2);
		var PDF_Height = (PDF_Width*1.5)+(top_left_margin*2);
		var canvas_image_width = HTML_Width;
		var canvas_image_height = HTML_Height;
		
		var totalPDFPages = Math.ceil(HTML_Height/PDF_Height)-1;
		

		html2canvas(content,{allowTaint:true}).then(function(canvas) {
			canvas.getContext('2d');
			
			console.log(canvas.height+"  "+canvas.width);
			
			
			var imgData = canvas.toDataURL("image/jpeg", 1.0);
			var pdf = new jsPDF('p', 'pt',  [PDF_Width, PDF_Height]);
		    pdf.addImage(imgData, 'JPG', top_left_margin, top_left_margin,canvas_image_width,canvas_image_height);
			
			
			for (var i = 1; i <= totalPDFPages; i++) { 
				pdf.addPage(PDF_Width.toString() , "p");
				pdf.addImage(imgData, 'JPG', top_left_margin, -(PDF_Height*i)+(top_left_margin*4),canvas_image_width,canvas_image_height);
			}
			
		    pdf.save("HTML-Document.pdf");
        });
	};


  test(){
    this.servicio.filtrotodo().subscribe((data:any)=>{ this.productos = data.data.productos;
      if(!data.data.success){
        this.toastr.warning(data.data.mensaje);
      }
     });
  }

box(){
  this.PrecioBox = !this.PrecioBox;
}

}
