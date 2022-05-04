import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { Student } from '../interfaces/student';
import { CourseService } from '../services/course.service';
import { StudentService } from '../services/student.service';
import { EditStudentComponent } from './edit-student/edit-student.component';


/**
 * @title Basic use of `<mat-table>` (uses display flex)
 */
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit{
  displayedColumns: string[] = ['id', 'name', 'document', 'email',  'course',  'action'];

  dataSourcePromise!: Promise<any>;
  dataSource = new MatTableDataSource<any>();
  
  dataArray: any[] =[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    public dialog: MatDialog,
    private studentService: StudentService,
    private courseService: CourseService
    ) {}

  ngOnInit(): void {
    this.getStudentsApi();

    this.studentService.getStudentObs().subscribe(
      (data:any) => {
        this.getStudentsApi();
      }
    )
  }

  getStudentsApi(){
    this.studentService.getStudentsApi()
    .subscribe(
      (dataStudent:any) =>{

        dataStudent.map(
          (dataStudentMap:any) => {
            
            this.courseService.getCourseForId(dataStudentMap.courseID)
              .subscribe(
                (data:any) => {
                  dataStudentMap.coursename = data.name;
                }
            )

          }
        )
        this.dataSource = new MatTableDataSource<any>(dataStudent);
        this.dataSource.paginator = this.paginator;
      }
    )
  }

  getCourseFor(id:string){
    this.courseService.getCourseForId(id)
    .subscribe(
      (data:any) => {
        console.log(data.name);
        
          return data.name
      }
    )
  }

  createStudent(){
    const dialogRef = this.dialog.open(EditStudentComponent, {
      width: '30%',
      data: {type: 'create'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getStudentsApi();
    });
  }

  putStudent(id:any){
    const dialogRef = this.dialog.open(EditStudentComponent, {
      width: '30%',
      data: {type: 'edit', id: id}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataTable();
    });
  }

  deleteStudent(id:any){

    Swal.fire({
      title: '¿Seguro que deseas eliminar al estudiante?',
      width: 500,
      showDenyButton: true,
      showCancelButton: false,
      showCloseButton: false,
      confirmButtonText: 'Si, Eliminar estudiante',
      denyButtonText: `No, mantenerme estudiante`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.studentService.deleteStudentForId(id)
        .subscribe(
          (data:any) => {
            console.log("DATA:",data);
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
        console.log(students);
        this.dataSource = students;
      })
      .catch( (error) => {
        console.log("Error: ",error);
        
      })
      .finally( () => {
        console.log("Data cargada.");
        
      })
    }
    
  }

}