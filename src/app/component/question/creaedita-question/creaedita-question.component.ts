import { Component,OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Question } from 'src/app/model/question';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-creaedita-question',
  templateUrl: './creaedita-question.component.html',
  styleUrls: ['./creaedita-question.component.css']
})
export class CreaeditaQuestionComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  question:Question=new Question();
  mensaje: string = '';
  id: number = 0;
  edicion: boolean = false;

  constructor(
    private qS:QuestionsService,
    private router:Router,
    private formBuilder:FormBuilder,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.route.params.subscribe((data:Params)=>{
      this.id = data['id'];
      this.edicion = data['id'] != null
      this.init()
    });
    this.form = this.formBuilder.group({
      id:['',],
      question:['',Validators.required],
      alternative1:['',Validators.required],
      alternative2:['',Validators.required],
      alternative3:['',Validators.required]
    })
  }

  registrar(){
    if(this.form.valid){
      this.question.id = this.form.value.id;
      this.question.question=this.form.value.question;
      this.question.alternative1=this.form.value.alternative1;
      this.question.alternative2=this.form.value.alternative2;
      this.question.alternative3=this.form.value.alternative3;
      if(this.edicion){
        this.qS.update(this.question).subscribe(()=>{
          this.qS.list().subscribe(data =>{
            this.qS.setList(data);
          })
        })
      }else{
        this.qS.insert(this.question).subscribe((data)=>{
          this.qS.list().subscribe((data)=>{
            this.qS.setList(data);
          })
        })
      }
      this.router.navigate(['components/preguntas']);
    }else{
      this.mensaje = 'tamal'
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
      this.qS.listId(this.id).subscribe((data)=>{
        this.form= new FormGroup({
          id:new FormControl(data.id),
          question:new FormControl(data.question),
          alternative1:new FormControl(data.alternative1),
          alternative2:new FormControl(data.alternative2),
          alternative3: new FormControl(data.alternative3),
        })
      })
    }
  }
}
