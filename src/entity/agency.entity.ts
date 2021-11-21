import {Field, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@ObjectType()
@Entity()
export class Agency extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  agency_id: number;

  @Field()
  @Column({unique: true})
  email: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  phone: number;
}
