import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loading-container">
      <div class="spinner"></div>
      <p>Loading...</p>
    </div>
  `,
  styles: [`
    .loading-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 300px;
    }
    
    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(59, 130, 246, 0.1);
      border-radius: 50%;
      border-top-color: var(--primary-600);
      animation: spin 1s ease-in-out infinite;
      margin-bottom: var(--space-4);
    }
    
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
  `]
})
export class LoadingComponent {}