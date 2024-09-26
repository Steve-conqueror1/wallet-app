import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

import { AccountTransaction } from "./AccountTransaction";
import { Wallet } from "./Wallet";

class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

@Entity({ name: "accounts" })
export class Account {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("numeric", {
    precision: 7,
    scale: 2,
    transformer: new ColumnNumericTransformer(),
  })
  balance: number;

  @ManyToOne(() => Wallet, (wallet) => wallet.accounts)
  wallet: Wallet;

  @OneToMany(() => AccountTransaction, (transaction) => transaction.account)
  transactions: AccountTransaction[];
}
