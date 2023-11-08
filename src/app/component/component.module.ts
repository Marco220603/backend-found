import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatListModule } from '@angular/material/list';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { GenderComponent } from './gender/gender.component';
import { ComponentRoutingModule } from './component-routing.module';
import { ArtistComponent } from './artist/artist.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { ListarArtistComponent } from './artist/listar-artist/listar-artist.component';
import { ListarGenderComponent } from './gender/listar-gender/listar-gender.component';
import { ListarPlaylistComponent } from './playlist/listar-playlist/listar-playlist.component';
import { CreaeditaArtistComponent } from './artist/creaedita-artist/creaedita-artist.component';
import { CreaeditaGenderComponent } from './gender/creaedita-gender/creaedita-gender.component';
import { CreaeditaPlaylistComponent } from './playlist/creaedita-playlist/creaedita-playlist.component';
import { SongComponent } from './song/song.component';
import { CreaeditaSongComponent } from './song/creaedita-song/creaedita-song.component';
import { ListarSongComponent } from './song/listar-song/listar-song.component';
import { ReporteGenderComponent } from './gender/reporte-gender/reporte-gender.component';
import { ArtistReporteComponent } from './artist/artist-reporte/artist-reporte.component';
import { TemperComponent } from './temper/temper.component';
import { CreaeditaTemperComponent } from './temper/creaedita-temper/creaedita-temper.component';
import { ListarTemperComponent } from './temper/listar-temper/listar-temper.component';
import { ReporteTemperComponent } from './temper/reporte-temper/reporte-temper.component';

@NgModule({
  declarations: [
    GenderComponent,
    ArtistComponent,
    PlaylistComponent,
    ListarArtistComponent,
    ListarGenderComponent,
    ListarPlaylistComponent,
    CreaeditaArtistComponent,
    CreaeditaGenderComponent,
    CreaeditaPlaylistComponent,
    SongComponent,
    CreaeditaSongComponent,
    ListarSongComponent,
    ReporteGenderComponent,
    ArtistReporteComponent,
    TemperComponent,
    CreaeditaTemperComponent,
    ListarTemperComponent,
    ReporteTemperComponent,
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    HttpClientModule,
    MatListModule,
    MatDatepickerModule,
    MatButtonModule,
    MatTableModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatIconModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule
  ],
})
export class ComponentModule { }
