import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-employee-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="employee-reports">
      <h2>Employee Reports</h2>
      <p>This is the employee-specific reports view.</p>
    </div>
  `,
  styles: []
})
export class EmployeeReportsComponent {}