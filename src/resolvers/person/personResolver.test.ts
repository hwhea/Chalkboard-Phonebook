import { PersonResolver } from "./personResolver";

const resolver = new PersonResolver();

it("Return an error when an incorrect user ID is provided.", async () => {
  expect.assertions(1);
  const result = await resolver.getPerson("34");
  expect(result.error).not.toBeUndefined();
});
