import { Component } from '@angular/core'; 
import { NgIf } from '@angular/common'; 
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [RouterLink, NgIf, FormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  encapsulation: ViewEncapsulation.None, // Esto permite que el CSS afecte el <body>
}) 
export class FormComponent {
  formData = {
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    confirmPassword: '',
    fechaNacimiento: ''
  };

  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  // Alternar visibilidad de contraseña
  togglePassword(fieldId: string, field: 'password' | 'confirmPassword'): void {
    const input = document.getElementById(fieldId) as HTMLInputElement;
    
    if (input) {
      if (field === 'password') {
        this.showPassword = !this.showPassword;
        input.type = this.showPassword ? 'text' : 'password';
      } else {
        this.showConfirmPassword = !this.showConfirmPassword;
        input.type = this.showConfirmPassword ? 'text' : 'password';
      }
    }
  }

  submitForm(event: Event): void {
    event.preventDefault();
    
    // Validación básica de contraseñas
    if (this.formData.password !== this.formData.confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    //console.log('Formulario enviado:', this.formData);
    //alert("Registro exitoso!");
  }
}

