import { MailingAddress } from "../../entities/MailingAddress/MailingAddress";
import { PhoneNumber } from "../../entities/PhoneNumber/PhoneNumber";
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
import { PersonInput } from "./Inputs/PersonInput";
import { DeletedPersonResponse } from "./Responses/DeletedPersonResponse";
import { PaginatedPeopleResponse } from "./Responses/PaginatedPeopleResponse";
import { PersonResponse } from "./Responses/PersonResponse";
import { WritePersonResponse } from "./Responses/WritePersonResponse";
import { validatePersonInput } from "./utils/validatePersonInput";

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

  @Mutation(() => WritePersonResponse)
  @Authorized()
  async createPerson(
    @Arg("personInput") input: PersonInput
  ): Promise<WritePersonResponse> {
    const validationErrors = validatePersonInput(input);

    if (validationErrors.length > 0) {
      return { fieldErrors: validationErrors };
    }

    const newPerson = new Person();

    try {
      newPerson.firstName = input.firstName ?? newPerson.firstName;
      newPerson.lastName = input.lastName ?? newPerson.lastName;
      newPerson.emailAddress = input.email ?? newPerson.emailAddress;
    } catch (e) {
      console.error(e);
      return { error: "Error updating general information." };
    }

    try {
      newPerson.mailingAddress = new MailingAddress();
      newPerson.mailingAddress.addressLine1 = input.address.addressLine1;
      newPerson.mailingAddress.addressLine2 = input.address.addressLine2;
      newPerson.mailingAddress.city = input.address.city;
      newPerson.mailingAddress.postcode = input.address.postcode;
    } catch (e) {
      console.error(e);
      return { error: "Error creating mailing address." };
    }

    try {
      newPerson.phoneNumbers = input.phoneNumbers.map((inputNum) => {
        const pn = new PhoneNumber();

        pn.countryCode = inputNum.countryCode;
        pn.number = inputNum.number;
        pn.numberType = inputNum.numberType;

        return pn;
      });
    } catch (e) {
      console.error(e);
      return { error: "Error creating phone numbers." };
    }

    try {
      await newPerson.save();
      return {
        person: newPerson,
      };
    } catch (e) {
      console.error(e);
      return { error: "There was an unexpected error." };
    }
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
