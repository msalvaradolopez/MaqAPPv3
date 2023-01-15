import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { srvUtileriasService } from '../srvUtilerias.service';

import { ToastrService } from 'ngx-toastr';
import { IUbicacion } from '../IUbicacion';
import { IbusResp } from '../IBusResp';
import { IBitSegMaster } from '../IBitSegMaster';
import { IBusHorasMinutos } from '../IBusHorasMinutos';
declare var $: any;

@Component({
  selector: 'app-frm-bit-seg',
  templateUrl: './frm-bit-seg.component.html',
  styleUrls: ['./frm-bit-seg.component.css'],
})
export class FrmBitSegComponent implements OnInit {
  @ViewChild('idFormato', { static: true }) _formato!: ElementRef;

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
    this._router.navigate(['/docBitSegDet']);
  }

  btnGererarPDF() {
    const htmlFormato = this._formato.nativeElement;
    const htmlBase64 = btoa(htmlFormato);
    const htmlString = atob(htmlBase64);
    console.log('Base64', htmlBase64);
    console.log('String', htmlString);
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
    let varRetorno: boolean = false;

    this._Item.ListadoBitSeg.forEach((item) => {
      if (item.idObra != this._Item.idObra) varRetorno = true;

      if (item.idSupervisor != this._Item.idSupervisor) varRetorno = true;

      if (item.area != this._Item.area) varRetorno = true;

      if (item.fecha != this._Item.fecha) varRetorno = true;

      if (item.horaInicio != this._Item.horaInicio) varRetorno = true;

      if (item.horaTermino != this._Item.horaTermino) varRetorno = true;
    });
    return varRetorno;
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
