import {Arg, Int, Query, Resolver} from "type-graphql";
import {getRepository} from "typeorm";
import {Flight} from "../../entity/flight.entity";
import {Have} from "../../entity/have.entity";

@Resolver()
export class FlightQuery {
  @Query(() => [Flight], {nullable: true})
  async flight() {
    const flight = await getRepository(Flight)
      .createQueryBuilder("flight")
      .getMany();

    return flight;
  }

  @Query(() => [Have], {nullable: true})
  async airport() {
    const flight = await getRepository(Have)
      .createQueryBuilder("have")
      .innerJoinAndSelect("have.airport", "airport")
      .innerJoinAndSelect("have.flight", "flight")
      .getMany();

    return flight;
  }

  @Query(() => [Have], {nullable: true})
  async getAirportFlights(@Arg("airport_id", () => Int) airport_id: number) {
    const flight = await getRepository(Have)
      .createQueryBuilder("have")
      .innerJoinAndSelect("have.airport", "airport")
      .innerJoinAndSelect("have.flight", "flight")
      .where(`airport.airport_id = ${airport_id}`)
      .getMany();

    return flight;
  }
}
