import {Field, ObjectType} from "type-graphql";
import {BaseEntity, Entity, ManyToOne} from "typeorm";
import {Airport} from "./airport.entity";
import {Flight} from "./flight.entity";

@ObjectType()
@Entity()
export class Have extends BaseEntity {
  @Field(() => Airport)
  @ManyToOne(() => Airport, a => a.have, {primary: true, onDelete: "CASCADE"})
  airport: Airport;

  @Field(() => Flight)
  @ManyToOne(() => Flight, f => f.have, {primary: true, onDelete: "CASCADE"})
  flight: Flight;
}
