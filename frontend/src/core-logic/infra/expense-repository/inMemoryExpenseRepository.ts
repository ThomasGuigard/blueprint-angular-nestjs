import {ExpenseRepository} from "../../gateways/expenseRepository";
import {Expense} from "../../domain/expense";
import {VatRate} from "../../domain/vatRate";
import {ExpenseCategory} from "../../domain/expenseCategory";
import {Currency} from "../../domain/currency";

export class InMemoryExpenseRepository implements ExpenseRepository {
  private myListOfExpenses: Expense[] = [];
  private listVatRates: VatRate[] = [
    new VatRate({
      rate: 0.2,
      label: "20%"
    }),
    new VatRate({
      rate: 0.1,
      label: "10%"
    }),
    new VatRate({
      rate: 0.055,
      label: "5.5%"
    })
  ];
  private listCategories: ExpenseCategory[] = [
    new ExpenseCategory({
      label: 'Repas'
    }),
    new ExpenseCategory({
      label: 'Hôtel'
    }),
    new ExpenseCategory({
      label: 'Voiture'
    })
  ]
  private listCurrencies: Currency[] = [
    new Currency({
      code: 'EUR'
    }),
    new Currency({
      code: 'GPB'
    }),
  ];

  addExpense(newExpense: Expense): Promise<void> {
    this.myListOfExpenses.push(newExpense);
    return Promise.resolve(void 0);
  }

  getAll(): Promise<Expense[]> {
    return Promise.resolve(this.myListOfExpenses);
  }

  getById(uid: string): Promise<Expense> {
    return Promise.resolve(this.myListOfExpenses.find(e => e.uid === uid));
  }

  feedWith(expenses: Expense[]) {
    this.myListOfExpenses = [...expenses];
  }

  update(expense: Expense): Promise<void> {
    this.myListOfExpenses = this.myListOfExpenses.map(e => {
      if (e.uid === expense.uid) {
        Object.assign(e, expense);
      }
      return e
    })
    return Promise.resolve(void 0);
  }

  deleteById(uid: string): Promise<void> {
    this.myListOfExpenses.splice(this.myListOfExpenses.findIndex(e => e.uid === uid), 1);
    return Promise.resolve(void 0);
  }

  getVatRates(): Promise<VatRate[]> {
    return Promise.resolve(this.listVatRates);
  }

  getCategories(): Promise<ExpenseCategory[]> {
    return Promise.resolve(this.listCategories);
  }

  getCurrencies(): Promise<Currency[]> {
    return Promise.resolve(this.listCurrencies);
  }
}
