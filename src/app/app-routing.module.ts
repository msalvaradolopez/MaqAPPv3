import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatObrasDetComponent } from './cat-obras-det/cat-obras-det.component';
import { CatObrasComponent } from './cat-obras/cat-obras.component';
import { LoginComponent } from './login/login.component';
import { MenuGeneralComponent } from './menu-general/menu-general.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'menuGeneral', component: MenuGeneralComponent },
  { path: 'catObras', component: CatObrasComponent },
  { path: 'catObrasDet', component: CatObrasDetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
