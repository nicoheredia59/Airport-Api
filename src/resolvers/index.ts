import {buildSchema} from "type-graphql";
import {AirportMutation} from "./mutations/airport.mutation";
import {FlightMutation} from "./mutations/flight.mutation";
import {ReservationMutation} from "./mutations/reservation.mutation";
import {UserMutation} from "./mutations/user.mutation";
import {FlightQuery} from "./querys/flight.query";
import {HelloResolver} from "./querys/hello";
import {UserQuery} from "./querys/user.query";

//const resolverArr = [HelloResolver] as const;

export const schema_index = buildSchema({
  resolvers: [
    HelloResolver,
    UserMutation,
    UserQuery,
    AirportMutation,
    FlightMutation,
    FlightQuery,
    ReservationMutation,
  ],
});
