import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {ExpenseRepository} from "../../gateways/expenseRepository";
import {Expense} from "../../domain/expense";
import {ExpenseCategory} from "../../domain/expenseCategory";
import {Currency} from "../../domain/currency";
import {VatRate} from "../../domain/vatRate";

interface expensePayload {
  uid: string;
  description: string;
  date: string;
  amount: number;
  vat: number;
  totalAmount: number;
  vatRateUid: string;
  categoryUid: string;
  currencyUid: string;
}

export class HttpclientExpenseRepository implements ExpenseRepository {
  constructor(
    private httpClient : HttpClient
  ) {}

  addExpense(newExpense: Expense): Promise<void> {
    return new Promise<void>(resolve => {
      const expensePayload = this.expenseMapperToPayload(newExpense);
      this.httpClient.post<any>(`${environment.apiUrl}/expense`, expensePayload)
        .subscribe((res) => {
          resolve(void 0);
        });
    });
  }

  deleteById(uid: string): Promise<void> {
    return new Promise<void>(resolve => {
      this.httpClient.delete<any>(`${environment.apiUrl}/expense/deleteById/${uid}`)
        .subscribe((res) => {
          resolve(void 0);
        });
    });
  }

  getAll(): Promise<Expense[]> {
    return new Promise<Expense[]>(resolve => {
      this.httpClient.get<any>(`${environment.apiUrl}/expense/all`)
        .subscribe((res) => {
          resolve(res.data);
        });
    });
  }

  getById(uid: string): Promise<Expense> {
    return new Promise<Expense>(resolve => {
      this.httpClient.get<any>(`${environment.apiUrl}/expense/getById/${uid}`)
        .subscribe((res) => {
          resolve(res.data);
        });
    });
  }

  getCategories(): Promise<ExpenseCategory[]> {
    return new Promise<ExpenseCategory[]>(resolve => {
      this.httpClient.get<any>(`${environment.apiUrl}/category/all`)
        .subscribe((res) => {
          resolve(res.data);
        });
    });
  }

  getCurrencies(): Promise<Currency[]> {
    return new Promise<Currency[]>(resolve => {
      this.httpClient.get<any>(`${environment.apiUrl}/currency/all`)
        .subscribe((res) => {
          resolve(res.data);
        });
    });
  }

  getVatRates(): Promise<VatRate[]> {
    return new Promise<VatRate[]>(resolve => {
      this.httpClient.get<any>(`${environment.apiUrl}/vat-rate/all`)
        .subscribe((res) => {
          resolve(res.data);
        });
    });
  }

  update(expense: Expense): Promise<void> {
    return new Promise<void>(resolve => {
      const expensePayload = this.expenseMapperToPayload(expense);
      this.httpClient.put<any>(`${environment.apiUrl}/expense`, expensePayload)
        .subscribe((res) => {
          resolve(void 0);
        });
    });
  }

  private expenseMapperToPayload(newExpense: Expense): expensePayload {
    return {
      amount: newExpense.amount,
      categoryUid: newExpense.expenseCategory.uid,
      currencyUid: newExpense.currency.uid,
      date: newExpense.date,
      description: newExpense.description,
      totalAmount: newExpense.totalAmount,
      uid: newExpense.uid,
      vat: newExpense.vat,
      vatRateUid: newExpense.vatRate.uid
    }
  }
}
