import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';

import { ToastrService } from 'ngx-toastr';
import { IbusResp } from '../IBusResp';
import { srvUtileriasService } from '../srvUtilerias.service';
import { IAbPos } from '../IAbPos';
declare var $: any;

@Component({
  selector: 'app-doc-abposdet',
  templateUrl: './doc-abposdet.component.html',
  styleUrls: ['./doc-abposdet.component.css'],
})
export class DocAbposdetComponent implements OnInit, AfterViewInit {
  _loading: boolean = false;

  _casco: boolean = true;
  _lentes: boolean = true;
  _guantes: boolean = true;
  _uniforme: boolean = true;
  _zapatos: boolean = true;
  _uni_fajado: boolean = true;
  _tapones: boolean = true;
  _mascarilla: boolean = true;
  _careta: boolean = true;
  _arnes: boolean = true;
  _polainas: boolean = true;
  _peto: boolean = true;
  _gogles: boolean = true;
  _otros: boolean = false;

  _Item!: IAbPos;
  _accion: string = 'E';

  _BusResp: IbusResp = {
    ventana: 'docAbPosDet',
    buscarPor: '',
    clave: '',
    claveTxt: '',
    nombre: '',
  };

  _fechaActual: Date = new Date();
  _fecha: string = '';
  _accionTxt: string = '';

  constructor(
    private _servicios: ServiciosService,
    private _router: Router,
    private _toastr: ToastrService,
    private _svrUtilierias: srvUtileriasService
  ) {}

  ngOnInit(): void {
    this._fecha = this._svrUtilierias.convertDateToString(new Date());

    if (sessionStorage.getItem('Item')) {
      this._Item = JSON.parse(sessionStorage.getItem('Item')!);
      this._accion = this._Item.idAbordaje == 0 ? 'N' : 'E';
      var fechaAux = new Date(this._Item.fecha);
      this._fecha = this._svrUtilierias.convertDateToString(fechaAux);
    } else {
      this._accion = 'N';
      this.setItem();
      this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);
    }

    this._accionTxt = this._accion == 'E' ? 'Editando' : 'Nuevo';
  }

  btnRegresar() {
    sessionStorage.removeItem('busResp');
    sessionStorage.removeItem('_listado');
    this._router.navigate(['/docAbPos']);
  }

  btnFormato() {}
  btnEliminar() {}
  btnGuardar() {}

  setItem() {
    this._Item = {
      idAbordaje: 0,
      fecha: this._fechaActual,
      idSupervisor: '0',
      idObra: '0',
      idOperador: '0',
      riesgo: 'ALTO',
      desvio: 'EPP',
      casco: 'S',
      lentes: 'S',
      guantes: 'S',
      uniforme: 'S',
      zapatos: 'S',
      uni_fajado: 'S',
      tapones: 'S',
      mascarilla: 'S',
      careta: 'S',
      arnes: 'S',
      polainas: 'S',
      peto: 'S',
      gogles: 'S',
      otros: 'N',
      otro_descrip: '',
      act_inseguros: '',
      acc_correctiva: '',
      cond_inseguras: '',
      compromisos: '',
      nomSupervisor: '',
      nomOperador: '',
      nomObra: '',
    };

    this._casco = true;
    this._lentes = true;
    this._guantes = true;
    this._uniforme = true;
    this._zapatos = true;
    this._uni_fajado = true;
    this._tapones = true;
    this._mascarilla = true;
    this._careta = true;
    this._arnes = true;
    this._polainas = true;
    this._peto = true;
    this._gogles = true;
    this._otros = false;
  }

  ngAfterViewInit(): void {}
}
