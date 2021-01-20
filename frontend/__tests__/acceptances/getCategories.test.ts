import {ExpenseHandler} from "../../src/core-logic/domain/expenseHandler";
import {InMemoryExpenseRepository} from "../../src/core-logic/infra/expense-repository/inMemoryExpenseRepository";
import {ExpenseCategory} from "../../src/core-logic/domain/expenseCategory";

describe('Scénario: récupération des catégories de dépenses', () => {
  const expenseHandler = new ExpenseHandler(new InMemoryExpenseRepository());
  let listCategories: ExpenseCategory[];

  test('Lorsque je retire la liste des catégories', async () => {
    listCategories = await expenseHandler.getCategories();
  })

  test('Une liste de catégorie est disponible', () => {
    expect(listCategories.length).toBeGreaterThan(0);
  })
})
