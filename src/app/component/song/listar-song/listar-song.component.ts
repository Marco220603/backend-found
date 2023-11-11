import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Songs } from 'src/app/model/song';
import { SongsService } from 'src/app/services/songs.service';

@Component({
  selector: 'app-listar-song',
  templateUrl: './listar-song.component.html',
  styleUrls: ['./listar-song.component.css']
})
export class ListarSongComponent {
  dataSource: MatTableDataSource<Songs> = new MatTableDataSource();
  displayedColumns: string[] = ['codigo', 'nombre', 'genero', 'accion01', 'accion02'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private aS: SongsService, private LoginService: LoginService) { }
  ngOnInit(): void {
    this.aS.list().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    })
    this.aS.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }
  eliminar(id: number) {
    this.aS.delete(id).subscribe((data) => {
      this.aS.list().subscribe((data) => {
        this.aS.setList(data);
      })
    })
  }
  filter(en: any) {
    this.dataSource.filter = en.target.value.trim();
  }
  role: String = ""
  verificar() {
    this.role = this.LoginService.showRole();
    return this.LoginService.verificar();
  }
}
