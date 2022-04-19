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
      course: ['', [Validators.required]]
    });
  }

  get f(){
    return this.frmStudent.controls;
  }

  ngOnInit(): void {
    this.getCourses();
    
    if(this.data.type === 'edit'){
      this.type = false;

      const student = this.studentService.getStudentsForId(this.data.id);

      this.frmStudent = this.fb.group({
        id: [student[0].id],
        name: [student[0].name, [Validators.required]],
        last_name: [student[0].last_name, [Validators.required]],
        document: [student[0].document, [Validators.required]],
        email: [student[0].email, [Validators.required, Validators.email]],
        course: [student[0].course, [Validators.required]]
      });

    }else{
      this.frmStudent.controls['id'].setValue(this.studentService.getCountStudents());
    }
  }

  onSubmit(){
    const { id, name, last_name, email, course, document} = this.frmStudent.value;
    console.log("RE: ",this.frmStudent.value);
    
    if (name && last_name && email && course && document){
      const response = this.studentService.createStudent(this.frmStudent.value);
      
      if(response.state){
        this.dialog.closeAll();
        Swal.fire(response.message, '', 'success');
      }else{
        Swal.fire(response.message, '', 'error');
      }
      
    }

  }

  updateStudent(){
    const { id, name, last_name, email, course, document} = this.frmStudent.value;
    
    if (name && last_name && email && course && document){
      const response = this.studentService.editStudent(id, this.frmStudent.value);
      
      if(response.state){
        this.dialog.closeAll();
        Swal.fire(response.message, '', 'success');
      }else{
        Swal.fire(response.message, '', 'error');
      }
      
    }
    
  }

  getCourses(){
    this.courseService.getcourses()
    .subscribe({
      next: (data:any) =>{
        console.log("DATAAA: ",data);
        
        this.courses = data;
      },
      error: (error) =>{
        Swal.fire(error, '', 'error');
      }
    });
  }

}
