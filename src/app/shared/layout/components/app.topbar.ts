import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../../layout/service/layout.service';
import { AppBreadcrumb } from './app.breadcrumb';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: '[app-topbar]',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    StyleClassModule,
    AppBreadcrumb,
    InputTextModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    TooltipModule,
  ],
  template: `<div class="layout-topbar">
    <div class="topbar-start">
      <button
        #menubutton
        type="button"
        class="topbar-menubutton p-link p-trigger"
        (click)="onMenuButtonClick()"
      >
        <i class="pi pi-bars"></i>
      </button>
      <nav app-breadcrumb class="topbar-breadcrumb"></nav>
    </div>

    <div class="topbar-end">
      <ul class="topbar-menu">
        <li>
          <p-button
            icon="pi pi-info-circle"
            rounded
            pTooltip="Member Benefits Information"
            tooltipPosition="bottom"
            (onClick)="onMemberInfoButtonClick()"
          ></p-button>
        </li>
        <li>
          <p-button
            icon="pi pi-palette"
            rounded
            pTooltip="Open configuration theme app"
            tooltipPosition="bottom"
            (onClick)="onConfigButtonClick()"
          ></p-button>
        </li>
        <li class="topbar-profile">
          <button
            type="button"
            class="p-link"
            (click)="onProfileButtonClick()"
            pTooltip="Open profile"
            tooltipPosition="left"
          >
            <img src="./images/avatar.webp" alt="Profile" />
          </button>
        </li>
      </ul>
    </div>
  </div>`,
})
export class AppTopbar {
  @ViewChild('menubutton') menuButton!: ElementRef;

  constructor(public layoutService: LayoutService) {}

  onMenuButtonClick() {
    this.layoutService.onMenuToggle();
  }

  onProfileButtonClick() {
    this.layoutService.showProfileSidebar();
  }

  onConfigButtonClick() {
    this.layoutService.showConfigSidebar();
  }

  onMemberInfoButtonClick() {
    window.open('https://www.nokair.com/Member/Benefit', '_blank');
  }
}
