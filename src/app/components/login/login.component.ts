import { Component, AfterViewInit } from '@angular/core'; 
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import { RouterLink } from '@angular/router';
import { ViewEncapsulation } from '@angular/core';

declare const google: any; // Para evitar errores con Google Auth
declare const FB: any; // Para evitar errores con Facebook Auth

@Component({ 
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, NgIf, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None, // Esto permite que el CSS afecte el <body>
})
export class LoginComponent implements AfterViewInit {
  email: string = '';
  password: string = '';
  showPassword: boolean = false;

  ngAfterViewInit() {
    this.initGoogleAuth();
    this.initFacebookAuth();
  }

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

//  GOOGLE AUTH
private initGoogleAuth() {
  if (typeof google === 'undefined' || !google.accounts) {
    console.error('El SDK de Google no se ha cargado correctamente.');
    return;
  }

  google.accounts.id.initialize({
    client_id: 'CLIENT_ID_DE_GOOGLE', // CLient ID real para iniciar sesion con Google
    callback: (response: any) => this.handleGoogleCredentialResponse(response),
  });

  const googleButton = document.querySelector('.btn-google');
  if (googleButton) {
    google.accounts.id.renderButton(googleButton, {
      theme: 'outline',
      size: 'large',
    });
  } else {
    console.error('Botón de Google no encontrado');
  }
}

//  Función para manejar la respuesta de Google
private handleGoogleCredentialResponse(response: any) {
  console.log('ID Token de Google:', response.credential);
  // Aquí puedes enviar el token a tu backend para validarlo
}

// FACEBOOK AUTH
private initFacebookAuth() {
  if (document.getElementById('facebook-jssdk')) {
    console.log('✅ Facebook SDK ya estaba cargado.');
    return; // Evita cargarlo más de una vez
  }

  (window as any).fbAsyncInit = () => {
    console.log('🚀 Inicializando Facebook SDK...');
    FB.init({
      appId: 'APP_ID_DE_FACEBOOK', // Reemplaza con tu ID real
      cookie: true,
      xfbml: true,
      version: 'v19.0' 
    });
    console.log('✅ Facebook SDK inicializado correctamente.');
  };

  const script = document.createElement('script');
  script.id = 'facebook-jssdk';
  script.src = 'https://connect.facebook.net/en_US/sdk.js';
  script.async = true;
  script.defer = true;
  
  script.onload = () => {
    console.log('✅ Facebook SDK cargado.');
  };

  document.body.appendChild(script);
}

onFacebookLogin() {
  console.log('🔄 Verificando si el SDK está listo...');

  if (typeof FB !== 'undefined' && FB !== null) {
    FB.getLoginStatus((response: any) => {
      if (response.status !== 'connected') {
        console.log('📌 Intentando iniciar sesión con Facebook...');
        FB.login((loginResponse: any) => {
          if (loginResponse.status === 'connected') {
            console.log('✅ Token de Facebook:', loginResponse.authResponse.accessToken);
          } else {
            console.log('❌ No se pudo autenticar con Facebook.');
          }
        }, { scope: 'public_profile,email' });
      } else {
        console.log('🔵 Ya estás autenticado en Facebook.');
      }
    });
  } else {
    console.error('⚠️ El SDK de Facebook no está cargado o `FB.init()` no se ha ejecutado.');
  }
}
 
}

