import { Injectable } from '@angular/core';
import { 
  CanActivateFn, 
  ActivatedRouteSnapshot, 
  RouterStateSnapshot, 
  Router, 
  UrlTree 
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { UserRole } from '../models/user.model';

export const RoleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Get roles from route data
  const requiredRoles = route.data['roles'] as UserRole[];
  
  if (!requiredRoles || requiredRoles.length === 0) {
    console.warn('RoleGuard: No roles specified in route data.');
    return true;
  }
  
  // Check if user has required role
  if (authService.hasRole(requiredRoles)) {
    return true;
  }
  
  // Redirect to appropriate page based on user's role
  const userRole = authService.getUserRole();
  
  if (userRole) {
    // User is authenticated but doesn't have permission
    // Redirect to their appropriate home page
    switch (userRole) {
      case UserRole.Admin:
        return router.parseUrl('/admin');
      case UserRole.Manager:
        return router.parseUrl('/manager');
      case UserRole.Employee:
        return router.parseUrl('/employee');
      default:
        return router.parseUrl('/dashboard');
    }
  }
  
  // User is not authenticated, redirect to login
  return router.parseUrl('/login');
};