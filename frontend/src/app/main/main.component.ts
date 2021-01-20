import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {AddExpenseComponent} from "../add-expense/add-expense.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  ngOnInit(): void {
  }

  async openAddExpenseModal() {
    const modal = await this.modalController.create({
      component: AddExpenseComponent
    });
    return await modal.present();
  }
}
