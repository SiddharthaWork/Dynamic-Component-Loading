import { 
  Component, 
  OnInit, 
  ViewChild, 
  ViewContainerRef, 
  AfterViewInit, 
  OnDestroy 
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentLoaderService } from '../../core/services/component-loader.service';
import { RoleService } from '../../core/services/role.service';
import { AuthService } from '../../core/services/auth.service';
import { RoleBasedDirective } from '../../core/directives/role-based.directive';
import { UserRole } from '../../core/models/user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RoleBasedDirective],
  template: `
    <div class="dashboard-container">
      <header class="dashboard-header">
        <h1>Dashboard</h1>
        <div class="user-info" *ngIf="currentUser">
          <span class="role-indicator" [ngClass]="roleThemeClass">
            {{ currentUser.role }}
          </span>
          <span class="user-name">{{ currentUser.firstName }} {{ currentUser.lastName }}</span>
        </div>
      </header>
      
      <div class="dashboard-content">
        <div class="role-specific-content">
          <ng-container #dynamicComponentContainer></ng-container>
          
          <div *ngIf="!componentLoaded" class="component-loading">
            <div class="spinner"></div>
            <p>Loading role-specific dashboard...</p>
          </div>
        </div>
        
        <aside class="dashboard-sidebar">
          <section class="sidebar-section">
            <h3 class="section-title">
              <i class="fas fa-bolt"></i>
              Quick Actions
            </h3>
            <ul class="action-list">
              <li *appRoleBasedAccess="[UserRole.Admin]">
                <a href="#" class="action-link">
                  <i class="fas fa-users-cog"></i>
                  <span>User Management</span>
                  <i class="fas fa-chevron-right"></i>
                </a>
              </li>
              <li *appRoleBasedAccess="[UserRole.Admin, UserRole.Manager]">
                <a href="#" class="action-link">
                  <i class="fas fa-chart-bar"></i>
                  <span>Reports</span>
                  <i class="fas fa-chevron-right"></i>
                </a>
              </li>
              <li *appRoleBasedAccess="[UserRole.Admin, UserRole.Manager]">
                <a href="#" class="action-link">
                  <i class="fas fa-user-friends"></i>
                  <span>Team Management</span>
                  <i class="fas fa-chevron-right"></i>
                </a>
              </li>
              <li>
                <a href="#" class="action-link">
                  <i class="fas fa-tasks"></i>
                  <span>My Tasks</span>
                  <i class="fas fa-chevron-right"></i>
                </a>
              </li>
              <li>
                <a href="#" class="action-link">
                  <i class="fas fa-user-circle"></i>
                  <span>My Profile</span>
                  <i class="fas fa-chevron-right"></i>
                </a>
              </li>
            </ul>
          </section>
          
          <section class="sidebar-section" *appRoleBasedAccess="[UserRole.Admin]">
            <h3 class="section-title">
              <i class="fas fa-tools"></i>
              Admin Tools
            </h3>
            <ul class="action-list">
              <li>
                <a href="#" class="action-link">
                  <i class="fas fa-cogs"></i>
                  <span>System Settings</span>
                  <i class="fas fa-chevron-right"></i>
                </a>
              </li>
              <li>
                <a href="#" class="action-link">
                  <i class="fas fa-shield-alt"></i>
                  <span>Access Control</span>
                  <i class="fas fa-chevron-right"></i>
                </a>
              </li>
              <li>
                <a href="#" class="action-link">
                  <i class="fas fa-history"></i>
                  <span>Audit Logs</span>
                  <i class="fas fa-chevron-right"></i>
                </a>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      margin: var(--space-4) 0;
    }
    
    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-6);
      padding-bottom: var(--space-4);
      border-bottom: 1px solid var(--neutral-200);
    }
    
    .user-info {
      display: flex;
      align-items: center;
      gap: var(--space-3);
    }
    
    .user-name {
      font-weight: 500;
    }
    
    .dashboard-content {
      display: grid;
      grid-template-columns: 1fr;
      gap: var(--space-6);
    }
    
    .role-specific-content {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--space-6);
      min-height: 300px;
    }
    
    .dashboard-sidebar {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      padding: var(--space-6);
      height: fit-content;
    }
    
    .sidebar-section {
      margin-bottom: var(--space-8);
    }
    
    .sidebar-section:last-child {
      margin-bottom: 0;
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: var(--space-2);
      color: var(--neutral-700);
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: var(--space-4);
      padding-bottom: var(--space-2);
      border-bottom: 2px solid var(--neutral-100);
    }

    .section-title i {
      color: var(--primary-500);
      font-size: 1rem;
    }
    
    .action-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .action-link {
      display: flex;
      align-items: center;
      padding: var(--space-3) var(--space-4);
      color: var(--neutral-700);
      text-decoration: none;
      border-radius: var(--radius-md);
      transition: all var(--transition-fast);
      margin-bottom: var(--space-1);
    }

    .action-link i:first-child {
      width: 20px;
      margin-right: var(--space-3);
      color: var(--neutral-500);
      font-size: 1rem;
      transition: color var(--transition-fast);
    }

    .action-link i:last-child {
      margin-left: auto;
      font-size: 0.75rem;
      color: var(--neutral-400);
      opacity: 0;
      transform: translateX(-4px);
      transition: all var(--transition-fast);
    }
    
    .action-link:hover {
      background-color: var(--primary-50);
      color: var(--primary-700);
      text-decoration: none;
    }

    .action-link:hover i:first-child {
      color: var(--primary-500);
    }

    .action-link:hover i:last-child {
      opacity: 1;
      transform: translateX(0);
      color: var(--primary-500);
    }

    .action-link span {
      flex: 1;
      font-weight: 500;
    }
    
    .component-loading {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 200px;
    }
    
    @media (min-width: 768px) {
      .dashboard-content {
        grid-template-columns: 2fr 1fr;
      }
    }
  `]
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef }) 
  dynamicComponentContainer!: ViewContainerRef;
  
  componentLoaded = false;
  currentUser = this.authService.getCurrentUser();
  roleThemeClass = '';
  UserRole = UserRole; // Expose enum to template
  
  private subscription: Subscription | null = null;
  
  constructor(
    private componentLoader: ComponentLoaderService,
    private roleService: RoleService,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    // Set role theme class
    const userRole = this.authService.getUserRole();
    if (userRole) {
      this.roleThemeClass = `${userRole.toLowerCase()}-theme`;
    }
  }
  
  ngAfterViewInit(): void {
    // After view is initialized, load the role-specific dashboard component
    this.loadRoleSpecificDashboard();
  }
  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
  private loadRoleSpecificDashboard(): void {
    this.componentLoaded = false;
    
    this.subscription = this.roleService.getComponentConfigForCurrentRole('dashboard')
      .subscribe(config => {
        if (config) {
          // Import the component dynamically
          config.moduleImport().then(component => {
            // Clear container
            this.dynamicComponentContainer.clear();
            
            // Create the component
            const componentRef = this.componentLoader.loadComponent(
              this.dynamicComponentContainer,
              component,
              { user: this.currentUser }
            );
            
            this.componentLoaded = true;
          });
        } else {
          console.warn('No dashboard component found for the current role');
          this.componentLoaded = true;
        }
      });
  }
}