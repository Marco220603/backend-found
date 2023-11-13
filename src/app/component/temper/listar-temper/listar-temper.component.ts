import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Temper } from 'src/app/model/temper';
import { TemperService } from 'src/app/services/temper.service';

@Component({
  selector: 'app-listar-temper',
  templateUrl: './listar-temper.component.html',
  styleUrls: ['./listar-temper.component.css']
})
export class ListarTemperComponent{
  dataSource: MatTableDataSource<Temper> = new MatTableDataSource();
  displayedColumns: string[] = [
    'codigo',
    'nombre',
    'descripcion',
    'genero',
    'minScore',
  ]
  constructor(private tS: TemperService) {

  }
  ngOnInit(): void {
    this.tS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data)
    })
    this.tS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
  }
}