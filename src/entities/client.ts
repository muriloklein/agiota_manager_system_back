import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Bill } from "./bill";
import { User } from "./user";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @ManyToOne(() => User, (loanShark) => loanShark.clients)
  loanShark?: User;

  @OneToMany(() => Bill, (bill) => bill.client)
  bills?: Bill[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(
    id?: number,
    name?: string,
    phone?: string,
    address?: string,
    loanShark?: User,
    bills?: Bill[],
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.loanShark = loanShark;
    this.bills = bills;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
