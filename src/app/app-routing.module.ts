import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusEquiposComponent } from './bus-equipos/bus-equipos.component';
import { BusHorasMinutosComponent } from './bus-horas-minutos/bus-horas-minutos.component';
import { BusMantenimientoComponent } from './bus-mantenimiento/bus-mantenimiento.component';
import { BusObrasComponent } from './bus-obras/bus-obras.component';
import { BusOperadoresComponent } from './bus-operadores/bus-operadores.component';
import { BusSupervisoresComponent } from './bus-supervisores/bus-supervisores.component';
import { CatEquiposDetComponent } from './cat-equipos-det/cat-equipos-det.component';
import { CatEquiposComponent } from './cat-equipos/cat-equipos.component';
import { CatObrasDetComponent } from './cat-obras-det/cat-obras-det.component';
import { CatObrasComponent } from './cat-obras/cat-obras.component';
import { CatOperadoresDetComponent } from './cat-operadores-det/cat-operadores-det.component';
import { CatOperadoresComponent } from './cat-operadores/cat-operadores.component';
import { ConAbposComponent } from './con-abpos/con-abpos.component';
import { ConBitSegComponent } from './con-bit-seg/con-bit-seg.component';
import { ConInsPecComponent } from './con-ins-pec/con-ins-pec.component';
import { ConTableroComponent } from './con-tablero/con-tablero.component';
import { ConUbicacionesComponent } from './con-ubicaciones/con-ubicaciones.component';
import { DocAbposComponent } from './doc-abpos/doc-abpos.component';
import { DocAbposdetComponent } from './doc-abposdet/doc-abposdet.component';
import { DocBitSegDetEquipoComponent } from './doc-bit-seg-det-equipo/doc-bit-seg-det-equipo.component';
import { DocBitSegDetComponent } from './doc-bit-seg-det/doc-bit-seg-det.component';
import { DocBitSegComponent } from './doc-bit-seg/doc-bit-seg.component';
import { DocInsPecDetComponent } from './doc-ins-pec-det/doc-ins-pec-det.component';
import { DocInsPecComponent } from './doc-ins-pec/doc-ins-pec.component';
import { DocUbicacionesDetComponent } from './doc-ubicaciones-det/doc-ubicaciones-det.component';
import { DocUbicacionesComponent } from './doc-ubicaciones/doc-ubicaciones.component';
import { FiltrosAbposComponent } from './filtros-abpos/filtros-abpos.component';
import { FiltrosInsPecComponent } from './filtros-ins-pec/filtros-ins-pec.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { FrmBitSegComponent } from './frm-bit-seg/frm-bit-seg.component';
import { LoginComponent } from './login/login.component';
import { MenuGeneralComponent } from './menu-general/menu-general.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menuGeneral', component: MenuGeneralComponent },
  { path: 'catObras', component: CatObrasComponent },
  { path: 'catObrasDet', component: CatObrasDetComponent },
  { path: 'catEquipos', component: CatEquiposComponent },
  { path: 'catEquiposDet', component: CatEquiposDetComponent },
  { path: 'catOperadores', component: CatOperadoresComponent },
  { path: 'catOperadoresDet', component: CatOperadoresDetComponent },
  { path: 'filtros', component: FiltrosComponent },
  { path: 'conTablero', component: ConTableroComponent },
  { path: 'busEquipos', component: BusEquiposComponent },
  { path: 'busHorasMinutos', component: BusHorasMinutosComponent },
  { path: 'busObras', component: BusObrasComponent },
  { path: 'busOperadores', component: BusOperadoresComponent },
  { path: 'busSupervisores', component: BusSupervisoresComponent },
  { path: 'busMantenimiento', component: BusMantenimientoComponent },
  { path: 'docUbicaciones', component: DocUbicacionesComponent },
  { path: 'docUbicacionesDet', component: DocUbicacionesDetComponent },
  { path: 'docBitSeg', component: DocBitSegComponent },
  { path: 'docBitSegDet', component: DocBitSegDetComponent },
  { path: 'docBitSegDetEquipo', component: DocBitSegDetEquipoComponent },
  { path: 'frmBitSeg', component: FrmBitSegComponent },
  { path: 'conBitSeg', component: ConBitSegComponent },
  { path: 'conUbicaciones', component: ConUbicacionesComponent },
  { path: 'docInsPec', component: DocInsPecComponent },
  { path: 'docInsPecDet', component: DocInsPecDetComponent },
  { path: 'conInsPec', component: ConInsPecComponent },
  { path: 'FiltrosInsPec', component: FiltrosInsPecComponent },
  { path: 'docAbPos', component: DocAbposComponent },
  { path: 'FiltrosAbPos', component: FiltrosAbposComponent },
  { path: 'docAbPosDet', component: DocAbposdetComponent },
  { path: 'conAbPos', component: ConAbposComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
