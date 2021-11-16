import {ObjectType, Field} from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import {Have} from "./have.entity";

@ObjectType()
@Entity()
export class Airport extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  airport_id: number;

  @Field()
  @Column()
  country: string;

  @Field()
  @Column()
  city: string;

  @Field()
  @Column()
  address: string;

  @Field()
  @Column()
  phone: number;

  @OneToMany(() => Have, h => h.airport)
  have: Promise<Have>;
}
