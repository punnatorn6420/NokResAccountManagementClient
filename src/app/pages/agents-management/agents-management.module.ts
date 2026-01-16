import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../shared/prime-ng.module';
import { ConfirmationService } from 'primeng/api';
import { CoreModule } from '../../shared/core/core.module';
import { SkeletonLoadingModule } from '../../shared/skeleton-loading/skeleton-loading.module';
import { agentsManagementRoutes } from './agents-management.routes';

@NgModule({
  declarations: [],
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
