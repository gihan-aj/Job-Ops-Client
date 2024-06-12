import { Injectable } from '@angular/core';
import { HttpService } from './services/http.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { NotificationComponent } from './components/widgets/notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  ref: DynamicDialogRef | undefined;

  constructor(private dialogService: DialogService) {}

  showNotification() {
    this.ref = this.dialogService.open(NotificationComponent, {});
  }
}
