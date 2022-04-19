import {Component, OnDestroy, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';
import Swal from 'sweetalert2';
import { CourseService } from '../services/course.service';
import { EditCourseComponent } from './edit-course/edit-course.component';


/**
 * @title Basic use of `<mat-table>` (uses display flex)
 */
 @Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy{
  displayedColumns: string[] = ['id', 'name', 'action'];

  dataSource: any[] = [];
  dataSourceObservable!: Observable<any>;
  dataSourceSuscription!: any;

  constructor(
    public dialog: MatDialog,
    private courseService: CourseService

    ) {}
  ngOnDestroy(): void {
    this.dataSourceSuscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getDataTable();
  }

  createCourse(){
    const dialogRef = this.dialog.open(EditCourseComponent, {
      width: '30%',
      data: {type: 'create'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataTable();
    });
  }

  putCourse(id:any){
    const dialogRef = this.dialog.open(EditCourseComponent, {
      width: '30%',
      data: {type: 'edit', id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataTable();
    });
  }

  deleteCourse(id:any){

    Swal.fire({
      title: '¿Seguro que deseas eliminar al curso?',
      width: 500,
      showDenyButton: true,
      showCancelButton: false,
      showCloseButton: false,
      confirmButtonText: 'Si, Eliminar curso',
      denyButtonText: `No, mantenerme curso`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.courseService.removeCourses(id);
        Swal.fire('Estudiante eliminado!', '', 'success');

        this.getDataTable();
      } else if (result.isDenied) {
      }
    })
  }

  getDataTable(){
    if(localStorage.getItem('course')){
      this.dataSourceObservable = this.courseService.getcourses();
      this.dataSourceSuscription = this.dataSourceObservable
      .subscribe(
        (data:any) => {
          this.dataSource = data;
        }
      );
    
    }
  }

}