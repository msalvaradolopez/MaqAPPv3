import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';

import { ToastrService } from 'ngx-toastr';
import { IInsPec } from '../IInsPec';
import { IbusResp } from '../IBusResp';
import { srvUtileriasService } from '../srvUtilerias.service';
declare var $: any;

@Component({
  selector: 'app-doc-ins-pec-det',
  templateUrl: './doc-ins-pec-det.component.html',
  styleUrls: ['./doc-ins-pec-det.component.css'],
})
export class DocInsPecDetComponent implements OnInit, AfterViewInit {
  _frenos: boolean = true;
  _alarma_rev: boolean = true;
  _nivel_aceite: boolean = true;
  _motor: boolean = true;
  _transmision: boolean = true;
  _fugas_aceite: boolean = true;
  _nivel_agua: boolean = true;
  _extinguidor: boolean = true;
  _luces: boolean = true;
  _torreta: boolean = true;
  _neumaticos: boolean = true;
  _pernos_bujes: boolean = true;
  _direccion: boolean = true;
  _espejos_retrovisores: boolean = true;
  _claxon: boolean = true;
  _cinturon_seguridad: boolean = true;

  _Item!: IInsPec;
  _accion: string = 'E';

  _BusResp: IbusResp = {
    ventana: 'docInsPecDet',
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
      this._accion = this._Item.docInspeccion == null ? 'N' : 'E';
      var fechaAux = new Date(this._Item.fecha);
      this._fecha = this._svrUtilierias.convertDateToString(fechaAux);

      if (this._Item.idSupervisor != '0')
        this._Item.nomSupervisor =
          this._Item.idSupervisor + ' | ' + this._Item.nomSupervisor;

      if (this._Item.idEconomico != '0')
        this._Item.nomEquipo =
          this._Item.idEconomico + ' | ' + this._Item.nomEquipo;

      if (this._Item.idOperador != '0')
        this._Item.nomOperador =
          this._Item.idOperador + ' | ' + this._Item.nomOperador;

      if (this._Item.idResponsableMtto != '0')
        this._Item.nomResponsableMtto =
          this._Item.idResponsableMtto + ' | ' + this._Item.nomResponsableMtto;
    } else {
      this._accion = 'N';
      this.setItem();
      this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);
    }

    if (sessionStorage.getItem('busResp')) {
      this._BusResp = JSON.parse(sessionStorage.getItem('busResp')!);

      if (this._BusResp.buscarPor == 'Supervisores') {
        this._Item.idSupervisor = this._BusResp.clave;
        this._Item.nomSupervisor = this._BusResp.claveTxt;
      }

      if (this._BusResp.buscarPor == 'Operadores') {
        this._Item.idOperador = this._BusResp.clave;
        this._Item.nomOperador = this._BusResp.claveTxt;
      }

      if (this._BusResp.buscarPor == 'Equipos') {
        this._Item.idEconomico = this._BusResp.clave;
        this._Item.nomEquipo = this._BusResp.claveTxt;
      }

      if (this._BusResp.buscarPor == 'Mantenimiento') {
        this._Item.idResponsableMtto = this._BusResp.clave;
        this._Item.nomResponsableMtto = this._BusResp.claveTxt;
      }
    }

    this._accionTxt = this._accion == 'E' ? 'Editando' : 'Nuevo';
  }

  btnRegresar() {
    sessionStorage.removeItem('busResp');
    sessionStorage.removeItem('Listado');
    this._router.navigate(['/docInsPec']);
  }

  btnGuardar() {
    this._fecha = $('#datepicker').val();
    this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);
  }

  buscarSupervisor() {
    this._fecha = $('#datepicker').val();
    this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);

    sessionStorage.setItem('Item', JSON.stringify(this._Item));
    sessionStorage.setItem('busResp', JSON.stringify(this._BusResp));
    this._router.navigate(['/busSupervisores']);
  }

  buscarOperador() {
    this._fecha = $('#datepicker').val();
    this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);

    sessionStorage.setItem('Item', JSON.stringify(this._Item));
    sessionStorage.setItem('busResp', JSON.stringify(this._BusResp));
    this._router.navigate(['/busOperadores']);
  }

  buscarEquipo() {
    this._fecha = $('#datepicker').val();
    this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);

    sessionStorage.setItem('Item', JSON.stringify(this._Item));
    sessionStorage.setItem('busResp', JSON.stringify(this._BusResp));
    this._router.navigate(['/busEquipos']);
  }

  buscarMantenimiento() {
    this._fecha = $('#datepicker').val();
    this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);

    sessionStorage.setItem('Item', JSON.stringify(this._Item));
    sessionStorage.setItem('busResp', JSON.stringify(this._BusResp));
    this._router.navigate(['/busMantenimiento']);
  }

  ngAfterViewInit(): void {
    $.datepicker.regional['es'] = {
      closeText: 'Cerrar',
      prevText: '<Ant',
      nextText: 'Sig>',
      currentText: 'Hoy',
      monthNames: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre',
      ],
      monthNamesShort: [
        'Ene',
        'Feb',
        'Mar',
        'Abr',
        'May',
        'Jun',
        'Jul',
        'Ago',
        'Sep',
        'Oct',
        'Nov',
        'Dic',
      ],
      dayNames: [
        'Domingo',
        'Lunes',
        'Martes',
        'Miércoles',
        'Jueves',
        'Viernes',
        'Sábado',
      ],
      dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
      dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
      weekHeader: 'Sm',
      dateFormat: 'dd/mm/yy',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: '',
    };

    $.datepicker.setDefaults($.datepicker.regional['es']);

    $('#datepicker').datepicker({ dateFormat: 'dd/mm/yy' });
  }

  setItem() {
    this._Item = {
      idInspeccion: 0,
      docInspeccion: 0,
      fecha: this._fechaActual,
      idSupervisor: '0',
      idEconomico: '0',
      idOperador: '0',
      turno: 'M',
      horometro: 0,
      idResponsableMtto: '0',
      frenos: 'O',
      frenos_obs: '',
      alarma_rev: 'O',
      alarma_rev_obs: '',
      nivel_aceite: 'O',
      nivel_aceite_obs: '',
      motor: 'O',
      motor_obs: '',
      transmision: 'O',
      transmision_obs: '',
      fugas_aceite: 'O',
      fugas_aceite_obs: '',
      nivel_agua: 'O',
      nivel_agua_obs: '',
      extinguidor: 'O',
      extinguidor_obs: '',
      luces: 'O',
      luces_obs: '',
      torreta: 'O',
      torreta_obs: '',
      neumaticos: 'O',
      neumaticos_obs: '',
      pernos_bujes: 'O',
      pernos_bujes_obs: '',
      direccion: 'O',
      direccion_obs: '',
      espejos_retrovisores: 'O',
      espejos_retrovisores_obs: '',
      claxon: 'O',
      claxon_obs: '',
      cinturon_seguridad: 'O',
      cinturon_seguridad_obs: '',

      nomSupervisor: '',
      nomOperador: '',
      nomEquipo: '',
      nomResponsableMtto: '',
    };
  }
}
