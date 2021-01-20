import { Injectable } from '@angular/core';
import {ExpenseHandler} from "../../core-logic/domain/expenseHandler";
import {InMemoryExpenseRepository} from "../../core-logic/infra/expense-repository/inMemoryExpenseRepository";
import {Expense} from "../../core-logic/domain/expense";
import {Subject} from "rxjs";
import {HttpclientExpenseRepository} from "../../core-logic/infra/expense-repository/httpclientExpenseRepository";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private expenseHandler: ExpenseHandler;
  private subject: Subject<void>;

  constructor(private httpClient: HttpClient) {
    this.init();
  }

  init() {
    // this.expenseHandler = new ExpenseHandler(new InMemoryExpenseRepository());
    this.expenseHandler = new ExpenseHandler(new HttpclientExpenseRepository(this.httpClient));
    this.subject = new Subject();
  }

  getAll() {
    return this.expenseHandler.getAll();
  }

  async addExpense(newExpense: Expense) {
    await this.expenseHandler.addExpense(newExpense);
    this.subject.next();
  }

  getById(uid: string) {
    return this.expenseHandler.getById(uid);
  }

  async update(myExpense: Expense) {
    await this.expenseHandler.update(myExpense);
    this.subject.next();
  }

  async delete(myExpense: Expense) {
    await this.expenseHandler.delete(myExpense);
    this.subject.next();
  }

  async getVatRates() {
    return this.expenseHandler.getVatRates();
  }

  async getCategories() {
    return this.expenseHandler.getCategories();
  }

  async getCurrencies() {
    return this.expenseHandler.getCurrencies();
  }

  expenseListListener() {
    return this.subject;
  }
}
