import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Gender } from '../model/gender'; 
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root',
})
export class GenderService {
  private url = `${base_url}/genders`;
  private listaCambio = new Subject<Gender[]>();

  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Gender[]>(this.url);
  }
  insert(cl: Gender) {
    return this.http.post(this.url, cl);
  }
  setList(listaNueva:Gender[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Gender>(`${this.url}/${id}`);
  }
  update(c:Gender) { 
    return this.http.put(this.url, c);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
 
  buscar(nombre: string): Observable<Gender[]> {
    return this.http.post<Gender[]>(`${this.url}/buscar`, { nombre: nombre });
  }
}