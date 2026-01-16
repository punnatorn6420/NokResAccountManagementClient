import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { HttpService } from './http.service';
import { IUserInfo } from '../types/auth.model';
import { IApiResponse } from '../types/common/api-response.type';
import { IResponse } from './agent.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<IUserInfo | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private https: HttpService) {}

  setUser(user: IUserInfo): void {
    this.currentUserSubject.next(user);
  }

  getUser(): IUserInfo | null {
    return this.currentUserSubject.value;
  }

  getCurrentUser(): IUserInfo | null {
    return this.getUser();
  }

  logout() {
    sessionStorage.clear();
    this.currentUserSubject.next(null);
  }

  verifyToken(token: string): Observable<IApiResponse<string>> {
    const headers = new HttpHeaders()
      .append('nok_client_id', environment.clientId)
      .append('nok_client_secret', environment.clientSecret)
      .append('Authorization', `Bearer ${token}`);
    return this.http.get<IApiResponse<string>>(
      `${environment.endpoint}v1/users/validate-token`,
      { headers }
    );
  }

  // getUserProfile(): Observable<IResponse<IUserInfo>> {
  //   const token =
  //     typeof window !== 'undefined'
  //       ? sessionStorage.getItem('bearerToken')
  //       : null;

  //   const headers = new HttpHeaders()
  //     .append('nok_client_id', environment.clientId)
  //     .append('nok_client_secret', environment.clientSecret)
  //     .append('Authorization', `Bearer ${token}`);

  //   return this.http.get<IResponse<IUserInfo>>(
  //     `${environment.endpoint}v1/users/retrieve-from-token`,
  //     { headers },
  //   );
  // }

  getUserProfile(): Observable<IResponse<IUserInfo>> {
    return this.http.get<IResponse<IUserInfo>>(
      'mock/user/get-user-profile.json'
    );
  }

  loadProfile(): Promise<void> {
    const token = sessionStorage.getItem('bearerToken');
    if (!token) {
      if (!location.href.startsWith(environment.portal_client)) {
        location.replace(environment.portal_client);
      }
      return Promise.resolve();
    }
    return firstValueFrom(this.getUserProfile()).then(
      (res) => {
        this.currentUserSubject.next(res.data ?? null);
      },
      () => {
        this.currentUserSubject.next(null);
        if (!location.href.startsWith(environment.portal_client)) {
          location.replace(environment.portal_client);
        }
      }
    );
  }
}
