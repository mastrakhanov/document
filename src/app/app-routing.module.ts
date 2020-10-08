import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {AppComponent} from "./app.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {DocumentComponent} from "./document/document.component";
import {AuthGuard} from './auth.guard';

@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: '', component: AppComponent, children: [
        {path: '', redirectTo: '/login', pathMatch: 'full'},
        {path: 'login', component: LoginPageComponent},
        {path: 'document', component: DocumentComponent, canActivate: [AuthGuard]},
      ]
    }
  ], {initialNavigation: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
