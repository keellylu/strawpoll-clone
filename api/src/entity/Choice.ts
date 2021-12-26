import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Poll } from "./Poll";

@Entity()
export class Choice extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  value: string;

  @Column()
  pollId: string;

  @ManyToOne(() => Poll, (poll) => poll.choices)
  poll: Poll;

  @Column("integer", { default: 0 })
  votes: number;
}
