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
  CredentialRequest,
  ICredentialResponse,
} from '../../../types/agent/agent.type';

@Component({
  selector: 'app-agent-api-keys',
  templateUrl: './agent-api-keys.component.html',
  styleUrls: ['./agent-api-keys.component.scss'],
  standalone: false,
})
export class AgentApiKeysComponent implements OnInit, OnChanges, OnDestroy {
  @Input() agentId = 0;

  private destroy$ = new Subject<void>();

  apiKeys: ICredentialResponse[] = [];
  apiKeysLoading = false;
  apiKeysError = '';

  apiKeyDialogVisible = false;
  apiKeySubmitting = false;
  apiKeyForm!: FormGroup;
  editingApiKey: ICredentialResponse | null = null;

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
      this.loadApiKeys();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['agentId'] && this.agentId) {
      this.loadApiKeys();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadApiKeys(): void {
    if (!this.agentId) {
      this.apiKeysError = 'Invalid agent id.';
      return;
    }

    this.apiKeysLoading = true;
    this.apiKeysError = '';
    this.agentService
      .getApiKeys(this.agentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.apiKeys = res?.data ?? [];
          this.apiKeysLoading = false;
        },
        error: (err) => {
          this.apiKeysLoading = false;
          this.apiKeys = [];
          this.apiKeysError = this.resolveErrorMessage(err);
        },
      });
  }

  openCreateApiKey(): void {
    this.editingApiKey = null;
    this.apiKeyForm.reset({
      name: '',
      environment: null,
      active: true,
    });
    this.apiKeyDialogVisible = true;
  }

  openEditApiKey(row: ICredentialResponse): void {
    this.editingApiKey = row;
    this.apiKeyForm.reset({
      name: row.name,
      environment: row.environment,
      active: row.active,
    });
    this.apiKeyDialogVisible = true;
  }

  submitApiKey(): void {
    if (this.apiKeyForm.invalid) {
      this.apiKeyForm.markAllAsTouched();
      return;
    }

    this.apiKeySubmitting = true;
    const payload = this.buildApiKeyPayload();
    const request$ = this.editingApiKey
      ? this.agentService.updateApiKey(this.editingApiKey.id, payload)
      : this.agentService.createApiKey(this.agentId, payload);

    request$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.apiKeySubmitting = false;
        this.apiKeyDialogVisible = false;
        this.messageService.add({
          severity: 'success',
          summary: this.editingApiKey ? 'API key updated' : 'API key created',
          detail: this.editingApiKey
            ? 'The API key has been updated.'
            : 'A new API key has been created.',
        });
        this.editingApiKey = null;
        this.loadApiKeys();
      },
      error: (err) => {
        this.apiKeySubmitting = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Unable to save API key',
          detail: this.resolveErrorMessage(err),
        });
      },
    });
  }

  private buildForms(): void {
    this.apiKeyForm = this.fb.group({
      name: ['', Validators.required],
      environment: [null, Validators.required],
      active: [true],
    });
  }

  private buildApiKeyPayload(): CredentialRequest {
    const raw = this.apiKeyForm.getRawValue();
    return {
      name: raw.name?.trim(),
      environment: raw.environment,
      active: Boolean(raw.active),
    };
  }

  private resolveErrorMessage(err: unknown): string {
    const fallbackMessage = 'Unable to load API keys. Please try again.';
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
