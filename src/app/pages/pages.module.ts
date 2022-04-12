import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages.routing';
import { StudentComponent } from './home/components/student/student.component';
import { EditStudentComponent } from './home/components/student/edit-student/edit-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FullNamePipe } from '../pipes/full-name.pipe';

@NgModule({
  declarations: [
    FullNamePipe,

    PagesComponent,
    HomeComponent,
    StudentComponent,
    EditStudentComponent


  ],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    AppRoutingModule,
    SharedModule,

    PagesRoutingModule
  ]
})
export class PagesModule { }
