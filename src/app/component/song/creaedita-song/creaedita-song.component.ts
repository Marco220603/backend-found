import { Songs } from './../../../model/song';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as moment from 'moment';
import { Artist } from 'src/app/model/artist';
import { Gender } from 'src/app/model/gender';
import { ArtistService } from 'src/app/services/artist.service';
import { GenderService } from 'src/app/services/gender.service';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-creaedita-song',
  templateUrl: './creaedita-song.component.html',
  styleUrls: ['./creaedita-song.component.css']
})
export class CreaeditaSongComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  Songs:Songs = new Songs();
  fechaSong:string=""
  listaGeneros: Gender[] = []
  listaArtistas:Artist[] = []
  id:number=0
  mensaje: string='';
  edicion: boolean=false;
  maxFecha: Date = moment().add(-1, 'days').toDate();

  constructor(
    private tS:SongsService,
    private gS:GenderService,
    private aS:ArtistService,
    private router:Router,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params) =>{
      this.id = data['id'];
      this.edicion=data['id'] != null
      this.init();
    });
    this.form = this.formBuilder.group({
      idSong:['',],
      nameSong:['',Validators.required],
      gender:['',Validators.required],
      artist:['',Validators.required],
      fechaSong:['',Validators.required],
    });
    this.gS.list().subscribe(data => {
      this.listaGeneros = data
    })
    this.aS.list().subscribe(data =>{
      this.listaArtistas = data
    })
  }
  registrar() {
    if (this.form.valid) {
      this.Songs.idSong = this.form.value.idSong;
      this.Songs.nameSong = this.form.value.nameSong;
      this.Songs.gender.idGender = this.form.value.gender;
      this.Songs.artist.idArtist = this.form.value.artist;
      this.Songs.fechaSong = this.form.value.fechaSong
      if(this.edicion){
        this.tS.update(this.Songs).subscribe(()=>{
          this.tS.list().subscribe(data =>{
            this.tS.setList(data)
          })
        })
      }else{  
        this.tS.insert(this.Songs).subscribe(data => {
          this.tS.list().subscribe(data => {
            this.tS.setList(data);
          })
        })
      }
      this.router.navigate(['/components/canciones']);
    } else {
      this.mensaje = "Ingrese todos los campos!!!"
    }
  }
  obtenerControlCampo(nombreCampo: string): AbstractControl {
    const control = this.form.get(nombreCampo);
    if (!control) {
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
  init(){
    if(this.edicion){
      this.tS.listId(this.id).subscribe((data) =>{
        this.form = new FormGroup({
          idSong:new FormControl(data.idSong),
          nameSong:new FormControl(data.nameSong),
          gender:new FormControl(data.gender),
          artist:new FormControl(data.artist),
          fechaSong:new FormControl(data.fechaSong)
        })
      })
    }
  }
}
