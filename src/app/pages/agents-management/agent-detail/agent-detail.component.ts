import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subject, switchMap, startWith, takeUntil } from 'rxjs';
import { AgentService } from '../../../service/agent.service';
import {
  IAgentEmail,
  IAgentProfileItem,
} from '../../../types/agent/agent.type';
import { GuidedTourService } from '../../../shared/core/services/guided-tour.service';

@Component({
  selector: 'app-agent-detail',
  templateUrl: './agent-detail.component.html',
  styleUrls: ['./agent-detail.component.scss'],
  standalone: false,
})
export class AgentDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  agentId = 0;
  agent: IAgentProfileItem | null = null;
  primaryEmail = '';

  loading = false;
  errorMessage = '';
  autoRefreshMs = 30000;
  lastRefreshedAt: Date | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService,
    private guidedTourService: GuidedTourService,
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.agentId = Number(idParam);
    if (!this.agentId) {
      this.errorMessage = 'Invalid agent id.';
      return;
    }

    this.startAutoRefresh();
  }

  reloadAgent() {
    this.loadAgent({ silent: false });
  }

  private startAutoRefresh(): void {
    this.loading = true;
    this.errorMessage = '';

    interval(this.autoRefreshMs)
      .pipe(
        startWith(0),
        switchMap(() => this.agentService.getAgent(this.agentId)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (res) => {
          this.agent = res?.data ?? null;
          this.loading = false;
          this.lastRefreshedAt = new Date();
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = this.resolveErrorMessage(err);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAgent(_opts?: { silent?: boolean }): void {
    this.loading = true;
    this.agentService
      .getAgent(this.agentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.agent = res?.data ?? null;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.errorMessage = this.resolveErrorMessage(err);
        },
      });
  }

  getPrimaryEmail(): string {
    if (this.primaryEmail) {
      return this.primaryEmail;
    }
    const emails = this.agent?.emails ?? [];
    return this.resolvePrimaryEmail(emails);
  }

  navigateToEdit(): void {
    this.router.navigate(['/admin/agents', this.agentId, 'edit']);
  }

  navigateToList(): void {
    this.router.navigate(['/admin/agents']);
  }

  onPrimaryEmailChange(email: string): void {
    this.primaryEmail = email;
  }

  startGuidedTour(): void {
    this.guidedTourService.startAgentDetailTour();
  }

  private resolveErrorMessage(err: unknown): string {
    const fallbackMessage =
      'Unable to load agent information. Please try again.';
    if (!err || typeof err !== 'object') {
      return fallbackMessage;
    }
    const error = err as {
      message?: string;
      error?: {
        message?: string;
        userMessage?: string;
        error?: { userMessage?: string };
      };
    };
    return (
      error?.error?.message ||
      error?.error?.userMessage ||
      error?.error?.error?.userMessage ||
      error?.message ||
      fallbackMessage
    );
  }

  private resolvePrimaryEmail(emails: IAgentEmail[]): string {
    const primaryEmail = emails.find(
      (email) => email.isPrimary || email.isprimary,
    );
    return primaryEmail?.email || emails[0]?.email || '-';
  }
}
