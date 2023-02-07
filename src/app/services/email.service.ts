import { Injectable } from '@angular/core';

import { CartService } from './cart.service';

import emailjs from 'emailjs-com';

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  // templateParams = {
  //   from_name: 'Shopizi',
  //   to_name: 'ValueXchange',
  //   message: `Top of the day to you! You have a new payment of ${this.amount}`,
  // };

  constructor(private cartService: CartService) {}

  sendEmail(amt: any) {
    emailjs.init('sERMOLldw5nXr7nRT');
    emailjs
      .send('service_ymntzvg', 'template_ex8yys5', {
        from_name: 'Shopizi',
        to_name: 'ValueXchange',
        message: `Top of the day to you! You have a new payment of ${amt}`,
      })
      .then((response) =>
        console.log(`Transfer of.. ${amt}`, response.status, response.text)
      )
      .catch((e) => console.log('Fail.. ', e));
  }
}
