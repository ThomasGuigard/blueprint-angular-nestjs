import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {join} from "path";
import {ExpenseEntity} from "./entities/expense.entity";
import {ExpenseCategoryEntity} from "./entities/expenseCategory.entity";
import {VatRateEntity} from "./entities/vatRate.entity";
import {CurrencyEntity} from "./entities/currency.entity";
import { ExpenseController } from './controllers/expense/expense.controller';
import { CategoryController } from './controllers/category/category.controller';
import { CurrencyController } from './controllers/currency/currency.controller';
import { VatRateController } from './controllers/vat-rate/vat-rate.controller';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'ec2-52-213-173-172.eu-west-1.compute.amazonaws.com',
    port: 5432,
    username: 'pyrgifpsxbwvhv',
    password: '67f8efc373b39d5bafe89facaf12e6040f63dab32454d7a3b77405bed18d64ba',
    database: 'd5gfclr1okp24k',
    entities: [join(__dirname + '/entities/*.entity{.ts,.js}')],
    synchronize: false,
    ssl: true
  }),
    TypeOrmModule.forFeature([ExpenseEntity, ExpenseCategoryEntity, VatRateEntity, CurrencyEntity]),],
  controllers: [ExpenseController, CategoryController, CurrencyController, VatRateController],
  providers: [],
})
export class AppModule {}
