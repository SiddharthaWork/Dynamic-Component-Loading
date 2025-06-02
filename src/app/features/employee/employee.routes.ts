import { Routes } from '@angular/router';
import { EmployeeDashboardComponent } from '../dashboard/components/employee-dashboard/employee-dashboard.component';

export const EMPLOYEE_ROUTES: Routes = [
  {
    path: '',
    component: EmployeeDashboardComponent
  }
];