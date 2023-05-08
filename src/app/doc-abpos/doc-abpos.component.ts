import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';
import { IAbPos } from '../IAbPos';
import { IFiltrosAbpos } from '../IFiltrosAbpos';

@Component({
  selector: 'app-doc-abpos',
  templateUrl: './doc-abpos.component.html',
  styleUrls: ['./doc-abpos.component.css'],
})
export class DocAbposComponent implements OnInit {
  _loading: boolean = false;
  _sinInfo: boolean = false;
  _List: IAbPos[] = [];
  _Filtros!: IFiltrosAbpos;

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

  btnFiltros() {
    this.setFiltros();
    sessionStorage.setItem('Filtros', JSON.stringify(this._Filtros));
    sessionStorage.removeItem('busResp');
    this._router.navigate(['/FiltrosAbPos']);
  }

  getListado() {
    if (sessionStorage.getItem('Filtros'))
      this._Filtros = JSON.parse(sessionStorage.getItem('Filtros')!);
    else this.setFiltros();

    this._loading = true;
    this._servicios.wsGeneral('abpos/getListFilter', this._Filtros).subscribe(
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
    this._router.navigate(['/docAbPosDet']);
  }

  btnEditar(item: IAbPos) {
    sessionStorage.setItem('_listado', JSON.stringify(this._List));
    sessionStorage.setItem('Item', JSON.stringify(item));
    this._router.navigate(['/docAbPosDet']);
  }

  setFiltros() {
    this._Filtros = {
      fecha: this._fechaActual,
      idObra: '0',
      idSupervisor: '0',
      idOperador: '0',
      buscar: '',
      mes: this._fechaActual.getMonth() + 1,
      anno: this._fechaActual.getFullYear(),
      dia: 0,
      idObraTXT: '',
      idSupervisorTXT: '',
      idOperadorTXT: '',
      pantalla: 'docAbPos',
    };
  }
}
