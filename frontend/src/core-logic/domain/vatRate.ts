import { v4 as uuidv4 } from 'uuid';

export class VatRate {
  uid: string = uuidv4();
  rate: number;
  label: string;

  constructor(varRate: Partial<VatRate>) {
    Object.assign(this, varRate);
  }
}
