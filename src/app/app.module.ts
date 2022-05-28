import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { SharedModule } from './shared/shared.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { CarouselModule } from 'ngx-owl-carousel-o';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AuthModule } from './core/auth.module';
import { PagesModule } from './features/pages.module';
import { ROOT_REDUCERS } from './shared/state/app.state';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    HttpClientModule,
    CarouselModule,

    AppRoutingModule,
    SharedModule,
    AuthModule,
    PagesModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({name: "Reducer in Login"})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
