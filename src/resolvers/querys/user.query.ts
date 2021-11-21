import {Ctx, Query, Resolver} from "type-graphql";
import {getRepository} from "typeorm";
import {User} from "../../entity/user.entity";
import {MyContext} from "../../types/MyContext";

@Resolver()
export class UserQuery {
  @Query(() => [User], {nullable: true})
  async getUsers() {
    return await User.find();
  }

  @Query(() => User, {nullable: true})
  async me(@Ctx() {req}: MyContext) {
    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where(`user.email = '${req.session.email}'`)
      .getOne();

    return user;
  }
}
