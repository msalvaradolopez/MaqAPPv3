import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { srvUtileriasService } from '../srvUtilerias.service';

import { ToastrService } from 'ngx-toastr';

import { IbusResp } from '../IBusResp';
import { IBitSegMaster } from '../IBitSegMaster';
import { IBusHorasMinutos } from '../IBusHorasMinutos';
import { IBitSegDetail } from '../IBitSegDetail';
declare var $: any;

@Component({
  selector: 'app-doc-bit-seg-det',
  templateUrl: './doc-bit-seg-det.component.html',
  styleUrls: ['./doc-bit-seg-det.component.css'],
})
export class DocBitSegDetComponent implements OnInit, AfterViewInit, OnDestroy {
  _loading: boolean = false;

  _fechaActual: Date = new Date();

  _Item: IBitSegMaster = {
    idBitacora: 0,
    docBitacora: 0,
    fecha: this._fechaActual,
    idSupervisor: '',
    idObra: '',
    area: '',
    hora_inicio: this._fechaActual,
    hora_termino: this._fechaActual,
    supervisorNom: '',
    obraNom: '',
    ListadoBitSeg: [],
    idSupervisorTXT: '',
    idObraTXT: '',
    horaInicio: '',
    horaTermino: '',
  };

  _BusResp: IbusResp = {
    ventana: 'docBitSegDet',
    buscarPor: '',
    clave: '',
    claveTxt: '',
    nombre: '',
  };

  _busHorasMinutos: IBusHorasMinutos = {
    ventana: 'docBitSegDet',
    nomCampo: '',
    horas: '00',
    minutos: '00',
  };

  _accion: string = 'E';
  _accionTxt: string = '';
  _fecha: string = '';
  _hora_inicio: string = '00';
  _hora_termino: string = '00';

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
      var fechaAux = new Date(this._Item.fecha);
      var hora_inicioAux = new Date(this._Item.fecha);
      var _hora_terminoAux = new Date(this._Item.fecha);
      this._fecha = this._svrUtilierias.convertDateToString(fechaAux);
      this._hora_inicio = this._svrUtilierias.convertDateToString(fechaAux);
      this._hora_termino = this._svrUtilierias.convertDateToString(fechaAux);

