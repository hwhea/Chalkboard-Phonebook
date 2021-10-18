import { InputType, Field, Int } from "type-graphql";

@InputType()
export class PeopleSearchCriteria {
  @Field({ nullable: true })
  nameContains?: string;
  @Field({ nullable: true })
  phoneNumberContains?: string;
  @Field({ nullable: true })
  postcodeContains?: string;
  @Field(() => Int)
  limit: number;
  @Field(() => Int, { nullable: true })
  cursor?: number;
}
