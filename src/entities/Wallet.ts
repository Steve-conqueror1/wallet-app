import {
  PrimaryGeneratedColumn,
  Entity,
  Column,
  ManyToOne,
  OneToMany,
} from "typeorm";

import { Account } from "./Account";
import { User } from "./User";

@Entity({ name: "wallets" })
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.wallets)
  user: User;

  @OneToMany(() => Account, (account) => account.wallet)
  accounts: Account[];
}
