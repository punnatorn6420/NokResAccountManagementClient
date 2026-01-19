import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from './pages.routes';
import { CommonModule } from '@angular/common';
import { PrimeNgModule } from '../shared/prime-ng.module';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
  declarations: [DashboardComponent],
})
export class PagesModule {}
