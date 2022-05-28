import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthRouting } from "./core/auth-routing.module";
import { PagesRoutingModule } from "./features/pages.routing";


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
        loadChildren: ()=> import('./core/auth.module').then((m) => m.AuthModule)
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