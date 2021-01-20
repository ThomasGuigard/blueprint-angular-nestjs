import {Body, Controller, Delete, Get, Param, Post, Put} from '@nestjs/common';
import {Connection} from "typeorm";
import {ExpenseEntity} from "../../entities/expense.entity";
import {PostExpense, PutExpense} from "./expense.dto";
import {ExpenseCategoryEntity} from "../../entities/expenseCategory.entity";
import {CurrencyEntity} from "../../entities/currency.entity";
import {VatRateEntity} from "../../entities/vatRate.entity";

@Controller('expense')
export class ExpenseController {
    constructor(
        private connection: Connection
    ) {}

    @Get('getById/:uid')
    async getById(@Param('uid') uid: string) {
        const connect = this.connection.manager.getRepository(ExpenseEntity);
        const data = await connect.findOne(uid);
        return { data };
    }

    @Get('all')
    async getAll() {
        const connect = this.connection.manager.getRepository(ExpenseEntity);
        const data = await connect.find();
        return { data };
    }

    @Post()
    async addExpense(@Body() body: PostExpense) {
        const {currencyUid, categoryUid, vatRateUid} = body;
        const categoryRepo = this.connection.manager.getRepository(ExpenseCategoryEntity);
        const currencyRepo = this.connection.manager.getRepository(CurrencyEntity);
        const expenseRepo = this.connection.manager.getRepository(ExpenseEntity);
        const vatRateRepo = this.connection.manager.getRepository(VatRateEntity);
        const categoryStored = await categoryRepo.findOne(categoryUid);
        const currencyStored = await currencyRepo.findOne(currencyUid);
        const vatRateStored = await vatRateRepo.findOne(vatRateUid);
        const expense = Object.assign({} as any, body);
        expense.expenseCategory = categoryStored;
        expense.currency = currencyStored;
        expense.vatRate = vatRateStored;
        const expenseInstance = expenseRepo.create(expense);
        const data = await expenseRepo.save(expenseInstance);
        return { data };
    }

    @Put()
    async updateExpense(@Body() body: PutExpense) {
        const expenseRepo = this.connection.manager.getRepository(ExpenseEntity);
        const expenseStored = await expenseRepo.findOne(body.uid);
        if (!expenseStored) throw new Error('Expense not found');
        const expenseToSave = Object.assign(expenseStored, body)
        const expenseInstance = expenseRepo.create(expenseToSave);
        const data = await expenseRepo.update(expenseStored.uid, expenseInstance);
        return { data };
    }

    @Delete('deleteById/:uid')
    async deleteById(@Param('uid') uid: string) {
        const connect = this.connection.manager.getRepository(ExpenseEntity);
        const data = await connect.delete(uid);
        return { data };
    }
}
