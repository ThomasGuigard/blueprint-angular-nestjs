import {Controller, Get} from '@nestjs/common';
import {Connection} from "typeorm";
import {VatRateEntity} from "../../entities/vatRate.entity";

@Controller('vat-rate')
export class VatRateController {
    constructor(
        private connection: Connection
    ) {}

    @Get('all')
    async getAll() {
        const connect = this.connection.manager.getRepository(VatRateEntity);
        const data = await connect.find();
        return { data };
    }
}
