import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenderComponent } from './component/gender/gender.component';
import { CreaeditaGenderComponent } from './component/gender/creaedita-gender/creaedita-gender.component';
import { ReporteGenderComponent } from './component/gender/reporte-gender/reporte-gender.component';

const routes: Routes = [
  {
    path: 'genders',component:GenderComponent,children:[
      {path:'nuevo',component:CreaeditaGenderComponent},
      {path:'ediciones/:id',component:CreaeditaGenderComponent},
      {path:'reporte',component:ReporteGenderComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
