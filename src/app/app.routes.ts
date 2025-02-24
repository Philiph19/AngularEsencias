import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { FormComponent } from './components/form/form.component';
import { AdminComponent } from './components/admin/admin.component';
import { HistorialVentasComponent } from './components/historial-ventas/historial-ventas.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { FormProductosComponent } from './components/form-productos/form-productos.component';

export const routes: Routes = [
  { path: '', component: IndexComponent }, // Ruta principal
  { path: 'login', component: LoginComponent }, //Ruta para el Login
  { path: 'form', component: FormComponent}, //Ruta para el formulario
  { path: 'admin', component: AdminComponent}, //Ruta para el Adminitrador
  { path: 'historial-ventas', component: HistorialVentasComponent }, // Ruta Historial de Ventas
  { path: 'inventario', component: InventarioComponent}, // Ruta del Inventario de productos
  { path: 'form-productos', component: FormProductosComponent} // Ruta del Formulario de productos
];



