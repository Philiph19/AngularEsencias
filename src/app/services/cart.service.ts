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
  public cart: Product[] = [];
  public cartMap: { [key: string]: number } = {}; 
  public cartItemCount = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCount.asObservable(); 

  private cartItems = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItems.asObservable();

  private cartTotal = new BehaviorSubject<number>(0);
  cartTotal$ = this.cartTotal.asObservable();

  constructor() {
    this.loadCart();
  }

  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
    localStorage.setItem('cartMap', JSON.stringify(this.cartMap));
    this.updateCart();
  }

  private loadCart(): void {
    const storedCart = localStorage.getItem('cart');
    const storedCartMap = localStorage.getItem('cartMap');

    this.cart = storedCart ? JSON.parse(storedCart) : [];
    this.cartMap = storedCartMap ? JSON.parse(storedCartMap) : {};
    
    this.updateCart();
  }

  addToCart(product: Product): void {  
    if (this.cartMap[product.id]) {
      this.cartMap[product.id]++; 
    } else {
      this.cartMap[product.id] = 1;
      this.cart.push(product);
    }
    this.saveCart();
  }

  removeFromCart(productId: string): void {
    if (this.cartMap[productId]) {
      this.cartMap[productId]--; 
      if (this.cartMap[productId] === 0) {
        delete this.cartMap[productId];
        this.cart = this.cart.filter(item => item.id !== productId);
      }
    }
    this.saveCart();
  }

  getCart(): Product[] {
    return this.cart;
  }

  getGroupedCart() {
    return this.cart.map(product => ({
      ...product,
      quantity: this.cartMap[product.id] || 0
    }));
  }

  private updateCart(): void {
    this.cartItems.next(this.cart);
    this.cartTotal.next(this.calculateTotal());
    this.updateCartCount();
  }

  private updateCartCount(): void {
    const totalUniqueItems = Object.keys(this.cartMap).length; // Corrige el contador
    this.cartItemCount.next(totalUniqueItems);
  }

  private calculateTotal(): number {
    return this.cart.reduce((total, item) => total + (item.price * (this.cartMap[item.id] || 1)), 0);
  }

  emptyCart(): void {
    this.cart = [];
    this.cartMap = {};
    localStorage.removeItem('cart');
    localStorage.removeItem('cartMap');
    this.updateCart();
  }
}
