import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../shared/prime-ng.module';
import { ConfirmationService } from 'primeng/api';
import { CoreModule } from '../../shared/core/core.module';
import { SkeletonLoadingModule } from '../../shared/skeleton-loading/skeleton-loading.module';
import { agentsManagementRoutes } from './agents-management.routes';
import { AgentsManagementComponent } from './agents-management.component';
import { AgentCreateComponent } from './agent-create/agent-create.component';
import { AgentDetailComponent } from './agent-detail/agent-detail.component';
import { AgentEditComponent } from './agent-create/agent-edit.component.edit';
import { AgentContactEmailsComponent } from './agent-detail/agent-contact-emails.component';
import { AgentResAccountsComponent } from './agent-detail/agent-res-accounts.component';
import { AgentApiKeysComponent } from './agent-detail/agent-api-keys.component';

@NgModule({
  declarations: [
    AgentsManagementComponent,
    AgentCreateComponent,
    AgentEditComponent,
    AgentDetailComponent,
    AgentContactEmailsComponent,
    AgentResAccountsComponent,
    AgentApiKeysComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SkeletonLoadingModule,
    PrimeNgModule,
    CoreModule,
    RouterModule.forChild(agentsManagementRoutes),
  ],
  providers: [ConfirmationService],
})
export class AgentsManagementModule {}
