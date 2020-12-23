import { Component, OnInit } from '@angular/core';
import {AjoutDepenseModalPage} from '../ajout-depense-modal-page/ajout-depense-modal.page';
import {ModalController} from '@ionic/angular';
import {ServiceService} from "../service.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public modalController: ModalController, private service: ServiceService) { }

  expenses = [];

  ngOnInit(): void {
    this.service.getAllExpenses().subscribe(value => {
      this.expenses = value;
      console.log(value);
    });
  }

  async createModal(): Promise<any> {
    const modal = await this.modalController.create({
      component: AjoutDepenseModalPage,
    });
    return await modal.present();
  }
}
