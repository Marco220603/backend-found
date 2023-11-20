import { Songs } from './../../../model/song';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Gender } from 'src/app/model/gender';
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
  mensaje: string='';  
  id:number=0;
  edicion:boolean=false;
  

  constructor(
    private tS:SongsService,
    private gS:GenderService,
    private router:Router,
    private formBuilder:FormBuilder,
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      genero: ['', Validators.required],
      
    });
    this.gS.list().subscribe(data => {
      this.listaGeneros = data
    })
  }
  registrar() {
    if (this.form.valid) {
      this.Songs.nameSong = this.form.value.nombre;
      this.Songs.idGender = this.form.value.genero;
      this.tS.insert(this.Songs).subscribe(data => {
        this.tS.list().subscribe(data => {
          this.tS.setList(data);
        })
      })
      this.router.navigate(['/components/song'])
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
      this.tS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          idSong: new FormControl(data.idSong),
          idGender: new FormControl(data.idGender),
        });
      });
    }
  }
}
