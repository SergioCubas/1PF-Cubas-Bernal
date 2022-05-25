import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  frmLogin: FormGroup = this.formBuilder.group({
    codigo: ['Wb_gfnkFhLRRLDR', [Validators.required]]
  })

  constructor( 
    private formBuilder: FormBuilder, 
    public dialog: MatDialog,
    private router: Router,


    /* Servicios */
    private authService: AuthService
    ) {
    }

  ngOnInit(): void {
    localStorage.clear();

    this.getToken();
  }

  campoNoValido( codigo: string ) {
    return this.frmLogin.get(codigo)?.invalid && this.frmLogin.get(codigo)?.touched;
  }

  validarUsuario() {
    
    const { codigo } = this.frmLogin.value;

    if(codigo.trim() === ''){
      return;
    }

    this.authService.getUsers()
    .subscribe(
      (data:any) => {
        const validateUser = data.filter(
          (element:any, index:any) => {
            return element.code === codigo;
          }
        )

        if(validateUser.length > 0){
          this.authService.isLogged(validateUser[0].code);
          this.router.navigateByUrl('course');

        }else{
          localStorage.clear();
          Swal.fire('El usuario no existe.', '', 'error');
        }

      }
    )

    

  }

  getToken(){
    this.authService.getToken()
    .subscribe(
      (data:any) => {
        console.log("Chan: ",data);
        
      }
    );

  }

}
