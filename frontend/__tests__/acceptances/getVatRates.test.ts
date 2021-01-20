import {ExpenseHandler} from "../../src/core-logic/domain/expenseHandler";
import {InMemoryExpenseRepository} from "../../src/core-logic/infra/expense-repository/inMemoryExpenseRepository";
import {VatRate} from "../../src/core-logic/domain/vatRate";

describe('Scénario: récupération des taux de TVA', () => {
  const expenseHandler = new ExpenseHandler(new InMemoryExpenseRepository());
  let listVatRate: VatRate[];

  test('Lorsque je retire la liste des TVA', async () => {
    listVatRate = await expenseHandler.getVatRates();
  })

  test('La liste des TVA récupérées contient 20%, 10% et 5.5%', () => {
    expect(listVatRate.find(v => v.rate === 0.2)).toBeDefined();
    expect(listVatRate.find(v => v.rate === 0.055)).toBeDefined();
    expect(listVatRate.find(v => v.rate === 0.1)).toBeDefined();
  })
})
