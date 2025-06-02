import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { LoadingComponent } from './shared/components/loading/loading.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavbarComponent, FooterComponent, LoadingComponent],
  template: `
    <div class="app-container" [ngClass]="roleThemeClass">
      <app-navbar></app-navbar>
      <main class="main-content">
        <div class="container">
          <app-loading *ngIf="isLoading"></app-loading>
          <router-outlet *ngIf="!isLoading"></router-outlet>
        </div>
      </main>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .app-container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }
    
    .main-content {
      flex: 1;
      padding: var(--space-6) 0;
    }
  `]
})
export class AppComponent implements OnInit {
  isLoading = true;
  roleThemeClass = '';
  
  constructor(private authService: AuthService) {}
  
  ngOnInit(): void {
    // Simulate authentication process
    setTimeout(() => {
      this.isLoading = false;
      this.updateRoleTheme();
      
      // Subscribe to role changes to update theme
      this.authService.currentUser$.subscribe(() => {
        this.updateRoleTheme();
      });
    }, 1000);
  }
  
  private updateRoleTheme(): void {
    const userRole = this.authService.getUserRole();
    
    if (userRole) {
      this.roleThemeClass = `${userRole.toLowerCase()}-theme`;
    } else {
      this.roleThemeClass = '';
    }
  }
}