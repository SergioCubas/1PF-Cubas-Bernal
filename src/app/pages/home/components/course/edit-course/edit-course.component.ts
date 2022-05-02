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
    this.getCourseForId();
    if(this.data.type === 'edit'){
      this.type = false;
      this.getCourseForId();
    }else{
      this.frmCourse.controls['id'].setValue(this.courseService.getCountcourses());
    }
  }

  getCourseForId(){
    this.courseService.getCourseForId(this.data.id)
    .subscribe(
      (data:any) => {
        this.frmCourse = this.fb.group({
          id: [data.id],
          name: [data.name, [Validators.required]]
        });
      }
    )
  }

  onSubmit(){
    const { id, name, last_name, email, course, document} = this.frmCourse.value;
    
    this.frmCourse = this.fb.group({
      name: [name]
    });
    console.log(this.frmCourse.value);
    
    if (name){
      this.courseService.postCourse(this.frmCourse.value)
      .subscribe(
        (data:any) =>{
          this.dialog.closeAll();
          Swal.fire("Curso creado exitosamente.", '', 'success');
        }
      )
      
    }

  }

  updateStudent(){
    const { name } = this.frmCourse.value;
    
    if (name){
      this.courseService.putCourseForId(this.frmCourse.value)
      .subscribe(
        (data:any) =>{
          this.dialog.closeAll();
          Swal.fire('Curso actualizado correctamente', '', 'success');
        }
      );
    }
    
  }

}

