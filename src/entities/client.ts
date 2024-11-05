import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user";

@Entity()
export class Client {
  @Column({ unique: true })
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  phone?: string;

  @Column()
  bill?: number;

  @Column({ nullable: true })
  address?: string;

  @ManyToOne(() => User, (loanShark) => loanShark.clients)
  loanShark?: User;

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
    bill?: number,
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.name = name;
    this.phone = phone;
    this.address = address;
    this.loanShark = loanShark;
    this.bill = bill;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
