import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MaterialModule } from "./material/material.module";

import { HeaderComponent } from "./component/header/header.component";
import { FooterComponent } from "./component/footer/footer.component";
import { ToolbarComponent } from './component/toolbar/toolbar.component';
import { NavbarComponent } from './component/navbar/navbar.component';

@NgModule({
    declarations: [
        HeaderComponent,
        FooterComponent,
        ToolbarComponent,
        NavbarComponent
    ],
    imports: [
        BrowserModule,
        MaterialModule,
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