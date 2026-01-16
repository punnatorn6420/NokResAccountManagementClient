import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface IResponse<T> {
  status: string;
  data: T;
}

export type AgentType = 'PREPAID' | 'POSTPAID' | string;

export interface IAgentListItem {
  id: number;
  companyName: string;
  agencyCode: string;
  baseCurrency: string;
  agentType: AgentType;
  contactEmail: string;
}

@Injectable({ providedIn: 'root' })
export class AgentService {
  constructor(private http: HttpClient) {}

  getAgents(params: {
    keyword?: string;
    pageNumber: number;
    pageSize: number;
    ascending: boolean;
  }): Observable<IResponse<IAgentListItem[]>> {
    if (environment.useMock) {
      return this.http.get<IResponse<IAgentListItem[]>>(
        'mock/agents/agents.get.200.success.json'
      );
    }

    let httpParams = new HttpParams()
      .set('pageNumber', params.pageNumber)
      .set('pageSize', params.pageSize)
      .set('ascending', params.ascending);

    if (params.keyword?.trim()) {
      httpParams = httpParams.set('keyword', params.keyword.trim());
    }

    return this.http.get<IResponse<IAgentListItem[]>>(
      `${environment.endpoint}agent-mgmt/v1/agents`,
      { params: httpParams }
    );
  }
}
