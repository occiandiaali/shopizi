import { Injectable } from '@angular/core';

import { CartService } from './cart.service';
import { ToastController } from '@ionic/angular';

import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  responseStatus: number | undefined;

  constructor(
    private cartService: CartService,
    private toastCtrl: ToastController
  ) {}

  async presentToast(status: number) {
    this.responseStatus = status;
    const info =
      status === 200
        ? 'Transfer confirmed. Thanks for your payment.'
        : 'Failed confirmation! Please, click the FAILED button.';
    const toast = await this.toastCtrl.create({
      message: info,
      duration: 3000,
      position: 'middle',
    });
    await toast.present();
  }

  sendEmail(amt: any, transactionId: string, cartItems: any[]) {
    emailjs.init('sERMOLldw5nXr7nRT');
    emailjs
      .send('service_ymntzvg', 'template_ex8yys5', {
        from_name: 'Shopizi',
        to_name: 'Supermarket owner',
        message: `
        You have a new payment of ${new Intl.NumberFormat().format(amt)} naira!
        Transaction ID: ${transactionId}.
        Item(s):
        ${JSON.stringify(cartItems.map((item) => item.title))}
        `,
      })
      .then((response) => {
        setTimeout(() => {
          this.presentToast(response.status);
        }, 10000);
        console.log(`Transfer of.. ${amt}`, response.status, response.text);
      })
      .catch((e) => console.log('Fail.. ', e));
  }
}
