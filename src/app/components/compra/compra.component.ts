import { Component, OnInit } from '@angular/core'; 
import { CartService } from '../../services/cart.service'; 
import Swal from 'sweetalert2';
import { Router } from '@angular/router'; // Importa Router
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

interface PaymentMethod {
  name: string;
  value: string;
}

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [FormsModule, NgFor],
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})

export class CompraComponent implements OnInit {

  cart: any[] = []; //  Ahora inicializa vacío
  total = 0;
  paymentMethods: PaymentMethod[] = [
    { name: 'PSE', value: 'pse' },
    { name: 'Tarjeta de Crédito/Débito', value: 'tarjeta' }
  ];
  selectedPayment: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart(); // Ahora se inicializa
    this.calculateTotal();
  }

  calculateTotal(): void {
    this.total = this.cart.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  }

  removeFromCart(productId: string): void {
    Swal.fire({
      title: '¿Eliminar producto?',
      text: 'Este producto será eliminado del carrito.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.cartService.removeFromCart(productId);
        this.cart = this.cartService.getCart();
        this.calculateTotal();
        Swal.fire('Eliminado', 'El producto ha sido eliminado.', 'success');
      }
    });
  }

  updateQuantity(productId: string, quantity: number): void {
    const product = this.cart.find(item => item.id === productId);
    if (!product) return;

    if (quantity <= 0) {
      Swal.fire('Error', 'La cantidad debe ser mayor a 0.', 'error');
      return;
    }

    if (quantity > product.stock) {
      Swal.fire('Stock insuficiente', `Solo hay ${product.stock} unidades disponibles.`, 'warning');
      return;
    }

    product.quantity = quantity;
    this.calculateTotal();
  }

  proceedToPayment(): void {
    if (!this.selectedPayment) {
      Swal.fire({
        icon: 'warning',
        title: 'Método de pago requerido',
        text: 'Selecciona un método de pago antes de continuar.',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Compra realizada',
      text: `Pago procesado con ${this.selectedPayment.toUpperCase()}.`,
      confirmButtonText: 'Aceptar'
    }).then(() => {
      this.cartService.emptyCart();
      this.cart = [];
      this.total = 0;
    });
  }
  goBack(): void {
    this.router.navigate(['/']); // ✅ Redirige al index u otra ruta
  }
}

