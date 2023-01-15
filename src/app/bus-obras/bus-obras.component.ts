import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { srvUtileriasService } from '../srvUtilerias.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IbusResp } from '../IBusResp';

@Component({
  selector: 'app-bus-obras',
  templateUrl: './bus-obras.component.html',
  styleUrls: ['./bus-obras.component.css'],
})
export class BusObrasComponent implements OnInit, OnDestroy {
  _listado: any[] = [];
  _subBuscar!: Subscription;
  _BusResp: IbusResp = {
    ventana: '',
    buscarPor: '',
    clave: '',
    claveTxt: '',
    nombre: '',
  };

  constructor(
    private _servicios: ServiciosService,
    private _router: Router,
    private _toastr: ToastrService,
    private _svrUtilierias: srvUtileriasService
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('busResp')) {
      this._BusResp = JSON.parse(sessionStorage.getItem('busResp')!);
      this._BusResp.clave = '';
      this._BusResp.claveTxt = '';
      this._BusResp.nombre = '';
    }

    this._servicios
      .wsGeneral('obras/getListFilter', { buscar: '', estatus: 'A' })
      .subscribe(
        (resp) => (this._listado = resp),
        (error) =>
          this._toastr.error(
            'Error : ' + error.error.ExceptionMessage,
            'Error al consultar obras.'
          ),
        () =>
          (this._listado = this._listado.map((x) => {
            x.estatus == 'A'
              ? (x.estatusTexto = 'Activo')
              : (x.estatusTexto = 'Baja');
            return x;
          }))
      );

    this._subBuscar = this._servicios.buscar$.subscribe((resp) => {
      this.listadoFiltrado(resp);
    });
  }

  listadoFiltrado(buscar: string) {
    this._servicios
      .wsGeneral('obras/getListFilter', { buscar: buscar, estatus: 'A' })
      .subscribe(
        (resp) => (this._listado = resp),
        (error) =>
          this._toastr.error(
            'Error : ' + error.error.ExceptionMessage,
            'Error al consultar obras.'
          ),
        () =>
          (this._listado = this._listado.map((x) => {
            x.estatus == 'A'
              ? (x.estatusTexto = 'Activo')
              : (x.estatusTexto = 'Baja');
            return x;
          }))
      );
  }

  btnAceptar(item: any) {
    this._BusResp.buscarPor = 'Obras';
    this._BusResp.clave = item.idObra;
    this._BusResp.claveTxt = item.idObra + ' | ' + item.Nombre;
    this._BusResp.nombre = item.nombre;
    sessionStorage.setItem('busResp', JSON.stringify(this._BusResp));
    this.btnRegresar();
  }

  btnRegresar() {
    this._router.navigate(['/' + this._BusResp.ventana]);
  }

  ngOnDestroy(): void {
    this._subBuscar.unsubscribe();
  }
}
