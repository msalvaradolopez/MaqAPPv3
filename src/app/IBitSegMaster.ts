import { IBitSegDetail } from "./IBitSegDetail";

export interface IBitSegMaster {
    idBitacora: number;
    docBitacora: number;
    fecha: Date;
    idSupervisor: string;
    idObra: string;
    area: string;
    hora_inicio: Date;
    hora_termino: Date;
    supervisorNom: string;
    obraNom: string;
    ListadoBitSeg: IBitSegDetail[];
    idSupervisorTXT: string;
    idObraTXT: string;
    horaInicio: string;
    horaTermino: string;
}
