import { Person } from "../../entities/Person/Person";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { PersonResponse } from "./Responses/PersonResponse";

@Resolver(Person)
export class PersonResolver {
  @Query(() => PersonResponse)
  @Authorized()
  async getPerson(@Arg("personId") personId: string): Promise<PersonResponse> {
    return {
      error: "Not set up yet.",
    };
  }
}
