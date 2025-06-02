import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute} from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole } from '../../../core/models/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-container">
      <div class="login-form">
        <h1>Enterprise Login</h1>
        
        <div class="role-selector">
          <h3>Select Role</h3>
          <div class="role-buttons">
            <button 
              type="button" 
              class="role-button"
              [class.selected]="selectedRole === 'admin'"
              (click)="selectRole('admin')"
            >
              <span class="role-indicator admin-theme">Admin</span>
            </button>
            <button 
              type="button" 
              class="role-button"
              [class.selected]="selectedRole === 'manager'"
              (click)="selectRole('manager')"
            >
              <span class="role-indicator manager-theme">Manager</span>
            </button>
            <button 
              type="button" 
              class="role-button"
              [class.selected]="selectedRole === 'employee'"
              (click)="selectRole('employee')"
            >
              <span class="role-indicator employee-theme">Employee</span>
            </button>
          </div>
        </div>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="username">Username</label>
            <input 
              type="text" 
              id="username" 
              formControlName="username" 
              [readonly]="true"
              class="form-control"
            >
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              formControlName="password" 
              [readonly]="true"
              class="form-control"
            >
            <small class="hint">Password is auto-filled</small>
          </div>
          
          <div *ngIf="error" class="error-message">
            {{ error }}
          </div>
          
          <button 
            type="submit" 
            class="btn-primary login-button"
            [disabled]="loginForm.invalid || loading"
          >
            <span *ngIf="!loading">Login</span>
            <span *ngIf="loading" class="spinner-sm"></span>
          </button>
        </form>
        
        <div class="info-box">
          <h4>Information</h4>
          <p>This application demonstrates role-based component loading.</p>
          <p>Each role has access to different components and features:</p>
          <ul>
            <li><strong>Admin:</strong> Full access to all components and sections</li>
            <li><strong>Manager:</strong> Access to management features and employee views</li>
            <li><strong>Employee:</strong> Basic access to employee-specific components</li>
          </ul>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: calc(100vh - 180px);
      padding: var(--space-4);
    }
    
    .login-form {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-lg);
      padding: var(--space-8);
      width: 100%;
      max-width: 480px;
    }
    
    h1 {
      text-align: center;
      margin-bottom: var(--space-6);
      color: var(--neutral-900);
    }
    
    .form-group {
      margin-bottom: var(--space-6);
    }
    
    label {
      display: block;
      margin-bottom: var(--space-2);
      font-weight: 500;
      color: var(--neutral-700);
    }
    
    .form-control {
      width: 100%;
      padding: var(--space-3);
      border: 1px solid var(--neutral-300);
      border-radius: var(--radius-md);
      font-size: 1rem;
      transition: border-color var(--transition-fast);
    }
    
    .form-control:focus {
      outline: none;
      border-color: var(--primary-500);
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    .hint {
      display: block;
      margin-top: var(--space-2);
      color: var(--neutral-500);
      font-size: 0.875rem;
    }
    
    .error-message {
      background-color: rgba(239, 68, 68, 0.1);
      color: var(--error-600);
      padding: var(--space-3);
      border-radius: var(--radius-md);
      margin-bottom: var(--space-4);
      font-size: 0.875rem;
    }
    
    .login-button {
      width: 100%;
      padding: var(--space-3);
      font-weight: 600;
      margin-top: var(--space-4);
    }
    
    .spinner-sm {
      display: inline-block;
      width: 1rem;
      height: 1rem;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s linear infinite;
    }
    
    .role-selector {
      margin-bottom: var(--space-6);
      text-align: center;
    }
    
    .role-buttons {
      display: flex;
      justify-content: center;
      gap: var(--space-3);
      margin-top: var(--space-4);
    }
    
    .role-button {
      background-color: var(--neutral-100);
      border: 2px solid var(--neutral-200);
      border-radius: var(--radius-md);
      padding: var(--space-3) var(--space-4);
      cursor: pointer;
      transition: all var(--transition-fast);
    }
    
    .role-button:hover {
      background-color: var(--neutral-200);
    }
    
    .role-button.selected {
      border-color: var(--primary-500);
      background-color: rgba(59, 130, 246, 0.1);
    }
    
    .info-box {
      margin-top: var(--space-8);
      padding: var(--space-4);
      background-color: var(--neutral-50);
      border-radius: var(--radius-md);
      border-left: 4px solid var(--primary-500);
    }
    
    .info-box h4 {
      margin-top: 0;
      color: var(--primary-700);
    }
    
    .info-box ul {
      padding-left: var(--space-5);
      margin-bottom: 0;
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';
  selectedRole = 'admin';
  returnUrl = '';
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Initialize form
    this.loginForm = this.formBuilder.group({
      username: ['admin', Validators.required],
      password: ['password', Validators.required]
    });
    
    // Get return URL from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }
  
  selectRole(role: string): void {
    this.selectedRole = role;
    this.loginForm.patchValue({
      username: role,
      password: 'password'
    });
  }
  
  onSubmit(): void {
    // Stop if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    
    this.loading = true;
    this.error = '';
    
    const { username, password } = this.loginForm.value;
    
    this.authService.login(username, password)
      .subscribe({
        next: () => {
          // Navigate to return URL or appropriate dashboard based on role
          const userRole = this.authService.getUserRole();
          
          if (this.returnUrl !== '/dashboard' && this.returnUrl !== '/') {
            this.router.navigateByUrl(this.returnUrl);
          } else {
            // Navigate to role-specific page
            switch (userRole) {
              case UserRole.Admin:
                this.router.navigate(['/admin']);
                break;
              case UserRole.Manager:
                this.router.navigate(['/manager']);
                break;
              case UserRole.Employee:
                this.router.navigate(['/employee']);
                break;
              default:
                this.router.navigate(['/dashboard']);
            }
          }
        },
        error: (err) => {
          this.error = err.message || 'Login failed';
          this.loading = false;
        }
      });
  }
}