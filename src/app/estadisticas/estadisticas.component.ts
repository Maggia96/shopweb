import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';
import { estaRopa } from '../interface/estadisticas_ropa';
import { gastos } from '../interface/gastos';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
})
export class EstadisticasComponent implements OnInit {
  anio: number;

  estadisticasRopa: estaRopa[];

  pieChartColor: any = [
    {
      backgroundColor: [
        '#FF77C3',
        '#fd7e14',
        'rgba(30, 169, 224, 0.8)',
        '#28a745',
        '#943EC1',
        '#FFFF89',
      ],
    },
  ];

  public pieChartLabels = ['Efectivo', 'Ropa', 'gastos'];
  public pieChartData = [];
  public pieChartType = 'pie';

  public pieChartLabels2 = ['Ropa', 'Otros'];
  public pieChartData2 = [];

  public pieChartLabels3 = [];
  public pieChartData3 = [];

  public pieChartLabels4 = [];
  public pieChartData4 = [];

  public pieChartLabels5 = [];
  public pieChartData5 = [];

  totalEfectivo: number;
  PlataEnRopa: number;
  efectivoAganar: number;
  total: number;
  Gastos: gastos = new gastos();
  GastoFinal: number;
  gastoRopa: number;
  gastosOtros: number;
  constructor(
    public servicios: ServiciosService,
    public toastr: ToastrService
  ) {
    this.PlataEnRopa = 0;
    this.efectivoAganar = 0;
    this.total = 0;
    this.totalEfectivo = 0;
    this.anio = 2020;
  }

  ngOnInit(): void {
    this.getEstadisticasDeRopa();
    this.getGastos();
    this.getEfectivo();
    this.asignarGraficaGastos();
    this.getEstadisticasVentasXmes();
    this.getEstadisticasGananciasXmes();
    this.getEstadisticasTalles();
  }

  getEstadisticasDeRopa() {
    this.servicios.getEstadisticasRopa().subscribe((data: any) => {
      this.estadisticasRopa = data.data.esta;

      if (!data.data.success) {
        this.toastr.warning(data.data.mensaje);
      } else {
        for (let index = 0; index < this.estadisticasRopa.length; index++) {
          this.PlataEnRopa += Number(this.estadisticasRopa[index].capitalRopa);
          this.efectivoAganar += Number(this.estadisticasRopa[index].ganancia);
        }
        setTimeout(() => {
          this.asignarValores();
        }, 200);
      }
    });
  }

  asignarValores() {
    this.totalEfectivo[0].Total -= Number(this.Gastos[0].Total);

    this.pieChartLabels = ['Ropa', 'Efectivo'];
    this.pieChartData = [
      this.PlataEnRopa,
      this.totalEfectivo[0].Total,
     
    ];
    this.total = this.PlataEnRopa + this.efectivoAganar;
    console.log(this.pieChartData);
  }

  

  getGastos() {
    this.servicios.getEstadisticasGastos().subscribe((data: any) => {
      this.Gastos = data.data.gastos;
      console.log(this.Gastos[0].Total);
    });
  }

  getEfectivo() {
    this.servicios.getEstadisticasEfectivo().subscribe((data: any) => {
      this.totalEfectivo = data.data.ventas;
      console.log(this.totalEfectivo[0].Total);
    });
  }

  getGastosRopa() {
    this.servicios
      .getEstadisticasGastosRopa(this.anio)
      .subscribe((data: any) => {
        this.gastoRopa = data.data.gastos[0].Total;
      });
  }

  getGastosotros() {
    this.servicios
      .getEstadisticasGastosOtros(this.anio)
      .subscribe((data: any) => {
        this.gastosOtros = data.data.gastos[0].Total;
      });
  }

  asignarGraficaGastos() {
    this.getGastosRopa();
    this.getGastosotros();
    setTimeout(() => {
      this.pieChartData2 = [this.gastoRopa, this.gastosOtros];
    }, 200);
  }

