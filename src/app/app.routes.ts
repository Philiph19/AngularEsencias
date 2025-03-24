import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { FormComponent } from './components/form/form.component';
import { AdminComponent } from './components/admin/admin.component';
import { HistorialVentasComponent } from './components/historial-ventas/historial-ventas.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { FormProductosComponent } from './components/form-productos/form-productos.component';
import { CompraComponent } from './components/compra/compra.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { FormapsComponent } from './components/formaps/formaps.component';

export const routes: Routes = [
  { path: '', component: IndexComponent }, // Ruta principal
  { path: 'login', component: LoginComponent }, //Ruta para el Login
  { path: 'form', component: FormComponent}, //Ruta para el formulario
  { path: 'admin', component: AdminComponent}, //Ruta para el Adminitrador
  { path: 'historial-ventas', component: HistorialVentasComponent }, // Ruta Historial de Ventas
  { path: 'inventario', component: InventarioComponent}, // Ruta del Inventario de productos
  { path: 'form-productos', component: FormProductosComponent}, // Ruta del Formulario de productos
  { path: 'compra', component: CompraComponent}, //Ruta de Carrito de Compras
  { path: 'mapa', component: MapaComponent}, //Ruta del Mapa de clientes
  { path: 'formaps', component: FormapsComponent} //Ruta Formulario Mapa
];
 
