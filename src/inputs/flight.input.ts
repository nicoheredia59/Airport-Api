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
  @Field({nullable: true})
  status: string;

  @Field({nullable: true})
  price: number;

  @Field({nullable: true})
  seats: number;
}
