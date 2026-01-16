import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AgentProfileResponse, ApiSuccess } from '../types/agent/agent.type';

@Injectable({ providedIn: 'root' })
export class AgentService {
  constructor(private http: HttpClient) {}

  getAgents(params: {
    keyword?: string;
    pageNumber: number;
    pageSize: number;
    ascending: boolean;
  }): Observable<ApiSuccess<AgentProfileResponse[]>> {
    if (environment.useMock) {
      return this.http.get<ApiSuccess<AgentProfileResponse[]>>(
        'mock/agent-mgmt-mocks/agents.get.200.success.json'
      );
    }

    let httpParams = new HttpParams()
      .set('pageNumber', params.pageNumber)
      .set('pageSize', params.pageSize)
      .set('ascending', params.ascending);

    if (params.keyword?.trim()) {
      httpParams = httpParams.set('keyword', params.keyword.trim());
    }

    return this.http.get<ApiSuccess<AgentProfileResponse[]>>(
      `${environment.endpoint}agent-mgmt/v1/agents`,
      { params: httpParams }
    );
  }
}
