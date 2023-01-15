import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class srvUtileriasService {

  constructor() { }

  convertDateToString(pFechaDate: Date): string {

    var _mesNumber: number = pFechaDate.getMonth()+1;
    var _diaNumber: number = pFechaDate.getDate();
    var _diaTxt : string = _diaNumber < 10 ? "0" + _diaNumber.toString() : _diaNumber.toString();
    var _mesTxt : string = _mesNumber < 10 ? "0" + _mesNumber.toString() : _mesNumber.toString();
    var _annoTxt : string = pFechaDate.getFullYear().toString();

    return _diaTxt + "/" + _mesTxt + "/" + _annoTxt;
  }

  convertStringToDate(pFechaString: string): Date {

    var _fechaArray = pFechaString.split("/");
  

    return new Date(parseInt(_fechaArray[2]) , parseInt(_fechaArray[1])-1, parseInt(_fechaArray[0]));
  }
}
