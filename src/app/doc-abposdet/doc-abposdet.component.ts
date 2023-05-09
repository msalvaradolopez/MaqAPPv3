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

    if (sessionStorage.getItem('busResp')) {
      this._BusResp = JSON.parse(sessionStorage.getItem('busResp')!);

      if (this._BusResp.buscarPor == 'Obras') {
        this._Item.idObra = this._BusResp.clave;
        this._Item.nomObra = this._BusResp.claveTxt;
      }

      if (this._BusResp.buscarPor == 'Supervisores') {
        this._Item.idSupervisor = this._BusResp.clave;
        this._Item.nomSupervisor = this._BusResp.claveTxt;
      }

      if (this._BusResp.buscarPor == 'Operadores') {
        this._Item.idOperador = this._BusResp.clave;
        this._Item.nomOperador = this._BusResp.claveTxt;
      }
    }

    this._accionTxt = this._accion == 'E' ? 'Editando' : 'Nuevo';
  }

  btnRegresar() {
    sessionStorage.removeItem('busResp');
    sessionStorage.removeItem('_listado');
    this._router.navigate(['/docAbPos']);
  }

  btnFormato() {
    let formatoPDFbase64: string = '';
    this._loading = true;
    this._servicios.wsGeneral('abpos/getPDF', this._Item).subscribe(
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
    if (this._Item.idAbordaje == 0) this.btnRegresar();

    this._servicios.wsGeneral('abpos/delItem', this._Item).subscribe(
      (resp) => {},
      (error) =>
        this._toastr.error(
          'Error : ' + error.error.ExceptionMessage,
          'Guardar.'
        ),
      () => {
        this._toastr.success('Registro eliminado.');
        sessionStorage.removeItem('_listado');
        this.btnRegresar();
      }
    );
  }

  btnGuardar() {
    // OBTENER ID DEL TEXTO INPUT
    if (this._Item.idObra == '0') {
      this._toastr.error('Guardar.', 'Falta Supervisor');
      return;
    }

    if (this._Item.idSupervisor == '0') {
      this._toastr.error('Guardar.', 'Falta Equipo');
      return;
    }

    if (this._Item.idOperador == '0') {
      this._toastr.error('Guardar.', 'Falta Operador');
      return;
    }

    this._fecha = $('#datepicker').val();
    this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);

    let lAccionRecurso: string = 'abpos/insItem';

    if (this._accion == 'E') lAccionRecurso = 'abpos/updItem';

    this._loading = true;
    this._servicios.wsGeneral(lAccionRecurso, this._Item).subscribe(
      (resp) => {},
      (error) => {
        this._loading = false;
        this._toastr.error(
          'Error : ' + error.error.ExceptionMessage,
          'Guardar.'
        );
      },
      () => {
        this._loading = false;
        this._toastr.success('Registro guardado.');
        sessionStorage.removeItem('_listado');
        if (this._accion == 'E') this.btnRegresar();
        else this.setItem();
      }
    );
  }

  buscarEmpresa() {
    this._fecha = $('#datepicker').val();
    this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);

    sessionStorage.setItem('Item', JSON.stringify(this._Item));
    sessionStorage.setItem('busResp', JSON.stringify(this._BusResp));
    this._router.navigate(['/busObras']);
  }

  buscarResponsable() {
    this._fecha = $('#datepicker').val();
    this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);

    sessionStorage.setItem('Item', JSON.stringify(this._Item));
    sessionStorage.setItem('busResp', JSON.stringify(this._BusResp));
    this._router.navigate(['/busSupervisores']);
  }

  buscarTrabajador() {
    this._fecha = $('#datepicker').val();
    this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);

    sessionStorage.setItem('Item', JSON.stringify(this._Item));
    sessionStorage.setItem('busResp', JSON.stringify(this._BusResp));
    this._router.navigate(['/busOperadores']);
  }

  setItem() {
    this._Item = {
      idAbordaje: 0,
      fecha: this._fechaActual,
      idSupervisor: '0',
      idObra: '0',
      idOperador: '0',
      riesgo: 'ALTO',
      desvio: 'EPP',
      casco: true,
      lentes: true,
      guantes: true,
      uniforme: true,
      zapatos: true,
      uni_fajado: true,
      tapones: true,
      mascarilla: true,
      careta: true,
      arnes: true,
      polainas: true,
      peto: true,
      gogles: true,
      otros: false,
      otro_descrip: '',
      act_inseguros: '',
      acc_correctiva: '',
      cond_inseguras: '',
      compromisos: '',
      nomSupervisor: '',
      nomOperador: '',
      nomObra: '',
    };
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
}
