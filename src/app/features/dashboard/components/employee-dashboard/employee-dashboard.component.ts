import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-employee-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="employee-dashboard">
      <header class="component-header">
        <h2>Employee Dashboard</h2>
        <span class="component-badge employee-theme">Employee View</span>
      </header>
      
      <div class="welcome-banner">
        <h3>Welcome, {{ user?.firstName || 'User' }}!</h3>
        <p>Here's your personal dashboard with your tasks and performance metrics.</p>
      </div>
      
      <div class="dashboard-stats">
        <div class="stat-card">
          <h3 class="stat-title">My Tasks</h3>
          <div class="stat-value">7</div>
          <div class="stat-change neutral">2 due today</div>
        </div>
        
        <div class="stat-card">
          <h3 class="stat-title">Completed Tasks</h3>
          <div class="stat-value">12</div>
          <div class="stat-change positive">This month</div>
        </div>
        
        <div class="stat-card">
          <h3 class="stat-title">My Performance</h3>
          <div class="stat-value">92%</div>
          <div class="stat-change positive">+4% from last month</div>
        </div>
        
        <div class="stat-card">
          <h3 class="stat-title">Team Rank</h3>
          <div class="stat-value">#3</div>
          <div class="stat-change positive">Top 10%</div>
        </div>
      </div>
      
      <div class="tasks-section">
        <div class="section-header">
          <h3>My Tasks</h3>
          <button class="btn-primary">+ New Task</button>
        </div>
        
        <div class="task-list">
          <div class="task-item">
            <input type="checkbox" id="task1" class="task-checkbox">
            <label for="task1" class="task-label">
              <span class="task-title">Complete quarterly report</span>
              <span class="task-due high-priority">Due today</span>
            </label>
          </div>
          
          <div class="task-item">
            <input type="checkbox" id="task2" class="task-checkbox">
            <label for="task2" class="task-label">
              <span class="task-title">Review design proposals</span>
              <span class="task-due medium-priority">Due tomorrow</span>
            </label>
          </div>
          
          <div class="task-item">
            <input type="checkbox" id="task3" class="task-checkbox">
            <label for="task3" class="task-label">
              <span class="task-title">Team meeting preparation</span>
              <span class="task-due medium-priority">Due in 2 days</span>
            </label>
          </div>
          
          <div class="task-item">
            <input type="checkbox" id="task4" class="task-checkbox">
            <label for="task4" class="task-label">
              <span class="task-title">Client presentation</span>
              <span class="task-due low-priority">Due next week</span>
            </label>
          </div>
        </div>
        
        <div class="view-all-wrapper">
          <button class="btn-secondary view-all">View All Tasks</button>
        </div>
      </div>
      
      <div class="announcements-section">
        <h3>Company Announcements</h3>
        <div class="announcements-list">
          <div class="announcement-item">
            <h4 class="announcement-title">Quarterly Company Meeting</h4>
            <p class="announcement-date">Posted 2 days ago</p>
            <p class="announcement-content">
              The quarterly company meeting will be held next Friday at 2 PM in the main conference room.
              All employees are required to attend. Remote workers can join via the provided Zoom link.
            </p>
          </div>
          
          <div class="announcement-item">
            <h4 class="announcement-title">New Health Benefits Package</h4>
            <p class="announcement-date">Posted 1 week ago</p>
            <p class="announcement-content">
              We're excited to announce our new improved health benefits package starting next month.
              Check your email for details about the changes and improvements.
            </p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .employee-dashboard {
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
      background-color: var(--warning-600);
    }
    
    .welcome-banner {
      background-color: var(--warning-50);
      border-radius: var(--radius-md);
      padding: var(--space-6);
      margin-bottom: var(--space-6);
      border-left: 4px solid var(--warning-500);
    }
    
    .welcome-banner h3 {
      margin-top: 0;
      color: var(--warning-700);
    }
    
    .welcome-banner p {
      margin-bottom: 0;
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
    
    .tasks-section,
    .announcements-section {
      margin-bottom: var(--space-8);
    }
    
    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--space-4);
    }
    
    .task-list {
      background-color: white;
      border-radius: var(--radius-md);
      border: 1px solid var(--neutral-200);
      overflow: hidden;
    }
    
    .task-item {
      padding: var(--space-3) var(--space-4);
      border-bottom: 1px solid var(--neutral-200);
      display: flex;
      align-items: center;
    }
    
    .task-item:last-child {
      border-bottom: none;
    }
    
    .task-checkbox {
      margin-right: var(--space-3);
    }
    
    .task-label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-grow: 1;
      cursor: pointer;
    }
    
    .task-due {
      font-size: 0.75rem;
      font-weight: 500;
      padding: var(--space-1) var(--space-2);
      border-radius: var(--radius-sm);
    }
    
    .high-priority {
      background-color: rgba(239, 68, 68, 0.1);
      color: var(--error-600);
    }
    
    .medium-priority {
      background-color: rgba(245, 158, 11, 0.1);
      color: var(--warning-600);
    }
    
    .low-priority {
      background-color: rgba(16, 185, 129, 0.1);
      color: var(--success-600);
    }
    
    .view-all-wrapper {
      padding: var(--space-4);
      display: flex;
      justify-content: center;
    }
    
    .view-all {
      width: 100%;
    }
    
    .announcements-list {
      background-color: white;
      border-radius: var(--radius-md);
      border: 1px solid var(--neutral-200);
      overflow: hidden;
    }
    
    .announcement-item {
      padding: var(--space-4);
      border-bottom: 1px solid var(--neutral-200);
    }
    
    .announcement-item:last-child {
      border-bottom: none;
    }
    
    .announcement-title {
      margin: 0 0 var(--space-1) 0;
      font-size: 1rem;
    }
    
    .announcement-date {
      font-size: 0.75rem;
      color: var(--neutral-500);
      margin-bottom: var(--space-2);
    }
    
    .announcement-content {
      margin: 0;
      font-size: 0.875rem;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class EmployeeDashboardComponent {
  @Input() user: User | null = null;
}