import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private env =  environment;
  private session = new Subject();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.session.next(false);
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('_TOKEN');
    
    return !user ? true : false;
  }

  getUsers(){
    return this.http.get(this.env.api + `/users`);
  }

  getToken(){
    return this.session;
  }

  isLogged(token: string){
    localStorage.setItem("_TOKEN", token);
  }

  loggOut(){
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

}
