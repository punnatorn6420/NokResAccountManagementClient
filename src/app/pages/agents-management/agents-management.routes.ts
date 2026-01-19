import { Routes } from '@angular/router';
import { RoleGuard } from '../../shared/core/guard/role.guard';
import { AgentsManagementComponent } from './agents-management.component';
import { AgentCreateComponent } from './agent-create/agent-create.component';
import { AgentDetailComponent } from './agent-detail/agent-detail.component';
import { AgentEditComponent } from './agent-edit/agent-edit.component.edit';

export const agentsManagementRoutes: Routes = [
  {
    path: '',
    canMatch: [RoleGuard],
    data: { permission: 'canAgentsManagement' },
    component: AgentsManagementComponent,
  },
  {
    path: 'create',
    canMatch: [RoleGuard],
    data: { permission: 'canAgentsManagement' },
    component: AgentCreateComponent,
  },
  {
    path: ':id',
    canMatch: [RoleGuard],
    data: { permission: 'canAgentsManagement' },
    component: AgentDetailComponent,
  },
  {
    path: ':id/edit',
    canMatch: [RoleGuard],
    data: { permission: 'canAgentsManagement' },
    component: AgentEditComponent,
  },
];
