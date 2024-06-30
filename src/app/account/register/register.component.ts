import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AccountService } from '../account.service';
import { NotificationService } from '../../shared/services/notification.service';
import { Router } from '@angular/router';
import { NotificationResponse } from '../../shared/models/core/notification-response';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  submitted: boolean = false;
  loading: boolean = false;
  errorMessages: string[] = [];

  constructor(
    private accountService: AccountService,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.formBuilder.group({
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(15),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$'),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(15),
        ],
      ],
    });
  }

  register() {
    this.submitted = true;
    this.loading = true;
    this.errorMessages = [];

    if (this.registerForm.valid) {
      this.accountService.register(this.registerForm.value).subscribe({
        next: (response: NotificationResponse) => {
          this.notificationService.showNotification(
            true,
            response.title,
            response.message
          );
          this.router.navigateByUrl('account/login');
          this.loading = false;
        },
        error: (error) => {
          if (error.error.errors) {
            this.errorMessages = error.error.errors;
          } else if (typeof error.error == 'string') {
            this.errorMessages.push(error.error);
          } else {
            this.errorMessages.push('Internal server error.');
          }

          this.loading = false;
        },
      });
    } else {
      this.loading = false;
    }
  }
}
