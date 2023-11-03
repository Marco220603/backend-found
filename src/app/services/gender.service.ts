import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';
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
}