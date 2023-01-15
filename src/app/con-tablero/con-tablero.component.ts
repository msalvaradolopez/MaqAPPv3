import { Component, OnInit, OnDestroy } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-con-tablero',
  templateUrl: './con-tablero.component.html',
  styleUrls: ['./con-tablero.component.css'],
})
export class ConTableroComponent implements OnInit, OnDestroy {
  _loading: boolean = false;
  _listado: any[] = [];
  _paginaTablero: number = 0;
  _interval: any;

  constructor(
    private _servicios: ServiciosService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getTableroList();
    this._interval = setInterval(() => this.getTableroList(), 20000);
  }

  getTableroList() {
    this._loading = true;
    this._paginaTablero++;

    this._servicios
      .wsGeneral('ubicaciones/getTableroList', { pagina: this._paginaTablero })
      .subscribe(
        (resp) => {
          this._listado = [];
          this._listado = resp;
        },
        (error) => {
          this._loading = false;
          this._toastr.error(
            'Error : ' + error.error.ExceptionMessage,
            'Error al consultar tablero.'
          );
        },
        () => {
          if (this._listado == null || this._listado.length == 1)
            this._paginaTablero = 0;

          this._listado.unshift({
            idEconomico: 'Equipo',
            lunes: 'Lunes',
            martes: 'Martes',
            miercoles: 'Miércoles',
            jueves: 'Jueves',
            viernes: 'Viernes',
            sabado: 'Sábado',
            domingo: 'Domingo',
          });
          this._loading = false;
        }
      );
  }

  async setRenglonesTablero(item: any) {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => resolve(this._listado.push(item)), 5000);
    });

    let result = await promise; // wait until the promise resolves (*)
  }

  ngOnDestroy(): void {
    clearInterval(this._interval);
  }
}
