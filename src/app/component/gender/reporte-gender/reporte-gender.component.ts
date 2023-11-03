import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Gender } from 'src/app/model/gender';
import { GenderService } from 'src/app/services/gender.service';

@Component({
  selector: 'app-reporte-gender',
  templateUrl: './reporte-gender.component.html',
  styleUrls: ['./reporte-gender.component.css']
})
export class ReporteGenderComponent implements OnInit{
  dataSource:MatTableDataSource<Gender> = new MatTableDataSource<Gender>();
  fechaForm : FormGroup = new FormGroup({});
  mensaje: string= '';
  fechaVacia:boolean = false;

  displayedColums: string[] = ['codigo','genero'];

  constructor(private gS:GenderService,private formBuilder:FormBuilder){  }

  ngOnInit(): void {
      this.fechaForm = this.formBuilder.group({
        fecha: [null,Validators.required],
      });
  }

  buscar(){
    if(this.fechaForm.valid){
      const fechas = this.fechaForm.value.fecha.toISOString().substring(0,10);
      this.gS.buscar(fechas).subscribe((data)=>{
        this.dataSource.data=data;
        if(data.length===0){
          this.mensaje=" No se encontraron resultados para la fecha seleccionada.";
        }else{
          this.mensaje='';
        }
      });
    }else{
      if(this.fechaForm.get('fecha')?.hasError('required')){
         this.mensaje='ingrese fecha' 
      }
    }
  }

  obtenerControlCampo(nombreCampo:string):AbstractControl{
    const control = this.fechaForm.get(nombreCampo);
    if(!control){
      throw new Error(`Control no encontrado para el campo ${nombreCampo}`);
    }
    return control;
  }
}
