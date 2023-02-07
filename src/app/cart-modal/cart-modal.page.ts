import { EmailService } from './../services/email.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { CartService, Product } from '../services/cart.service';

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
  total = 0.0;

  cart: Product[] = [];

  constructor(
    private cartService: CartService,
    private emailService: EmailService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Transfer confirmed!',
      duration: 1500,
      position: 'middle',
    });
    await toast.present();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Confirming transfer and preparing receipt..',
      duration: 4000,
      spinner: 'bubbles',
    });
    this.emailService.sendEmail(this.total);
    loading.present();
    setTimeout(() => {
      this.cartService.clearCart();
      this.presentToast();
    }, 5000);
  }

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
    this.total = this.cartService.getTotal();
    // console.log('CartModal cart items: ', this.cartItems);
    // console.log('Title', this.paramTitle);
    // console.log('Price', this.paramPrice);
    // console.log('Desc', this.paramDesc);
  }

  decreaseCartItem(product: Product) {
    this.cartService.decreaseProduct(product);
    this.total = this.cartService.getTotal();
  }

  increaseCartItem(product: Product) {
    this.cartService.addProduct(product);
    this.total = this.cartService.getTotal();
  }

  removeCartItem(product: Product) {
    this.cartService.removeProduct(product);
    this.total = this.cartService.getTotal();
  }
}
