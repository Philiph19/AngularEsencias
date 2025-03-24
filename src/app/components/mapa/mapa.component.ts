import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [RouterLink, NgIf, FormsModule],
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  map: any;
  private L: any;

  constructor(private router: Router) {}

  async ngOnInit() {
    const leaflet = await import('leaflet');
    this.L = leaflet;
    this.initMap();
  }

  initMap() {
    this.map = this.L.map('map').setView([4.6097, -74.0817], 6); // Bogotá como punto central

    this.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this.map);

    this.cargarUbicaciones();
  }

  cargarUbicaciones() {
    let ubicaciones = JSON.parse(localStorage.getItem('ubicaciones') || '[]');

    ubicaciones.forEach((usuario: any) => {
      const marker = this.L.marker([usuario.latitud, usuario.longitud]).addTo(this.map)
        .bindPopup(`<b>${usuario.nombre}</b><br>Email: ${usuario.email}<br>Teléfono: ${usuario.telefono}`)
        .openPopup();
    });
  }

  volver() {
    this.router.navigate(['/admin']);
  }
}

