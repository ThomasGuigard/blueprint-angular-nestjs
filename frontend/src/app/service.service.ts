import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Expense} from './add-expense/expense.interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  getAllExpenseCategory(): any {
    return this.http.get('/api/expense-category');
  }

  getOneExpenseCategory(id: string): any {
    return this.http.get(`/api/expense-category/${id}`);
  }

  getAllVat(): any {
    return this.http.get('/api/vat-rate');
  }

  getAllCurrency(): any {
    return this.http.get('/api/currency');
  }

  getAllExpenses(): any {
    return this.http.get('/api/expense');
  }

  postExpense(expense: Expense): any {
    return this.http.post('/api/expense', expense);
  }

  deleteExpense(id: string): any {
    return this.http.delete(`/api/expense/${id}`);
  }
}
