import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Gender } from "src/app/model/gender";
import { Temper } from "src/app/model/temper";
import { GenderService } from "src/app/services/gender.service";
import { TemperService } from "src/app/services/temper.service";


@Component({
  selector: 'app-creaedita-temper',
  templateUrl: './creaedita-temper.component.html',
  styleUrls: ['./creaedita-temper.component.css']
})
export class CreaeditaTemperComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  temper:Temper = new Temper();
  description:string="";
  ListaGeneros:Gender[]=[];
  mensaje: string='';
  id:number=0;
  edicion:boolean=false;

  constructor(
    private tS:TemperService,
    private router:Router,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute,
    private gS:GenderService
  ){}

  ngOnInit(): void {
      this.route.params.subscribe((data: Params)=>{
        this.id = data['id'];
        this.edicion = data['id'] != null
        this.init();
      });
      this.form = this.formBuilder.group({
        idTemper:['',],
        nameTemper:['',Validators.required],
        descriptionTemper:['',Validators.required],
        minScore:['',Validators.required],
        gender:['',Validators.required],
      });
      this.gS.list().subscribe(data =>{
        this.ListaGeneros = data
      })
  }

  registrar(){
    if(this.form.valid){
      this.temper.idTemper=this.form.value.idTemper;
      this.temper.nameTemper=this.form.value.nameTemper;
      this.temper.descriptionTemper=this.form.value.descriptionTemper;
      this.temper.minScore=this.form.value.minScore;
      this.temper.gender.idGender=this.form.value.gender;

      if(this.edicion){
        this.tS.update(this.temper).subscribe(()=>{
          this.tS.list().subscribe(data=>{
            this.tS.setList(data);
          })
        })
      }else{
        this.tS.insert(this.temper).subscribe((data)=>{
          this.tS.list().subscribe((data) =>{
            this.tS.setList(data);
          });
        });
      }
      this.router.navigate(['components/tempers'])
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
      this.tS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          idTemper: new FormControl(data.idTemper),
          nameTemper:new FormControl(data.nameTemper),
          descriptionTemper:new FormControl(data.descriptionTemper),
          minScore:new FormControl(data.minScore),
          idGender:new FormControl(data.gender.idGender),
        });
      });
    }
  }
}
