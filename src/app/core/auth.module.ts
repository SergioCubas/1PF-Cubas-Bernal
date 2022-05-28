import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';

/* Componentes propios */
import { AuthComponent } from './auth.component';
import { AuthRouting } from './auth-routing.module';

@NgModule({
  declarations: [
    LoginComponent,
    AuthComponent,
  ],
  exports: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,

     /* Rutas propias */
    AuthRouting
  ]
})
export class AuthModule { }
