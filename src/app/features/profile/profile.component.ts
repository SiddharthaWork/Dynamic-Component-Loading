import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth.service';
import { User } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-container">
      <div class="profile-header">
        <h1>User Profile</h1>
      </div>
      
      <div class="profile-card" *ngIf="user">
        <div class="profile-info">
          <div class="avatar-container">
            <img *ngIf="user.avatar" [src]="user.avatar" alt="User avatar" class="avatar">
            <div *ngIf="!user.avatar" class="avatar-placeholder">
              {{ getInitials(user) }}
            </div>
          </div>
          
          <div class="user-details">
            <h2>{{ user.firstName }} {{ user.lastName }}</h2>
            <div class="role-indicator" [ngClass]="roleThemeClass">{{ user.role }}</div>
            <p class="user-email">{{ user.email }}</p>
          </div>
        </div>
        
        <div class="profile-sections">
          <section class="profile-section">
            <h3>Account Information</h3>
            <div class="info-grid">
              <div class="info-item">
                <span class="info-label">Username</span>
                <span class="info-value">{{ user.username }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">User ID</span>
                <span class="info-value">{{ user.id }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Role</span>
                <span class="info-value">{{ user.role }}</span>
              </div>
            </div>
          </section>
          
          <section class="profile-section">
            <h3>Permissions</h3>
            <div class="permissions-list">
              <div class="permission-tag" *ngFor="let permission of user.permissions">
                {{ permission }}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      margin: var(--space-4) 0;
    }
    
    .profile-header {
      margin-bottom: var(--space-6);
    }
    
    .profile-card {
      background-color: white;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-md);
      overflow: hidden;
    }
    
    .profile-info {
      padding: var(--space-6);
      display: flex;
      align-items: center;
      border-bottom: 1px solid var(--neutral-200);
    }
    
    .avatar-container {
      margin-right: var(--space-6);
    }
    
    .avatar {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid var(--neutral-200);
    }
    
    .avatar-placeholder {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background-color: var(--primary-100);
      color: var(--primary-600);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 2rem;
      font-weight: 600;
      border: 3px solid var(--neutral-200);
    }
    
    .user-details {
      flex-grow: 1;
    }
    
    .user-details h2 {
      margin-top: 0;
      margin-bottom: var(--space-2);
    }
    
    .user-email {
      color: var(--neutral-600);
      margin-top: var(--space-2);
    }
    
    .profile-sections {
      padding: var(--space-6);
    }
    
    .profile-section {
      margin-bottom: var(--space-8);
    }
    
    .profile-section:last-child {
      margin-bottom: 0;
    }
    
    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: var(--space-4);
    }
    
    .info-item {
      display: flex;
      flex-direction: column;
    }
    
    .info-label {
      font-size: 0.875rem;
      color: var(--neutral-500);
      margin-bottom: var(--space-1);
    }
    
    .info-value {
      font-weight: 500;
    }
    
    .permissions-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2);
    }
    
    .permission-tag {
      background-color: var(--neutral-100);
      color: var(--neutral-800);
      font-size: 0.875rem;
      padding: var(--space-1) var(--space-3);
      border-radius: var(--radius-sm);
      border: 1px solid var(--neutral-200);
    }
    
    @media (max-width: 640px) {
      .profile-info {
        flex-direction: column;
        text-align: center;
      }
      
      .avatar-container {
        margin-right: 0;
        margin-bottom: var(--space-4);
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  roleThemeClass = '';
  
  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    this.user = this.authService.getCurrentUser();
    
    const userRole = this.authService.getUserRole();
    if (userRole) {
      this.roleThemeClass = `${userRole.toLowerCase()}-theme`;
    }
  }
  
  getInitials(user: User): string {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  }
}