import {Expense} from "../domain/expense";
import {VatRate} from "../domain/vatRate";
import {ExpenseCategory} from "../domain/expenseCategory";
import {Currency} from "../domain/currency";

export interface ExpenseRepository {
  addExpense(newExpense: Expense): Promise<void>;
  getAll(): Promise<Expense[]>;
  getById(uid: string): Promise<Expense>;
  update(expense: Expense): Promise<void>;
  deleteById(uid: string): Promise<void>;
  getVatRates(): Promise<VatRate[]>;
  getCategories(): Promise<ExpenseCategory[]>;
  getCurrencies(): Promise<Currency[]>;
}
