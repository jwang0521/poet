import { Routes } from '@angular/router';
import { PoemsComponent } from './components/poems/poems.component';

export const routes: Routes = [
  { path: '', redirectTo: 'poems', pathMatch: 'full' },
  { path: 'poems', component: PoemsComponent },
];
