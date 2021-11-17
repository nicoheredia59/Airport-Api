import {ObjectType, Field} from "type-graphql";
import {
  Entity,
  BaseEntity,
  ManyToOne,
  PrimaryColumn,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from "typeorm";
import {Flight} from "./flight.entity";
import {User} from "./user.entity";

@ObjectType()
@Entity()
export class Reservate extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  reservation_id: number;

  @Field()
  @PrimaryColumn()
  reservation_token: string;

  @Field(() => Date)
  @CreateDateColumn()
  expedition_date: Date;

  @Field(() => Date)
  @CreateDateColumn({type: "date"})
  departure_date: Date;

  @Field()
  @Column()
  amount: number;

  @Field()
  @Column()
  destiny: string;

  @Field()
  @Column({nullable: true})
  unit_price: number;

  @Field(() => User)
  @ManyToOne(() => User, u => u.reservate, {onDelete: "CASCADE"})
  user: User;

  @Field(() => Flight)
  @ManyToOne(() => Flight, f => f.reservate, {onDelete: "CASCADE"})
  flight: Flight;
}
