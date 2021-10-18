import {
  Arg,
  Authorized,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { Person } from "../../entities/Person/Person";
import { PeopleSearchCriteria } from "./Inputs/PeopleSearchCriteria";
import { DeletedPersonResponse } from "./Responses/DeletedPersonResponse";
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

  @Mutation(() => PaginatedPeopleResponse)
  @Authorized()
  async createPerson(
    @Arg("personInput") input: PeopleSearchCriteria
  ): Promise<PaginatedPeopleResponse> {
    return {
      staff: [],
      error: "Not set up yet.",
    };
  }

  @Mutation(() => PaginatedPeopleResponse)
  @Authorized()
  async updatePerson(
    @Arg("personId") personId: string,
    @Arg("personInput") input: PeopleSearchCriteria
  ): Promise<PaginatedPeopleResponse> {
    return {
      staff: [],
      error: "Not set up yet.",
    };
  }

  @Mutation(() => PaginatedPeopleResponse)
  @Authorized()
  async deletePerson(
    @Arg("personId") personId: string
  ): Promise<DeletedPersonResponse> {
    return {
      error: "Not set up yet.",
    };
  }
}
