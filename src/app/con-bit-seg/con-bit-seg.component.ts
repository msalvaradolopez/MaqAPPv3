import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiciosService } from '../servicios.service';
import { srvUtileriasService } from '../srvUtilerias.service';
import { ToastrService } from 'ngx-toastr';
import { IFiltros } from '../Ifiltros';
import { IBitSegDetail } from '../IBitSegDetail';
import { IBitSegMaster } from '../IBitSegMaster';
declare var $: any;

@Component({
  selector: 'app-con-bit-seg',
  templateUrl: './con-bit-seg.component.html',
  styleUrls: ['./con-bit-seg.component.css'],
})
export class ConBitSegComponent implements OnInit {
  _loading: boolean = false;
  _sinInfo: boolean = false;
  _fechaActual: Date = new Date();

  _listado: IBitSegMaster[] = [];
  _listadoDet: IBitSegDetail[] = [];
  _fecha: string = '';
  _filtros: IFiltros = {
    idUbicacion: 0,
    idEconomico: '',
    idObra: '',
    idOperador: '',
    fecha_alta: this._fechaActual,
    buscar: '',
    fecha: '',
    estatus: 'A',
    idEconomicoTXT: '',
    idObraTXT: '',
    idOperadorTXT: '',
    idUsuario: '',
    pantalla: 'conBitSeg',
  };
  _subBuscar!: Subscription;

  constructor(
    private _servicios: ServiciosService,
    private _router: Router,
    private _toastr: ToastrService,
    private _svrUtilierias: srvUtileriasService
  ) {}

  ngOnInit(): void {
    this._fecha = this._svrUtilierias.convertDateToString(new Date());
    let categoria: string = sessionStorage.getItem('categoria')!;
    if (categoria == 'A') this._filtros.idUsuario = '0';
    else this._filtros.idUsuario = sessionStorage.getItem('idUsuario')!;

    if (sessionStorage.getItem('Filtros')) {
      this._filtros = JSON.parse(sessionStorage.getItem('Filtros')!);
      this._fecha = this._filtros.fecha;
      this._filtros.fecha_alta = this._svrUtilierias.convertStringToDate(
        this._fecha
      );
      sessionStorage.removeItem('_listado');
      sessionStorage.removeItem('_listadoDet');
    } else {
      this.reiniciaFiltros();
    }

    if (sessionStorage.getItem('_listado'))
      this._listadoDet = JSON.parse(sessionStorage.getItem('_listadoDet')!);
    else {
      this._filtros.fecha_alta = this._svrUtilierias.convertStringToDate(
        this._fecha
      );
      this._loading = true;
      this._servicios
        .wsGeneral('bitSeg/getListFilter', this._filtros)
        .subscribe(
          (resp) => {
            this._listado = resp;
          },
          (error) => {
            this._toastr.error(
              'Error : ' + error.error.ExceptionMessage,
              'Error al consultar bit Seguridad.'
            );
            this._loading = false;
          },
          () => {
            this._listado.forEach((itemListado) => {
              itemListado.ListadoBitSeg.forEach((itemDet) => {
                this._listadoDet.push(itemDet);
              });
            });

            this._loading = false;
            if (this._listado == null || this._listado.length == 0)
              this._sinInfo = true;
          }
        );
    }

    this._subBuscar = this._servicios.buscar$.subscribe((resp) => {
      this.listadoFiltrado(resp);
    });
  }

  listadoFiltrado(buscar: string) {
    this._filtros.fecha_alta = this._svrUtilierias.convertStringToDate(
      this._fecha
    );
    this._filtros.buscar = buscar;

    this._loading = true;
    this._servicios.wsGeneral('bitSeg/getListFilter', this._filtros).subscribe(
      (resp) => (this._listado = resp),
      (error) => {
        this._loading = false;
        this._toastr.error(
          'Error : ' + error.error.ExceptionMessage,
          'Error al consultar bit Seguridad.'
        );
      },
      () => {
        this._listado.forEach((itemListado) => {
          itemListado.ListadoBitSeg.forEach((itemDet) => {
            this._listadoDet.push(itemDet);
          });
        });

        this._loading = false;
        if (this._listado == null || this._listado.length == 0)
          this._sinInfo = true;
      }
    );
  }

  btnFiltros() {
    this.reiniciaFiltros();
    sessionStorage.setItem('Filtros', JSON.stringify(this._filtros));
    sessionStorage.removeItem('busResp');
    this._router.navigate(['/filtros']);
  }

  valoresRadioButtons(dato: string): string {
    if (dato == 'X') return 'N/A';

    if (dato == 'S') return 'SI';

    if (dato == 'N') return 'NO';

    return '';
  }

  ngOnDestroy(): void {
    this._subBuscar.unsubscribe();
  }

  reiniciaFiltros() {
    this._filtros = {
      idUbicacion: 0,
      idEconomico: '',
      idObra: '',
      idOperador: '',
      fecha_alta: this._fechaActual,
      buscar: '',
      fecha: '',
      estatus: 'A',
      idEconomicoTXT: '',
      idObraTXT: '',
      idOperadorTXT: '',
      idUsuario: '',
      pantalla: 'conBitSeg',
    };

    this._filtros.fecha = this._fecha;
    this._filtros.fecha_alta = this._svrUtilierias.convertStringToDate(
      this._fecha
    );
    let categoria: string = sessionStorage.getItem('categoria')!;
    if (categoria == 'A') this._filtros.idUsuario = '0';
    else this._filtros.idUsuario = sessionStorage.getItem('idUsuario')!;
  }
}
