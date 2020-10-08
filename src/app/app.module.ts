import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {DocumentComponent} from "./document/document.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AuthGuard} from './auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    DocumentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
