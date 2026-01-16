import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { AgentService } from '../../service/agent.service';
import { AgentProfileResponse } from '../../types/agent/agent.type';

@Component({
  selector: 'app-agents-management',
  templateUrl: './agents-management.component.html',
  styleUrls: ['./agents-management.component.scss'],
})
export class AgentsManagementComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private keyword$ = new Subject<string>();

  // table state
  agents: AgentProfileResponse[] = [];
  loading = false;
  errorMessage = '';

  // query state
  keyword = '';
  pageNumber = 1;
  pageSize = 25;
  ascending = true;

  // pagination (mock doesn’t return total; we’ll use agents.length for now)
  totalRecords = 0;

  constructor(private agentService: AgentService, private router: Router) {}

  ngOnInit(): void {
    // debounce keyword search
    this.keyword$
      .pipe(debounceTime(350), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((kw) => {
        this.keyword = kw;
        this.pageNumber = 1; // reset page on new search
        this.loadAgents();
      });

    this.loadAgents();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAgents(): void {
    this.loading = true;
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
          // for mock: total is just current length
          this.totalRecords = this.agents.length;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.agents = [];
          this.totalRecords = 0;
          this.errorMessage =
            err?.error?.message ||
            err?.message ||
            'Unable to load agents. Please try again.';
        },
      });
  }

  onKeywordChange(value: string): void {
    this.keyword$.next(value ?? '');
  }

  onToggleSort(): void {
    this.ascending = !this.ascending;
    this.pageNumber = 1;
    this.loadAgents();
  }

  onPageChange(event: { first: number; rows: number }): void {
    // Prime paginator: first is zero-based index
    const first = event.first ?? 0;
    const rows = event.rows ?? this.pageSize;

    this.pageSize = rows;
    this.pageNumber = Math.floor(first / rows) + 1;

    this.loadAgents();
  }

  viewAgent(row: AgentProfileResponse): void {
    this.router.navigate(['/agents', row.id]);
  }

  editAgent(row: AgentProfileResponse): void {
    this.router.navigate(['/agents', row.id, 'edit']);
  }
}
