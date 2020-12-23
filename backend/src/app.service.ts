import { Injectable } from '@nestjs/common';
import { Client, QueryConfig } from 'pg';
import { Expense } from './expense/expense.interface';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  private clientConfig = {
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: Number(process.env.PGPORT),
    host: process.env.PGHOST,
    ssl: true,
  };

  async get(name: string, id ?: string) {
    const client = new Client(this.clientConfig);
    await client.connect();

    const queryString = `SELECT * FROM "${name}"`;
    let query: string | QueryConfig = queryString;
    if (id) {
      query = {
        text: `${queryString} WHERE uid = $1`,
        values: [id],
      };
    }

    const res = await client.query(query);
    await client.end();
    return res.rows;
  }

  async getAllExpensesDisplay() {
    const client = new Client(this.clientConfig);
    await client.connect();
    const res = await client.query('SELECT expense.uid, date, descrtiption, amount, vat, "totalAmount", "expenseCategory".label, icon, code, "vatRate".rate FROM expense, currency, "vatRate", "expenseCategory" WHERE expense."currencyUid" = currency.uid AND expense."vatRateUid" = "vatRate".uid AND expense."categoryUid" = "expenseCategory".uid;');
    await client.end();
    return res.rows;
  }

  async postExpense(expense: Expense) {
    const client = new Client(this.clientConfig);
    await client.connect();

    const uid = `${AppService.makeid(8)}-${AppService.makeid(4)}-${AppService.makeid(4)}-${AppService.makeid(4)}-${AppService.makeid(12)}`;
    const query = {
      text: `INSERT INTO expense VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
      values: [uid, expense.date, expense.description, expense.amount, expense.vat, expense.totalAmount, expense.catUid, expense.currencyUid, expense.vatRateUid],
    };

    const res = await client.query(query);
    await client.end();
    return res;
  }

  async deleteExpense(id: string) {
    const client = new Client(this.clientConfig);
    await client.connect();
    const query = {

      text: `DELETE FROM expense WHERE expense.uid = $1`,
      values: [id],
    };

    const res = await client.query(query);
    await client.end();
    return res;
  }

   private static makeid(length) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
