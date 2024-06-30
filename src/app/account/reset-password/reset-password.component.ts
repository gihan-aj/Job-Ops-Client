import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from '../../shared/services/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { take } from 'rxjs';
import { User } from '../../shared/models/account/user';
import { ResetPassword } from '../../shared/models/account/reset-password';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  loading: boolean = true;
  requestLoading: boolean = false;
  resetPasswordForm: FormGroup = new FormGroup({});
  token: string | undefined;
  email: string | undefined;
  errorMessages: string[] = [];
  submitted: boolean = false;

  constructor(
    private accountService: AccountService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
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
              this.token = params.get('token');
              this.email = params.get('email');

              if (this.token && this.email) {
                this.initializeForm(this.email);
              } else {
                this.router.navigateByUrl('/account/login');
              }

              this.loading = false;
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

  initializeForm(username: string) {
    this.resetPasswordForm = this.formBuilder.group({
      email: [{ value: username, disabled: true }],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  resetPassword() {
    this.requestLoading = true;
    this.submitted = true;
    this.errorMessages = [];

    if (this.resetPasswordForm.valid && this.email && this.token) {
      const model: ResetPassword = {
        token: this.token,
        email: this.email,
        newPassword: this.resetPasswordForm.get('newPassword')?.value,
      };

      this.accountService.resetPassword(model).subscribe({
        next: (response) => {
          this.notificationService.showNotification(
            true,
            response.title,
            response.message
          );

          this.router.navigateByUrl('/account/login');
          this.requestLoading = false;
        },
        error: (error) => {
          if (error.error.errors) {
            this.errorMessages = error.error.errors;
          } else if (typeof error.error == 'string') {
            this.errorMessages.push(error.error);
          } else {
            this.errorMessages.push('Internal server error.');
          }

          this.requestLoading = false;
        },
      });
    } else {
      this.requestLoading = false;
    }
  }
}
