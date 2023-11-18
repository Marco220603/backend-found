import { Subject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Songs } from '../model/song';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class SongsService {
  private url = `${base_url}/canciones`
  private listaCambio = new Subject<Songs[]>()

  constructor(private http:HttpClient) { }

  list() {    
    return this.http.get<Songs[]>(this.url);
  }

  insert(cl: Songs) {
    return this.http.post(this.url, cl);
  }
  setList(listaNueva: Songs[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Songs>(`${this.url}/${id}`);
  }
  update(c:Songs) { 
    return this.http.put(this.url, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
 
  buscar(fecha: string): Observable< Songs[]> {
    return this.http.post<Songs[]>(`${this.url}/buscar`, { fecha: fecha });
  }
}
