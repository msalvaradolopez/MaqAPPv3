import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cat-operadores-det',
  templateUrl: './cat-operadores-det.component.html',
  styleUrls: ['./cat-operadores-det.component.css'],
})
export class CatOperadoresDetComponent implements OnInit {
  _item: any = {
    idOperador: '',
    Nombre: '',
    estatus: 'A',
    fecha_alta: '',
    categoria: 'O',
    passw: '',
  };
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
      this._toastr.error('Guardar.', 'Falta Clave del operador');
      return;
    }

    if (this._item.Nombre == '') {
      this._toastr.error('Guardar.', 'Falta Nombre del operador');
      return;
    }

    if (this._item.passw == '') {
      this._toastr.error('Guardar.', 'Falta Passw del operador');
      return;
    }

    this._item.estatus = this._estatus ? 'A' : 'B';

    let lAccionRecurso: string = 'operadores/insItem';

    if (this._accion == 'E') lAccionRecurso = 'operadores/updItem';

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
    this._router.navigate(['/catOperadores']);
  }

  LimpiarFormulario() {
    this._item = {
      idOperador: '',
      Nombre: '',
      estatus: 'A',
      fecha_alta: '',
      categoria: 'O',
      passw: '',
    };
  }
}
