import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from '../app.service';

@Controller('vat-rate')
export class VatRateController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllVatRate() {
    return await this.appService.get('vatRate');
  }

  @Get(':id')
  async getOneVatRate(@Param() params) {
    return await this.appService.get('vatRate', params.id);
  }
}
