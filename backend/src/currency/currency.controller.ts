import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllCurrency() {
    return await this.appService.get('currency');
  }

  @Get(':id')
  async getOneCurrency(@Param() params) {
    return await this.appService.get('currency', params.id);
  }
}
