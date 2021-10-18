import {
  Arg,
  Authorized,
  FieldResolver,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Person } from "../../entities/Person/Person";
import { PeopleSearchCriteria } from "./Inputs/PeopleSearchCriteria";
import { PaginatedPeopleResponse } from "./Responses/PaginatedPeopleResponse";
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

  @Query(() => PaginatedPeopleResponse)
  @Authorized()
  async getPeople(
    @Arg("searchCriteria") searchCriteria: PeopleSearchCriteria
  ): Promise<PaginatedPeopleResponse> {
    return {
      staff: [],
      error: "Not set up yet.",
    };
  }
}
