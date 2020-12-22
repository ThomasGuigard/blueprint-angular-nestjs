import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('expense-category')
export class ExpenseCategoryController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllExpenseCategory() {
    return await this.appService.get('expenseCategory');
  }

  @Get(':id')
  async getOneExpenseCategory(@Param() params) {
    return await this.appService.get('expenseCategory', params.id);
  }
}
