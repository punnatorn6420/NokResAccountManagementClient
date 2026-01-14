import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionStorage } from '../shared/core/helper/session.helper';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private session: SessionStorage,
  ) {}

  private getHeaders(includeAuth = true): HttpHeaders {
    console.log('Getting Headers');
    let headers = this.baseHeaders;
    if (includeAuth) {
      const token =
        typeof window !== 'undefined'
          ? sessionStorage.getItem('bearerToken')
          : null;
      if (token) {
        console.log('Adding Auth Header');
        headers = headers.append('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  }

  get<T>(url: string, includeAuth: boolean = true): Observable<T> {
    console.log('HTTP GET:', url, 'Include Auth:', includeAuth);
    return this.http.get<T>(url, { headers: this.getHeaders(includeAuth) });
  }

  post<T, B>(url: string, data: T, includeAuth: boolean = true): Observable<B> {
    return this.http.post<B>(url, JSON.stringify(data), {
      headers: this.getHeaders(includeAuth),
    });
  }

  patch<T, B>(
    url: string,
    data: T,
    includeAuth: boolean = true,
  ): Observable<B> {
    return this.http.patch<B>(url, JSON.stringify(data), {
      headers: this.getHeaders(includeAuth),
    });
  }

  put<T, B>(url: string, data: T, includeAuth: boolean = true): Observable<B> {
    return this.http.put<B>(url, JSON.stringify(data), {
      headers: this.getHeaders(includeAuth),
    });
  }

  delete<T>(url: string, includeAuth: boolean = true): Observable<T> {
    return this.http.delete<T>(url, { headers: this.getHeaders(includeAuth) });
  }
}
