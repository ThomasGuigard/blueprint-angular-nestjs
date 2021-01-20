import { Component, OnInit } from '@angular/core';
import {ExpenseService} from "../services/expense.service";
import {Expense} from "../../core-logic/domain/expense";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-list-expenses',
  templateUrl: './list-expenses.component.html',
  styleUrls: ['./list-expenses.component.scss']
})
export class ListExpensesComponent implements OnInit {
  private listOfExpensesAll: Expense[] = [];
  public listOfExpenses: Expense[] = [];
  public searchTyping = '';

  constructor(
    private expenseService: ExpenseService,
    private router: Router,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    await this.retrieveAllExpenses();
    const listener = this.expenseService.expenseListListener();
    listener.subscribe(() => {
      this.retrieveAllExpenses();
    })
  }

  private async retrieveAllExpenses() {
    this.listOfExpensesAll = await this.expenseService.getAll();
    this.listOfExpenses = [...this.listOfExpensesAll];
  }

  async deleteExpense(expense) {
    await this.expenseService.delete(expense);
    const toast = await this.toastController.create({
      message: `Dépense supprimée`,
      duration: 2000
    });
    toast.present();
  }

  async modifyExpense(expense: Expense) {
    this.router.navigate([`/modify/${expense.uid}`]);
  }

  seeDetails(expense: Expense) {
    this.router.navigate([`/details/${expense.uid}`]);
  }

  filterSearch() {
    if (!this.searchTyping) return this.listOfExpenses = [...this.listOfExpensesAll];
    this.listOfExpenses = this.listOfExpensesAll.filter(e => !!this.normalizeString(e.description).startsWith(this.normalizeString(this.searchTyping)));
  }

  private normalizeString(label: string) {
    return label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
