import { InputType, Field, Int } from "type-graphql";

@InputType()
export class PersonInput {
  @Field({ nullable: true })
  firstName?: string;
  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: true })
  addressContains?: string;
  @Field(() => String, { nullable: true })
  staffRole?: string;
  @Field(() => Int)
  limit: number;
  @Field(() => Int, { nullable: true })
  cursor?: number;
}
