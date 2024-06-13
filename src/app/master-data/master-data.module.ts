import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterDataRoutingModule } from './master-data-routing.module';
import { MasterDataComponent } from './master-data.component';
import { SharedModule } from '../shared/shared.module';
import { DepartmentsComponent } from './departments/departments.component';
import { SectionsComponent } from './sections/sections.component';
import { MachinesComponent } from './machines/machines.component';
import { JobTitlesComponent } from './job-titles/job-titles.component';
import { EmployeesComponent } from './employees/employees.component';

@NgModule({
  declarations: [MasterDataComponent, DepartmentsComponent, SectionsComponent, MachinesComponent, JobTitlesComponent, EmployeesComponent],
  imports: [CommonModule, MasterDataRoutingModule, SharedModule],
})
export class MasterDataModule {}
