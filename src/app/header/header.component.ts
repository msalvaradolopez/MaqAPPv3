import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiciosService } from '../servicios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  _headerSiNo: boolean = false;
  _fechaActual: Date = new Date();
  _siglasUsuario: string = '';

  private _subServicio!: Subscription;

  constructor(private _servicios: ServiciosService, private _router: Router) {}

  ngOnInit(): void {
    this._subServicio = this._servicios.header$.subscribe((resp) => {
      this._headerSiNo = resp;

      if (sessionStorage.getItem('nomUsuario') && this._headerSiNo) {
        let nomUsuario: string = sessionStorage.getItem('nomUsuario')!;
        var nomSplit = nomUsuario.split(/[\s,]+/);
        if (nomSplit.length > 3)
          this._siglasUsuario =
            nomSplit[0].substring(0, 1) + nomSplit[2].substring(0, 1);
        else
          this._siglasUsuario =
            nomSplit[0].substring(0, 1) + nomSplit[1].substring(0, 1);
      }
    });
  }

  onKeypressEvent(event: any) {
    if (event.target.value.length > 2)
      this._servicios.buscar(event.target.value);
    else this._servicios.buscar('');
  }

  btnAccion() {
    this._router.navigate(['/menuGeneral']);
  }

  ngOnDestroy(): void {
    this._subServicio.unsubscribe();
  }
}
