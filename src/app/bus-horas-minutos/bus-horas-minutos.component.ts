import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IBusHorasMinutos } from '../IBusHorasMinutos';

@Component({
  selector: 'app-bus-horas-minutos',
  templateUrl: './bus-horas-minutos.component.html',
  styleUrls: ['./bus-horas-minutos.component.css'],
})
export class BusHorasMinutosComponent implements OnInit {
  _busHorasMinutos: IBusHorasMinutos = {
    ventana: '',
    nomCampo: '',
    horas: '00',
    minutos: '00',
  };

  _horas: string = '00';
  _minutos: string = '00';

  _horasList: string[] = [];
  _munutosList: string[] = [];

  constructor(private _router: Router) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('busHorasMinutos')) {
      this._busHorasMinutos = JSON.parse(
        sessionStorage.getItem('busHorasMinutos')!
      );
    }

    this.addNumeros(0, 13, this._horasList);
    this.addNumeros(0, 60, this._munutosList);
  }

  btnGuardar() {
    this._busHorasMinutos.horas = this._horas;
    this._busHorasMinutos.minutos = this._minutos;
    sessionStorage.setItem(
      'busHorasMinutos',
      JSON.stringify(this._busHorasMinutos)
    );
    this._router.navigate(['/' + this._busHorasMinutos.ventana]);
  }

  btnRegresar() {
    sessionStorage.removeItem('busHorasMinutos');
    this._router.navigate(['/' + this._busHorasMinutos.ventana]);
  }

  addNumeros(numero: number, stop: number, listado: string[]): number {
    let addNumero: string =
      numero < 10 ? '0' + numero.toString() : numero.toString();
    listado.push(addNumero);
    numero++;
    return numero == stop ? 0 : this.addNumeros(numero, stop, listado);
  }

  setHoras(valor: string) {
    this._horas = valor;
  }

  setMinutos(valor: string) {
    this._minutos = valor;
  }
}
