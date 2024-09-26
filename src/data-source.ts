import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Wallet } from "./entities/Wallet";
import { Account } from "./entities/Account";
import { AccountTransaction } from "./entities/AccountTransaction";

import dotenv from "dotenv";
dotenv.config();

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || "5432"),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  logging: false,
  synchronize: false,
  entities: [User, Wallet, Account, AccountTransaction],
});
