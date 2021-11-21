import {Arg, Ctx, Query, Resolver} from "type-graphql";
import {getRepository} from "typeorm";

import {MyContext} from "../../types/MyContext";
import {Reservate} from "../../entity/reservate.entity";

@Resolver()
export class ReservationQuery {
  @Query(() => [Reservate], {nullable: true})
  async getReservations() {
    const reservations = await getRepository(Reservate)
      .createQueryBuilder("reservate")
      .innerJoinAndSelect("reservate.user", "user")
      .innerJoinAndSelect("reservate.flight", "flight")
      .innerJoinAndSelect("flight.agency", "agency")
      .getMany();

    return reservations;
  }

  @Query(() => Reservate, {nullable: true})
  async getReservationsByToken(
    @Arg("reservation_token", () => String) reservation_token: string
  ) {
    const reservations = await getRepository(Reservate)
      .createQueryBuilder("reservate")
      .innerJoinAndSelect("reservate.user", "user")
      .innerJoinAndSelect("reservate.flight", "flight")
      .innerJoinAndSelect("flight.agency", "agency")
      .where(`reservate.reservation_token = '${reservation_token}'`)
      .getOne();

    return reservations;
  }

  @Query(() => [Reservate], {nullable: true})
  async getMyReservations(@Ctx() {req}: MyContext) {
    const reservations = await getRepository(Reservate)
      .createQueryBuilder("reservate")
      .innerJoinAndSelect("reservate.user", "user")
      .innerJoinAndSelect("reservate.flight", "flight")
      .innerJoinAndSelect("flight.agency", "agency")
      .where(`user.email = '${req.session.email}'`)
      .getMany();

    return reservations;
  }
}
