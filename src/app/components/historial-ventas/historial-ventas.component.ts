import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

@Component({ 
  selector: 'app-historial-ventas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-ventas.component.html',
  styleUrls: ['./historial-ventas.component.css']
})
export class HistorialVentasComponent implements AfterViewInit {
  
  // Datos de ejemplo
  ventas = [
    { fecha: '2025-01-15', producto: 'Vodka', cantidad: 1, precio: 45000, total: 45000 },
    { fecha: '2025-01-31', producto: 'Cerveza Light', cantidad: 15, precio: 2500, total: 37500 },
    { fecha: '2025-02-15', producto: 'Cerveza Premium', cantidad: 7, precio: 8000, total: 56000 }
  ];

  ngAfterViewInit() {
    this.crearGrafica();
  }

  crearGrafica() {
    const ctx = document.getElementById('ventasChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.ventas.map(v => v.fecha),
        datasets: [{
          label: 'Ventas (COP)',
          data: this.ventas.map(v => v.total),
          backgroundColor: 'rgba(0, 123, 255, 0.5)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: { enabled: true }
        }
      }
    });
  }
}

