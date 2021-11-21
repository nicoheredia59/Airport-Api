import {ObjectType, Field} from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import {Agency} from "./agency.entity";
import {Have} from "./have.entity";
import {Reservate} from "./reservate.entity";

enum State {
  arrivo = "Arrivó",
  retrasado = "Retrasado",
  embarcando = "Embarcando",
  en_curso = "En curso",
}

@ObjectType()
@Entity()
export class Flight extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  flight_id: number;

  @Field()
  @Column({type: "enum", enum: State})
  status: string;

  @Field()
  @Column()
  price: number;

  @Field()
  @Column()
  seats: number;

  @Field()
  @Column()
  avalible_seats: number;

  @Field(() => Agency, {nullable: true})
  @ManyToOne(() => Agency, {nullable: true})
  agency: Agency;

  @OneToMany(() => Have, h => h.flight)
  have: Promise<Have>;

  @OneToMany(() => Reservate, r => r.flight)
  reservate: Promise<Reservate>;
}
