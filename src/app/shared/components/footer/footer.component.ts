import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-info">
            <p>&copy; Frontend Trainee Task</p>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: var(--neutral-800);
      color: var(--neutral-300);
      padding: var(--space-6) 0;
      margin-top: auto;
    }
    
    .footer-content {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    .footer-info p {
      margin: 0;
      text-align: center;
    }
  `]
})
export class FooterComponent {}