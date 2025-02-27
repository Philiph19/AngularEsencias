import { Injectable } from '@angular/core'; 
import { BehaviorSubject } from 'rxjs';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];
  private cartItemCount = new BehaviorSubject<number>(0); // Contador reactivo
  cartItemCount$ = this.cartItemCount.asObservable(); // Exponer el observable

  private productDetails: Record<string, Product> = {
    'producto 1': { id: 'producto 1', name: 'Cerveza Poker', price: 7000, description: '...', imageUrl: 'assets/img/poker330.png' },
    'producto 2': { id: 'producto 2', name: 'Cerveza Poker Mediana', price: 8000, description: '...', imageUrl: 'assets/img/poker750.png' },
    'producto 3': { id: 'producto 3', name: 'Cerveza Poker Mini', price: 6500, description: '...', imageUrl: 'assets/img/poker330.png' },
    'producto 4': { id: 'producto 4', name: 'Cerveza Poker Grande', price: 7000, description: '...', imageUrl: 'assets/img/poker750.png' }
  };

  constructor() {
    this.loadCart();
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateCartCount();
  }

  private loadCart(): void {
    const storedCart = localStorage.getItem('cart');
    this.cart = storedCart ? JSON.parse(storedCart) : [];
    this.updateCartCount();
  }

  getProductById(productId: string): Product | undefined {
    return this.productDetails[productId];
  }

  addToCart(productId: string): void {
    const product = this.getProductById(productId);
    if (!product) return;

    if (!this.cart.some(item => item.id === productId)) {
      this.cart.push(product);
    }

    this.saveCart();
  }

  removeFromCart(productId: string): void {
    this.cart = this.cart.filter(item => item.id !== productId);
    this.saveCart();
  }

  getCart(): Product[] {
    return this.cart;
  }

  emptyCart(): void {
    this.cart = [];
    this.saveCart();
  }

  private updateCartCount(): void {
    this.cartItemCount.next(this.cart.length); // Actualiza el contador
  }
}

