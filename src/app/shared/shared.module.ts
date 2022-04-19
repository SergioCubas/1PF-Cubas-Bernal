import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "./material/material.module";

import { HeaderComponent } from "./component/header/header.component";
import { FooterComponent } from "./component/footer/footer.component";
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ToolbarComponent,
        NavbarComponent
    ],
    imports: [
        BrowserAnimationsModule,
        MaterialModule,
        BrowserModule,
        RouterModule
    ],
    exports:[
        MaterialModule,
        HeaderComponent,
        FooterComponent,
        ToolbarComponent,
        NavbarComponent,
    ]
})
export class SharedModule{}