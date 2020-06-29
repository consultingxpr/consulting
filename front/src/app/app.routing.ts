import { NotfoundComponent } from './notfound/notfound.component';
import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from './back-office/layout/admin-layout.component'
import { LoginComponent } from './login/login.component';
import { PreventLogin } from './services/auth/prevent.login';
import { AuthGuard } from './services/auth/auth.guard';
import { RegisterComponent } from './register/register.component';
import { ClientGuard } from './services/auth/client.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./back-office/layout/admin-layout.module').then(m => m.AdminLayoutModule)
      }], canActivate: [AuthGuard]
  },
  {
    path: 'client',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./front-office/front-office.module').then(m => m.FrontOfficeModule)
      }], canActivate: [ClientGuard]
  },
  {
    path: 'login', component: LoginComponent, canActivate: [PreventLogin],
    data: { title: 'Connexion' }
  },
  {
    path: 'register', component: RegisterComponent,canActivate: [PreventLogin],
    data: { title: 'Inscription' }
  },
  {
    path: '**',
    component: NotfoundComponent,
    data: { title: '404 Not Found' }
  },
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
