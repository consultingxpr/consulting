import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { AdminLayoutComponent } from './admin-layout.component';
import { NgModule } from '@angular/core';
import { ConsulterClientComponent } from '../clients/consulter-client/consulter-client.component';
import { RapportsComponent } from '../rapports/rapports.component';
import { ConsulterQuestionnaireComponent } from '../consulter-questionnaire/consulter-questionnaire.component';
import { UsersComponent } from '../users/users.component';
import { AddUserComponent } from '../users/add-user/add-user.component';
import { UpdateUserComponent } from '../users/update-user/update-user.component';
import { DocumentsComponent } from '../documents/documents.component';
import { ConsulterRapportComponent } from '../rapports/consulter-rapport/consulter-rapport.component';
import { ConsulterDocumentComponent } from '../documents/consulter-document/consulter-document.component';
import { ClientsComponent } from '../clients/clients.component';






export const AdminLayoutRoutes: Routes = [

            {
                path: 'dashboard', component: DashboardComponent,
                data: { title: 'Tableau de bord' }
            },
            {
                path: 'clients', component: ClientsComponent,
                data: { title: 'Liste des clients' }
            },
            {
                path: 'clients/consulter-client', component: ConsulterClientComponent,
                data: { title: 'Consulter un client' }
            },
            {
                path: 'rapports', component: RapportsComponent,
                data: { title: 'Liste des rapports' }
            },
            {
                path: 'rapports/consulter-rapport', component: ConsulterRapportComponent,
                data: { title: 'Consulter un rapport' }
            },
            {
                path: 'documents', component: DocumentsComponent,
                data: { title: 'Liste des documents' }
            },
            {
                path: 'documents/consulter-document', component: ConsulterDocumentComponent,
                data: { title: 'Consulter un document' }
            },
            {
                path: 'formulaire/consulter-form', component: ConsulterQuestionnaireComponent,
                data: { title: 'Consulter un questionnaire' }
            },
            {
                path: 'users', component: UsersComponent,
                data: { title: 'Liste des utilisateurs' }
            },
            {
                path: 'ajouter-user', component: AddUserComponent,
                data: { title: 'Ajouter un utilisateur' }
            },
            {
                path: 'users/consulter-user', component: UpdateUserComponent,
                data: { title: 'Tableau de bord' }
            },
            {
                path: 'notifications', component: NotificationsComponent,
                data: { title: 'Notifications' }
            }
];


@NgModule({
    imports: [RouterModule.forChild(AdminLayoutRoutes)],
    exports: [RouterModule]
})
export class AdminLayoutRouting { }
