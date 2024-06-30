import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { NotificationService } from '../../shared/services/notification.service';
import { take } from 'rxjs';
import { User } from '../../shared/models/account/user';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrl: './send-email.component.scss',
})
export class SendEmailComponent implements OnInit {
  loading: boolean = true;
  requestLoading: boolean = false;
  emailForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  mode: string | undefined;
  errorMessages: string[] = [];

  constructor(
    private accountService: AccountService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.accountService.user$.pipe(take(1)).subscribe({
      next: (user: User | null) => {
        if (user) {
          this.router.navigateByUrl('/');
        } else {
          const mode = this.activatedRoute.snapshot.paramMap.get('mode');
          if (mode) {
            this.mode = mode;

            this.initializeForm();
          }
        }

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      },
    });
  }

  initializeForm() {
    this.emailForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'),
        ],
      ],
    });
  }

  sendEmail() {
    this.requestLoading = true;
    this.submitted = true;
    this.errorMessages = [];

    if (this.emailForm.valid && this.mode) {
      if (this.mode.includes('resend-email-confirmation-link')) {
        this.accountService
          .resendEmailConfirmationLink(this.emailForm.get('email')?.value)
          .subscribe({
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
      } else if (this.mode.includes('forgot-username-or-password')) {
        this.accountService
          .forgotUsernameOrPassword(this.emailForm.get('email')?.value)
          .subscribe({
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
      }
    } else {
      this.requestLoading = false;
    }
  }

  cancel() {
    this.router.navigateByUrl('/account/login');
  }
}
