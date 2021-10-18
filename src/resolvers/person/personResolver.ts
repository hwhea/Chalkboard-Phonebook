import {
  Arg,
  Authorized,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { getConnection } from "typeorm";
import { MailingAddress } from "../../entities/MailingAddress/MailingAddress";
import { Person } from "../../entities/Person/Person";
import { PhoneNumber } from "../../entities/PhoneNumber/PhoneNumber";
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
    const person = await Person.findOne(personId);

    if (!person) {
      return {
        error: "Not found.",
      };
    }

    return {
      person,
    };
  }

  @Query(() => PaginatedPeopleResponse)
  @Authorized()
  async getPeople(
    @Arg("searchCriteria") searchCriteria: PeopleSearchCriteria
  ): Promise<PaginatedPeopleResponse> {
    // Fixed limit of 50 people
    const actualLimit = Math.min(searchCriteria.limit, 50);
    const realLimitPlusOne = actualLimit + 1;

    let qb = getConnection()
      .getRepository(Person)
      .createQueryBuilder("person")
      .select();

    qb = qb
      .leftJoinAndSelect("person.mailingAddress", "addr")
      .leftJoinAndSelect("person.phoneNumbers", "num");

    if (searchCriteria.nameContains && searchCriteria.nameContains.length > 0) {
      qb = qb.andWhere(
        `(LOWER(person.firstName) LIKE :search OR LOWER(person.lastName) LIKE :search)`,
        { search: `%${searchCriteria.nameContains.toLowerCase()}%` }
      );
    }

    if (
      searchCriteria.postcodeContains &&
      searchCriteria.postcodeContains.length > 0
    ) {
      qb = qb.andWhere(`(LOWER(addr.postcode) LIKE :search)`, {
        search: `%${searchCriteria.postcodeContains.toLowerCase()}%`,
      });
    }

    if (
      searchCriteria.phoneNumberContains &&
      searchCriteria.phoneNumberContains.length > 0
    ) {
      qb = qb.andWhere(
        `(LOWER(num.number) LIKE :search) OR (LOWER(num.countryCode) LIKE :search)`,
        {
          search: `%${searchCriteria.phoneNumberContains.toLowerCase()}%`,
        }
      );
    }

    if (searchCriteria.cursor) {
      qb = qb.skip(searchCriteria.cursor);
    }

    qb = qb.orderBy(`person.lastName`, `DESC`).take(realLimitPlusOne);

    const res = await qb.getMany();

    try {
      if (res) {
        return {
          people: res.slice(0, actualLimit),
          hasMore: res.length === realLimitPlusOne,
        };
      } else {
        throw "An error occurred on the server.";
      }
    } catch (e) {
      console.error(e);
      return { error: "An error occurred on the server.", people: [] };
    }
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

  // RAN OUT OF TIME TO IMPLEMENT
  // @Mutation(() => PersonResponse)
  // @Authorized()
  // async updatePerson(
  //   @Arg("personId") personId: string,
  //   @Arg("personInput") input: PersonInput
  // ): Promise<PersonResponse> {
  //   return {
  //     error: "Not set up yet.",
  //   };
  // }

  @Mutation(() => PaginatedPeopleResponse)
  @Authorized()
  async deletePerson(
    @Arg("personId") personId: string
  ): Promise<DeletedPersonResponse> {
    const person = await Person.findOne(personId);

    if (!person) {
      return { error: "Not found." };
    }

    try {
      await person.remove();
      return { deletedId: personId };
    } catch (e) {
      console.error(e);
      return { error: "Person deleted" };
    }
  }
}
