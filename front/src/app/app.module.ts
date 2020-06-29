import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { DatePipe } from '@angular/common'
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import { MatRippleModule, MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './back-office/components/components.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule} from '@agm/core';
import { AdminLayoutComponent } from './back-office/layout/admin-layout.component';
import { LoginComponent } from './login/login.component';
import {AuthGuard} from './services/auth/auth.guard';
import {AuthService} from './services/auth/auth.service';
import {PreventLogin} from './services/auth/prevent.login';
import {EmployeeService} from './services/employee/employee.service';
import {ConfigurationService} from './services/configuration/configuration.service';
import {RegisterComponent} from '../app/register/register.component'

import {MatProgressBarModule} from '@angular/material/progress-bar';
import {ErrorStateMatcher} from '@angular/material/core';
import { RoleGuard } from './services/auth/role.guard';
import {ClientGuard} from './services/auth/client.guard';
import { NotfoundComponent } from './notfound/notfound.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/auth/token.interceptor';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {  MatSnackBarModule } from '@angular/material/snack-bar';
import {MatRadioModule} from '@angular/material/radio';
import { FrontOfficeComponent } from './front-office/front-office.component';



@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ComponentsModule,
    ReactiveFormsModule,
    MatNativeDateModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatStepperModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    NgbModule,
    MatProgressBarModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAQPBZQYKIver_p1XW-lrh7P1I9_g4Yr5Q'
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    NotfoundComponent,
    RegisterComponent,
    FrontOfficeComponent,
    AdminLayoutComponent,
   
  ],

  providers: [
    DatePipe,
    RoleGuard,
    { provide :MAT_DATE_LOCALE,useValue:'fr-GB'},
    MatDatepickerModule,   
    AuthGuard,
    AuthService, 
    ClientGuard, 
    PreventLogin, 
    ErrorStateMatcher, 
    EmployeeService,
    ConfigurationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
