import argon2 from "argon2";
import {Arg, Int, Mutation, Resolver} from "type-graphql";
import {getRepository} from "typeorm";
import {User} from "../../entity/user.entity";
import {UpdateUser, UserInput} from "../../inputs/user.input";
import {UserResponse} from "../../responses/user.response";

@Resolver()
export class UserMutation {
  @Mutation(() => UserResponse)
  async createUser(
    @Arg("options", () => UserInput) options: UserInput
  ): Promise<UserResponse> {
    const hashed_pass = await argon2.hash(options.password);

    await User.create({
      ci: options.ci,
      email: options.email,
      name: options.name,
      country: options.country,
      password: hashed_pass,
    }).save();

    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where(`user.ci = ${options.ci} `)
      .getOne();

    if (!user) {
      return {
        errors: [
          {
            path: "ci",
            message: "Esta cedula ya existe",
          },
        ],
      };
    }

    return {user};
  }

  @Mutation(() => UserResponse, {nullable: true})
  async updateUser(
    @Arg("ci", () => Int) ci: number,
    @Arg("options", () => UpdateUser) options: UpdateUser
  ) {
    await User.update({ci}, options);

    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where(`user.ci = ${ci}`)
      .getOne();

    return {user};
  }

  @Mutation(() => Boolean, {nullable: true})
  async deleteUser(@Arg("ci", () => Int) ci: number) {
    const user = await User.delete(ci);
    if (!user) {
      return null;
    }

    return true;
  }
}
