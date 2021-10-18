import { PhoneNumberType } from "../../../entities/PhoneNumber/PhoneNumberType";
import { Field, InputType } from "type-graphql";

@InputType()
export class PhoneNumberInput {
  @Field()
  countryCode: string;

  @Field(() => String)
  numberType: PhoneNumberType;

  @Field()
  number: string;
}
