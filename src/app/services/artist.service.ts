import { Subject,Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Artist } from '../model/artist';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const base_url=environment.base  

@Injectable({
  providedIn: 'root'
})
export class ArtistService {
  

  private url = `${base_url}/artistas`;
  private listacambio= new Subject<Artist[]>()

  constructor(private http: HttpClient) { }

  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Artist[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(aR: Artist) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, aR, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva:Artist[]) {
    this.listacambio.next(listaNueva);
  }
  getList() {
    return this.listacambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Artist>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(a:Artist) { 
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, a, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  delete(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
 
  buscar(nombre: string): Observable<Artist[]> {
    let token = sessionStorage.getItem('token');
    return this.http.post<Artist[]>(
      `${this.url}/buscar`,
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }
}
