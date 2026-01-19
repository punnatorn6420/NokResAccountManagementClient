import { Routes } from '@angular/router';
import { PasswordRotationLogsComponent } from './password-rotation-logs.component';
import { RoleGuard } from '../../shared/core/guard/role.guard';

export const passwordRotationLogsRoutes: Routes = [
  {
    path: '',
    component: PasswordRotationLogsComponent,
    canActivate: [RoleGuard],
    data: { permission: 'canOnlyAdmin' },
  },
];
