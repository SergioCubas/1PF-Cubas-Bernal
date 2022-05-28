import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { crearSession } from 'src/app/shared/state/actions/sesion.action';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  frmLogin = new FormGroup({
    email: new FormControl('Marshall.Cummings@yahoo.com', [Validators.required, Validators.email]),
    password: new FormControl('2aOSafeoeJmreYW', Validators.required)
  });

  constructor( 
    private formBuilder: FormBuilder, 
    public dialog: MatDialog,
    private router: Router,


    /* Servicios */
    private authService: AuthService,
    private store: Store<any>
    ) {
    }

  ngOnInit(): void {
    localStorage.clear();
  }

  get f(){
    return this.frmLogin.controls;
  }

  validarUsuario() {
    
    const { email, password } = this.frmLogin.value;

    if(email.trim() === '' && password.trim() === ''){
      return;
    }

    this.authService.getUsers(email, password).subscribe((user) => {
        localStorage.clear();
        if(user){
          localStorage.setItem("_TOKEN",password);
          localStorage.setItem("_PROFILE",user.perfil);
          localStorage.setItem("_DI",user.id);
          
          this.store.dispatch(crearSession({user: user}));
          this.router.navigateByUrl('course');
        }else{
          localStorage.clear();
          Swal.fire('El usuario no existe.', '', 'error');
        }

      }
    )
  }


}
