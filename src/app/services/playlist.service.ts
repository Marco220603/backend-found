import { Subject,Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Playlist } from '../model/playlist';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {
  private url = `${base_url}/generos`
  private listaCambio = new Subject<Playlist[]>()

  constructor(private http: HttpClient) { }

  list() {    
    return this.http.get<Playlist[]>(this.url);
  }

  insert(cl: Playlist) {
    return this.http.post(this.url, cl);
  }
  setList(listaNueva: Playlist[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Playlist>(`${this.url}/${id}`);
  }
  update(c:Playlist) { 
    return this.http.put(this.url, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
 
  buscar(nombre: string): Observable<Playlist[]> {
    return this.http.post<Playlist[]>(`${this.url}/buscar`, { nombre: nombre });
  }
}
