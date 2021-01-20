import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ExpenseService} from "../services/expense.service";
import {Expense} from "../../core-logic/domain/expense";
import {ExpenseCategory} from "../../core-logic/domain/expenseCategory";
import {Currency} from "../../core-logic/domain/currency";
import {VatRate} from "../../core-logic/domain/vatRate";
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-modify-expense',
  templateUrl: './modify-expense.component.html',
  styleUrls: ['./modify-expense.component.scss']
})
export class ModifyExpenseComponent implements OnInit {
  private uid: string;
  public expense: Expense;
  public categoriesList: ExpenseCategory[] = [];
  public currencies: Currency[] = [];
  public vatRateSelected: VatRate;
  public vatRates: VatRate[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expenseService: ExpenseService
  ) { }

  async ngOnInit() {
    await this.getUid();
    this.expense = await this.expenseService.getById(this.uid);
    this.categoriesList = await this.expenseService.getCategories();
    this.currencies = await this.expenseService.getCurrencies();
    this.vatRates = await this.expenseService.getVatRates();
  }

  close() {
    this.router.navigate(['/'])
  }

  private getUid() {
    return new Promise<void>(resolve => {
      this.route.params.subscribe(params => {
        this.uid = params.uid;
        resolve(void 0);
      });
    })
  }

  async validate() {
    const myExpense = new Expense({
      uid: this.uid,
      date: this.expense.date,
      description: this.expense.description,
      totalAmount: this.expense.totalAmount,
      vatRate: this.vatRateSelected,
      currency: this.expense.currency,
      expenseCategory: this.expense.expenseCategory
    })
    await this.expenseService.update(myExpense);
    this.router.navigate(['/'])
  }
}
