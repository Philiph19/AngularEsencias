import { Component, OnInit, Renderer2, OnDestroy } from '@angular/core'; 
import Swal from 'sweetalert2'; 
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';  // Importar CartService
import { Observable } from 'rxjs'; 
import { map } from 'rxjs/operators';

@Component({ 
  selector: 'app-index',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit, OnDestroy {
  private darkModeMediaQuery: MediaQueryList;
  
  cartItemCount$: Observable<number>;  // Contador de productos únicos en el carrito
  cartItemsGrouped$: Observable<any[]>;  // Productos agrupados con cantidad
  cartTotal$: Observable<number>;  // Total del carrito
  cartModalVisible = false; // Para controlar la visibilidad del modal 

  productos = [
    { id: '1', name: 'Cerveza Poker', price: 7500, imageUrl: 'img/poker330.png' },
    { id: '2', name: 'Ron', price: 34000, imageUrl: 'img/poker750.png' },
    { id: '3', name: 'Aguardiente', price: 25000, imageUrl: 'img/poker330.png' }
  ]; 

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private cartService: CartService  // Inyectar CartService
  ) {
    this.darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    // Observables para manejar el carrito
    this.cartItemCount$ = this.cartService.cartItems$.pipe(
      map(items => {
        const uniqueProducts = new Set(items.map(item => item.id));
        return uniqueProducts.size;
      }) 
    );

    this.cartTotal$ = this.cartService.cartTotal$;

    this.cartItemsGrouped$ = this.cartService.cartItems$.pipe(
      map(items => {
        const grouped: { [key: string]: any } = {};
    
        items.forEach(item => {
          if (grouped[item.id]) {
            grouped[item.id].quantity += 1;
          } else {
            grouped[item.id] = { ...item, quantity: 1 };
          }
        });
    
        return Object.values(grouped); // Convertir el objeto en un array
      })
    );    
  }

  ngOnInit() {
    this.applyTheme();
    this.darkModeMediaQuery.addEventListener("change", this.applyTheme.bind(this));
    this.verificarCiudad();
  }     
  
  ngOnDestroy() {
    this.darkModeMediaQuery.removeEventListener("change", this.applyTheme.bind(this));
  }

  applyTheme() {
    if (this.darkModeMediaQuery.matches) {
      this.renderer.addClass(document.body, 'dark');
      this.renderer.removeClass(document.body, 'light');
    } else {
      this.renderer.addClass(document.body, 'light');
      this.renderer.removeClass(document.body, 'dark');
    }
  }
  
  addToCart(producto: any) {    
    this.cartService.addToCart(producto);  // Agregar producto al carrito
  }  
 
  removeFromCart(productId: string) {
    this.cartService.removeFromCart(productId);
  }

  emptyCart() {
    this.cartService.emptyCart();
  }  

  toggleCartModal() {
    this.cartModalVisible = !this.cartModalVisible;
    const modal = document.getElementById('cart-modal');
    if (modal) {
      modal.style.display = this.cartModalVisible ? 'block' : 'none';
    }
  }

  showProductDetails(producto: any) {
    Swal.fire({
      title: producto.name,
      html: `
        <img src="${producto.imageUrl}" alt="${producto.name}" style="width: 100%; border-radius: 10px; margin-bottom: 10px;">
        <p><strong>Precio:</strong> $${producto.price}</p>
      `,
      confirmButtonText: 'Cerrar',
      confirmButtonColor: '#ff7f32',
      background: 'rgba(0, 0, 0, 0.2)',
      color: 'white',
      customClass: { popup: 'swal-blur' }
    });
  }  
  
  async verificarCiudad() {
    const ciudadGuardada = localStorage.getItem('ciudadSeleccionada');

    if (!ciudadGuardada) {
      await this.mostrarAlertas();
    } else {
      console.log(`Ciudad ya seleccionada: ${ciudadGuardada}`);
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
      inputOptions: { yes: 'Sí', no: 'No' },
      inputValidator: async (value) => {
        if (!value) return 'Por favor selecciona una opción.';
        return undefined; 
      },
      showCancelButton: false,
      confirmButtonColor: '#ff7f32',
      confirmButtonText: 'Confirmar',
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
        confirmButtonColor: '#ff7f32',
        confirmButtonText: 'Confirmar',
        allowOutsideClick: false,
        footer: '<span class="rojo">¡Información importante!</span>',
        width: '70%',
        padding: '1rem', 
        timer: 50000,
        timerProgressBar: true,
        position: 'center',
        allowEscapeKey: false,
        input: 'select',
        inputPlaceholder: 'Ciudades',
        background: 'rgba(0, 0, 0, 0.2)',
        color: 'white', 
        inputOptions: { "Pereira": "Pereira", "Cartago": "Cartago", "Dosquebradas": "Dosquebradas" },
        customClass: {
          popup: 'swal-blur',
          input: 'swal2-select',
          validationMessage: 'swal-validation-message'
        },
        preConfirm: () => {
          const ciudad = Swal.getPopup()?.querySelector('select')?.value;
          if (!ciudad) {
            Swal.showValidationMessage('<span class="swal-validation-message">Por favor, selecciona una ciudad.</span>');
            return false; 
          }
          return ciudad;
        }        
      });

      if (ciudadSeleccionada) {
        localStorage.setItem('ciudadSeleccionada', ciudadSeleccionada);

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

