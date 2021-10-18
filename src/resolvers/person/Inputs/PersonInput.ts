import { InputType, Field, Int } from "type-graphql";
import { AddressInput } from "./AddressInput";
import { PhoneNumberInput } from "./PhoneNumberInput";

@InputType()
export class PersonInput {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  email: string;
  @Field(() => [PhoneNumberInput])
  phoneNumbers: PhoneNumberInput[];

  @Field(() => AddressInput)
  address: AddressInput;
}

// NOPROD
// @InputType()
// export class PersonInput {
//   @Field({ nullable: true })
//   firstName: string;
//   @Field({ nullable: true })
//   lastName: string;
//   @Field({ nullable: true })
//   email: string;
//   // TODO:EXPANSION: add more to this input
//   @Field(() => [PhoneNumberInput], { nullable: true })
//   phoneNumbers: PhoneNumberInput[];

//   @Field(() => AddressInput, { nullable: true })
//   address: AddressInput;
// }
// ENDNOPROD
