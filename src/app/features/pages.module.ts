import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material/material.module';


/* Pipes */
import { FullNamePipe } from '../shared/pipes/full-name.pipe';
import { GetCategoryForIdPipe } from '../shared/pipes/get-category-for-id.pipe';


import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages.routing';
import { StudentComponent } from './home/components/student/student.component';
import { EditStudentComponent } from './home/components/student/edit-student/edit-student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from './home/components/services/student.service';

import { CourseComponent } from './home/components/course/course.component';
import { EditCourseComponent } from './home/components/course/edit-course/edit-course.component';
import { UserComponent } from './home/components/user/user.component';
import { EditUserComponent } from './home/components/user/edit-user/edit-user.component';
import { CourseService } from './home/components/services/course.service';


@NgModule({
  declarations: [
    FullNamePipe,
    GetCategoryForIdPipe,

    PagesComponent,
    HomeComponent,
    StudentComponent,
    EditStudentComponent,
    CourseComponent,
    EditCourseComponent,
    UserComponent,
    EditUserComponent


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
  ],
  providers: [
    StudentService,
    CourseService
  ]
})
export class PagesModule { }
