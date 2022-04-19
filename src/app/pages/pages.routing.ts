import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CourseComponent } from "./home/components/course/course.component";
import { StudentComponent } from "./home/components/student/student.component";
import { HomeComponent } from "./home/home.component";
import { PagesComponent } from "./pages.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: 'student',
        pathMatch: 'full'
    },
    { path: '', component: PagesComponent,
        children: [
            { path: 'student', component: StudentComponent },
            { path: 'course', component: CourseComponent },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRoutingModule {}