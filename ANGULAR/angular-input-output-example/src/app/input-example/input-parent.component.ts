import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputChildComponent } from './input-child.component';

@Component({
  selector: 'app-input-parent',
  standalone: true,
  imports: [FormsModule, InputChildComponent],
  template: `
    <div class="input-example">
      <h2>Input Example - Parent Component</h2>
      <p>This demonstrates passing data FROM parent TO child using @Input()</p>

      <div class="parent-controls">
        <label>
          Enter message to send to child:
          <input type="text" [(ngModel)]="messageToChild" placeholder="Type a message...">
        </label>
        <br><br>
        <label>
          Select user type:
          <select [(ngModel)]="selectedUserType">
            <option value="admin">Admin</option>
            <option value="user">User</option>
            <option value="guest">Guest</option>
          </select>
        </label>
        <br><br>

      </div>

      <div class="child-container">
        <app-input-child
          [message]="messageToChild"
          [userType]="selectedUserType"
          [count]="count"
          [isActive]="isActive">
        </app-input-child>
      </div>

      <div class="parent-controls">
        <button (click)="toggleActive()">
          Toggle Child Active Status: {{ isActive ? 'Active' : 'Inactive' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .input-example {
      padding: 20px;
      border: 2px solid #007bff;
      border-radius: 8px;
      margin: 20px;
      background-color: #f8f9fa;
    }

    .parent-controls {
      margin: 15px 0;
      padding: 15px;
      background-color: white;
      border-radius: 5px;
      border: 1px solid #dee2e6;
    }

    .parent-controls label {
      display: block;
      margin: 10px 0;
      font-weight: bold;
    }

    .parent-controls input, .parent-controls select {
      margin-left: 10px;
      padding: 5px;
      border: 1px solid #ccc;
      border-radius: 3px;
    }

    .child-container {
      margin: 20px 0;
    }

    button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
    }

    button:hover {
      background-color: #0056b3;
    }
  `]
})
export class InputParentComponent {
  messageToChild: string = 'Hello from Parent!';
  selectedUserType: string = 'user';
  count: number = 5;
  isActive: boolean = true;

  toggleActive() {
    this.isActive = !this.isActive;
  }
}
