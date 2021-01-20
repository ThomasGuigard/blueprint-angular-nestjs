export class ExpenseCategory {
  uid: string;
  label: string;

  constructor(category: Partial<ExpenseCategory>) {
    Object.assign(this, category);
  }
}
