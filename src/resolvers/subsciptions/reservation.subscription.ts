import {Resolver, Root, Subscription} from "type-graphql";
import {Reservate} from "../../entity/reservate.entity";

@Resolver()
export class ReservationSubscription {
  @Subscription({topics: "CREATE_RESERVATION"})
  newReservation(@Root() payload: Reservate): Reservate {
    return payload;
  }
}
