import { Component } from '@angular/core';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inventario',
  standalone: true,
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
  imports: [NgFor, NgClass, NgIf, CommonModule, FormsModule] // Asegura que FormsModule esté aquí
})
export class InventarioComponent {
  inventario = [
    { id: 1, nombre: 'Whisky Johnnie Walker', categoria: 'Whisky', cantidad: 2, precio: 350000, estado: 'Disponible' },
    { id: 2, nombre: 'Cerveza Poker Premium', categoria: 'Cerveza', cantidad: 7, precio: 56000, estado: 'En espera' }
  ];

  producto = { id: 0, nombre: '', categoria: '', cantidad: 0, precio: 0, estado: 'Disponible' };
  esEdicion = false;

  abrirModal() {
    this.producto = { id: 0, nombre: '', categoria: '', cantidad: 0, precio: 0, estado: 'Disponible' };
    this.esEdicion = false;
  }

  editarProducto(prod: any) {
    this.producto = { ...prod };
    this.esEdicion = true;
  }

  guardarProducto() {
    if (this.esEdicion) {
      const index = this.inventario.findIndex(p => p.id === this.producto.id);
      if (index !== -1) this.inventario[index] = { ...this.producto };
    } else {
      this.producto.id = this.inventario.length + 1;
      this.inventario.push({ ...this.producto });
    }
    this.abrirModal(); // Reset modal
  }

  eliminarProducto(id: number) {
    this.inventario = this.inventario.filter(p => p.id !== id);
  }
}


