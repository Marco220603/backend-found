import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenderComponent } from './gender/gender.component';
import { CreaeditaGenderComponent } from './gender/creaedita-gender/creaedita-gender.component';
import { InicioComponent } from './inicio/inicio.component';
import { TemperComponent } from './temper/temper.component';
import { CreaeditaTemperComponent } from './temper/creaedita-temper/creaedita-temper.component';


const routes: Routes =[
    {
        path: 'genders',
        component:GenderComponent,
        children:[
            {path:'nuevo',component:CreaeditaGenderComponent},
            {path:'ediciones/:id',component:CreaeditaGenderComponent},
          ],
    },
    {
    path: 'tempers',
        component:TemperComponent,
        children:[
            {path:'nuevo',component:CreaeditaTemperComponent},
            {path:'ediciones/:id',component:CreaeditaTemperComponent},
        ],
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
