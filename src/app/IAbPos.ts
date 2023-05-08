export interface IAbPos {
  idAbordaje: number;
  fecha: Date;
  idSupervisor: string;
  idObra: string;
  idOperador: string;
  riesgo: string;
  desvio: string;
  casco: boolean;
  lentes: boolean;
  guantes: boolean;
  uniforme: boolean;
  zapatos: boolean;
  uni_fajado: boolean;
  tapones: boolean;
  mascarilla: boolean;
  careta: boolean;
  arnes: boolean;
  polainas: boolean;
  peto: boolean;
  gogles: boolean;
  otros: boolean;
  otro_descrip: string;
  act_inseguros: string;
  acc_correctiva: string;
  cond_inseguras: string;
  compromisos: string;

  nomSupervisor: string;
  nomOperador: string;
  nomObra: string;
}
