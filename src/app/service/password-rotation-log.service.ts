import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { IApiResponse } from '../types/common/response.type';
import { IPasswordRotationLog } from '../types/password-rotation-log.type';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class PasswordRotationLogService {
  constructor(
    private http: HttpClient,
    private https: HttpService,
  ) {}

  getLogs(params?: {
    keyword?: string;
  }): Observable<IApiResponse<IPasswordRotationLog[]>> {
    let httpParams = new HttpParams();
    const keyword = params?.keyword?.trim();
    if (keyword) {
      httpParams = httpParams.set('keyword', keyword);
    }

    return this.https.get<IApiResponse<IPasswordRotationLog[]>>(
      `${environment.endpoint}v1/password-rotation-logs?${httpParams.toString()}`,
      true,
    );
  }
}
