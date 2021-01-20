import {Expense} from "../../src/core-logic/domain/expense";
import {InMemoryExpenseRepository} from "../../src/core-logic/infra/expense-repository/inMemoryExpenseRepository";
import {ExpenseHandler} from "../../src/core-logic/domain/expenseHandler";
import {VatRate} from "../../src/core-logic/domain/vatRate";

describe(`Scénario: modification d'une dépense`, () => {
  let myExpense: Expense;
  let originalExpense: Expense;
  const expenseRepository = new InMemoryExpenseRepository();
  const expenseHandler = new ExpenseHandler(expenseRepository);

  test('Pour une dépense déjà enregistrée, que je souhaite modifier le montant TTC', async () => {
    originalExpense = new Expense({
      amount: 100,
      totalAmount: 120,
      vatRate: new VatRate({
        rate: 0.2
      })
    });
    expenseRepository.feedWith([originalExpense]);
    myExpense = await expenseHandler.getById(originalExpense.uid);
    expect(myExpense.amount).toEqual(100);
    expect(myExpense.totalAmount).toEqual(120);
    myExpense.totalAmount = 150;
  })

  test(`Lorsque j'effectue ma modification de ma dépense`, async () => {
    await expenseHandler.update(myExpense);
  })

  test('Ma modification est immédiatement observable avec le bon montant HT', async () => {
    const newExpense = await expenseHandler.getById(originalExpense.uid);
    expect(newExpense.amount).toEqual(125);
    expect(newExpense.totalAmount).toEqual(150);
  })
})
