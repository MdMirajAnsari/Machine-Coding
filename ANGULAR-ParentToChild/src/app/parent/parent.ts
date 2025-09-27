import { Component } from '@angular/core';
import { ChildComponent } from '../child/child';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-parent',
  imports: [ChildComponent, FormsModule],
  templateUrl: './parent.html',
  styleUrl: './parent.css'
})
export class ParentComponent {
  data: string = '';
  show: string = '';

  sendData(): void {
    this.data = this.show;
  }

  loadData(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.show = target.value;
  }
}
