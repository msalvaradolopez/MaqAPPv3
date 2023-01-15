import { Component, OnInit } from '@angular/core';
import { ServiciosService } from '../servicios.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  _usuario: string = '';
  _passw: string = '';
  _loading: boolean = false;

  constructor(
    private _servicios: ServiciosService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._servicios.headerSiNo(false);
    sessionStorage.removeItem('categoria');
    sessionStorage.removeItem('nomUsuario');
    sessionStorage.removeItem('idUsuario');
  }

  btnAceptar() {
    if (this._usuario == '') {
      this._toastr.error('falta usuario', 'Acceso.');
      return;
    }

    if (this._passw == '') {
      this._toastr.error('falta contraseña', 'Acceso.');
      return;
    }

    this._loading = true;
    this._servicios
      .wsGeneral('accesos/Login', {
        idOperador: this._usuario,
        passw: this._passw,
      })
      .subscribe(
        (resp) => {
          let acceso = resp;
          sessionStorage.setItem('categoria', acceso.categoria);
          sessionStorage.setItem('nomUsuario', acceso.Nombre);
          sessionStorage.setItem('idUsuario', this._usuario);
        },
        (error) => {
          this._toastr.error(error.error.ExceptionMessage, 'Acceso.');
          this._loading = false;
        },
        () => {
          this._loading = false;
          this._router.navigate(['/menuGeneral']);
        }
      );
  }
}
