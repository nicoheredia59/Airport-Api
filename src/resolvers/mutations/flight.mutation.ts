import {Arg, Int, Mutation, Resolver} from "type-graphql";
import {Flight} from "../../entity/flight.entity";
import {FlighResponse} from "../../responses/flight.response";
import {FlightInput, UpdateFlight} from "../../inputs/flight.input";
import {getRepository} from "typeorm";

@Resolver()
export class FlightMutation {
  @Mutation(() => FlighResponse, {nullable: true})
  async createFlight(
    @Arg("options", () => FlightInput) options: FlightInput
  ): Promise<FlighResponse> {
    const flight = await Flight.create({
      status: options.status,
      price: options.price,
      seats: options.seats,
      avalible_seats: options.seats,
    }).save();

    return {flight};
  }

  @Mutation(() => FlighResponse, {nullable: true})
  async updateFlight(
    @Arg("flight_id", () => Int) flight_id: number,
    @Arg("options", () => UpdateFlight) options: UpdateFlight
  ): Promise<FlighResponse> {
    await Flight.update({flight_id}, options);
    const flight = await getRepository(Flight)
      .createQueryBuilder("flight")
      .where(`flight.flight_id = ${flight_id}`)
      .getOne();

    return {flight};
  }

  @Mutation(() => Boolean, {nullable: true})
  async deleteFlight(@Arg("flight_id", () => Int) flight_id: number) {
    await Flight.delete(flight_id);

    return true;
  }
}
