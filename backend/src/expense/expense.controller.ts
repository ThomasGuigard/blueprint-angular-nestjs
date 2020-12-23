import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { AppService } from '../app.service';
import { Expense } from './expense.interface';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllExpense() {
    return await this.appService.getAllExpensesDisplay();
  }

  @Get(':id')
  async getOneExpense(@Param() params) {
    return await this.appService.get('expense', params.id);
  }

  @Post()
  async addExpense(@Body() expense: Expense) {
    return await this.appService.postExpense(expense);
  }

  @Delete(':id')
  async deleteOneExpense(@Param() params) {
    return await this.appService.deleteExpense(params.id);
  }
}
