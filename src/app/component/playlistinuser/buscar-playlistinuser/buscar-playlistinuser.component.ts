import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Playlistinuser } from 'src/app/model/playlistinuser';
import { PlaylistinuserService } from 'src/app/services/playlistinuser.service';

@Component({
  selector: 'app-buscar-playlistinuser',
  templateUrl: './buscar-playlistinuser.component.html',
  styleUrls: ['./buscar-playlistinuser.component.css']
})
export class BuscarPlaylistinuserComponent {
  dataSource:MatTableDataSource<Playlistinuser> = new MatTableDataSource<Playlistinuser>();
  fechaForm : FormGroup = new FormGroup({});
  mensaje: string= '';
  fechaVacia:boolean = false;

  displayedColums: string[] = ['codigo','playlist'];

  constructor(private puS:PlaylistinuserService,private formBuilder:FormBuilder){  }

  ngOnInit(): void {
      this.fechaForm = this.formBuilder.group({
        fecha: [null,Validators.required],
      });
  }

  buscar(){
    if(this.fechaForm.valid){
      const fechas = this.fechaForm.value.fecha.toISOString().substring(0,10);
      this.puS.buscar(fechas).subscribe((data)=>{
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
