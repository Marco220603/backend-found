import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Playlistinuser } from 'src/app/model/playlistinuser';
import { PlaylistinuserService } from 'src/app/services/playlistinuser.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-listar-playlistinuser',
  templateUrl: './listar-playlistinuser.component.html',
  styleUrls: ['./listar-playlistinuser.component.css']
})
export class ListarPlaylistinuserComponent {
  
  dataSource: MatTableDataSource<Playlistinuser>= new MatTableDataSource();
  displayedColumns: string[] = ['codigo', 'playlist','descripcion','accion01','accion02'];
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor(private puS:PlaylistinuserService,private loginService:LoginService) {}
ngOnInit(): void {
  this.puS.list().subscribe(data=>{
    this.dataSource=new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  })
  this.puS.getList().subscribe((data)=>{
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  });
 }
 eliminar(id:number){
  this.puS.delete(id).subscribe((data)=>{
    this.puS.list().subscribe((data)=>{
      this.puS.setList(data);
    })
  })
 }
 filter(en:any){
  this.dataSource.filter = en.target.value.trim();
 }
 role:String=""
 verificar() {
  this.role=this.loginService.showRole();
  return this.loginService.verificar();
}

}
