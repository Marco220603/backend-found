import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtRequest } from '../model/jwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private htpp:HttpClient) { }

  login(request: JwtRequest){
    return this.htpp.post("http://localhost:8084/authenticate",request);
  }
  verificar(){
    let token = sessionStorage.getItem("token");
    return token != null;
  }
  showRole(){
    let token = sessionStorage.getItem("token");
    if(!token){
      return null;
    }
    const helper=new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    return decodedToken?.role;
  }
}
