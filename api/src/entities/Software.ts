import { Column, PrimaryGeneratedColumn, Entity } from "typeorm";

@Entity()
export class Software {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column("text")
  description: string;

  @Column("simple-array")
  accessLevels: string[];
}
