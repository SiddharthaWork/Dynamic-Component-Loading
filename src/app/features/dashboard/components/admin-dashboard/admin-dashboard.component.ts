import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-dashboard">
      <header class="component-header">
        <h2>Admin Dashboard</h2>
        <span class="component-badge admin-theme">Admin View</span>
      </header>
      
      <div class="dashboard-stats">
        <div class="stat-card">
          <h3 class="stat-title">Users</h3>
          <div class="stat-value">254</div>
          <div class="stat-change positive">+12% this month</div>
        </div>
        
        <div class="stat-card">
          <h3 class="stat-title">Active Projects</h3>
          <div class="stat-value">18</div>
          <div class="stat-change positive">+3 new</div>
        </div>
        
        <div class="stat-card">
          <h3 class="stat-title">System Health</h3>
          <div class="stat-value">98%</div>
          <div class="stat-change neutral">Stable</div>
        </div>
        
        <div class="stat-card">
          <h3 class="stat-title">Pending Approvals</h3>
          <div class="stat-value">7</div>
          <div class="stat-change negative">+3 waiting</div>
        </div>
      </div>
      
      <div class="admin-features">
        <section class="feature-section">
          <h3>System Access</h3>
          <p>Manage user permissions and role assignments across the platform.</p>
          <button class="btn-primary">Manage Access</button>
        </section>
        
        <section class="feature-section">
          <h3>Configuration</h3>
          <p>Adjust system-wide settings and customize the application behavior.</p>
          <button class="btn-primary">System Settings</button>
        </section>
      </div>
      
      <div class="recent-activity">
        <h3>Recent Activity</h3>
        <ul class="activity-list">
          <li class="activity-item">
            <span class="activity-time">10:23 AM</span>
            <span class="activity-description">New user registration: <strong>Siddhartha Shrestha</strong></span>
          </li>
          <li class="activity-item">
            <span class="activity-time">Yesterday</span>
            <span class="activity-description">System update deployed: <strong>v2.4.1</strong></span>
          </li>
          <li class="activity-item">
            <span class="activity-time">2 days ago</span>
            <span class="activity-description">Role change: <strong>Rahul Shakya</strong> from Employee to Manager</span>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .admin-dashboard {
      animation: fadeIn 0.3s ease-in-out;
    }
    
    .component-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-6);
    }
    
    .component-badge {
      display: inline-block;
      padding: var(--space-1) var(--space-3);
      border-radius: var(--radius-sm);
      font-size: 0.75rem;
      font-weight: 600;
      color: white;
      background-color: var(--primary-600);
    }
    
    .dashboard-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: var(--space-4);
      margin-bottom: var(--space-8);
    }
    
    .stat-card {
      background-color: var(--neutral-50);
      border-radius: var(--radius-md);
      padding: var(--space-4);
      border: 1px solid var(--neutral-200);
      transition: transform var(--transition-fast), box-shadow var(--transition-fast);
    }
    
    .stat-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    
    .stat-title {
      font-size: 0.875rem;
      color: var(--neutral-600);
      margin-top: 0;
      margin-bottom: var(--space-2);
    }
    
    .stat-value {
      font-size: 1.75rem;
      font-weight: 600;
      color: var(--neutral-900);
      margin-bottom: var(--space-2);
    }
    
    .stat-change {
      font-size: 0.75rem;
      font-weight: 500;
    }
    
    .stat-change.positive {
      color: var(--success-600);
    }
    
    .stat-change.negative {
      color: var(--error-600);
    }
    
    .stat-change.neutral {
      color: var(--neutral-600);
    }
    
    .admin-features {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: var(--space-6);
      margin-bottom: var(--space-8);
    }
    
    .feature-section {
      background-color: var(--primary-50);
      border-radius: var(--radius-md);
      padding: var(--space-6);
      border-left: 4px solid var(--primary-600);
    }
    
    .feature-section h3 {
      margin-top: 0;
      color: var(--primary-700);
    }
    
    .feature-section p {
      margin-bottom: var(--space-4);
    }
    
    .activity-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .activity-item {
      padding: var(--space-3) 0;
      border-bottom: 1px solid var(--neutral-200);
      display: flex;
      align-items: flex-start;
    }
    
    .activity-item:last-child {
      border-bottom: none;
    }
    
    .activity-time {
      flex-shrink: 0;
      width: 100px;
      color: var(--neutral-500);
      font-size: 0.875rem;
    }
    
    .activity-description {
      flex-grow: 1;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class AdminDashboardComponent {
  @Input() user: User | null = null;
}