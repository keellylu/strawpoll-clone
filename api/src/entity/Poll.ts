import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Choice } from "./Choice";

@Entity()
export class Poll extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(() => Choice, (choice) => choice.poll)
  choices: Choice[];

  @Column()
  deadline: Date;

  @CreateDateColumn()
  createdAt: Date;
}
