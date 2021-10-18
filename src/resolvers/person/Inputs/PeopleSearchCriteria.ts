import { InputType, Field, Int } from "type-graphql";

@InputType()
export class PeopleSearchCriteria {
  @Field({ nullable: true })
  nameContains?: string;
  @Field({ nullable: true })
  phoneNumberContains?: string;
  @Field({ nullable: true })
  addressContains?: string;
  @Field(() => String, { nullable: true })
  staffRole?: string;
  @Field(() => Int)
  limit: number;
  @Field(() => Int, { nullable: true })
  cursor?: number;
}
