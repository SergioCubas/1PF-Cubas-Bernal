import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent implements OnInit {
  frmStudent: FormGroup;
  type: boolean = true;

  courses: any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private studentService: StudentService,
    private courseService: CourseService,


    @Inject(MAT_DIALOG_DATA) public data:any

  ) { 
    this.frmStudent = this.fb.group({
      id: [],
      name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      document: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      courseID: ['', [Validators.required]]
    });
  }

  get f(){
    return this.frmStudent.controls;
  }

  ngOnInit(): void {
    this.getCourses();
    
    if(this.data.type === 'edit'){
      this.type = false;

        this.studentService.getStudentsApiForId(this.data.id)
        .subscribe(
          (data:any) =>{
            
            this.frmStudent = this.fb.group({
              id: [data.id],
              name: [data.name, [Validators.required]],
              last_name: [data.last_name, [Validators.required]],
              document: [data.document, [Validators.required]],
              email: [data.email, [Validators.required, Validators.email]],
              courseID: [data.courseID, [Validators.required]]
            });
        }
      )

    }else{
    }
  }

  onSubmit(){
    const { id, name, last_name, email, courseID, document} = this.frmStudent.value;
    
    if (name && last_name && email && courseID && document){
      
      this.frmStudent = this.fb.group({
        name: [name, [Validators.required]],
        last_name: [last_name, [Validators.required]],
        document: [document, [Validators.required]],
        email: [email, [Validators.required, Validators.email]],
        courseID: [courseID, [Validators.required]]
      });

      this.studentService.postStudent(this.frmStudent.value)
      .subscribe(
        (data:any) =>{
          this.dialog.closeAll();
          Swal.fire("Estudiante creado exitosamente.", '', 'success');
        }
      )
      
    }

  }

  updateStudent(){
    const { id, name, last_name, email, courseID, document} = this.frmStudent.value;
    
    if (name && last_name && email && courseID && document){
      
      this.frmStudent = this.fb.group({
        id: [id, [Validators.required]],
        name: [name, [Validators.required]],
        last_name: [last_name, [Validators.required]],
        document: [document, [Validators.required]],
        email: [email, [Validators.required, Validators.email]],
        courseID: [courseID, [Validators.required]]
      });

      this.studentService.putStudentForId(this.frmStudent.value)
      .subscribe(
        (data:any) =>{
          this.dialog.closeAll();
          Swal.fire("Estudiante actualizado exitosamente.", '', 'success');
        }
      )
      
    }
    
  }

  getCourses(){
    this.courseService.getCourses()
    .subscribe(
      (data:any) =>{
        this.courses = data;
      }
    )
  }

}
