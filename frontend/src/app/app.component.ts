import { Component } from '@angular/core';
import {ModalController} from '@ionic/angular';
import { AjoutDepenseModalPage } from './ajout-depense-modal-page/ajout-depense-modal.page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(public modalController: ModalController) {
  }

  async createModal(): Promise<any> {
    const modal = await this.modalController.create({
      component: AjoutDepenseModalPage,
    });
    return await modal.present();
  }
}
