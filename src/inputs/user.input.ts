import {Field, InputType} from "type-graphql";

@InputType()
export class UserInput {
  @Field()
  ci: number;

  @Field()
  name: string;

  @Field()
  country: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class UpdateUser {
  @Field({nullable: true})
  name: string;

  @Field({nullable: true})
  country: string;

  @Field({nullable: true})
  email: string;
}
