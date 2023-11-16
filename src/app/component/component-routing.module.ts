import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenderComponent } from './gender/gender.component';
import { CreaeditaGenderComponent } from './gender/creaedita-gender/creaedita-gender.component';
import { InicioComponent } from './inicio/inicio.component';
import { TemperComponent } from './temper/temper.component';
import { CreaeditaTemperComponent } from './temper/creaedita-temper/creaedita-temper.component';
import { ArtistComponent } from './artist/artist.component';
import { CreaeditaArtistComponent } from './artist/creaedita-artist/creaedita-artist.component';


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
        path: 'artist',
        component:ArtistComponent,
        children:[
            {path:'nuevo',component:CreaeditaArtistComponent},
            {path:'ediciones/:id',component:CreaeditaArtistComponent},
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
