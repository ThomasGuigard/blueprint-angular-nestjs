import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ExpenseCategory} from "../../core-logic/domain/expenseCategory";
import {ExpenseService} from "../services/expense.service";

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.scss']
})
export class SelectCategoryComponent implements OnInit {
  @Output() categoryOutput: EventEmitter<ExpenseCategory> = new EventEmitter<ExpenseCategory>();

  public category: ExpenseCategory;
  public categoriesList: ExpenseCategory[] = [];
  private categoriesListAll: ExpenseCategory[] = [];
  public searchTyping = '';

  constructor(
    private expenseService: ExpenseService
  ) { }

  async ngOnInit() {
    this.categoriesListAll = await this.expenseService.getCategories();
    this.categoriesList = [...this.categoriesListAll];
  }

  sendEvent() {
    this.categoryOutput.emit(this.category);
  }

  filterSearch() {
    if (!this.searchTyping) return this.categoriesList = [...this.categoriesListAll];
    this.categoriesList = this.categoriesListAll.filter(c => !!this.normalizeString(c.label).startsWith(this.normalizeString(this.searchTyping)));
  }

  private normalizeString(label: string) {
    return label.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
