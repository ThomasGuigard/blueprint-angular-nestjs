export interface Expense {
  date: string;
  description: string;
  amount: number;
  vat: number;
  totalAmount: number;
  catUid: string;
  currencyUid: string;
  vatRateUid: string;
}