      this._accion = this._Item.docBitacora == null ? 'N' : 'E';
    } else {
      this._accion = 'N';
      this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);
      this._Item.hora_inicio = this._svrUtilierias.convertStringToDate(
        this._fecha
      );
      this._Item.hora_inicio = this._svrUtilierias.convertStringToDate(
        this._fecha
      );

      let nomUsuario: string = sessionStorage.getItem('nomUsuario')!;
      let idUsuario: string = sessionStorage.getItem('idUsuario')!;
      this._Item.idSupervisorTXT = idUsuario + ' | ' + nomUsuario;
      this._Item.supervisorNom = nomUsuario;
    }

    if (sessionStorage.getItem('busResp')) {
      this._BusResp = JSON.parse(sessionStorage.getItem('busResp')!);

      if (this._BusResp.buscarPor == 'Obras') {
        this._Item.idObraTXT = this._BusResp.claveTxt;
        this._Item.obraNom = this._BusResp.nombre;
      }

      if (this._BusResp.buscarPor == 'Supervisores') {
        this._Item.idSupervisorTXT = this._BusResp.claveTxt;
        this._Item.supervisorNom = this._BusResp.nombre;
      }
    }

    if (sessionStorage.getItem('busHorasMinutos')) {
      this._busHorasMinutos = JSON.parse(
        sessionStorage.getItem('busHorasMinutos')!
      );
      if (this._busHorasMinutos.nomCampo == 'Inicio')
        this._Item.horaInicio =
          this._busHorasMinutos.horas + ':' + this._busHorasMinutos.minutos;

      if (this._busHorasMinutos.nomCampo == 'Termino')
        this._Item.horaTermino =
          this._busHorasMinutos.horas + ':' + this._busHorasMinutos.minutos;
    }

    this._accionTxt = this._accion == 'E' ? 'Editando' : 'Nuevo';
  }

  btnGuardar() {
    // OBTENER ID DEL TEXTO INPUT
    if (this._Item.idObraTXT) {
      var item = this._Item.idObraTXT.split('|');
      this._Item.idObra = item[0].trim();
    } else {
      this._toastr.error('Guardar.', 'Falta obra');
      return;
    }

    if (this._Item.idSupervisorTXT) {
      var item = this._Item.idSupervisorTXT.split('|');
      this._Item.idSupervisor = item[0].trim();
    } else {
      this._toastr.error('Guardar.', 'Falta supervisor');
      return;
    }

    if (this._Item.area == null) {
      this._toastr.error('Area requerida.', 'Guardar.');
      return;
    }

    if (this._Item.horaInicio == null || this._Item.horaInicio == '') {
      this._toastr.error(
        'Ingrese hora inicial a la bitacora',
        'Guardar bitacora.'
      );
      return;
    }

    if (this._Item.horaTermino == null || this._Item.horaTermino == '') {
      this._toastr.error(
        'Ingrese hora termino a la bitacora',
        'Guardar bitacora.'
      );
      return;
    }

    if (this._Item.ListadoBitSeg.length == 0) {
      this._toastr.error(
        'Ingrese equipo(s) a la bitacora',
        'Guardar bitacora.'
      );
      return;
    }

    this._fecha = $('#datepicker').val();
    this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);

    this._hora_inicio = $('#datepicker').val();
    this._Item.hora_inicio = this._svrUtilierias.convertStringToDate(
      this._hora_inicio
    );

    this._hora_termino = $('#datepicker').val();
    this._Item.hora_termino = this._svrUtilierias.convertStringToDate(
      this._hora_termino
    );

    //this._Item.idUsuario = sessionStorage.getItem("idUsuario");

    this._Item.ListadoBitSeg = this._Item.ListadoBitSeg.map((item) => {
      item.idObra = this._Item.idObra;
      item.idObraTXT = this._Item.idObraTXT;
      item.idSupervisor = this._Item.idSupervisor;
      item.supervisorNom = this._Item.supervisorNom;
      item.idSupervisorTXT = this._Item.idSupervisorTXT;
      item.area = this._Item.area;
      item.fecha = this._Item.fecha;
      item.hora_inicio = this._Item.hora_inicio;
      item.hora_termino = this._Item.hora_termino;
      item.horaInicio = this._Item.horaInicio;
      item.horaTermino = this._Item.horaTermino;
      return item;
    });

    let lAccionRecurso: string = 'bitSeg/updList';

    this._servicios
      .wsGeneral(lAccionRecurso, this._Item.ListadoBitSeg)
      .subscribe(
        (resp) => {},
        (error) =>
          this._toastr.error(
            'Error : ' + error.error.ExceptionMessage,
            'Guardar bitacora.'
          ),
        () => {
          sessionStorage.setItem('Item', JSON.stringify(this._Item));
          this._toastr.success('Bitacora guardada.');
          this.btnRegresar();
        }
      );
  }

  buscarSupervisor() {
    var categoria = sessionStorage.getItem('categoria');

    if (categoria == 'S' || categoria == 'O') return;

    this._fecha = $('#datepicker').val();
    this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);

    this._hora_inicio = $('#datepicker').val();
    this._Item.hora_inicio = this._svrUtilierias.convertStringToDate(
      this._hora_inicio
    );

    this._hora_termino = $('#datepicker').val();
    this._Item.hora_termino = this._svrUtilierias.convertStringToDate(
      this._hora_termino
    );

    sessionStorage.setItem('Item', JSON.stringify(this._Item));
    sessionStorage.setItem('busResp', JSON.stringify(this._BusResp));
    this._router.navigate(['/busSupervisores']);
  }

  buscarObra() {
    this._fecha = $('#datepicker').val();
    this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);
    this._hora_inicio = $('#datepicker').val();
    this._Item.hora_inicio = this._svrUtilierias.convertStringToDate(
      this._hora_inicio
    );

    this._hora_termino = $('#datepicker').val();
    this._Item.hora_termino = this._svrUtilierias.convertStringToDate(
      this._hora_termino
    );

    sessionStorage.setItem('Item', JSON.stringify(this._Item));
    sessionStorage.setItem('busResp', JSON.stringify(this._BusResp));
    this._router.navigate(['/busObras']);
  }

  btnAgregar() {
    // OBTENER ID DEL TEXTO INPUT
    if (this._Item.idObraTXT) {
      var item = this._Item.idObraTXT.split('|');
      this._Item.idObra = item[0].trim();
      this._Item.obraNom = item[1].trim();
    } else {
      this._toastr.error('Guardar.', 'Falta obra');
      return;
    }

    if (this._Item.idSupervisorTXT) {
      var item = this._Item.idSupervisorTXT.split('|');
      this._Item.idSupervisor = item[0].trim();
      this._Item.supervisorNom = item[1].trim();
    } else {
      this._toastr.error('Guardar.', 'Falta supervisor');
      return;
    }

    if (this._Item.area == null) {
      this._toastr.error('Area requerida.', 'Guardar.');
      return;
    }

    sessionStorage.setItem('Item', JSON.stringify(this._Item));
    sessionStorage.removeItem('ItemDet');
    sessionStorage.removeItem('busResp');
    this._router.navigate(['/docBitSegDetEquipo']);
  }

  btnEditar(ItemDet: any) {
    sessionStorage.setItem('Item', JSON.stringify(this._Item));
    sessionStorage.setItem('ItemDet', JSON.stringify(ItemDet));
    sessionStorage.removeItem('busResp');
    this._router.navigate(['/docBitSegDetEquipo']);
  }

  btnRegresar() {
    if (this.validaCambiosHeader()) this.btnGuardar();

    sessionStorage.removeItem('busResp');
    sessionStorage.removeItem('_listado');
    sessionStorage.removeItem('busHorasMinutos');
    this._router.navigate(['/docBitSeg']);
  }

  LimpiarFormulario() {
    this._Item = {
      idBitacora: 0,
      docBitacora: 0,
      fecha: this._fechaActual,
      idSupervisor: '',
      idObra: '',
      area: '',
      hora_inicio: this._fechaActual,
      hora_termino: this._fechaActual,
      supervisorNom: '',
      obraNom: '',
      ListadoBitSeg: [],
      idSupervisorTXT: '',
      idObraTXT: '',
      horaInicio: '',
      horaTermino: '',
    };
  }

  valoresRadioButtons(dato: string): string {
    if (dato == 'X') return 'N/A';

    if (dato == 'S') return 'SI';

    if (dato == 'N') return 'NO';

    return '';
  }

  validaCambiosHeader(): boolean {
    let valRetorno: boolean = false;

    this._Item.ListadoBitSeg.forEach((item) => {
      if (item.idObra != this._Item.idObra) valRetorno = true;

      if (item.idSupervisor != this._Item.idSupervisor) valRetorno = true;

      if (item.area != this._Item.area) valRetorno = true;

      if (item.fecha != this._Item.fecha) valRetorno = true;

      if (item.horaInicio != this._Item.horaInicio) valRetorno = true;

      if (item.horaTermino != this._Item.horaTermino) valRetorno = true;
    });
    return valRetorno;
  }

  busHorasMinutos(nomCampo: string) {
    this._fecha = $('#datepicker').val();
    this._Item.fecha = this._svrUtilierias.convertStringToDate(this._fecha);
    this._hora_inicio = $('#datepicker').val();
    this._Item.hora_inicio = this._svrUtilierias.convertStringToDate(
      this._hora_inicio
    );

    this._hora_termino = $('#datepicker').val();
    this._Item.hora_termino = this._svrUtilierias.convertStringToDate(
      this._hora_termino
    );

    sessionStorage.setItem('Item', JSON.stringify(this._Item));
    this._busHorasMinutos.nomCampo = nomCampo;
    sessionStorage.setItem(
      'busHorasMinutos',
      JSON.stringify(this._busHorasMinutos)
    );
    this._router.navigate(['/busHorasMinutos']);
  }

  btnFormato() {
    let formatoPDFbase64: string = '';
    if (this.validaCambiosHeader()) this.btnGuardar();

    this._loading = true;
    this._servicios.wsGeneral('bitSeg/getPDF', this._Item).subscribe(
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

        /*
        const win = window.open("","_blank");
        let html = '';

        html += '<html>';
        html += '<body style="margin:0!important">';
        html += '<embed width="100%" height="100%" src="data:application/pdf;base64,'+formatoPDFbase64+'" type="application/pdf" />';
        html += '</body>';
        html += '</html>';

        setTimeout(() => {
          win.document.write(html);
        }, 0);
        */

        // base64 string
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

  ngOnDestroy(): void {
    // sessionStorage.removeItem("busResp");
    // sessionStorage.removeItem("busHorasMinutos");
  }
}
function item(
  value: IBitSegDetail,
  index: number,
  array: IBitSegDetail[]
): void {
  throw new Error('Function not implemented.');
}
