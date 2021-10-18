import { Field, InputType } from "type-graphql";

@InputType()
export class AddressInput {
  @Field()
  addressLine1: string;

  @Field()
  addressLine2: string;

  @Field()
  city: string;

  @Field()
  postcode: string;
}
