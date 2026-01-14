import { Injectable } from '@angular/core';
import {
  CanMatch,
  Route,
  UrlTree,
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { MessageService } from 'primeng/api';
import { catchError, map, Observable, of } from 'rxjs';
import { PermissionService } from '../../../service/permission.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanMatch, CanActivate {
  constructor(
    private permissionService: PermissionService,
    private router: Router,
    private messageService: MessageService,
  ) {}

  canMatch(route: Route): Observable<boolean | UrlTree> {
    const fnName = route.data?.['permission'] as string | undefined;
    return this.waitAndEvaluate(fnName);
  }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    const fnName = route.data?.['permission'] as string | undefined;
    return this.waitAndEvaluate(fnName);
  }

  private waitAndEvaluate(fnName?: string): Observable<boolean | UrlTree> {
    return this.permissionService.userReady$().pipe(
      map(() => this.evaluateSync(fnName)),
      catchError(() => of(this.router.parseUrl('/check-member-tier'))),
    );
  }

  private evaluateSync(fnName?: string): boolean | UrlTree {
    if (
      !fnName ||
      typeof this.permissionService[fnName as keyof PermissionService] !==
        'function'
    ) {
      setTimeout(() => {
        this.messageService.add({
          severity: 'error',
          summary: 'Permission Error',
          detail: 'No valid permission function found for route.',
          life: 4000,
        });
      });
      return this.router.parseUrl('/check-member-tier');
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const allowed: boolean = (this.permissionService as any)[fnName]();
    if (allowed) return true;

    setTimeout(() => {
      this.messageService.add({
        severity: 'warn',
        summary: 'Unauthorized',
        detail: 'You do not have permission to access this page.',
        life: 4000,
      });
    });
    return this.router.parseUrl('/check-member-tier');
  }
}
