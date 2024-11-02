import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from "typeorm";
import { BillEntity } from "./bill";

@Entity()
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("decimal", { precision: 10, scale: 2 })
  value?: number;

  @ManyToOne(() => BillEntity, (bill) => bill.payments)
  bill?: BillEntity;

  @CreateDateColumn()
  paymentDate?: Date;

  constructor(
    id?: number,
    value?: number,
    bill?: BillEntity,
    paymentDate?: Date
  ) {
    this.id = id;
    this.value = value;
    this.bill = bill;
    this.paymentDate = paymentDate;
  }
}
