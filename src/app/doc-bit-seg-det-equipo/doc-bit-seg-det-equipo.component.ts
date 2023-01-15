import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServiciosService } from '../servicios.service';
import { srvUtileriasService } from '../srvUtilerias.service';

import { ToastrService } from 'ngx-toastr';
import { IUbicacion } from '../IUbicacion';
import { IbusResp } from '../IBusResp';
import { IBitSegMaster } from '../IBitSegMaster';
import { IBitSegDetail } from '../IBitSegDetail';
declare var $: any;

@Component({
  selector: 'app-doc-bit-seg-det-equipo',
  templateUrl: './doc-bit-seg-det-equipo.component.html',
  styleUrls: ['./doc-bit-seg-det-equipo.component.css'],
})
export class DocBitSegDetEquipoComponent implements OnInit {
  _fechaActual: Date = new Date();

  _Item: IBitSegMaster = {
    idBitacora: 0,
    docBitacora: 0,
    fecha: this._fechaActual,
    idSupervisor: '',
    idObra: '',
    area: '',
    hora_inicio: this._fechaActual,
    hora_termino: this._fechaActual,
    supervisorNom: '',
    obraNom: '',
    ListadoBitSeg: [],
    idSupervisorTXT: '',
    idObraTXT: '',
    horaInicio: '',
    horaTermino: '',
  };

  _ItemDet: IBitSegDetail = {
    idBitacora: 0,
    docBitacora: 0,
    fecha: this._fechaActual,
    idSupervisor: '',
    idObra: '',
    area: '',
    hora_inicio: this._fechaActual,
    hora_termino: this._fechaActual,
    idEconomico: '',
    idOperador: '',
    actividad: '',
    pto_exacto: '',
    chequeo_medico: 'X',
    chequeo_medico_obs: '',
    checklist_maq_equip: 'X',
    checklist_maq_equip_obs: '',
    apr: 'X',
    apr_obs: '',
    permiso_instancia: 'X',
    permiso_instancia_obs: '',
    dc3: 'X',
    dc3_obs: '',
    extintor: 'X',
    extintor_obs: '',
    kit_antiderrames: 'X',
    kit_antiderrames_obs: '',
    platica_5min: 'X',
    platica_5min_obs: '',
    epp: 'X',
    epp_obs: '',
    otro: 'X',
    otro_descrip: '',
    otro_obs: '',
    idUsuario: '',
    idEconomicoTXT: '',
    idObraTXT: '',
    idOperadorTXT: '',
    supervisorNom: '',
    idSupervisorTXT: '',
    equipoNom: '',
    operadorNom: '',
    obraNom: '',
    horaInicio: '',
    horaTermino: '',
  };

  _BusResp: IbusResp = {
    ventana: 'docBitSegDetEquipo',
    buscarPor: '',
    clave: '',
    claveTxt: '',
    nombre: '',
  };

  _accion: string = 'E';
  _accionTxt: string = '';

