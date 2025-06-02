import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { RoleGuard } from './core/guards/role.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { UserRole } from './core/models/user.model';

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: '/dashboard', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./features/dashboard/dashboard.routes')
      .then(m => m.DASHBOARD_ROUTES),
    canActivate: [AuthGuard]
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./features/admin/admin.routes')
      .then(m => m.ADMIN_ROUTES),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.Admin] }
  },
  { 
    path: 'manager', 
    loadChildren: () => import('./features/manager/manager.routes')
      .then(m => m.MANAGER_ROUTES),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.Admin, UserRole.Manager] }
  },
  { 
    path: 'employee', 
    loadChildren: () => import('./features/employee/employee.routes')
      .then(m => m.EMPLOYEE_ROUTES),
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [UserRole.Admin, UserRole.Manager, UserRole.Employee] }
  },
  { 
    path: 'profile', 
    loadChildren: () => import('./features/profile/profile.routes')
      .then(m => m.PROFILE_ROUTES),
    canActivate: [AuthGuard]
  },
  { 
    path: '**', 
    component: NotFoundComponent 
  }
];