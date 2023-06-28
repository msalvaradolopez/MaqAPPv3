import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IFiltrosInsPec } from '../IFiltrosInsPec';
import { IInsPec } from '../IInsPec';
import { ServiciosService } from '../servicios.service';
import { srvUtileriasService } from '../srvUtilerias.service';

@Component({
  selector: 'app-con-ins-pec',
  templateUrl: './con-ins-pec.component.html',
  styleUrls: ['./con-ins-pec.component.css'],
})
export class ConInsPecComponent implements OnInit {
  _loading: boolean = false;
  _sinInfo: boolean = false;
  _fechaActual: Date = new Date();

  _List: IInsPec[] = [];
  _Filtros!: IFiltrosInsPec;

  constructor(
    private _servicios: ServiciosService,
    private _router: Router,
    private _toastr: ToastrService,
    private _svrUtilierias: srvUtileriasService
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('Filtros'))
      this._Filtros = JSON.parse(sessionStorage.getItem('Filtros')!);
    else this.setFiltros();

    if (sessionStorage.getItem('_listado'))
      this._List = JSON.parse(sessionStorage.getItem('_listado')!);

    this.getList();
  }

  getList() {
    this._loading = true;
    this._servicios.wsGeneral('inspec/getListFilter', this._Filtros).subscribe(
      (resp) => {
        this._List = resp;
      },
      (error) => {
        this._toastr.error(
          'Error : ' + error.error.ExceptionMessage,
          'Error al consultar.'
        );
        this._loading = false;
      },
      () => {
        this._loading = false;
      }
    );
  }

  btnExportar() {
    let formatoPDFbase64: string = '';
    this._loading = true;
    this._servicios.wsGeneral('inspec/getXLSX', this._List).subscribe(
      (resp) => {
        formatoPDFbase64 = resp;
        //console.log(formatoPDFbase64);
      },
      (error) => {
        this._loading = false;
        this._toastr.error(
          'Error : ' + error.error.ExceptionMessage,
          'Generar XLSX Inspeccion.'
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
        link.download = 'Inspeccion.xlsx';
        link.href = URL.createObjectURL(blob);
        link.click();
        URL.revokeObjectURL(link.href);
      }
    );
  }

  btnFiltros() {
    this.setFiltros();
    sessionStorage.setItem('Filtros', JSON.stringify(this._Filtros));
    sessionStorage.removeItem('busResp');
    this._router.navigate(['/FiltrosInsPec']);
  }

  setFiltros() {
    this._Filtros = {
      idInspeccion: 0,
      docInspeccion: 0,
      fecha: this._fechaActual,
      idSupervisor: '0',
      idEconomico: '0',
      idOperador: '0',
      idResponsableMtto: '0',
      turno: 'M',
      buscar: '',
      mes: this._fechaActual.getMonth() + 1,
      anno: this._fechaActual.getFullYear(),
      dia: 0,
      idSupervisorTXT: '',
      idEconomicoTXT: '',
      idOperadorTXT: '',
      pantalla: 'conInsPec',
    };
  }
}
