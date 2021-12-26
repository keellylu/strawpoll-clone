import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Choice } from "./Choice";
import { Poll } from "./Poll";

@Entity("votes")
export class Vote extends BaseEntity {
  @PrimaryColumn()
  pollId: string;

  @ManyToOne(() => Poll)
  poll: Poll;

  @PrimaryColumn()
  choiceId: string;

  @ManyToOne(() => Choice)
  choice: Choice;

  @PrimaryColumn()
  ipAddress: string;
}
