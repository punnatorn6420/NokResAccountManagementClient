import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IApiResponse } from '../types/common/response.type';
import { IPasswordRotationLog } from '../types/password-rotation-log.type';

@Injectable({ providedIn: 'root' })
export class PasswordRotationLogService {
  constructor(private http: HttpClient) {}

  getLogs(params?: {
    keyword?: string;
  }): Observable<IApiResponse<IPasswordRotationLog[]>> {
    if (environment.useMock) {
      return this.http.get<IApiResponse<IPasswordRotationLog[]>>(
        'mock/agent-mgmt-mocks/passwordRotationLogs.get.200.success.json',
      );
    }

    let httpParams = new HttpParams();
    const keyword = params?.keyword?.trim();
    if (keyword) {
      httpParams = httpParams.set('keyword', keyword);
    }

    return this.http.get<IApiResponse<IPasswordRotationLog[]>>(
      `${environment.endpoint}password-rotation-logs`,
      { params: httpParams },
    );
  }
}
