import {Field, InputType} from "type-graphql";

@InputType()
class User_ci {
  @Field()
  ci: number;
}

@InputType()
class Flight_reservation {
  @Field()
  flight_id: number;

  @Field({nullable: true})
  seats: number;
}

@InputType()
export class ReservationInput {
  @Field()
  reservation_token: string;

  @Field(() => Date)
  expedition_date: Date;

  @Field(() => Date)
  departure_date: Date;

  @Field(() => User_ci)
  user: User_ci;

  @Field(() => Flight_reservation)
  flight: Flight_reservation;
}
