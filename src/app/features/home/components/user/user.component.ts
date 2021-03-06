import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

import { CourseService } from '../services/course.service';
import { UserService } from '../services/user.service';
import { EditUserComponent } from './edit-user/edit-user.component';

 @Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit{
  displayedColumns: string[] = ['id', 'email','password','nombre','direccion','telefono','perfil', 'action'];
  dataSourcePromise!: Promise<any>;
  dataSource = new MatTableDataSource<any>();
  
  dataArray: any[] =[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getProfile:any = '';
  constructor(
    public dialog: MatDialog,
    private studentService: UserService,
    private courseService: CourseService
    ) {}

  ngOnInit(): void {
    this.getProfile = localStorage.getItem("_PROFILE");
    this.getUsersApi();

    this.studentService.getUserObs().subscribe(
      (data:any) => {
        this.getUsersApi();
      }
    )
  }

  getUsersApi(){
    this.studentService.getUsersApi()
    .subscribe(
      (dataUser:any) =>{
        this.dataSource = new MatTableDataSource<any>(dataUser);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  getCourseFor(id:string){
    this.courseService.getCourseForId(id)
    .subscribe(
      (data:any) => {
          return data.name
      }
    )
  }

  createUser(){
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '30%',
      data: {type: 'create'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getUsersApi();
    });
  }

  putUser(id:any){
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '30%',
      data: {type: 'edit', id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataTable();
    });
  }

  deleteUser(id:any){

    Swal.fire({
      title: '??Seguro que deseas eliminar al estudiante?',
      width: 500,
      showDenyButton: true,
      showCancelButton: false,
      showCloseButton: false,
      confirmButtonText: 'Si, Eliminar estudiante',
      denyButtonText: `No, mantenerme estudiante`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.studentService.deleteUserForId(id)
        .subscribe(
          (data:any) => {
          }
        )
        Swal.fire('Estudiante eliminado!', '', 'success');

        this.getDataTable();
      } else if (result.isDenied) {
      }
    })
  }


  getDataTable(){
    if(localStorage.getItem('student')){
  
      this.dataSourcePromise
      .then( (students) =>{
        this.dataSource = students;
      })
      .catch( (error) => {
        
      })
      .finally( () => {
      })
    }
    
  }

}