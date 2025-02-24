import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({ 
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit, OnDestroy {

  
  private darkModeMediaQuery: MediaQueryList;

  constructor(private router: Router, private renderer: Renderer2) {
    this.darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  }

  ngOnInit() {
    this.applyTheme(); // Aplicar el tema inicial según el sistema
    this.darkModeMediaQuery.addEventListener("change", this.applyTheme.bind(this)); // Detectar cambios
    this.mostrarAlertas();
  }

  ngOnDestroy() {
    this.darkModeMediaQuery.removeEventListener("change", this.applyTheme.bind(this));
  }

  /**
   * Aplica el modo oscuro o claro según la preferencia del sistema en tiempo real.
   */
  applyTheme() {
    if (this.darkModeMediaQuery.matches) {
      this.renderer.addClass(document.body, 'dark');
      this.renderer.removeClass(document.body, 'light');
    } else {
      this.renderer.addClass(document.body, 'light');
      this.renderer.removeClass(document.body, 'dark');
    }
  }

  async mostrarAlertas() {
    const { value: esMayorEdad } = await Swal.fire({
      title: '¿Eres mayor de edad?',
      icon: 'question',
      input: 'radio',
      background: 'rgba(0, 0, 0, 0.2)',
      color: 'black',
      customClass: { popup: 'swal-blur' },
      inputOptions: { yes: 'Sí', no: 'No', },
      inputValidator: async (value) => {
        if (!value) return 'Por favor selecciona una opción.';
        return undefined; 
      },
      showCancelButton: false,
      confirmButtonColor: '#ff7f32',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });

    if (esMayorEdad === "yes") { 
      const { value: ciudadSeleccionada } = await Swal.fire({
        title: '¡Bienvenid@s a Esencias del Valle!',
        text: '¡¡Primero selecciona donde te encuentras por favor!!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ff7f32', //Color del boton
        confirmButtonText: 'Confirmar', //Nombre del boton
        allowOutsideClick: false, // Evita cerrar al hacer clic fuera
        footer: '<span class="rojo">¡Información importante!</span>',
        width: '70%',
        padding: '1rem', 
        backdrop: true,
        timer: 50000,
        timerProgressBar: true,
        position: 'center', // Tipos: top-end, bottom-end, top, bottom, center
        allowEscapeKey: false, // Impide que cierre con tecla ESC
        input: 'select',
        inputPlaceholder: 'Ciudades',
        inputValue: '',
        background: 'rgba(0, 0, 0, 0.2)', // Fondo transparente
        customClass: {
          popup: 'swal-blur', // Fondo de la alerta con desenfoque
          input: 'swal2-select', // Aplica la clase al select
          validationMessage: 'swal-validation-message' // Estilo para el mensaje de error

      },
        inputOptions: { "Pereira": "Pereira", "Cartago": "Cartago", "Dosquebradas": "Dosquebradas" },
        
        showConfirmButton: true,
        buttonsStyling: true,
        showCloseButton: true,
        closeButtonAriaLabel: 'Cerrar Alerta',
        color: 'white',  // Color de texto

        // Verificación dentro de preConfirm para evitar que se cierre si no se selecciona nada
        preConfirm: () => {
          const ciudad = Swal.getPopup()?.querySelector('select')?.value;
          if (!ciudad) {
            Swal.showValidationMessage('Por favor, selecciona una ciudad.');
            return false;
          }
          return ciudad;
        }
      });

      if (ciudadSeleccionada) {
        await Swal.fire({
          confirmButtonText: 'Continuar',
          confirmButtonColor: '#ff7f32',
          title: `Seleccionaste ${ciudadSeleccionada}`,
          background: 'rgba(0, 0, 0, 0.2)',
          color: 'white',
          icon: 'success',
          customClass: { popup: 'swal-blur' }
        });
      }
    } else if (esMayorEdad === "no") {
      await Swal.fire({
        title: 'Debes ser mayor de edad',
        icon: 'error',
        confirmButtonColor: '#ff7f32',
        footer: 'Esta página contiene restricción de edad',
        background: 'rgba(0, 0, 0, 0.2)',
        color: 'white',
        customClass: { popup: 'swal-blur' }
      });

      this.router.navigate(['/']);
    }
  }
}

