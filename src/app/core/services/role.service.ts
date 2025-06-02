import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';
import { AuthService } from './auth.service';
import { UserRole } from '../models/user.model';

interface RoleComponentConfig {
  role: UserRole;
  moduleImport: () => Promise<any>;
  componentName: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roleComponentsRegistry = new BehaviorSubject<Record<string, RoleComponentConfig[]>>({
    // Initialize with default components for each section
    'dashboard': [
      {
        role: UserRole.Admin,
        moduleImport: () => import('../../features/dashboard/components/admin-dashboard/admin-dashboard.component')
          .then(m => m.AdminDashboardComponent),
        componentName: 'AdminDashboardComponent'
      },
      {
        role: UserRole.Manager,
        moduleImport: () => import('../../features/dashboard/components/manager-dashboard/manager-dashboard.component')
          .then(m => m.ManagerDashboardComponent),
        componentName: 'ManagerDashboardComponent'
      },
      {
        role: UserRole.Employee,
        moduleImport: () => import('../../features/dashboard/components/employee-dashboard/employee-dashboard.component')
          .then(m => m.EmployeeDashboardComponent),
        componentName: 'EmployeeDashboardComponent'
      }
    ],
    'reports': [
      {
        role: UserRole.Admin,
        moduleImport: () => import('../../features/reports/components/admin-reports/admin-reports.component')
          .then(m => m.AdminReportsComponent),
        componentName: 'AdminReportsComponent'
      },
      {
        role: UserRole.Manager,
        moduleImport: () => import('../../features/reports/components/manager-reports/manager-reports.component')
          .then(m => m.ManagerReportsComponent),
        componentName: 'ManagerReportsComponent'
      },
      {
        role: UserRole.Employee,
        moduleImport: () => import('../../features/reports/components/employee-reports/employee-reports.component')
          .then(m => m.EmployeeReportsComponent),
        componentName: 'EmployeeReportsComponent'
      }
    ]
  });
  
  constructor(private authService: AuthService) {}
  
  /**
   * Get available component config for the current user role and section
   */
  getComponentConfigForCurrentRole(section: string): Observable<RoleComponentConfig | null> {
    return this.roleComponentsRegistry.pipe(
      map(registry => {
        const sectionConfigs = registry[section];
        
        if (!sectionConfigs) {
          return null;
        }
        
        const userRole = this.authService.getUserRole();
        
        if (!userRole) {
          return null;
        }
        
        // Find exact role match first
        const exactMatch = sectionConfigs.find(config => config.role === userRole);
        if (exactMatch) {
          return exactMatch;
        }
        
        // If no exact match, use role hierarchy
        // Admin can access all, Manager can access Manager and Employee, Employee can access only Employee
        switch (userRole) {
          case UserRole.Admin:
            // Admin can view any component, prioritize in this order: Admin, Manager, Employee
            return sectionConfigs.find(config => config.role === UserRole.Admin) ||
                   sectionConfigs.find(config => config.role === UserRole.Manager) ||
                   sectionConfigs.find(config => config.role === UserRole.Employee) ||
                   null;
          case UserRole.Manager:
            // Manager can view Manager or Employee components
            return sectionConfigs.find(config => config.role === UserRole.Manager) ||
                   sectionConfigs.find(config => config.role === UserRole.Employee) ||
                   null;
          case UserRole.Employee:
            // Employee can only view Employee components
            return sectionConfigs.find(config => config.role === UserRole.Employee) || null;
          default:
            return null;
        }
      })
    );
  }
  
  /**
   * Register a new component for a specific role and section
   */
  registerRoleComponent(
    section: string, 
    role: UserRole, 
    moduleImport: () => Promise<any>, 
    componentName: string
  ): void {
    const currentRegistry = this.roleComponentsRegistry.value;
    const sectionConfigs = currentRegistry[section] || [];
    
    // Add or update component config
    const existingIndex = sectionConfigs.findIndex(config => config.role === role);
    
    if (existingIndex >= 0) {
      // Update existing config
      sectionConfigs[existingIndex] = { role, moduleImport, componentName };
    } else {
      // Add new config
      sectionConfigs.push({ role, moduleImport, componentName });
    }
    
    // Update registry
    this.roleComponentsRegistry.next({
      ...currentRegistry,
      [section]: sectionConfigs
    });
  }
  
  /**
   * Get all component configurations for a section
   */
  getComponentConfigsForSection(section: string): Observable<RoleComponentConfig[]> {
    return this.roleComponentsRegistry.pipe(
      map(registry => registry[section] || [])
    );
  }
  
  /**
   * Get component import for specific role and section
   */
  getComponentImport(section: string, role: UserRole): Observable<(() => Promise<any>) | null> {
    return this.roleComponentsRegistry.pipe(
      map(registry => {
        const sectionConfigs = registry[section] || [];
        const config = sectionConfigs.find(c => c.role === role);
        return config ? config.moduleImport : null;
      })
    );
  }
  
  /**
   * Check if a component exists for a specific role and section
   */
  hasComponentForRole(section: string, role: UserRole): Observable<boolean> {
    return this.roleComponentsRegistry.pipe(
      map(registry => {
        const sectionConfigs = registry[section] || [];
        return sectionConfigs.some(c => c.role === role);
      })
    );
  }
}