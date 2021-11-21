import argon2 from "argon2";

import {stripe} from "../../stripe/stripe";
import {Arg, Ctx, Int, Mutation, Resolver} from "type-graphql";
import {getRepository} from "typeorm";
import {User} from "../../entity/user.entity";
import {EmailPassword, UpdateUser, UserInput} from "../../inputs/user.input";
import {UserResponse} from "../../responses/user.response";
import {MyContext} from "../../types/MyContext";

@Resolver()
export class UserMutation {
  //register
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

    await stripe.customers.create({
      email: user?.email,
      name: user?.email,
    });

    if (user) {
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

  //update
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

  //delete
  @Mutation(() => Boolean, {nullable: true})
  async deleteUser(@Arg("ci", () => Int) ci: number) {
    const user = await User.delete(ci);
    if (!user) {
      return null;
    }

    return true;
  }

  //login
  @Mutation(() => UserResponse, {nullable: true})
  async login(
    @Arg("options", () => EmailPassword) options: EmailPassword,
    @Ctx() {req}: MyContext
  ): Promise<UserResponse> {
    const user = await getRepository(User)
      .createQueryBuilder("user")
      .where(`user.email = '${options.email}'`)
      .getOne();

    if (!user) {
      return {
        errors: [
          {
            path: "ci",
            message: "Este correo no exisite porfavor ingresa uno valido.",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, options.password);

    if (!valid) {
      return {
        errors: [
          {
            path: "password",
            message: "Contraseña incorrecta.",
          },
        ],
      };
    }

    console.log(user);

    req.session.email = user.email;

    return {user};
  }

  //logout
  @Mutation(() => Boolean)
  logout(@Ctx() {req, res}: MyContext): Promise<unknown> {
    return new Promise(resolve =>
      req.session.destroy(err => {
        res.clearCookie("qid");
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        resolve(true);
      })
    );
  }
}
