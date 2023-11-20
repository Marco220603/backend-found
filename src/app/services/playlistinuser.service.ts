import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Playlistinuser } from "../model/playlistinuser";
import { Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";

const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class PlaylistinuserService {
  private url = `${base_url}/reproducciones`;
  private listaCambio = new Subject<Playlistinuser[]>();
  
  constructor(private http: HttpClient) {}
  list() {
    let token = sessionStorage.getItem('token');
    return this.http.get<Playlistinuser[]>(this.url, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  insert(pu: Playlistinuser) {
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, pu, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  setList(listaNueva:Playlistinuser[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    let token = sessionStorage.getItem('token');
    return this.http.get<Playlistinuser>(`${this.url}/${id}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }
  update(pu:Playlistinuser) { 
    let token = sessionStorage.getItem('token');

    return this.http.put(this.url, pu, {
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
 
  buscar(nombre: string): Observable<Playlistinuser[]> {
    let token = sessionStorage.getItem('token');
    return this.http.post<Playlistinuser[]>(
      `${this.url}/buscar`,
      {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)
          .set('Content-Type', 'application/json'),
      }
    );
  }

}