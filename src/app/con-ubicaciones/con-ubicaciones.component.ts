import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiciosService } from '../servicios.service';
import { srvUtileriasService } from '../srvUtilerias.service';
import { ToastrService } from 'ngx-toastr';
import { IFiltros } from '../Ifiltros';
import { IUbicacion } from '../IUbicacion';

@Component({
  selector: 'app-con-ubicaciones',
  templateUrl: './con-ubicaciones.component.html',
  styleUrls: ['./con-ubicaciones.component.css'],
})
export class ConUbicacionesComponent implements OnInit {
  _loading: boolean = false;
  _sinInfo: boolean = false;
  _fechaActual: Date = new Date();

  _List: IUbicacion[] = [];
  _fecha: string = '';
  _filtros: IFiltros = {
    idUbicacion: 0,
    idEconomico: '',
    idObra: '',
    idOperador: '',
    fecha_alta: this._fechaActual,
    buscar: '',
    fecha: '',
    estatus: 'A',
    idEconomicoTXT: '',
    idObraTXT: '',
    idOperadorTXT: '',
    idUsuario: '0',
    pantalla: 'conUbicaciones',
  };
  _subBuscar!: Subscription;

  constructor(
    private _servicios: ServiciosService,
    private _router: Router,
    private _toastr: ToastrService,
    private _svrUtilierias: srvUtileriasService
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('Filtros')) {
      this._filtros = JSON.parse(sessionStorage.getItem('Filtros')!);
      this._fecha = this._filtros.fecha;
      this._filtros.fecha_alta = this._svrUtilierias.convertStringToDate(
        this._fecha
      );
      sessionStorage.removeItem('_listado');
    } else this.reiniciaFiltros();

    if (sessionStorage.getItem('_listado'))
      this._List = JSON.parse(sessionStorage.getItem('_listado')!);
    else {
      this._filtros.fecha_alta = this._svrUtilierias.convertStringToDate(
        this._fecha
      );
      this._loading = true;
      this._servicios
        .wsGeneral('ubicaciones/getListFilter', this._filtros)
        .subscribe(
          (resp) => {
            this._List = resp;
          },
          (error) => {
            this._toastr.error(
              'Error : ' + error.error.ExceptionMessage,
              'Error al consultar ubicaciones.'
            );
            this._loading = false;
          },
          () => {
            this._List = this._List.map((x) => {
              x.idEconomicoTXT = x.idEconomico + ' | ' + x.equipoNom;
              x.idOperadorTXT = x.idOperador + ' | ' + x.operadorNom;
              x.idObraTXT = x.idObra + ' | ' + x.obraNom;
              return x;
            });
            this._loading = false;
            if (this._List == null || this._List.length == 0)
              this._sinInfo = true;
          }
        );
    }

    this._subBuscar = this._servicios.buscar$.subscribe((resp) => {
      this.listadoFiltrado(resp);
    });
  }

  btnFiltros() {
    this.reiniciaFiltros();
    sessionStorage.setItem('Filtros', JSON.stringify(this._filtros));
    sessionStorage.removeItem('busResp');
    this._router.navigate(['/filtros']);
  }

  listadoFiltrado(buscar: string) {
    this._filtros.fecha_alta = this._svrUtilierias.convertStringToDate(
      this._fecha
    );
    this._filtros.buscar = buscar;

    this._loading = true;
    this._servicios
      .wsGeneral('ubicaciones/getListFilter', this._filtros)
      .subscribe(
        (resp) => (this._List = resp),
        (error) => {
          this._loading = false;
          this._toastr.error(
            'Error : ' + error.error.ExceptionMessage,
            'Error al consultar ubicaciones.'
          );
        },
        () => {
          this._loading = false;
          if (this._List == null || this._List.length == 0)
            this._sinInfo = true;
        }
      );
  }

  btnExportar() {
    let formatoPDFbase64: string = '';
    this._loading = true;
    this._servicios.wsGeneral('ubicaciones/getXLSX', this._List).subscribe(
      (resp) => {
        formatoPDFbase64 = resp;
        //console.log(formatoPDFbase64);
      },
      (error) => {
        this._loading = false;
        this._toastr.error(
          'Error : ' + error.error.ExceptionMessage,
          'Generar PDF desvios.'
        );
      },
      () => {
        sessionStorage.setItem('_listado', JSON.stringify(this._List));
        this._loading = false;

        var base64str = formatoPDFbase64;

        // decode base64 string, remove space for IE compatibility
        var binary = atob(base64str.replace(/\s/g, ''));
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
          view[i] = binary.charCodeAt(i);
        }

        // create the blob object with content-type "application/pdf"
        var blob = new Blob([view], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });
        var url = URL.createObjectURL(blob);

        // window.open(url, '_blank');

        let link = document.createElement('a');
        link.download = 'Ubicaciones.xlsx';
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
      }
    );
  }

  ngOnDestroy(): void {
    this._subBuscar.unsubscribe();
  }

  reiniciaFiltros() {
    this._filtros = {
      idUbicacion: 0,
      idEconomico: '',
      idObra: '',
      idOperador: '',
      fecha_alta: this._fechaActual,
      buscar: '',
      fecha: '',
      estatus: 'A',
      idEconomicoTXT: '',
      idObraTXT: '',
      idOperadorTXT: '',
      idUsuario: '0',
      pantalla: 'conUbicaciones',
    };

    this._fecha = this._svrUtilierias.convertDateToString(new Date());
    this._filtros.fecha = this._fecha;
    this._filtros.fecha_alta = this._svrUtilierias.convertStringToDate(
      this._fecha
    );
    // this._filtros.idUsuario = sessionStorage.getItem("idUsuario");
  }
}
