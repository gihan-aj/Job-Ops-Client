import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SharedService } from '../../shared/shared.service';
import { AccountService } from '../account.service';
import { take } from 'rxjs';
import { User } from '../../shared/models/account/user';
import { ConfirmEmail } from '../../shared/models/account/confirm-email';
import { NotificationService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrl: './confirm-email.component.scss',
})
export class ConfirmEmailComponent implements OnInit {
  loading: boolean = true;
  success: boolean = true;

  constructor(
    private accountService: AccountService,
    private notificationService: NotificationService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.router.navigateByUrl('/');
          this.loading = false;
        } else {
          this.activatedRoute.queryParamMap.subscribe({
            next: (params: any) => {
              const confirmEmail: ConfirmEmail = {
                token: params.get('token'),
                email: params.get('email'),
              };

              this.accountService.confirmEmail(confirmEmail).subscribe({
                next: (response: any) => {
                  this.notificationService.showNotification(
                    true,
                    response.value.title,
                    response.value.message
                  );

                  this.loading = false;
                },
                error: (error) => {
                  this.success = false;

                  if (typeof error.error == 'string') {
                    this.notificationService.showNotification(
                      false,
                      'Failed',
                      error.error
                    );
                  } else {
                    this.notificationService.showNotification(
                      false,
                      'Activation failed',
                      'Internal server error'
                    );
                  }

                  this.loading = false;
                },
              });
            },
            error: () => {
              this.loading = false;
            },
          });
        }
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  resendEmailConfirmationLink() {
    this.router.navigateByUrl(
      '/account/send-email/resend-email-confirmation-link'
    );
  }
}
