import {ObjectType, Field} from "type-graphql";
import {Entity, Column, OneToMany, BaseEntity, PrimaryColumn} from "typeorm";
import {Reservate} from "./reservate.entity";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field()
  @PrimaryColumn()
  ci: number;

  @Field()
  @Column({unique: true})
  email: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  country: string;

  @Column()
  password: string;

  @OneToMany(() => Reservate, r => r.user)
  reservate: Promise<Reservate>;
}
