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

  togglePassword(fieldId: string, toggleIconId: string): void {
    const input = document.getElementById(fieldId) as HTMLInputElement;
    const toggleIcon = document.getElementById(toggleIconId);
    
    if (input) {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';

      if (toggleIcon) {
        toggleIcon.classList.toggle('fa-eye-slash', !isPassword);
        toggleIcon.classList.toggle('fa-eye', isPassword);
      }
    }
  }

  submitForm(event: Event): void {
    event.preventDefault();
    console.log('Formulario enviado:', this.formData);
  }
}
