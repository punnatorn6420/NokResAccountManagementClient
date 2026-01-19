import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { AgentService } from '../../../service/agent.service';
import {
  IAgentProfileRequest,
  IAgentProfileUpdateRequest,
} from '../../../types/agent/agent.type';
import {
  IApiErrorDetail,
  IApiErrorResponse,
} from '../../../types/common/response.type';

interface SelectOption<T> {
  label: string;
  value: T;
}

@Component({
  selector: 'app-agent-create',
  templateUrl: './agent-create.component.html',
  styleUrls: ['./agent-create.component.scss'],
  standalone: false,
})
export class AgentCreateComponent implements OnInit, OnDestroy {
  protected destroy$ = new Subject<void>();

  form!: FormGroup;
  loading = false;
  submitting = false;
  apiErrorMessage = '';
  apiFieldErrors: IApiErrorDetail[] = [];

  pageTitle = 'Create Agent';
  pageDescription =
    'Provide agent profile information. Required fields are marked with *.';
  submitLabel = 'Create Agent';
  cancelLabel = 'Cancel';
  backLabel = 'Back to list';

  allowEmailEdit = true;
  showActiveToggle = false;

  currencyOptions: SelectOption<string>[] = [
    { label: 'THB', value: 'THB' },
    { label: 'USD', value: 'USD' },
    { label: 'INR', value: 'INR' },
    { label: 'CNY', value: 'CNY' },
  ];

  typeOptions: SelectOption<string>[] = [
    { label: 'Internal', value: 'Internal' },
    { label: 'OTA', value: 'OTA' },
  ];

  constructor(
    protected agentService: AgentService,
    protected fb: FormBuilder,
    protected router: Router,
    protected messageService: MessageService,
    protected route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getControl(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  buildForm(): void {
    this.form = this.fb.group({
      companyName: ['', Validators.required],
      agencyCode: ['', Validators.required],
      currency: [null, Validators.required],
      type: [null, Validators.required],
      firstName: [''],
      lastName: [''],
      primaryEmail: ['', [Validators.required, Validators.email]],
      phone: [''],
      address1: [''],
      address2: [''],
      city: [''],
      state: [''],
      postalCode: [''],
      countryCode: [''],
      region: [''],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.clearApiErrors();

    const payload = this.buildCreatePayload();
    this.agentService
      .createAgent(payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.submitting = false;
          const agentName = res?.data?.companyName || 'Agent';
          this.messageService.add({
            severity: 'success',
            summary: 'Agent created',
            detail: `${agentName} was created successfully.`,
          });
          this.router.navigate(['/admin/agents']);
        },
        error: (err) => {
          this.submitting = false;
          this.handleApiError(err);
        },
      });
  }

  onCancel(): void {
    this.router.navigate(['/admin/agents']);
  }

  onBack(): void {
    this.router.navigate(['/admin/agents']);
  }

  protected buildCreatePayload(): IAgentProfileRequest {
    const raw = this.form.getRawValue();
    return {
      companyName: raw.companyName?.trim(),
      agencyCode: raw.agencyCode?.trim(),
      currency: raw.currency,
      type: raw.type,
      firstName: raw.firstName?.trim() || undefined,
      lastName: raw.lastName?.trim() || undefined,
      emails: raw.primaryEmail
        ? [{ email: raw.primaryEmail.trim(), isprimary: true }]
        : [],
      phone: raw.phone?.trim() || undefined,
      address1: raw.address1?.trim() || undefined,
      address2: raw.address2?.trim() || undefined,
      city: raw.city?.trim() || undefined,
      state: raw.state?.trim() || undefined,
      postalCode: raw.postalCode?.trim() || undefined,
      countryCode: raw.countryCode?.trim() || undefined,
      region: raw.region?.trim() || undefined,
    };
  }

  protected buildUpdatePayload(): IAgentProfileUpdateRequest {
    const raw = this.form.getRawValue();
    return {
      companyName: raw.companyName?.trim(),
      agencyCode: raw.agencyCode?.trim(),
      currency: raw.currency,
      type: raw.type,
      firstName: raw.firstName?.trim() || undefined,
      lastName: raw.lastName?.trim() || undefined,
      phone: raw.phone?.trim() || undefined,
      address1: raw.address1?.trim() || undefined,
      address2: raw.address2?.trim() || undefined,
      city: raw.city?.trim() || undefined,
      state: raw.state?.trim() || undefined,
      postalCode: raw.postalCode?.trim() || undefined,
      countryCode: raw.countryCode?.trim() || undefined,
      region: raw.region?.trim() || undefined,
      active: raw.active ?? undefined,
    };
  }

  protected addActiveControl(): void {
    if (!this.form.contains('active')) {
      this.form.addControl('active', new FormControl(true));
    }
  }

  protected clearApiErrors(): void {
    this.apiErrorMessage = '';
    this.apiFieldErrors = [];
  }

  protected handleApiError(err: unknown): void {
    const fallbackMessage =
      'Unable to save agent details. Please review the form and try again.';
    const error = err as { error?: IApiErrorResponse; message?: string };
    this.apiErrorMessage =
      error?.error?.userMessage ||
      error?.error?.message ||
      error?.message ||
      fallbackMessage;
    this.apiFieldErrors = error?.error?.errors ?? [];
  }
}
