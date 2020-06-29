import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { FrontOfficeRoutingModule } from './front-office-routing.module';
import { DocumentsComponent } from './documents/documents.component';
import { RapportsComponent } from './rapports/rapports.component';
import { AjouterRapportComponent } from './rapports/ajouter-rapport/ajouter-rapport.component';
import { ConsulterRapportComponent } from './rapports/consulter-rapport/consulter-rapport.component';
import { FormulairesComponent } from './formulaires/formulaires.component';
import { ConsulterFormulaireComponent } from './formulaires/consulter-formulaire/consulter-formulaire.component';
import { AjouterFormulaireComponent } from './formulaires/ajouter-formulaire/ajouter-formulaire.component';
import { ConsulterDocumentComponent } from './documents/consulter-document/consulter-document.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FrontOfficeComponent } from './front-office.component';
import localeFr from '@angular/common/locales/fr';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectFilterModule } from 'mat-select-filter';
import { MatRadioModule } from '@angular/material/radio';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
registerLocaleData(localeFr);

@NgModule({
  declarations: [DocumentsComponent, RapportsComponent, AjouterRapportComponent, ConsulterRapportComponent, FormulairesComponent, ConsulterFormulaireComponent, AjouterFormulaireComponent, ConsulterDocumentComponent, DashboardComponent, ProfileComponent, AccountComponent],
  imports: [
    CommonModule,
    FrontOfficeRoutingModule,
    MatStepperModule,
    FormsModule,
    FileUploadModule,
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
    NgxFileDropModule
  ]
})
export class FrontOfficeModule { }
