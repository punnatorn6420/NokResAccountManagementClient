import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
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

  get contacts(): FormArray {
    return this.form.get('contacts') as FormArray;
  }

  buildForm(): void {
    this.form = this.fb.group({
      companyName: ['', Validators.required],
      agencyCode: ['', Validators.required],
      currency: [null, Validators.required],
      type: [null, Validators.required],
      contacts: this.fb.array(
        this.allowEmailEdit
          ? [this.buildContactGroup({ isPrimary: true })]
          : [],
        this.allowEmailEdit ? [this.primaryContactValidator] : [],
      ),
      agentPhone: ['', [Validators.required]],
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
      contacts: (raw.contacts ?? []).map(
        (contact: {
          email?: string;
          firstName?: string;
          lastName?: string;
          contactPhone?: string;
          isPrimary?: boolean;
        }) => ({
          email: contact.email?.trim(),
          firstName: contact.firstName?.trim() || undefined,
          lastName: contact.lastName?.trim() || undefined,
          contactPhone: contact.contactPhone?.trim() || undefined,
          isPrimary: Boolean(contact.isPrimary),
        }),
      ),
      agentPhone: raw.agentPhone?.trim() || undefined,

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
      agentPhone: raw.agentPhone?.trim() || undefined,
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

  isInvalid(name: string): boolean {
    const c = this.getControl(name);
    return !!(c && c.touched && c.invalid);
  }

  addContact(): void {
    const shouldBePrimary = !this.hasPrimaryContact();
    this.contacts.push(this.buildContactGroup({ isPrimary: shouldBePrimary }));
  }

  removeContact(index: number): void {
    if (this.contacts.length <= 1) {
      return;
    }
    const removedPrimary = Boolean(
      this.contacts.at(index).get('isPrimary')?.value,
    );
    this.contacts.removeAt(index);
    if (removedPrimary && !this.hasPrimaryContact() && this.contacts.length) {
      this.contacts.at(0).get('isPrimary')?.setValue(true);
    }
    this.contacts.updateValueAndValidity();
  }

  setPrimaryContact(index: number): void {
    const isSelected = Boolean(this.contacts.at(index).get('isPrimary')?.value);
    if (!isSelected) {
      if (!this.hasPrimaryContact()) {
        this.contacts.at(index).get('isPrimary')?.setValue(true, {
          emitEvent: false,
        });
      }
      return;
    }

    this.contacts.controls.forEach((control, idx) => {
      if (idx !== index) {
        control.get('isPrimary')?.setValue(false, { emitEvent: false });
      }
    });
    this.contacts.updateValueAndValidity();
  }

  trackContact(index: number): number {
    return index;
  }

  private hasPrimaryContact(): boolean {
    return this.contacts.controls.some(
      (control) => control.get('isPrimary')?.value,
    );
  }

  private buildContactGroup(values?: {
    email?: string;
    firstName?: string;
    lastName?: string;
    contactPhone?: string;
    isPrimary?: boolean;
  }): FormGroup {
    return this.fb.group({
      email: [
        values?.email ?? '',
        this.allowEmailEdit ? [Validators.required, Validators.email] : [],
      ],
      firstName: [
        values?.firstName ?? '',
        this.allowEmailEdit ? [Validators.required] : [],
      ],
      lastName: [
        values?.lastName ?? '',
        this.allowEmailEdit ? [Validators.required] : [],
      ],
      contactPhone: [
        values?.contactPhone ?? '',
        this.allowEmailEdit ? [Validators.required] : [],
      ],
      isPrimary: [values?.isPrimary ?? false],
    });
  }

  private primaryContactValidator = (control: AbstractControl) => {
    const contacts = control as FormArray;
    if (!contacts.controls.length) {
      return { required: true };
    }
    const primaryCount = contacts.controls.filter(
      (contact) => contact.get('isPrimary')?.value,
    ).length;
    return primaryCount === 1 ? null : { primaryRequired: true };
  };
}
