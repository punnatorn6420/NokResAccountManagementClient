import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  interval,
  takeUntil,
  filter,
  switchMap,
  catchError,
  EMPTY,
} from 'rxjs';
import { AgentService } from '../../service/agent.service';
import {
  IAgentProfileResponse,
  IAgentProfileType,
  ICurrency,
} from '../../types/agent/agent.type';
import { PaginatorState } from 'primeng/paginator';
import {
  CurrencyUIMap,
  AgentTypeUIMap,
} from '../../shared/constant/agent-lookups';

@Component({
  selector: 'app-agents-management',
  templateUrl: './agents-management.component.html',
  styleUrls: ['./agents-management.component.scss'],
  standalone: false,
})
export class AgentsManagementComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private keyword$ = new Subject<string>();
  agents: IAgentProfileResponse[] = [];
  loading = false;
  errorMessage = '';
  keyword = '';
  pageNumber = 1;
  pageSize = 25;
  first = 0;
  ascending = true;
  lastRefreshedAt: Date | null = null;
  autoRefreshMs = 300000;
  totalRecords = 0;
  CurrencyUIMap = CurrencyUIMap;
  AgentTypeUIMap = AgentTypeUIMap;

  constructor(
    private agentService: AgentService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.keyword$
      .pipe(debounceTime(350), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((kw) => {
        this.keyword = kw;
        this.pageNumber = 1;
        this.first = 0;
        this.loadAgents({ silent: true });
      });
    this.loadAgents({ silent: false });
    this.startAutoRefresh();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAgents(opts?: { silent?: boolean }): void {
    const silent = opts?.silent ?? false;
    if (!silent) {
      this.loading = true;
    }
    this.errorMessage = '';

    this.agentService
      .getAgents({
        keyword: this.keyword,
        pageNumber: this.pageNumber,
        pageSize: this.pageSize,
        ascending: this.ascending,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.agents = res?.data ?? [];
          this.totalRecords = this.agents.length;
          this.lastRefreshedAt = new Date();
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.agents = [];
          this.totalRecords = 0;
          this.errorMessage = this.resolveErrorMessage(err);
        },
      });
  }

  private startAutoRefresh(): void {
    interval(this.autoRefreshMs)
      .pipe(
        takeUntil(this.destroy$),
        filter(() => !document.hidden),
        filter(() => !this.loading),
        switchMap(() =>
          this.agentService
            .getAgents({
              keyword: this.keyword,
              pageNumber: this.pageNumber,
              pageSize: this.pageSize,
              ascending: this.ascending,
            })
            .pipe(catchError(() => EMPTY)),
        ),
      )
      .subscribe((res) => {
        this.agents = res?.data ?? [];
        this.totalRecords = this.agents.length;
        this.lastRefreshedAt = new Date();
      });
  }

  onKeywordChange(value: string): void {
    this.keyword$.next(value ?? '');
  }

  onToggleSort(): void {
    this.ascending = !this.ascending;
    this.pageNumber = 1;
    this.first = 0;
    this.loadAgents({ silent: true });
  }

  onPageChange(event: PaginatorState): void {
    const first = event.first ?? 0;
    const rows = event.rows ?? this.pageSize;

    this.first = first;
    this.pageSize = rows;
    this.pageNumber = Math.floor(first / rows) + 1;

    this.loadAgents({ silent: true });
  }

  clearFilters(): void {
    this.keyword = '';
    this.pageNumber = 1;
    this.first = 0;
    this.onKeywordChange('');
  }

  // getPrimaryEmail(row: IAgentProfileResponse): string {
  //   const emails = row.emails ?? [];
  //   const primaryEmail = emails.find(
  //     (email) =>
  //       email.isPrimary ||
  //       (email as { isprimary?: boolean }).isprimary === true,
  //   );
  //   return primaryEmail?.email || emails[0]?.email || '-';
  // }

  private resolveErrorMessage(err: unknown): string {
    const fallbackMessage = 'Unable to load agents. Please try again.';
    if (!err || typeof err !== 'object') return fallbackMessage;

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

  viewAgent(row: IAgentProfileResponse): void {
    this.router.navigate(['/admin/agents', row.id]);
  }

  editAgent(row: IAgentProfileResponse): void {
    this.router.navigate(['/admin/agents', row.id, 'edit']);
  }

  createAgent(): void {
    this.router.navigate(['/admin/agents/create']);
  }

  getCurrencyUI(currency?: ICurrency) {
    return currency ? this.CurrencyUIMap[currency] : null;
  }

  getAgentTypeUI(type?: IAgentProfileType) {
    return type ? this.AgentTypeUIMap[type] : null;
  }
}
