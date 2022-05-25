import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthRouting } from "./auth/auth-routing.module";

import { CourseComponent } from "./pages/home/components/course/course.component";
import { StudentComponent } from "./pages/home/components/student/student.component";
import { HomeComponent } from "./pages/home/home.component";
import { PagesComponent } from "./pages/pages.component";
import { PagesRoutingModule } from "./pages/pages.routing";



const routes: Routes = [
    {
        path: '',
        redirectTo: 'student',
        pathMatch: 'full'
    },
    { 
        path: '**', 
        redirectTo: '/student' 
    },
    {
        path: 'auth',
        loadChildren: ()=> import('./auth/auth.module').then((m) => m.AuthModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        AuthRouting,
        PagesRoutingModule
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }