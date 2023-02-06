import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: string;
  title: string | undefined;
  price: string | undefined;
  desc: string | undefined;
  amount?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  data: Product[] = [];

  cart: Product[] = [];
  private cartItemCount = new BehaviorSubject(0);
  total: string | undefined;

  constructor() {}

  getProducts() {
    return this.data;
  }

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product: Product) {
    let added = false;
    for (const item of this.cart) {
      if (item.id === product.id) {
        // item.amount += 1;

        added = true;
        break;
      }
    }
    if (!added) {
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
    this.getCartItemCount();
  }

  removeProduct(product: Product) {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
      }
    }
  }

  cartTotalAmount() {}

  clearCart() {
    this.cart.length = 0;
  }
}
