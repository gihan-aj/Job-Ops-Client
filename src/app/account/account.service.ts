import { Injectable } from '@angular/core';
import { HttpService } from '../shared/services/http.service';
import { Register } from '../shared/models/account/register';
import { environment } from '../../environments/environment.development';
import { User } from '../shared/models/account/user';
import { Observable, ReplaySubject, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from '../shared/models/account/login';
import { ConfirmEmail } from '../shared/models/account/confirm-email';
import { HttpHeaders } from '@angular/common/http';
import { ResetPassword } from '../shared/models/account/reset-password';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private userSource = new ReplaySubject<User | null>(1);
  user$ = this.userSource.asObservable(); // $ as a convention to name an observable

  constructor(private httpService: HttpService, private router: Router) {}

  refreshUser(jwt: string | null) {
    if (jwt === null) {
      this.userSource.next(null);
      return of(undefined);
    }

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + jwt);

    return this.httpService
      .get<User>(`${environment.appUrl}/api/account/refresh-user-token`, {
        headers,
      })
      .pipe(
        map((user: User) => {
          if (user) {
            this.setUser(user);
          }
        })
      );
  }

  register(model: Register) {
    return this.httpService.post(
      `${environment.appUrl}/api/account/register`,
      model,
      {}
    );
  }

  confirmEmail(model: ConfirmEmail) {
    return this.httpService.put(
      `${environment.appUrl}/api/account/confirm-email`,
      model,
      {}
    );
  }

  resendEmailConfirmationLink(email: string) {
    return this.httpService.post(
      `${environment.appUrl}/api/account/resend-email-confirmation-link/${email}`,
      {}
    );
  }

  forgotUsernameOrPassword(email: string) {
    return this.httpService.post(
      `${environment.appUrl}/api/account/forgot-username-or-password/${email}`,
      {}
    );
  }

  resetPassword(model: ResetPassword) {
    return this.httpService.put(
      `${environment.appUrl}/api/account/reset-password`,
      model
    );
  }

  login(model: Login) {
    return this.httpService
      .post<User>(`${environment.appUrl}/api/account/login`, model, {})
      .pipe(
        map((user: User) => {
          if (user) {
            this.setUser(user);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem(environment.userKey);
    this.userSource.next(null);

    this.router.navigateByUrl('/');
  }

  getJwt() {
    const key = localStorage.getItem(environment.userKey);
    if (key) {
      const user: User = JSON.parse(key);

      return user.jwt;
    } else {
      return null;
    }
  }

  private setUser(user: User) {
    localStorage.setItem(environment.userKey, JSON.stringify(user));

    this.userSource.next(user);
  }
}
