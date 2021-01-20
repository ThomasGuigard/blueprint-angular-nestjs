import { v4 as uuidv4 } from 'uuid';
import {Expense} from "../../src/core-logic/domain/expense";
import {InMemoryExpenseRepository} from "../../src/core-logic/infra/expense-repository/inMemoryExpenseRepository";
import {ExpenseHandler} from "../../src/core-logic/domain/expenseHandler";

describe(`Scénario: suppression d'une dépense`, () => {
  let myExpense: Expense;
  let originalExpense: Expense;
  const expenseRepository = new InMemoryExpenseRepository();
  const expenseHandler = new ExpenseHandler(expenseRepository);

  test('Pour une dépense déjà enregistrée, que je souhaite supprimer', async () => {
    originalExpense = new Expense({
      uid: uuidv4()
    })
    expenseRepository.feedWith([originalExpense]);
    myExpense = await expenseHandler.getById(originalExpense.uid);
    expect(myExpense.uid).toEqual(originalExpense.uid);
  })

  test(`Lorsque j'effectue la suppression de ma dépense`, async () => {
    await expenseHandler.delete(myExpense);
  })

  test('Ma suppression est effectif', async () => {
    const deletedExpense = await expenseHandler.getById(originalExpense.uid);
    expect(deletedExpense).not.toBeDefined();
  })
})
