import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';
import { IInsPec } from '../IInsPec';
import { IFiltrosInsPec } from '../IFiltrosInsPec';

@Component({
  selector: 'app-doc-ins-pec',
  templateUrl: './doc-ins-pec.component.html',
  styleUrls: ['./doc-ins-pec.component.css'],
})
export class DocInsPecComponent implements OnInit {
  _loading: boolean = false;
  _sinInfo: boolean = false;
  _List: IInsPec[] = [];
  _Filtros!: IFiltrosInsPec;

  _fechaActual: Date = new Date();

  constructor(
    private _servicios: ServiciosService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('_listado'))
      this._List = JSON.parse(sessionStorage.getItem('_listado')!);
    else this.getListado();
  }

  getListado() {
    if (sessionStorage.getItem('Filtros'))
      this._Filtros = JSON.parse(sessionStorage.getItem('Filtros')!);
    else this.setFiltros();

    this._loading = true;
    this._servicios.wsGeneral('inspec/getListFilter', this._Filtros).subscribe(
      (resp) => (this._List = resp),
      (error) => {
        this._loading = false;
        this._toastr.error(
          'Error : ' + error.error.ExceptionMessage,
          'Error al consultar.'
        );
      },
      () => {
        this._loading = false;
        if (this._List == null || this._List.length == 0) this._sinInfo = true;
      }
    );
  }

  btnAgregar() {
    sessionStorage.setItem('_listado', JSON.stringify(this._List));
    sessionStorage.removeItem('Item');
    this._router.navigate(['/docInsPecDet']);
  }

  btnEditar(item: IInsPec) {
    sessionStorage.setItem('_listado', JSON.stringify(this._List));
    sessionStorage.setItem('Item', JSON.stringify(item));
    this._router.navigate(['/docInsPecDet']);
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
      pantalla: 'docInsPec',
    };
  }
}
