import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../shared/models/core/menu-item';
import { PrimeNGConfig } from 'primeng/api';

const _menuItems: MenuItem[] = [
  // {
  //   label: 'Dashboard',
  //   icon: 'pi pi-fw pi-home',
  //   routerLink: '',
  // },
  {
    label: 'Job Records',
    icon: 'pi pi-fw pi-book',
    routerLink: 'job-records',
  },
  {
    label: 'Reports',
    icon: 'pi pi-fw pi-receipt',
    routerLink: 'reports',
  },
  {
    label: 'Employees',
    icon: 'pi pi-fw pi-id-card',
    routerLink: 'employees',
  },
  {
    label: 'Machines',
    icon: 'pi pi-fw pi-gauge',
    routerLink: 'machines',
  },
  {
    label: 'Master Data',
    icon: 'pi pi-fw pi-sitemap',
    routerLink: 'master-data',
  },

  {
    label: 'Settings',
    icon: 'pi pi-fw pi-cog  ',
    routerLink: 'settings',
  },
];

@Component({
  selector: 'app-navigation-bar',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedModule, SidebarComponent],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent implements OnInit {
  menuItems: MenuItem[] = [];
  displaySideBar: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.menuItems = _menuItems;
  }

  onMenuButtonClicked() {
    this.displaySideBar = true;
  }
}
