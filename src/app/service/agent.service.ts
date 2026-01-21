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
  IAgentProfileItem,
  IResAccountItem,
  ICredentialItem,
  IContactEmailItem,
} from '../types/agent/agent.type';
import { IApiResponse } from '../types/common/response.type';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class AgentService {
  constructor(
    private http: HttpClient,
    private https: HttpService,
  ) {}

  getAgents(params: {
    keyword?: string;
    pageNumber: number;
    pageSize: number;
    ascending: boolean;
  }): Observable<IApiResponse<IAgentProfileResponse>> {
    let httpParams = new HttpParams()
      .set('pageNumber', params.pageNumber)
      .set('pageSize', params.pageSize)
      .set('ascending', params.ascending);
    if (params.keyword?.trim()) {
      httpParams = httpParams.set('keyword', params.keyword.trim());
    }
    return this.https.get<IApiResponse<IAgentProfileResponse>>(
      `${environment.endpoint}v1/agents?${httpParams.toString()}`,
      true,
    );
  }

  getAgent(id: number): Observable<IApiResponse<IAgentProfileItem>> {
    return this.https.get<IApiResponse<IAgentProfileItem>>(
      `${environment.endpoint}v1/agents/${id}`,
      true,
    );
  }

  createAgent(
    payload: IAgentProfileRequest,
  ): Observable<IApiResponse<IAgentProfileItem>> {
    return this.https.post(`${environment.endpoint}v1/agents`, payload, true);
  }

  updateAgent(
    id: number,
    payload: IAgentProfileUpdateRequest,
  ): Observable<IApiResponse<IAgentProfileItem>> {
    return this.https.put(
      `${environment.endpoint}v1/agents/${id}`,
      payload,
      true,
    );
  }

  getResAccounts(
    agentId: number,
  ): Observable<IApiResponse<IResAccountResponse>> {
    return this.https.get(
      `${environment.endpoint}v1/agents/${agentId}/res-accounts`,
      true,
    );
  }

  getContactEmails(
    agentId: number,
  ): Observable<IApiResponse<IContactEmailResponse>> {
    return this.https.get(
      `${environment.endpoint}v1/agents/${agentId}/emails`,
      true,
    );
  }

  getApiKeys(agentId: number): Observable<IApiResponse<ICredentialResponse>> {
    return this.https.get(
      `${environment.endpoint}v1/agents/${agentId}/api-keys`,
      true,
    );
  }

  getCredentialApiKeys(
    keyword: string,
  ): Observable<IApiResponse<ICredentialResponse>> {
    return this.https.get(
      `${environment.endpoint}v1/api-keys?keyword=${keyword}`,
      true,
    );
  }

  createContactEmail(
    agentId: number,
    payload: IContactEmailRequest,
  ): Observable<IApiResponse<IContactEmailItem>> {
    return this.https.post(
      `${environment.endpoint}v1/agents/${agentId}/emails`,
      payload,
      true,
    );
  }

  updateContactEmail(
    agentId: number,
    emailId: number,
    payload: IContactEmailRequest,
  ): Observable<IApiResponse<IContactEmailItem>> {
    return this.https.put(
      `${environment.endpoint}v1/agents/${agentId}/emails/${emailId}`,
      payload,
      true,
    );
  }

  createResAccount(
    agentId: number,
    payload: IResAccountRequest,
  ): Observable<IApiResponse<IResAccountItem>> {
    return this.https.post(
      `${environment.endpoint}v1/agents/${agentId}/res-accounts`,
      payload,
      true,
    );
  }

  updateResAccount(
    agentId: number,
    accountId: number,
    payload: IResAccountRequest,
  ): Observable<IApiResponse<IResAccountItem>> {
    return this.https.put(
      `${environment.endpoint}v1/agents/${agentId}/res-accounts/${accountId}`,
      payload,
      true,
    );
  }

  createApiKey(
    agentId: number,
    payload: CredentialRequest,
  ): Observable<IApiResponse<ICredentialItem>> {
    return this.https.post(
      `${environment.endpoint}v1/agents/${agentId}/api-keys`,
      payload,
      true,
    );
  }

  updateApiKey(
    credId: number,
    payload: CredentialRequest,
  ): Observable<IApiResponse<ICredentialItem>> {
    return this.https.put(
      `${environment.endpoint}v1/agents/${credId}/api-keys`,
      payload,
      true,
    );
  }
}
