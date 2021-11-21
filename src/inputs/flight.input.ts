import {Field, InputType} from "type-graphql";

@InputType()
class Agency_id {
  @Field()
  agency_id: number;
}

@InputType()
export class FlightInput {
  @Field()
  status: string;

  @Field()
  price: number;

  @Field()
  seats: number;

  @Field(() => Agency_id)
  agency: Agency_id;
}

@InputType()
export class UpdateFlight {
  @Field({nullable: true})
  status: string;

  @Field({nullable: true})
  price: number;

  @Field({nullable: true})
  seats: number;

  @Field(() => Agency_id, {nullable: true})
  agency: Agency_id;
}
