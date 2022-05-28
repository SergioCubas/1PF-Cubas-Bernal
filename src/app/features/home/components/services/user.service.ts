import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private env =  environment;
  private user = new Subject();

  usersPromise! :Promise<any>;

  constructor(
    private http: HttpClient
  ) { }

  getUsersApi(){
    return this.http.get(this.env.api + `/users`, {
      headers: new HttpHeaders({
        'content-type':'application/json'
      })
    })
    .pipe(
      map(
        (data:any) => {
          return data;
        }
      )
    )
    .pipe(catchError(this.manejoError));
  }

  getUsersApiForId(id: any){
    return this.http.get(this.env.api + `/users/${id}`, {
      headers: new HttpHeaders({
        'content-type':'application/json'
      })
    })
    .pipe(catchError(this.manejoError));
  }

  postUser(user: User){
    return this.http.post(this.env.api + `/users`, user);
  }

  putUserForId(user: User){
    this.changesInUsers();
    return this.http.put(this.env.api + `/users/${user.id}`, user);
  }

  deleteUserForId(id: String){
    this.changesInUsers();
    return this.http.delete(this.env.api + `/users/${id}`);
  }

  getUserObs(){
    return this.user.asObservable();
  }

  changesInUsers(){
    this.getUsersApi()
    .subscribe(
      (data:any) =>{
        this.user.next(data);
      }
    )
  }

  private manejoError(error: HttpErrorResponse){
    if(error.error instanceof ErrorEvent){
      console.warn('Error en el Front:', error.error.message)
    }else{
      console.warn('Error en el Back:', error.status, error.error.message)
    }
    return throwError( ()=> 'Error de comunicación HTTP');
  }


}
