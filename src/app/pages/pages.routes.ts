import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RoleGuard } from '../shared/core/guard/role.guard';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'agents',
    canMatch: [RoleGuard],
    data: { permission: 'canAgentsManagement' },
    loadChildren: () =>
      import('./agents-management/agents-management.module').then(
        (m) => m.AgentsManagementModule
      ),
  },
];
