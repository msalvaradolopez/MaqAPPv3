import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class srvUtileriasService {
  constructor() {}

  convertDateToString(pFechaDate: Date): string {
    var _mesNumber: number = pFechaDate.getMonth() + 1;
    var _diaNumber: number = pFechaDate.getDate();
    var _diaTxt: string =
      _diaNumber < 10 ? '0' + _diaNumber.toString() : _diaNumber.toString();
    var _mesTxt: string =
      _mesNumber < 10 ? '0' + _mesNumber.toString() : _mesNumber.toString();
    var _annoTxt: string = pFechaDate.getFullYear().toString();

    return _diaTxt + '/' + _mesTxt + '/' + _annoTxt;
  }

  convertStringToDate(pFechaString: string): Date {
    var _fechaArray = pFechaString.split('/');

    return new Date(
      parseInt(_fechaArray[2]),
      parseInt(_fechaArray[1]) - 1,
      parseInt(_fechaArray[0])
    );
  }

  getListAnnos(): number[] {
    return [2021, 2022, 2023];
  }

  getListMeses(): any[] {
    return [
      { idMes: 1, nomMes: 'Enero' },
      { idMes: 2, nomMes: 'Febrero' },
      { idMes: 3, nomMes: 'Marzo' },
      { idMes: 4, nomMes: 'Abril' },
      { idMes: 5, nomMes: 'Mayo' },
      { idMes: 6, nomMes: 'Junio' },
      { idMes: 7, nomMes: 'Julio' },
      { idMes: 8, nomMes: 'Agosto' },
      { idMes: 9, nomMes: 'Septiembre' },
      { idMes: 10, nomMes: 'Octubre' },
      { idMes: 11, nomMes: 'Noviembre' },
      { idMes: 12, nomMes: 'Diciembre' },
    ];
  }

  getListDias(anno: number, mes: number): number[] {
    const dias: number[] = [];
    const daysInCurrentMonth = new Date(anno, mes, 0).getDate();

    for (let index = 1; index <= daysInCurrentMonth; index++) {
      dias.push(index);
    }

    return dias;
  }
}
