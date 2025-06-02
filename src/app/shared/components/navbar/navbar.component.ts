import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/user.model';
import { RoleBasedDirective } from '../../../core/directives/role-based.directive';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RoleBasedDirective],
  template: `
    <nav class="navbar">
      <div class="container">
        <div class="navbar-content">
          <div class="navbar-brand">
            <a routerLink="/" class="brand-link">RBAC Demo</a>
          </div>
          
          <div class="navbar-menu">
            <a routerLink="/dashboard" class="nav-link">Dashboard</a>
            
            <a 
              routerLink="/admin" 
              class="nav-link" 
              *appRoleBasedAccess="[UserRole.Admin]"
            >Admin</a>
            
            <a 
              routerLink="/manager" 
              class="nav-link" 
              *appRoleBasedAccess="[UserRole.Admin, UserRole.Manager]"
            >Manager</a>
            
            <a 
              routerLink="/employee" 
              class="nav-link" 
              *appRoleBasedAccess="[UserRole.Admin, UserRole.Manager, UserRole.Employee]"
            >Employee</a>
          </div>
          
          <div class="navbar-actions">
            <div class="user-menu" *ngIf="isAuthenticated">
              <a routerLink="/profile" class="user-menu-trigger">
                <div class="avatar-container">
                  <img *ngIf="userAvatar" [src]="userAvatar" alt="User avatar" class="avatar">
                  <div *ngIf="!userAvatar" class="avatar-placeholder">
                    {{ getInitials() }}
                  </div>
                </div>
                <span class="user-role" [ngClass]="roleThemeClass">{{ userRole }}</span>
              </a>
              <button class="btn-secondary logout-button" (click)="logout()">Logout</button>
            </div>
            
            <a routerLink="/login" class="nav-link" *ngIf="!isAuthenticated">Login</a>
          </div>
        </div>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: white;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
      padding: var(--space-4) 0;
    }
    
    .navbar-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .navbar-brand {
      font-weight: 600;
      font-size: 1.25rem;
    }
    
    .brand-link {
      color: var(--neutral-900);
      text-decoration: none;
    }
    
    .navbar-menu {
      display: none;
    }
    
    .nav-link {
      color: var(--neutral-700);
      text-decoration: none;
      padding: var(--space-2) var(--space-3);
      border-radius: var(--radius-md);
      transition: background-color var(--transition-fast), color var(--transition-fast);
    }
    
    .nav-link:hover {
      background-color: var(--neutral-100);
      color: var(--neutral-900);
      text-decoration: none;
    }
    
    .user-menu {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }
    
    .user-menu-trigger {
      display: flex;
      align-items: center;
      text-decoration: none;
      color: var(--neutral-800);
      gap: var(--space-2);
    }
    
    .avatar-container {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: var(--space-2);
    }
    
    .avatar {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .avatar-placeholder {
      width: 100%;
      height: 100%;
      background-color: var(--primary-100);
      color: var(--primary-600);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.875rem;
      font-weight: 600;
    }
    
    .user-role {
      font-size: 0.75rem;
      font-weight: 600;
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-sm);
      color: white;
      margin-right: var(--space-2);
    }
    
    .admin-theme {
      background-color: var(--primary-600);
    }
    
    .manager-theme {
      background-color: var(--success-600);
    }
    
    .employee-theme {
      background-color: var(--warning-600);
    }
    
    .user-name {
      font-weight: 500;
    }
    
    .logout-button {
      font-size: 0.875rem;
      padding: var(--space-1) var(--space-3);
    }
    
    @media (min-width: 768px) {
      .navbar-menu {
        display: flex;
        gap: var(--space-2);
      }
    }
  `]
})
export class NavbarComponent implements OnDestroy {
  private authSubscription: Subscription;
  isAuthenticated = this.authService.isAuthenticated();
  userRole = this.authService.getUserRole();
  userName = this.authService.getCurrentUser()?.firstName || 'User';
  userAvatar = this.authService.getCurrentUser()?.avatar;
  roleThemeClass = '';
  UserRole = UserRole;
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    if (this.userRole) {
      this.roleThemeClass = `${this.userRole.toLowerCase()}-theme`;
    }

    this.authSubscription = this.authService.authState$.subscribe(() => {
      this.isAuthenticated = this.authService.isAuthenticated();
      this.userRole = this.authService.getUserRole();
      this.userName = this.authService.getCurrentUser()?.firstName || 'User';
      this.userAvatar = this.authService.getCurrentUser()?.avatar;
      if (this.userRole) {
        this.roleThemeClass = `${this.userRole.toLowerCase()}-theme`;
      }
    });
  }
  
  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
  
  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }

  getInitials(): string {
    const user = this.authService.getCurrentUser();
    if (!user) return 'U';
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  }
}