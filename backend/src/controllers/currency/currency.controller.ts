import {Controller, Get} from '@nestjs/common';
import {Connection} from "typeorm";
import {CurrencyEntity} from "../../entities/currency.entity";

@Controller('currency')
export class CurrencyController {
    constructor(
        private connection: Connection
    ) {}

    @Get('all')
    async getAll() {
        const connect = this.connection.manager.getRepository(CurrencyEntity);
        const data = await connect.find();
        return {data};
    }
}
