import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-popup',
  templateUrl: './modal-popup.page.html',
  styleUrls: ['./modal-popup.page.scss'],
})
export class ModalPopupPage implements OnInit {
  @Input() modal_title: string | undefined;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  async closeModal() {
    const close = 'Modal Removed';
    await this.modalCtrl.dismiss(close);
  }
}
