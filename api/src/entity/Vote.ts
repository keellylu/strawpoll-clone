import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Choice } from "./Choice";
import { Poll } from "./Poll";

@Entity("votes")
export class Vote extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pollId: string;

  @ManyToOne(() => Poll)
  poll: Poll;

  @Column()
  choiceId: string;

  @ManyToOne(() => Choice)
  choice: Choice;

  @Column("text", { nullable: true })
  ipAddress?: string;
}
