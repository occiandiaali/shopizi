import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  LoadingController,
  ModalController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { CartModalPage } from '../cart-modal/cart-modal.page';
import { CartService, Product } from '../services/cart.service';

import { BehaviorSubject } from 'rxjs';
import jsQR from 'jsqr';
import guidd from 'src/utils/functions/guid';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page {
  @ViewChild('video', { static: false }) video: ElementRef | undefined;
  @ViewChild('canvas', { static: false }) canvas: ElementRef | undefined;
  // @ViewChild('fileinput', { static: false }) fileinput: ElementRef;

  modalData: any;
  cart: Product[] = [];
  cartItemCount: BehaviorSubject<number> | undefined;

  canvasElement: any;
  videoElement: any;
  canvasContext: any;
  scanActive = false;
  scanResult: string | URL | undefined;
  title: string | undefined;
  desc: string | undefined;
  price: string | undefined;
  cartItems: any[] | undefined;
  cartIsEmpty: boolean | undefined;
  numberOfItem = 1;
  cartTotal = 0.0;
  loading: HTMLIonLoadingElement | null | undefined;
  // cartIconUsed: any;

  constructor(
    private cartService: CartService,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController,
    private plt: Platform
  ) {
    // const isInStandaloneMode = () =>
    //   'standalone' in window.navigator && window.navigator['platform'] === 'ios';
    // if (this.plt.is('ios') && isInStandaloneMode()) {
    //   console.log('I am an iOS PWA!');
    //   // E.g. hide the scan functionality!
    // }
  }

  ngOnInit() {
    this.cart = this.cartService.getCart();
    this.cartItemCount = this.cartService.getCartItemCount();
    this.cartIsEmpty = this.cartService.emptyCart();
    //  this.cartItemCount ? (this.cartIsEmpty = true) : (this.cartIsEmpty = false);
    // this.cartIconUsed = localStorage.getItem('savedCart');
  }

  addToCart(product: Product) {
    this.cartService.addProduct(product);
    this.cartIsEmpty = false;
  }

  cartIconAction() {
    this.cartIsEmpty = this.cartService.emptyCart();
    this.presentModal();
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: CartModalPage,

      breakpoints: [0, 0.3, 0.5, 0.8],
      initialBreakpoint: 0.5,
    });
    await modal.present();
    this.reset();
  }

  ngAfterViewInit() {
    this.canvasElement = this.canvas?.nativeElement;
    this.canvasContext = this.canvasElement.getContext('2d');
    this.videoElement = this.video?.nativeElement;
  }

  // Helper functions
  // async showQrToast() {
  //   const toast = await this.toastCtrl.create({
  //     //  message: `A weblink has been detected.\nOpen ${this.scanResult}?`,
  //     message: `${this.scanResult}`,
  //     position: 'bottom',
  //     buttons: [
  //       {
  //         text: 'Open',
  //         side: 'start',
  //         handler: () => {
  //           window.open(this.scanResult, '_system', 'location=yes');
  //         },
  //       },
  //       {
  //         text: 'Dismiss',
  //         role: 'cancel',
  //         side: 'start',
  //         handler: () => {  // increaseProduct(product: Product) {
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
  //           toast.dismiss();
  //         },
  //       },
  //     ],
  //   });
  //   toast.present();
  // }

  async startScan() {
    // Not working on iOS standalone mode!
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    });

    this.videoElement.srcObject = stream;
    // Required for Safari
    this.videoElement.setAttribute('playsinline', true);

    this.loading = await this.loadingCtrl.create({});
    await this.loading.present();

    this.videoElement.play();
    requestAnimationFrame(this.scan.bind(this));
  }

  async scan() {
    if (this.videoElement.readyState === this.videoElement.HAVE_ENOUGH_DATA) {
      if (this.loading) {
        await this.loading.dismiss();
        this.loading = null;
        this.scanActive = true;
      }

      this.canvasElement.height = this.videoElement.videoHeight;
      this.canvasElement.width = this.videoElement.videoWidth;

      this.canvasContext.drawImage(
        this.videoElement,
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const imageData = this.canvasContext.getImageData(
        0,
        0,
        this.canvasElement.width,
        this.canvasElement.height
      );
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });

      if (code) {
        this.scanActive = false;
        this.scanResult = code.data;
        this.title = this.scanResult.substring(
          this.scanResult.indexOf('Title') + 7,
          this.scanResult.indexOf('Description')
        );
        this.desc = this.scanResult.substring(
          this.scanResult.indexOf('Description') + 13,
          this.scanResult.indexOf('Price')
        );
        this.price = this.scanResult.substring(
          this.scanResult.indexOf('Price') + 7
        );
        this.addToCart({
          id: guidd(),
          title: this.title,
          price: parseInt(this.price, 10),
          description: this.desc,
          amount: this.numberOfItem,
        });
      } else {
        if (this.scanActive) {
          requestAnimationFrame(this.scan.bind(this));
        }
      }
    } else {
      requestAnimationFrame(this.scan.bind(this));
    }
  }

  reset() {
    this.scanResult = undefined;
  }

  stopScan() {
    this.scanActive = false;
  }

  continueScans() {
    this.startScan();
  }

  /**
   * Fallback for iOS issues or just handle a previously
   * captured image
   * 
   * captureImage() {
  this.fileinput.nativeElement.click();
}

handleFile(files: FileList) {
  const file = files.item(0);

  var img = new Image();
  img.onload = () => {
    this.canvasContext.drawImage(img, 0, 0, this.canvasElement.width, this.canvasElement.height);
    const imageData = this.canvasContext.getImageData(
      0,
      0,
      this.canvasElement.width,
      this.canvasElement.height
    );
    const code = jsQR(imageData.data, imageData.width, imageData.height, {
      inversionAttempts: 'dontInvert'
    });

    if (code) {
      this.scanResult = code.data;
      this.showQrToast();
    }
  };
  img.src = URL.createObjectURL(file);
}
   * 
   */
}
