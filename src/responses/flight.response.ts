import {Field, ObjectType} from "type-graphql";
import {Flight} from "../entity/flight.entity";

@ObjectType()
class FlightError {
  @Field()
  path: string;

  @Field()
  message: string;
}

@ObjectType()
export class FlighResponse {
  @Field(() => [FlightError], {nullable: true})
  errors?: FlightError[];

  @Field(() => Flight, {nullable: true})
  flight?: Flight;
}
