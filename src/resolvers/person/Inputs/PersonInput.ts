import { InputType, Field, Int } from "type-graphql";

@InputType()
export class PersonInput {
  @Field({ nullable: true })
  firstName?: string;
  @Field({ nullable: true })
  lastName?: string;
  @Field({ nullable: true })
  email?: string;
  // TODO:EXPANSION: add more to this input
}
