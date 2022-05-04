import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Student } from '../interfaces/student';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private env =  environment;
  private student = new Subject();

  studentsPromise! :Promise<any>;

  constructor(
    private http: HttpClient
  ) { }

  getStudentsApi(){
    return this.http.get(this.env.api + `/estudiantes`, {
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

  getStudentsApiForId(id: any){
    return this.http.get(this.env.api + `/estudiantes/${id}`, {
      headers: new HttpHeaders({
        'content-type':'application/json'
      })
    })
    .pipe(catchError(this.manejoError));
  }

  postStudent(student: Student){
    return this.http.post(this.env.api + `/estudiantes`, student);
  }

  putStudentForId(student: Student){
    this.changesInStudents();
    return this.http.put(this.env.api + `/estudiantes/${student.id}`, student);
  }

  deleteStudentForId(id: String){
    this.changesInStudents();
    return this.http.delete(this.env.api + `/estudiantes/${id}`);
  }

  getStudentObs(){
    return this.student.asObservable();
  }

  changesInStudents(){
    this.getStudentsApi()
    .subscribe(
      (data:any) =>{
        this.student.next(data);
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
