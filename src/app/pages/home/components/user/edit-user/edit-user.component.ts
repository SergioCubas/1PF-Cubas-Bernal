import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { CourseService } from '../../services/course.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  frmUser: FormGroup;
  type: boolean = true;

  courses: any[] = [];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private studentService: UserService,
    private courseService: CourseService,


    @Inject(MAT_DIALOG_DATA) public data:any

  ) { 
    this.frmUser = this.fb.group({
      id: [],
      code: ['', [Validators.required]],
      role: ['', [Validators.required]]
    });
  }

  get f(){
    return this.frmUser.controls;
  }

  ngOnInit(): void {
    
    if(this.data.type === 'edit'){
      this.type = false;

        this.studentService.getUsersApiForId(this.data.id)
        .subscribe(
          (data:any) =>{
            
            this.frmUser = this.fb.group({
              id: [data.id],
              code: [data.code, [Validators.required]],
              role: [data.role, [Validators.required]]
            });
        }
      )

    }else{
    }
  }

  onSubmit(){
    const { id, code, role} = this.frmUser.value;
    
    if (code  && role){
      
      this.frmUser = this.fb.group({
        code: [code, [Validators.required]],
        role: [role, [Validators.required]]
      });

      this.studentService.postUser(this.frmUser.value)
      .subscribe(
        (data:any) =>{
          this.dialog.closeAll();
          Swal.fire("Usuario creado exitosamente.", '', 'success');
        }
      )
      
    }

  }

  updateUser(){
    const { id, code, role} = this.frmUser.value;
    
    if (code && role){
      
      this.frmUser = this.fb.group({
        id: [id, [Validators.required]],
        code: [code, [Validators.required]],
        role: [role, [Validators.required]]
      });

      this.studentService.putUserForId(this.frmUser.value)
      .subscribe(
        (data:any) =>{
          this.dialog.closeAll();
          Swal.fire("Usuario actualizado exitosamente.", '', 'success');
        }
      )
      
    }
    
  }


}
