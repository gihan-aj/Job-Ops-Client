import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterDataComponent } from './master-data.component';
import { DepartmentsComponent } from './departments/departments.component';
import { SectionsComponent } from './sections/sections.component';
import { MachinesComponent } from './machines/machines.component';
import { JobTitlesComponent } from './job-titles/job-titles.component';
import { EmployeesComponent } from './employees/employees.component';

const routes: Routes = [
  { path: '', component: MasterDataComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'sections', component: SectionsComponent },
  { path: 'machines', component: MachinesComponent },
  { path: 'job-titles', component: JobTitlesComponent },
  { path: 'employees', component: EmployeesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterDataRoutingModule {}
