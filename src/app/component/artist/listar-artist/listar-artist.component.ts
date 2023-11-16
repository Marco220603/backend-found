import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Artist } from 'src/app/model/artist';
import { ArtistService } from 'src/app/services/artist.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-listar-artist',
  templateUrl: './listar-artist.component.html',
  styleUrls: ['./listar-artist.component.css'],
})

export class ListarArtistComponent implements OnInit {
  dataSource: MatTableDataSource<Artist>= new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'nombre', 
    'gender',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor(private aS:ArtistService,private loginService:LoginService) {}
ngOnInit(): void {
  this.aS.list().subscribe(data=>{

    this.dataSource=new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  })
  this.aS.getList().subscribe((data)=>{
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  });
 }
 eliminar(id:number){
  this.aS.delete(id).subscribe((data)=>{
    this.aS.list().subscribe((data)=>{
      this.aS.setList(data);
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





