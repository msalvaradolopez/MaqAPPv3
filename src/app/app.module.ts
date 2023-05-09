import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { LoadingCircleComponent } from './loading-circle/loading-circle.component';
import { ServiciosService } from './servicios.service';
import { MenuGeneralComponent } from './menu-general/menu-general.component';
import { CatObrasComponent } from './cat-obras/cat-obras.component';
import { CatObrasDetComponent } from './cat-obras-det/cat-obras-det.component';
import { CatEquiposComponent } from './cat-equipos/cat-equipos.component';
import { CatEquiposDetComponent } from './cat-equipos-det/cat-equipos-det.component';
import { CatOperadoresComponent } from './cat-operadores/cat-operadores.component';
import { CatOperadoresDetComponent } from './cat-operadores-det/cat-operadores-det.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { ConTableroComponent } from './con-tablero/con-tablero.component';
import { BusEquiposComponent } from './bus-equipos/bus-equipos.component';
import { BusHorasMinutosComponent } from './bus-horas-minutos/bus-horas-minutos.component';
import { BusObrasComponent } from './bus-obras/bus-obras.component';
import { BusOperadoresComponent } from './bus-operadores/bus-operadores.component';
import { BusSupervisoresComponent } from './bus-supervisores/bus-supervisores.component';
import { DocUbicacionesComponent } from './doc-ubicaciones/doc-ubicaciones.component';
import { SinInformacionComponent } from './sin-informacion/sin-informacion.component';
import { DocUbicacionesDetComponent } from './doc-ubicaciones-det/doc-ubicaciones-det.component';
import { DocBitSegComponent } from './doc-bit-seg/doc-bit-seg.component';
import { DocBitSegDetComponent } from './doc-bit-seg-det/doc-bit-seg-det.component';
import { DocBitSegDetEquipoComponent } from './doc-bit-seg-det-equipo/doc-bit-seg-det-equipo.component';
import { FrmBitSegComponent } from './frm-bit-seg/frm-bit-seg.component';
import { ConBitSegComponent } from './con-bit-seg/con-bit-seg.component';
import { ConUbicacionesComponent } from './con-ubicaciones/con-ubicaciones.component';
import { DocInsPecDetComponent } from './doc-ins-pec-det/doc-ins-pec-det.component';
import { DocInsPecComponent } from './doc-ins-pec/doc-ins-pec.component';
import { FiltrosInsPecComponent } from './filtros-ins-pec/filtros-ins-pec.component';
import { BusMantenimientoComponent } from './bus-mantenimiento/bus-mantenimiento.component';
import { ConInsPecComponent } from './con-ins-pec/con-ins-pec.component';
import { DocAbposComponent } from './doc-abpos/doc-abpos.component';
import { DocAbposdetComponent } from './doc-abposdet/doc-abposdet.component';
import { FiltrosAbposComponent } from './filtros-abpos/filtros-abpos.component';
import { ConAbposComponent } from './con-abpos/con-abpos.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    LoadingCircleComponent,
    MenuGeneralComponent,
    CatObrasComponent,
    CatObrasDetComponent,
    CatEquiposComponent,
    CatEquiposDetComponent,
    CatOperadoresComponent,
    CatOperadoresDetComponent,
    FiltrosComponent,
    ConTableroComponent,
    BusEquiposComponent,
    BusHorasMinutosComponent,
    BusObrasComponent,
    BusOperadoresComponent,
    BusSupervisoresComponent,
    DocUbicacionesComponent,
    SinInformacionComponent,
    DocUbicacionesDetComponent,
    DocBitSegComponent,
    DocBitSegDetComponent,
    DocBitSegDetEquipoComponent,
    FrmBitSegComponent,
    ConBitSegComponent,
    ConUbicacionesComponent,
    DocInsPecDetComponent,
    DocInsPecComponent,
    FiltrosInsPecComponent,
    BusMantenimientoComponent,
    ConInsPecComponent,
    DocAbposComponent,
    DocAbposdetComponent,
    FiltrosAbposComponent,
    ConAbposComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [ServiciosService],
  bootstrap: [AppComponent],
})
export class AppModule {}
