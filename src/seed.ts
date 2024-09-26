import "reflect-metadata";
import dotenv from "dotenv";
import { User } from "./entities/User";
import { AccountTransaction } from "./entities/AccountTransaction";
import { Wallet } from "./entities/Wallet";
import { Account } from "./entities/Account";
import { dataSource } from "./data-source";

dotenv.config();

async function seedDatabase() {
  const accountRepo = dataSource.getRepository(Account);
  const transactionRepo = dataSource.getRepository(AccountTransaction);
  const walletRepo = dataSource.getRepository(Wallet);
  const userRepo = dataSource.getRepository(User);

  // Users
  const user1 = new User();
  user1.firstName = "natasha";
  user1.secondName = "Paul";
  user1.lastName = "Kim";
  user1.email = "natasha@mail.ru";

  const user2 = new User();
  user2.firstName = "Ole";
  user2.secondName = "Jon";
  user2.lastName = "Doe";
  user2.email = "oleg@mail.ru";
  await userRepo.save([user1, user2]);

  //   Wallets
  const wallet1 = new Wallet();
  wallet1.name = "Natasha Main Wallet";
  wallet1.user = user1;

  const wallet2 = new Wallet();
  wallet2.name = "Oleg Main Wallet";
  wallet2.user = user2;

  await walletRepo.save([wallet1, wallet2]);

  //   Accounts
  const account1 = new Account();
  account1.balance = 200;
  account1.wallet = wallet1;

  const account2 = new Account();
  account2.balance = 348;
  account2.wallet = wallet2;

  await accountRepo.save([account1, account2]);

  //   Transactions
  const transaction1 = new AccountTransaction();
  transaction1.type = "send";
  transaction1.amount = 200;
  transaction1.account = account1;
  transaction1.timestamp = new Date();

  const transaction2 = new AccountTransaction();
  transaction2.type = "receive";
  transaction2.amount = 200;
  transaction2.account = account2;
  transaction2.timestamp = new Date();
  await transactionRepo.save([transaction1, transaction2]);

  console.log("Seeding db!");
}

dataSource.initialize().then(() => {
  seedDatabase().catch((error) => {
    console.log(error);
  });
});
