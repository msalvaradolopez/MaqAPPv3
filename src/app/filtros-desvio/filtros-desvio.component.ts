import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiciosService } from '../servicios.service';
import { srvUtileriasService } from '../srvUtilerias.service';
import { ToastrService } from 'ngx-toastr';
import { IbusResp } from '../IBusResp';
import { IFiltrosDesvio } from '../IFiltrosDesvio';

@Component({
  selector: 'app-filtros-desvio',
  templateUrl: './filtros-desvio.component.html',
  styleUrls: ['./filtros-desvio.component.css'],
})
export class FiltrosDesvioComponent implements OnInit {
  _fechaAlta: Date = new Date();
  _filtros: IFiltrosDesvio = {
    fecha: this._fechaAlta,
    idObra: '',
    idSupervisor: '',
    idOperador: '0',
    buscar: '',
    mes: this._fechaAlta.getMonth() + 1,
    anno: this._fechaAlta.getFullYear(),
    dia: 0,
    idObraTXT: '',
    idSupervisorTXT: '',
    idOperadorTXT: '',
    pantalla: '',
  };

  _BusResp: IbusResp = {
    ventana: 'FiltrosDesvio',
    buscarPor: '',
    clave: '',
    claveTxt: '',
    nombre: '',
  };

  _fecha: string = '';

  _ListAnnos: number[] = [];
  _ListMeses: any[] = [];
  _ListDias: number[] = [];

  constructor(
    private _servicios: ServiciosService,
    private _router: Router,
    private _toastr: ToastrService,
    private _svrUtilierias: srvUtileriasService
  ) {}

  ngOnInit(): void {
    this._ListAnnos = this._svrUtilierias.getListAnnos();
    this._ListMeses = this._svrUtilierias.getListMeses();
    this._ListDias = this._svrUtilierias.getListDias(
      this._filtros.anno,
      this._filtros.mes
    );

    this._fecha = this._svrUtilierias.convertDateToString(new Date());

    if (sessionStorage.getItem('Filtros')) {
      this._filtros = JSON.parse(sessionStorage.getItem('Filtros')!);
      var fechaAux = new Date(this._filtros.fecha);
      this._fecha = this._svrUtilierias.convertDateToString(fechaAux);
    } else {
      // this._filtros.fecha = this._fecha;
      this._filtros.fecha = this._svrUtilierias.convertStringToDate(
        this._fecha
      );
    }

    if (sessionStorage.getItem('busResp')) {
      this._BusResp = JSON.parse(sessionStorage.getItem('busResp')!);

      if (this._BusResp.buscarPor == 'Obras')
        this._filtros.idObraTXT = this._BusResp.claveTxt;

      if (this._BusResp.buscarPor == 'Supervisores')
        this._filtros.idSupervisorTXT = this._BusResp.claveTxt;

      if (this._BusResp.buscarPor == 'Operadores')
        this._filtros.idOperadorTXT = this._BusResp.claveTxt;
    }
  }

  btnGuardar() {
    // OBTENER ID DEL TEXTO INPUT
    if (this._filtros.idSupervisorTXT) {
      let valorTxt: string = this._filtros.idSupervisorTXT;
      let valorArreglo = valorTxt.split('|');
      this._filtros.idSupervisor = valorArreglo[0].trim();
    }

    if (this._filtros.idOperadorTXT) {
      let valorTxt: string = this._filtros.idOperadorTXT;
      let valorArreglo = valorTxt.split('|');
      this._filtros.idOperador = valorArreglo[0].trim();
    }

    if (this._filtros.idObraTXT) {
      let valorTxt: string = this._filtros.idObraTXT;
      let valorArreglo = valorTxt.split('|');
      this._filtros.idObra = valorArreglo[0].trim();
    }

    sessionStorage.removeItem('List');
    sessionStorage.setItem('Filtros', JSON.stringify(this._filtros));
    this.btnRegresar();
  }

  buscarSupervisor() {
    sessionStorage.setItem('Filtros', JSON.stringify(this._filtros));
    sessionStorage.setItem('busResp', JSON.stringify(this._BusResp));
    this._router.navigate(['/busSupervisores']);
  }

  buscarOperador() {
    sessionStorage.setItem('Filtros', JSON.stringify(this._filtros));
    sessionStorage.setItem('busResp', JSON.stringify(this._BusResp));
    this._router.navigate(['/busOperadores']);
  }

  buscarEquipo() {
    sessionStorage.setItem('Filtros', JSON.stringify(this._filtros));
    sessionStorage.setItem('busResp', JSON.stringify(this._BusResp));
    this._router.navigate(['/busEquipos']);
  }

  btnRegresar() {
    this._router.navigate(['/' + this._filtros.pantalla]);
  }
}
