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
  _List: IInsPec[] = [];
  _Filtros!: IFiltrosInsPec;

  _fechaAlta: Date = new Date();

  constructor(
    private _servicios: ServiciosService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('List'))
      this._List = JSON.parse(sessionStorage.getItem('List')!);
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
      }
    );
  }

  btnAgregar() {}

  btnEditar(item: IInsPec) {}

  setFiltros() {
    this._Filtros = {
      idInspeccion: 0,
      docInspeccion: 0,
      fecha: this._fechaAlta,
      idSupervisor: '0',
      idEconomico: '0',
      idOperador: '0',
      idResponsableMtto: '0',
      turno: 'M',
      buscar: '',
      mes: this._fechaAlta.getMonth() + 1,
      anno: this._fechaAlta.getFullYear(),
      dia: 0,
    };
  }
}