  constructor(
    private _servicios: ServiciosService,
    private _router: Router,
    private _toastr: ToastrService,
    private _svrUtilierias: srvUtileriasService
  ) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('ItemDet')) {
      this._ItemDet = JSON.parse(sessionStorage.getItem('ItemDet')!);
      this._accion = this._ItemDet.idBitacora == 0 ? 'N' : 'E';
    } else {
      this._accion = 'N';
    }

    this._Item = JSON.parse(sessionStorage.getItem('Item')!);

    this._ItemDet.docBitacora = this._Item.docBitacora;
    this._ItemDet.idObra = this._Item.idObra;
    this._ItemDet.obraNom = this._Item.obraNom;
    this._ItemDet.idSupervisor = this._Item.idSupervisor;
    this._ItemDet.supervisorNom = this._Item.supervisorNom;
    this._ItemDet.area = this._Item.area;
    this._ItemDet.fecha = this._Item.fecha;
    this._ItemDet.hora_inicio = this._Item.hora_inicio;
    this._ItemDet.hora_termino = this._Item.hora_termino;
    this._ItemDet.horaInicio = this._Item.horaInicio;
    this._ItemDet.horaTermino = this._Item.horaTermino;

    if (sessionStorage.getItem('busResp')) {
      this._BusResp = JSON.parse(sessionStorage.getItem('busResp')!);

      if (this._BusResp.buscarPor == 'Equipos') {
        this._ItemDet.idEconomicoTXT = this._BusResp.claveTxt;
        this._ItemDet.equipoNom = this._BusResp.nombre;
      }

      if (this._BusResp.buscarPor == 'Operadores') {
        this._ItemDet.idOperadorTXT = this._BusResp.claveTxt;
        this._ItemDet.operadorNom = this._BusResp.nombre;
      }
    }

    this._accionTxt = this._accion == 'E' ? 'Editando' : 'Nuevo';
  }

  btnGuardar() {
    // OBTENER ID DEL TEXTO INPUT
    if (this._ItemDet.idEconomicoTXT) {
      var item = this._ItemDet.idEconomicoTXT.split('|');
      this._ItemDet.idEconomico = item[0].trim();
      this._ItemDet.equipoNom = item[1].trim();
    } else {
      this._toastr.error('Guardar.', 'Equipo requerido.');
      return;
    }

    if (this._ItemDet.idOperadorTXT) {
      var item = this._ItemDet.idOperadorTXT.split('|');
      this._ItemDet.idOperador = item[0].trim();
      this._ItemDet.operadorNom = item[1].trim();
    } else {
      this._toastr.error('Guardar.', 'Operador requerdio');
      return;
    }

    if (this._ItemDet.actividad == null) {
      this._toastr.error('Guardar.', 'Actividad requerdio');
      return;
    }

    if (this._ItemDet.pto_exacto == null) {
      this._toastr.error('Guardar.', 'Puntao exacto requerdio');
      return;
    }

    this._ItemDet.idUsuario = sessionStorage.getItem('idUsuario')!;

    if (this.validaObservaciones(this._ItemDet) == false) return;

    let lAccionRecurso: string = 'bitSeg/insItem';

    if (this._accion == 'E') lAccionRecurso = 'bitSeg/updItem';

    this._servicios.wsGeneral(lAccionRecurso, this._ItemDet).subscribe(
      (resp) => {
        this._ItemDet = resp;
      },
      (error) =>
        this._toastr.error(
          'Error : ' + error.error.ExceptionMessage,
          'Guardar equipo.'
        ),
      () => {
        this._Item.docBitacora = this._ItemDet.docBitacora;
        if (this._accion == 'N') this._Item.ListadoBitSeg.push(this._ItemDet);
        else
          this._Item.ListadoBitSeg = this._Item.ListadoBitSeg.map((x) =>
            x.idBitacora == this._ItemDet.idBitacora ? this._ItemDet : x
          );

        this._ItemDet.idEconomicoTXT =
          this._ItemDet.idEconomico + ' | ' + this._ItemDet.equipoNom;
        this._ItemDet.idOperadorTXT =
          this._ItemDet.idOperador + ' | ' + this._ItemDet.operadorNom;
        sessionStorage.setItem('ItemDet', JSON.stringify(this._ItemDet));

        this._toastr.success('Registro guardado.');
        this.btnRegresar();
      }
    );
  }

  buscarEquipo() {
    sessionStorage.setItem('ItemDet', JSON.stringify(this._ItemDet));
    sessionStorage.setItem('busResp', JSON.stringify(this._BusResp));
    this._router.navigate(['/busEquipos']);
  }

  buscarObra() {
    sessionStorage.setItem('ItemDet', JSON.stringify(this._ItemDet));
    sessionStorage.setItem('busResp', JSON.stringify(this._BusResp));
    this._router.navigate(['/busObras']);
  }

  buscarOperador() {
    sessionStorage.setItem('ItemDet', JSON.stringify(this._ItemDet));
    sessionStorage.setItem('busResp', JSON.stringify(this._BusResp));
    this._router.navigate(['/busOperadores']);
  }

  btnAgregar() {}

  btnRegresar() {
    sessionStorage.setItem('Item', JSON.stringify(this._Item));
    sessionStorage.removeItem('busResp');
    this._router.navigate(['/docBitSegDet']);
  }

  validaObservaciones(itemDet: IBitSegDetail): boolean {
    if (itemDet.chequeo_medico != 'X')
      if (
        itemDet.chequeo_medico_obs == null ||
        itemDet.chequeo_medico_obs == ''
      ) {
        this._toastr.error(
          'Chequeo medico: Observación Requerido!',
          'Guardar equipo.'
        );
        return false;
      }

    if (itemDet.checklist_maq_equip != 'X')
      if (
        itemDet.checklist_maq_equip_obs == null ||
        itemDet.checklist_maq_equip_obs == ''
      ) {
        this._toastr.error(
          'Check List Equipo: Observación Requerido!',
          'Guardar equipo.'
        );
        return false;
      }

    if (itemDet.apr != 'X')
      if (itemDet.apr_obs == null || itemDet.apr_obs == '') {
        this._toastr.error('A P R: Observación Requerido!', 'Guardar equipo.');
        return false;
      }

    if (itemDet.permiso_instancia != 'X')
      if (
        itemDet.permiso_instancia_obs == null ||
        itemDet.permiso_instancia_obs == ''
      ) {
        this._toastr.error(
          'Permiso instancia: Observación Requerido!',
          'Guardar equipo.'
        );
        return false;
      }

    if (itemDet.dc3 != 'X')
      if (itemDet.dc3_obs == null || itemDet.dc3_obs == '') {
        this._toastr.error('DC3: Observación Requerido!', 'Guardar equipo.');
        return false;
      }

    if (itemDet.extintor != 'X')
      if (itemDet.extintor_obs == null || itemDet.extintor_obs == '') {
        this._toastr.error(
          'Extintor: Observación Requerido!',
          'Guardar equipo.'
        );
        return false;
      }

    if (itemDet.kit_antiderrames != 'X')
      if (
        itemDet.kit_antiderrames_obs == null ||
        itemDet.kit_antiderrames_obs == ''
      ) {
        this._toastr.error(
          'Kit antiderrames: Observación Requerido!',
          'Guardar equipo.'
        );
        return false;
      }

    if (itemDet.platica_5min != 'X')
      if (itemDet.platica_5min_obs == null || itemDet.platica_5min_obs == '') {
        this._toastr.error(
          'Platica 5 minutos: Observación Requerido!',
          'Guardar equipo.'
        );
        return false;
      }

    if (itemDet.epp != 'X')
      if (itemDet.epp_obs == null || itemDet.epp_obs == '') {
        this._toastr.error('EPP: Observación Requerido!', 'Guardar equipo.');
        return false;
      }

    if (itemDet.otro != 'X') {
      if (itemDet.otro_descrip == null || itemDet.otro_descrip == '') {
        this._toastr.error('Otro: Descripción Requerido!', 'Guardar equipo.');
        return false;
      }

      if (itemDet.otro_obs == null || itemDet.otro_obs == '') {
        this._toastr.error('Otro: Observación Requerido!', 'Guardar equipo.');
        return false;
      }
    }

    return true;
  }

  LimpiarFormulario() {
    this._ItemDet = {
      idBitacora: 0,
      docBitacora: 0,
      fecha: this._fechaActual,
      idSupervisor: '',
      idObra: '',
      area: '',
      hora_inicio: this._fechaActual,
      hora_termino: this._fechaActual,
      idEconomico: '',
      idOperador: '',
      actividad: '',
      pto_exacto: '',
      chequeo_medico: 'X',
      chequeo_medico_obs: '',
      checklist_maq_equip: 'X',
      checklist_maq_equip_obs: '',
      apr: 'X',
      apr_obs: '',
      permiso_instancia: 'X',
      permiso_instancia_obs: '',
      dc3: 'X',
      dc3_obs: '',
      extintor: 'X',
      extintor_obs: '',
      kit_antiderrames: 'X',
      kit_antiderrames_obs: '',
      platica_5min: 'X',
      platica_5min_obs: '',
      epp: 'X',
      epp_obs: '',
      otro: 'X',
      otro_descrip: '',
      otro_obs: '',
      idUsuario: '',
      idEconomicoTXT: '',
      idObraTXT: '',
      idOperadorTXT: '',
      supervisorNom: '',
      idSupervisorTXT: '',
      equipoNom: '',
      operadorNom: '',
      obraNom: '',
      horaInicio: '',
      horaTermino: '',
    };
  }

  ngAfterViewInit(): void {
    //
  }

  ngOnDestroy(): void {
    // sessionStorage.removeItem("busResp");
  }
}
