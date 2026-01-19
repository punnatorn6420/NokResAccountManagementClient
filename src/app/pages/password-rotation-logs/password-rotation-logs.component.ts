import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  interval,
  switchMap,
  takeUntil,
  catchError,
  EMPTY,
} from 'rxjs';
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
  loading = false;
  errorMessage = '';
  keyword = '';
  lastRefreshedAt: Date | null = null;
  autoRefreshMs = 300000;
  private preload = false;
  messageDialogVisible = false;
  selectedLog: IPasswordRotationLog | null = null;
  private readonly truncateThreshold = 80;

  constructor(private logService: PasswordRotationLogService) {}

  ngOnInit(): void {
    this.keyword$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((kw) => {
        this.keyword = kw;
        this.loadLogs({ silent: true });
      });

    this.loadLogs({ silent: false });
    this.startAutoRefresh();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onKeywordChange(value: string): void {
    this.keyword$.next(value ?? '');
  }

  clearFilters(): void {
    this.keyword = '';
    this.keyword$.next('');
  }

  loadLogs(opts?: { silent?: boolean }): void {
    this.preload = true;
    if (!opts?.silent) {
      this.loading = true;
    }
    this.errorMessage = '';
    this.logService
      .getLogs({ keyword: this.keyword })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.logs = res?.data ?? [];
          this.lastRefreshedAt = new Date();
          this.preload = false;
          this.loading = false;
        },
        error: (err) => {
          this.logs = [];
          this.preload = false;
          this.loading = false;
          this.errorMessage = this.resolveErrorMessage(err);
        },
      });
  }

  private startAutoRefresh(): void {
    interval(this.autoRefreshMs)
      .pipe(
        takeUntil(this.destroy$),
        filter(() => !document.hidden),
        filter(() => !this.preload),
        switchMap(() =>
          this.logService
            .getLogs({ keyword: this.keyword })
            .pipe(catchError(() => EMPTY)),
        ),
      )
      .subscribe((res) => {
        this.logs = res?.data ?? [];
        this.lastRefreshedAt = new Date();
        this.preload = false;
      });
  }

  openMessage(row: IPasswordRotationLog): void {
    const msg = row?.message?.trim();
    if (!msg) return;

    this.selectedLog = row;
    this.messageDialogVisible = true;
  }

  isMessageTruncated(row: IPasswordRotationLog): boolean {
    const msg = row?.message ?? '';
    return msg.trim().length > this.truncateThreshold;
  }

  getStatusClass(status?: string): string {
    const normalized = status?.toLowerCase();
    if (normalized === 'success')
      return 'text-green-700 bg-green-50 border border-green-200 px-2 py-1 rounded-full';
    if (normalized === 'failed')
      return 'text-red-700 bg-red-50 border border-red-200 px-2 py-1 rounded-full';
    if (normalized === 'pending')
      return 'text-yellow-700 bg-yellow-50 border border-yellow-200 px-2 py-1 rounded-full';
    return 'text-gray-700 bg-gray-50 border border-gray-200 px-2 py-1 rounded-full';
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
