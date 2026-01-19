import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from '../../shared/prime-ng.module';
import { passwordRotationLogsRoutes } from './password-rotation-logs.routes';
import { PasswordRotationLogsComponent } from './password-rotation-logs.component';

@NgModule({
  declarations: [PasswordRotationLogsComponent],
  imports: [
    CommonModule,
    FormsModule,
    PrimeNgModule,
    RouterModule.forChild(passwordRotationLogsRoutes),
  ],
})
export class PasswordRotationLogsModule {}
