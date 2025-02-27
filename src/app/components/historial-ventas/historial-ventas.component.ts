import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { CommonModule } from '@angular/common';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables); // REGISTRAMOS CHART.JS

@Component({
  selector: 'app-historial-ventas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial-ventas.component.html',
  styleUrls: ['./historial-ventas.component.css']
})
export class HistorialVentasComponent implements AfterViewInit {
  private router = new Router(); 

  @ViewChild('ventasChart') ventasChart!: ElementRef; // REFERENCIA AL CANVAS
  chart: any; // Variable para la gráfica

  ventas = [
    { fecha: '2025-01-15', producto: 'Vodka', cantidad: 1, precio: 45000, total: 45000 },
    { fecha: '2025-01-31', producto: 'Cerveza Light', cantidad: 15, precio: 2500, total: 37500 },
    { fecha: '2025-02-15', producto: 'Cerveza Premium', cantidad: 7, precio: 8000, total: 56000 }
  ];

  ngAfterViewInit() {
    this.crearGrafica();
  }

  crearGrafica() {
    if (!this.ventasChart) return;

    const ctx = this.ventasChart.nativeElement.getContext('2d');

    this.chart = new Chart(ctx, {
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

  agregarVenta(fecha: string, producto: string, cantidad: number, precio: number) {
    const total = cantidad * precio;
    this.ventas.push({ fecha, producto, cantidad, precio, total });
    this.actualizarGrafica();
  }

  eliminarVenta(index: number) {
    this.ventas.splice(index, 1);
    this.actualizarGrafica();
  }

  actualizarGrafica() {
    if (this.chart) {
      this.chart.data.labels = this.ventas.map(v => v.fecha);
      this.chart.data.datasets[0].data = this.ventas.map(v => v.total);
      this.chart.update(); // ACTUALIZA LA GRÁFICA
    }
  }

  volver() {
    this.router.navigate(['/admin']);
  }
}

