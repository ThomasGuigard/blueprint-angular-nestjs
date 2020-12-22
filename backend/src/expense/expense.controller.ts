import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('expense')
export class ExpenseController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllExpense() {
    return await this.appService.get('expense');
  }

  @Get(':id')
  async getOneExpense(@Param() params) {
    return await this.appService.get('expense', params.id);
  }
}
