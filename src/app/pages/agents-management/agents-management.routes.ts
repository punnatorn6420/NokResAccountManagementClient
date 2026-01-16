import { Routes } from '@angular/router';
import { RoleGuard } from '../../shared/core/guard/role.guard';
import { AgentsManagementComponent } from './agents-management.component';

export const agentsManagementRoutes: Routes = [
  {
    path: '',
    canMatch: [RoleGuard],
    data: { permission: 'canAgentsManagement' },
    component: AgentsManagementComponent,
  },
  // {
  //   path: 'transaction/:transactionId',
  //   canMatch: [RoleGuard],
  //   data: { permission: 'canFlightDisruption' },
  //   component: FlightDisruptionEventComponent,
  // },
  // {
  //   path: 'event/:eventId',
  //   canMatch: [RoleGuard],
  //   data: { permission: 'canViewEvents' },
  //   component: FlightDisruptionBookingComponent,
  // },
];
