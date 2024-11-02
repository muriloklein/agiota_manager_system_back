import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";
import { ClientEntity } from "./client";
import bcrypt from "bcrypt";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ unique: true })
  name?: string;

  @Column()
  pin?: string;

  @OneToMany(() => ClientEntity, (client) => client.loanShark)
  clients?: ClientEntity[];

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
    clients?: ClientEntity[],
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
