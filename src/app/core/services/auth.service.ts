import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { User, UserRole, AuthState } from '../models/user.model';

const INITIAL_STATE: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null
};

// Mock users for demo
const MOCK_USERS: Record<string, User> = {
  admin: {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    firstName: 'Admin',
    lastName: 'User',
    role: UserRole.Admin,
    permissions: ['read', 'write', 'delete', 'admin'],
    avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
  },
  manager: {
    id: '2',
    username: 'manager',
    email: 'manager@example.com',
    firstName: 'Manager',
    lastName: 'User',
    role: UserRole.Manager,
    permissions: ['read', 'write', 'manage'],
    avatar: 'https://randomuser.me/api/portraits/men/68.jpg'
  },
  employee: {
    id: '3',
    username: 'employee',
    email: 'employee@example.com',
    firstName: 'Employee',
    lastName: 'User',
    permissions: ['read'],
    role: UserRole.Employee,
    avatar: 'https://randomuser.me/api/portraits/men/33.jpg'
  }
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authState = new BehaviorSubject<AuthState>(this.getInitialState());
  
  // Observable streams
  readonly authState$ = this.authState.asObservable();
  readonly currentUser$ = this.authState$.pipe(
    tap(state => state.user)
  );
  readonly isAuthenticated$ = this.authState$.pipe(
    tap(state => state.isAuthenticated)
  );
  
  constructor() {
    // Check for existing auth in localStorage on init
    this.checkAuth();
  }
  
  /**
   * Login with username and password
   */
  login(username: string, password: string): Observable<User> {
    this.setLoading(true);
    
    // In a real app, this would be an HTTP request
    if (MOCK_USERS[username] && password === 'password') {
      const user = MOCK_USERS[username];
      const token = `mock-jwt-token-${Date.now()}`;
      
      return of(user).pipe(
        delay(800), // Simulate network delay
        tap(() => {
          this.setAuthState({
            user,
            token,
            isAuthenticated: true,
            loading: false,
            error: null
          });
          this.saveToStorage(user, token);
        })
      );
    }
    
    return throwError(() => {
      const error = 'Invalid username or password';
      this.setAuthState({
        ...this.authState.value,
        loading: false,
        error
      });
      return new Error(error);
    });
  }
  
  /**
   * Logout the current user
   */
  logout(): Observable<void> {
    this.clearAuthState();
    localStorage.removeItem('auth');
    return of(undefined);
  }
  
  /**
   * Check if the user has the required role
   */
  hasRole(requiredRoles: UserRole | UserRole[]): boolean {
    const user = this.authState.value.user;
    
    if (!user) {
      return false;
    }
    
    const rolesToCheck = Array.isArray(requiredRoles) 
      ? requiredRoles 
      : [requiredRoles];
    
    return rolesToCheck.includes(user.role);
  }
  
  /**
   * Check if the user has the required permission
   */
  hasPermission(permission: string): boolean {
    const user = this.authState.value.user;
    
    if (!user || !user.permissions) {
      return false;
    }
    
    return user.permissions.includes(permission);
  }
  
  /**
   * Get the current user role
   */
  getUserRole(): UserRole | null {
    return this.authState.value.user?.role || null;
  }
  
  /**
   * Get the current user
   */
  getCurrentUser(): User | null {
    return this.authState.value.user;
  }
  
  /**
   * Get the JWT token
   */
  getToken(): string | null {
    return this.authState.value.token;
  }
  
  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.authState.value.isAuthenticated;
  }
  
  /**
   * Set loading state
   */
  private setLoading(loading: boolean): void {
    this.setAuthState({
      ...this.authState.value,
      loading
    });
  }
  
  /**
   * Update the auth state
   */
  private setAuthState(state: AuthState): void {
    this.authState.next(state);
  }
  
  /**
   * Clear auth state on logout
   */
  private clearAuthState(): void {
    this.setAuthState(INITIAL_STATE);
  }
  
  /**
   * Save auth state to localStorage
   */
  private saveToStorage(user: User, token: string): void {
    localStorage.setItem('auth', JSON.stringify({ user, token }));
  }
  
  /**
   * Get initial state from localStorage if available
   */
  private getInitialState(): AuthState {
    try {
      const savedAuth = localStorage.getItem('auth');
      
      if (savedAuth) {
        const { user, token } = JSON.parse(savedAuth);
        return {
          user,
          token,
          isAuthenticated: !!user && !!token,
          loading: false,
          error: null
        };
      }
    } catch (e) {
      localStorage.removeItem('auth');
    }
    
    return INITIAL_STATE;
  }
  
  /**
   * Check authentication status on service init
   */
  private checkAuth(): void {
    const currentState = this.authState.value;
    
    if (currentState.token && currentState.user) {
      // In a real app, you would validate the token with the server here
      // For now, we'll just consider it valid
      this.setAuthState({
        ...currentState,
        isAuthenticated: true
      });
    }
  }
}