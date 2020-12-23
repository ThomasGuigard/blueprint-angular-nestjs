import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Expense } from './expense.interface';
import {ServiceService} from '../service.service';
import {AlertController} from "@ionic/angular";

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {

  constructor(public activatedRoute: ActivatedRoute, private service: ServiceService, public router: Router, public alertController: AlertController) { }

  expense: Expense = {} as Expense;
  vats;
  cat = { label: '', icon: '', uid: '' };
  currencies;

  vat = { rate: 0, uid: '' };
  currency = { code : 0, uid: '' };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.expense.catUid = params.id;
      this.service.getOneExpenseCategory(this.expense.catUid).subscribe(
        (value: { label: string, icon: string, uid: string }[]) => {
          this.cat = value[0];
        }
      );
    });
    this.service.getAllCurrency().subscribe(value => {
      this.currencies = value;
    });
    this.service.getAllVat().subscribe(value => {
      this.vats = value;
    });
  }

  async submit(): Promise<void> {
    this.expense.vat = this.expense.amount * this.vat.rate;
    this.expense.totalAmount = this.expense.amount + this.expense.vat;
    this.expense.currencyUid = this.currency.uid;
    this.expense.vatRateUid = this.vat.uid;
    this.expense.catUid = this.cat.uid;
    this.service.postExpense(this.expense).subscribe((async (value: { rowCount: number }) => {
      if (value.rowCount === 1) {
        const alert = await this.alertController.create({
          message: 'Depense ajoutee',
        });
        await alert.present();
        this.router.navigateByUrl('/').catch();
      }
    }));
  }
}
