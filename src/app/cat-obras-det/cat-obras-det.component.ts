import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cat-obras-det',
  templateUrl: './cat-obras-det.component.html',
  styleUrls: ['./cat-obras-det.component.css'],
})
export class CatObrasDetComponent implements OnInit {
  _obraItem: any = { idObra: '', Nombre: '', estatus: 'A', fecha_alta: '' };
  _estatus: boolean = true;
  _accion: string = 'E';

  constructor(
    private _servicios: ServiciosService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('obraItem')) {
      this._obraItem = JSON.parse(sessionStorage.getItem('obraItem')!);
      this._estatus = this._obraItem.estatus == 'A';
    } else this._accion = 'N';
  }

  btnGuardar() {
    if (this._obraItem.idObra == '') {
      this._toastr.error('Guardar obra.', 'Falta Clave de la obra');
      return;
    }

    if (this._obraItem.Nombre == '') {
      this._toastr.error('Guardar obra.', 'Falta Nombre de la obra');
      return;
    }

    this._obraItem.estatus = this._estatus ? 'A' : 'B';

    let lAccionRecurso: string = 'obras/insItem';

    if (this._accion == 'E') lAccionRecurso = 'obras/updItem';

    this._servicios.wsGeneral(lAccionRecurso, this._obraItem).subscribe(
      (resp) => {},
      (error) =>
        this._toastr.error(
          'Error : ' + error.error.ExceptionMessage,
          'Guardar obra.'
        ),
      () => {
        this._toastr.success('Registro guardado.');
        sessionStorage.removeItem('_obrasList');
        if (this._accion == 'E') this.btnRegresar();
        else this.LimpiarFormulario();
      }
    );
  }

  btnRegresar() {
    this._router.navigate(['/catObras']);
  }

  LimpiarFormulario() {
    this._obraItem = { idObra: '', Nombre: '', estatus: 'A', fecha_alta: '' };
  }
}
