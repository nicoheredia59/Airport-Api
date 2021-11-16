import {Arg, Mutation, Resolver} from "type-graphql";
import {getRepository} from "typeorm";

import {Reservate} from "../../entity/reservate.entity";
import {ReservationInput} from "../../inputs/reservation.input";
import {ReservationResponse} from "../../responses/reservation.response";
import {Flight} from "../../entity/flight.entity";

@Resolver()
export class ReservationMutation {
  @Mutation(() => ReservationResponse, {nullable: true})
  async createReservation(
    @Arg("options", () => ReservationInput) options: ReservationInput
  ) {
    await Reservate.create({...options}).save();

    const reservate = await getRepository(Reservate)
      .createQueryBuilder("reservate")
      .innerJoinAndSelect("reservate.user", "user")
      .innerJoinAndSelect("reservate.flight", "flight")
      .where(`user.ci = ${options.user.ci}`)
      .andWhere(`flight.flight_id = ${options.flight.flight_id}`)
      .getOne();

    const flight = await getRepository(Flight)
      .createQueryBuilder("flight")
      .where(`flight.flight_id = ${options.flight.flight_id}`)
      .getMany();
    console.log(flight);

    //working on it
    if (reservate) {
      await Flight.update(
        {flight_id: options.flight.flight_id},
        {
          seats: (options.flight.seats = 50),
        }
      );
    }

    return {reservate};
  }
}
