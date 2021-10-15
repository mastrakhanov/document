import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AuthGuard } from './services/auth.guard';

import { AppComponent } from './app.component';
import { DocumentComponent } from './document/document.component';
import { LoginPageComponent } from './login-page/login-page.component';


@NgModule({
  imports: [RouterModule.forRoot([
    {
      path: '', component: AppComponent, children: [
        { path: '', redirectTo: '/login', pathMatch: 'full' },
        { path: 'login', component: LoginPageComponent },
        { path: 'document', component: DocumentComponent, canActivate: [AuthGuard] },
        { path: '**', redirectTo: '/login' }
      ]
    }
  ], { initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
