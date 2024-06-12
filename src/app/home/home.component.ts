import { Component } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { SharedService } from '../shared/shared.service';
import { DialogService } from 'primeng/dynamicdialog';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private notificationServive: NotificationService) {}

  show() {
    this.notificationServive.showNotification(
      true,
      'Account created',
      'Account has been successfuly created.'
    );
  }
  showError() {
    this.notificationServive.showNotification(
      false,
      'Account created',
      'Account has been successfuly created.'
    );
  }
}
