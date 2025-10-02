import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  templateUrl: './child.component.html'
})
export class ChildComponent {
  @Output() submitData = new EventEmitter<string>();

  send(value: string) {
    this.submitData.emit(value || 'Hello from child!');
  }
}
