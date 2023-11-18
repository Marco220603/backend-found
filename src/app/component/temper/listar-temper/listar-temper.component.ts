import { Component,OnInit,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Temper } from 'src/app/model/temper';
import { LoginService } from 'src/app/services/login.service';
import { TemperService } from 'src/app/services/temper.service';

@Component({
  selector: 'app-listar-temper',
  templateUrl: './listar-temper.component.html',
  styleUrls: ['./listar-temper.component.css']
})
export class ListarTemperComponent implements OnInit{
  
  dataSource: MatTableDataSource<Temper>= new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo', 
    'temperamento',
    'descripcion',
    'minScore',
    'genero',
    'accion01',
    'accion02'];
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  constructor(private tS:TemperService,private loginService:LoginService) {}
 ngOnInit(): void {
  this.tS.list().subscribe(data=>{
    this.dataSource=new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  })
  this.tS.getList().subscribe((data)=>{
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  });
 }
 eliminar(id:number){
  this.tS.delete(id).subscribe((data)=>{
    this.tS.list().subscribe((data)=>{
      this.tS.setList(data);
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