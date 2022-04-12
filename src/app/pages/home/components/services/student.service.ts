import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor() { }

  validateStudent(data:any):any {
    
    if(!localStorage.getItem('student')){
      this.createStudent(data);
    }else{
      const conditionDocument = this.validateUserForDocument(data);
      if(conditionDocument){
        return {
          message:'usuario existe.',
          state: false
        };

      }else{
        this.createStudent(data);
      }
    }
    
  }

  createStudent(data:any){
    var users = [],
        dataInLocalStorage = localStorage.getItem('student');

    if (dataInLocalStorage !== null) {
        users = JSON.parse(dataInLocalStorage);
    }

    users.push(data);

    localStorage.setItem('student', JSON.stringify(users));

    return {
      message:'Usuario creado.',
      state: true
    };
  }

  validateUserForDocument(data:any){
    const storage:any = localStorage.getItem('student');
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

  removeStudent(index:any){
    var users = [],
        dataInLocalStorage:any = localStorage.getItem('student');

    users = JSON.parse(dataInLocalStorage);
    users.splice(index, 1);
    localStorage.setItem('student', JSON.stringify(users));
  }

  editStudent(index:any, data:any){
    var users = [],
        dataInLocalStorage:any = localStorage.getItem('student');

    users = JSON.parse(dataInLocalStorage);
    users.splice(index, 1);

    localStorage.setItem('student', JSON.stringify(users));
    
    this.createStudent(data);

    return {
      message:'Usuario editado.',
      state: true
    };
  }
  

  getStudents(){
    const dataInLocalStorage:any = localStorage.getItem('student');

    const users = JSON.parse(dataInLocalStorage);
    return users;
  }

  getStudentsForId(id: any){
    const dataInLocalStorage:any = localStorage.getItem('student');

    const users = JSON.parse(dataInLocalStorage);
    const user = users.filter( (element:any) => {
      return parseInt(element.id) === id;
    })
    return user;
  }

  getCountStudents(){
    if(localStorage.getItem('student')){
      const dataInLocalStorage:any = localStorage.getItem('student');
      const users = JSON.parse(dataInLocalStorage);

      return users.length;
    }else{
      return 0;
    }
    
  }

}
