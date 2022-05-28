import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Course } from '../interfaces/course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private env =  environment;
  private courses = new Subject();

  coursesObservable! :Observable<any>;
  constructor(
    private http: HttpClient
  ) { }
  

  getCourses(){
    return this.http.get<Course[]>(this.env.api + `/cursos`);
  }

  changesInCourses(){
    this.getCourses()
    .subscribe(
      (data:any) =>{
        this.courses.next(data);
      }
    )
  }

  getCourseObs(){
    return this.courses.asObservable();
  }

  getCourseForId(id: any){
    return this.http.get(this.env.api + `/cursos/${id}`, {
      headers: new HttpHeaders({
        'content-type':'application/json'
      })
    }).pipe(catchError(this.manejoError));
  }

  postCourse(course: Course){
    return this.http.post(this.env.api + `/cursos`, course);
  }

  putCourseForId(course: Course){
    this.changesInCourses();
    return this.http.put(this.env.api + `/cursos/${course.id}`, course);
  }

  deleteCourseForId(id: String){
    this.changesInCourses();
    return this.http.delete(this.env.api + `/cursos/${id}`);
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
