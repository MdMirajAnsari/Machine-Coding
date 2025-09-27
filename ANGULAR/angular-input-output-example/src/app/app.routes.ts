import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/input-example',
    pathMatch: 'full'
  },
  {
    path: 'input-example',
    loadComponent: () => import('./input-example/input-parent.component').then(m => m.InputParentComponent)
  },
  {
    path: 'output-example',
    loadComponent: () => import('./output-example/output-parent.component').then(m => m.OutputParentComponent)
  },
  {
    path: '**',
    redirectTo: '/input-example'
  }
];
