import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { PagesRoutingModule } from "./pages/pages.routing";



const routes: Routes = [
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        PagesRoutingModule
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }