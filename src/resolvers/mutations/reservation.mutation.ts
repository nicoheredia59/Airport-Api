import {Arg, Mutation, Resolver} from "type-graphql";
import {getConnection, getRepository} from "typeorm";

import {Reservate} from "../../entity/reservate.entity";
import {ReservationInput} from "../../inputs/reservation.input";
import {ReservationResponse} from "../../responses/reservation.response";
import {Flight} from "../../entity/flight.entity";
import {genToken} from "../../utils/genToken";
import {stripe} from "../../stripe/stripe";
import {User} from "../../entity/user.entity";

@Resolver()
export class ReservationMutation {
  @Mutation(() => ReservationResponse, {nullable: true})
  async createReservation(
    @Arg("options", () => ReservationInput) options: ReservationInput
  ): Promise<ReservationResponse> {
    const token = genToken(10);
    let flight;

    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where(`user.ci = ${options.user.ci}`)
      .getOne();

    flight = await getRepository(Flight)
      .createQueryBuilder("flight")
      .where(`flight.flight_id = ${options.flight.flight_id}`)
      .getOne();

    await Reservate.create({
      reservation_token: options.reservation_token + token,
      expedition_date: options.expedition_date,
      departure_date: options.departure_date,
      amount: options.amount,
      destiny: options.destiny,
      unit_price: (flight?.price as number) * options.amount,
      user: options.user,
      flight: options.flight,
    }).save();

    const reservate = await getRepository(Reservate)
      .createQueryBuilder("reservate")
      .innerJoinAndSelect("reservate.user", "user")
      .innerJoinAndSelect("reservate.flight", "flight")
      .where(`user.ci = ${options.user.ci}`)
      .andWhere(`flight.flight_id = ${options.flight.flight_id}`)
      .getOne();

    const lessThanCero = (flight?.avalible_seats as number) <= 0;

    //working on it
    if (reservate) {
      if (flight?.avalible_seats === 0 || lessThanCero) {
        return {
          errors: [
            {
              path: "flight.avalible_seats",
              message: "Ya no quedan asientos disponibles.",
            },
          ],
        };
      }

      await getConnection().transaction(async tm => {
        await tm.query(
          `UPDATE flight SET avalible_seats = COALESCE(avalible_seats, 0) - ${options.amount} WHERE flight_id = ${options.flight.flight_id}`
        );
      });
    }
    const total_price = (flight?.price as number) * options.amount;

    const customer = await stripe.customers.create({
      email: user?.email,
      name: user?.name,
    });

    console.log(customer);

    const a = await stripe.charges.create(
      {
        amount: total_price,
        currency: "usd",
        source: "tok_visa",
        description: "Pago Tickets",
      },
      {
        idempotencyKey: token,
      }
    );

    console.log(a);

    return {reservate};
  }
}
