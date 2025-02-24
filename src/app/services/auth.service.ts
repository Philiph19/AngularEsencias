import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private googleClientId = 'CLIENT_ID_DE_GOOGLE';
  private facebookAppId = 'APP_ID_DE_FACEBOOK';

  constructor() {}

  // Iniciar sesión con Google
  initGoogleAuth(callback: (response: any) => void) {
    (window as any).google.accounts.id.initialize({
      client_id: this.googleClientId,
      callback: callback,
    });

    (window as any).google.accounts.id.renderButton(
      document.querySelector('.btn-google'),
      { theme: 'outline', size: 'large' }
    );
  }

  // Iniciar sesión con Facebook
  initFacebookAuth() {
    (window as any).fbAsyncInit = () => {
      (window as any).FB.init({
        appId: this.facebookAppId,
        cookie: true,
        xfbml: true,
        version: 'v14.0',
      });
    };
  }

  loginWithFacebook() {
    (window as any).FB.login((response: any) => {
      if (response.status === 'connected') {
        console.log('Token de Facebook:', response.authResponse.accessToken);
      }
    }, { scope: 'public_profile,email' });
  }
}
