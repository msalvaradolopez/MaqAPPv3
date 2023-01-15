import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cat-obras',
  templateUrl: './cat-obras.component.html',
  styleUrls: ['./cat-obras.component.css'],
})
export class CatObrasComponent implements OnInit, OnDestroy {
  _loading: boolean = false;
  _obrasList: any[] = [];
  _subBuscar!: Subscription;

  constructor(
    private _servicios: ServiciosService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('_obrasList'))
      this._obrasList = JSON.parse(sessionStorage.getItem('_obrasList')!);
    else {
      this._loading = true;
      this._servicios
        .wsGeneral('obras/getListFilter', { buscar: '', estatus: '0' })
        .subscribe(
          (resp) => (this._obrasList = resp),
          (error) => {
            this._loading = false;
            this._toastr.error(
              'Error : ' + error.error.ExceptionMessage,
              'Error al consultar obras.'
            );
          },
          () => {
            this._obrasList = this._obrasList.map((x) => {
              x.estatus == 'A'
                ? (x.estatusTexto = 'Activo')
                : (x.estatusTexto = 'Baja');
              return x;
            });
            this._loading = false;
          }
        );
    }

    this._subBuscar = this._servicios.buscar$.subscribe((resp) => {
      this.listadoObrasFiltrados(resp);
    });
  }

  btnAgregar() {
    sessionStorage.setItem('_obrasList', JSON.stringify(this._obrasList));
    sessionStorage.removeItem('obraItem');
    this._router.navigate(['/catObrasDet']);
  }

  btnEditar(obraItem: any) {
    sessionStorage.setItem('_obrasList', JSON.stringify(this._obrasList));
    sessionStorage.setItem('obraItem', JSON.stringify(obraItem));
    this._router.navigate(['/catObrasDet']);
  }

  listadoObrasFiltrados(buscar: string) {
    this._loading = true;
    this._servicios
      .wsGeneral('obras/getListFilter', { buscar: buscar, estatus: '0' })
      .subscribe(
        (resp) => (this._obrasList = resp),
        (error) => {
          this._loading = false;
          this._toastr.error(
            'Error : ' + error.error.ExceptionMessage,
            'Error al consultar obras.'
          );
        },
        () => {
          this._obrasList = this._obrasList.map((x) => {
            x.estatus == 'A'
              ? (x.estatusTexto = 'Activo')
              : (x.estatusTexto = 'Baja');
            return x;
          });
          this._loading = false;
        }
      );
  }

  ngOnDestroy(): void {
    this._subBuscar.unsubscribe();
  }
}
