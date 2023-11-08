import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Gender } from 'src/app/model/gender';
import { GenderService } from 'src/app/services/gender.service';

@Component({
  selector: 'app-creaedita-gender',
  templateUrl: './creaedita-gender.component.html',
  styleUrls: ['./creaedita-gender.component.css']
})
export class CreaeditaGenderComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  gender:Gender = new Gender();
  mensaje: string='';
  id:number=0;
  edicion:boolean=false;

  constructor(
    private gS:GenderService,
    private router:Router,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
      this.route.params.subscribe((data: Params)=>{
        this.id = data['id'];
        this.edicion = data['id'] != null
        this.init();
      });
      this.form = this.formBuilder.group({
        idGender:['',],
        nameGender:['',Validators.required]
      });
  }

  registrar(){
    if(this.form.valid){
      this.gender.idGender=this.form.value.idGender;
      this.gender.nameGender=this.form.value.nameGender;

      if(this.edicion){
        this.gS.update(this.gender).subscribe(()=>{
          this.gS.list().subscribe(data=>{
            this.gS.setList(data);
          })
        })
      }else{
        this.gS.insert(this.gender).subscribe((data)=>{
          this.gS.list().subscribe((data) =>{
            this.gS.setList(data);
          });
        });
      }
      this.router.navigate(['components/genders'])
      }else{
        this.mensaje='revise los campos'
      }
  }
  obtenerControlCampo(nombreCampo:string):AbstractControl{
    const control = this.form.get(nombreCampo);
    if(!control){
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control
  }
  init(){
    if(this.edicion){
      this.gS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          idGender: new FormControl(data.idGender),
          nameGender: new FormControl(data.nameGender)
        });
      });
    }
  }
}
