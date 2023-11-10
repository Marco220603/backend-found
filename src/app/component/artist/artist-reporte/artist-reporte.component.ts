import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Gender } from 'src/app/model/gender';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-artist-reporte',
  templateUrl: './artist-reporte.component.html',
  styleUrls: ['./artist-reporte.component.css']
})
export class ArtistReporteComponent implements OnInit {
  dataSource:MatTableDataSource<Gender> = new MatTableDataSource<Gender>();
  fechaForm : FormGroup = new FormGroup({});
  mensaje: string= '';
  fechaVacia:boolean = false;

  displayedColums: string[] = ['codigo','nombre','genero'];

  constructor(private aS:ArtistService,private formBuilder:FormBuilder){  }

  ngOnInit(): void {
      this.fechaForm = this.formBuilder.group({
        fecha: [null,Validators.required],
      });
  }

  buscar(){
    if(this.fechaForm.valid){
      const fechas = this.fechaForm.value.fecha.toISOString().substring(0,10);
      this.aS.buscar(fechas).subscribe((data)=>{
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

