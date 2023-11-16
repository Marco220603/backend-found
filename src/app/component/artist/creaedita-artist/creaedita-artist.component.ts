import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router,Params } from '@angular/router';
import { Artist } from 'src/app/model/artist';
import { Gender } from 'src/app/model/gender';
import { ArtistService } from 'src/app/services/artist.service';
import { GenderService } from 'src/app/services/gender.service';

@Component({
  selector: 'app-creaedita-artist',
  templateUrl: './creaedita-artist.component.html',
  styleUrls: ['./creaedita-artist.component.css']
})
export class CreaeditaArtistComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  artist: Artist = new Artist();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;
  listaGenders: Gender[]=[]

constructor(
  private aS:ArtistService,
  private router:Router,
  private formBuilder: FormBuilder,
  private route:ActivatedRoute,
  private gS:GenderService){}

ngOnInit(): void {
  this.route.params.subscribe((data:Params)=> {
    this.id = data['id'];
    this.edicion = data['id'] != null;
    this.init();
  });
  this.form = this.formBuilder.group({
    idartist:['',],
    nameartist:['', Validators.required],
    gender:['', Validators.required]
  });
  this.gS.list().subscribe(data=>{
    this.listaGenders = data;
  })
}

registrar(){
  if(this.form.valid){
    this.artist.idartist=this.form.value.idartist;
    this.artist.nameartist = this.form.value.nameartist;
    this.artist.gender.idGender = this.form.value.gender

    if(this.edicion){
      this.aS.update(this.artist).subscribe(()=>{
        this.aS.list().subscribe(data=>{
          this.aS.setList(data);
        })
      })
    }else{
      this.aS.insert(this.artist).subscribe((data)=>{
        this.aS.list().subscribe((data)=>{
          this.aS.setList(data);
        })
      })
    }
    this.router.navigate(['artists'])
  }else{
    this.mensaje = 'Revise los campos!!!';
  }
}

init(){
  if(this.edicion){
    this.aS.listId(this.id).subscribe((data)=>{
      this.form = new FormGroup({
        idartist: new FormControl(data.idartist),
        nameartist: new FormControl(data.nameartist),
        gender: new FormControl(data.gender.idGender)
      });
      });
    }
}

obtenerControlCampo(nombreCampo: string): AbstractControl {
  const control = this.form.get(nombreCampo);
  if (!control) {
    throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
  }
  return control;
}

}
