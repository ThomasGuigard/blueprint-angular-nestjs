import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {SeeDetailExpenseComponent} from "./see-detail-expense/see-detail-expense.component";
import {ModifyExpenseComponent} from "./modify-expense/modify-expense.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'details/:uid',
    component: SeeDetailExpenseComponent
  },
  {
    path: 'modify/:uid',
    component: ModifyExpenseComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
