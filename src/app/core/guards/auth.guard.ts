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

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  // Check if user is authenticated
  if (authService.isAuthenticated()) {
    return true;
  }
  
  // Redirect to login with return URL
  return router.createUrlTree(['/login'], { 
    queryParams: { returnUrl: state.url } 
  });
};