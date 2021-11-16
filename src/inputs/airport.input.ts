import {Field, InputType} from "type-graphql";

//post
@InputType()
export class AirportInput {
  @Field()
  airport_id: number;

  @Field()
  country: string;

  @Field()
  city: string;

  @Field()
  address: string;

  @Field()
  phone: number;
}
//end

//update
@InputType()
export class UpdateAirport {
  @Field()
  airport_id: number;

  @Field()
  country: string;

  @Field()
  city: string;

  @Field()
  address: string;

  @Field()
  phone: number;
}
//end

//adding flights to airport
@InputType()
class Airport_id {
  @Field()
  airport_id: number;
}

@InputType()
class Flight_id {
  @Field()
  flight_id: number;
}

@InputType()
export class AddFlights {
  @Field(() => Airport_id)
  airport: Airport_id;

  @Field(() => Flight_id)
  flight: Flight_id;
}
//end
