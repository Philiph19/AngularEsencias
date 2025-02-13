import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', component: IndexComponent }, // Ruta principal
  { path: 'login', component: LoginComponent } //Ruta para el Login
];
