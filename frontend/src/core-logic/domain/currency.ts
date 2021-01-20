import { v4 as uuidv4 } from 'uuid';

export class Currency {
  uid: string = uuidv4();
  code: string;

  constructor(currency: Partial<Currency>) {
    Object.assign(this, currency);
  }
}
