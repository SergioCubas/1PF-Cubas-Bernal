import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
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
    { path: '', component: PagesComponent,
        children: [
            { path: '', component: HomeComponent,
                children: [
                    { path: 'student', component: StudentComponent },
                    { path: 'course', component: CourseComponent },
                ]
            },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        PagesRoutingModule
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }