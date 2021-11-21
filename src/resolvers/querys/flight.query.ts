import {Arg, Int, Query, Resolver} from "type-graphql";
import {getRepository} from "typeorm";

import {Flight} from "../../entity/flight.entity";
import {Have} from "../../entity/have.entity";
import {AgencyFlightsResponse} from "../../responses/agency.response";
import {Agency} from "../../entity/agency.entity";

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
      .leftJoinAndSelect("flight.agency", "agency")
      .getMany();

    return flight;
  }

  @Query(() => [Flight])
  async flightsAgency() {
    const flight = await getRepository(Flight)
      .createQueryBuilder("flight")
      .innerJoinAndSelect("flight.agency", "agency")
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

  @Query(() => AgencyFlightsResponse, {nullable: true})
  async getAgencyFlights(
    @Arg("agency_id", () => Int, {nullable: true}) agency_id: number
    //@Arg("name", () => String, {nullable: true}) name: string
  ): Promise<AgencyFlightsResponse> {
    const agency = await getRepository(Agency)
      .createQueryBuilder("agency")
      .where(`agency.agency_id = ${agency_id}`)
      //.andWhere(`agency.name LIKE '%${name}'`) find by name
      .getOne();

    if (!agency) {
      return {
        errors: [
          {
            path: "agency",
            message: "Esta agencia no existe",
          },
        ],
      };
    }

    const flight = await getRepository(Flight)
      .createQueryBuilder("flight")
      .where(`"agencyAgencyId" = ${agency?.agency_id}`)
      .getMany();

    if (!flight) {
      return {
        errors: [
          {
            path: "flight",
            message: "Esta agencia no cuenta con vuelos actualmente.",
          },
        ],
      };
    }

    console.log(flight);

    return {agency, flight};
  }

  @Query(() => [Flight], {nullable: true})
  async getFlightByStatus(@Arg("status", () => String) status: string) {
    const flight = await getRepository(Flight)
      .createQueryBuilder("flight")
      .where(`flight.status = '${status}'`)
      .getMany();

    return flight;
  }
}
