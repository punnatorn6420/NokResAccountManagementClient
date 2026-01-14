import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AppMenuitem } from './app.menuitem';
// import { PermissionService } from '../../../service/permission.service';
import { PrimeNgModule } from '../../prime-ng.module';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, AppMenuitem, RouterModule, PrimeNgModule],
  template: `<ul class="layout-menu">
    <ng-container *ngFor="let item of model; let i = index">
      <li
        app-menuitem
        *ngIf="!item.separator"
        [item]="item"
        [index]="i"
        [root]="true"
      ></li>
      <li *ngIf="item.separator" class="menu-separator"></li>
    </ng-container>
  </ul> `,
})
export class AppMenu {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  model: any[] = [];

  constructor() {}

  ngOnInit() {
    this.model = [
      {
        label: 'Check Member Tier',
        icon: 'pi pi-home',
        routerLink: ['/admin/check-member-tier'],
      },
    ];
  }
}
