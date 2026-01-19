import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { AgentService } from '../../../service/agent.service';
import {
  IResAccountRequest,
  IResAccountResponse,
} from '../../../types/agent/agent.type';

@Component({
  selector: 'app-agent-res-accounts',
  templateUrl: './agent-res-accounts.component.html',
  styleUrls: ['./agent-res-accounts.component.scss'],
  standalone: false,
})
export class AgentResAccountsComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() agentId = 0;

  private destroy$ = new Subject<void>();

  resAccounts: IResAccountResponse[] = [];
  resAccountsLoading = false;
  resAccountsError = '';

  resAccountDialogVisible = false;
  resAccountSubmitting = false;
  resAccountForm!: FormGroup;
  editingResAccount: IResAccountResponse | null = null;

  environmentOptions = [
    { label: 'PROD', value: 'PROD' },
    { label: 'UAT', value: 'UAT' },
  ];

  constructor(
    private agentService: AgentService,
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.buildForms();
    if (this.agentId) {
      this.loadResAccounts();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['agentId'] && this.agentId) {
      this.loadResAccounts();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadResAccounts(): void {
    if (!this.agentId) {
      this.resAccountsError = 'Invalid agent id.';
      return;
    }

    this.resAccountsLoading = true;
    this.resAccountsError = '';
    this.agentService
      .getResAccounts(this.agentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.resAccounts = res?.data ?? [];
          this.resAccountsLoading = false;
        },
        error: (err) => {
          this.resAccountsLoading = false;
          this.resAccounts = [];
          this.resAccountsError = this.resolveErrorMessage(err);
        },
      });
  }

  openCreateResAccount(): void {
    this.editingResAccount = null;
    this.resAccountForm.reset({
      userName: '',
      environment: null,
      isPrimary: false,
      isWorking: true,
      active: true,
      note: '',
    });
    this.resAccountDialogVisible = true;
  }

  openEditResAccount(row: IResAccountResponse): void {
    this.editingResAccount = row;
    this.resAccountForm.reset({
      userName: row.userName,
      environment: row.environment,
      isPrimary: row.isPrimary,
      isWorking: row.isWorking,
      active: row.active,
      note: row.note,
    });
    this.resAccountDialogVisible = true;
  }

  submitResAccount(): void {
    if (this.resAccountForm.invalid) {
      this.resAccountForm.markAllAsTouched();
      return;
    }

    this.resAccountSubmitting = true;
    const payload = this.buildResAccountPayload();
    const request$ = this.editingResAccount
      ? this.agentService.updateResAccount(
          this.agentId,
          this.editingResAccount.id,
          payload,
        )
      : this.agentService.createResAccount(this.agentId, payload);

    request$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.resAccountSubmitting = false;
        this.resAccountDialogVisible = false;
        this.messageService.add({
          severity: 'success',
          summary: this.editingResAccount
            ? 'RES account updated'
            : 'RES account created',
          detail: this.editingResAccount
            ? 'The RES account has been updated.'
            : 'A new RES account has been created.',
        });
        this.editingResAccount = null;
        this.loadResAccounts();
      },
      error: (err) => {
        this.resAccountSubmitting = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Unable to save RES account',
          detail: this.resolveErrorMessage(err),
        });
      },
    });
  }

  private buildForms(): void {
    this.resAccountForm = this.fb.group({
      userName: ['', Validators.required],
      environment: [null, Validators.required],
      isPrimary: [false],
      isWorking: [true],
      note: [''],
      active: [true],
    });
  }

  private buildResAccountPayload(): IResAccountRequest {
    const raw = this.resAccountForm.getRawValue();
    return {
      userName: raw.userName?.trim(),
      environment: raw.environment,
      isPrimary: Boolean(raw.isPrimary),
      isWorking: Boolean(raw.isWorking),
      note: raw.note?.trim() || undefined,
      active: Boolean(raw.active),
    };
  }

  private resolveErrorMessage(err: unknown): string {
    const fallbackMessage =
      'Unable to load RES accounts. Please try again.';
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
