import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="manager-reports">
      <h2>Manager Reports</h2>
      <p>This is the manager-specific reports view.</p>
    </div>
  `,
  styles: []
})
export class ManagerReportsComponent {}