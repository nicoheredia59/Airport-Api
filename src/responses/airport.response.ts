import {Field, ObjectType} from "type-graphql";
import {Airport} from "../entity/airport.entity";

@ObjectType()
class AirportError {
  @Field()
  path: string;

  @Field()
  message: string;
}

@ObjectType()
export class AirportResponse {
  @Field(() => [AirportError], {nullable: true})
  errors?: AirportError[];

  @Field(() => Airport, {nullable: true})
  airport?: Airport;
}
