import { Component, OnInit  } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Gender } from 'src/app/model/gender';
import { GenderService } from 'src/app/services/gender.service';

@Component({
  selector: 'app-listar-gender',
  templateUrl: './listar-gender.component.html',
  styleUrls: ['./listar-gender.component.css']
})
export class ListarGenderComponent implements OnInit{

  dataSource: MatTableDataSource<Gender>= new MatTableDataSource();
  displayedColumns: string[] = ['codigo', 'genero'];
  constructor(private gS:GenderService) {


}
ngOnInit(): void {
  this.gS.list().subscribe(data=>{
    this.dataSource=new MatTableDataSource(data);
  })
 }
}


