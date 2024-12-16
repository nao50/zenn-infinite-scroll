import { Routes } from '@angular/router';
import { TimelineComponent } from './timeline/timeline.component';
import { DetailComponent } from './detail/detail.component';

export const routes: Routes = [
  {
    path: '',
    component: TimelineComponent
  },
  {
    path: 'detail/:id',
    loadComponent: () => import('./detail/detail.component').then((m) => m.DetailComponent),
  },
];
