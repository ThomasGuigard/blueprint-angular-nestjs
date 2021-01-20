import { v4 as uuidv4 } from 'uuid';
import {Expense} from "../../src/core-logic/domain/expense";
import {ExpenseHandler} from "../../src/core-logic/domain/expenseHandler";
import {InMemoryExpenseRepository} from "../../src/core-logic/infra/expense-repository/inMemoryExpenseRepository";

describe(`Scénario: ajout d'une dépense`, () => {
  let newExpense: Expense;
  const expenseHandler = new ExpenseHandler(new InMemoryExpenseRepository());

  test(`Pour un nouvel ajout de dépense`, () => {
    newExpense = new Expense({
      uid: uuidv4(),
      date: '2021-01-15',
      description: `Repas d'affaire`
    });
    expect(newExpense.uid).toBeDefined();
    expect(newExpense.date).toBeDefined();
    expect(newExpense.description).toBeDefined();
  });

  test(`Lorsque j'ajoute une nouvelle dépense`, async () => {
    await expenseHandler.addExpense(newExpense);
  });

  test(`L'ajout est bien visible`, async () => {
    const listExpenses: Expense[] = await expenseHandler.getAll();
    expect(listExpenses[0].uid).toEqual(newExpense.uid);
    expect(listExpenses[0].description).toEqual(newExpense.description);
    expect(listExpenses[0].date).toEqual(newExpense.date);
  });
})
