import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cat-equipos-det',
  templateUrl: './cat-equipos-det.component.html',
  styleUrls: ['./cat-equipos-det.component.css'],
})
export class CatEquiposDetComponent implements OnInit {
  _item: any = { idEconomico: '', Tipo: '', estatus: 'A', fecha_alta: '' };
  _estatus: boolean = true;
  _accion: string = 'E';

  constructor(
    private _servicios: ServiciosService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('Item')) {
      this._item = JSON.parse(sessionStorage.getItem('Item')!);
      this._estatus = this._item.estatus == 'A';
    } else this._accion = 'N';
  }

  btnGuardar() {
    if (this._item.idOperador == '') {
      this._toastr.error('Guardar.', 'Falta Clave del equipo');
      return;
    }

    if (this._item.Tipo == '') {
      this._toastr.error('Guardar.', 'Falta Nombre del equipo');
      return;
    }

    let lAccionRecurso: string = 'maquinaria/insItem';

    if (this._accion == 'E') lAccionRecurso = 'maquinaria/updItem';

    this._item.estatus = this._estatus ? 'A' : 'B';

    this._servicios.wsGeneral(lAccionRecurso, this._item).subscribe(
      (resp) => {},
      (error) =>
        this._toastr.error(
          'Error : ' + error.error.ExceptionMessage,
          'Guardar.'
        ),
      () => {
        this._toastr.success('Registro guardado.');
        if (this._accion == 'E') this.btnRegresar();
        else this.LimpiarFormulario();
      }
    );
  }

  btnRegresar() {
    this._router.navigate(['/catEquipos']);
  }

  LimpiarFormulario() {
    this._item = { idEconomico: '', Tipo: '', estatus: 'A', fecha_alta: '' };
  }
}
