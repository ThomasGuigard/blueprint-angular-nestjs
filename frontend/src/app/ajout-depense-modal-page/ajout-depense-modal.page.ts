import {Component, OnInit} from '@angular/core';
import { ServiceService } from '../service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-ajout-depense-modal-page',
  templateUrl: './ajout-depense-modal.page.html',
  styleUrls: ['./ajout-depense-modal.page.scss']
})
export class AjoutDepenseModalPage implements OnInit {

  constructor(private service: ServiceService, public router: Router) { }
  filterInput = '';

  expenseCategory;

  expenseCategoryFiltered;

  ngOnInit(): void {
    this.service.getAllExpenseCategory().toPromise().then(value => {
      this.expenseCategory = value;
      this.expenseCategoryFiltered = value;
    });
  }

  filter(): void {
    this.expenseCategoryFiltered = [];
    for (const cat of this.expenseCategory) {
      if (cat.label.toLowerCase().includes(this.filterInput.toLowerCase())) {
        this.expenseCategoryFiltered.push(cat);
      }
    }
    if (this.filterInput === '') {
      console.log('vide');
      this.expenseCategoryFiltered = this.expenseCategory;
    }
  }

  addExpense(uid: string): void {
    this.router.navigateByUrl('/addExpense', { state : { catUid: uid } }).catch();
  }

}
