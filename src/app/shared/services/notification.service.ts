import { Injectable } from '@angular/core';
import { NotificationComponent } from '../components/widgets/notification/notification.component';
import {
  DynamicDialogRef,
  DialogService,
  DynamicDialogConfig,
} from 'primeng/dynamicdialog';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  ref: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService) {}

  showNotification(success: boolean, title: string, message: string) {
    this.ref = this.dialogService.open(NotificationComponent, {
      closable: false,
      data: {
        success: success,
        title: title,
        message: message,
      },
    });
  }

  closeNotification() {
    if (this.ref) this.ref.close();
  }
}
