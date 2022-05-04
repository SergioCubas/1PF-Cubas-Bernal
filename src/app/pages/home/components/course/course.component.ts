import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscriber } from 'rxjs';
import Swal from 'sweetalert2';
import { CourseService } from '../services/course.service';
import { EditCourseComponent } from './edit-course/edit-course.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'action'];

  dataSource = new MatTableDataSource<any>();
  dataSourceObservable!: Observable<any>;
  dataSourceSuscription!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    public dialog: MatDialog,
    private courseService: CourseService
  ) {}
/*
  ngOnDestroy(): void {
    this.dataSourceSuscription.unsubscribe();
  }
*/
  ngOnInit(): void {
    this.courseService.getCourseObs().subscribe(
      (data:any) => {
        this.getCourses();
      }
    )
  }

  getCourses(){
    this.courseService.getCourses()
    .subscribe(
      (data:any) =>{
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  ngAfterViewInit() {
    this.courseService.getCourses()
    .subscribe(
      (data:any) =>{
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
      }
    )
  }


  createCourse(){
    const dialogRef = this.dialog.open(EditCourseComponent, {
      width: '30%',
      data: {type: 'create'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCourses();
    });
  }

  putCourse(id:any){
    const dialogRef = this.dialog.open(EditCourseComponent, {
      width: '30%',
      data: {type: 'edit', id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getCourses();
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
        this.courseService.deleteCourseForId(id)
        .subscribe(
          (data:any) => {
            console.log("DATA:",data);
            
          }
        )
        //this.courseService.removeCourses(id);
        Swal.fire('Estudiante eliminado!', '', 'success');

        this.getCourses();
      } else if (result.isDenied) {
      }
    })
  }

  getDataTable(){
    if(localStorage.getItem('course')){
      this.dataSourceSuscription = this.dataSourceObservable
      .subscribe(
        (data:any) => {
          this.dataSource = data;
        }
      );
    
    }
    
  }

}