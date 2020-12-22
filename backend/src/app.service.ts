import { Injectable } from '@nestjs/common';
import { Client, QueryConfig } from 'pg';

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
}
