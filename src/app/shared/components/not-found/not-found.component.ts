import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="not-found-container">
      <div class="not-found-content">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist or has been moved.</p>
        <a routerLink="/" class="btn-primary">Return to Dashboard</a>
      </div>
    </div>
  `,
  styles: [`
    .not-found-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 180px);
      text-align: center;
    }
    
    .not-found-content {
      max-width: 500px;
      padding: var(--space-6);
    }
    
    h1 {
      font-size: 6rem;
      margin: 0;
      color: var(--primary-600);
      line-height: 1;
    }
    
    h2 {
      margin-top: var(--space-4);
      margin-bottom: var(--space-6);
      color: var(--neutral-800);
    }
    
    p {
      margin-bottom: var(--space-8);
      color: var(--neutral-600);
    }
    
    .btn-primary {
      display: inline-block;
      padding: var(--space-3) var(--space-6);
    }
  `]
})
export class NotFoundComponent {}