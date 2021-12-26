import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Choice } from "./Choice";

@Entity("polls")
export class Poll extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Choice, (choice) => choice.poll)
  choices: Choice[];

  @Column({ nullable: true })
  deadline?: Date;

  @CreateDateColumn()
  createdAt: Date;
}
