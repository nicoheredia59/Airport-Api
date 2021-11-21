import {Arg, Mutation, Resolver} from "type-graphql";

import {Agency} from "../../entity/agency.entity";
import {AgencyInput} from "../../inputs/agency.input";
import {AgencyResponse} from "../../responses/agency.response";

@Resolver()
export class AgencyMutation {
  @Mutation(() => AgencyResponse, {nullable: true})
  async createAgency(
    @Arg("options", () => AgencyInput) options: AgencyInput
  ): Promise<AgencyResponse> {
    const agency = await Agency.create({...options}).save();

    return {agency};
  }
}
