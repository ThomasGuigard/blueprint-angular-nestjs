import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExpenseCategoryController } from './expense-category/expense-category.controller';
import { ExpenseController } from './expense/expense.controller';
import { CurrencyController } from './currency/currency.controller';
import { VatRateController } from './vat-rate/vat-rate.controller';

@Module({
  imports: [],
  controllers: [AppController, ExpenseCategoryController, ExpenseController, CurrencyController, VatRateController],
  providers: [AppService],
})
export class AppModule {}
