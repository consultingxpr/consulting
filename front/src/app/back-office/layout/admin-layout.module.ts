import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { CommonModule, registerLocaleData  } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import localeFr from '@angular/common/locales/fr';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import {MatStepperModule} from '@angular/material/stepper';


import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectFilterModule } from 'mat-select-filter';


import * as Chartist from 'chartist';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { MatRadioModule } from '@angular/material/radio';
import { AdminLayoutRouting } from './admin-layout.routing';
import { ClientsComponent } from '../clients/clients.component';
import { ConsulterClientComponent } from '../clients/consulter-client/consulter-client.component';

import { UsersComponent } from '../users/users.component';
import { AddUserComponent } from '../users/add-user/add-user.component';
import { UpdateUserComponent } from '../users/update-user/update-user.component';
import { ConsulterQuestionnaireComponent } from '../consulter-questionnaire/consulter-questionnaire.component';
import { DocumentsComponent } from '../documents/documents.component';
import { ConsulterDocumentComponent } from '../documents/consulter-document/consulter-document.component';
import { RapportsComponent } from '../rapports/rapports.component';
import { ConsulterRapportComponent } from '../rapports/consulter-rapport/consulter-rapport.component';


registerLocaleData(localeFr);
const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:

 };
@NgModule({
  imports:[
    CommonModule,
    AdminLayoutRouting,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatInputModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressBarModule,
    NgxMatSelectSearchModule,
    MatListModule,
    MatSnackBarModule,
    NgxDropzoneModule,
    DropzoneModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatSelectFilterModule,
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
  ],
  exports: [
    MatSelectFilterModule,
    MatIconModule
  ],
  declarations: [
    DashboardComponent,
    NotificationsComponent,
    ClientsComponent,
    ConsulterClientComponent,
    DocumentsComponent,
    ConsulterDocumentComponent,
    RapportsComponent,
    ConsulterRapportComponent,
    UsersComponent,
    AddUserComponent,
    UpdateUserComponent,
    ConsulterQuestionnaireComponent
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG
    }
  ]
})


export class AdminLayoutModule {}
