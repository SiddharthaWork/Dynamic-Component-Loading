import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-manager-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="manager-dashboard">
      <header class="component-header">
        <h2>Manager Dashboard</h2>
        <span class="component-badge manager-theme">Manager View</span>
      </header>
      
      <div class="dashboard-stats">
        <div class="stat-card">
          <h3 class="stat-title">Team Members</h3>
          <div class="stat-value">16</div>
          <div class="stat-change positive">+2 this month</div>
        </div>
        
        <div class="stat-card">
          <h3 class="stat-title">Active Projects</h3>
          <div class="stat-value">7</div>
          <div class="stat-change positive">+1 new</div>
        </div>
        
        <div class="stat-card">
          <h3 class="stat-title">Tasks Completed</h3>
          <div class="stat-value">83%</div>
          <div class="stat-change positive">+5% from last week</div>
        </div>
        
        <div class="stat-card">
          <h3 class="stat-title">Pending Approvals</h3>
          <div class="stat-value">4</div>
          <div class="stat-change negative">Needs attention</div>
        </div>
      </div>
      
      <div class="team-overview">
        <h3>Team Overview</h3>
        <div class="team-members">
          <div class="team-member">
            <div class="avatar">SS</div>
            <div class="member-info">
              <div class="member-name">Siddhartha Shrestha</div>
              <div class="member-role">Senior Developer</div>
            </div>
            <div class="member-status">
              <span class="status-indicator active"></span>
              Active
            </div>
          </div>
          
          <div class="team-member">
            <div class="avatar">RS</div>
            <div class="member-info">
              <div class="member-name">Ram Shrestha</div>
              <div class="member-role">UX Designer</div>
            </div>
            <div class="member-status">
              <span class="status-indicator active"></span>
              Active
            </div>
          </div>
          
          <div class="team-member">
            <div class="avatar">RS</div>
            <div class="member-info">
              <div class="member-name">Raj Shrestha</div>
              <div class="member-role">QA Engineer</div>
            </div>
            <div class="member-status">
              <span class="status-indicator away"></span>
              Away
            </div>
          </div>
          
          <div class="view-all-wrapper">
            <button class="btn-secondary view-all">View All Team Members</button>
          </div>
        </div>
      </div>
      
      <div class="projects-overview">
        <h3>Projects Overview</h3>
        <div class="project-list">
          <div class="project-item">
            <div class="project-info">
              <h4 class="project-name">Website Redesign</h4>
              <div class="project-details">
                <span class="project-deadline">Due: Oct 15</span>
                <span class="project-progress">Progress: 75%</span>
              </div>
            </div>
            <div class="progress-bar">
              <div class="progress" style="width: 75%"></div>
            </div>
          </div>
          
          <div class="project-item">
            <div class="project-info">
              <h4 class="project-name">Mobile App Development</h4>
              <div class="project-details">
                <span class="project-deadline">Due: Nov 30</span>
                <span class="project-progress">Progress: 45%</span>
              </div>
            </div>
            <div class="progress-bar">
              <div class="progress" style="width: 45%"></div>
            </div>
          </div>
          
          <div class="view-all-wrapper">
            <button class="btn-secondary view-all">View All Projects</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .manager-dashboard {
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
      background-color: var(--success-600);
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
    
    .team-overview,
    .projects-overview {
      margin-bottom: var(--space-8);
    }
    
    .team-members {
      background-color: white;
      border-radius: var(--radius-md);
      border: 1px solid var(--neutral-200);
      overflow: hidden;
    }
    
    .team-member {
      display: flex;
      align-items: center;
      padding: var(--space-4);
      border-bottom: 1px solid var(--neutral-200);
    }
    
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: var(--success-100);
      color: var(--success-700);
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      margin-right: var(--space-3);
    }
    
    .member-info {
      flex-grow: 1;
    }
    
    .member-name {
      font-weight: 500;
    }
    
    .member-role {
      font-size: 0.875rem;
      color: var(--neutral-600);
    }
    
    .member-status {
      display: flex;
      align-items: center;
      font-size: 0.875rem;
    }
    
    .status-indicator {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: var(--space-2);
    }
    
    .status-indicator.active {
      background-color: var(--success-500);
    }
    
    .status-indicator.away {
      background-color: var(--warning-500);
    }
    
    .project-list {
      background-color: white;
      border-radius: var(--radius-md);
      border: 1px solid var(--neutral-200);
      overflow: hidden;
    }
    
    .project-item {
      padding: var(--space-4);
      border-bottom: 1px solid var(--neutral-200);
    }
    
    .project-name {
      margin: 0 0 var(--space-2) 0;
      font-size: 1rem;
    }
    
    .project-details {
      display: flex;
      justify-content: space-between;
      font-size: 0.875rem;
      color: var(--neutral-600);
      margin-bottom: var(--space-3);
    }
    
    .progress-bar {
      height: 6px;
      background-color: var(--neutral-200);
      border-radius: var(--radius-sm);
      overflow: hidden;
    }
    
    .progress {
      height: 100%;
      background-color: var(--success-500);
      border-radius: var(--radius-sm);
    }
    
    .view-all-wrapper {
      padding: var(--space-4);
      display: flex;
      justify-content: center;
    }
    
    .view-all {
      width: 100%;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class ManagerDashboardComponent {
  @Input() user: User | null = null;
}