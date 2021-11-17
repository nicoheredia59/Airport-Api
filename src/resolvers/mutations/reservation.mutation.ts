import {Arg, Mutation, Resolver} from "type-graphql";
import {getConnection, getRepository} from "typeorm";

import {Reservate} from "../../entity/reservate.entity";
import {ReservationInput} from "../../inputs/reservation.input";
import {ReservationResponse} from "../../responses/reservation.response";
import {Flight} from "../../entity/flight.entity";

@Resolver()
export class ReservationMutation {
  @Mutation(() => ReservationResponse, {nullable: true})
  async createReservation(
    @Arg("options", () => ReservationInput) options: ReservationInput
  ): Promise<ReservationResponse> {
    await Reservate.create({...options}).save();

    const reservate = await getRepository(Reservate)
      .createQueryBuilder("reservate")
      .innerJoinAndSelect("reservate.user", "user")
      .innerJoinAndSelect("reservate.flight", "flight")
      .where(`user.ci = ${options.user.ci}`)
      .andWhere(`flight.flight_id = ${options.flight.flight_id}`)
      .getOne();

    let flight;

    flight = await getRepository(Flight)
      .createQueryBuilder("flight")
      .where(`flight.flight_id = ${options.flight.flight_id}`)
      .getOne();
    console.log(flight);

    //working on it
    if (reservate) {
      if (flight?.avalible_seats === 0) {
        return {
          errors: [
            {
              path: "flight.avalible_seats",
              message: "Ya no quedan asientos disponibles",
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

    return {reservate};
  }
}
