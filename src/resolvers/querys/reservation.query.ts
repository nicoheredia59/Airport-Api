import {Reservate} from "../../entity/reservate.entity";
import {Arg, Query, Resolver} from "type-graphql";
import {getRepository} from "typeorm";

@Resolver()
export class ReservationQuery {
  @Query(() => [Reservate], {nullable: true})
  async getReservations() {
    const reservations = await getRepository(Reservate)
      .createQueryBuilder("reservate")
      .innerJoinAndSelect("reservate.user", "user")
      .innerJoinAndSelect("reservate.flight", "flight")
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
      .where(`reservate.reservation_token = '${reservation_token}'`)
      .getOne();

    return reservations;
  }
}
