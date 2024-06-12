import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss',
})
export class NotificationComponent {
  success: boolean = false;
  title: string = '';
  message: string = '';

  constructor(
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig
  ) {
    this.success = this.config.data.success;
    this.title = this.config.data.title;
    this.message = this.config.data.message;
  }

  closeDialog() {
    this.ref.close();
  }
}
