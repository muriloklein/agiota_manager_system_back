import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { Bill } from "./bill";

@Entity()
export class Payment {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("decimal", { precision: 10, scale: 2 })
  value?: number;

  @ManyToOne(() => Bill, (bill) => bill.payments)
  bill?: Bill;

  @CreateDateColumn()
  paymentDate?: Date;

  constructor(id?: number, value?: number, bill?: Bill, paymentDate?: Date) {
    this.id = id;
    this.value = value;
    this.bill = bill;
    this.paymentDate = paymentDate;
  }
}
