import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Playlistinuser } from 'src/app/model/playlistinuser';
import { PlaylistinuserService } from 'src/app/services/playlistinuser.service';

@Component({
  selector: 'app-creaedita-playlistinuser',
  templateUrl: './creaedita-playlistinuser.component.html',
  styleUrls: ['./creaedita-playlistinuser.component.css']
})
export class CreaeditaPlaylistinuserComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  id:number=0;
  playlistinuser:Playlistinuser = new Playlistinuser();
  description:string="";
  //idUser:number=useAnim;
  mensaje: string='';
  edicion:boolean=false;

  constructor(
    private puS:PlaylistinuserService,
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
        idPlaylistinuser:['',],
        namePlaylistinuser:['',Validators.required],
        descriptionPlaylistinuser:['',Validators.required],
        idUser:['',Validators.required],
      });
  }

  registrar(){
    if(this.form.valid){
      this.playlistinuser.idPlaylistinuser=this.form.value.idPlaylistinuser;
      this.playlistinuser.namePlaylistinuser=this.form.value.namePlaylistinuser;
      this.playlistinuser.descriptionPlaylistinuser=this.form.value.descriptionPlaylistinuser;
      this.playlistinuser.idUser=this.form.value.idUser;

      if(this.edicion){
        this.puS.update(this.playlistinuser).subscribe(()=>{
          this.puS.list().subscribe(data=>{
            this.puS.setList(data);
          })
        })
      }else{
        this.puS.insert(this.playlistinuser).subscribe((data)=>{
          this.puS.list().subscribe((data) =>{
            this.puS.setList(data);
          });
        });
      }
      this.router.navigate(['components/playlistinusers'])
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
      this.puS.listId(this.id).subscribe((data)=>{
        this.form = new FormGroup({
          idPlaylistinuser:new FormControl(data.idPlaylistinuser),
          namePlaylistinuser:new FormControl(data.namePlaylistinuser),
          descriptionPlaylistinuser:new FormControl(data.descriptionPlaylistinuser),
          idUser:new FormControl(data.idUser),
        });
      });
    }
  }
}
