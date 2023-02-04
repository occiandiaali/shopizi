import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page {
  qrsrc = '';
  title = '';
  desc = '';
  price = '';

  constructor(private toastCtrl: ToastController) {}

  // Helper functions
  async showQrToast() {
    const toast = await this.toastCtrl.create({
      //  message: `A weblink has been detected.\nOpen ${this.scanResult}?`,
      message: `An error has occurred. Pls, exit and try again..`,
      position: 'bottom',
      buttons: [
        // {
        //   text: 'Open',
        //   side: 'start',
        //   handler: () => {
        //     window.open(this.scanResult, '_system', 'location=yes');
        //   },
        // },
        {
          text: 'Exit',
          role: 'cancel',
          side: 'start',
          handler: () => {
            toast.dismiss();
          },
        },
      ],
    });
    toast.present();
  }

  clearFields() {
    this.title = '';
    this.desc = '';
    this.price = '';
  }

  generateQR() {
    // this.showQrToast();
    const qrinfo = `
    Title: ${this.title}
    Description: ${this.desc} 
    Price: ${this.price}
    `;

    this.qrsrc = `http://api.qrserver.com/v1/create-qr-code/?data=${qrinfo}`;
    this.clearFields();

    console.log('info: ', qrinfo);
  }

  reset() {
    this.qrsrc = '';
    this.showQrToast();
  }
}
