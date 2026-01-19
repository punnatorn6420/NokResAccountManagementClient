import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  IAgentProfileRequest,
  IAgentProfileResponse,
  IAgentProfileUpdateRequest,
  IContactEmailRequest,
  IContactEmailResponse,
  CredentialRequest,
  ICredentialResponse,
  IResAccountRequest,
  IResAccountResponse,
} from '../types/agent/agent.type';
import { IApiResponse } from '../types/common/response.type';

@Injectable({ providedIn: 'root' })
export class AgentService {
  constructor(private http: HttpClient) {}

  getAgents(params: {
    keyword?: string;
    pageNumber: number;
    pageSize: number;
    ascending: boolean;
  }): Observable<IApiResponse<IAgentProfileResponse[]>> {
    if (environment.useMock) {
      return this.http.get<IApiResponse<IAgentProfileResponse[]>>(
        'mock/agent-mgmt-mocks/agents.get.200.success.json',
      );
    }

    let httpParams = new HttpParams()
      .set('pageNumber', params.pageNumber)
      .set('pageSize', params.pageSize)
      .set('ascending', params.ascending);
    if (params.keyword?.trim()) {
      httpParams = httpParams.set('keyword', params.keyword.trim());
    }

    return this.http.get<IApiResponse<IAgentProfileResponse[]>>(
      `${environment.endpoint}agent-mgmt/v1/agents`,
      { params: httpParams },
    );
  }

  getAgent(id: number): Observable<IApiResponse<IAgentProfileResponse>> {
    if (environment.useMock) {
      return this.http.get<IApiResponse<IAgentProfileResponse>>(
        'mock/agent-mgmt-mocks/agents.id.get.200.json',
      );
    }

    return this.http.get<IApiResponse<IAgentProfileResponse>>(
      `${environment.endpoint}agent-mgmt/v1/agents/${id}`,
    );
  }

  createAgent(
    payload: IAgentProfileRequest,
  ): Observable<IApiResponse<IAgentProfileResponse>> {
    console.log('Creating agent with payload:', payload); // Debug log
    if (environment.useMock) {
      return this.http.get<IApiResponse<IAgentProfileResponse>>(
        'mock/agent-mgmt-mocks/agents.post.201.json',
      );
    }

    return this.http.post<IApiResponse<IAgentProfileResponse>>(
      `${environment.endpoint}agent-mgmt/v1/agents`,
      payload,
    );
  }

  updateAgent(
    id: number,
    payload: IAgentProfileUpdateRequest,
  ): Observable<IApiResponse<IAgentProfileResponse>> {
    if (environment.useMock) {
      return this.http.get<IApiResponse<IAgentProfileResponse>>(
        'mock/agent-mgmt-mocks/agents.id.put.200.json',
      );
    }

    return this.http.put<IApiResponse<IAgentProfileResponse>>(
      `${environment.endpoint}agent-mgmt/v1/agents/${id}`,
      payload,
    );
  }

  getResAccounts(
    agentId: number,
  ): Observable<IApiResponse<IResAccountResponse[]>> {
    if (environment.useMock) {
      return this.http.get<IApiResponse<IResAccountResponse[]>>(
        'mock/agent-mgmt-mocks/agents.agentId.resAccounts.get.200.json',
      );
    }

    return this.http.get<IApiResponse<IResAccountResponse[]>>(
      `${environment.endpoint}agent-mgmt/v1/agents/${agentId}/res-accounts`,
    );
  }

  getContactEmails(
    agentId: number,
  ): Observable<IApiResponse<IContactEmailResponse>> {
    if (environment.useMock) {
      return this.http.get<IApiResponse<IContactEmailResponse>>(
        'mock/agent-mgmt-mocks/agents.agentId.emails.get.200.json',
      );
    }

    return this.http.get<IApiResponse<IContactEmailResponse>>(
      `${environment.endpoint}agent-mgmt/v1/agents/${agentId}/emails`,
    );
  }

