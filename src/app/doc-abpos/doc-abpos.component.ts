import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { ToastrService } from 'ngx-toastr';
import { IAbPos } from '../IAbPos';

@Component({
  selector: 'app-doc-abpos',
  templateUrl: './doc-abpos.component.html',
  styleUrls: ['./doc-abpos.component.css'],
})
export class DocAbposComponent implements OnInit {
  _loading: boolean = false;
  _sinInfo: boolean = false;
  _List: IAbPos[] = [];

  _fechaActual: Date = new Date();

  constructor(
    private _servicios: ServiciosService,
    private _router: Router,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  btnFiltros() {}

  btnAgregar() {
    sessionStorage.setItem('_listado', JSON.stringify(this._List));
    sessionStorage.removeItem('Item');
    this._router.navigate(['/docAbPosDet']);
  }

  btnEditar(item: IAbPos) {
    sessionStorage.setItem('_listado', JSON.stringify(this._List));
    sessionStorage.setItem('Item', JSON.stringify(item));
    this._router.navigate(['/docAbPosDet']);
  }
}
