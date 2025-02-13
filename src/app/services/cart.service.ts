import { Injectable } from '@angular/core'; 

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  stock: number;
  quantity?: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];

  private productDetails: Record<string, Product> = {
    'producto 1': { name: 'Cerveza Poker', price: 7000, description: 'Descripción detallada del Producto 1', imageUrl: 'assets/img/poker330.png', stock: 5, id: 'producto 1' },
    'producto 2': { name: 'Cerveza Poker Mediana', price: 8000, description: 'Descripción detallada del Producto 2', imageUrl: 'assets/img/poker750.png', stock: 15, id: 'producto 2' },
    'producto 3': { name: 'Cerveza Poker Mini', price: 6500, description: 'Descripción detallada del Producto 3', imageUrl: 'assets/img/poker330.png', stock: 20, id: 'producto 3' },
    'producto 4': { name: 'Cerveza Poker Grande', price: 7000, description: 'Descripción detallada del Producto 4', imageUrl: 'assets/img/poker750.png', stock: 57, id: 'producto 4' },
  };

  getProductById(productId: string): Product | undefined {
    return this.productDetails[productId];
  }

  addToCart(productId: string, quantity: number = 1): void {
    const product = this.getProductById(productId);
    if (!product) {
      console.error('Producto no encontrado');
      return;
    }

    const existingProduct = this.cart.find(item => item.id === productId);
    if (existingProduct) {
      existingProduct.quantity! += quantity;
    } else {
      this.cart.push({ ...product, quantity });
    }
  }

  removeFromCart(productId: string): void {
    this.cart = this.cart.filter(item => item.id !== productId);
  }

  getCart(): Product[] {
    return this.cart;
  }

  emptyCart(): void {
    this.cart = [];
  }
}

