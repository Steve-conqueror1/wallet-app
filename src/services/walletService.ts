import { dataSource } from "../data-source";

import { Account } from "../entities/Account";
import { AccountTransaction } from "../entities/AccountTransaction";

export const sendFunds = async (
  fromAccountId: number,
  toAccountId: number,
  amount: number
) => {
  const accountRepo = dataSource.getRepository(Account);
  const transactionRepo = dataSource.getRepository(AccountTransaction);

  const fromAccount = await accountRepo.findOne({
    where: {
      id: fromAccountId,
    },
  });

  const toAccount = await accountRepo.findOne({
    where: {
      id: toAccountId,
    },
  });

  if (!fromAccount || !toAccount || fromAccount.balance < amount) {
    throw new Error("Invalid Transaction");
  }

  //   Дебет со счета ~ fromAccount
  fromAccount.balance -= amount;
  const debitTransaction = await transactionRepo.create({
    type: "send",
    amount,
    account: fromAccount,
    timestamp: new Date(),
  });

  //   Зачисление на счет toAccount
  toAccount.balance += amount;
  const creditTransaction = transactionRepo.create({
    type: "receive",
    amount,
    account: toAccount,
    timestamp: new Date(),
  });

  await accountRepo.save(fromAccount);
  await accountRepo.save(toAccount);
  await transactionRepo.save([debitTransaction, creditTransaction]);
};

export const getTransactionHistory = async (accountId: number) => {
  const transactionRepo = dataSource.getRepository(AccountTransaction);

  const transactoins = await transactionRepo.find({
    where: [{ account: { id: accountId } }],
    relations: ["account"],
  });
  return transactoins;
};
