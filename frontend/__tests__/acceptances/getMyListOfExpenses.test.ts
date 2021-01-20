import { v4 as uuidv4 } from 'uuid';
import {Expense} from "../../src/core-logic/domain/expense";
import {ExpenseHandler} from "../../src/core-logic/domain/expenseHandler";
import {InMemoryExpenseRepository} from "../../src/core-logic/infra/expense-repository/inMemoryExpenseRepository";

describe('Scénario: affichage de la liste de mes dépenses', () => {
  let firstExpense: Expense;
  let secondExpenseButDisplayFirst: Expense;
  const expenseRepository = new InMemoryExpenseRepository();
  const expenseHandler = new ExpenseHandler(expenseRepository);
  let listExpenses: Expense[];

  test('Pour un ajout de dépenses dans le désordre', () => {
    firstExpense = new Expense({
      uid: uuidv4(),
      date: '2021-01-01'
    })
    secondExpenseButDisplayFirst = new Expense({
      uid: uuidv4(),
      date: '2021-01-17'
    })
    expenseRepository.feedWith([firstExpense, secondExpenseButDisplayFirst]);
  })

  test('Lorsque je retire la liste de mes dépenses', async () => {
    listExpenses = await expenseHandler.getAll();
  })

  test('Je peux voir mes dépenses triées par la date de dépense', () => {
    expect(listExpenses[0].uid).toEqual(secondExpenseButDisplayFirst.uid);
    expect(listExpenses[1].uid).toEqual(firstExpense.uid);
  })
})
