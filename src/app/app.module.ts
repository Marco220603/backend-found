import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import{MatNativeDateModule} from '@angular/material/core'
import {MatPaginatorModule} from '@angular/material/paginator'
import { MatMenuModule } from '@angular/material/menu';
import{MatIconModule} from '@angular/material/icon';
import { ArtistComponent } from './component/artist/artist.component';
import { PlaylistComponent } from './component/playlist/playlist.component';
import { GenderComponent } from './component/gender/gender.component';
import { ListarArtistComponent } from './component/artist/listar-artist/listar-artist.component';
import { ListarGenderComponent } from './component/gender/listar-gender/listar-gender.component';
import { ListarPlaylistComponent } from './component/playlist/listar-playlist/listar-playlist.component';
import { CreaeditaArtistComponent } from './component/artist/creaedita-artist/creaedita-artist.component';
import { CreaeditaGenderComponent } from './component/gender/creaedita-gender/creaedita-gender.component';
import { CreaeditaPlaylistComponent } from './component/playlist/creaedita-playlist/creaedita-playlist.component';
import { SongComponent } from './component/song/song.component';
import { CreaeditaSongComponent } from './component/song/creaedita-song/creaedita-song.component';
import { ListarSongComponent } from './component/song/listar-song/listar-song.component';
import { ReporteGenderComponent } from './component/gender/reporte-gender/reporte-gender.component';

@NgModule({
  declarations: [
    AppComponent,
    ArtistComponent,
    PlaylistComponent,
    GenderComponent,
    ListarArtistComponent,
    ListarGenderComponent,
    ListarPlaylistComponent,
    CreaeditaArtistComponent,
    CreaeditaGenderComponent,
    CreaeditaPlaylistComponent,
    SongComponent,
    CreaeditaSongComponent,
    ListarSongComponent,
    ReporteGenderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    FormsModule,
    MatInputModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
