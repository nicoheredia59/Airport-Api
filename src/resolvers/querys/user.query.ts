import {Query, Resolver} from "type-graphql";
import {User} from "../../entity/user.entity";

@Resolver()
export class UserQuery {
  @Query(() => [User], {nullable: true})
  async getUsers() {
    return await User.find();
  }
}
