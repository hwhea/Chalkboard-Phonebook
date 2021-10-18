import {
  Arg,
  Authorized,
  FieldResolver,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Person } from "../../entities/Person/Person";
import { PersonResponse } from "./Responses/PersonResponse";

@Resolver(Person)
export class PersonResolver {
  @FieldResolver(() => String)
  fullName(@Root() root: Person) {
    return root.firstName + " " + root.lastName;
  }

  @Query(() => PersonResponse)
  @Authorized()
  async getPerson(@Arg("personId") personId: string): Promise<PersonResponse> {
    return {
      error: "Not set up yet for " + personId,
    };
  }
}
