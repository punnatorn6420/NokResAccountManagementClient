import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { AgentService } from '../../../service/agent.service';
import {
  IContactEmailItem,
  IContactEmailRequest,
} from '../../../types/agent/agent.type';

@Component({
  selector: 'app-agent-contact-emails',
  templateUrl: './agent-contact-emails.component.html',
  styleUrls: ['./agent-contact-emails.component.scss'],
  standalone: false,
})
export class AgentContactEmailsComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() agentId = 0;
  @Output() primaryEmailChange = new EventEmitter<string>();

  private destroy$ = new Subject<void>();

  contactEmails: IContactEmailItem[] = [];
  contactEmailsLoading = false;
  contactEmailsError = '';

  contactEmailDialogVisible = false;
  contactEmailSubmitting = false;
  contactEmailForm!: FormGroup;
  editingContactEmail: IContactEmailItem | null = null;

  constructor(
    private agentService: AgentService,
    private fb: FormBuilder,
    private messageService: MessageService,
  ) {}

  ngOnInit(): void {
    this.buildForms();
    if (this.agentId) {
      this.loadContactEmails();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['agentId'] && this.agentId) {
      this.loadContactEmails();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadContactEmails(): void {
    if (!this.agentId) {
      this.contactEmailsError = 'Invalid agent id.';
      return;
    }

    this.contactEmailsLoading = true;
    this.contactEmailsError = '';
    this.agentService
      .getContactEmails(this.agentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.contactEmails = res?.data.items ?? [];
          this.contactEmailsLoading = false;
          this.primaryEmailChange.emit(
            this.resolvePrimaryEmail(this.contactEmails),
          );
        },
        error: (err) => {
          this.contactEmailsLoading = false;
          this.contactEmails = [];
          this.contactEmailsError = this.resolveErrorMessage(err);
        },
      });
  }

  isContactEmailPrimary(email: IContactEmailItem): boolean {
    return Boolean(email.isPrimary || email.isprimary);
  }

  openCreateContactEmail(): void {
    this.editingContactEmail = null;
    this.contactEmailForm.reset({
      email: '',
      isPrimary: false,
      active: true,
    });
    this.contactEmailDialogVisible = true;
  }

  openEditContactEmail(row: IContactEmailItem): void {
    this.editingContactEmail = row;
    this.contactEmailForm.reset({
      email: row.email,
      isPrimary: this.isContactEmailPrimary(row),
      active: row.active,
    });
    this.contactEmailDialogVisible = true;
  }

  submitContactEmail(): void {
    if (this.contactEmailForm.invalid) {
      this.contactEmailForm.markAllAsTouched();
      return;
    }

    this.contactEmailSubmitting = true;
    const payload = this.buildContactEmailPayload();
    const request$ = this.editingContactEmail
      ? this.agentService.updateContactEmail(
          this.agentId,
          this.editingContactEmail.id,
          payload,
        )
      : this.agentService.createContactEmail(this.agentId, payload);

    request$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.contactEmailSubmitting = false;
        this.contactEmailDialogVisible = false;
        this.messageService.add({
          severity: 'success',
          summary: this.editingContactEmail
            ? 'Contact email updated'
            : 'Contact email created',
          detail: this.editingContactEmail
            ? 'The contact email has been updated.'
            : 'A new contact email has been created.',
        });
        this.editingContactEmail = null;
        this.loadContactEmails();
      },
      error: (err) => {
        this.contactEmailSubmitting = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Unable to save contact email',
          detail: this.resolveErrorMessage(err),
        });
      },
    });
  }

  private buildForms(): void {
    this.contactEmailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      isPrimary: [false],
      active: [true],
    });
  }

  private buildContactEmailPayload(): IContactEmailRequest {
    const raw = this.contactEmailForm.getRawValue();
    return {
      email: raw.email?.trim(),
      isPrimary: Boolean(raw.isPrimary),
      active: Boolean(raw.active),
    };
  }

  private resolvePrimaryEmail(emails: IContactEmailItem[]): string {
    const primaryEmail = emails.find(
      (email) => email.isPrimary || email.isprimary,
    );
    return primaryEmail?.email || emails[0]?.email || '';
  }

  private resolveErrorMessage(err: unknown): string {
    const fallbackMessage = 'Unable to load contact emails. Please try again.';
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
