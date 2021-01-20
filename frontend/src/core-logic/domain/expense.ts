import {VatRate} from "./vatRate";
import {ExpenseCategory} from "./expenseCategory";
import {Currency} from "./currency";

export class Expense {
  uid: string;
  description: string;
  date: string;
  amount: number;
  vat: number;
  totalAmount: number;
  vatRate: VatRate;
  expenseCategory: ExpenseCategory;
  currency: Currency;

  constructor(expense: Partial<Expense>) {
    Object.assign(this, expense);
  }
}
