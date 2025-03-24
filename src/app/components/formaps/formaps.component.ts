import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Agregamos Router
import { NgIf } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-formaps',
  standalone: true,
  imports: [RouterLink, NgIf, FormsModule],
  templateUrl: './formaps.component.html',
  styleUrls: ['./formaps.component.css']
})
export class FormapsComponent {
  nombre: string = '';
  email: string = '';
  telefono: string = '';
  latitud: number | null = null;
  longitud: number | null = null;

  constructor(private router: Router) {}

  obtenerUbicacion() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitud = position.coords.latitude;
        this.longitud = position.coords.longitude;
      }, (error) => {
        console.error('Error obteniendo ubicación:', error);
      });
    } else {
      console.error('Geolocalización no soportada en este navegador.');
    }
  }

  enviarFormulario() {
    if (this.latitud !== null && this.longitud !== null) {
      // Recuperar ubicaciones previas desde LocalStorage
      let ubicaciones = JSON.parse(localStorage.getItem('ubicaciones') || '[]');
  
      // Agregar nueva ubicación con los datos del usuario
      ubicaciones.push({
        nombre: this.nombre,
        email: this.email,
        telefono: this.telefono,
        latitud: this.latitud,
        longitud: this.longitud
      });
  
      // Guardar de nuevo en LocalStorage
      localStorage.setItem('ubicaciones', JSON.stringify(ubicaciones));
  
      // Redirigir al mapa
      this.router.navigate(['/mapa']);
    } else {
      alert('Debes obtener tu ubicación antes de enviar el formulario.');
    }
  }

  volver() {
    this.router.navigate(['/admin']); // Router para navegar y volver a Admin
  }
}
 