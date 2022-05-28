import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subscriber } from 'rxjs';
import { InscripcionService } from 'src/app/shared/services/inscripcion.service';
import { crearCourse } from 'src/app/shared/state/actions/course.action';
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
  dataSourceObservable$!: Observable<any>;
  dataSourceSuscription!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  getProfile:any = '';
  constructor(
    public dialog: MatDialog,
    private courseService: CourseService,
    private inscripcionService: InscripcionService,

    private store: Store<any>
  ) {}

  ngOnDestroy(): void {
    //this.dataSourceSuscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getProfile = localStorage.getItem("_PROFILE");

    this.getCourses();
  }

  getCourses(){
    const ID:any = localStorage.getItem("_DI");
    const IDPAR = parseInt(ID);

    this.inscripcionService.getInscripciones(IDPAR)
    .subscribe(
      (suscripciones:any) => {

      this.courseService.getCourses()
      .subscribe(
        (cursos:any) =>{
          var filter:any = [];

          cursos.filter(
            (curs:any) => {
              suscripciones.filter(
                (suscr:any) => {
                  if(parseInt(curs.id) == suscr.idCurso){
                    filter.push(curs);
                  }
                }
              )
            }
          )
          this.store.dispatch(crearCourse({course: filter}));

          this.dataSource = new MatTableDataSource<any>(filter);
          this.dataSource.paginator = this.paginator;
        }
      )

        
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
      this.dataSourceSuscription = this.dataSourceObservable$
      .subscribe(
        (data:any) => {
          this.dataSource = data;
        }
      );
    
    }
    
  }

}