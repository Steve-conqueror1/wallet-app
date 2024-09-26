import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Account } from "./Account";

@Entity({ name: "transactions" })
export class AccountTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", nullable: true })
  type: string;

  @Column({ type: "decimal" })
  amount: number;

  @ManyToOne(() => Account, (account) => account.transactions)
  account: Account;

  @Column()
  timestamp: Date;
}
