import { v4 as uuidv4 } from 'uuid';
import {ExpenseHandler} from "../../src/core-logic/domain/expenseHandler";
import {InMemoryExpenseRepository} from "../../src/core-logic/infra/expense-repository/inMemoryExpenseRepository";
import {Expense} from "../../src/core-logic/domain/expense";
import {VatRate} from "../../src/core-logic/domain/vatRate";
import {ExpenseCategory} from "../../src/core-logic/domain/expenseCategory";
import {Currency} from "../../src/core-logic/domain/currency";

describe(`TU: ajout d'une dépense`, () => {
  let newExpense: Expense;
  const expenseHandler = new ExpenseHandler(new InMemoryExpenseRepository());

  test(`Ajout d'une dépense avec le prix TTC de 360euros et taux de TVA de 20%, je retrouve le prix HT de 300euros`, async () => {
    newExpense = new Expense({
      uid: uuidv4(),
      totalAmount: 360,
      vatRate: new VatRate({
        rate: 0.2
      })
    })
    await expenseHandler.addExpense(newExpense);
    const myExpense: Expense = await expenseHandler.getById(newExpense.uid);
    expect(myExpense.uid).toEqual(newExpense.uid);
    expect(myExpense.totalAmount).toEqual(360);
    expect(myExpense.amount).toEqual(300);
  });

  test(`Ajout d'une dépense dans la catégorie Repas, je retrouve cette catégorie dans l'ajout`, async () => {
    newExpense = new Expense({
      uid: uuidv4(),
      expenseCategory: new ExpenseCategory({
        label: 'Repas'
      })
    })
    await expenseHandler.addExpense(newExpense);
    const myExpense: Expense = await expenseHandler.getById(newExpense.uid);
    expect(myExpense.uid).toEqual(newExpense.uid);
    expect(myExpense.expenseCategory.label).toEqual('Repas');
  })

  test(`Ajout d'une dépense en euros, je retrouve cette monaie dans l'ajout`, async () => {
    newExpense = new Expense({
      uid: uuidv4(),
      currency: new Currency({
        code: 'EUR'
      })
    })
    await expenseHandler.addExpense(newExpense);
    const myExpense: Expense = await expenseHandler.getById(newExpense.uid);
    expect(myExpense.uid).toEqual(newExpense.uid);
    expect(myExpense.currency.code).toEqual('EUR');
  })
})
