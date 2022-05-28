import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../core/guard/auth.guard";
import { CourseComponent } from "./home/components/course/course.component";
import { StudentComponent } from "./home/components/student/student.component";
import { UserComponent } from "./home/components/user/user.component";
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
            { path: 'student', component: StudentComponent, canActivate: [AuthGuard] },
            { path: 'course', component: CourseComponent, canActivate: [AuthGuard] },
            { path: 'user', component: UserComponent, canActivate: [AuthGuard] },
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRoutingModule {}