import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Client } from "./client";
import { Payment } from "./payment";

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("decimal", { precision: 10, scale: 2 })
  value?: number;

  @Column("decimal", { precision: 5, scale: 2 })
  tax?: number; // Taxa de juros em %

  @Column("date")
  loanDate?: Date;

  @Column("date")
  dueDate?: Date;

  @Column("decimal", { precision: 10, scale: 2, default: 0 })
  amountPaid?: number;

  @Column({ default: false })
  paid?: boolean;

  @ManyToOne(() => Client, (client) => client.bills)
  client?: Client;

  @OneToMany(() => Payment, (payment) => payment.bill)
  payments?: Payment[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(
    id?: number,
    value?: number,
    tax?: number,
    loanDate?: Date,
    dueDate?: Date,
    amountPaid?: number,
    paid?: boolean,
    client?: Client,
    payments?: Payment[],
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.value = value;
    this.tax = tax;
    this.loanDate = loanDate;
    this.dueDate = dueDate;
    this.amountPaid = amountPaid;
    this.paid = paid;
    this.client = client;
    this.payments = payments;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
