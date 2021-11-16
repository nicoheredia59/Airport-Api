import {Field, ObjectType} from "type-graphql";
import {Reservate} from "../entity/reservate.entity";

@ObjectType()
class ReservationError {
  @Field()
  path: string;

  @Field()
  message: string;
}

@ObjectType()
export class ReservationResponse {
  @Field(() => [ReservationError], {nullable: true})
  errors?: ReservationError[];

  @Field(() => Reservate, {nullable: true})
  reservate?: Reservate;
}