  getApiKeys(agentId: number): Observable<IApiResponse<ICredentialResponse[]>> {
    if (environment.useMock) {
      return this.http.get<IApiResponse<ICredentialResponse[]>>(
        'mock/agent-mgmt-mocks/agents.agentsId.apiKeys.get.200.json',
      );
    }

    return this.http.get<IApiResponse<ICredentialResponse[]>>(
      `${environment.endpoint}agent-mgmt/v1/agents/${agentId}/api-keys`,
    );
  }

  createContactEmail(
    agentId: number,
    payload: IContactEmailRequest,
  ): Observable<IApiResponse<IContactEmailResponse>> {
    if (environment.useMock) {
      return this.http.get<IApiResponse<IContactEmailResponse>>(
        'mock/agent-mgmt-mocks/agents.agentId.emails.post.201.json',
      );
    }

    return this.http.post<IApiResponse<IContactEmailResponse>>(
      `${environment.endpoint}agent-mgmt/v1/agents/${agentId}/emails`,
      payload,
    );
  }

  updateContactEmail(
    agentId: number,
    emailId: number,
    payload: IContactEmailRequest,
  ): Observable<IApiResponse<IContactEmailResponse>> {
    if (environment.useMock) {
      return this.http.get<IApiResponse<IContactEmailResponse>>(
        'mock/agent-mgmt-mocks/agents.agentId.emails.emailId.put.200.json',
      );
    }

    return this.http.put<IApiResponse<IContactEmailResponse>>(
      `${environment.endpoint}agent-mgmt/v1/agents/${agentId}/emails/${emailId}`,
      payload,
    );
  }

  createResAccount(
    agentId: number,
    payload: IResAccountRequest,
  ): Observable<IApiResponse<IResAccountResponse>> {
    if (environment.useMock) {
      return this.http.get<IApiResponse<IResAccountResponse>>(
        'mock/agent-mgmt-mocks/agents.agentId.resAccounts.post.201.json',
      );
    }

    return this.http.post<IApiResponse<IResAccountResponse>>(
      `${environment.endpoint}agent-mgmt/v1/agents/${agentId}/res-accounts`,
      payload,
    );
  }

  updateResAccount(
    agentId: number,
    accountId: number,
    payload: IResAccountRequest,
  ): Observable<IApiResponse<IResAccountResponse>> {
    if (environment.useMock) {
      return this.http.get<IApiResponse<IResAccountResponse>>(
        'mock/agent-mgmt-mocks/agents.agentId.resAccounts.accountId.put.200.json',
      );
    }

    return this.http.put<IApiResponse<IResAccountResponse>>(
      `${environment.endpoint}agent-mgmt/v1/agents/${agentId}/res-accounts/${accountId}`,
      payload,
    );
  }

  createApiKey(
    agentId: number,
    payload: CredentialRequest,
  ): Observable<IApiResponse<ICredentialResponse>> {
    if (environment.useMock) {
      return this.http.get<IApiResponse<ICredentialResponse>>(
        'mock/agent-mgmt-mocks/agents.agentsId.apiKeys.post.201.json',
      );
    }

    return this.http.post<IApiResponse<ICredentialResponse>>(
      `${environment.endpoint}agent-mgmt/v1/agents/${agentId}/api-keys`,
      payload,
    );
  }

  updateApiKey(
    credId: number,
    payload: CredentialRequest,
  ): Observable<IApiResponse<ICredentialResponse>> {
    if (environment.useMock) {
      return this.http.get<IApiResponse<ICredentialResponse>>(
        'mock/agent-mgmt-mocks/agents.credId.apiKeys.put.200.json',
      );
    }

    return this.http.put<IApiResponse<ICredentialResponse>>(
      `${environment.endpoint}agent-mgmt/v1/agents/${credId}/api-keys`,
      payload,
    );
  }
}
