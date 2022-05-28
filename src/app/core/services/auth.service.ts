import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/features/home/components/interfaces/user';
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

  getUsers(email: string, password: string){
    return this.http.get<User[]>(this.env.api + `/users`).pipe(
      map( (user: User[]) => {
        return user.filter( data => data.email === email && data.password === password)[0]
      })
    )
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
