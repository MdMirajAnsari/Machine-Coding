import { Component, signal } from '@angular/core';
import { ChildComponent } from './child.component';

@Component({
  selector: 'app-root',
  imports: [ChildComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular-child-to-parent');
  messageFromChild = '';

  onChildSubmit(value: string) {
    this.messageFromChild = value;
  }
}
