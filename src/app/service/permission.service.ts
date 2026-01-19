import { Injectable } from '@angular/core';
import { IUserRole } from '../types/auth.model';
import { AuthService } from './auth.service';
import { filter, take, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PermissionService {
  constructor(private authService: AuthService) {}

  private getCurrentUser() {
    return this.authService.getCurrentUser();
  }

  userReady$() {
    return this.authService.currentUser$.pipe(
      filter((u) => !!u),
      take(1),
      map(() => true),
    );
  }

  canAnyAuthenticated(): boolean {
    const currentUser = this.getCurrentUser();
    return !!currentUser;
  }

  canOnlyAdmin(): boolean {
    const currentUser = this.getCurrentUser();
    const allowedRoles: IUserRole[] = [IUserRole.Admin];
    return currentUser
      ? currentUser.roles.some((role) => allowedRoles.includes(role))
      : false;
  }

  canAgentsManagement(): boolean {
    const currentUser = this.getCurrentUser();
    const allowedRoles: IUserRole[] = [IUserRole.Admin];
    return currentUser
      ? currentUser.roles.some((role) => allowedRoles.includes(role))
      : false;
  }

  canAgentsCreation(): boolean {
    const currentUser = this.getCurrentUser();
    const allowedRoles: IUserRole[] = [IUserRole.Admin];
    return currentUser
      ? currentUser.roles.some((role) => allowedRoles.includes(role))
      : false;
  }

  canAgentsEdit(): boolean {
    const currentUser = this.getCurrentUser();
    const allowedRoles: IUserRole[] = [IUserRole.Admin];
    return currentUser
      ? currentUser.roles.some((role) => allowedRoles.includes(role))
      : false;
  }
}
