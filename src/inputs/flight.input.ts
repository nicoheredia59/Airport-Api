import {Field, InputType} from "type-graphql";

@InputType()
export class FlightInput {
  @Field()
  status: string;

  @Field()
  price: number;

  @Field()
  seats: number;
}

@InputType()
export class UpdateFlight {
  @Field()
  status: string;

  @Field()
  price: number;

  @Field()
  seats: number;
}
