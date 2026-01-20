import { Component } from '@angular/core';
import { GuidedTourService } from '../../shared/core/services/guided-tour.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(private guidedTourService: GuidedTourService) {}

  startGuidedTour(): void {
    this.guidedTourService.startDashboardTour();
  }
}
