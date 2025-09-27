import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OutputChildComponent } from './output-child.component';

export interface UserData {
  name: string;
  email: string;
  role: string;
}

export interface NotificationData {
  type: 'success' | 'warning' | 'error' | 'info';
  message: string;
  timestamp: Date;
}

@Component({
  selector: 'app-output-parent',
  standalone: true,
  imports: [CommonModule, OutputChildComponent],
  template: `
    <div class="output-example">
      <h2>Output Example - Parent Component</h2>
      <p>This demonstrates receiving data FROM child TO parent using @Output() and EventEmitter</p>
      
      <div class="parent-data">
        <h3>Data Received from Child:</h3>
        
        <div class="received-section">
          <h4>Messages received:</h4>
          <div class="messages-container">
            <div *ngFor="let msg of receivedMessages; trackBy: trackMessage" 
                 class="message-item"
                 [class.highlight]="msg === receivedMessages[receivedMessages.length - 1]">
              <span class="timestamp">{{ msg.timestamp | date:'medium' }}</span>
              <span class="message">{{ msg.text }}</span>
            </div>
            <div *ngIf="receivedMessages.length === 0" class="no-data">
              No messages received yet
            </div>
          </div>
        </div>

        <div class="received-section">
          <h4>User Data received:</h4>
          <div class="user-data" *ngIf="userData; else noUserData">
            <div class="data-row">
              <strong>Name:</strong> {{ userData.name }}
            </div>
            <div class="data-row">
              <strong>Email:</strong> {{ userData.email }}
            </div>
            <div class="data-row">
              <strong>Role:</strong> 
              <span class="role-badge" [class]="'role-' + userData.role">{{ userData.role }}</span>
            </div>
          </div>
          <ng-template #noUserData>
            <div class="no-data">No user data received yet</div>
          </ng-template>
        </div>

        <div class="received-section">
          <h4>Notifications received:</h4>
          <div class="notifications-container">
            <div *ngFor="let notification of notifications; trackBy: trackNotification" 
                 class="notification-item" 
                 [class]="'notification-' + notification.type">
              <div class="notification-header">
                <span class="notification-type">{{ notification.type | titlecase }}</span>
                <span class="notification-time">{{ notification.timestamp | date:'short' }}</span>
              </div>
              <div class="notification-message">{{ notification.message }}</div>
            </div>
            <div *ngIf="notifications.length === 0" class="no-data">
              No notifications received yet
            </div>
          </div>
        </div>

        <div class="received-section">
          <h4>Counter Value:</h4>
          <div class="counter-display">
            <div class="counter-value">{{ currentCounter }}</div>
            <div class="counter-bar">
              <div class="counter-progress" [style.width.%]="(currentCounter / 100) * 100"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="child-container">
        <app-output-child 
          (messageEmitted)="onMessageReceived($event)"
          (userDataEmitted)="onUserDataReceived($event)"
          (notificationEmitted)="onNotificationReceived($event)"
          (counterChanged)="onCounterChanged($event)">
        </app-output-child>
      </div>

      <div class="stats">
        <div class="stat-item">
          <span class="stat-label">Total Messages:</span>
          <span class="stat-value">{{ receivedMessages.length }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Total Notifications:</span>
          <span class="stat-value">{{ notifications.length }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">User Data Updates:</span>
          <span class="stat-value">{{ userData ? 1 : 0 }}</span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .output-example {
      padding: 20px;
      border: 2px solid #dc3545;
      border-radius: 8px;
      margin: 20px;
      background-color: #fff5f5;
    }
    
    .parent-data {
      background-color: white;
      padding: 20px;
      border-radius: 5px;
      margin: 15px 0;
      border: 1px solid #dee2e6;
    }
    
    .received-section {
      margin: 20px 0;
      padding: 15px;
      border-left: 4px solid #dc3545;
      background-color: #f8f9fa;
    }
    
    .messages-container, .notifications-container {
      max-height: 200px;
      overflow-y: auto;
      border: 1px solid #dee2e6;
      border-radius: 3px;
      padding: 10px;
      background-color: white;
    }
    
    .message-item {
      padding: 8px;
      margin: 5px 0;
      border-radius: 3px;
      background-color: #f8f9fa;
      transition: all 0.3s ease;
    }
    
    .message-item.highlight {
      background-color: #d4edda;
      border-left: 3px solid #28a745;
      animation: highlight 0.5s ease;
    }
    
    @keyframes highlight {
      0% { background-color: #28a745; }
      100% { background-color: #d4edda; }
    }
    
    .timestamp {
      font-size: 0.8em;
      color: #6c757d;
      margin-right: 10px;
    }
    
    .user-data {
      background-color: white;
      padding: 15px;
      border-radius: 3px;
      border: 1px solid #dee2e6;
    }
    
    .data-row {
      margin: 8px 0;
      padding: 5px 0;
      border-bottom: 1px solid #f8f9fa;
    }
    
    .role-badge {
      padding: 2px 8px;
      border-radius: 3px;
      font-size: 0.8em;
    }
    
    .role-admin {
      background-color: #f8d7da;
      color: #721c24;
    }
    
    .role-user {
      background-color: #d7edff;
      color: #004085;
    }
    
    .role-moderator {
      background-color: #fff3cd;
      color: #856404;
    }
    
    .notification-item {
      margin: 10px 0;
      padding: 10px;
      border-radius: 5px;
      border-left: 4px solid;
    }
    
    .notification-success {
      background-color: #d4edda;
      border-left-color: #28a745;
    }
    
    .notification-warning {
      background-color: #fff3cd;
      border-left-color: #ffc107;
    }
    
    .notification-error {
      background-color: #f8d7da;
      border-left-color: #dc3545;
    }
    
    .notification-info {
      background-color: #d7edff;
      border-left-color: #007bff;
    }
    
    .notification-header {
      display: flex;
      justify-content: space-between;
      font-weight: bold;
      margin-bottom: 5px;
    }
    
    .notification-type {
      text-transform: uppercase;
      font-size: 0.8em;
    }
    
    .notification-time {
      font-size: 0.8em;
      opacity: 0.7;
    }
    
    .counter-display {
      background-color: white;
      padding: 15px;
      border-radius: 3px;
      border: 1px solid #dee2e6;
    }
    
    .counter-value {
      font-size: 2em;
      font-weight: bold;
      text-align: center;
      color: #dc3545;
      margin-bottom: 10px;
    }
    
    .counter-bar {
      height: 20px;
      background-color: #e9ecef;
      border-radius: 10px;
      overflow: hidden;
    }
    
    .counter-progress {
      height: 100%;
      background: linear-gradient(90deg, #dc3545, #fd7e14);
      transition: width 0.5s ease;
    }
    
    .child-container {
      margin: 20px 0;
    }
    
    .stats {
      display: flex;
      gap: 20px;
      margin-top: 20px;
      padding: 15px;
      background-color: #e7f3ff;
      border-radius: 5px;
    }
    
    .stat-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .stat-label {
      font-size: 0.9em;
      color: #6c757d;
    }
    
    .stat-value {
      font-size: 1.5em;
      font-weight: bold;
      color: #dc3545;
    }
    
    .no-data {
      text-align: center;
      color: #6c757d;
      font-style: italic;
      padding: 20px;
    }
  `]
})
export class OutputParentComponent {
  receivedMessages: Array<{text: string, timestamp: Date}> = [];
  userData: UserData | null = null;
  notifications: NotificationData[] = [];
  currentCounter: number = 0;

  onMessageReceived(message: string) {
    this.receivedMessages.push({
      text: message,
      timestamp: new Date()
    });
  }

  onUserDataReceived(userData: UserData) {
    this.userData = userData;
  }

  onNotificationReceived(notification: NotificationData) {
    this.notifications.push(notification);
  }

  onCounterChanged(value: number) {
    this.currentCounter = value;
  }

  trackMessage(index: number, item: {text: string, timestamp: Date}): string {
    return item.timestamp.getTime() + item.text;
  }

  trackNotification(index: number, item: NotificationData): string {
    return item.timestamp.getTime() + item.message;
  }
}
