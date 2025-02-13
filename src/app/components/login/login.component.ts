import { Component } from '@angular/core'; 
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importar FormsModule

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [NgIf, FormsModule] // 👈 Agregar FormsModule aquí
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  onLogin(event: Event) {
    event.preventDefault();
    console.log('Correo:', this.email);
    console.log('Contraseña:', this.password);
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
    const passwordInput = document.getElementById('floatingPassword') as HTMLInputElement;
    const togglePasswordIcon = document.getElementById('togglePassword');

    if (passwordInput) {
      passwordInput.type = this.showPassword ? 'text' : 'password';
      if (togglePasswordIcon) {
        togglePasswordIcon.classList.toggle('fa-eye-slash', !this.showPassword);
        togglePasswordIcon.classList.toggle('fa-eye', this.showPassword);
      }
    }
  }
}
