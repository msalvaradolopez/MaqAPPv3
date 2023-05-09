import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IAbPos } from '../IAbPos';
import { IFiltrosAbpos } from '../IFiltrosAbpos';
import { ServiciosService } from '../servicios.service';
import { srvUtileriasService } from '../srvUtilerias.service';

@Component({
  selector: 'app-con-abpos',
  templateUrl: './con-abpos.component.html',
  styleUrls: ['./con-abpos.component.css'],
})
export class ConAbposComponent implements OnInit {
  _loading: boolean = false;
  _sinInfo: boolean = false;
  _fechaActual: Date = new Date();

  _List: IAbPos[] = [];
  _Filtros!: IFiltrosAbpos;

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
    this._servicios.wsGeneral('abpos/getListFilter', this._Filtros).subscribe(
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

  btnFiltros() {
    this.setFiltros();
    sessionStorage.setItem('Filtros', JSON.stringify(this._Filtros));
    sessionStorage.removeItem('busResp');
    this._router.navigate(['/FiltrosAbPos']);
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
      pantalla: 'conAbPos',
    };
  }
}
