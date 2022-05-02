import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthRoutingModule } from "./auth/auth.routing";
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
        path: 'auth',
        loadChildren: ()=> import('./auth/auth.module').then((m) => m.AuthModule)
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        AuthRoutingModule,
        PagesRoutingModule
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }