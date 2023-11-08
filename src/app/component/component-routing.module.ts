import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenderComponent } from './gender/gender.component';
import { CreaeditaGenderComponent } from './gender/creaedita-gender/creaedita-gender.component';
import { ReporteGenderComponent } from './gender/reporte-gender/reporte-gender.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes =[
    {
        path: 'genders',component:GenderComponent,children:[
            {path:'nuevo',component:CreaeditaGenderComponent},
            {path:'ediciones/:id',component:CreaeditaGenderComponent},
            {path:'reporte',component:ReporteGenderComponent}
          ]
    },
    {
        path:'inicio',component:InicioComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule], 
})
export class ComponentRoutingModule{}
