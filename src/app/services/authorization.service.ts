import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { AuthToken } from '../model/auth-token.model';
import { Error } from '../model/error.model';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  private authorizationError$: BehaviorSubject<Error> = new BehaviorSubject(
    undefined
  );
  constructor(private http: HttpClient) {}

  authorize$(code: string): Observable<AuthToken> {
    const url = 'https://accounts.spotify.com/api/token';
    let params = new HttpParams().set('grant_type', 'authorization_code');
    params = params.append('code', code);
    params = params.append('redirect_uri', environment.redirectUrl);
    let options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set(
          'Authorization',
          `Basic ${btoa(environment.clientId + ':' + environment.clientSecret)}`
        ),
    };
    return this.http.post<AuthToken>(url, params, options).pipe(
      tap((authToken) => {
        window.sessionStorage.setItem('access_token', authToken?.access_token);
        window.sessionStorage.setItem('token_type', authToken?.token_type);
        window.sessionStorage.setItem(
          'expires_in',
          authToken?.expires_in?.toString()
        );
      }),
      catchError((err) => {
        this.setAuthorizationError({
          status: err?.status,
          error: err?.error?.error,
          error_description: err?.error?.error_description,
        });
        return throwError(() => err);
      })
    );
  }

  getAuthorizationError$(): Observable<Error> {
    return this.authorizationError$;
  }

  setAuthorizationError(authorizationError: Error): void {
    this.authorizationError$.next(authorizationError);
  }
}
