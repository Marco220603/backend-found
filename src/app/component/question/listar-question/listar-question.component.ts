import { Component,OnInit,ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Question } from 'src/app/model/question';
import { LoginService } from 'src/app/services/login.service';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'app-listar-question',
  templateUrl: './listar-question.component.html',
  styleUrls: ['./listar-question.component.css']
})
export class ListarQuestionComponent implements OnInit{
  dataSource: MatTableDataSource<Question> = new MatTableDataSource()
  displayedColumns:string[]=[
    'codigo',
    'pregunta',
    'alternativa01',
    'alternativa02',
    'alternativa03',
    'accion01',
    'accion02',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private qS:QuestionsService,private loginService:LoginService){}
  ngOnInit(): void {
    this.qS.list().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
    this.qS.getList().subscribe((data)=>{
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
  }

  eliminar(id:number){
    this.qS.delete(id).subscribe((data)=>{
      this.qS.list().subscribe((data)=>{
        this.qS.setList(data)
      })
    })
  }

  filter(en:any){
    this.dataSource.filter = en.target.value.trim();
  }
  role:string=""
  verificar() {
    this.role=this.loginService.showRole();
    return this.loginService.verificar();
  }
}
