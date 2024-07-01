import { Injectable } from '@angular/core';
import { AccountService } from '../../account/account.service';
import { NotificationService } from './notification.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Observable, map } from 'rxjs';
import { User } from '../models/account/user';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class PermissionsService {
  constructor(
    private accountService: AccountService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  canActivate(state: RouterStateSnapshot): Observable<boolean> {
    return this.accountService.user$.pipe(
      map((user: User | null) => {
        if (user) {
          return true;
        } else {
          this.notificationService.showNotification(
            false,
            'Restricted Area',
            'Guests cannot access this area'
          );
          this.router.navigate(['account/login'], {
            queryParams: { returnUrl: state.url },
          });
          return false;
        }
      })
    );
  }

  isAdmin(): Observable<boolean> {
    return this.accountService.user$.pipe(
      map((user: User | null) => {
        if (user) {
          const decodedToken: any = jwtDecode(user.jwt);
          if (decodedToken.role.includes('Admin')) {
            return true;
          }
        }

        this.notificationService.showNotification(
          false,
          'Admin Area',
          'Only admin can access this area'
        );

        return false;
      })
    );
  }
}
