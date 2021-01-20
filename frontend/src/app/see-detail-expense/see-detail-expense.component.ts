import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ExpenseService} from "../services/expense.service";
import {Expense} from "../../core-logic/domain/expense";
import {ToastController} from "@ionic/angular";

@Component({
  selector: 'app-see-detail-expense',
  templateUrl: './see-detail-expense.component.html',
  styleUrls: ['./see-detail-expense.component.scss']
})
export class SeeDetailExpenseComponent implements OnInit {
  private uid: string;
  public expense: Expense;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private expenseService: ExpenseService,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    await this.getUid();
    this.expense = await this.expenseService.getById(this.uid);
  }

  private getUid() {
    return new Promise<void>(resolve => {
      this.route.params.subscribe(params => {
        this.uid = params.uid;
        resolve(void 0);
      });
    })
  }

  close() {
    this.router.navigate(['/'])
  }

  async deleteExpense() {
    await this.expenseService.delete(this.expense);
    const toast = await this.toastController.create({
      message: `Dépense supprimée`,
      duration: 2000
    });
    toast.present();
    this.close();
  }

  modifyExpense() {
    this.router.navigate([`/modify/${this.expense.uid}`]);
  }
}
