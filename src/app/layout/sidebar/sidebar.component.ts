import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MenuItem } from '../../shared/models/core/menu-item';
import { AccountService } from '../../account/account.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input() menuItems: MenuItem[] = [];
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();

  constructor(public accountService: AccountService) {}

  onDisplayChanged() {
    this.displayChange.emit(this.display);
  }

  onMenuItemClicked() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

  logout() {
    this.accountService.logout();
    this.onMenuItemClicked();
  }
}
