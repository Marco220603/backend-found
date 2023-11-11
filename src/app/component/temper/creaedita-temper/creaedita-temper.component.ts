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
  descripciontemper:string=""
  listaGeneros: Gender[] = []
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
    });
    this.gS.list().subscribe(data => {
      this.listaGeneros = data
    })
  }
  registrar() {
    if (this.form.valid) {
      this.temper.nametemper = this.form.value.nombre;
      this.temper.descripciontemper = this.form.value.descripcion;
      this.temper.genderid.idGender = this.form.value.genero;
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
