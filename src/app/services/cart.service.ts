import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: string;
  title: string | undefined;
  price: number;
  description: string | undefined;
  amount: number;
}
@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: any[] = [];
  private cartItemCount = new BehaviorSubject(0);

  constructor() {}

  getCart() {
    return this.cart;
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addProduct(product: Product) {
    let added = false;
    for (let p of this.cart) {
      if (p.id === product.id) {
        p.amount += 1;
        added = true;
        break;
      }
    }
    if (!added) {
      //  product.amount = 1;
      this.cart.push(product);
    }
    this.cartItemCount.next(this.cartItemCount.value + 1);
    this.getCartItemCount();
  }

  // increaseProduct(product: Product) {
  //   for (let [index, p] of this.cart.entries()) {
  //     if (p.id === product.id) {
  //       p.amount += 1;
  //       if (p.amount == 0) {
  //         this.cart.splice(index, 0, 1);
  //       }
  //     }
  //   }
  //   this.cartItemCount.next(this.cartItemCount.value - 1);
  // }

  decreaseProduct(product: Product) {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        p.amount -= 1;
        if (p.amount === 0) {
          this.cart.splice(index, 1);
        }
      }
    }
    this.cartItemCount.next(this.cartItemCount.value - 1);
  }

  removeProduct(product: Product) {
    for (const [index, p] of this.cart.entries()) {
      if (p.id === product.id) {
        this.cartItemCount.next(this.cartItemCount.value - p.amount);
        this.cart.splice(index, 1);
      }
    }
  }

  getTotal() {
    return this.cart.reduce((i, j) => i + j.price * j.amount, 0);
  }

  clearCart() {
    this.cart.length = 0;
  }
}
