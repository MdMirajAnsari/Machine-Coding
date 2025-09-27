import { Component } from '@angular/core';
import { ParentComponent } from './parent/parent';

@Component({
  selector: 'app-root',
  imports: [ParentComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'ANGULAR-ParentToChild';
}
