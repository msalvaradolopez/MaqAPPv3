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
  _loading: boolean = false;

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
      this._accion = this._Item.docInspeccion == 0 ? 'N' : 'E';
      var fechaAux = new Date(this._Item.fecha);
      this._fecha = this._svrUtilierias.convertDateToString(fechaAux);

      /*
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
      */

      this._frenos = this._Item.frenos == 'O' ? true : false;
      this._alarma_rev = this._Item.alarma_rev == 'O' ? true : false;
      this._nivel_aceite = this._Item.nivel_aceite == 'O' ? true : false;
      this._motor = this._Item.motor == 'O' ? true : false;
      this._transmision = this._Item.transmision == 'O' ? true : false;
      this._fugas_aceite = this._Item.fugas_aceite == 'O' ? true : false;
      this._nivel_agua = this._Item.nivel_agua == 'O' ? true : false;
      this._extinguidor = this._Item.extinguidor == 'O' ? true : false;
      this._luces = this._Item.luces == 'O' ? true : false;
      this._torreta = this._Item.torreta == 'O' ? true : false;
      this._neumaticos = this._Item.neumaticos == 'O' ? true : false;
      this._pernos_bujes = this._Item.pernos_bujes == 'O' ? true : false;
      this._direccion = this._Item.direccion == 'O' ? true : false;
      this._espejos_retrovisores =
        this._Item.espejos_retrovisores == 'O' ? true : false;
      this._claxon = this._Item.claxon == 'O' ? true : false;
      this._cinturon_seguridad =
        this._Item.cinturon_seguridad == 'O' ? true : false;
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
    sessionStorage.removeItem('_listado');
    this._router.navigate(['/docInsPec']);
  }

  btnGuardar() {
    // OBTENER ID DEL TEXTO INPUT
    if (this._Item.idSupervisor == '0') {
      this._toastr.error('Guardar.', 'Falta Supervisor');
      return;
    }

    if (this._Item.idEconomico == '0') {
      this._toastr.error('Guardar.', 'Falta Equipo');
      return;
    }

    if (this._Item.idOperador == '0') {
      this._toastr.error('Guardar.', 'Falta Operador');
      return;
    }

    if (this._Item.idResponsableMtto == '0') {
      this._toastr.error('Guardar.', 'Falta Responsable Mtto');
      return;
    }

    if (this._Item.horometro == 0) {
      this._toastr.error('Guardar.', 'Falta Horometro');
      return;
    }

    this._fecha = $('#datepicker').val();
    this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);

    this._Item.frenos = this._frenos ? 'O' : 'F';
    this._Item.alarma_rev = this._alarma_rev ? 'O' : 'F';
    this._Item.nivel_aceite = this._nivel_aceite ? 'O' : 'F';
    this._Item.motor = this._motor ? 'O' : 'F';
    this._Item.transmision = this._transmision ? 'O' : 'F';
    this._Item.fugas_aceite = this._fugas_aceite ? 'O' : 'F';
    this._Item.nivel_agua = this._nivel_agua ? 'O' : 'F';
    this._Item.extinguidor = this._extinguidor ? 'O' : 'F';
    this._Item.luces = this._luces ? 'O' : 'F';
    this._Item.torreta = this._torreta ? 'O' : 'F';
    this._Item.neumaticos = this._neumaticos ? 'O' : 'F';
    this._Item.pernos_bujes = this._pernos_bujes ? 'O' : 'F';
    this._Item.direccion = this._direccion ? 'O' : 'F';
    this._Item.espejos_retrovisores = this._espejos_retrovisores ? 'O' : 'F';
    this._Item.claxon = this._claxon ? 'O' : 'F';
    this._Item.cinturon_seguridad = this._cinturon_seguridad ? 'O' : 'F';

    let lAccionRecurso: string = 'inspec/insItem';

    if (this._accion == 'E') lAccionRecurso = 'inspec/updItem';

    this._servicios.wsGeneral(lAccionRecurso, this._Item).subscribe(
      (resp) => {},
      (error) =>
        this._toastr.error(
          'Error : ' + error.error.ExceptionMessage,
          'Guardar.'
        ),
      () => {
        this._toastr.success('Registro guardado.');
        sessionStorage.removeItem('List');
        if (this._accion == 'E') this.btnRegresar();
        else this.setItem();
      }
    );
  }

  btnFormato() {
    let formatoPDFbase64: string = '';
    this._loading = true;
    this._servicios.wsGeneral('inspec/getPDF', this._Item).subscribe(
      (resp) => {
        formatoPDFbase64 = resp;
        //console.log(formatoPDFbase64);
      },
      (error) => {
        this._loading = false;
        this._toastr.error(
          'Error : ' + error.error.ExceptionMessage,
          'Generar PDF bitacora.'
        );
      },
      () => {
        sessionStorage.setItem('Item', JSON.stringify(this._Item));
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
        var blob = new Blob([view], { type: 'application/pdf' });
        var url = URL.createObjectURL(blob);

        window.open(url, '_blank');
      }
    );
  }

  btnEliminar() {
    if (this._Item.idInspeccion == 0) this.btnRegresar();

    this._servicios.wsGeneral('inspec/delItem', this._Item).subscribe(
      (resp) => {},
      (error) =>
        this._toastr.error(
          'Error : ' + error.error.ExceptionMessage,
          'Guardar.'
        ),
      () => {
        this._toastr.success('Registro eliminado.');
        sessionStorage.removeItem('List');
        this.btnRegresar();
      }
    );
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

    this._frenos = true;
    this._alarma_rev = true;
    this._nivel_aceite = true;
    this._motor = true;
    this._transmision = true;
    this._fugas_aceite = true;
    this._nivel_agua = true;
    this._extinguidor = true;
    this._luces = true;
    this._torreta = true;
    this._neumaticos = true;
    this._pernos_bujes = true;
    this._direccion = true;
    this._espejos_retrovisores = true;
    this._claxon = true;
    this._cinturon_seguridad = true;
  }
}
