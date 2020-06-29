import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormulairesComponent } from './formulaires/formulaires.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AjouterFormulaireComponent } from './formulaires/ajouter-formulaire/ajouter-formulaire.component';
import { ConsulterFormulaireComponent } from './formulaires/consulter-formulaire/consulter-formulaire.component';
import { RapportsComponent } from './rapports/rapports.component';
import { AjouterRapportComponent } from './rapports/ajouter-rapport/ajouter-rapport.component';
import { ConsulterRapportComponent } from './rapports/consulter-rapport/consulter-rapport.component';
import { DocumentsComponent } from './documents/documents.component';
import { ConsulterDocumentComponent } from './documents/consulter-document/consulter-document.component';
import { FrontOfficeComponent } from './front-office.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';


const routes: Routes = [
      {
        path: 'dashboard', component: DashboardComponent,
        data: { title: 'Tableau de bord' }
      },
      {
        path: 'formulaire', component: FormulairesComponent,
        data: { title: 'Liste des formulaires' }
      },
      {
        path: 'formulaire/ajouter-formulaire', component: AjouterFormulaireComponent,
        data: { title: 'Ajouter un formulaire' }
      },
      {
        path: 'formulaire/consulter-formulaire', component: ConsulterFormulaireComponent,
        data: { title: 'Consulter un formulaire' }
      },
      {
        path: 'rapport', component: RapportsComponent,
        data: { title: 'Liste des rapports' }
      },
      {
        path: 'ajouter-rapport', component: AjouterRapportComponent,
        data: { title: 'Générer un rapport' }
      },
      {
        path: 'rapport/consulter-rapport', component: ConsulterRapportComponent,
        data: { title: 'Liste des rapports' }
      },
      {
        path: 'document', component: DocumentsComponent,
        data: { title: 'Liste des documents' }
      },
      {
        path: 'document/consulter-document', component: ConsulterDocumentComponent,
        data: { title: 'Consulter un document' }
      },
      {
        path: 'profile', component: ProfileComponent,
        data: { title: 'Mon profile' },
      },
      {
        path: 'compte', component: AccountComponent,
        data: { title: 'Mon compte' }
      },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FrontOfficeRoutingModule { }
