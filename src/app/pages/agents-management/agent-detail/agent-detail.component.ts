import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { AgentService } from '../../../service/agent.service';
import {
  IAgentProfileResponse,
  IContactEmailResponse,
  ICredentialResponse,
  IResAccountResponse,
} from '../../../types/agent/agent.type';

@Component({
  selector: 'app-agent-detail',
  templateUrl: './agent-detail.component.html',
  styleUrls: ['./agent-detail.component.scss'],
  standalone: false,
})
export class AgentDetailComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  agentId = 0;
  agent: IAgentProfileResponse | null = null;
  resAccounts: IResAccountResponse[] = [];
  contactEmails: IContactEmailResponse = [];
  apiKeys: ICredentialResponse[] = [];

  loading = false;
  errorMessage = '';
  resAccountsLoading = false;
  contactEmailsLoading = false;
  apiKeysLoading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agentService: AgentService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    this.agentId = Number(idParam);
    if (!this.agentId) {
      this.errorMessage = 'Invalid agent id.';
      return;
    }

    this.loadAgent();
    this.loadRelatedData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAgent(): void {
    this.loading = true;
    this.errorMessage = '';
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

  loadRelatedData(): void {
    this.resAccountsLoading = true;
    this.contactEmailsLoading = true;
    this.apiKeysLoading = true;

    forkJoin({
      resAccounts: this.agentService.getResAccounts(this.agentId),
      contactEmails: this.agentService.getContactEmails(this.agentId),
      apiKeys: this.agentService.getApiKeys(this.agentId),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.resAccounts = res.resAccounts?.data ?? [];
          this.contactEmails = res.contactEmails?.data ?? [];
          this.apiKeys = res.apiKeys?.data ?? [];
          this.resAccountsLoading = false;
          this.contactEmailsLoading = false;
          this.apiKeysLoading = false;
        },
        error: (err) => {
          this.resAccountsLoading = false;
          this.contactEmailsLoading = false;
          this.apiKeysLoading = false;
          this.errorMessage = this.resolveErrorMessage(err);
        },
      });
  }

  getPrimaryEmail(): string {
    const emails = this.agent?.emails ?? [];
    const primaryEmail = emails.find(
      (email) => email.isPrimary || email.isprimary
    );
    return primaryEmail?.email || emails[0]?.email || '-';
  }

  navigateToEdit(): void {
    this.router.navigate(['/admin/agents', this.agentId, 'edit']);
  }

  navigateToList(): void {
    this.router.navigate(['/admin/agents']);
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
}
