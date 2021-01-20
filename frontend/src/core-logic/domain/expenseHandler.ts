import {Expense} from "./expense";
import {ExpenseRepository} from "../gateways/expenseRepository";
import {isBefore} from 'date-fns';

export class ExpenseHandler {
  constructor(private expenseRepository: ExpenseRepository) {
  }

  public async getAll() {
    const allExpenses: Expense[] = await this.expenseRepository.getAll();
    return allExpenses.sort((a, b) => {
      if (isBefore(new Date(a.date), new Date(b.date))) {
        return 1;
      } else {
        return -1;
      }
    })
  }

  public async addExpense(newExpense: Expense) {
    if (newExpense.totalAmount && !newExpense.amount && newExpense.vatRate) {
      newExpense.amount = this.calculateAmountBasedOnTotalAmountAndVatRate(newExpense);
    }
    return this.expenseRepository.addExpense(newExpense);
  }

  async getById(uid: string) {
    return this.expenseRepository.getById(uid);
  }

  private calculateAmountBasedOnTotalAmountAndVatRate(newExpense: Expense) {
    return newExpense.totalAmount * 100 / (100 + (100 * newExpense.vatRate.rate));
  }

  async update(myExpense: Expense) {
    if (myExpense.totalAmount && myExpense.vatRate) {
      myExpense.amount = this.calculateAmountBasedOnTotalAmountAndVatRate(myExpense);
    }
    return this.expenseRepository.update(myExpense);
  }

  async delete(myExpense: Expense) {
    return this.expenseRepository.deleteById(myExpense.uid);
  }

  getVatRates() {
    return this.expenseRepository.getVatRates();
  }

  async getCategories() {
    return this.expenseRepository.getCategories();
  }

  async getCurrencies() {
    return this.expenseRepository.getCurrencies();
  }
}
