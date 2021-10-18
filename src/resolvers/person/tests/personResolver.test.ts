import { MailingAddress } from "../../../entities/MailingAddress/MailingAddress";
import { Person } from "../../../entities/Person/Person";
import { PhoneNumber } from "../../../entities/PhoneNumber/PhoneNumber";
import { createConnection } from "typeorm";
import { PhoneNumberType } from "../../../entities/PhoneNumber/PhoneNumberType";
import { PersonInput } from "../Inputs/PersonInput";
import { PersonResolver } from "../personResolver";

/*
    NOTE

    I ran out of time for testing, normally i'd create a second test DB and set up a mock graphql connection to that 
    to test CRUD ops with that DB. Here I'm just using the live database.

*/

const resolver = new PersonResolver();
let createdId = "";

beforeAll(async () => {
  // Here is where I'd normally set up a test connection to graphql, had to hack this in at the last min
  const conn = await createConnection({
    type: "postgres",
    url: process.env.DATABSE_URL,
    username: "postgres",
    password: "postgres",
    logging: false,
    synchronize: true,
    entities: [MailingAddress, Person, PhoneNumber],
  });

  conn;
});

afterAll(() => {
  // Here is where I'd cleanup the test connection to graphql
});

it("Returns an error when an incorrect user ID is provided.", async () => {
  expect.assertions(1);
  const result = await resolver.getPerson("34");
  expect(result.error).not.toBeUndefined();
});

// TODO:EXTENSION: Need to set up
// it("Returns a concat of the first and second name of a person.", async () => {
//   expect.assertions(1);
//   // const result = await resolver.fullName();
//   // expect(result).toBe.;
// });

it("Creates a person", async () => {
  expect.assertions(1);

  const person: PersonInput = {
    firstName: "Michael",
    lastName: "Scarn",
    email: "007@mail.com",
    phoneNumbers: [
      {
        number: "348783",
        numberType: PhoneNumberType.Mobile,
        countryCode: "44",
      },
    ],
    address: {
      addressLine1: "Another place",
      addressLine2: "",
      city: "A Space City",
      postcode: "SP4 C4",
    },
  };

  const result = await resolver.createPerson(person);

  expect(result.person).toBeDefined();

  if (result.person) {
    createdId = result.person.id;
  }
});

test("Providing an invalid email returns a field error.", async () => {
  expect.assertions(1);

  const person: PersonInput = {
    firstName: "Michael",
    lastName: "Scarn",
    email: "BAD EMAIL",
    phoneNumbers: [
      {
        number: "348783",
        numberType: PhoneNumberType.Mobile,
        countryCode: "44",
      },
    ],
    address: {
      addressLine1: "Another place",
      addressLine2: "",
      city: "A Space City",
      postcode: "SP4 C4",
    },
  };

  const result = await resolver.createPerson(person);

  expect(result.fieldErrors?.find((fe) => fe.field === "email")).toBeDefined();
});

test("Deleting a person by ID.", async () => {
  expect.assertions(1);
  const result = await resolver.deletePerson(createdId);
  expect(result.deletedId).toBeDefined();
});
