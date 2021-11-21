import {Field, ObjectType} from "type-graphql";
import {Flight} from "../entity/flight.entity";
import {Agency} from "../entity/agency.entity";

@ObjectType()
class AgencyErrors {
  @Field()
  path: string;

  @Field()
  message: string;
}

@ObjectType()
export class AgencyResponse {
  @Field(() => [AgencyErrors], {nullable: true})
  errors?: AgencyErrors[];

  @Field(() => Agency, {nullable: true})
  agency?: Agency;
}

@ObjectType()
export class AgencyFlightsResponse {
  @Field(() => [AgencyErrors], {nullable: true})
  errors?: AgencyErrors[];

  @Field(() => Agency, {nullable: true})
  agency?: Agency;

  @Field(() => [Flight], {nullable: true})
  flight?: Flight[];
}
