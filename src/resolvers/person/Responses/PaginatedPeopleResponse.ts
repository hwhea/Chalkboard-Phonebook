import { Person } from "../../../entities/Person/Person";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PaginatedPeopleResponse {
  @Field(() => [Person])
  people: Person[];

  @Field({ nullable: true })
  hasMore?: boolean;

  @Field(() => String, { nullable: true })
  error?: string;
}
