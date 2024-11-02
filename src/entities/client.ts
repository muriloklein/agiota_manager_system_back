import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { BillEntity } from "./bill";
import { UserEntity } from "./user";

@Entity()
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  phone?: string;

  @Column({ nullable: true })
  address?: string;

  @ManyToOne(() => UserEntity, (loanShark) => loanShark.clients)
  loanShark?: UserEntity;

  @OneToMany(() => BillEntity, (bill) => bill.client)
  bills?: BillEntity[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  constructor(
    id?: number,
    name?: string,
    phone?: string,
    address?: string,
    loanShark?: UserEntity,
    bills?: BillEntity[],
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
