import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";
import { Client } from "./client";
import bcrypt from "bcrypt";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  name?: string;

  @Column()
  pin?: string;

  @OneToMany(() => Client, (client) => client.loanShark)
  clients?: Client[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @BeforeInsert()
  async hashPin() {
    if (this.pin) {
      this.pin = await bcrypt.hash(this.pin, 10);
    }
  }

  constructor(
    id?: number,
    name?: string,
    pin?: string,
    clients?: Client[],
    createdAt?: Date,
    updatedAt?: Date
  ) {
    this.id = id;
    this.name = name;
    this.pin = pin;
    this.clients = clients;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
