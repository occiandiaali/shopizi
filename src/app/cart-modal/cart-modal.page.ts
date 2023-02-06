import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-modal',
  templateUrl: './cart-modal.page.html',
  styleUrls: ['./cart-modal.page.scss'],
})
export class CartModalPage implements OnInit {
  paramTitle: string | undefined;
  paramPrice: string | undefined;
  paramDesc: string | undefined;

  cartItems: any[] | undefined;
  total: number | undefined;

  constructor(private cartSvc: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartSvc.getCart();
    if (this.cartItems.length < 1) {
      this.cartItems = [this.paramTitle, this.paramPrice, this.paramDesc];
    }
    // this.cartItems = [this.paramTitle, this.paramPrice, this.paramDesc];
    console.log('CartModal cart items: ', this.cartItems);
    console.log('Title', this.paramTitle);
    console.log('Price', this.paramPrice);
    console.log('Desc', this.paramDesc);
    // this.cartItems = [this.paramTitle, this.paramPrice, this.paramDesc];
  }
}
