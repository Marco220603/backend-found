import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Temper } from 'src/app/model/temper';
import { TemperService } from 'src/app/services/temper.service';
import { Router } from '@angular/router';
import { Gender } from 'src/app/model/gender';
import { GenderService } from 'src/app/services/gender.service';

@Component({
  selector: 'app-creaedita-temper',
  templateUrl: './creaedita-temper.component.html',
  styleUrls: ['./creaedita-temper.component.css']
})
export class CreaeditaTemperComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  temper:Temper = new Temper();
  descriptiontemper:string=""
  minScore:number=0
  listaGenders: Gender[] = []
  mensaje: string='';  

  constructor(
    private tS:TemperService,
    private gS:GenderService,
    private router:Router,
    private formBuilder:FormBuilder,
  ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      genero: ['', Validators.required],
      minScore: ['', Validators.required],
    });
    this.gS.list().subscribe(data => {
      this.listaGenders = data
    })
  }
  registrar() {
    if (this.form.valid) {
      this.temper.descriptiontemper = this.form.value.descripcion;
      console.log(this.temper.descriptiontemper)
      this.temper.minScore = this.form.value.minScore;
      this.temper.nametemper = this.form.value.nombre;
      this.temper.Gender.idGender = this.form.value.genero;
      this.tS.insert(this.temper).subscribe(data => {
        this.tS.list().subscribe(data => {
          this.tS.setList(data);
        })
      })
      this.router.navigate(['/components/tempers'])
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
}
