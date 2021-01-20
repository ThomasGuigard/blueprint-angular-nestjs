import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {Expense} from "../../core-logic/domain/expense";
import { v4 as uuidv4 } from 'uuid';
import {ExpenseService} from "../services/expense.service";
import {VatRate} from "../../core-logic/domain/vatRate";
import {ExpenseCategory} from "../../core-logic/domain/expenseCategory";
import {Currency} from "../../core-logic/domain/currency";

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.scss']
})
export class AddExpenseComponent implements OnInit {
  date: string;
  description: string;
  totalAmount: number;
  vatRateSelected: VatRate;
  vatRates: VatRate[] = [];
  categorySelected: ExpenseCategory;
  currency: Currency;
  currencies: Currency[] = [];

  constructor(
    public modalController: ModalController,
    private expenseService: ExpenseService
  ) { }

  async ngOnInit() {
    this.vatRates = await this.expenseService.getVatRates();
    this.currencies = await this.expenseService.getCurrencies();
  }

  dismiss() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  async validate() {
    const newExpense = new Expense({
      uid: uuidv4(),
      date: this.date,
      description: this.description,
      totalAmount: this.totalAmount,
      vatRate: this.vatRateSelected,
      currency: this.currency,
      expenseCategory: this.categorySelected
    })
    await this.expenseService.addExpense(newExpense);
    this.dismiss();
  }

  setCategory($event: ExpenseCategory) {
    this.categorySelected = $event;
  }
}
