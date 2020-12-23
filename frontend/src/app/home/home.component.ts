import { Component, OnInit } from '@angular/core';
import {AjoutDepenseModalPage} from '../ajout-depense-modal-page/ajout-depense-modal.page';
import {AlertController, ModalController} from '@ionic/angular';
import {ServiceService} from '../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public modalController: ModalController, private service: ServiceService, public alertController: AlertController) { }

  expenses = [];
  expenseFiltered = [];
  filterInput;
  total = 0;
  dateFilter;

  ngOnInit(): void {
    this.service.getAllExpenses().subscribe(value => {
      this.expenses = value;
      this.expenseFiltered = value;
      this.totalMath();
    });
  }

  async createModal(): Promise<any> {
    const modal = await this.modalController.create({
      component: AjoutDepenseModalPage,
    });
    return await modal.present();
  }

  filter(): void {
    this.expenseFiltered = [];
    this.dateFilter = '';
    for (const exp of this.expenses) {
      if (exp.descrtiption.toLowerCase().includes(this.filterInput.toLowerCase())) {
        this.expenseFiltered.push(exp);
      }
    }
    if (this.filterInput === '') {
      this.expenseFiltered = this.expenses;
    }
    this.totalMath();
  }
  filterDate(): void {
    this.expenseFiltered = [];
    this.filterInput = '';
    for (const exp of this.expenses) {
      if (exp.date.substring(0, 10).toLowerCase().includes(this.dateFilter.substring(0, 10).toLowerCase())) {
        this.expenseFiltered.push(exp);
      }
    }
    if (this.dateFilter === '') {
      this.expenseFiltered = this.expenses;
    }
    this.totalMath();
  }

  delete(id: string): void {
    this.service.deleteExpense(id).subscribe(async resp => {
      console.log(resp);
      let alert;
      if (resp.rowCount === 1) {
        alert = await this.alertController.create({
          message: 'Depense surprimee',
        });
        this.service.getAllExpenses().subscribe(value => {
          this.expenses = value;
          this.expenseFiltered = value;
          this.totalMath();
        });
      } else {
        alert = await this.alertController.create({
          message: 'Erreur lors de la suppression',
        });
      }

      await alert.present();
    });
  }

  totalMath(): void {
    this.total = 0;
    for (const exp of this.expenseFiltered) {
      this.total += exp.totalAmount;
    }
  }
}
