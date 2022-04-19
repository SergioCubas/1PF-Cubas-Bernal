import {Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Student } from '../interfaces/student';
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
  dataSource: any[] = [];
  
  constructor(
    public dialog: MatDialog,
    private studentService: StudentService

    ) {}

  ngOnInit(): void {
    this.getDataTable();
  }

  createStudent(){
    const dialogRef = this.dialog.open(EditStudentComponent, {
      width: '30%',
      data: {type: 'create'}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getDataTable();
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
        this.studentService.removeStudent(id);
        Swal.fire('Estudiante eliminado!', '', 'success');

        this.getDataTable();
      } else if (result.isDenied) {
      }
    })
  }

  getDataTable(){
    if(localStorage.getItem('student')){
  
      this.dataSourcePromise = this.studentService.getStudents();
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