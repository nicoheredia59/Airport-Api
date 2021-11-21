import {Field, InputType} from "type-graphql";

@InputType()
export class AgencyInput {
  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  phone: number;
}
