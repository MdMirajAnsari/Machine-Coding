import { Routes } from '@angular/router';
import { StoreDemoComponent } from './components/store-demo/store-demo.component';

export const routes: Routes = [
  { path: '', component: StoreDemoComponent },
  { path: '**', redirectTo: '' },
];
