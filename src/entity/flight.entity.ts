import {ObjectType, Field} from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
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

  @OneToMany(() => Have, h => h.flight)
  have: Promise<Have>;

  @OneToMany(() => Reservate, r => r.flight)
  reservate: Promise<Reservate>;
}
