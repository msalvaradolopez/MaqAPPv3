export interface IDesvio {
  idDesvio: number;
  numTabulador: string;
  area: string;
  fecha: Date;
  idSupervisor: string;
  idObra: string;
  idOperador: string;
  evento: string;
  estado_prisa: boolean;
  estado_frustacion: boolean;
  estado_fatiga: boolean;
  estado_complacencia: boolean;
  error_ojos_no_tarea: boolean;
  error_mente_no_tarea: boolean;
  error_mala_colocacion: boolean;
  error_perdida_equilibrio: boolean;
  observaciones: string;
  caidas: boolean;
  golpes: boolean;
  quemaduras: boolean;
  asfixia: boolean;
  eletrocucion: boolean;
  objetos_que_golpean: boolean;
  accidentes_vehiculares: boolean;
  actitud: boolean;
  procedimiento_de_trabajo: boolean;
  permiso_de_trabajo: boolean;
  e_p_p: boolean;
  herremientas_y_equipos: boolean;
  posicion_de_las_personas: boolean;
  orden_y_limpieza: boolean;
  reaccion_de_la_persona: boolean;
  compromiso_establecido: string;
  nomSupervisor: string;
  nomOperador: string;
  nomObra: string;
}
