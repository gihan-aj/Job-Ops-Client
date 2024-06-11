import { Injectable } from '@angular/core';
import { HttpService } from '../shared/services/http.service';
import { Register } from '../shared/models/account/register';
import { environment } from '../../environments/environment.development';
import { User } from '../shared/models/account/user';
import { Observable, ReplaySubject, map } from 'rxjs';
import { Router } from '@angular/router';
import { Login } from '../shared/models/account/login';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private userSource = new ReplaySubject<User | null>(1);
  user$ = this.userSource.asObservable(); // $ as a convention to name an observable

  constructor(private httpService: HttpService, private router: Router) {}

  register(model: Register) {
    return this.httpService.post(
      `${environment.appUrl}/api/account/register`,
      model,
      {}
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

  private setUser(user: User) {
    localStorage.setItem(environment.userKey, JSON.stringify(user));

    this.userSource.next(user);
  }
}
