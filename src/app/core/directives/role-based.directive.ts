import { Directive, Input, OnInit, TemplateRef, ViewContainerRef, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appRoleBasedAccess]',
  standalone: true
})
export class RoleBasedDirective implements OnInit, OnDestroy {
  @Input('appRoleBasedAccess') roles: UserRole[] = [];
  
  private hasView = false;
  private subscription: Subscription | null = null;
  
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}
  
  ngOnInit(): void {
    this.subscription = this.authService.currentUser$.subscribe(() => {
      this.updateView();
    });
    
    this.updateView();
  }
  
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  
  private updateView(): void {
    // If no roles specified, show for all authenticated users
    if (!this.roles || this.roles.length === 0) {
      this.showIfAuthenticated();
      return;
    }
    
    // Check if user has at least one of the required roles
    const hasRequiredRole = this.authService.hasRole(this.roles);
    
    if (hasRequiredRole && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasRequiredRole && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
  
  private showIfAuthenticated(): void {
    const isAuthenticated = this.authService.isAuthenticated();
    
    if (isAuthenticated && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!isAuthenticated && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}