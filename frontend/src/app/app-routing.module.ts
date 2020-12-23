import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddExpenseComponent} from './add-expense/add-expense.component';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'addExpense/:id', component: AddExpenseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
