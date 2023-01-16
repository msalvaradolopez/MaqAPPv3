export interface IBitSegDetail {
    idBitacora: number;
    docBitacora: number;
    fecha: Date;
    idSupervisor: string;
    idObra: string;
    area: string;
    hora_inicio: Date;
    hora_termino: Date;
    idEconomico: string;
    idOperador: string;
    actividad: string;
    pto_exacto: string;
    chequeo_medico: string;
    chequeo_medico_obs: string;
    checklist_maq_equip: string;
    checklist_maq_equip_obs: string;
    apr: string;
    apr_obs: string;
    permiso_instancia: string;
    permiso_instancia_obs: string;
    dc3: string;
    dc3_obs: string;
    extintor: string;
    extintor_obs: string;
    kit_antiderrames: string;
    kit_antiderrames_obs: string;
    platica_5min: string;
    platica_5min_obs: string;
    epp: string;
    epp_obs: string;
    otro: string;
    otro_descrip: string;
    otro_obs: string;
    idUsuario: string;
    idEconomicoTXT: string;
    idObraTXT: string;
    idOperadorTXT: string;
    supervisorNom: string;
    idSupervisorTXT: string;
    equipoNom: string;
    operadorNom: string;
    obraNom: string;
    horaInicio: string;
    horaTermino: string;
}