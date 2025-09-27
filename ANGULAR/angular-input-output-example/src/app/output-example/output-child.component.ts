import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserData, NotificationData } from './output-parent.component';

@Component({
  selector: 'app-output-child',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="output-child">
      <h3>Output Child Component</h3>
      <p>This child component sends data to its parent via @Output() properties and EventEmitter</p>
      
      <div class="output-sections">
        
        <!-- Message Emitter Section -->
        <div class="output-section">
          <h4>Send Messages</h4>
          <div class="control-group">
            <input type="text" 
                   [(ngModel)]="currentMessage" 
                   placeholder="Type a message..."
                   (keyup.enter)="sendMessage()">
            <button (click)="sendMessage()" [disabled]="!currentMessage.trim()">
              Send Message
            </button>
          </div>
          <div class="quick-messages">
            <button *ngFor="let msg of quickMessages" 
                    (click)="sendQuickMessage(msg)" 
                    class="quick-btn">
              {{ msg }}
            </button>
          </div>
        </div>

        <!-- User Data Emitter Section -->
        <div class="output-section">
          <h4>Send User Data</h4>
          <div class="user-form">
            <input type="text" 
                   [(ngModel)]="newUserData.name" 
                   placeholder="Enter name">
            <input type="email" 
                   [(ngModel)]="newUserData.email" 
                   placeholder="Enter email">
            <select [(ngModel)]="newUserData.role">
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
            </select>
            <button (click)="sendUserData()" 
                    [disabled]="!isUserDataValid()">
              Send User Data
            </button>
          </div>
        </div>

        <!-- Notification Emitter Section -->
        <div class="output-section">
          <h4>Send Notifications</h4>
          <div class="notification-controls">
            <select [(ngModel)]="notificationType">
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="info">Info</option>
            </select>
            <input type="text" 
                   [(ngModel)]="notificationMessage" 
                   placeholder="Notification message...">
            <button (click)="sendNotification()" 
                    [disabled]="!notificationMessage.trim()">
              Send Notification
            </button>
          </div>
          <div class="notification-presets">
            <button (click)="sendPresetNotification('success', 'Data saved successfully!')" 
                    class="preset-success">Success</button>
            <button (click)="sendPresetNotification('warning', 'This is a warning message')" 
                    class="preset-warning">Warning</button>
            <button (click)="sendPresetNotification('error', 'An error occurred!')" 
                    class="preset-error">Error</button>
            <button (click)="sendPresetNotification('info', 'Information updated')" 
                    class="preset-info">Info</button>
          </div>
        </div>

        <!-- Counter Emitter Section -->
        <div class="output-section">
          <h4>Counter Control</h4>
          <div class="counter-controls">
            <button (click)="decrementCounter()" [disabled]="counter <= 0">-</button>
            <span class="counter-display">{{ counter }}</span>
            <button (click)="incrementCounter()" [disabled]="counter >= 100">+</button>
            <input type="range" 
                   [(ngModel)]="counter" 
                   min="0" 
                   max="100" 
                   (input)="onCounterChange()">
            <button (click)="resetCounter()">Reset</button>
          </div>
        </div>

      </div>

      <div class="output-info">
        <h4>@Output() Properties Defined:</h4>
        <ul>
          <li><code>@Output() messageEmitted = new EventEmitter&lt;string&gt;()</code></li>
          <li><code>@Output() userDataEmitted = new EventEmitter&lt;UserData&gt;()</code></li>
          <li><code>@Output() notificationEmitted = new EventEmitter&lt;NotificationData&gt;()</code></li>
          <li><code>@Output() counterChanged = new EventEmitter&lt;number&gt;()</code></li>
        </ul>
      </div>

      <div class="emission-log">
        <h4>Recent Emissions:</h4>
        <div class="log-container">
          <div *ngFor="let log of emissionLog; trackBy: trackLog" 
               class="log-item"
               [class]="'log-' + log.type">
            <span class="log-time">{{ log.timestamp | date:'medium' }}</span>
            <span class="log-type">{{ log.type }}</span>
            <span class="log-data">{{ log.data }}</span>
          </div>
          <div *ngIf="emissionLog.length === 0" class="no-logs">
            No emissions yet
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .output-child {
      padding: 20px;
      border: 2px solid #ffc107;
      border-radius: 8px;
      margin: 15px 0;
      background-color: #fffdf5;
    }
    
    .output-sections {
      display: grid;
      gap: 20px;
      margin: 20px 0;
    }
    
    .output-section {
      background-color: white;
      padding: 15px;
      border-radius: 5px;
      border: 1px solid #dee2e6;
      border-left: 4px solid #ffc107;
    }
    
    .output-section h4 {
      margin: 0 0 15px 0;
      color: #856404;
    }
    
    .control-group, .user-form, .notification-controls, .counter-controls {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
    }
    
    input, select {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 3px;
      font-size: 14px;
    }
    
    input[type="text"], input[type="email"] {
      flex: 1;
      min-width: 150px;
    }
    
    input[type="range"] {
      flex: 1;
      min-width: 100px;
    }
    
    button {
      padding: 8px 15px;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s ease;
    }
    
    button:not(:disabled) {
      background-color: #ffc107;
      color: #212529;
    }
    
    button:not(:disabled):hover {
      background-color: #e0a800;
    }
    
    button:disabled {
      background-color: #e9ecef;
      color: #6c757d;
      cursor: not-allowed;
    }
    
    .quick-messages, .notification-presets {
      margin-top: 10px;
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
    }
    
    .quick-btn {
      font-size: 12px;
      padding: 5px 10px;
      background-color: #17a2b8;
      color: white;
    }
    
    .quick-btn:hover {
      background-color: #138496;
    }
    
    .preset-success { background-color: #28a745; color: white; }
    .preset-success:hover { background-color: #218838; }
    
    .preset-warning { background-color: #ffc107; color: #212529; }
    .preset-warning:hover { background-color: #e0a800; }
    
    .preset-error { background-color: #dc3545; color: white; }
    .preset-error:hover { background-color: #c82333; }
    
    .preset-info { background-color: #007bff; color: white; }
    .preset-info:hover { background-color: #0069d9; }
    
    .counter-display {
      font-size: 1.5em;
      font-weight: bold;
      color: #ffc107;
      min-width: 40px;
      text-align: center;
    }
    
    .output-info {
      background-color: #e7f3ff;
      padding: 15px;
      border-radius: 5px;
      border: 1px solid #b8daff;
      margin: 20px 0;
    }
    
    .output-info ul {
      margin: 10px 0;
      padding-left: 20px;
    }
    
    .output-info li {
      margin: 5px 0;
    }
    
    code {
      background-color: #f8f9fa;
      padding: 2px 4px;
      border-radius: 3px;
      border: 1px solid #e9ecef;
      font-family: 'Courier New', monospace;
      font-size: 0.9em;
    }
    
    .emission-log {
      background-color: #f8f9fa;
      padding: 15px;
      border-radius: 5px;
      border: 1px solid #dee2e6;
      margin-top: 20px;
    }
    
    .log-container {
      max-height: 200px;
      overflow-y: auto;
      border: 1px solid #dee2e6;
      border-radius: 3px;
      padding: 10px;
      background-color: white;
    }
    
    .log-item {
      padding: 8px;
      margin: 5px 0;
      border-radius: 3px;
      display: flex;
      gap: 10px;
      font-size: 0.9em;
    }
    
    .log-message { background-color: #d7edff; }
    .log-userData { background-color: #d4edda; }
    .log-notification { background-color: #fff3cd; }
    .log-counter { background-color: #f8d7da; }
    
    .log-time {
      color: #6c757d;
      font-size: 0.8em;
      min-width: 120px;
    }
    
    .log-type {
      font-weight: bold;
      min-width: 80px;
      text-transform: capitalize;
    }
    
    .log-data {
      color: #495057;
    }
    
    .no-logs {
      text-align: center;
      color: #6c757d;
      font-style: italic;
      padding: 20px;
    }
  `]
})
export class OutputChildComponent {
  // Output EventEmitters
  @Output() messageEmitted = new EventEmitter<string>();
  @Output() userDataEmitted = new EventEmitter<UserData>();
  @Output() notificationEmitted = new EventEmitter<NotificationData>();
  @Output() counterChanged = new EventEmitter<number>();

  // Component properties
  currentMessage: string = '';
  counter: number = 0;
  notificationType: 'success' | 'warning' | 'error' | 'info' = 'info';
  notificationMessage: string = '';
  
  newUserData: UserData = {
    name: '',
    email: '',
    role: 'user'
  };

  quickMessages: string[] = [
    'Hello!',
    'Good morning!',
    'How are you?',
    'Thank you!',
    'Goodbye!'
  ];

  emissionLog: Array<{
    type: string;
    data: string;
    timestamp: Date;
  }> = [];

  sendMessage() {
    if (this.currentMessage.trim()) {
      this.messageEmitted.emit(this.currentMessage.trim());
      this.addToLog('message', this.currentMessage.trim());
      this.currentMessage = '';
    }
  }

  sendQuickMessage(message: string) {
    this.messageEmitted.emit(message);
    this.addToLog('message', message);
  }

  sendUserData() {
    if (this.isUserDataValid()) {
      const userData = { ...this.newUserData };
      this.userDataEmitted.emit(userData);
      this.addToLog('userData', `${userData.name} (${userData.email}) - ${userData.role}`);
      this.resetUserForm();
    }
  }

  sendNotification() {
    if (this.notificationMessage.trim()) {
      const notification: NotificationData = {
        type: this.notificationType,
        message: this.notificationMessage.trim(),
        timestamp: new Date()
      };
      this.notificationEmitted.emit(notification);
      this.addToLog('notification', `${notification.type}: ${notification.message}`);
      this.notificationMessage = '';
    }
  }

  sendPresetNotification(type: NotificationData['type'], message: string) {
    const notification: NotificationData = {
      type,
      message,
      timestamp: new Date()
    };
    this.notificationEmitted.emit(notification);
    this.addToLog('notification', `${notification.type}: ${notification.message}`);
  }

  incrementCounter() {
    if (this.counter < 100) {
      this.counter++;
      this.onCounterChange();
    }
  }

  decrementCounter() {
    if (this.counter > 0) {
      this.counter--;
      this.onCounterChange();
    }
  }

  onCounterChange() {
    this.counterChanged.emit(this.counter);
    this.addToLog('counter', this.counter.toString());
  }

  resetCounter() {
    this.counter = 0;
    this.onCounterChange();
  }

  isUserDataValid(): boolean {
    return !!(this.newUserData.name.trim() && 
              this.newUserData.email.trim() && 
              this.newUserData.role);
  }

  resetUserForm() {
    this.newUserData = {
      name: '',
      email: '',
      role: 'user'
    };
  }

  addToLog(type: string, data: string) {
    this.emissionLog.unshift({
      type,
      data,
      timestamp: new Date()
    });
    
    // Keep only the last 10 entries
    if (this.emissionLog.length > 10) {
      this.emissionLog = this.emissionLog.slice(0, 10);
    }
  }

  trackLog(index: number, item: any): string {
    return item.timestamp.getTime() + item.type + item.data;
  }
}
