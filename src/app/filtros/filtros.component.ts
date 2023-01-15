import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiciosService } from '../servicios.service';
import { srvUtileriasService } from '../srvUtilerias.service';
import { ToastrService } from 'ngx-toastr';
import { IFiltros } from '../Ifiltros';
import { IbusResp } from '../IBusResp';
declare var $: any;

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css'],
})
export class FiltrosComponent implements OnInit, AfterViewInit {
  _fechaAlta: Date = new Date();
  _filtros: IFiltros = {
    idUbicacion: 0,
    idEconomico: '',
    idObra: '',
    idOperador: '',
    fecha_alta: this._fechaAlta,
    buscar: '',
    fecha: '',
    estatus: 'A',
    idEconomicoTXT: '',
    idObraTXT: '',
    idOperadorTXT: '',
    idUsuario: '',
    pantalla: '',
  };

  _BusResp: IbusResp = {
    ventana: 'filtros',
    buscarPor: '',
    clave: '',
    claveTxt: '',
    nombre: '',
  };

  _fecha: string = '';

  constructor(
    private _servicios: ServiciosService,
    private _router: Router,
    private _toastr: ToastrService,
    private _svrUtilierias: srvUtileriasService
  ) {}

  ngOnInit(): void {
    sessionStorage.removeItem('_listado');

    this._fecha = this._svrUtilierias.convertDateToString(new Date());
    this._filtros.idUsuario = sessionStorage.getItem('idUsuario')!;

    if (sessionStorage.getItem('Filtros')) {
      this._filtros = JSON.parse(sessionStorage.getItem('Filtros')!);
      var fechaAux = new Date(this._filtros.fecha_alta);
      this._fecha = this._svrUtilierias.convertDateToString(fechaAux);
    } else {
      this._filtros.fecha = this._fecha;
      this._filtros.fecha_alta = this._svrUtilierias.convertStringToDate(
        this._fecha
      );
    }

    if (sessionStorage.getItem('busResp')) {
      this._BusResp = JSON.parse(sessionStorage.getItem('busResp')!);

      if (this._BusResp.buscarPor == 'Equipos')
        this._filtros.idEconomicoTXT = this._BusResp.claveTxt;

      if (this._BusResp.buscarPor == 'Obras')
        this._filtros.idObraTXT = this._BusResp.claveTxt;

      if (this._BusResp.buscarPor == 'Operadores')
        this._filtros.idOperadorTXT = this._BusResp.claveTxt;
    }
  }

  btnGuardar() {
    // OBTENER ID DEL TEXTO INPUT
    if (this._filtros.idEconomicoTXT) {
      let valorTxt: string = this._filtros.idEconomicoTXT;
      let valorArreglo = valorTxt.split('|');
      this._filtros.idEconomico = valorArreglo[0].trim();
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

    this._fecha = $('#datepicker').val();
    this._filtros.fecha = this._fecha;
    this._filtros.fecha_alta = this._svrUtilierias.convertStringToDate(
      this._fecha
    );
    sessionStorage.setItem('Filtros', JSON.stringify(this._filtros));
    this.btnRegresar();
  }

  buscarEquipo() {
    this._fecha = $('#datepicker').val();
    this._filtros.fecha_alta = this._svrUtilierias.convertStringToDate(
      this._fecha
    );
    sessionStorage.setItem('Filtros', JSON.stringify(this._filtros));
    sessionStorage.setItem('busResp', JSON.stringify(this._BusResp));
    this._router.navigate(['/busEquipos']);
  }

  buscarObra() {
    this._fecha = $('#datepicker').val();
    this._filtros.fecha_alta = this._svrUtilierias.convertStringToDate(
      this._fecha
    );
    sessionStorage.setItem('Filtros', JSON.stringify(this._filtros));
    sessionStorage.setItem('busResp', JSON.stringify(this._BusResp));
    this._router.navigate(['/busObras']);
  }

  buscarOperador() {
    this._fecha = $('#datepicker').val();
    this._filtros.fecha_alta = this._svrUtilierias.convertStringToDate(
      this._fecha
    );
    sessionStorage.setItem('Filtros', JSON.stringify(this._filtros));
    sessionStorage.setItem('busResp', JSON.stringify(this._BusResp));
    this._router.navigate(['/busOperadores']);
  }

  btnRegresar() {
    this._router.navigate(['/' + this._filtros.pantalla]);
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
