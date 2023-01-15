import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { srvUtileriasService } from '../srvUtilerias.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { IbusResp } from '../IBusResp';

@Component({
  selector: 'app-bus-equipos',
  templateUrl: './bus-equipos.component.html',
  styleUrls: ['./bus-equipos.component.css'],
})
export class BusEquiposComponent implements OnInit, OnDestroy {
  _loading: boolean = false;
  _listado: any[] = [];
  _BusResp: IbusResp = {
    ventana: '',
    buscarPor: '',
    clave: '',
    claveTxt: '',
    nombre: '',
  };
  _subBuscar!: Subscription;

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
    } else this._loading = true;
    this._servicios
      .wsGeneral('maquinaria/getListFilter', { buscar: '', estatus: 'A' })
      .subscribe(
        (resp) => {
          this._listado = resp;
        },
        (error) => {
          this._loading = false;
          this._toastr.error(
            'Error : ' + error.error.ExceptionMessage,
            'Error al consultar equipos.'
          );
        },
        () => {
          this._listado = this._listado.map((x) => {
            x.estatus == 'A'
              ? (x.estatusTexto = 'Activo')
              : (x.estatusTexto = 'Baja');
            return x;
          });
          this._loading = false;
        }
      );

    this._subBuscar = this._servicios.buscar$.subscribe((resp) => {
      this.listadoFiltrado(resp);
    });
  }

  listadoFiltrado(buscar: string) {
    this._loading = true;
    this._servicios
      .wsGeneral('maquinaria/getListFilter', { buscar: buscar, estatus: 'A' })
      .subscribe(
        (resp) => (this._listado = resp),
        (error) => {
          this._loading = false;
          this._toastr.error(
            'Error : ' + error.error.ExceptionMessage,
            'Error al consultar equipos.'
          );
        },
        () => {
          this._listado = this._listado.map((x) => {
            x.estatus == 'A'
              ? (x.estatusTexto = 'Activo')
              : (x.estatusTexto = 'Baja');
            return x;
          });
          this._loading = false;
        }
      );
  }

  btnAceptar(item: any) {
    this._BusResp.buscarPor = 'Equipos';
    this._BusResp.clave = item.idEconomico;
    this._BusResp.claveTxt = item.idEconomico + ' | ' + item.Tipo;
    this._BusResp.nombre = item.Tipo;
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
