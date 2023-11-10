import { Subject,Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Artist } from '../model/artist';
import { HttpClient } from '@angular/common/http';

const base_url=environment.base  

@Injectable({
  providedIn: 'root'
})
// H
export class ArtistService {

  private url = `${base_url}/artistas`
  private listacambio= new Subject<Artist[]>()

  constructor(private http: HttpClient) { }

  list(){
    return this.http.get<Artist[]>(this.url);
  }

  insert(cl:Artist) {
    return this.http.post(this.url, cl);
  }
  setList(listaNueva: Artist[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Artist>(`${this.url}/${id}`);
  }
  update(c:Artist) { 
    return this.http.put(this.url, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
 
  buscar(fecha: string): Observable<Artist[]> {
    return this.http.post<Artist[]>(`${this.url}/buscar`, { fecha: fecha });
  }
}
