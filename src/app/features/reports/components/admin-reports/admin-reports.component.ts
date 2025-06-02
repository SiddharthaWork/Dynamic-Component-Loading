import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="admin-reports">
      <h2>Admin Reports</h2>
      <p>This is the admin-specific reports view.</p>
    </div>
  `,
  styles: []
})
export class AdminReportsComponent {}