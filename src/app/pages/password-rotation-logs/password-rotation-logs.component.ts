import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { PasswordRotationLogService } from '../../service/password-rotation-log.service';
import { IPasswordRotationLog } from '../../types/password-rotation-log.type';

@Component({
  selector: 'app-password-rotation-logs',
  templateUrl: './password-rotation-logs.component.html',
  styleUrls: ['./password-rotation-logs.component.scss'],
  standalone: false,
})
export class PasswordRotationLogsComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private keyword$ = new Subject<string>();

  logs: IPasswordRotationLog[] = [];
  filteredLogs: IPasswordRotationLog[] = [];
  loading = false;
  errorMessage = '';
  keyword = '';
  lastRefreshedAt: Date | null = null;

  constructor(private logService: PasswordRotationLogService) {}

  ngOnInit(): void {
    this.keyword$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((kw) => {
        this.keyword = kw;
        this.applyFilter();
      });

    this.loadLogs();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadLogs(): void {
    this.loading = true;
    this.errorMessage = '';

    this.logService
      .getLogs()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.logs = res?.data ?? [];
          this.applyFilter();
          this.lastRefreshedAt = new Date();
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.logs = [];
          this.filteredLogs = [];
          this.errorMessage = this.resolveErrorMessage(err);
        },
      });
  }

  onKeywordChange(value: string): void {
    this.keyword$.next(value ?? '');
  }

  clearFilters(): void {
    this.keyword = '';
    this.onKeywordChange('');
  }

  getStatusClass(status?: string): string {
    const normalized = status?.toLowerCase();
    if (normalized === 'success') return 'status-pill status-pill--success';
    if (normalized === 'failed') return 'status-pill status-pill--failed';
    if (normalized === 'pending') return 'status-pill status-pill--pending';
    return 'status-pill status-pill--neutral';
  }

  private applyFilter(): void {
    const keyword = this.keyword.trim().toLowerCase();
    if (!keyword) {
      this.filteredLogs = [...this.logs];
      return;
    }

    this.filteredLogs = this.logs.filter((log) => {
      const accountId = String(log.accountId ?? '').toLowerCase();
      const message = log.message?.toLowerCase() ?? '';
      const status = log.status?.toLowerCase() ?? '';
      const createdBy = log.createdBy?.toLowerCase() ?? '';
      const createdAt = log.createdAt?.toLowerCase() ?? '';
      const id = String(log.id ?? '').toLowerCase();

      return (
        accountId.includes(keyword) ||
        message.includes(keyword) ||
        status.includes(keyword) ||
        createdBy.includes(keyword) ||
        createdAt.includes(keyword) ||
        id.includes(keyword)
      );
    });
  }

  private resolveErrorMessage(err: unknown): string {
    const fallbackMessage =
      'Unable to load password rotation logs. Please try again.';
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
}
