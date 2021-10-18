import { Person } from "../../../entities/Person/Person";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class PersonResponse {
  @Field({ nullable: true })
  error?: string;
  @Field(() => Person, { nullable: true })
  person?: Person;
}
