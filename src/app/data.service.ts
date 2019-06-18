import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { reg } from './models/reg';
import { Observable } from 'rxjs';
import { URL } from './url';
import { login } from './models/login';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient,private router:Router) { }

  public registerUser(userInfoVo:reg): Observable<any> {
    return this.http.post(URL.REGISTER,userInfoVo)
  }

  public loginUser(userInfoVo:login): Observable<any>{
    return this.http.post(URL.LOGIN,userInfoVo);
  }
}
