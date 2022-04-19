import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CourseService } from '../../services/course.service';
import { StudentService } from '../../services/student.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.scss']
})
export class EditCourseComponent implements OnInit {
  frmCourse: FormGroup;
  type: boolean = true;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private courseService: CourseService,
    @Inject(MAT_DIALOG_DATA) public data:any

  ) { 
    this.frmCourse = this.fb.group({
      id: [],
      name: ['', [Validators.required]]
    });
  }

  get f(){
    return this.frmCourse.controls;
  }

  ngOnInit(): void {
    if(this.data.type === 'edit'){
      this.type = false;

      const student = this.courseService.getcoursesForId(this.data.id);

      this.frmCourse = this.fb.group({
        id: [student[0].id],
        name: [student[0].name, [Validators.required]]
      });

    }else{
      this.frmCourse.controls['id'].setValue(this.courseService.getCountcourses());
    }
  }

  onSubmit(){
    const { id, name, last_name, email, course, document} = this.frmCourse.value;
    console.log("RE: ",this.frmCourse.value);
    
    if (name){
      const response = this.courseService.createCourses(this.frmCourse.value);
      
      if(response.state){
        this.dialog.closeAll();
        Swal.fire(response.message, '', 'success');
      }else{
        Swal.fire(response.message, '', 'error');
      }
      
    }

  }

  updateStudent(){
    const { id, name, last_name, email, course, document} = this.frmCourse.value;
    
    if (name){
      const response = this.courseService.editCourses(id, this.frmCourse.value);
      
      if(response.state){
        this.dialog.closeAll();
        Swal.fire(response.message, '', 'success');
      }else{
        Swal.fire(response.message, '', 'error');
      }
      
    }
    
  }

}

