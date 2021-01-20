import {ExpenseHandler} from "../../src/core-logic/domain/expenseHandler";
import {InMemoryExpenseRepository} from "../../src/core-logic/infra/expense-repository/inMemoryExpenseRepository";
import {Currency} from "../../src/core-logic/domain/currency";

describe('Scénario: récupération des devises', () => {
  const expenseHandler = new ExpenseHandler(new InMemoryExpenseRepository());
  let listCurrency: Currency[];

  test('Lorsque je retire la liste des devises disponible', async () => {
    listCurrency = await expenseHandler.getCurrencies();
  })

  test(`La liste contient la devise euros et d'autres devises`, () => {
    expect(listCurrency.find(c => c.code === 'EUR')).toBeDefined();
    expect(listCurrency.length).toBeGreaterThan(1);
  })
})
