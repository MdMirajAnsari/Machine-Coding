import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-input-child',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="input-child" [class.active]="isActive" [class.inactive]="!isActive">
      <h3>Input Child Component</h3>
      <p>This child component receives data from its parent via @Input() properties</p>

      <div class="received-data">
        <h4>Data received from Parent:</h4>

        <div class="data-item">
          <strong>Message:</strong>
          <span class="value">{{ message || 'No message received' }}</span>
        </div>

        <div class="data-item">
          <strong>User Type:</strong>
          <span class="value user-type" [class]="'type-' + userType">{{ userType }}</span>
        </div>

    </div>
  `,
  styles: [`
    .input-child {
      padding: 20px;
      border: 2px solid #28a745;
      border-radius: 8px;
      margin: 15px 0;
      background-color: #f8fff9;
      transition: all 0.3s ease;
    }

    .input-child.inactive {
      opacity: 0.6;
      background-color: #f8f8f8;
      border-color: #6c757d;
    }

    .received-data {
      background-color: white;
      padding: 15px;
      border-radius: 5px;
      margin: 15px 0;
      border: 1px solid #dee2e6;
    }

    .data-item {
      margin: 10px 0;
      padding: 8px;
      border-left: 3px solid #28a745;
      background-color: #f8f9fa;
    }

    .value {
      color: #495057;
      font-weight: bold;
    }

    .user-type.type-admin {
      color: #dc3545;
      background-color: #f8d7da;
      padding: 2px 8px;
      border-radius: 3px;
    }

    .user-type.type-user {
      color: #007bff;
      background-color: #d7edff;
      padding: 2px 8px;
      border-radius: 3px;
    }

    .user-type.type-guest {
      color: #6c757d;
      background-color: #e9ecef;
      padding: 2px 8px;
      border-radius: 3px;
    }

    .count-display {
      width: 100%;
      height: 20px;
      background-color: #e9ecef;
      border-radius: 10px;
      margin-top: 5px;
      position: relative;
      overflow: hidden;
    }

    .count-bar {
      height: 100%;
      background: linear-gradient(90deg, #28a745, #20c997);
      border-radius: 10px;
      transition: width 0.5s ease;
    }

    .status.status-active {
      color: #28a745;
      background-color: #d4edda;
      padding: 2px 8px;
      border-radius: 3px;
    }

    .status.status-inactive {
      color: #dc3545;
      background-color: #f8d7da;
      padding: 2px 8px;
      border-radius: 3px;
    }

    .input-info {
      background-color: #e7f3ff;
      padding: 15px;
      border-radius: 5px;
      border: 1px solid #b8daff;
    }

    .input-info ul {
      margin: 10px 0;
      padding-left: 20px;
    }

    .input-info li {
      margin: 5px 0;
    }

    code {
      background-color: #f8f9fa;
      padding: 2px 4px;
      border-radius: 3px;
      border: 1px solid #e9ecef;
      font-family: 'Courier New', monospace;
    }
  `]
})
export class InputChildComponent {
  @Input() message: string = '';
  @Input() userType: string = 'guest';
  @Input() count: number = 0;
  @Input() isActive: boolean = false;
}
