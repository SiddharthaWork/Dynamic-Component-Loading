import { Routes } from '@angular/router';
import { AdminDashboardComponent } from '../dashboard/components/admin-dashboard/admin-dashboard.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminDashboardComponent
  }
];