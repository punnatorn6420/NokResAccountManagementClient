import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { takeUntil } from 'rxjs';
import { AgentService } from '../../../service/agent.service';
import { AgentCreateComponent } from '../agent-create/agent-create.component';

@Component({
  selector: 'app-agent-edit',
  templateUrl: '../agent-create/agent-create.component.html',
  styleUrls: ['../agent-create/agent-create.component.scss'],
  standalone: false,
})
export class AgentEditComponent extends AgentCreateComponent implements OnInit {
  private agentId = 0;

  constructor(
    agentService: AgentService,
    fb: FormBuilder,
    router: Router,
    messageService: MessageService,
    route: ActivatedRoute,
  ) {
    super(agentService, fb, router, messageService, route);
    this.pageTitle = 'Edit Agent';
    this.pageDescription =
      'Update agent profile details. Email fields are read-only.';
    this.submitLabel = 'Save Changes';
    this.cancelLabel = 'Cancel';
    this.backLabel = 'Back to details';
    this.allowEmailEdit = false;
    this.showActiveToggle = true;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    const idParam = this.route.snapshot.paramMap.get('id');
    this.agentId = Number(idParam);
    if (!this.agentId) {
      this.handleApiError({ message: 'Invalid agent id.' });
      return;
    }

    this.addActiveControl();
    this.form.get('primaryEmail')?.disable();

    this.loading = true;
    this.agentService
      .getAgent(this.agentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          const agent = res?.data;
          if (!agent) {
            this.loading = false;
            return;
          }
          const primaryEmail =
            agent.emails?.find((email) => email.isPrimary || email.isprimary)
              ?.email ||
            agent.emails?.[0]?.email ||
            '';

          this.form.patchValue({
            companyName: agent.companyName ?? '',
            agencyCode: agent.agencyCode ?? '',
            currency: agent.currency ?? null,
            type: agent.type ?? null,
            firstName: agent.firstName ?? '',
            lastName: agent.lastName ?? '',
            primaryEmail,
            phone: agent.phone ?? '',
            address1: agent.address1 ?? '',
            address2: agent.address2 ?? '',
            city: agent.city ?? '',
            state: agent.state ?? '',
            postalCode: agent.postalCode ?? '',
            countryCode: agent.countryCode ?? '',
            region: agent.region ?? '',
            active: agent.active ?? true,
          });
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
          this.handleApiError(err);
        },
      });
  }

  override onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.clearApiErrors();

    const payload = this.buildUpdatePayload();
    this.agentService
      .updateAgent(this.agentId, payload)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.submitting = false;
          const agentName = res?.data?.companyName || 'Agent';
          this.messageService.add({
            severity: 'success',
            summary: 'Agent updated',
            detail: `${agentName} was updated successfully.`,
          });
          this.router.navigate(['/admin/agents', this.agentId]);
        },
        error: (err) => {
          this.submitting = false;
          this.handleApiError(err);
        },
      });
  }

  override onCancel(): void {
    this.router.navigate(['/admin/agents', this.agentId]);
  }

  override onBack(): void {
    this.router.navigate(['/admin/agents', this.agentId]);
  }
}
