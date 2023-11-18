import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Question } from '../model/question';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const base_url = environment.base


@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private url = `${base_url}/preguntas`
  private listaCambio = new Subject<Question[]>()

  constructor(private http:HttpClient) { }

  list(){
    let token = sessionStorage.getItem('token');    
    return this.http.get<Question[]>(this.url,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  insert(qe:Question){
    let token = sessionStorage.getItem('token');
    return this.http.post(this.url, qe,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${token}`)
        .set('Content-Type', 'application/json'),
    })
  }

  setList(listaNueva: Question[]) {
    this.listaCambio.next(listaNueva);
  }

  getList() {
    return this.listaCambio.asObservable();
  }

 listId(id:number){
  let token = sessionStorage.getItem('token');
  return this.http.get<Question>(`${this.url}/${id}`,{
    headers: new HttpHeaders()
    .set('Authorization', `Bearer ${token}`)
    .set('Content-Type', 'application/json'),
  });
 }

 update(qr:Question){
  let token = sessionStorage.getItem('token');
    return this.http.put(this.url, qr, {
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


}
