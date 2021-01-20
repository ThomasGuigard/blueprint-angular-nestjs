import {Controller, Get} from '@nestjs/common';
import {Connection} from "typeorm";
import {ExpenseCategoryEntity} from "../../entities/expenseCategory.entity";

@Controller('category')
export class CategoryController {
    constructor(
        private connection: Connection
    ) {}

    @Get('all')
    async getAll() {
        const connect = this.connection.manager.getRepository(ExpenseCategoryEntity);
        const data = await connect.find();
        return {data};
    }
}
