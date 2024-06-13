import { Component, OnInit } from '@angular/core';
import { MenuItem } from '../shared/models/core/menu-item';

const _menuItems: MenuItem[] = [
  {
    label: 'Departments',
    icon: 'pi-building-columns',
    routerLink: 'master-data/departments',
  },
  {
    label: 'Sections',
    icon: 'pi-warehouse',
    routerLink: 'master-data/sections',
  },
  {
    label: 'Machines',
    icon: 'pi-cog',
    routerLink: 'master-data/machines',
  },
  {
    label: 'Job Titles',
    icon: 'pi-briefcase',
    routerLink: 'master-data/job-titles',
  },
  {
    label: 'Employees',
    icon: 'pi-id-card',
    routerLink: 'master-data/employees',
  },
];

@Component({
  selector: 'app-master-data',
  templateUrl: './master-data.component.html',
  styleUrl: './master-data.component.scss',
})
export class MasterDataComponent implements OnInit {
  menuItems: MenuItem[] = [];

  ngOnInit(): void {
    this.menuItems = _menuItems;
  }
}
