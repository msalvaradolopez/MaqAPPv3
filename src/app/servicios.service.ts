import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ServiciosService {
  apiURL: string = environment.apiURL;

  private _buscar = new Subject<string>();
  buscar$ = this._buscar.asObservable();

  private _header = new Subject<boolean>();
  header$ = this._header.asObservable();

  constructor(private _http: HttpClient) {}

  wsGeneral(ws: string, param: any): Observable<any> {
    let headers = new HttpHeaders();

    headers = headers.append('content-type', 'application/json');
    headers = headers.append('Access-Control-Allow-Origin', '*');
    return this._http.post(this.apiURL + '/' + ws, param, { headers: headers });
  }

  buscar(buscar: string) {
    this._buscar.next(buscar);
  }

  headerSiNo(headerSiNo: boolean) {
    this._header.next(headerSiNo);
  }
}
