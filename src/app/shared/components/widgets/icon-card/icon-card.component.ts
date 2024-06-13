import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MenuItem } from '../../../models/core/menu-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-icon-card',
  templateUrl: './icon-card.component.html',
  styleUrl: './icon-card.component.scss',
})
export class IconCardComponent {
  @Input() menuItem!: MenuItem;
  @Output() menuItemClicked = new EventEmitter<boolean>();

  constructor(private router: Router) {}

  navigateToPage() {
    this.router.navigate([this.menuItem.routerLink]);
    this.menuItemClicked.emit(true);
  }
}
