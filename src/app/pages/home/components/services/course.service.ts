import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  coursesObservable! :Observable<any>;
  constructor() { }

  validateCourses(data:any):any {
    
    if(!localStorage.getItem('course')){
      this.createCourses(data);
    }else{
      const conditionDocument = this.validateUserForDocument(data);
      if(conditionDocument){
        return {
          message:'Curso existe.',
          state: false
        };

      }else{
        this.createCourses(data);
      }
    }
    
  }

  createCourses(data:any){
    var courses = [],
        dataInLocalStorage = localStorage.getItem('course');

    if (dataInLocalStorage !== null) {
        courses = JSON.parse(dataInLocalStorage);
    }

    courses.push(data);

    localStorage.setItem('course', JSON.stringify(courses));

    return {
      message:'Curso creado.',
      state: true
    };
  }

  validateUserForDocument(data:any){
    const storage:any = localStorage.getItem('course');
    const dataJSON = JSON.parse(storage);
    var arrayData = data;

    const arrayResponse = arrayData.filter( (data:any) => {
      if(dataJSON.document != data.document){
        return true;
      }else{
        return false;
      }
    });

    return arrayResponse;
  }

  removeCourses(index:any){
    var courses = [],
        dataInLocalStorage:any = localStorage.getItem('course');

    courses = JSON.parse(dataInLocalStorage);
    courses.splice(index, 1);
    localStorage.setItem('course', JSON.stringify(courses));
  }

  editCourses(index:any, data:any){
    var courses = [],
        dataInLocalStorage:any = localStorage.getItem('course');

    courses = JSON.parse(dataInLocalStorage);
    courses.splice(index, 1);

    localStorage.setItem('course', JSON.stringify(courses));
    
    this.createCourses(data);

    return {
      message:'Curso editado.',
      state: true
    };
  }

  getcourses(){
    this.coursesObservable = new Observable( (suscription) =>{

      if(localStorage.getItem('course')){
        const dataInLocalStorage:any = localStorage.getItem('course');
        const courses = JSON.parse(dataInLocalStorage);

        suscription.next(courses);
        suscription.complete();
      }else{
        suscription.error("Error");
      }
      
    })
    
    return this.coursesObservable;
  }

  getcoursesForId(id: any){
    const dataInLocalStorage:any = localStorage.getItem('course');

    const courses = JSON.parse(dataInLocalStorage);
    const user = courses.filter( (element:any) => {
      return parseInt(element.id) === id;
    })
    return user;
  }

  getCountcourses(){
    if(localStorage.getItem('course')){
      const dataInLocalStorage:any = localStorage.getItem('course');
      const courses = JSON.parse(dataInLocalStorage);

      return courses.length;
    }else{
      return 0;
    }
    
  }

}
