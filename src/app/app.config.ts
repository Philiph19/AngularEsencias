import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';  

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), // Permite el enrutamiento
    provideHttpClient(),
    { provide: LOCALE_ID, useValue: 'es-CO' }, // Configurar el idioma para los pipes
    provideClientHydration(withEventReplay()),
  ]
};

