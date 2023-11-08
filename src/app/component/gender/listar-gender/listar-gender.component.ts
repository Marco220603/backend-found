import { Component, OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Gender } from 'src/app/model/gender';
import { GenderService } from 'src/app/services/gender.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-listar-gender',
  templateUrl: './listar-gender.component.html',
  styleUrls: ['./listar-gender.component.css']
})
export class ListarGenderComponent implements OnInit{

  dataSource: MatTableDataSource<Gender>= new MatTableDataSource();
  displayedColumns: string[] = ['codigo', 'genero','accion01','accion02'];
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor(private gS:GenderService,private loginService:LoginService) {}
ngOnInit(): void {
  this.gS.list().subscribe(data=>{
    this.dataSource=new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  })
  this.gS.getList().subscribe((data)=>{
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  });
 }
 eliminar(id:number){
  this.gS.delete(id).subscribe((data)=>{
    this.gS.list().subscribe((data)=>{
      this.gS.setList(data);
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


