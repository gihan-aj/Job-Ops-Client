import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpOptions } from '../models/core/http-options';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, options: HttpOptions): Observable<T> {
    return this.httpClient.get<T>(url, options) as Observable<T>;
  }

  post<T>(url: string, body: unknown, options: HttpOptions): Observable<T> {
    return this.httpClient.post<T>(url, body, options) as Observable<T>;
  }

  put<T>(url: string, body: T, options: HttpOptions): Observable<T> {
    return this.httpClient.put<T>(url, body, options) as Observable<T>;
  }

  delete<T>(url: string, options: HttpOptions): Observable<T> {
    return this.httpClient.delete<T>(url, options) as Observable<T>;
  }
}
