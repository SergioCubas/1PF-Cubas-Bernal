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
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      nombre: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      perfil: ['', [Validators.required]],
      id: [],
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
              email: [data.email, [Validators.required]],
              password: [data.password, [Validators.required]],
              nombre: [data.nombre, [Validators.required]],
              direccion: [data.direccion, [Validators.required]],
              telefono: [data.telefono, [Validators.required]],
              perfil: [data.perfil, [Validators.required]],
              id: [data.id]
            });
        }
      )

    }else{
    }
  }

  onSubmit(){
    const { id, email, password, nombre, direccion, telefono, perfil} = this.frmUser.value;
    
    if (email != '' && password != '' && nombre != '' && direccion != '' && telefono != '' && perfil != ''){
      
      this.frmUser = this.fb.group({
        email: [email, [Validators.required]],
        password: [password, [Validators.required]],
        nombre: [nombre, [Validators.required]],
        direccion: [direccion, [Validators.required]],
        telefono: [telefono, [Validators.required]],
        perfil: [perfil, [Validators.required]]
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
    const { id, email, password, nombre, direccion, telefono, perfil} = this.frmUser.value;

    if (email != '' && password != '' && nombre != '' && direccion != '' && telefono != '' && perfil != ''){
      this.frmUser = this.fb.group({
        email: [email, [Validators.required]],
        password: [password, [Validators.required]],
        nombre: [nombre, [Validators.required]],
        direccion: [direccion, [Validators.required]],
        telefono: [telefono, [Validators.required]],
        perfil: [perfil, [Validators.required]],
        id: [id, [Validators.required]]
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
