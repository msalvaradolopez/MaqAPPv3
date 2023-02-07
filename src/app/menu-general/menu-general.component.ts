import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ServiciosService } from '../servicios.service';

@Component({
  selector: 'app-menu-general',
  templateUrl: './menu-general.component.html',
  styleUrls: ['./menu-general.component.css'],
})
export class MenuGeneralComponent implements OnInit {
  _menuList: any = [
    {
      categoria: 'S',
      icono: 'fa-solid fa-door-open',
      idMenu: 'login',
      Nombre: 'Salir',
      Descripcion: 'Opción para salir del sistema.',
    },
    {
      categoria: 'A',
      icono: 'fa-solid fa-door-open',
      idMenu: 'login',
      Nombre: 'Salir',
      Descripcion: 'Opción para salir del sistema.',
    },
    {
      categoria: 'S',
      icono: 'fa-solid fa-list-check',
      idMenu: 'docUbicaciones',
      Nombre: 'Registro de Ubicaciones',
      Descripcion:
        'Permite ingresar la ubicación, comentarios, litros, horometro, odometro de Equipos y Maquinaria.',
    },
    {
      categoria: 'A',
      icono: 'fa-solid fa-list-check',
      idMenu: 'docUbicaciones',
      Nombre: 'Registro de Ubicaciones',
      Descripcion:
        'Permite ingresar la ubicación, comentarios, litros, horometro, odometro de Equipos y Maquinaria.',
    },
    {
      categoria: 'A',
      icono: 'fa-solid fa-rectangle-list',
      idMenu: 'conUbicaciones',
      Nombre: 'Consulta de ubicaciones',
      Descripcion: '',
    },
    {
      categoria: 'S',
      icono: 'fa-solid fa-circle-exclamation',
      idMenu: 'docBitSeg',
      Nombre: 'Registro de Bitácora Seguridad',
      Descripcion:
        'Permite ingresar la ubicación, comentarios, litros, horometro, odometro de Equipos y Maquinaria.',
    },
    {
      categoria: 'A',
      icono: 'fa-solid fa-circle-exclamation',
      idMenu: 'docBitSeg',
      Nombre: 'Registro de Bitácora Seguridad',
      Descripcion:
        'Permite ingresar la ubicación, comentarios, litros, horometro, odometro de Equipos y Maquinaria.',
    },
    {
      categoria: 'A',
      icono: 'fa-solid fa-rectangle-list',
      idMenu: 'conBitSeg',
      Nombre: 'Consulta de Bitácora Seguridad',
      Descripcion: '',
    },
    {
      categoria: 'S',
      icono: 'fa-solid fa-circle-exclamation',
      idMenu: 'docInsPec',
      Nombre: 'Check List Maquinaria',
      Descripcion:
        'Permite ingresar la ubicación, comentarios, litros, horometro, odometro de Equipos y Maquinaria.',
    },
    {
      categoria: 'A',
      icono: 'fa-solid fa-circle-exclamation',
      idMenu: 'docInsPec',
      Nombre: 'Check List Maquinaria',
      Descripcion:
        'Permite ingresar la ubicación, comentarios, litros, horometro, odometro de Equipos y Maquinaria.',
    },

    {
      categoria: 'A',
      icono: 'fa-solid fa-circle-exclamation',
      idMenu: 'conInsPec',
      Nombre: 'Consulta de Check List Maquinaria',
      Descripcion:
        'Permite ingresar la ubicación, comentarios, litros, horometro, odometro de Equipos y Maquinaria.',
    },
    {
      categoria: 'A',
      icono: 'fa-solid fa-city',
      idMenu: 'catObras',
      Nombre: 'Catálogo de Obras',
      Descripcion: 'Permite ingresar y modificar los registros de obras.',
    },
    {
      categoria: 'A',
      icono: 'fa-solid fa-user',
      idMenu: 'catOperadores',
      Nombre: 'Catálogo de Operadores',
      Descripcion:
        'Permite ingresar y modificar los registros para operadores.',
    },
    {
      categoria: 'A',
      icono: 'fa-solid fa-gears',
      idMenu: 'catEquipos',
      Nombre: 'Catálogo de Equipo/Maquinaria',
      Descripcion:
        'Permite ingresar y modificar los registros de Equipos y Maquinaria.',
    },

    {
      categoria: 'A',
      icono: 'fa-solid fa-plane',
      idMenu: 'conTablero',
      Nombre: 'Tablero de ubicaciones',
      Descripcion: '',
    },
  ];

  constructor(
    private _router: Router,
    private _query: ActivatedRoute,
    private _servicios: ServiciosService
  ) {}

  ngOnInit(): void {
    var _categoria = sessionStorage.getItem('categoria');
    this._menuList = this._menuList.filter(
      (x: { categoria: string }) => x.categoria == _categoria
    );
    this.limpiaSesiones();
    this._servicios.headerSiNo(true);
  }

  btnAccion(idMenu: string) {
    this._router.navigate(['/' + idMenu]);
  }

  limpiaSesiones() {
    sessionStorage.removeItem('_obrasList');
    sessionStorage.removeItem('obraItem');

    sessionStorage.removeItem('_listado');
    sessionStorage.removeItem('Item');

    sessionStorage.removeItem('Filtros');
    sessionStorage.removeItem('itemResp');
    sessionStorage.removeItem('busResp');
    sessionStorage.removeItem('busHorasMinutos');
  }
}
