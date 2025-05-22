import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from "typeorm";
import { User } from "../entities/User";
import { Software } from "../entities/Software";
@Entity()
export class Request {
  @PrimaryGeneratedColumn()
  id: number;
  @ManyToOne(() => User, { eager: true })
  user: User;
  @ManyToOne(() => Software, { eager: true })
  software: Software;
  @Column()
  accessType: "Read" | "Write" | "Admin";
  @Column("text")
  reason: string;
  @Column()
  status: "Pending" | "Approved" | "Rejected";
}