  getEstadisticasVentasXmes() {
    this.pieChartData3 = [];
    this.pieChartLabels3 = [];
    this.servicios
      .getEstadisticasVentasXmes(this.anio)
      .subscribe((data: any) => {
        console.log(data.data.ventas.total, 'dsafdsfdsfdga');
        for (let index = 0; index < data.data.ventas.length; index++) {
          this.pieChartData3[index] = data.data.ventas[index].Total;
        }

        for (let index = 0; index < data.data.ventas.length; index++) {
          if (data.data.ventas[index].mes == 1) {
            this.pieChartLabels3[index] = 'En';
          }
          if (data.data.ventas[index].mes == 2) {
            this.pieChartLabels3[index] = 'Feb';
          }
          if (data.data.ventas[index].mes == 3) {
            this.pieChartLabels3[index] = 'Mar';
          }
          if (data.data.ventas[index].mes == 4) {
            this.pieChartLabels3[index] = 'Abril';
          }
          if (data.data.ventas[index].mes == 5) {
            this.pieChartLabels3[index] = 'May';
          }
          if (data.data.ventas[index].mes == 6) {
            this.pieChartLabels3[index] = 'Jun';
          }
          if (data.data.ventas[index].mes == 7) {
            this.pieChartLabels3[index] = 'Jul';
          }
          if (data.data.ventas[index].mes == 8) {
            this.pieChartLabels3[index] = 'Ago';
          }
          if (data.data.ventas[index].mes == 9) {
            this.pieChartLabels3[index] = 'Sep';
          }
          if (data.data.ventas[index].mes == 10) {
            this.pieChartLabels3[index] = 'Oct';
          }
          if (data.data.ventas[index].mes == 11) {
            this.pieChartLabels3[index] = 'Nov';
          }
          if (data.data.ventas[index].mes == 12) {
            this.pieChartLabels3[index] = 'Dic';
          }
        }
        console.log(this.pieChartData3, 'dfedsajfksajdefejfsdjf');
      });
  }

  getEstadisticasGananciasXmes() {
    this.pieChartData4 = [];
    this.pieChartLabels4 = [];
    this.servicios
      .getEstadisticasGananciasXmes(this.anio)
      .subscribe((data: any) => {
        console.log(data.data.ventas.total, 'dsafdsfdsfdga');
        for (let index = 0; index < data.data.ventas.length; index++) {
          this.pieChartData4[index] = data.data.ventas[index].Total;
        }

        for (let index = 0; index < data.data.ventas.length; index++) {
          if (data.data.ventas[index].mes == 1) {
            this.pieChartLabels4[index] = 'En';
          }
          if (data.data.ventas[index].mes == 2) {
            this.pieChartLabels4[index] = 'Feb';
          }
          if (data.data.ventas[index].mes == 3) {
            this.pieChartLabels4[index] = 'Mar';
          }
          if (data.data.ventas[index].mes == 4) {
            this.pieChartLabels4[index] = 'Abril';
          }
          if (data.data.ventas[index].mes == 5) {
            this.pieChartLabels4[index] = 'May';
          }
          if (data.data.ventas[index].mes == 6) {
            this.pieChartLabels4[index] = 'Jun';
          }
          if (data.data.ventas[index].mes == 7) {
            this.pieChartLabels4[index] = 'Jul';
          }
          if (data.data.ventas[index].mes == 8) {
            this.pieChartLabels4[index] = 'Ago';
          }
          if (data.data.ventas[index].mes == 9) {
            this.pieChartLabels4[index] = 'Sep';
          }
          if (data.data.ventas[index].mes == 10) {
            this.pieChartLabels4[index] = 'Oct';
          }
          if (data.data.ventas[index].mes == 11) {
            this.pieChartLabels4[index] = 'Nov';
          }
          if (data.data.ventas[index].mes == 12) {
            this.pieChartLabels4[index] = 'Dic';
          }
        }
        console.log(this.pieChartData3, 'dfedsajfksajdefejfsdjf');
      });
  }

  actualizar() {
    if (this.anio.toString().length == 4 && this.anio < 2100) {
      this.getEstadisticasVentasXmes();
      this.getEstadisticasGananciasXmes();
      this.getGastosRopa();
      this.getGastosotros();
      this.asignarGraficaGastos();
    } else {
      this.toastr.warning('Ingrese un año valido');
    }
  }

  onlyNumberKey(event) {
    return event.charCode == 8 || event.charCode == 0
      ? null
      : event.charCode >= 48 && event.charCode <= 57;
  }

  getEstadisticasTalles() {
    this.pieChartData5 = [];
    this.pieChartLabels5 = [];
    this.servicios
      .getEstadisticasTalles()
      .subscribe((data: any) => {
        console.log(data.data.talles.total, 'dsafdsfdsfdga');
        for (let index = 0; index < data.data.talles.length; index++) {
          this.pieChartData5[index] = data.data.talles[index].cantidad;
        }

        for (let index = 0; index < data.data.talles.length; index++) {
            this.pieChartLabels5[index] = data.data.talles[index].talle;
        }
        console.log(this.pieChartData5, 'dfedsajfksajdefejfsdjf');
      });
  }
}
