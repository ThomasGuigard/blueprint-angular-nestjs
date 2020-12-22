import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http: HttpClient) { }

  // tslint:disable-next-line:typedef
  getAllExpenseCategory() {
    return this.http.get('/expense-category');
  }
}
