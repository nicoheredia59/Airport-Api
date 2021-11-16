import {Arg, Mutation, Resolver} from "type-graphql";

import {AddFlights, AirportInput} from "../../inputs/airport.input";
import {Airport} from "../../entity/airport.entity";
import {Have} from "../../entity/have.entity";
import {getRepository} from "typeorm";

@Resolver()
export class AirportMutation {
  @Mutation(() => Have, {nullable: true})
  async createAirport(
    @Arg("options", () => AirportInput) options: AirportInput
  ) {
    await Airport.create({...options}).save();
  }

  @Mutation(() => Have, {nullable: true})
  async addFlightsToAirport(
    @Arg("options", () => AddFlights) options: AddFlights
  ) {
    await Have.create({...options}).save();

    const result = await getRepository(Have)
      .createQueryBuilder("have")
      .innerJoinAndSelect("have.airport", "airport")
      .innerJoinAndSelect("have.flight", "flight")
      .where(`flight.flight_id = ${options.flight.flight_id}`)
      .andWhere(`airport.airport_id = ${options.airport.airport_id}`)
      .getOne();

    return result;
  }
}
